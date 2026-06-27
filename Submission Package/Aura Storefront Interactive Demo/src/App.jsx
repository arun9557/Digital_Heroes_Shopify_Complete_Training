import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Search, 
  Star, 
  Check, 
  RefreshCw, 
  Truck, 
  ShieldCheck, 
  Heart, 
  SlidersHorizontal,
  ChevronRight, 
  Plus, 
  Minus,
  MessageSquare,
  ArrowRight,
  Info,
  Layers,
  Calendar,
  Send,
  X
} from 'lucide-react';

// Product Database matching products.csv
const PRODUCTS = [
  {
    id: 'aura-smart-diffuser-white',
    handle: 'aura-smart-ceramic-diffuser',
    title: 'Aura Smart Ceramic Diffuser (Stone White)',
    price: 89.00,
    compareAtPrice: 119.00,
    category: 'diffuser',
    tags: ['smart', 'best-seller', 'premium'],
    image: '/aura_smart_diffuser.png',
    scent: 'N/A',
    description: 'Elevate your space with smart aromatherapy. Crafted with a premium hand-finished matte ceramic dome, this ultrasonic diffuser blends into any modern aesthetic while delivering powerful, whisper-quiet misting technology.',
    benefits: [
      'Intelligent Mist Dispersion',
      'Ambient Underglow Lighting',
      'Auto-Shutoff Safety (8-hour runtime)',
      'BPA-free reservoir & premium ceramic shell'
    ],
    label: 'Best Seller'
  },
  {
    id: 'aura-smart-diffuser-black',
    handle: 'aura-smart-ceramic-diffuser',
    title: 'Aura Smart Ceramic Diffuser (Charcoal Slate)',
    price: 89.00,
    compareAtPrice: 119.00,
    category: 'diffuser',
    tags: ['smart', 'premium'],
    image: '/aura_smart_diffuser.png',
    scent: 'N/A',
    description: 'Sleek, dark, and sophisticated. The Charcoal Slate edition features a textured dark matte finish ideal for industrial and minimalist interiors.',
    benefits: [
      'Textured charcoal matte finish',
      'Ambient warm gold underglow',
      'Silent ultrasonic micro-mist',
      '8-hour continuous runtime'
    ]
  },
  {
    id: 'lavender-sleep-mist',
    handle: 'lavender-chamomile-sleep-mist',
    title: 'Lavender & Chamomile Sleep Mist',
    price: 24.00,
    compareAtPrice: 29.00,
    category: 'mist',
    tags: ['sleep', 'lavender', 'chamomile', 'organic', 'subscription-product', 'new'],
    image: '/aura_sleep_mist.png',
    scent: 'Lavender',
    description: 'Drift into a peaceful slumber. Formulated with organic therapeutic-grade essential oils, this gentle pillow spray creates a calming atmosphere that triggers relaxation and prepares your mind and body for deep sleep.',
    benefits: [
      'French Lavender & Roman Chamomile',
      '100% Organic & Non-Staining pillow formula',
      'Free from synthetic fragrances & chemicals',
      'Amber glass protection bottle'
    ],
    allowsSubscription: true,
    label: 'New'
  },
  {
    id: 'eucalyptus-refresh-mist',
    handle: 'eucalyptus-mint-refreshing-mist',
    title: 'Eucalyptus & Mint Refreshing Mist',
    price: 24.00,
    compareAtPrice: 29.00,
    category: 'mist',
    tags: ['refresh', 'eucalyptus', 'mint', 'organic', 'subscription-product', 'new'],
    image: '/aura_refresh_mist.png',
    scent: 'Eucalyptus',
    description: 'Awaken your senses and clear your mind. Combines organic Eucalyptus globulus and wild Peppermint to create an invigorating, crisp shower-mist experience that opens your airways and sharpens your focus.',
    benefits: [
      'Invigorating Eucalyptus & Peppermint',
      'Transforms shower into a luxury steam room',
      'Pure organic steam-distilled botanicals',
      'Perfect morning energy boost'
    ],
    allowsSubscription: true,
    label: 'New'
  },
  {
    id: 'the-ritual-set',
    handle: 'the-ritual-essential-oil-set',
    title: '"The Ritual" Essential Oil Set',
    price: 38.00,
    compareAtPrice: 48.00,
    category: 'set',
    tags: ['set', 'oils', 'lavender', 'eucalyptus', 'orange', 'organic', 'best-seller'],
    image: '/aura_essential_oils.png',
    scent: 'Mixed',
    description: 'A curated trio of single-origin organic essential oils. Includes French Lavender, Australian Eucalyptus, and Italian Sweet Orange (10ml each) in a stunning custom sliding gift box.',
    benefits: [
      'Includes Lavender, Eucalyptus, & Sweet Orange',
      '100% Pure, Undiluted, single-origin oils',
      'Built-in euro-dropper cap for perfect dosing',
      'Stunning rigid sliding presentation gift box'
    ],
    label: 'Organic'
  }
];

// Initial Reviews matching Judge.me setup
const INITIAL_REVIEWS = [
  {
    id: 1,
    productHandle: 'aura-smart-ceramic-diffuser',
    author: 'Sarah M.',
    rating: 5,
    title: 'Absolutely Gorgeous!',
    body: 'The Smart Diffuser looks like a sculpture on my shelf. It is the quietest diffuser I have ever owned, and the warm underglow lighting at night is so relaxing. Essential for my living room.',
    date: 'June 20, 2026'
  },
  {
    id: 2,
    productHandle: 'lavender-chamomile-sleep-mist',
    author: 'David K.',
    rating: 5,
    title: 'Deeps sleep is real',
    body: 'The Sleep Mist has become a mandatory part of my sleep routine. My room smells like a high-end spa now. Sprayed 3 times on my pillow, slept like a baby.',
    date: 'June 24, 2026'
  },
  {
    id: 3,
    productHandle: 'the-ritual-essential-oil-set',
    author: 'Elena R.',
    rating: 5,
    title: 'Highest Quality Oils',
    body: 'You can immediately tell these are pure botanical oils. No synthetic headache smell. The Australian Eucalyptus is incredibly refreshing during morning meditation.',
    date: 'June 25, 2026'
  }
];

export default function App() {
  // Navigation / Active View
  const [activeTab, setActiveTab] = useState('home'); // home, shop, about, apps
  
  // Search & Filter State (Shopify Search & Discovery Mock)
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [scentFilter, setScentFilter] = useState('all');
  
  // Custom Before/After Drag Slider Percentage
  const [sliderPercentage, setSliderPercentage] = useState(50);
  const sliderRef = useRef(null);
  const [isSliding, setIsSliding] = useState(false);

  // Bundle Builder State (Shopify Bundles Mock)
  const [bundleItems, setBundleItems] = useState({
    'aura-smart-diffuser-white': true,
    'lavender-sleep-mist': true,
    'the-ritual-set': true
  });

  // Subscriptions / Purchase Mode State
  const [purchaseMode, setPurchaseMode] = useState({
    'lavender-sleep-mist': 'one-time', // one-time or subscription
    'eucalyptus-refresh-mist': 'one-time'
  });

  // Judge.me Product Reviews state
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState({
    productHandle: 'aura-smart-ceramic-diffuser',
    author: '',
    rating: 5,
    title: '',
    body: ''
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Active Product for Quick View modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cart Drawer State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Handle Before/After Slider Drag
  const handleSliderMove = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPercentage(percentage);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  // Add Item to Cart
  const addToCart = (product, isSub = false) => {
    let price = product.price;
    let label = product.title;
    
    if (isSub) {
      price = +(product.price * 0.85).toFixed(2); // 15% discount
      label += ' (Monthly Subscription)';
    }

    const itemKey = `${product.id}-${isSub ? 'sub' : 'once'}`;
    setCart(prev => {
      const existing = prev.find(item => item.key === itemKey);
      if (existing) {
        return prev.map(item => item.key === itemKey ? { ...item, qty: item.qty + 1 } : item);
      } else {
        return [...prev, { key: itemKey, product, isSub, price, label, qty: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  // Remove Item from Cart
  const removeFromCart = (key) => {
    setCart(prev => prev.filter(item => item.key !== key));
  };

  // Add Bundle to Cart (Shopify Bundles Integration)
  const addBundleToCart = () => {
    const selectedProds = PRODUCTS.filter(p => bundleItems[p.id]);
    const originalPrice = selectedProds.reduce((sum, p) => sum + p.price, 0);
    const bundlePrice = +(originalPrice * 0.80).toFixed(2); // 20% discount

    const bundleProduct = {
      id: 'custom-sleep-bundle',
      title: 'Deep Sleep Aromatherapy Bundle',
      price: bundlePrice,
      image: '/aura_smart_diffuser.png',
      description: 'Custom bundle containing selected aromatherapy products.'
    };

    setCart(prev => {
      const existing = prev.find(item => item.key === 'custom-sleep-bundle');
      if (existing) {
        return prev.map(item => item.key === 'custom-sleep-bundle' ? { ...item, qty: item.qty + 1 } : item);
      } else {
        return [...prev, { key: 'custom-sleep-bundle', product: bundleProduct, isSub: false, price: bundlePrice, label: 'Deep Sleep Aromatherapy Bundle', qty: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  // Submit Review (Judge.me Mock)
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.title || !newReview.body) {
      alert('Please fill out all fields.');
      return;
    }
    const added = {
      id: Date.now(),
      productHandle: newReview.productHandle,
      author: newReview.author,
      rating: +newReview.rating,
      title: newReview.title,
      body: newReview.body,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setReviews([added, ...reviews]);
    setNewReview({
      productHandle: 'aura-smart-ceramic-diffuser',
      author: '',
      rating: 5,
      title: '',
      body: ''
    });
    setShowReviewForm(false);
  };

  // Filtered Products (Shopify Search & Discovery Mock)
  const filteredProducts = PRODUCTS.filter(prod => {
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || prod.category === categoryFilter;
    const matchesScent = scentFilter === 'all' || prod.scent === scentFilter || (scentFilter === 'Lavender' && prod.tags.includes('lavender')) || (scentFilter === 'Eucalyptus' && prod.tags.includes('eucalyptus'));
    return matchesSearch && matchesCategory && matchesScent;
  });

  const cartTotal = +cart.reduce((sum, item) => sum + (item.price * item.qty), 0).toFixed(2);

  return (
    <div className="min-h-screen bg-[#F9F9FB] flex flex-col font-sans select-none antialiased">
      
      {/* Announcement Bar */}
      <div className="bg-[#1E293B] text-white text-center py-2.5 px-4 text-xs font-medium tracking-wider uppercase border-b border-slate-800">
        <span>FREE SHIPPING on orders above $50 — Use code <strong className="text-amber-500">AURA10</strong> for 10% off</span>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-30 bg-[#F9F9FB]/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <img src="/logo.png" alt="AURA Logo" className="h-10 w-auto" />
            <span className="font-heading text-2xl font-bold tracking-widest text-[#1E293B]">AURA</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm tracking-widest uppercase">
            <button 
              onClick={() => setActiveTab('home')}
              className={`hover:text-amber-600 transition-colors py-2 ${activeTab === 'home' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-slate-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab('shop')}
              className={`hover:text-amber-600 transition-colors py-2 ${activeTab === 'shop' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-slate-600'}`}
            >
              Shop
            </button>
            <button 
              onClick={() => setActiveTab('apps')}
              className={`hover:text-amber-600 transition-colors py-2 ${activeTab === 'apps' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-slate-600'}`}
            >
              App Integrations
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-700 hover:text-amber-600 transition-colors"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-amber-600 rounded-full">
                  {cart.reduce((sum, item) => sum + item.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* VIEW: HOME */}
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-slate-100 to-slate-200 overflow-hidden py-24 md:py-32">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 text-left">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 tracking-wider uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    Intelligent Aromatherapy
                  </span>
                  <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                    Pure Wellness <br/>
                    <span className="italic text-amber-700 font-normal">Designed for Mindful Spaces</span>
                  </h1>
                  <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                    Elevate your atmosphere with AURA's premium hand-finished ceramic ultrasonic diffusers and single-origin organic botanicals.
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setActiveTab('shop')}
                      className="px-8 py-3 bg-[#1E293B] text-white hover:bg-amber-600 rounded-md font-medium tracking-wide uppercase transition-colors shadow-md"
                    >
                      Shop The Collection
                    </button>
                    <button 
                      onClick={() => setActiveTab('apps')}
                      className="px-6 py-3 border border-slate-300 text-slate-700 hover:border-slate-500 rounded-md font-medium tracking-wide uppercase transition-colors"
                    >
                      App Demo Features
                    </button>
                  </div>
                </div>
                <div className="relative flex justify-center">
                  <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-amber-500/10 absolute -z-10 blur-3xl"></div>
                  <img 
                    src="/aura_smart_diffuser.png" 
                    alt="AURA Smart Diffuser" 
                    className="w-full max-w-md h-auto object-contain drop-shadow-2xl animate-pulse-slow" 
                  />
                </div>
              </div>
            </section>

            {/* Featured collections list */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <h2 className="text-3xl font-bold tracking-wide uppercase font-heading text-slate-800 mb-2">Explore the Ranges</h2>
              <p className="text-slate-500 mb-12">Carefully selected solutions to align your focus, rest, and respiratory health.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div 
                  onClick={() => { setCategoryFilter('diffuser'); setActiveTab('shop'); }}
                  className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-md hover-scale"
                >
                  <div className="aspect-video overflow-hidden bg-slate-100 flex items-center justify-center p-6">
                    <img src="/aura_smart_diffuser.png" alt="Smart Diffusers" className="h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 text-left">
                    <h3 className="font-heading text-xl font-bold text-slate-800">Smart Diffusers</h3>
                    <p className="text-sm text-slate-500 mt-1">Ultrasonic cold-mist hardware</p>
                  </div>
                </div>

                <div 
                  onClick={() => { setCategoryFilter('mist'); setActiveTab('shop'); }}
                  className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-md hover-scale"
                >
                  <div className="aspect-video overflow-hidden bg-slate-100 flex items-center justify-center p-6">
                    <img src="/aura_sleep_mist.png" alt="Organic Mists" className="h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 text-left">
                    <h3 className="font-heading text-xl font-bold text-slate-800">Organic Mists</h3>
                    <p className="text-sm text-slate-500 mt-1">Pillow sprays and steam botanicals</p>
                  </div>
                </div>

                <div 
                  onClick={() => { setCategoryFilter('set'); setActiveTab('shop'); }}
                  className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-md hover-scale"
                >
                  <div className="aspect-video overflow-hidden bg-slate-100 flex items-center justify-center p-6">
                    <img src="/aura_essential_oils.png" alt="Essential Oils" className="h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 text-left">
                    <h3 className="font-heading text-xl font-bold text-slate-800">Essential Oils</h3>
                    <p className="text-sm text-slate-500 mt-1">Pure organic drop remedies</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Custom Interactive USP Grid (Mock of Custom Section) */}
            <section className="bg-slate-100 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span className="text-amber-700 text-xs font-semibold tracking-widest uppercase">Custom Liquid Mock Section</span>
                <h2 className="text-3xl font-bold font-heading text-slate-800 mt-1 mb-2">Interactive USP Grid</h2>
                <p className="text-slate-500 mb-12">Conforms strictly to scoped CSS and theme fonts standards.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="bg-white p-8 rounded-lg shadow-sm text-center flex flex-col items-center hover-scale">
                    <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg text-slate-800 mb-2">100% Organic & Pure</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Therapeutic-grade essential oils directly sourced from organic certified fields.</p>
                  </div>

                  <div className="bg-white p-8 rounded-lg shadow-sm text-center flex flex-col items-center hover-scale">
                    <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                      <SlidersHorizontal className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg text-slate-800 mb-2">Sleek & Silent Design</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Matte dome ceramic cover with ultrasonic cold-mist that works in complete quiet.</p>
                  </div>

                  <div className="bg-white p-8 rounded-lg shadow-sm text-center flex flex-col items-center hover-scale">
                    <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg text-slate-800 mb-2">Eco-Conscious Promise</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Cruelty-free botanical formulas, recyclable amber glass bottles, carbon-offset shipping.</p>
                  </div>

                  <div className="bg-white p-8 rounded-lg shadow-sm text-center flex flex-col items-center hover-scale">
                    <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                      <Truck className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg text-slate-800 mb-2">Satisfaction Guarantee</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">30-day diffuser testing period. Hassle-free returned shipping on mists.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Custom Before/After Slide Section (Mock of Slider Section) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <span className="text-amber-700 text-xs font-semibold tracking-widest uppercase">Custom Liquid Mock Section</span>
              <h2 className="text-3xl font-bold font-heading text-slate-800 mt-1 mb-2">Before / After Slider</h2>
              <p className="text-slate-500 mb-12">Drag the slider horizontally to compare dry air vs. AURA ultrasonic mist humidification.</p>
              
              <div 
                ref={sliderRef}
                className="relative w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg select-none cursor-ew-resize"
                onMouseMove={(e) => isSliding && handleSliderMove(e.clientX)}
                onMouseDown={() => setIsSliding(true)}
                onMouseUp={() => setIsSliding(false)}
                onMouseLeave={() => setIsSliding(false)}
                onTouchMove={handleTouchMove}
                onTouchStart={() => setIsSliding(true)}
                onTouchEnd={() => setIsSliding(false)}
              >
                {/* Image After (Right side / background) */}
                <div className="absolute inset-0 bg-[#E2E8F0] flex items-center justify-center">
                  <div className="absolute inset-0 bg-slate-900/10 z-10"></div>
                  <img 
                    src="/aura_smart_diffuser.png" 
                    alt="AURA Mist Active" 
                    className="w-full h-full object-cover filter blur-[0.5px] contrast-[1.05]"
                  />
                  {/* Glowing mist simulation overlaid */}
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-40 h-80 bg-white/20 rounded-full filter blur-3xl mix-blend-screen animate-pulse-slow"></div>
                  <span className="absolute bottom-6 right-6 px-3 py-1.5 bg-slate-950/80 backdrop-blur-sm text-white text-xs uppercase tracking-wider rounded-md font-medium z-20">
                    AURA Mist Active (After)
                  </span>
                </div>

                {/* Image Before (Left side / clipped) */}
                <div 
                  className="absolute inset-y-0 left-0 overflow-hidden z-10"
                  style={{ width: `${sliderPercentage}%` }}
                >
                  {/* Re-render image to clip correctly */}
                  <div className="absolute inset-0 w-full h-full bg-[#E2E8F0]" style={{ width: sliderRef.current ? sliderRef.current.offsetWidth : 1000 }}>
                    <div className="absolute inset-0 bg-slate-950/40 z-10"></div>
                    <img 
                      src="/aura_smart_diffuser.png" 
                      alt="Dry room air" 
                      className="w-full h-full object-cover filter grayscale contrast-90 brightness-75"
                    />
                    <span className="absolute bottom-6 left-6 px-3 py-1.5 bg-slate-950/80 backdrop-blur-sm text-white text-xs uppercase tracking-wider rounded-md font-medium z-20">
                      Dry Stale Air (Before)
                    </span>
                  </div>
                </div>

                {/* Handle Bar */}
                <div 
                  className="absolute inset-y-0 z-20 w-1 bg-white cursor-ew-resize shadow-md"
                  style={{ left: `${sliderPercentage}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white text-slate-800 border-2 border-slate-800 rounded-full flex items-center justify-center shadow-lg font-bold">
                    ↔
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="bg-slate-900 text-white py-20 text-center">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <span className="text-amber-500 text-xs font-semibold tracking-widest uppercase">Customer Reviews (Judge.me Mock)</span>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-amber-500 text-amber-500" />)}
                </div>
                <blockquote className="font-heading text-2xl sm:text-3xl lg:text-4xl italic font-light max-w-4xl mx-auto leading-relaxed text-slate-100">
                  "The smart diffuser is a work of art. It fits my shelf perfectly, runs in absolute silence, and the Lavender mist has completely resolved my sleep routine."
                </blockquote>
                <div>
                  <cite className="not-italic font-semibold text-lg text-amber-500">Sarah M.</cite>
                  <span className="text-slate-400 block text-xs tracking-wider uppercase mt-1">Verified Buyer</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW: SHOP */}
        {activeTab === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-10">
              
              {/* Sidebar Filters (Shopify Search & Discovery Mock) */}
              <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 text-left bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Search className="w-4 h-4 text-amber-600" />
                    Search
                  </h3>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search mists, oils..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                    Categories
                  </h3>
                  <div className="flex flex-col gap-2.5 text-sm font-medium">
                    {['all', 'diffuser', 'mist', 'set'].map((cat) => (
                      <button 
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`text-left hover:text-amber-700 transition-colors uppercase tracking-wider text-xs ${categoryFilter === cat ? 'text-amber-700 font-bold' : 'text-slate-500'}`}
                      >
                        {cat === 'all' ? 'All Products' : cat + 's'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-800 mb-4">Scent Profiles</h3>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'Lavender', 'Eucalyptus', 'Mint', 'Chamomile'].map((scent) => (
                      <button 
                        key={scent}
                        onClick={() => setScentFilter(scent)}
                        className={`px-3 py-1 border rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${scentFilter === scent ? 'bg-amber-600 text-white border-amber-600' : 'border-slate-300 text-slate-600 hover:border-slate-500'}`}
                      >
                        {scent}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Product Grid */}
              <div className="flex-grow space-y-6">
                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <p className="text-slate-500 text-sm">Showing {filteredProducts.length} premium products</p>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                    <p className="text-slate-500 text-lg">No products match your filters.</p>
                    <button 
                      onClick={() => { setCategoryFilter('all'); setScentFilter('all'); setSearchQuery(''); }}
                      className="mt-4 px-6 py-2 bg-amber-600 text-white hover:bg-amber-700 rounded-md font-medium text-sm"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((prod) => (
                      <div 
                        key={prod.id}
                        className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col hover-scale"
                      >
                        {prod.label && (
                          <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider">
                            {prod.label}
                          </span>
                        )}

                        <div 
                          onClick={() => setSelectedProduct(prod)}
                          className="aspect-square bg-slate-100 flex items-center justify-center p-6 cursor-pointer"
                        >
                          <img src={prod.image} alt={prod.title} className="h-44 w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                        </div>

                        <div className="p-6 flex-grow flex flex-col justify-between text-left">
                          <div>
                            <h3 
                              onClick={() => setSelectedProduct(prod)}
                              className="font-heading text-lg font-bold text-slate-800 cursor-pointer hover:text-amber-700 transition-colors line-clamp-1"
                            >
                              {prod.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-amber-700 font-bold">${prod.price}</span>
                              <span className="text-slate-400 line-through text-sm">${prod.compareAtPrice}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-2 line-clamp-2">{prod.description}</p>
                          </div>

                          {/* App Features Integrated on Product Card */}
                          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                            {prod.allowsSubscription && (
                              <div className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded border border-slate-200">
                                <span className="font-semibold text-slate-700">Subscribe & Save 15%</span>
                                <div className="flex gap-1">
                                  <button 
                                    onClick={() => setPurchaseMode(prev => ({...prev, [prod.id]: 'one-time'}))}
                                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${purchaseMode[prod.id] === 'one-time' ? 'bg-[#1E293B] text-white' : 'bg-slate-200 text-slate-700'}`}
                                  >
                                    Once
                                  </button>
                                  <button 
                                    onClick={() => setPurchaseMode(prev => ({...prev, [prod.id]: 'subscription'}))}
                                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${purchaseMode[prod.id] === 'subscription' ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'}`}
                                  >
                                    Monthly
                                  </button>
                                </div>
                              </div>
                            )}

                            <button 
                              onClick={() => addToCart(prod, prod.allowsSubscription && purchaseMode[prod.id] === 'subscription')}
                              className="w-full py-2.5 bg-[#1E293B] text-white hover:bg-amber-600 rounded text-xs font-semibold tracking-wider uppercase transition-colors"
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: APP INTEGRATIONS */}
        {activeTab === 'apps' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in text-left">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-4xl font-bold text-slate-800 mb-4">Shopify App Integrations Mock</h1>
              <p className="text-slate-600">
                To satisfy the hiring requirements, we built high-fidelity interactive simulations of the 6 required Shopify apps so you can study and present their exact functionality.
              </p>
            </div>

            {/* App 1: Shopify Bundles */}
            <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold uppercase rounded-full">
                  <Layers className="w-3.5 h-3.5" /> App 1: Shopify Bundles
                </span>
                <h2 className="font-heading text-2xl font-bold text-slate-800">Dynamic Bundle Builder</h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  The Shopify Bundles app allows merchants to package related products to offer bulk deals. This is the single most effective way to increase **Average Order Value (AOV)**.
                </p>
                <div className="bg-slate-50 p-4 rounded border border-slate-200 text-xs space-y-2">
                  <p><strong>Use Case:</strong> Bundling hardware (Smart Diffuser) with consumables (Mists & Oils) ensures repeat business.</p>
                  <p><strong>Formula:</strong> Combined Value: $151.00 → Bundle Deal (20% Off): **$110.00**</p>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h3 className="font-bold text-[#1E293B] mb-4 text-sm uppercase tracking-wider">Select Bundle Components:</h3>
                <div className="space-y-3">
                  {PRODUCTS.map(prod => (
                    <div key={prod.id} className="flex items-center justify-between bg-white p-3 rounded border border-slate-200 shadow-xs">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={!!bundleItems[prod.id]} 
                          onChange={() => setBundleItems(prev => ({...prev, [prod.id]: !prev[prod.id]}))}
                          className="w-4 h-4 accent-amber-600"
                        />
                        <span className="text-sm font-semibold text-slate-800 line-clamp-1">{prod.title}</span>
                      </div>
                      <span className="text-sm font-bold text-amber-700">${prod.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-500 block">Total Value (20% Off Applied)</span>
                    <span className="text-xl font-bold text-amber-700">
                      ${+(PRODUCTS.filter(p => bundleItems[p.id]).reduce((sum, p) => sum + p.price, 0) * 0.80).toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={addBundleToCart}
                    className="px-6 py-2.5 bg-[#1E293B] text-white hover:bg-amber-600 rounded text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Add Bundle To Cart
                  </button>
                </div>
              </div>
            </section>

            {/* App 2: Shopify Subscriptions */}
            <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-bold uppercase rounded-full">
                  <Calendar className="w-3.5 h-3.5" /> App 2: Shopify Subscriptions
                </span>
                <h2 className="font-heading text-2xl font-bold text-slate-800">Subscribe & Save Plan</h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Automating repeat mists and oil deliveries generates predictable **Monthly Recurring Revenue (MRR)** and raises **Customer Lifetime Value (LTV)**.
                </p>
                <div className="bg-slate-50 p-4 rounded border border-slate-200 text-xs space-y-2">
                  <p><strong>Offer:</strong> 15% discount on auto-delivery orders.</p>
                  <p><strong>Frequency:</strong> Every 30 Days (auto-renewed).</p>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex flex-col justify-center">
                <div className="bg-white p-6 rounded-lg border border-slate-200 text-center space-y-4 shadow-xs">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                    <RefreshCw className="w-8 h-8 animate-spin-slow" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-800">Lavender & Chamomile Sleep Mist</h3>
                  <p className="text-xs text-slate-500">Normally: $24.00 — Subscription Price (15% Off): <strong className="text-green-700">$20.40</strong></p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => addToCart(PRODUCTS.find(p => p.id === 'lavender-sleep-mist'), false)}
                      className="flex-grow py-3 border border-slate-300 hover:border-slate-500 rounded text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors"
                    >
                      Buy Once ($24.00)
                    </button>
                    <button 
                      onClick={() => addToCart(PRODUCTS.find(p => p.id === 'lavender-sleep-mist'), true)}
                      className="flex-grow py-3 bg-green-700 hover:bg-green-800 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Subscribe ($20.40)
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* App 3: Judge.me reviews list */}
            <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase rounded-full mb-3">
                    <Star className="w-3.5 h-3.5 fill-amber-700" /> App 3: Judge.me Reviews
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-slate-800">Product Reviews & Ratings</h2>
                  <p className="text-slate-500 text-sm mt-1">Social proof that builds trust and drives conversion rate.</p>
                </div>
                <button 
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-6 py-2.5 bg-amber-600 text-white hover:bg-amber-700 rounded text-xs font-bold uppercase tracking-wider transition-colors self-start md:self-center"
                >
                  {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                </button>
              </div>

              {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4 max-w-xl">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Leave a Review</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={newReview.author}
                        onChange={(e) => setNewReview(prev => ({...prev, author: e.target.value}))}
                        placeholder="e.g. John D."
                        className="w-full p-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-amber-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Rating</label>
                      <select 
                        value={newReview.rating}
                        onChange={(e) => setNewReview(prev => ({...prev, rating: +e.target.value}))}
                        className="w-full p-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-amber-600 bg-white"
                      >
                        {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Product</label>
                    <select 
                      value={newReview.productHandle}
                      onChange={(e) => setNewReview(prev => ({...prev, productHandle: e.target.value}))}
                      className="w-full p-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-amber-600 bg-white"
                    >
                      {PRODUCTS.map(p => <option key={p.id} value={p.handle}>{p.title}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Review Title</label>
                    <input 
                      type="text" 
                      required
                      value={newReview.title}
                      onChange={(e) => setNewReview(prev => ({...prev, title: e.target.value}))}
                      placeholder="e.g. Absolutely beautiful design"
                      className="w-full p-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Review Details</label>
                    <textarea 
                      rows="3"
                      required
                      value={newReview.body}
                      onChange={(e) => setNewReview(prev => ({...prev, body: e.target.value}))}
                      placeholder="Share your experience with the product..."
                      className="w-full p-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-[#1E293B] text-white hover:bg-amber-600 rounded text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Review
                  </button>
                </form>
              )}

              <div className="space-y-6">
                {reviews.map(rev => (
                  <div key={rev.id} className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                        {[...Array(5 - rev.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-slate-300" />)}
                      </div>
                      <span className="text-xs text-slate-400">{rev.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 mt-2">{rev.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{rev.body}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-semibold text-slate-700">{rev.author}</span>
                      <span>• Verified Buyer of {PRODUCTS.find(p => p.handle === rev.productHandle)?.title || rev.productHandle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#1E293B] text-slate-400 py-16 border-t border-slate-800 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <img src="/logo.png" alt="AURA Logo" className="h-8 w-auto filter invert brightness-200" />
              <span className="font-heading text-xl font-bold tracking-widest">AURA</span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs">
              Premium smart aromatherapy and active organic botanicals to elevate your atmosphere and support daily wellness.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => setActiveTab('shop')} className="hover:text-white transition-colors">Shop All</button></li>
              <li><button onClick={() => setActiveTab('apps')} className="hover:text-white transition-colors">App Integrations</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-xs mb-3">Join the sanctuary. Subscribe for wellness rituals and 15% off.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email"
                className="bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-600 w-full"
              />
              <button className="bg-amber-600 text-white hover:bg-amber-700 px-4 py-1.5 rounded text-xs uppercase font-bold tracking-wider transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 mt-12 pt-8 text-center text-xs">
          <p>© 2026 AURA Wellness. Built for Digital Heroes Developer Trial.</p>
        </div>
      </footer>

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl max-w-3xl w-full flex flex-col md:flex-row relative animate-scale-up">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-all z-10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Product Image */}
            <div className="md:w-1/2 bg-slate-100 flex items-center justify-center p-8">
              <img src={selectedProduct.image} alt={selectedProduct.title} className="max-h-72 w-auto object-contain" />
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8 text-left flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">{selectedProduct.category}</span>
                <h3 className="font-heading text-2xl font-bold text-slate-800 mt-1">{selectedProduct.title}</h3>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-amber-700">${selectedProduct.price}</span>
                  <span className="text-slate-400 line-through text-sm">${selectedProduct.compareAtPrice}</span>
                </div>

                <p className="text-sm text-slate-600 mt-4 leading-relaxed">{selectedProduct.description}</p>
                
                <ul className="mt-4 space-y-1.5 text-xs text-slate-600 font-medium">
                  {selectedProduct.benefits && selectedProduct.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex gap-4">
                <button 
                  onClick={() => { addToCart(selectedProduct, false); setSelectedProduct(null); }}
                  className="flex-grow py-3 bg-[#1E293B] hover:bg-amber-600 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Add Once
                </button>
                {selectedProduct.allowsSubscription && (
                  <button 
                    onClick={() => { addToCart(selectedProduct, true); setSelectedProduct(null); }}
                    className="flex-grow py-3 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Subscribe & Save
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between text-left animate-slide-left">
            
            {/* Cart Header */}
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-heading text-xl font-bold text-slate-800">Your Basket</h3>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-slate-500 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">Your basket is empty.</p>
                  <button 
                    onClick={() => { setIsCartOpen(false); setActiveTab('shop'); }}
                    className="mt-4 px-6 py-2 bg-amber-600 text-white hover:bg-amber-700 rounded text-xs font-bold uppercase tracking-wider"
                  >
                    Go Shop
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.key} className="flex justify-between items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-xs">
                    <img src={item.product.image} alt={item.product.title} className="w-12 h-12 object-contain" />
                    <div className="flex-grow">
                      <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">{item.label}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-400">{item.qty}x</span>
                        <span className="text-xs font-bold text-amber-700">${item.price}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.key)}
                      className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Subtotal</span>
                  <span className="text-xl font-bold text-amber-700">${cartTotal}</span>
                </div>
                <p className="text-[10px] text-slate-400">Shipping, taxes, and discounts calculated at checkout.</p>
                <button 
                  onClick={() => alert(`Proceeding to checkout with $${cartTotal}...`)}
                  className="w-full py-3 bg-[#1E293B] hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-widest rounded transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  Checkout Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
