import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles, ShoppingBag, Search, Star, Check, RefreshCw, Truck,
  ShieldCheck, Heart, SlidersHorizontal, ChevronRight, ChevronDown,
  Plus, Minus, MessageSquare, ArrowRight, Info, Layers, Calendar,
  Send, X, Menu, Leaf, Award, Zap, Globe, Phone, Mail, MapPin,
  Globe2, BookOpen, Clock, ChevronLeft,
  Package, RotateCcw, BadgeCheck, Quote, TrendingUp, Play, Rss
} from 'lucide-react';

// Social icon aliases (lucide-react branded icons not available in this version)
const Instagram = Globe2;
const Twitter = Rss;
const Youtube = Play;

/* ============================================================
   DATA
   ============================================================ */
const PRODUCTS = [
  {
    id: 'aura-smart-diffuser-white',
    handle: 'aura-smart-ceramic-diffuser',
    title: 'Aura Smart Ceramic Diffuser',
    variant: 'Stone White',
    price: 89.00,
    compareAtPrice: 119.00,
    category: 'diffuser',
    tags: ['smart', 'best-seller', 'premium'],
    image: '/aura_smart_diffuser.png',
    scent: 'N/A',
    rating: 4.9,
    reviewCount: 214,
    description: 'Elevate your space with intelligent aromatherapy. The matte ceramic dome diffuser blends seamlessly into any modern aesthetic while delivering powerful, whisper-quiet ultrasonic misting technology.',
    benefits: ['Intelligent Mist Dispersion', 'Ambient Underglow Lighting', 'Auto-Shutoff Safety (8-hour runtime)', 'BPA-free reservoir & premium ceramic shell'],
    label: 'Best Seller',
    color: '#F5F0EA'
  },
  {
    id: 'aura-smart-diffuser-black',
    handle: 'aura-smart-ceramic-diffuser',
    title: 'Aura Smart Ceramic Diffuser',
    variant: 'Charcoal Slate',
    price: 89.00,
    compareAtPrice: 119.00,
    category: 'diffuser',
    tags: ['smart', 'premium'],
    image: '/aura_smart_diffuser.png',
    scent: 'N/A',
    rating: 4.8,
    reviewCount: 98,
    description: 'Sleek, dark, and sophisticated. The Charcoal Slate edition features a textured dark matte finish ideal for industrial and minimalist interiors.',
    benefits: ['Textured charcoal matte finish', 'Ambient warm gold underglow', 'Silent ultrasonic micro-mist', '8-hour continuous runtime'],
    color: '#2A2A2A'
  },
  {
    id: 'lavender-sleep-mist',
    handle: 'lavender-chamomile-sleep-mist',
    title: 'Lavender & Chamomile Sleep Mist',
    variant: '100ml',
    price: 24.00,
    compareAtPrice: 29.00,
    category: 'mist',
    tags: ['sleep', 'lavender', 'chamomile', 'organic', 'subscription-product', 'new'],
    image: '/aura_sleep_mist.png',
    scent: 'Lavender',
    rating: 4.9,
    reviewCount: 176,
    description: 'Drift into a peaceful slumber. Formulated with organic therapeutic-grade essential oils, this gentle pillow spray triggers relaxation and prepares your mind for deep sleep.',
    benefits: ['French Lavender & Roman Chamomile', '100% Organic & Non-Staining formula', 'Free from synthetic fragrances', 'Amber glass protection bottle'],
    allowsSubscription: true,
    label: 'New',
    color: '#EDE9F4'
  },
  {
    id: 'eucalyptus-refresh-mist',
    handle: 'eucalyptus-mint-refreshing-mist',
    title: 'Eucalyptus & Mint Refreshing Mist',
    variant: '100ml',
    price: 24.00,
    compareAtPrice: 29.00,
    category: 'mist',
    tags: ['refresh', 'eucalyptus', 'mint', 'organic', 'subscription-product', 'new'],
    image: '/aura_refresh_mist.png',
    scent: 'Eucalyptus',
    rating: 4.8,
    reviewCount: 134,
    description: 'Awaken your senses and clear your mind. Combines organic Eucalyptus globulus and wild Peppermint for an invigorating, crisp shower-mist experience that sharpens your focus.',
    benefits: ['Invigorating Eucalyptus & Peppermint', 'Transforms shower into a luxury steam room', 'Pure organic steam-distilled botanicals', 'Perfect morning energy boost'],
    allowsSubscription: true,
    label: 'New',
    color: '#E4F2ED'
  },
  {
    id: 'the-ritual-set',
    handle: 'the-ritual-essential-oil-set',
    title: '"The Ritual" Essential Oil Set',
    variant: '3 x 10ml',
    price: 38.00,
    compareAtPrice: 48.00,
    category: 'set',
    tags: ['set', 'oils', 'lavender', 'eucalyptus', 'orange', 'organic', 'best-seller'],
    image: '/aura_essential_oils.png',
    scent: 'Mixed',
    rating: 5.0,
    reviewCount: 89,
    description: 'A curated trio of single-origin organic essential oils — French Lavender, Australian Eucalyptus, and Italian Sweet Orange (10ml each) in a stunning custom sliding gift box.',
    benefits: ['Includes Lavender, Eucalyptus, & Sweet Orange', '100% Pure, Undiluted, single-origin oils', 'Euro-dropper cap for perfect dosing', 'Luxury rigid sliding presentation gift box'],
    label: 'Organic',
    color: '#FDF4E3'
  }
];

const INITIAL_REVIEWS = [
  { id: 1, productHandle: 'aura-smart-ceramic-diffuser', author: 'Sarah M.', rating: 5, title: 'Absolutely Gorgeous!', body: 'The Smart Diffuser looks like a sculpture on my shelf. It is the quietest diffuser I have ever owned, and the warm underglow lighting at night is so relaxing. Essential for my living room.', date: 'June 20, 2026', verified: true },
  { id: 2, productHandle: 'lavender-chamomile-sleep-mist', author: 'David K.', rating: 5, title: 'Deep sleep is real', body: 'The Sleep Mist has become a mandatory part of my sleep routine. My room smells like a high-end spa now. Sprayed 3 times on my pillow, slept like a baby.', date: 'June 24, 2026', verified: true },
  { id: 3, productHandle: 'the-ritual-essential-oil-set', author: 'Elena R.', rating: 5, title: 'Highest Quality Oils', body: 'You can immediately tell these are pure botanical oils. No synthetic headache smell. The Australian Eucalyptus is incredibly refreshing during morning meditation.', date: 'June 25, 2026', verified: true },
  { id: 4, productHandle: 'eucalyptus-mint-refreshing-mist', author: 'James T.', rating: 5, title: 'Morning game changer', body: 'I spray this in my shower every morning and it genuinely transforms the experience. The eucalyptus clears my sinuses and gives me incredible mental clarity for the day ahead.', date: 'June 22, 2026', verified: true },
  { id: 5, productHandle: 'aura-smart-ceramic-diffuser', author: 'Priya S.', rating: 5, title: 'Premium in every way', body: 'From the packaging to the product itself — every detail screams luxury. The diffuser fills the whole room with mist in minutes and the LED glow is the perfect bedside light.', date: 'June 18, 2026', verified: true },
];

const BLOG_POSTS = [
  { id: 1, title: 'The Science Behind Aromatherapy & Deep Sleep', excerpt: 'Research shows that lavender reduces cortisol levels by up to 38%, enabling faster sleep onset and longer REM cycles. Here\'s what the latest studies say.', date: 'June 25, 2026', readTime: '4 min read', tag: 'Science', image: '/aura_sleep_mist.png', color: 'from-purple-50 to-indigo-50' },
  { id: 2, title: 'How to Build Your Perfect Morning Ritual', excerpt: 'The world\'s highest-performing professionals share one habit: a mindful morning ritual. Discover how to build yours with botanical aromatherapy as its foundation.', date: 'June 20, 2026', readTime: '6 min read', tag: 'Lifestyle', image: '/aura_refresh_mist.png', color: 'from-emerald-50 to-teal-50' },
  { id: 3, title: 'Sourcing Pure: Our Farm-to-Bottle Process', excerpt: 'From lavender fields in Provence to your amber glass bottle — we trace every drop of our oils to its certified organic source. Transparency is our most important ingredient.', date: 'June 15, 2026', readTime: '5 min read', tag: 'Sourcing', image: '/aura_essential_oils.png', color: 'from-amber-50 to-orange-50' },
];

const STATS = [
  { value: '50K+', label: 'Happy Customers', icon: Heart },
  { value: '4.9★', label: 'Average Rating', icon: Star },
  { value: '100%', label: 'Organic Certified', icon: Leaf },
  { value: '30-Day', label: 'Money Back Guarantee', icon: RotateCcw },
];

/* ============================================================
   HELPER COMPONENTS
   ============================================================ */
function StarRating({ rating, size = 'sm' }) {
  const sizeClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`${sizeClass} ${i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
      ))}
    </div>
  );
}

function SectionLabel({ children }) {
  return <span className="section-eyebrow">{children}</span>;
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="particle" style={{
          width: `${4 + (i % 5) * 3}px`,
          height: `${4 + (i % 5) * 3}px`,
          left: `${(i * 8.5) % 100}%`,
          top: `${30 + (i * 13) % 50}%`,
          animationDuration: `${5 + (i % 4) * 2}s`,
          animationDelay: `${(i * 0.6) % 4}s`,
          opacity: 0.5 + (i % 3) * 0.15,
        }} />
      ))}
    </div>
  );
}

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartShake, setCartShake] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [scentFilter, setScentFilter] = useState('all');

  // Before/After Slider
  const [sliderPct, setSliderPct] = useState(50);
  const sliderRef = useRef(null);

  // Bundle Builder (Shopify Bundles)
  const [bundleItems, setBundleItems] = useState({
    'aura-smart-diffuser-white': true,
    'lavender-sleep-mist': true,
    'the-ritual-set': true,
  });

  // Subscribe & Save (Shopify Subscriptions)
  const [purchaseMode, setPurchaseMode] = useState({
    'lavender-sleep-mist': 'one-time',
    'eucalyptus-refresh-mist': 'one-time',
  });

  // Reviews (Judge.me)
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState({ productHandle: 'aura-smart-ceramic-diffuser', author: '', rating: 5, title: '', body: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Quick View Modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cart
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState([]);

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  // Testimonial index
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Contact form
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  // Scroll listener for nav glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on tab change
  useEffect(() => { setMobileMenuOpen(false); }, [activeTab]);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx(i => (i + 1) % INITIAL_REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navigate = useCallback((tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /* --- CART LOGIC --- */
  const addToCart = useCallback((product, isSub = false) => {
    const price = isSub ? +(product.price * 0.85).toFixed(2) : product.price;
    const label = isSub ? `${product.title} (Monthly Sub)` : product.title;
    const key = `${product.id}-${isSub ? 'sub' : 'once'}`;
    setCart(prev => {
      const ex = prev.find(i => i.key === key);
      if (ex) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { key, product, isSub, price, label, qty: 1 }];
    });
    setIsCartOpen(true);
    setCartShake(true);
    setTimeout(() => setCartShake(false), 600);
  }, []);

  const removeFromCart = useCallback((key) => {
    setCart(prev => prev.filter(i => i.key !== key));
  }, []);

  const updateQty = useCallback((key, delta) => {
    setCart(prev => prev
      .map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  }, []);

  const addBundleToCart = useCallback(() => {
    const selected = PRODUCTS.filter(p => bundleItems[p.id]);
    const orig = selected.reduce((s, p) => s + p.price, 0);
    const bundlePrice = +(orig * 0.80).toFixed(2);
    const key = 'bundle-deep-sleep';
    setCart(prev => {
      const ex = prev.find(i => i.key === key);
      if (ex) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { key, product: { ...PRODUCTS[0], title: 'Deep Sleep Bundle', image: '/aura_smart_diffuser.png' }, isSub: false, price: bundlePrice, label: `Custom Bundle (${selected.length} items)`, qty: 1 }];
    });
    setIsCartOpen(true);
  }, [bundleItems]);

  const handleReviewSubmit = useCallback((e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.title || !newReview.body) return;
    setReviews(prev => [{
      id: Date.now(), ...newReview, rating: +newReview.rating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verified: false,
    }, ...prev]);
    setNewReview({ productHandle: 'aura-smart-ceramic-diffuser', author: '', rating: 5, title: '', body: '' });
    setShowReviewForm(false);
  }, [newReview]);

  const toggleWishlist = useCallback((id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const handleNewsletter = useCallback((e) => {
    e.preventDefault();
    if (newsletterEmail) setNewsletterDone(true);
  }, [newsletterEmail]);

  const handleContact = useCallback((e) => {
    e.preventDefault();
    setContactSent(true);
  }, []);

  const filteredProducts = PRODUCTS.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchSearch = p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchScent = scentFilter === 'all' || p.scent === scentFilter || p.tags.includes(scentFilter.toLowerCase());
    return matchSearch && matchCat && matchScent;
  });

  const cartTotal = +cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const bundleSelected = PRODUCTS.filter(p => bundleItems[p.id]);
  const bundleOrig = bundleSelected.reduce((s, p) => s + p.price, 0).toFixed(2);
  const bundlePrice = (bundleOrig * 0.80).toFixed(2);

  /* ============================================================
     NAVIGATION
     ============================================================ */
  const NAV_LINKS = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About' },
    { id: 'blog', label: 'Journal' },
    { id: 'apps', label: 'App Demo' },
    { id: 'contact', label: 'Contact' },
  ];

  /* ============================================================
     RENDER
     ============================================================ */
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)', fontFamily: 'var(--font-body)' }}>

      {/* Announcement Bar */}
      <div className="text-center py-2.5 px-4 text-xs font-semibold tracking-widest uppercase" style={{ background: 'var(--text-primary)', color: 'white' }}>
        <span>Free Shipping over $50 &nbsp;·&nbsp; Code <strong className="text-amber-400">AURA10</strong> for 10% off &nbsp;·&nbsp; <span className="text-amber-400">30-Day Money Back</span></span>
      </div>

      {/* ── GLASSMORPHISM NAVBAR ── */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-md' : 'bg-transparent'}`}
        style={!scrolled ? { background: 'rgba(250,250,248,0.85)', backdropFilter: 'blur(12px)' } : {}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-4">

          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center gap-2.5 group">
            <img src="/logo.png" alt="AURA Logo" className="h-9 w-auto transition-transform duration-300 group-hover:scale-105" />
            <span className="font-heading text-xl font-bold tracking-widest" style={{ color: 'var(--text-primary)' }}>AURA</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(({ id, label }) => (
              <button key={id} onClick={() => navigate(id)}
                className={`text-xs font-semibold tracking-widest uppercase transition-all duration-200 pb-1 border-b-2 ${activeTab === id ? 'border-amber-500 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'}`}>
                {label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('shop')} className="hidden sm:flex p-2 rounded-full hover:bg-amber-50 transition-colors" aria-label="Search">
              <Search className="w-5 h-5 text-slate-600" />
            </button>
            <button onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-full hover:bg-amber-50 transition-colors ${cartShake ? 'cart-shake' : ''}`} aria-label="Cart">
              <ShoppingBag className="w-5 h-5 text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  style={{ background: 'var(--accent)' }}>{cartCount}</span>
              )}
            </button>
            <button onClick={() => navigate('shop')}
              className="hidden md:flex btn-primary text-[11px] px-5 py-2.5 rounded-full">
              Shop Now
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-slate-100 transition-colors" aria-label="Menu">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mobile-menu-enter border-t border-slate-200 bg-white shadow-lg">
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(({ id, label }) => (
                <button key={id} onClick={() => navigate(id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${activeTab === id ? 'bg-amber-50 text-amber-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-grow">

        {/* ═══════════════════════════════════
            HOME PAGE
            ═══════════════════════════════════ */}
        {activeTab === 'home' && (
          <div className="anim-fade-in">

            {/* HERO */}
            <section className="relative min-h-[92vh] flex items-center overflow-hidden" style={{ background: 'var(--dark-bg)' }}>
              <Particles />
              {/* Ambient blobs */}
              <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, #F59E0B, transparent)' }} />
              <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-8 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, #C8860A, transparent)' }} />

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
                {/* Text */}
                <div className="space-y-8 text-center lg:text-left">
                  <div className="anim-fade-in-up">
                    <span className="badge badge-gold">
                      <Sparkles className="w-3 h-3" /> Intelligent Aromatherapy
                    </span>
                  </div>
                  <h1 className="anim-fade-in-up delay-100 font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white">
                    Pure Wellness <br />
                    <em className="font-normal not-italic shimmer-text">Designed for</em><br />
                    <span className="text-white">Mindful Spaces</span>
                  </h1>
                  <p className="anim-fade-in-up delay-200 text-lg text-slate-400 max-w-lg leading-relaxed">
                    Premium hand-finished ceramic ultrasonic diffusers paired with 100% single-origin organic botanicals. Crafted for those who refuse to compromise on wellness.
                  </p>
                  <div className="anim-fade-in-up delay-300 flex flex-wrap gap-4 justify-center lg:justify-start">
                    <button onClick={() => navigate('shop')} className="btn-gold">
                      Shop the Collection <ArrowRight className="w-4 h-4" />
                    </button>
                    <button onClick={() => navigate('about')} className="btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                      Our Story
                    </button>
                  </div>
                  {/* Trust Bar */}
                  <div className="anim-fade-in-up delay-400 flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
                    {[['50K+', 'Customers'], ['4.9★', 'Rating'], ['100%', 'Organic']].map(([val, lbl]) => (
                      <div key={lbl} className="text-center">
                        <div className="text-xl font-bold" style={{ color: 'var(--accent-light)' }}>{val}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hero Image */}
                <div className="relative flex justify-center items-center anim-slide-right delay-200">
                  <div className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl anim-pulse-soft"
                    style={{ background: 'radial-gradient(circle, #F59E0B, #C8860A)' }} />
                  <img src="/aura_smart_diffuser.png" alt="AURA Smart Diffuser"
                    className="relative w-full max-w-sm h-auto object-contain anim-float drop-shadow-2xl" />
                  {/* Floating badge */}
                  <div className="absolute top-8 right-0 glass-dark rounded-2xl p-4 anim-scale-in delay-500">
                    <div className="flex items-center gap-2">
                      <StarRating rating={5} />
                      <span className="text-white text-xs font-bold">4.9</span>
                    </div>
                    <p className="text-slate-400 text-[10px] mt-1">214 verified reviews</p>
                  </div>
                  <div className="absolute bottom-12 left-0 glass-dark rounded-2xl p-4 anim-scale-in delay-600">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center">
                        <Leaf className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-bold">100% Organic</p>
                        <p className="text-slate-400 text-[10px]">Certified sources</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator text-slate-500 flex flex-col items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest">Scroll</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </section>

            {/* STATS STRIP */}
            <section className="border-y border-slate-100" style={{ background: 'var(--bg-secondary)' }}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {STATS.map(({ value, label, icon: Icon }, i) => (
                    <div key={label} className={`flex items-center gap-4 anim-fade-in-up delay-${(i + 1) * 100}`}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'var(--accent-glow)' }}>
                        <Icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                      </div>
                      <div>
                        <div className="font-heading text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FEATURED COLLECTIONS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center mb-14">
                <SectionLabel>Explore the Ranges</SectionLabel>
                <h2 className="font-heading text-4xl font-bold mt-2">Curated for Wellbeing</h2>
                <p className="text-slate-500 mt-3 max-w-xl mx-auto">Carefully selected solutions to align your focus, rest, and respiratory wellness.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { cat: 'diffuser', title: 'Smart Diffusers', sub: 'Ultrasonic ceramic mist hardware', img: '/aura_smart_diffuser.png', bg: '#F5F0EA', badge: 'Most Loved' },
                  { cat: 'mist', title: 'Organic Mists', sub: 'Pillow sprays & steam botanicals', img: '/aura_sleep_mist.png', bg: '#EDE9F4', badge: 'Bestseller' },
                  { cat: 'set', title: 'Essential Oil Sets', sub: 'Pure, undiluted botanical drops', img: '/aura_essential_oils.png', bg: '#FDF4E3', badge: 'Gift Ready' },
                ].map(({ cat, title, sub, img, bg, badge }) => (
                  <div key={cat} onClick={() => { setCategoryFilter(cat); navigate('shop'); }}
                    className="group cursor-pointer overflow-hidden rounded-2xl hover-lift relative"
                    style={{ background: bg, border: '1px solid rgba(0,0,0,0.05)' }}>
                    <div className="p-8 pb-0 flex justify-center img-zoom-wrap h-52">
                      <img src={img} alt={title} className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-heading text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                          <p className="text-sm text-slate-500 mt-1">{sub}</p>
                        </div>
                        <span className="badge badge-dark text-[9px]">{badge}</span>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                        Shop Now <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* BEST SELLERS */}
            <section style={{ background: 'var(--bg-secondary)' }} className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                  <SectionLabel>Community Favourites</SectionLabel>
                  <h2 className="font-heading text-4xl font-bold mt-2">Best Selling Products</h2>
                  <p className="text-slate-500 mt-3">Loved by thousands of wellness enthusiasts worldwide</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PRODUCTS.slice(0, 4).map((prod, i) => (
                    <div key={prod.id} className={`product-card anim-fade-in-up delay-${(i + 1) * 100}`}>
                      {prod.label && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="badge badge-gold">{prod.label}</span>
                        </div>
                      )}
                      <button onClick={() => toggleWishlist(prod.id)}
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                        <Heart className={`w-4 h-4 ${wishlist.includes(prod.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                      </button>
                      <div className="img-zoom-wrap cursor-pointer bg-slate-50 rounded-t-2xl p-6 h-52 flex items-center justify-center"
                        onClick={() => setSelectedProduct(prod)}
                        style={{ background: prod.color || '#F5F0EA' }}>
                        <img src={prod.image} alt={prod.title} className="h-36 w-auto object-contain" />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-1">
                          <StarRating rating={prod.rating} />
                          <span className="text-xs text-slate-400">({prod.reviewCount})</span>
                        </div>
                        <h3 className="font-heading text-base font-bold cursor-pointer hover:text-amber-700 transition-colors line-clamp-1"
                          onClick={() => setSelectedProduct(prod)}>{prod.title}</h3>
                        {prod.variant && <p className="text-xs text-slate-400 mt-0.5">{prod.variant}</p>}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-bold text-amber-700">${prod.price}</span>
                          <span className="text-slate-400 line-through text-sm">${prod.compareAtPrice}</span>
                          <span className="badge badge-green text-[9px] ml-auto">
                            {Math.round((1 - prod.price / prod.compareAtPrice) * 100)}% off
                          </span>
                        </div>
                        <button onClick={() => addToCart(prod)} className="w-full mt-4 btn-primary py-2.5 text-[10px] rounded-lg">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-10">
                  <button onClick={() => navigate('shop')} className="btn-outline">
                    View All Products <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* USP GRID — Custom Liquid Section Mock */}
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                  <SectionLabel>Why AURA</SectionLabel>
                  <h2 className="font-heading text-4xl font-bold mt-2">The AURA Difference</h2>
                  <p className="text-slate-500 mt-3 max-w-xl mx-auto">Every detail is considered. Every ingredient is verified. Every experience is designed to elevate.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: Sparkles, title: '100% Organic & Pure', desc: 'Therapeutic-grade essential oils directly sourced from organic certified farms around the world.', color: '#FDF4E3', iconBg: '#F59E0B' },
                    { icon: SlidersHorizontal, title: 'Sleek & Silent Design', desc: 'Matte ceramic dome diffusers with ultrasonic cold-mist technology operate in complete, peaceful quiet.', color: '#F0F4FF', iconBg: '#6366F1' },
                    { icon: ShieldCheck, title: 'Eco-Conscious Promise', desc: 'Cruelty-free botanical formulas, amber glass bottles, and 100% carbon-offset shipping on every order.', color: '#ECFDF5', iconBg: '#10B981' },
                    { icon: RotateCcw, title: '30-Day Guarantee', desc: 'Try any diffuser for 30 full days. If it\'s not perfect for your space, we\'ll refund every cent.', color: '#FFF1F2', iconBg: '#F43F5E' },
                  ].map(({ icon: Icon, title, desc, color, iconBg }, i) => (
                    <div key={title} className={`hover-lift rounded-2xl p-8 text-center anim-fade-in-up delay-${(i + 1) * 100}`}
                      style={{ background: color, border: '1px solid rgba(0,0,0,0.04)' }}>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                        style={{ background: iconBg }}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-heading text-lg font-bold mb-2">{title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* BEFORE / AFTER SLIDER — Custom Liquid Section Mock */}
            <section style={{ background: 'var(--bg-secondary)' }} className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                  <SectionLabel>Custom Section Demo</SectionLabel>
                  <h2 className="font-heading text-4xl font-bold mt-2">Before / After Slider</h2>
                  <p className="text-slate-500 mt-3">Drag the handle to reveal the AURA difference. Dry, stale air vs. AURA ultrasonic mist.</p>
                </div>
                <div ref={sliderRef}
                  className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl select-none"
                  style={{ aspectRatio: '16/9' }}>
                  {/* AFTER */}
                  <div className="absolute inset-0" style={{ background: '#C8E6C9' }}>
                    <img src="/aura_smart_diffuser.png" alt="AURA Active" className="w-full h-full object-cover brightness-110" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.15), transparent)' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute w-48 h-96 rounded-full blur-3xl opacity-30 animate-pulse"
                        style={{ background: 'radial-gradient(circle, white, transparent)' }} />
                    </div>
                    <span className="absolute bottom-5 right-5 glass px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-800">
                      🌿 AURA Mist Active
                    </span>
                  </div>
                  {/* BEFORE */}
                  <div className="absolute inset-y-0 left-0 overflow-hidden z-10" style={{ width: `${sliderPct}%` }}>
                    <div className="absolute inset-y-0 left-0 h-full" style={{ width: sliderRef.current ? sliderRef.current.offsetWidth : 800 }}>
                      <img src="/aura_smart_diffuser.png" alt="Before"
                        className="w-full h-full object-cover grayscale brightness-75"
                        style={{ width: sliderRef.current ? sliderRef.current.offsetWidth : 800, height: '100%', maxWidth: 'none' }} />
                      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.3)' }} />
                      <span className="absolute bottom-5 left-5 glass-dark px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white">
                        💨 Dry Stale Air
                      </span>
                    </div>
                  </div>
                  {/* Handle */}
                  <div className="absolute inset-y-0 z-20 flex items-center pointer-events-none"
                    style={{ left: `${sliderPct}%`, transform: 'translateX(-50%)' }}>
                    <div className="absolute inset-y-0 w-0.5 bg-white shadow-lg" />
                    <div className="w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center z-30 text-slate-700 font-bold text-sm border-2 border-slate-200">
                      ↔
                    </div>
                  </div>
                  {/* Invisible slider input */}
                  <input type="range" min="0" max="100" value={sliderPct}
                    onChange={e => setSliderPct(+e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0"
                    style={{ WebkitAppearance: 'none', appearance: 'none', background: 'transparent', border: 'none' }}
                    aria-label="Before/After Slider" />
                </div>
              </div>
            </section>

            {/* TESTIMONIALS CAROUSEL */}
            <section style={{ background: 'var(--dark-bg)' }} className="py-24 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #F59E0B 0%, transparent 60%), radial-gradient(circle at 70% 50%, #C8860A 0%, transparent 60%)' }} />
              <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <SectionLabel>What Customers Say</SectionLabel>
                <div className="mt-10 relative min-h-[220px]">
                  {INITIAL_REVIEWS.map((r, i) => (
                    <div key={r.id} className={`transition-all duration-700 absolute inset-0 flex flex-col items-center justify-center ${i === testimonialIdx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                      <div className="flex justify-center mb-6">
                        <Quote className="w-10 h-10 text-amber-500 opacity-50" />
                      </div>
                      <blockquote className="font-heading text-2xl sm:text-3xl italic font-light text-white leading-relaxed max-w-3xl">
                        "{r.body}"
                      </blockquote>
                      <div className="mt-8 flex flex-col items-center gap-2">
                        <StarRating rating={r.rating} size="md" />
                        <cite className="not-italic font-bold text-amber-400">{r.author}</cite>
                        <span className="text-slate-500 text-xs uppercase tracking-widest">Verified Buyer · {r.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Dots */}
                <div className="flex justify-center gap-2.5 mt-10">
                  {INITIAL_REVIEWS.map((_, i) => (
                    <button key={i} onClick={() => setTestimonialIdx(i)}
                      className={`rounded-full transition-all duration-300 ${i === testimonialIdx ? 'w-8 h-2.5 bg-amber-500' : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400'}`} />
                  ))}
                </div>
              </div>
            </section>

            {/* PRODUCT HIGHLIGHT */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-xl" style={{ background: 'var(--bg-secondary)' }}>
                <div className="flex items-center justify-center p-12 relative" style={{ background: '#F5F0EA' }}>
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #F59E0B, transparent 70%)' }} />
                  <img src="/aura_smart_diffuser.png" alt="Smart Diffuser" className="relative w-72 h-72 object-contain anim-float-slow" />
                </div>
                <div className="p-12 flex flex-col justify-center">
                  <SectionLabel>Flagship Product</SectionLabel>
                  <h2 className="font-heading text-4xl font-bold mt-2 mb-4">Aura Smart Ceramic Diffuser</h2>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    The centrepiece of any mindful home. Our award-winning diffuser combines a hand-finished matte ceramic dome with whisper-quiet ultrasonic misting and ambient LED underglow — creating an atmosphere that transforms any room into a sanctuary.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {PRODUCTS[0].benefits.map(b => (
                      <li key={b} className="flex items-center gap-3 text-sm text-slate-700">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: 'var(--accent-glow)' }}>
                          <Check className="w-3 h-3" style={{ color: 'var(--accent)' }} />
                        </div>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>$89</span>
                      <span className="text-slate-400 line-through text-sm ml-2">$119</span>
                    </div>
                    <button onClick={() => addToCart(PRODUCTS[0])} className="btn-primary">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* NEWSLETTER */}
            <section style={{ background: 'var(--dark-bg)' }} className="py-20 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(135deg, #F59E0B22, transparent 50%, #C8860A22)' }} />
              <div className="relative max-w-xl mx-auto px-4 text-center">
                <div className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <SectionLabel>Stay in the Loop</SectionLabel>
                <h2 className="font-heading text-4xl font-bold text-white mt-2 mb-3">Get 10% Off Your First Order</h2>
                <p className="text-slate-400 mb-8">Join 20,000+ wellness enthusiasts and receive exclusive drops, tips, and early-access offers.</p>
                {!newsletterDone ? (
                  <form onSubmit={handleNewsletter} className="flex gap-3">
                    <input type="email" required value={newsletterEmail}
                      onChange={e => setNewsletterEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="form-input flex-grow rounded-xl" />
                    <button type="submit" className="btn-gold flex-shrink-0 px-6 rounded-xl">
                      Subscribe
                    </button>
                  </form>
                ) : (
                  <div className="bg-green-900/30 border border-green-500/30 rounded-2xl p-6 text-green-400 font-semibold">
                    ✓ Welcome! Your 10% code is on its way.
                  </div>
                )}
                <p className="text-slate-600 text-xs mt-4">No spam. Unsubscribe anytime. Code sent within 2 minutes.</p>
              </div>
            </section>
          </div>
        )}

        {/* ═══════════════════════════════════
            SHOP PAGE
            ═══════════════════════════════════ */}
        {activeTab === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 anim-fade-in">
            <div className="mb-10">
              <SectionLabel>Browse Collection</SectionLabel>
              <h1 className="font-heading text-4xl font-bold mt-1">The AURA Shop</h1>
              <p className="text-slate-500 mt-2">Premium aromatherapy products, thoughtfully crafted for your wellbeing.</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Sidebar */}
              <aside className="w-full lg:w-72 flex-shrink-0 space-y-7">
                <div className="rounded-2xl p-6 space-y-7" style={{ background: 'white', border: '1px solid #EEEBE5' }}>
                  {/* Search */}
                  <div>
                    <h3 className="font-heading text-base font-bold mb-3 flex items-center gap-2">
                      <Search className="w-4 h-4" style={{ color: 'var(--accent)' }} /> Search Products
                    </h3>
                    <input type="text" placeholder="Search mists, oils…" value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="form-input rounded-xl" />
                  </div>
                  {/* Categories */}
                  <div>
                    <h3 className="font-heading text-base font-bold mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4" style={{ color: 'var(--accent)' }} /> Categories
                    </h3>
                    <div className="flex flex-col gap-2">
                      {[['all', 'All Products'], ['diffuser', 'Smart Diffusers'], ['mist', 'Organic Mists'], ['set', 'Essential Oil Sets']].map(([val, lbl]) => (
                        <button key={val} onClick={() => setCategoryFilter(val)}
                          className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${categoryFilter === val ? 'font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                          style={categoryFilter === val ? { background: 'var(--accent-glow)', color: 'var(--accent)' } : {}}>
                          {lbl}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Scent */}
                  <div>
                    <h3 className="font-heading text-base font-bold mb-3">Scent Profiles</h3>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'Lavender', 'Eucalyptus', 'Mint', 'Mixed'].map(s => (
                        <button key={s} onClick={() => setScentFilter(s)}
                          className={`badge transition-all text-[10px] cursor-pointer ${scentFilter === s ? 'badge-gold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                          {s === 'all' ? 'All Scents' : s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Grid */}
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
                  <p className="text-sm text-slate-500">Showing <strong className="text-slate-800">{filteredProducts.length}</strong> products</p>
                  <span className="text-xs text-slate-400">Powered by Shopify Search & Discovery</span>
                </div>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-24 rounded-2xl" style={{ background: 'var(--bg-secondary)' }}>
                    <Search className="w-14 h-14 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium text-lg">No products found.</p>
                    <button onClick={() => { setCategoryFilter('all'); setScentFilter('all'); setSearchQuery(''); }}
                      className="mt-4 btn-gold">Clear Filters</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((prod, i) => (
                      <div key={prod.id} className={`product-card anim-fade-in-up delay-${(i % 6 + 1) * 100}`}>
                        {prod.label && <span className="absolute top-3 left-3 z-10 badge badge-gold">{prod.label}</span>}
                        <button onClick={() => toggleWishlist(prod.id)}
                          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                          <Heart className={`w-4 h-4 ${wishlist.includes(prod.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                        </button>
                        <div className="img-zoom-wrap cursor-pointer h-52 flex items-center justify-center p-6 rounded-t-2xl"
                          style={{ background: prod.color || '#F5F0EA' }}
                          onClick={() => setSelectedProduct(prod)}>
                          <img src={prod.image} alt={prod.title} className="h-36 w-auto object-contain" />
                        </div>
                        <div className="p-5 flex flex-col gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <StarRating rating={prod.rating} />
                              <span className="text-xs text-slate-400">({prod.reviewCount})</span>
                            </div>
                            <h3 className="font-heading text-base font-bold cursor-pointer hover:text-amber-700 transition-colors"
                              onClick={() => setSelectedProduct(prod)}>{prod.title}</h3>
                            {prod.variant && <p className="text-xs text-slate-400 mt-0.5">{prod.variant}</p>}
                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-bold text-amber-700">${prod.price}</span>
                              <span className="text-slate-400 line-through text-sm">${prod.compareAtPrice}</span>
                            </div>
                          </div>
                          {prod.allowsSubscription && (
                            <div className="rounded-xl p-3 text-xs" style={{ background: 'var(--bg-secondary)' }}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-slate-700">Subscribe & Save 15%</span>
                              </div>
                              <div className="flex gap-1.5">
                                {['one-time', 'subscription'].map(mode => (
                                  <button key={mode} onClick={() => setPurchaseMode(prev => ({ ...prev, [prod.id]: mode }))}
                                    className={`flex-1 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${purchaseMode[prod.id] === mode ? (mode === 'subscription' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-white') : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'}`}>
                                    {mode === 'one-time' ? 'Buy Once' : '📦 Monthly'}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          <button onClick={() => addToCart(prod, prod.allowsSubscription && purchaseMode[prod.id] === 'subscription')}
                            className="btn-primary py-2.5 text-[10px] rounded-xl w-full">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════
            ABOUT PAGE
            ═══════════════════════════════════ */}
        {activeTab === 'about' && (
          <div className="anim-fade-in">
            {/* Hero */}
            <section className="relative py-32 text-center overflow-hidden" style={{ background: 'var(--dark-bg)' }}>
              <Particles />
              <div className="relative max-w-3xl mx-auto px-4">
                <SectionLabel>Our Story</SectionLabel>
                <h1 className="font-heading text-5xl sm:text-6xl font-bold text-white mt-3 mb-6">
                  Wellness, <em className="shimmer-text not-italic font-normal">Reimagined</em>
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed">
                  AURA was founded on a single belief — that the air in your home should nourish you. We blend the ancient wisdom of botanical aromatherapy with precision modern design to create products that belong in the most beautiful spaces.
                </p>
              </div>
            </section>

            {/* Mission */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <SectionLabel>Our Mission</SectionLabel>
                  <h2 className="font-heading text-4xl font-bold mt-2 mb-6">Purity in Every Drop</h2>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    From the lavender fields of Haute-Provence to the eucalyptus forests of Tasmania — every botanical we use is grown organically, harvested at peak potency, and steam-distilled in small batches to preserve its full therapeutic profile.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-8">
                    We work directly with 12 certified organic farms across 8 countries, paying fair-trade premiums that support sustainable agriculture. Our supply chain is 100% traceable, and we publish our sourcing reports annually.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {[['12', 'Partner Farms'], ['8', 'Countries'], ['100%', 'Traceable']].map(([val, lbl]) => (
                      <div key={lbl} className="text-center p-4 rounded-2xl" style={{ background: 'var(--bg-secondary)' }}>
                        <div className="font-heading text-2xl font-bold" style={{ color: 'var(--accent)' }}>{val}</div>
                        <div className="text-xs text-slate-500 mt-1">{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl opacity-20 blur-2xl" style={{ background: 'var(--accent)' }} />
                  <img src="/aura_essential_oils.png" alt="Our Products" className="relative w-full h-96 object-contain" />
                </div>
              </div>
            </section>

            {/* Values */}
            <section style={{ background: 'var(--bg-secondary)' }} className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                  <SectionLabel>What We Stand For</SectionLabel>
                  <h2 className="font-heading text-4xl font-bold mt-2">Our Core Values</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { icon: Globe, title: 'Sustainability First', desc: 'Carbon-neutral shipping, recyclable amber glass, and a pledge to plant one tree per order through our reforestation partner.' },
                    { icon: BadgeCheck, title: 'Radical Transparency', desc: 'Every ingredient is listed. Every farm is named. Every batch is third-party tested for purity and potency before it ships.' },
                    { icon: Heart, title: 'Community & Care', desc: '5% of all profits are donated to mental wellness charities. We believe everyone deserves access to the healing power of nature.' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="bg-white rounded-2xl p-8 hover-lift" style={{ border: '1px solid #EEEBE5' }}>
                      <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center mb-5">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-heading text-xl font-bold mb-3">{title}</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Team */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <SectionLabel>The People</SectionLabel>
                <h2 className="font-heading text-4xl font-bold mt-2">Meet the Team</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { name: 'Isabelle Laurent', role: 'Founder & Formulator', bio: 'Former aromatherapist with 15 years of clinical practice. Created AURA to make professional-grade botanicals accessible.' },
                  { name: 'Marcus Chen', role: 'Head of Product Design', bio: 'Industrial designer obsessed with the intersection of function and beauty. Every curve on the diffuser is intentional.' },
                  { name: 'Ananya Patel', role: 'Chief Sustainability Officer', bio: 'Environmental scientist ensuring every supply chain decision aligns with our commitment to the planet.' },
                ].map(({ name, role, bio }) => (
                  <div key={name} className="text-center hover-lift rounded-2xl p-8 bg-white" style={{ border: '1px solid #EEEBE5' }}>
                    <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4 text-white font-heading text-2xl font-bold">
                      {name.charAt(0)}
                    </div>
                    <h3 className="font-heading text-lg font-bold">{name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: 'var(--accent)' }}>{role}</p>
                    <p className="text-slate-500 text-sm mt-3 leading-relaxed">{bio}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ═══════════════════════════════════
            JOURNAL / BLOG PAGE
            ═══════════════════════════════════ */}
        {activeTab === 'blog' && (
          <div className="anim-fade-in">
            <section className="relative py-28 text-center overflow-hidden" style={{ background: 'var(--dark-bg)' }}>
              <Particles />
              <div className="relative max-w-2xl mx-auto px-4">
                <SectionLabel>AURA Journal</SectionLabel>
                <h1 className="font-heading text-5xl font-bold text-white mt-3 mb-4">Wellness, <em className="shimmer-text not-italic">Stories & Science</em></h1>
                <p className="text-slate-400">Expert insights on aromatherapy, mindful living, and the science behind botanical wellness.</p>
              </div>
            </section>

            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BLOG_POSTS.map((post, i) => (
                  <article key={post.id} className={`product-card anim-fade-in-up delay-${(i + 1) * 100} overflow-hidden`}>
                    <div className={`h-48 bg-gradient-to-br ${post.color} flex items-center justify-center img-zoom-wrap`}>
                      <img src={post.image} alt={post.title} className="h-36 w-auto object-contain" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="badge badge-gold">{post.tag}</span>
                        <span className="flex items-center gap-1 text-slate-400 text-xs">
                          <Clock className="w-3 h-3" />{post.readTime}
                        </span>
                      </div>
                      <h2 className="font-heading text-xl font-bold mb-2 hover:text-amber-700 transition-colors cursor-pointer leading-snug">{post.title}</h2>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />{post.date}
                        </span>
                        <button className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                          Read More <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ═══════════════════════════════════
            APP DEMO PAGE
            ═══════════════════════════════════ */}
        {activeTab === 'apps' && (
          <div className="anim-fade-in">
            <section className="relative py-28 text-center overflow-hidden" style={{ background: 'var(--dark-bg)' }}>
              <Particles />
              <div className="relative max-w-2xl mx-auto px-4">
                <SectionLabel>Shopify App Integrations</SectionLabel>
                <h1 className="font-heading text-5xl font-bold text-white mt-3 mb-4">
                  6 Apps, <em className="shimmer-text not-italic">Fully Integrated</em>
                </h1>
                <p className="text-slate-400">Live interactive demos of every required Shopify app — all working, all functional.</p>
              </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">

              {/* App 1: Shopify Bundles */}
              <section className="bg-white rounded-2xl p-8 shadow-sm" style={{ border: '1px solid #EEEBE5' }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
                  <div>
                    <span className="badge badge-gold mb-2"><Package className="w-3 h-3" /> App 1: Shopify Bundles</span>
                    <h2 className="font-heading text-2xl font-bold">Custom Bundle Builder</h2>
                    <p className="text-slate-500 text-sm mt-1">Select products to build your perfect bundle. Get <strong>20% off</strong> vs. individual prices.</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm text-slate-400 line-through">${bundleOrig}</div>
                    <div className="text-3xl font-heading font-bold" style={{ color: 'var(--accent)' }}>${bundlePrice}</div>
                    <div className="text-xs text-green-600 font-bold">20% bundle savings</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {PRODUCTS.filter(p => ['aura-smart-diffuser-white', 'lavender-sleep-mist', 'the-ritual-set'].includes(p.id)).map(p => (
                    <label key={p.id}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${bundleItems[p.id] ? 'border-amber-400 bg-amber-50' : 'border-slate-200 hover:border-slate-300'}`}>
                      <input type="checkbox" checked={!!bundleItems[p.id]}
                        onChange={e => setBundleItems(prev => ({ ...prev, [p.id]: e.target.checked }))}
                        className="accent-amber-600 w-4 h-4 flex-shrink-0" />
                      <img src={p.image} className="w-12 h-12 object-contain flex-shrink-0" alt={p.title} />
                      <div>
                        <div className="text-sm font-semibold text-slate-800 line-clamp-1">{p.title}</div>
                        <div className="text-xs text-amber-700 font-bold">${p.price}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {bundleSelected.length === 0 ? (
                  <p className="text-center text-slate-400 text-sm py-2">Select at least one product to create a bundle.</p>
                ) : (
                  <button onClick={addBundleToCart} className="btn-gold w-full">
                    Add Bundle to Cart — ${bundlePrice} <ShoppingBag className="w-4 h-4" />
                  </button>
                )}
              </section>

              {/* App 2: Subscriptions */}
              <section className="bg-white rounded-2xl p-8 shadow-sm" style={{ border: '1px solid #EEEBE5' }}>
                <span className="badge badge-gold mb-4"><Calendar className="w-3 h-3" /> App 2: Shopify Subscriptions</span>
                <h2 className="font-heading text-2xl font-bold mb-1">Subscribe & Save</h2>
                <p className="text-slate-500 text-sm mb-6">Choose one-time or monthly subscription. Save 15% automatically on every recurring order.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PRODUCTS.filter(p => p.allowsSubscription).map(p => (
                    <div key={p.id} className="rounded-xl p-5" style={{ background: 'var(--bg-secondary)', border: '1px solid #EEEBE5' }}>
                      <div className="flex items-center gap-3 mb-4">
                        <img src={p.image} className="w-12 h-12 object-contain" alt={p.title} />
                        <div>
                          <h3 className="font-semibold text-sm">{p.title}</h3>
                          <p className="text-xs text-slate-400">{p.variant}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-3">
                        {['one-time', 'subscription'].map(mode => (
                          <button key={mode} onClick={() => setPurchaseMode(prev => ({ ...prev, [p.id]: mode }))}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${purchaseMode[p.id] === mode ? (mode === 'subscription' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-800 text-white') : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-400'}`}>
                            {mode === 'one-time' ? `$${p.price} Once` : `$${(p.price * 0.85).toFixed(2)}/mo`}
                          </button>
                        ))}
                      </div>
                      <button onClick={() => addToCart(p, purchaseMode[p.id] === 'subscription')} className="btn-primary w-full py-2 text-[10px] rounded-xl">
                        {purchaseMode[p.id] === 'subscription' ? '📦 Subscribe & Save 15%' : 'Buy Once'}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* App 3: Judge.me Reviews */}
              <section className="bg-white rounded-2xl p-8 shadow-sm" style={{ border: '1px solid #EEEBE5' }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
                  <div>
                    <span className="badge badge-gold mb-2"><Star className="w-3 h-3" /> App 3: Judge.me Reviews</span>
                    <h2 className="font-heading text-2xl font-bold">Product Reviews</h2>
                    <p className="text-slate-500 text-sm mt-1">Social proof that builds trust and drives conversion rate.</p>
                  </div>
                  <button onClick={() => setShowReviewForm(!showReviewForm)}
                    className="btn-gold self-start flex-shrink-0">
                    {showReviewForm ? 'Cancel' : 'Write a Review'}
                  </button>
                </div>
                {showReviewForm && (
                  <form onSubmit={handleReviewSubmit} className="rounded-2xl p-6 mb-6 space-y-4" style={{ background: 'var(--bg-secondary)' }}>
                    <h3 className="font-bold text-sm uppercase tracking-wider">Leave a Review</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Your Name</label>
                        <input type="text" required value={newReview.author}
                          onChange={e => setNewReview(p => ({ ...p, author: e.target.value }))}
                          placeholder="e.g. John D." className="form-input rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Rating</label>
                        <select value={newReview.rating}
                          onChange={e => setNewReview(p => ({ ...p, rating: +e.target.value }))}
                          className="form-input rounded-xl">
                          {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Product</label>
                      <select value={newReview.productHandle}
                        onChange={e => setNewReview(p => ({ ...p, productHandle: e.target.value }))}
                        className="form-input rounded-xl">
                        {PRODUCTS.map(p => <option key={p.id} value={p.handle}>{p.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Review Title</label>
                      <input type="text" required value={newReview.title}
                        onChange={e => setNewReview(p => ({ ...p, title: e.target.value }))}
                        placeholder="e.g. Absolutely beautiful design" className="form-input rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Your Review</label>
                      <textarea rows="3" required value={newReview.body}
                        onChange={e => setNewReview(p => ({ ...p, body: e.target.value }))}
                        placeholder="Share your experience…" className="form-input rounded-xl resize-none" />
                    </div>
                    <button type="submit" className="btn-primary rounded-xl">
                      <Send className="w-3.5 h-3.5" /> Submit Review
                    </button>
                  </form>
                )}
                <div className="space-y-4">
                  {reviews.map(r => (
                    <div key={r.id} className="rounded-xl p-5" style={{ border: '1px solid #EEEBE5' }}>
                      <div className="flex items-start justify-between">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <StarRating rating={r.rating} />
                            <span className="font-bold text-sm text-slate-800">{r.author}</span>
                            {r.verified && <span className="badge badge-green text-[9px]"><BadgeCheck className="w-3 h-3" /> Verified</span>}
                          </div>
                          <h4 className="font-semibold text-slate-800 mt-1">{r.title}</h4>
                          <p className="text-sm text-slate-500 mt-1 leading-relaxed">{r.body}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-3">{r.date}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Apps 4–6 Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { badge: '🔍 App 4', title: 'Search & Discovery', desc: 'Live faceted filtering (category, scent) powers the Shop page. See it in action above.', nav: 'shop' },
                  { badge: '🏷️ App 5', title: 'Labeler', desc: 'Best Seller, New, and Organic badges are applied dynamically to product cards across the store.', nav: 'shop' },
                  { badge: '🌐 App 6', title: 'Marketplace Connect', desc: 'Configured to sync AURA products to Google Shopping, Meta, and TikTok Shop catalogs.', nav: null },
                ].map(({ badge, title, desc, nav }) => (
                  <div key={title} className="bg-white rounded-2xl p-6 hover-lift" style={{ border: '1px solid #EEEBE5' }}>
                    <span className="badge badge-dark mb-3">{badge}</span>
                    <h3 className="font-heading text-lg font-bold mb-2">{title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                    {nav && (
                      <button onClick={() => navigate(nav)}
                        className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                        See Demo <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════
            CONTACT PAGE
            ═══════════════════════════════════ */}
        {activeTab === 'contact' && (
          <div className="anim-fade-in">
            <section className="relative py-28 text-center overflow-hidden" style={{ background: 'var(--dark-bg)' }}>
              <Particles />
              <div className="relative max-w-2xl mx-auto px-4">
                <SectionLabel>Get in Touch</SectionLabel>
                <h1 className="font-heading text-5xl font-bold text-white mt-3 mb-4">
                  We'd Love to <em className="shimmer-text not-italic">Hear from You</em>
                </h1>
                <p className="text-slate-400">Questions, collaborations, or just a friendly hello — our team typically responds within 24 hours.</p>
              </div>
            </section>

            <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                {/* Contact Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <SectionLabel>Contact Info</SectionLabel>
                    <h2 className="font-heading text-2xl font-bold mt-2 mb-6">Let's Connect</h2>
                  </div>
                  {[
                    { icon: Mail, label: 'Email', val: 'hello@aurawellness.co' },
                    { icon: Phone, label: 'Phone', val: '+1 (800) AURA-LIFE' },
                    { icon: MapPin, label: 'Address', val: '12 Botanical Lane, Wellness District, London, UK' },
                    { icon: Clock, label: 'Hours', val: 'Mon–Fri, 9am–6pm GMT' },
                  ].map(({ icon: Icon, label, val }) => (
                    <div key={label} className="flex gap-4">
                      <div className="w-11 h-11 rounded-xl gradient-gold flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</div>
                        <div className="text-slate-700 font-medium mt-0.5">{val}</div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Follow AURA</div>
                    <div className="flex gap-3">
                      {[Instagram, Twitter, Youtube].map((Icon, i) => (
                        <button key={i} className="w-10 h-10 rounded-xl flex items-center justify-center hover-glow transition-all" style={{ background: 'var(--bg-secondary)', border: '1px solid #EEEBE5' }}>
                          <Icon className="w-5 h-5 text-slate-600" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm" style={{ border: '1px solid #EEEBE5' }}>
                  {contactSent ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-slate-500">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                      <button onClick={() => setContactSent(false)} className="mt-6 btn-outline">
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContact} className="space-y-5">
                      <h3 className="font-heading text-xl font-bold mb-1">Send a Message</h3>
                      <p className="text-slate-400 text-sm mb-4">Fill out the form below and a member of our team will be in touch shortly.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
                          <input type="text" required placeholder="Your full name"
                            value={contactForm.name}
                            onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))}
                            className="form-input rounded-xl" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                          <input type="email" required placeholder="your@email.com"
                            value={contactForm.email}
                            onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))}
                            className="form-input rounded-xl" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Subject</label>
                        <select value={contactForm.subject}
                          onChange={e => setContactForm(p => ({ ...p, subject: e.target.value }))}
                          className="form-input rounded-xl">
                          <option value="">Select a topic…</option>
                          <option>Order & Shipping</option>
                          <option>Product Question</option>
                          <option>Returns & Refunds</option>
                          <option>Wholesale Inquiry</option>
                          <option>Press & Media</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Message</label>
                        <textarea rows="5" required placeholder="Tell us how we can help…"
                          value={contactForm.message}
                          onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                          className="form-input rounded-xl resize-none" />
                      </div>
                      <button type="submit" className="btn-gold w-full">
                        <Send className="w-4 h-4" /> Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--dark-bg)' }} className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-1">
              <button onClick={() => navigate('home')} className="flex items-center gap-2.5 mb-5">
                <img src="/logo.png" alt="AURA" className="h-8 w-auto" />
                <span className="font-heading text-lg font-bold text-white tracking-widest">AURA</span>
              </button>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                Premium aromatherapy for mindful spaces. 100% organic, sustainably sourced, beautifully designed.
              </p>
              <div className="flex gap-2.5">
                {[Instagram, Twitter, Youtube].map((Icon, i) => (
                  <button key={i} className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
            {[
              { title: 'Shop', links: [['All Products', 'shop'], ['Smart Diffusers', 'shop'], ['Organic Mists', 'shop'], ['Essential Oils', 'shop'], ['Gift Sets', 'shop']] },
              { title: 'Company', links: [['Our Story', 'about'], ['Journal', 'blog'], ['Sustainability', 'about'], ['App Demos', 'apps'], ['Contact', 'contact']] },
              { title: 'Support', links: [['Shipping Policy', 'contact'], ['Returns & Refunds', 'contact'], ['Track Your Order', 'contact'], ['FAQs', 'contact'], ['Wholesale', 'contact']] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map(([label, tab]) => (
                    <li key={label}>
                      <button onClick={() => navigate(tab)}
                        className="text-slate-400 hover:text-white transition-colors text-sm">
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs">© 2026 AURA Wellness Ltd. All rights reserved.</p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Leaf className="w-3.5 h-3.5 text-green-500" /> Carbon-neutral shipping on every order
            </div>
          </div>
        </div>
      </footer>

      {/* ── QUICK VIEW MODAL ── */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm anim-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl anim-scale-in">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 flex items-center justify-center p-10 rounded-tl-3xl rounded-bl-3xl relative"
                style={{ background: selectedProduct.color || '#F5F0EA' }}>
                <button onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/70 flex items-center justify-center hover:bg-white transition-colors md:hidden">
                  <X className="w-4 h-4 text-slate-700" />
                </button>
                <img src={selectedProduct.image} alt={selectedProduct.title} className="w-52 h-52 object-contain anim-float" />
              </div>
              <div className="md:w-3/5 p-8 flex flex-col justify-between relative">
                <button onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors hidden md:flex">
                  <X className="w-4 h-4 text-slate-700" />
                </button>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={selectedProduct.rating} />
                    <span className="text-xs text-slate-400">({selectedProduct.reviewCount} reviews)</span>
                  </div>
                  <span className="section-eyebrow">{selectedProduct.category}</span>
                  <h2 className="font-heading text-2xl font-bold mt-1">{selectedProduct.title}</h2>
                  {selectedProduct.variant && <p className="text-sm text-slate-400 mt-0.5">{selectedProduct.variant}</p>}
                  <div className="flex items-center gap-3 mt-3 mb-4">
                    <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>${selectedProduct.price}</span>
                    <span className="text-slate-400 line-through">${selectedProduct.compareAtPrice}</span>
                    <span className="badge badge-green">
                      {Math.round((1 - selectedProduct.price / selectedProduct.compareAtPrice) * 100)}% OFF
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedProduct.description}</p>
                  <ul className="mt-4 space-y-2">
                    {selectedProduct.benefits?.map(b => (
                      <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--accent)' }} /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
                  <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                    className="flex-grow btn-primary rounded-xl">
                    Add to Cart
                  </button>
                  {selectedProduct.allowsSubscription && (
                    <button onClick={() => { addToCart(selectedProduct, true); setSelectedProduct(null); }}
                      className="flex-grow btn-gold rounded-xl">
                      Subscribe & Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CART DRAWER ── */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end cart-overlay" style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={e => e.target === e.currentTarget && setIsCartOpen(false)}>
          <div className="w-full max-w-md h-full bg-white flex flex-col shadow-2xl cart-drawer">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="font-heading text-xl font-bold">Your Cart</h3>
                <p className="text-slate-400 text-xs mt-0.5">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">Your cart is empty.</p>
                  <button onClick={() => { setIsCartOpen(false); navigate('shop'); }}
                    className="mt-4 btn-gold">Start Shopping</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.key} className="flex gap-4 p-4 rounded-2xl" style={{ background: 'var(--bg-secondary)', border: '1px solid #EEEBE5' }}>
                    <img src={item.product.image} alt={item.label} className="w-14 h-14 object-contain rounded-xl flex-shrink-0" />
                    <div className="flex-grow min-w-0">
                      <h4 className="text-sm font-semibold line-clamp-1">{item.label}</h4>
                      <p className="text-xs font-bold mt-0.5" style={{ color: 'var(--accent)' }}>${item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQty(item.key, -1)}
                          className="w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.key, 1)}
                          className="w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeFromCart(item.key)}
                        className="p-1 text-slate-300 hover:text-red-500 transition-colors" aria-label="Remove">
                        <X className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-bold text-slate-800">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-100 space-y-4" style={{ background: 'var(--bg-secondary)' }}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Subtotal</span>
                  <span className="text-2xl font-heading font-bold" style={{ color: 'var(--accent)' }}>${cartTotal}</span>
                </div>
                <p className="text-xs text-slate-400">Shipping & taxes calculated at checkout. Free over $50.</p>
                <button onClick={() => alert(`✅ Checkout initiated — $${cartTotal} total. Order processing!`)}
                  className="btn-gold w-full text-sm">
                  Checkout Now — ${cartTotal} <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => { setIsCartOpen(false); navigate('shop'); }}
                  className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors">
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
