import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingCart,
  X,
  Search,
  Menu,
  Star,
  ChevronDown,
  Check,
  AlertCircle,
  Package,
  Shield,
  Zap,
  Award,
  ChevronRight,
  Minus,
  Plus,
  Beaker,
  Leaf,
  Heart,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      id: 'NAD-001',
      name: 'NAD+',
      category: 'Longevity',
      tagline: 'Cellular Energy & Vitality',
      price: 119,
      originalPrice: 169,
      discount: 30,
      rating: 4.9,
      reviews: 58,
      vials: 5,
      concentration: '100mg/vial',
      purity: '99.7%',
      description: 'Nicotinamide adenine dinucleotide for cellular energy research.',
      featured: true,
      stock: 'in',
      badge: 'Best Seller',
    },
    {
      id: 'BPC-001',
      name: 'BPC-157',
      category: 'Recovery',
      tagline: 'Tissue Repair & Recovery',
      price: 79,
      originalPrice: 119,
      discount: 34,
      rating: 4.8,
      reviews: 89,
      vials: 5,
      concentration: '5mg/vial',
      purity: '99.4%',
      description: 'Body Protection Compound for tissue repair research.',
      featured: true,
      stock: 'in',
      badge: 'Popular',
    },
    {
      id: 'GHK-001',
      name: 'GHK-Cu',
      category: 'Beauty',
      tagline: 'The Glow Peptide',
      price: 59,
      originalPrice: 89,
      discount: 34,
      rating: 4.9,
      reviews: 67,
      vials: 5,
      concentration: '10mg/vial',
      purity: '99.2%',
      description: 'Copper tripeptide for skin and tissue research.',
      featured: true,
      stock: 'in',
    },
    {
      id: 'EPI-001',
      name: 'Epitalon',
      category: 'Longevity',
      tagline: 'The Longevity King',
      price: 99,
      originalPrice: 149,
      discount: 34,
      rating: 5.0,
      reviews: 73,
      vials: 5,
      concentration: '10mg/vial',
      purity: '98.9%',
      description: 'Telomerase-activating tetrapeptide for aging research.',
      stock: 'in',
      badge: 'Top Rated',
    },
    {
      id: 'TB-001',
      name: 'TB-500',
      category: 'Recovery',
      tagline: 'The Regenerator',
      price: 89,
      originalPrice: 129,
      discount: 31,
      rating: 4.7,
      reviews: 54,
      vials: 5,
      concentration: '5mg/vial',
      purity: '98.7%',
      description: 'Thymosin Beta-4 fragment for regeneration research.',
      stock: 'in',
    },
    {
      id: 'C5',
      name: 'CJC-1295 5mg',
      category: 'Longevity',
      tagline: 'GHRH analog for growth hormone pathway research',
      price: 124,
      originalPrice: 198,
      discount: 37,
      rating: 4.8,
      reviews: 16,
      vials: 10,
      concentration: '5mg/vial',
      purity: '99.5%',
      description: 'Studies focus on pulsatile GH release and IGF-1 modulation.',
      stock: 'in',
    },
    {
      id: 'C10',
      name: 'CJC-1295 10mg',
      category: 'Longevity',
      tagline: 'Higher concentration GHRH analog for advanced research',
      price: 211,
      originalPrice: 336,
      discount: 37,
      rating: 4.9,
      reviews: 23,
      vials: 10,
      concentration: '10mg/vial',
      purity: '99.5%',
      description: 'Ideal for studying growth hormone secretagogue mechanisms.',
      stock: 'in',
    },
    {
      id: 'R5',
      name: 'Retatrutide 5mg',
      category: 'Metabolic',
      tagline: 'Entry-level triple agonist for cutting-edge metabolic research',
      price: 106,
      originalPrice: 150,
      discount: 29,
      rating: 4.6,
      reviews: 14,
      vials: 10,
      concentration: '5mg/vial',
      purity: '99.5%',
      description: 'Studies GLP-1, GIP, and glucagon receptor activation simultaneously.',
      stock: 'out',
    },
    {
      id: 'R10',
      name: 'Retatrutide 10mg',
      category: 'Metabolic',
      tagline: 'Standard Retatrutide for multi-receptor pathway research',
      price: 156,
      originalPrice: 248,
      discount: 38,
      rating: 4.7,
      reviews: 19,
      vials: 10,
      concentration: '10mg/vial',
      purity: '99.5%',
      description: 'Examines complex metabolic signaling and energy homeostasis.',
      stock: 'out',
    },
    {
      id: 'R15',
      name: 'Retatrutide 15mg',
      category: 'Metabolic',
      tagline: 'High-dose Retatrutide for intensive metabolic investigation',
      price: 228,
      originalPrice: 396,
      discount: 42,
      rating: 4.8,
      reviews: 11,
      vials: 10,
      concentration: '15mg/vial',
      purity: '99.5%',
      description: 'Suitable for extended studies in metabolic health and weight regulation.',
      stock: 'out',
    },
    {
      id: 'T5',
      name: 'Tirzepatide 5mg',
      category: 'Metabolic',
      tagline: 'Introductory dose dual agonist for metabolic studies',
      price: 86,
      originalPrice: 136,
      discount: 37,
      rating: 4.5,
      reviews: 21,
      vials: 10,
      concentration: '5mg/vial',
      purity: '99.3%',
      description: 'Investigates GLP-1/GIP receptor co-activation effects.',
      stock: 'in',
    },
    {
      id: 'T10',
      name: 'Tirzepatide 10mg',
      category: 'Metabolic',
      tagline: 'Standard dual agonist for glucose and lipid research',
      price: 136,
      originalPrice: 216,
      discount: 37,
      rating: 4.7,
      reviews: 28,
      vials: 10,
      concentration: '10mg/vial',
      purity: '99.3%',
      description: 'Studies metabolic pathways and incretin hormone synergy.',
      stock: 'in',
    },
    {
      id: 'T15',
      name: 'Tirzepatide 15mg',
      category: 'Metabolic',
      tagline: 'Higher concentration dual agonist for prolonged studies',
      price: 196,
      originalPrice: 336,
      discount: 42,
      rating: 4.8,
      reviews: 17,
      vials: 10,
      concentration: '15mg/vial',
      purity: '99.3%',
      description: 'Enables deeper exploration of metabolic optimization.',
      stock: 'in',
    },
    {
      id: 'S-0.25',
      name: 'Semaglutide 0.25mg',
      category: 'Metabolic',
      tagline: 'Micro-dose GLP-1 agonist for incretin physiology research',
      price: 29,
      originalPrice: 49,
      discount: 41,
      rating: 4.3,
      reviews: 9,
      vials: 10,
      concentration: '0.25mg/vial',
      purity: '99.1%',
      description: 'Foundational studies in GLP-1 receptor activation.',
      stock: 'in',
    },
    {
      id: 'S-0.5',
      name: 'Semaglutide 0.5mg',
      category: 'Metabolic',
      tagline: 'Low-dose GLP-1 agonist for dose-response studies',
      price: 41,
      originalPrice: 72,
      discount: 43,
      rating: 4.4,
      reviews: 12,
      vials: 10,
      concentration: '0.5mg/vial',
      purity: '99.1%',
      description: 'Ideal for early-stage metabolic research.',
      stock: 'in',
    },
    {
      id: 'S-1',
      name: 'Semaglutide 1mg',
      category: 'Metabolic',
      tagline: 'Standard GLP-1 agonist for metabolic investigation',
      price: 63,
      originalPrice: 112,
      discount: 44,
      rating: 4.6,
      reviews: 26,
      vials: 10,
      concentration: '1mg/vial',
      purity: '99.1%',
      description: 'Widely used for glucoregulation and satiety studies.',
      stock: 'in',
    },
    {
      id: 'S-2',
      name: 'Semaglutide 2mg',
      category: 'Metabolic',
      tagline: 'Mid-range GLP-1 agonist for advanced metabolic research',
      price: 101,
      originalPrice: 184,
      discount: 45,
      rating: 4.7,
      reviews: 19,
      vials: 10,
      concentration: '2mg/vial',
      purity: '99.1%',
      description: 'Examines higher-dose GLP-1 receptor engagement.',
      stock: 'in',
    },
    {
      id: 'S-2.5',
      name: 'Semaglutide 2.5mg',
      category: 'Metabolic',
      tagline: 'High-dose GLP-1 agonist for intensive metabolic studies',
      price: 121,
      originalPrice: 224,
      discount: 46,
      rating: 4.8,
      reviews: 15,
      vials: 10,
      concentration: '2.5mg/vial',
      purity: '99.1%',
      description: 'Supports long-term investigations in metabolic health.',
      stock: 'in',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: Package },
    { id: 'Longevity', name: 'Longevity', icon: TrendingUp },
    { id: 'Recovery', name: 'Recovery', icon: Heart },
    { id: 'Beauty', name: 'Beauty', icon: Leaf },
    { id: 'Metabolic', name: 'Metabolic', icon: Zap },
  ];

  const benefits = [
    {
      icon: Shield,
      title: '99%+ Purity',
      description: 'Third-party tested for maximum quality assurance',
    },
    {
      icon: Beaker,
      title: 'Research Grade',
      description: 'Pharmaceutical-grade compounds for laboratory use',
    },
    {
      icon: Award,
      title: 'COA Verified',
      description: 'Certificate of Analysis provided for every batch',
    },
    {
      icon: Package,
      title: 'Fast Shipping',
      description: 'Secure packaging with discreet delivery',
    },
  ];

  const faqs = [
    {
      q: 'What are research peptides?',
      a: 'Research peptides are synthetic compounds designed for laboratory and scientific research purposes only. They are not intended for human consumption or medical use.',
    },
    {
      q: 'How do I verify product purity?',
      a: 'Each batch comes with a Certificate of Analysis (COA) from independent third-party laboratories, verifying purity levels of 98%+ for all compounds.',
    },
    {
      q: 'What is your shipping policy?',
      a: 'We ship Monday-Friday with discreet packaging. Domestic orders typically arrive within 3-5 business days. International shipping available.',
    },
    {
      q: 'Can I request a custom formulation?',
      a: 'Yes, we work with qualified research institutions for custom formulations. Please contact us with your specific research requirements.',
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    if (product.stock === 'out') {
      showToastMessage('This product is currently out of stock');
      return;
    }
    const existing = cartItems.find((item) => item.product.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
    showToastMessage(`${product.name} added to cart`);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
    showToastMessage('Item removed from cart');
  };

  const changeQuantity = (productId, delta) => {
    setCartItems(
      cartItems
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
                <Leaf className="text-white" size={20} />
              </div>
              <span className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900">
                Rosalina Glow
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#products" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">
                Products
              </a>
              <a href="#benefits" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">
                Benefits
              </a>
              <a href="#faq" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">
                FAQ
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Search size={20} className="text-gray-700" />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart size={20} className="text-gray-700" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Menu size={20} className="text-gray-700" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-4 animate-fade-in">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                autoFocus
              />
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden animate-fade-in">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="text-xl font-semibold">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 p-6 space-y-6">
              <a
                href="#products"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-medium text-gray-900 hover:text-emerald-600"
              >
                Products
              </a>
              <a
                href="#benefits"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-medium text-gray-900 hover:text-emerald-600"
              >
                Benefits
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-medium text-gray-900 hover:text-emerald-600"
              >
                FAQ
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-4 z-50 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg animate-fade-in flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="pt-28 sm:pt-36 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-6">
              <span className="text-sm font-medium text-emerald-700">Research Grade Peptides</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Premium Research Compounds for{' '}
              <span className="text-emerald-600">Scientific Excellence</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
              Laboratory-grade peptides with 99%+ purity. Third-party tested, COA verified, and trusted by research institutions worldwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#products"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full transition-all shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30"
              >
                Shop Research Compounds
              </a>
              <a
                href="#benefits"
                className="w-full sm:w-auto px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-full transition-all"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon size={24} className="text-emerald-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-xs text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Research Catalog</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our selection of pharmaceutical-grade research peptides
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm">{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Product Image Placeholder */}
                <div className="relative h-56 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                  <div className="text-6xl font-bold text-emerald-200">{product.name.substring(0, 3)}</div>
                  {product.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-emerald-700 shadow-sm">
                      {product.badge}
                    </div>
                  )}
                  {product.stock === 'out' && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gray-900/95 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.tagline}</p>
                  </div>

                  {/* Specs */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Beaker size={14} />
                      <span>{product.purity}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package size={14} />
                      <span>{product.vials} vials</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(product.rating) ? 'fill-emerald-500 text-emerald-500' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      {product.discount && (
                        <span className="text-xs font-medium text-emerald-600">Save {product.discount}%</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 'out'}
                      className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                        product.stock === 'out'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30'
                      }`}
                    >
                      {product.stock === 'out' ? 'Sold Out' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Researchers Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Uncompromising quality standards for scientific excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Third-Party Tested',
                description: 'Every batch undergoes rigorous independent laboratory testing to ensure 99%+ purity and quality.',
              },
              {
                icon: Beaker,
                title: 'Pharmaceutical Grade',
                description: 'Manufactured in certified facilities following strict GMP protocols and quality standards.',
              },
              {
                icon: Award,
                title: 'COA Verified',
                description: 'Certificate of Analysis provided for complete transparency and research documentation.',
              },
              {
                icon: Package,
                title: 'Secure Delivery',
                description: 'Discreet packaging with temperature-controlled shipping to preserve compound integrity.',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon size={28} className="text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">Everything you need to know about our research peptides</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-600 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOPPING CART */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600">Add some research compounds to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg flex items-center justify-center text-2xl font-bold text-emerald-300 flex-shrink-0">
                          {item.product.name[0]}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 pr-2">
                              <h4 className="font-semibold text-gray-900 mb-1">{item.product.name}</h4>
                              <p className="text-xs text-gray-600">
                                {item.product.concentration} • {item.product.purity}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 hover:bg-red-50 rounded-full text-red-600 transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => changeQuantity(item.product.id, -1)}
                                className="w-8 h-8 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-all flex items-center justify-center"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>
                              <button
                                onClick={() => changeQuantity(item.product.id, 1)}
                                className="w-8 h-8 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-all flex items-center justify-center"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-600">${item.product.price} each</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-white">
                {/* Promo Notice */}
                <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Check size={16} className="text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-900">Limited Time Offer</span>
                  </div>
                  <p className="text-xs text-emerald-700">
                    Use code <span className="font-mono font-bold">NYGLOW30</span> for 30% off bulk orders
                  </p>
                </div>

                {/* Total */}
                <div className="mb-6">
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-medium">Calculated at checkout</span>
                  </div>
                  <div className="h-px bg-gray-200 mb-4" />
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-emerald-600">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition-all shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 flex items-center justify-center gap-2 group">
                  Proceed to Checkout
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  <Shield size={12} className="inline mr-1" />
                  Research use only • Not for human consumption
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
                  <Leaf className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold">Rosalina Glow</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Premium research-grade peptides for scientific advancement. All products are strictly for laboratory use by qualified professionals.
              </p>
              <div className="flex gap-3">
                {['Bitcoin', 'Zelle', 'Cash App'].map((method) => (
                  <div
                    key={method}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#products" className="hover:text-emerald-400 transition-colors">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="hover:text-emerald-400 transition-colors">
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-emerald-400 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    COA Requests
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle size={24} className="text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-red-300 mb-2">Important Disclaimer</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    All products are intended solely for in-vitro laboratory research and development by qualified professionals. They are <strong>not</strong> for human or veterinary consumption, diagnosis, treatment, or any medicinal use. No claims have been evaluated by the FDA. These statements are for research purposes only.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} Rosalina Glow. All rights reserved.</p>
              <p className="mt-2">Committed to scientific excellence and research integrity</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
