import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, Star, ChevronDown, Menu, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { toast } from 'sonner';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const getMapUrl = () => {
    const query = selectedCity
      ? `${selectedCity}, Ontario, Canada`
      : 'Greater Toronto Area, Ontario, Canada';
    const zoom = selectedCity ? 12 : 9;
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
  };

  const getMapsAppUrl = () => {
    const query = selectedCity
      ? `${selectedCity}, Ontario, Canada`
      : 'Greater Toronto Area, Ontario, Canada';
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send to backend API
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/quote-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Thank you! We\'ll contact you shortly.');
        
        // Format service name nicely
        const serviceMap = {
          'window': 'window cleaning',
          'pressure': 'pressure washing',
          'gutter': 'gutter cleaning',
          'bin': 'garbage bin cleaning',
          'multiple': 'multiple services'
        };
        const serviceName = serviceMap[formData.service] || 'your services';
        
        // Create smooth, natural sentence
        let smsMessage = `Hi, I'm ${formData.name} and I'm interested in getting a quote for ${serviceName}.`;
        
        if (formData.message && formData.message.trim()) {
          smsMessage += ` ${formData.message}`;
        }
        
        smsMessage += ` You can reach me at ${formData.phone}. Thanks!`;
        
        // Open SMS with formatted message
        window.open(`sms:${phoneNumber}?body=${encodeURIComponent(smsMessage)}`, '_blank');
        
        setFormData({ name: '', phone: '', service: '', message: '' });
      } else {
        toast.error('Something went wrong. Please try texting or calling us directly.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Something went wrong. Please try texting or calling us directly.');
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const phoneNumber = '647-745-5082';
  const smsLink = `sms:${phoneNumber}?body=Hi Blue Haven, I'd like to get a quote for`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-900/5' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_c687948f-7933-41f5-af03-e120e036b0e9/artifacts/o5qelrey_image.png" 
                alt="Blue Haven Logo" 
                className="h-14 w-14 transition-transform duration-300 hover:scale-110"
              />
              <h1 className={`text-2xl sm:text-3xl font-bold transition-all duration-300 tracking-tight ${
                isScrolled ? 'text-sky-700' : 'text-white drop-shadow-2xl'
              }`}>Blue Haven</h1>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Navigation Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={`transition-all duration-300 hover:scale-110 ${
                      isScrolled ? 'text-slate-700 hover:text-sky-700 hover:bg-sky-50' : 'text-white hover:text-sky-200 hover:bg-white/20'
                    }`}
                  >
                    <Menu size={24} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 backdrop-blur-xl bg-white/95 border-slate-200/50">
                  <DropdownMenuItem asChild>
                    <a href="#services" className="w-full cursor-pointer font-medium">Services</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="#gallery" className="w-full cursor-pointer font-medium">Our Work</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="#reviews" className="w-full cursor-pointer font-medium">Reviews</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="#contact" className="w-full cursor-pointer font-medium">Contact</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={`tel:${phoneNumber}`} className="w-full cursor-pointer flex items-center gap-2 font-medium">
                      <Phone size={16} />
                      <span>{phoneNumber}</span>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <a href={smsLink}>
                <Button className="bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-sky-600/50 hover:scale-105">
                  Text Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20 sm:pt-0">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://customer-assets.emergentagent.com/job_c687948f-7933-41f5-af03-e120e036b0e9/artifacts/z4ne9zqh_pexels-photo-186077.jpg"
            alt="Beautiful clean home"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-sky-900/60"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center py-12 sm:py-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 sm:mb-8 border border-white/20">
            <Sparkles className="text-sky-300" size={16} />
            <span className="text-white text-sm font-medium">Premium Exterior Cleaning</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl tracking-tight">
            A CLEANER HOME,<br/>
            <span className="bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text text-transparent">WITHOUT THE STRESS</span>
          </h2>
          <p className="text-lg sm:text-2xl text-slate-200 mb-8 sm:mb-10 leading-relaxed drop-shadow-lg max-w-2xl mx-auto font-light px-4">
            Let us handle the hard work while you enjoy a clean home. Blue Haven makes cleaning simple, reliable, and stress-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <a href={smsLink} className="w-full sm:w-auto">
              <Button size="lg" className="bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold px-10 py-6 sm:py-7 text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-sky-600/50 hover:scale-105 w-full sm:w-auto">
                Get Free Quote
              </Button>
            </a>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={scrollToContact}
              className="border-2 border-white/50 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-white font-semibold px-10 py-6 sm:py-7 text-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              Contact Us
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <ChevronDown size={32} className="text-white drop-shadow-lg" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-20">
            <h3 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">Our Services</h3>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-light px-4">
              Professional exterior cleaning services to keep your home looking its best
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Window Cleaning */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden hover:-translate-y-3 bg-white/80 backdrop-blur-sm">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1482449609509-eae2a7ea42b7"
                  alt="Window Cleaning"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-xl font-bold text-white mb-1">Window Cleaning</h4>
                </div>
              </div>
              <CardContent className="p-6 bg-gradient-to-br from-white to-slate-50">
                <p className="text-slate-600 leading-relaxed">
                  Clear, streak-free windows that brighten your home and improve curb appeal.
                </p>
              </CardContent>
            </Card>

            {/* Pressure Washing */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden hover:-translate-y-3 bg-white/80 backdrop-blur-sm">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1718152470408-cfeebeb6b9fc"
                  alt="Pressure Washing"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-xl font-bold text-white mb-1">Pressure Washing</h4>
                </div>
              </div>
              <CardContent className="p-6 bg-gradient-to-br from-white to-slate-50">
                <p className="text-slate-600 leading-relaxed">
                  Deep cleaning for driveways, walkways, siding, and outdoor surfaces.
                </p>
              </CardContent>
            </Card>

            {/* Gutter Cleaning */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden hover:-translate-y-3 bg-white/80 backdrop-blur-sm">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556137805-b67cc1d7d328"
                  alt="Gutter Cleaning"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-xl font-bold text-white mb-1">Gutter Cleaning</h4>
                </div>
              </div>
              <CardContent className="p-6 bg-gradient-to-br from-white to-slate-50">
                <p className="text-slate-600 leading-relaxed">
                  Remove debris and ensure proper drainage to protect your home.
                </p>
              </CardContent>
            </Card>

            {/* Garbage Bin Cleaning */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden hover:-translate-y-3 bg-white/80 backdrop-blur-sm">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1729462467174-0d1cbb2014b7"
                  alt="Garbage Bin Cleaning"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-xl font-bold text-white mb-1">Garbage Bin Cleaning</h4>
                </div>
              </div>
              <CardContent className="p-6 bg-gradient-to-br from-white to-slate-50">
                <p className="text-slate-600 leading-relaxed">
                  Sanitize and deodorize bins to eliminate bacteria and odors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-20">
            <h3 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">Why Choose Blue Haven?</h3>
            <p className="text-lg sm:text-xl text-slate-600 font-light px-4">Trusted by homeowners across the GTA</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { title: 'Fast Response', desc: 'Quick quotes and flexible scheduling' },
              { title: 'Local & Reliable', desc: 'Serving the GTA with pride' },
              { title: 'Licensed & Insured', desc: 'Professional and protected' },
              { title: 'Fair Pricing', desc: 'No hidden fees, transparent quotes' }
            ].map((item, index) => (
              <div key={index} className="text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-sky-50 hover:to-cyan-50 transition-all duration-500 group">
                <div className="w-20 h-20 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="text-sky-600" size={40} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h3 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">What Our Clients Say</h3>
            <p className="text-xl text-slate-600 font-light">Real reviews from real customers</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {[
                  "Fantastic service from start to finish. They showed up on time, explained everything clearly, and my house looks brand new. The siding and driveway came out way better than I expected. Highly recommend.",
                  "I called for a quote and they were able to fit me in the same week. Very professional, great communication, and fair pricing. Will definitely be using them again for yearly cleanings.",
                  "They cleaned our gutters, roof, and driveway and the difference is night and day. Super friendly crew and they left everything spotless. Worth every dollar.",
                  "Best exterior cleaning company we've used. Quick response, great attention to detail, and no mess left behind. Our home looks refreshed and clean again.",
                  "Excellent work. They took their time and didn't rush the job. You can tell they care about quality. I've already recommended them to neighbors."
                ].map((review, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="border-0 shadow-xl h-full bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                        <CardContent className="p-8 flex flex-col h-full">
                          <div className="flex gap-1 mb-5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="fill-amber-400 text-amber-400" size={20} />
                            ))}
                          </div>
                          <p className="text-slate-700 leading-relaxed flex-grow font-light text-[15px]">{review}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Our Work Gallery */}
      <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h3 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Our Work</h3>
            <p className="text-xl text-slate-600 font-light">See the Blue Haven difference</p>
          </div>

          {/* Swipeable Gallery Carousel - works on all screen sizes */}
          <div className="relative max-w-5xl mx-auto" data-testid="our-work-carousel">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {[
                  { url: 'https://customer-assets.emergentagent.com/job_c687948f-7933-41f5-af03-e120e036b0e9/artifacts/vs93un0x_image.png', alt: 'Patio Pressure Washing Before/After' },
                  { url: 'https://customer-assets.emergentagent.com/job_c687948f-7933-41f5-af03-e120e036b0e9/artifacts/7k9xv11b_image.png', alt: 'Window Cleaning' },
                  { url: 'https://customer-assets.emergentagent.com/job_c687948f-7933-41f5-af03-e120e036b0e9/artifacts/8ic2dr6s_image.png', alt: 'Garbage Bin Cleaning' },
                  { url: 'https://customer-assets.emergentagent.com/job_c687948f-7933-41f5-af03-e120e036b0e9/artifacts/3y0lm3c5_image.png', alt: 'Driveway Cleaning Before/After' },
                  { url: 'https://customer-assets.emergentagent.com/job_c687948f-7933-41f5-af03-e120e036b0e9/artifacts/ww8tba0m_image.png', alt: 'Pool Deck Cleaning Before/After' }
                ].map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2" data-testid={`gallery-slide-${index}`}>
                    <div className="p-1">
                      <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-72 sm:h-80">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                          draggable="false"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12" data-testid="gallery-prev-btn" />
              <CarouselNext className="hidden md:flex -right-4 lg:-right-12" data-testid="gallery-next-btn" />
            </Carousel>

            {/* Swipe hint - mobile only */}
            <div className="md:hidden mt-4 flex justify-center pointer-events-none">
              <div className="bg-slate-900/70 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Swipe to see more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(14,165,233,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">Service Areas</h3>
            <p className="text-lg sm:text-xl text-slate-600 font-light px-4">Proudly serving the Greater Toronto Area</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center max-w-6xl mx-auto">
            {/* Location Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8">
              <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">We Serve</h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  "Toronto",
                  "Mississauga",
                  "Brampton",
                  "Vaughan",
                  "Markham",
                  "Richmond Hill",
                  "Oakville",
                  "Burlington",
                  "Pickering",
                  "Ajax"
                ].map((city, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCity(city)}
                    className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer ${
                      selectedCity === city
                        ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-lg'
                        : 'bg-gradient-to-r from-sky-50 to-cyan-50 hover:from-sky-100 hover:to-cyan-100'
                    }`}
                  >
                    <CheckCircle className={`flex-shrink-0 ${selectedCity === city ? 'text-white' : 'text-sky-600'}`} size={16} />
                    <span className={`font-medium text-sm sm:text-base ${selectedCity === city ? 'text-white' : 'text-slate-700'}`}>{city}</span>
                  </button>
                ))}
              </div>
              <p className="mt-4 sm:mt-6 text-slate-600 text-sm italic font-light">
                {selectedCity ? `Showing ${selectedCity} area. Click another city or ` : 'Click a city to zoom in, or '}
                <button 
                  onClick={() => setSelectedCity(null)}
                  className="text-sky-600 hover:text-sky-700 font-medium underline"
                >
                  view all GTA
                </button>
              </p>
            </div>

            {/* Map */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden h-[280px] sm:h-[320px]" data-testid="service-area-map">
              <iframe
                key={selectedCity || 'gta'}
                title={selectedCity ? `${selectedCity} Service Area` : 'GTA Service Area'}
                src={getMapUrl()}
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
              <a
                href={getMapsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="open-in-google-maps"
                className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold px-3 py-2 rounded-full shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
              >
                <MapPin size={14} className="text-sky-600" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-20">
            <h3 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">Get Your Free Quote</h3>
            <p className="text-lg sm:text-xl text-slate-600 font-light px-4">Contact us today for a free, no-obligation quote</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Contact Information</h4>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-4 p-5 rounded-xl hover:bg-gradient-to-r hover:from-sky-50 hover:to-cyan-50 transition-all duration-300">
                    <Phone className="text-sky-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Phone</p>
                      <a href={`tel:${phoneNumber}`} className="text-sky-600 hover:text-sky-700 text-lg font-medium">
                        {phoneNumber}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-xl hover:bg-gradient-to-r hover:from-sky-50 hover:to-cyan-50 transition-all duration-300">
                    <Clock className="text-sky-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Business Hours</p>
                      <p className="text-slate-600">7:00 AM - 7:00 PM</p>
                      <p className="text-slate-600">7 Days a Week</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-xl hover:bg-gradient-to-r hover:from-sky-50 hover:to-cyan-50 transition-all duration-300">
                    <MapPin className="text-sky-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Service Area</p>
                      <p className="text-slate-600">Greater Toronto Area</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <a href={smsLink} className="block">
                  <Button size="lg" className="w-full bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold py-6 sm:py-7 text-base sm:text-lg transition-all duration-300 hover:shadow-xl hover:shadow-sky-600/30">
                    Text Us Now
                  </Button>
                </a>
                <a href={`tel:${phoneNumber}`} className="block">
                  <Button size="lg" variant="outline" className="w-full border-2 border-sky-600 text-sky-700 hover:bg-gradient-to-r hover:from-sky-50 hover:to-cyan-50 font-semibold py-6 sm:py-7 text-base sm:text-lg transition-all duration-300">
                    Call Now
                  </Button>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-slate-300 focus:border-sky-500 focus:ring-sky-500 h-12"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                      Phone *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="border-slate-300 focus:border-sky-500 focus:ring-sky-500 h-12"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-slate-900 mb-2">
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-md px-4 py-3 focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none h-12"
                    >
                      <option value="">Select a service</option>
                      <option value="window">Window Cleaning</option>
                      <option value="pressure">Pressure Washing</option>
                      <option value="gutter">Gutter Cleaning</option>
                      <option value="bin">Garbage Bin Cleaning</option>
                      <option value="multiple">Multiple Services</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="border-slate-300 focus:border-sky-500 focus:ring-sky-500 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold py-7 text-lg transition-all duration-300 hover:shadow-xl hover:shadow-sky-600/30"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h5 className="text-2xl font-bold text-sky-400 mb-4">Blue Haven</h5>
              <p className="text-slate-300 leading-relaxed font-light">
                Professional exterior cleaning services for the Greater Toronto Area. Making your home shine since day one.
              </p>
            </div>

            <div>
              <h6 className="text-lg font-semibold mb-4">Quick Links</h6>
              <ul className="space-y-3">
                <li><a href="#services" className="text-slate-300 hover:text-sky-400 transition-colors font-light">Services</a></li>
                <li><a href="#gallery" className="text-slate-300 hover:text-sky-400 transition-colors font-light">Our Work</a></li>
                <li><a href="#reviews" className="text-slate-300 hover:text-sky-400 transition-colors font-light">Reviews</a></li>
                <li><a href="#contact" className="text-slate-300 hover:text-sky-400 transition-colors font-light">Contact</a></li>
              </ul>
            </div>

            <div>
              <h6 className="text-lg font-semibold mb-4">Contact Us</h6>
              <ul className="space-y-3">
                <li className="text-slate-300 font-light">Phone: <a href={`tel:${phoneNumber}`} className="text-sky-400 hover:text-sky-300 font-medium">{phoneNumber}</a></li>
                <li className="text-slate-300 font-light">Hours: 7AM - 7PM Daily</li>
                <li className="text-slate-300 font-light">Service Area: GTA</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-slate-400 font-light">&copy; {new Date().getFullYear()} Blue Haven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
