import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, Star, ChevronDown, Menu, Shield, Hammer, Search, Cloud, ArrowRight, ArrowUpRight, Wrench, LayoutGrid, Layers, Building2 } from 'lucide-react';
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
          inspection: 'estimates & inspections',
          maintenance: 'maintenance & repair',
          emergency: 'emergency repair service',
          alterations: 'alterations & retrofits',
          coatings: 'coating systems',
          replacement: 'a roof replacement',
          multiple: 'multiple services',
        };
        const serviceName = serviceMap[formData.service] || 'commercial roofing services';
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
      icon: Search,
      title: 'Estimates & Inspections',
      desc: 'Detailed roof assessments, drone surveys, moisture scans, and transparent itemized quotes for property managers and owners.',
      img: 'https://images.unsplash.com/photo-1525478440856-b40668b83b79?w=1200&q=80',
    },
    {
      icon: Wrench,
      title: 'Maintenance & Repair',
      desc: 'Scheduled preventative maintenance programs, leak repairs, flashing, and seam work that extends roof life by 5–10 years.',
      img: 'https://images.unsplash.com/photo-1559836513-6d09f0d49ec8?w=1200&q=80',
    },
    {
      icon: Cloud,
      title: 'Emergency Repair Service',
      desc: 'Storm damage, active leaks, and ponding water — dispatched fast. Insurance billed direct.',
      img: 'https://images.unsplash.com/photo-1640476750068-72c645e653cd?w=1200&q=80',
    },
    {
      icon: LayoutGrid,
      title: 'Alterations & Retrofits',
      desc: 'HVAC curbs, skylights, hatches, drains, and structural retrofits — fully integrated and warranty-backed.',
      img: 'https://images.unsplash.com/photo-1704908325704-250c0a685c11?w=1200&q=80',
    },
    {
      icon: Layers,
      title: 'Coating Systems',
      desc: 'Restorative silicone, acrylic, and SPF coatings that seal aging roofs, reflect UV, and defer replacement costs.',
      img: 'https://images.unsplash.com/photo-1679232065280-7551023ee326?w=1200&q=80',
    },
    {
      icon: Hammer,
      title: 'Roof Replacements',
      desc: 'Full tear-off and re-roof — TPO, EPDM, modified bitumen, PVC, and metal systems. Manufacturer-certified installs.',
      img: 'https://images.unsplash.com/photo-1719211608617-24231c31f875?w=1200&q=80',
    },
  ];

  const stats = [
    { value: '20+', label: 'Years In Service' },
    { value: '2,000+', label: 'Jobs Done' },
    { value: '100%', label: 'WSIB Covered' },
  ];

  const reviews = [
    { name: 'David R.', city: 'Property Manager · Etobicoke', text: 'Delta has serviced our 12-building portfolio for 6 years. Quarterly inspections, fast emergency dispatch, and clear documentation. Best commercial roofer we\'ve worked with.' },
    { name: 'Linda C.', city: 'Facility Director · Mississauga', text: 'Re-roofed our 80,000 sq ft warehouse with TPO. Crew was on schedule, kept the site clean, and the warranty was the strongest of three bids. Zero complaints from tenants.' },
    { name: 'Marcus T.', city: 'GC · Toronto', text: 'We sub Delta on every commercial retrofit. They show up, hit deadlines, and the workmanship is consistent. WSIB and insurance docs are always perfect on day one.' },
    { name: 'Karen S.', city: 'Owner · Vaughan', text: 'Storm tore part of our retail roof off on a Saturday. Delta had it tarped within 4 hours and a permanent repair done by Tuesday. Insurance billed direct. Lifesavers.' },
    { name: 'Anil P.', city: 'REIT Asset Manager', text: 'Their silicone coating system extended one of our flat roofs by 12+ years and saved us a six-figure replacement. Honest assessment, beautifully executed.' },
  ];

  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&q=80', alt: 'TPO membrane on warehouse' },
    { url: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?w=1200&q=80', alt: 'Industrial facility re-roof' },
    { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', alt: 'Downtown commercial building' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', alt: 'Office complex roof' },
    { url: 'https://images.unsplash.com/photo-1543674892-7d64d45df18b?w=1200&q=80', alt: 'Aerial roof inspection' },
    { url: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=1200&q=80', alt: 'Multi-unit retrofit project' },
  ];

  const trustChips = ['Licensed & Insured', 'WSIB Covered', 'GAF Certified', 'IKO Approved', 'Carlisle SynTec', 'Firestone Red Shield', 'BBB Accredited', '$5M Liability'];

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
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
            alt="Commercial building with premium roofing"
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
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-white/90 text-xs sm:text-sm font-semibold tracking-wide">COMMERCIAL ROOFING · GREATER TORONTO AREA</span>
              </div>

              <h1
                data-testid="hero-headline"
                className="font-display text-white text-5xl sm:text-7xl lg:text-[7.5rem] font-extrabold leading-[0.9] tracking-tight mb-6 animate-fade-up"
                style={{ animationDelay: '0.1s' }}
              >
                Roofs you don&apos;t<br />
                <span className="text-white/40">have to think</span><br />
                <span className="relative inline-block">
                  about.
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-white"></span>
                </span>
              </h1>

              <p className="text-white/80 text-lg sm:text-xl max-w-xl mb-8 font-light leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
                TPO, EPDM, modified bitumen, and coatings. Delta Roofing partners with property managers, REITs, and GCs across the GTA — from inspections to full replacements.
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
              <div className="grid grid-cols-3 gap-px bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                {stats.map((s, i) => (
                  <div key={i} className="bg-[#0a2540]/60 backdrop-blur-md p-4 sm:p-5 hover:bg-[#0a2540]/80 transition-colors text-center" data-testid={`stat-${i}`}>
                    <div className="font-display text-white text-2xl sm:text-3xl font-extrabold tracking-tight">{s.value}</div>
                    <div className="text-white/60 text-[11px] sm:text-xs font-medium mt-1 leading-tight">{s.label}</div>
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
                Full-service<br />commercial roofing.<span className="text-slate-300"> Done right.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-slate-600 text-lg leading-relaxed font-light">
                From a single ponding-water repair to a multi-building TPO retrofit, our certified crews deliver to spec, on schedule, and with documentation your insurer and warranty provider will love.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
            Built for the buildings<br />
            <span className="text-white/40">that keep your</span> business running.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {[
              { num: '01', title: 'Property Manager Focus', desc: 'Quarterly maintenance programs, photo documentation, and a single point of contact across your portfolio.' },
              { num: '02', title: 'Manufacturer Certified', desc: 'GAF Master, IKO Shieldpro, Carlisle SynTec, and Firestone Red Shield — full system warranties up to 30 years.' },
              { num: '03', title: 'Insurance & Compliance', desc: '$5M liability, WSIB clearance, current COI on file, and direct billing to insurance carriers.' },
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
              Trusted by property<br />managers across the GTA.
            </h2>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-[#0a2540] text-[#0a2540]" />
                ))}
              </div>
              <span className="text-slate-700 font-semibold ml-2">4.9 / 5 from 200+ commercial clients</span>
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
                Free roof inspection and detailed estimate. We work with property managers, owners, and GCs across the GTA.
              </p>

              <div className="space-y-4 mb-10">
                <a
                  href={`tel:${phoneNumber}`}
                  data-testid="contact-phone-card"
                  className="flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors active:scale-[0.99]"
                >
                  <Phone className="mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-white/60 text-xs font-bold tracking-widest uppercase">Phone — tap to call</p>
                    <span className="font-display text-xl font-bold" data-testid="contact-phone">{phoneNumber}</span>
                  </div>
                </a>
                <a
                  href={`mailto:${emailAddress}`}
                  data-testid="contact-email-card"
                  className="flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors active:scale-[0.99]"
                >
                  <Mail className="mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-white/60 text-xs font-bold tracking-widest uppercase">Email — tap to send</p>
                    <span className="font-display text-xl font-bold break-all" data-testid="contact-email">{emailAddress}</span>
                  </div>
                </a>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                  <Clock className="mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-white/60 text-xs font-bold tracking-widest uppercase">Hours</p>
                    <p className="font-medium">7 AM – 7 PM, 7 days a week</p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.line1 + ', ' + address.line2)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-address-card"
                  className="flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors active:scale-[0.99]"
                >
                  <MapPin className="mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-white/60 text-xs font-bold tracking-widest uppercase">Address — tap for directions</p>
                    <span className="font-medium block" data-testid="contact-address">
                      {address.line1}<br />{address.line2}
                    </span>
                    <p className="text-white/60 text-sm">Servicing the entire GTA</p>
                  </div>
                </a>
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
                  <h3 className="font-display text-2xl font-extrabold text-[#0a2540] mb-1">Request a free estimate</h3>
                  <p className="text-slate-500 text-sm mb-7">We&apos;ll respond within 1 business day. For active leaks, please call us directly.</p>
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
                        <option value="inspection">Estimates &amp; Inspections</option>
                        <option value="maintenance">Maintenance &amp; Repair</option>
                        <option value="emergency">Emergency Repair Service</option>
                        <option value="alterations">Alterations &amp; Retrofits</option>
                        <option value="coatings">Coating Systems</option>
                        <option value="replacement">Roof Replacement</option>
                        <option value="multiple">Multiple Services</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-[#0a2540] mb-2 tracking-widest uppercase">Tell us about your project</label>
                      <Textarea data-testid="form-message" id="message" name="message" value={formData.message} onChange={handleInputChange} rows={4} className="border-slate-300 focus:border-[#0a2540] focus:ring-[#0a2540] resize-none rounded-lg" placeholder="Building type, approximate sq ft, roof age, address (optional)..." />
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
                Commercial roofing experts serving the Greater Toronto Area. TPO, EPDM, modified bitumen, coatings, and full-system replacements — backed by manufacturer warranties.
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
