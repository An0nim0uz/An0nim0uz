import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, Star, ChevronDown, Menu, Shield, Hammer, Search, Cloud, ArrowRight, ArrowUpRight } from 'lucide-react';
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
import ServiceAreaMap from '../components/ServiceAreaMap';
import { toast } from 'sonner';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_haven-clone-1/artifacts/tsd59e6t_Delta-Roofing-Inc-Logo-Vector-NEW-02-edited.png';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', message: '' });
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const phoneNumber = '416-798-0977';
  const emailAddress = 'admin@deltaroofing.ca';
  const address = {
    line1: '1000 Martin Grove Rd',
    line2: 'Etobicoke, ON M9W 4V8',
  };
  const smsLink = `sms:${phoneNumber}?body=Hi Delta Roofing, I'd like to get a quote for`;

  const getMapsAppUrl = () => {
    const query = selectedCity ? `${selectedCity}, Ontario, Canada` : 'Greater Toronto Area, Ontario, Canada';
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  };

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/quote-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Thanks! We'll be in touch shortly.");
        const serviceMap = {
          replacement: 'roof replacement',
          repair: 'roof repair',
          inspection: 'a roof inspection',
          storm: 'storm / emergency repair',
          eavestrough: 'eavestrough work',
          multiple: 'multiple services',
        };
        const serviceName = serviceMap[formData.service] || 'roofing services';
        let smsMessage = `Hi, I'm ${formData.name} and I'm interested in getting a quote for ${serviceName}.`;
        if (formData.message?.trim()) smsMessage += ` ${formData.message}`;
        smsMessage += ` You can reach me at ${formData.phone}. Thanks!`;
        window.open(`sms:${phoneNumber}?body=${encodeURIComponent(smsMessage)}`, '_blank');
        setFormData({ name: '', phone: '', service: '', message: '' });
      } else {
        toast.error('Something went wrong. Please call or text us directly.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please call or text us directly.');
    }
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const services = [
    {
      icon: Hammer,
      title: 'Roof Replacement',
      desc: 'Full tear-off and re-roof using premium IKO & GAF asphalt shingles, metal, and flat-roof systems.',
      img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=900&q=80',
    },
    {
      icon: Shield,
      title: 'Roof Repair',
      desc: 'Leaks, missing shingles, flashing, vents, and chimney work — fixed right the first time.',
      img: 'https://images.unsplash.com/photo-1610128114197-485d933885c5?w=900&q=80',
    },
    {
      icon: Search,
      title: 'Free Inspections',
      desc: 'Detailed roof assessment with photos and a transparent, no-pressure written quote.',
      img: 'https://images.unsplash.com/photo-1503594384566-461fe158e797?w=900&q=80',
    },
    {
      icon: Cloud,
      title: 'Storm & Emergency',
      desc: '24/7 emergency tarping and storm damage repair. We work directly with insurance.',
      img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80',
    },
  ];

  const stats = [
    { value: '15+', label: 'Years Experience' },
    { value: '2,000+', label: 'Roofs Installed' },
    { value: '10yr', label: 'Workmanship Warranty' },
    { value: '4.9', label: 'Average Rating' },
  ];

  const reviews = [
    { name: 'Andrew K.', city: 'Mississauga', text: 'Delta replaced our entire roof in two days. Crew was professional, the cleanup was spotless, and the price beat three other quotes. Highly recommend.' },
    { name: 'Priya S.', city: 'Markham', text: 'Had a major leak after a storm. They came out same-day, tarped it for free, and had it permanently fixed within a week. Great communication throughout.' },
    { name: 'Marco D.', city: 'Vaughan', text: 'Honest inspection, no upselling. They told me my roof had 5+ years of life left when others tried to sell me a full replacement. Earned my trust.' },
    { name: 'Jennifer T.', city: 'Toronto', text: 'New shingles look incredible. The eavestroughs and flashing they installed are top-tier work. The 10-year workmanship warranty was the deciding factor.' },
    { name: 'Chris L.', city: 'Oakville', text: 'From quote to completion in under two weeks. Fair, fast, and clean. Insurance claim was handled smoothly on their end.' },
  ];

  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=80', alt: 'Asphalt shingle replacement' },
    { url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80', alt: 'Modern home with new roof' },
    { url: 'https://images.unsplash.com/photo-1564540583246-934409427776?w=1200&q=80', alt: 'Suburban home roof project' },
    { url: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80', alt: 'Roof detail close-up' },
    { url: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=1200&q=80', alt: 'Premium shingle installation' },
  ];

  const trustChips = ['Licensed & Insured', 'IKO Certified', 'GAF Authorized', 'WSIB Covered', 'BBB Accredited', '10-Year Warranty'];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header
        data-testid="site-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-center gap-3 group" data-testid="header-logo">
              <div className="p-1.5 rounded-lg bg-white transition-all">
                <img src={LOGO_URL} alt="Delta Roofing Inc." className="h-10 w-10 object-contain" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className={`font-display font-extrabold text-xl sm:text-2xl tracking-tight transition-colors ${isScrolled ? 'text-[#0a2540]' : 'text-white'}`}>
                  DELTA ROOFING
                </span>
                <span className={`text-[10px] font-semibold tracking-[0.25em] transition-colors ${isScrolled ? 'text-slate-500' : 'text-white/70'}`}>
                  INC.
                </span>
              </div>
            </a>

            <div className="flex items-center gap-2 sm:gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    data-testid="nav-menu-trigger"
                    variant="ghost"
                    size="icon"
                    className={`transition-all hover:scale-110 ${
                      isScrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/20'
                    }`}
                  >
                    <Menu size={22} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 bg-white border-slate-200">
                  <DropdownMenuItem asChild><a href="#services" className="w-full cursor-pointer font-medium">Services</a></DropdownMenuItem>
                  <DropdownMenuItem asChild><a href="#work" className="w-full cursor-pointer font-medium">Our Work</a></DropdownMenuItem>
                  <DropdownMenuItem asChild><a href="#reviews" className="w-full cursor-pointer font-medium">Reviews</a></DropdownMenuItem>
                  <DropdownMenuItem asChild><a href="#areas" className="w-full cursor-pointer font-medium">Service Areas</a></DropdownMenuItem>
                  <DropdownMenuItem asChild><a href="#contact" className="w-full cursor-pointer font-medium">Contact</a></DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={`tel:${phoneNumber}`} className="w-full cursor-pointer flex items-center gap-2 font-medium">
                      <Phone size={14} /> {phoneNumber}
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={`mailto:${emailAddress}`} className="w-full cursor-pointer flex items-center gap-2 font-medium">
                      <Mail size={14} /> Email us
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <a href={smsLink} className="hidden sm:block">
                <Button
                  data-testid="header-cta-btn"
                  className="bg-[#0a2540] hover:bg-black text-white font-semibold px-5 rounded-full transition-all hover:scale-105"
                >
                  Free Quote <ArrowRight size={16} className="ml-1.5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-end overflow-hidden bg-[#0a2540]">
        {/* Background image with navy gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1920&q=80"
            alt="Modern home with premium roofing"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a2540] via-[#0a2540]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#061a30] via-transparent to-[#0a2540]/40"></div>
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          ></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 sm:pb-20">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6 animate-fade-up">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-white/90 text-xs sm:text-sm font-semibold tracking-wide">NOW BOOKING — FREE INSPECTIONS THIS WEEK</span>
              </div>

              <h1
                data-testid="hero-headline"
                className="font-display text-white text-5xl sm:text-7xl lg:text-[7.5rem] font-extrabold leading-[0.9] tracking-tight mb-6 animate-fade-up"
                style={{ animationDelay: '0.1s' }}
              >
                Roofs built<br />
                <span className="text-white/40">to outlast</span><br />
                <span className="relative inline-block">
                  the storm.
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-white"></span>
                </span>
              </h1>

              <p className="text-white/80 text-lg sm:text-xl max-w-xl mb-8 font-light leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
                Family-run, fully licensed, and obsessed with craftsmanship. Delta Roofing protects GTA homes with premium materials and a 10-year workmanship warranty.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <a href={smsLink} className="w-full sm:w-auto">
                  <Button
                    data-testid="hero-quote-btn"
                    size="lg"
                    className="w-full sm:w-auto bg-white hover:bg-slate-100 text-[#0a2540] font-bold px-8 py-7 text-base rounded-full transition-all hover:scale-105 shadow-2xl"
                  >
                    Get a Free Quote <ArrowUpRight size={18} className="ml-1" />
                  </Button>
                </a>
                <Button
                  data-testid="hero-contact-btn"
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo('contact')}
                  className="w-full sm:w-auto border-2 border-white/40 bg-transparent text-white hover:bg-white hover:text-[#0a2540] font-bold px-8 py-7 text-base rounded-full transition-all"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Stats card */}
            <div className="lg:col-span-4">
              <div className="grid grid-cols-2 gap-px bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                {stats.map((s, i) => (
                  <div key={i} className="bg-[#0a2540]/60 backdrop-blur-md p-5 sm:p-6 hover:bg-[#0a2540]/80 transition-colors" data-testid={`stat-${i}`}>
                    <div className="font-display text-white text-3xl sm:text-4xl font-extrabold tracking-tight">{s.value}</div>
                    <div className="text-white/60 text-xs sm:text-sm font-medium mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
          <ChevronDown size={28} className="text-white/60 animate-bounce" />
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section className="bg-black text-white py-5 overflow-hidden border-y border-white/10">
        <div className="flex animate-marquee whitespace-nowrap gap-12">
          {[...trustChips, ...trustChips, ...trustChips].map((chip, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-semibold tracking-widest uppercase text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              {chip}
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 sm:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
            <div className="lg:col-span-7">
              <div className="text-xs font-bold tracking-[0.3em] text-[#0a2540] mb-4">— SERVICES</div>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-[#0a2540] tracking-tight leading-[0.95]">
                Everything your<br />roof needs.<span className="text-slate-300"> Done right.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-slate-600 text-lg leading-relaxed font-light">
                From a single missing shingle to a full re-roof, Delta handles it with the same obsession for detail. Premium materials, certified crews, no surprises.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <Card
                key={i}
                data-testid={`service-card-${i}`}
                className="group relative overflow-hidden border-0 shadow-none bg-slate-50 hover:bg-[#0a2540] transition-all duration-500 rounded-2xl"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/80 via-[#0a2540]/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-lg">
                    <s.icon size={20} className="text-[#0a2540]" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold text-[#0a2540] group-hover:text-white mb-2 transition-colors">{s.title}</h3>
                  <p className="text-slate-600 group-hover:text-white/80 text-sm leading-relaxed transition-colors">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-[#0a2540] group-hover:text-white text-sm font-bold transition-colors">
                    Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US — Big Type Block */}
      <section className="bg-[#0a2540] text-white py-20 sm:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-xs font-bold tracking-[0.3em] text-white/60 mb-4">— WHY DELTA</div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95] mb-12 max-w-4xl">
            We&apos;d rather do it<br />
            <span className="text-white/40">once, and do it</span> right.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {[
              { num: '01', title: 'Free Inspections', desc: 'No-pressure quote with photos and a clear scope of work.' },
              { num: '02', title: 'Manufacturer Certified', desc: 'IKO and GAF approved installer with full system warranties.' },
              { num: '03', title: '10-Year Workmanship', desc: 'Backed in writing. If we install it, we stand behind it.' },
              { num: '04', title: '24/7 Emergency', desc: 'Storm damage? We tarp the same day and bill insurance directly.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#0a2540] hover:bg-black p-7 sm:p-8 transition-all duration-300 group" data-testid={`why-item-${i}`}>
                <div className="font-display text-white/30 text-2xl font-bold mb-6">{item.num}</div>
                <h3 className="font-display text-white text-xl sm:text-2xl font-bold mb-3 group-hover:translate-x-1 transition-transform">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR WORK GALLERY */}
      <section id="work" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-bold tracking-[0.3em] text-[#0a2540] mb-4">— OUR WORK</div>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-[#0a2540] tracking-tight leading-[0.95]">
                Recent projects.
              </h2>
            </div>
            <p className="text-slate-600 text-lg max-w-md font-light">
              Every roof is a story. Swipe through some of our latest work across the GTA.
            </p>
          </div>

          <div className="relative" data-testid="our-work-carousel">
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent>
                {galleryImages.map((image, i) => (
                  <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2" data-testid={`gallery-slide-${i}`}>
                    <div className="p-1">
                      <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-72 sm:h-[420px] bg-slate-200">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          draggable="false"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/90 via-[#0a2540]/10 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="text-white/70 text-xs font-bold tracking-[0.25em] mb-2">PROJECT 0{i + 1}</div>
                          <div className="font-display text-white text-2xl font-bold">{image.alt}</div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 bg-[#0a2540] text-white border-[#0a2540] hover:bg-black hover:text-white" data-testid="gallery-prev-btn" />
              <CarouselNext className="hidden md:flex -right-4 lg:-right-12 bg-[#0a2540] text-white border-[#0a2540] hover:bg-black hover:text-white" data-testid="gallery-next-btn" />
            </Carousel>

            <div className="md:hidden mt-4 flex justify-center pointer-events-none">
              <div className="bg-[#0a2540] text-white px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2">
                <ArrowRight size={14} className="rotate-180" />
                Swipe to see more
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="text-xs font-bold tracking-[0.3em] text-[#0a2540] mb-4">— REVIEWS</div>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-[#0a2540] tracking-tight leading-[0.95] mb-4">
              Real homeowners.<br />Real results.
            </h2>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-[#0a2540] text-[#0a2540]" />
                ))}
              </div>
              <span className="text-slate-700 font-semibold ml-2">4.9 / 5 from 200+ reviews</span>
            </div>
          </div>

          <Carousel opts={{ align: 'start', loop: true }} className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {reviews.map((r, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3" data-testid={`review-${i}`}>
                  <div className="p-1 h-full">
                    <Card className="border-0 shadow-md hover:shadow-xl bg-white h-full transition-all duration-300 rounded-2xl">
                      <CardContent className="p-7 flex flex-col h-full">
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-[#0a2540] text-[#0a2540]" />)}
                        </div>
                        <p className="text-slate-700 leading-relaxed font-light text-[15px] flex-grow">&ldquo;{r.text}&rdquo;</p>
                        <div className="mt-5 pt-5 border-t border-slate-200 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#0a2540] text-white flex items-center justify-center font-display font-bold">
                            {r.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-[#0a2540] text-sm">{r.name}</div>
                            <div className="text-slate-500 text-xs">{r.city}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex bg-white border-slate-200" />
            <CarouselNext className="hidden md:flex bg-white border-slate-200" />
          </Carousel>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section id="areas" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs font-bold tracking-[0.3em] text-[#0a2540] mb-4">— SERVICE AREAS</div>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0a2540] tracking-tight leading-[0.95] mb-6">
                Proudly serving the<br />Greater Toronto Area.
              </h2>
              <p className="text-slate-600 mb-8 font-light leading-relaxed">
                Tap a city to zoom in. Don&apos;t see yours? Give us a call — we likely cover it.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham', 'Richmond Hill', 'Oakville', 'Burlington', 'Pickering', 'Ajax'].map((city, idx) => (
                  <button
                    key={city}
                    data-testid={`city-pill-${idx}`}
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                      selectedCity === city
                        ? 'bg-[#0a2540] text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
              {selectedCity && (
                <button
                  data-testid="reset-city"
                  onClick={() => setSelectedCity(null)}
                  className="mt-4 text-sm text-[#0a2540] hover:text-black underline font-medium"
                >
                  ← View full GTA
                </button>
              )}
            </div>

            <div className="relative bg-slate-100 rounded-2xl shadow-xl overflow-hidden h-[320px] sm:h-[420px]" data-testid="service-area-map">
              <ServiceAreaMap selectedCity={selectedCity} />
              <a
                href={getMapsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="open-in-google-maps"
                className="absolute bottom-3 right-3 z-[1000] bg-white hover:bg-slate-100 text-[#0a2540] text-xs font-bold px-3 py-2 rounded-full shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
              >
                <MapPin size={14} />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 sm:py-28 bg-[#0a2540] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="text-xs font-bold tracking-[0.3em] text-white/60 mb-4">— GET A QUOTE</div>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight leading-[0.95] mb-6">
                Let&apos;s talk<br />about your roof.
              </h2>
              <p className="text-white/70 text-lg font-light mb-10 max-w-md">
                Free inspection, free quote, no high-pressure sales. Just an honest conversation about what your home needs.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                  <Phone className="mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-white/60 text-xs font-bold tracking-widest uppercase">Phone</p>
                    <a href={`tel:${phoneNumber}`} className="font-display text-xl font-bold hover:text-white/80 transition-colors" data-testid="contact-phone">{phoneNumber}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                  <Mail className="mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-white/60 text-xs font-bold tracking-widest uppercase">Email</p>
                    <a href={`mailto:${emailAddress}`} className="font-display text-xl font-bold hover:text-white/80 transition-colors break-all" data-testid="contact-email">{emailAddress}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                  <Clock className="mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-white/60 text-xs font-bold tracking-widest uppercase">Hours</p>
                    <p className="font-medium">7 AM – 7 PM, 7 days a week</p>
                    <p className="text-white/60 text-sm">24/7 emergency service</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                  <MapPin className="mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-white/60 text-xs font-bold tracking-widest uppercase">Address</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.line1 + ', ' + address.line2)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-white/80 transition-colors block"
                      data-testid="contact-address"
                    >
                      {address.line1}<br />{address.line2}
                    </a>
                    <p className="text-white/60 text-sm">Servicing the entire GTA</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href={smsLink} className="flex-1">
                  <Button data-testid="contact-text-btn" size="lg" className="w-full bg-white text-[#0a2540] hover:bg-slate-100 font-bold py-7 rounded-full">Text Us</Button>
                </a>
                <a href={`tel:${phoneNumber}`} className="flex-1">
                  <Button data-testid="contact-call-btn" size="lg" variant="outline" className="w-full border-2 border-white/40 bg-transparent text-white hover:bg-white hover:text-[#0a2540] font-bold py-7 rounded-full">Call Now</Button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Card className="border-0 bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                <CardContent className="p-7 sm:p-10">
                  <h3 className="font-display text-2xl font-extrabold text-[#0a2540] mb-1">Request a free quote</h3>
                  <p className="text-slate-500 text-sm mb-7">We&apos;ll get back to you within 1 business day.</p>
                  <form onSubmit={handleSubmit} className="space-y-5" data-testid="quote-form">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold text-[#0a2540] mb-2 tracking-widest uppercase">Name *</label>
                        <Input data-testid="form-name" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="border-slate-300 focus:border-[#0a2540] focus:ring-[#0a2540] h-12 rounded-lg" placeholder="Your name" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold text-[#0a2540] mb-2 tracking-widest uppercase">Phone *</label>
                        <Input data-testid="form-phone" id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required className="border-slate-300 focus:border-[#0a2540] focus:ring-[#0a2540] h-12 rounded-lg" placeholder="Phone number" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-xs font-bold text-[#0a2540] mb-2 tracking-widest uppercase">Service Needed</label>
                      <select data-testid="form-service" id="service" name="service" value={formData.service} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg px-4 h-12 focus:border-[#0a2540] focus:ring-2 focus:ring-[#0a2540] focus:outline-none bg-white">
                        <option value="">Select a service</option>
                        <option value="replacement">Roof Replacement</option>
                        <option value="repair">Roof Repair</option>
                        <option value="inspection">Free Inspection</option>
                        <option value="storm">Storm / Emergency</option>
                        <option value="eavestrough">Eavestroughs / Gutters</option>
                        <option value="multiple">Multiple Services</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-[#0a2540] mb-2 tracking-widest uppercase">Tell us about your project</label>
                      <Textarea data-testid="form-message" id="message" name="message" value={formData.message} onChange={handleInputChange} rows={4} className="border-slate-300 focus:border-[#0a2540] focus:ring-[#0a2540] resize-none rounded-lg" placeholder="Roof age, issues, address (optional)..." />
                    </div>
                    <Button data-testid="form-submit" type="submit" size="lg" className="w-full bg-[#0a2540] hover:bg-black text-white font-bold py-7 rounded-full transition-all">
                      Send Message <ArrowUpRight size={18} className="ml-1" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-white p-1.5 rounded-lg">
                  <img src={LOGO_URL} alt="Delta Roofing Inc." className="h-10 w-10 object-contain" />
                </div>
                <div className="leading-tight">
                  <div className="font-display font-extrabold text-2xl tracking-tight">DELTA ROOFING</div>
                  <div className="text-xs font-semibold tracking-[0.25em] text-white/50">INC.</div>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed font-light max-w-md">
                Family-run residential roofing experts serving the Greater Toronto Area. Premium materials, certified crews, honest pricing.
              </p>
            </div>
            <div>
              <h6 className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-4">Quick Links</h6>
              <ul className="space-y-3">
                <li><a href="#services" className="text-white/80 hover:text-white transition-colors">Services</a></li>
                <li><a href="#work" className="text-white/80 hover:text-white transition-colors">Our Work</a></li>
                <li><a href="#reviews" className="text-white/80 hover:text-white transition-colors">Reviews</a></li>
                <li><a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-4">Contact</h6>
              <ul className="space-y-3">
                <li><a href={`tel:${phoneNumber}`} className="text-white/80 hover:text-white transition-colors block" data-testid="footer-phone">{phoneNumber}</a></li>
                <li><a href={`mailto:${emailAddress}`} className="text-white/80 hover:text-white transition-colors break-all block" data-testid="footer-email">{emailAddress}</a></li>
                <li className="text-white/80 leading-relaxed">{address.line1}<br />{address.line2}</li>
                <li className="text-white/80">7 AM – 7 PM, 7 days</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-3 justify-between text-sm text-white/40">
            <p>&copy; {new Date().getFullYear()} Delta Roofing Inc. All rights reserved.</p>
            <p>Licensed &middot; Insured &middot; WSIB Covered</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
