from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class QuoteRequest(BaseModel):
    name: str
    phone: str
    service: str
    message: str

class QuoteRequestDB(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    service: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Email sending function
async def send_quote_email(quote_data: QuoteRequest):
    try:
        # Email configuration
        sender_email = "noreply@deltaroofing.com"  # This can be any sender
        receiver_email = "goncalop007@gmail.com"
        
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'New Roofing Quote Request from {quote_data.name}'
        msg['From'] = sender_email
        msg['To'] = receiver_email
        
        # Create HTML content
        html_content = f"""
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f3f4f6;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #0a2540; margin-bottom: 20px;">New Quote Request — Delta Roofing</h2>
              <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0a2540;">
                <p style="margin: 10px 0;"><strong style="color: #0a2540;">Name:</strong> {quote_data.name}</p>
                <p style="margin: 10px 0;"><strong style="color: #0a2540;">Phone:</strong> <a href="tel:{quote_data.phone}" style="color: #0a2540;">{quote_data.phone}</a></p>
                <p style="margin: 10px 0;"><strong style="color: #0a2540;">Service Requested:</strong> {quote_data.service if quote_data.service else 'Not specified'}</p>
              </div>
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
                <p style="margin: 0 0 10px 0;"><strong style="color: #0a2540;">Message:</strong></p>
                <p style="margin: 0; color: #334155; line-height: 1.6;">{quote_data.message if quote_data.message else 'No message provided'}</p>
              </div>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="color: #64748b; font-size: 14px; margin: 0;">Submitted: {datetime.now(timezone.utc).strftime('%B %d, %Y at %I:%M %p UTC')}</p>
              </div>
            </div>
          </body>
        </html>
        """
        
        # Attach HTML content
        msg.attach(MIMEText(html_content, 'html'))
        
        # Note: This is a simplified version. In production, you'd use:
        # - Gmail SMTP with app password
        # - SendGrid API
        # - AWS SES
        # - Other email service
        
        # For now, we'll log the email content
        logger.info(f"Email notification prepared for: {receiver_email}")
        logger.info(f"Quote request from: {quote_data.name} ({quote_data.phone})")
        
        # In production, uncomment and configure SMTP:
        # with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        #     server.login(sender_email, os.environ.get('EMAIL_PASSWORD'))
        #     server.send_message(msg)
        
        return True
    except Exception as e:
        logger.error(f"Error sending email: {str(e)}")
        return False

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/quote-request")
async def create_quote_request(quote: QuoteRequest):
    try:
        # Save to database
        quote_db = QuoteRequestDB(**quote.model_dump())
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = quote_db.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        await db.quote_requests.insert_one(doc)
        
        # Send email notification
        await send_quote_email(quote)
        
        return {"success": True, "message": "Quote request received"}
    except Exception as e:
        logger.error(f"Error processing quote request: {str(e)}")
        return {"success": False, "message": "Error processing request"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()