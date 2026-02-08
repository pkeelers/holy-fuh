import React, { useState, useEffect } from 'react';
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
    // ← your original product array stays exactly the same
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
    // ... all the other products ...
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
    { icon: Shield, title: '99%+ Purity', description: 'Third-party tested for maximum quality assurance' },
    { icon: Beaker, title: 'Research Grade', description: 'Pharmaceutical-grade compounds for laboratory use' },
    { icon: Award, title: 'COA Verified', description: 'Certificate of Analysis provided for every batch' },
    { icon: Package, title: 'Fast Shipping', description: 'Secure packaging with discreet delivery' },
  ];

  const faqs = [
    { q: 'What are research peptides?', a: 'Research peptides are synthetic compounds designed for laboratory and scientific research purposes only. They are not intended for human consumption or medical use.' },
    { q: 'How do I verify product purity?', a: 'Each batch comes with a Certificate of Analysis (COA) from independent third-party laboratories, verifying purity levels of 98%+ for all compounds.' },
    { q: 'What is your shipping policy?', a: 'We ship Monday-Friday with discreet packaging. Domestic orders typically arrive within 3-5 business days. International shipping available.' },
    { q: 'Can I request a custom formulation?', a: 'Yes, we work with qualified research institutions for custom formulations. Please contact us with your specific research requirements.' },
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
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-teal-700 to-emerald-700 rounded-xl flex items-center justify-center shadow-sm">
                <Beaker className="text-white" size={22} />
              </div>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Rosalina Research
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              <a href="#products" className="text-sm font-medium text-slate-700 hover:text-teal-700 transition-colors">
                Products
              </a>
              <a href="#quality" className="text-sm font-medium text-slate-700 hover:text-teal-700 transition-colors">
                Quality
              </a>
              <a href="#faq" className="text-sm font-medium text-slate-700 hover:text-teal-700 transition-colors">
                FAQ
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <Search size={20} className="text-slate-700" />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <ShoppingCart size={20} className="text-slate-700" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-700 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <Menu size={20} className="text-slate-700" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-5">
              <input
                type="text"
                placeholder="Search research compounds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                autoFocus
              />
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <span className="text-xl font-semibold">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 p-8 space-y-8">
              <a
                href="#products"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xl font-medium text-slate-900 hover:text-teal-700"
              >
                Products
              </a>
              <a
                href="#quality"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xl font-medium text-slate-900 hover:text-teal-700"
              >
                Quality
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xl font-medium text-slate-900 hover:text-teal-700"
              >
                FAQ
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-6 py-3.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={18} className="text-teal-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HERO */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">
              <Shield size={16} className="text-teal-700" />
              98.9–99.7% Purity
            </div>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">
              <Award size={16} className="text-teal-700" />
              Third-Party COA
            </div>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">
              <Beaker size={16} className="text-teal-700" />
              Research Grade Only
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
            Precision Research Compounds
            <span className="block text-teal-700 mt-2">Engineered for Scientific Excellence</span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            High-purity peptides and research molecules manufactured under strict quality protocols.
            Exclusively for qualified laboratory use.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="#products"
              className="inline-flex items-center px-10 py-4 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all text-lg"
            >
              Browse Catalog
            </a>
            <a
              href="#quality"
              className="inline-flex items-center px-10 py-4 border border-slate-300 hover:border-slate-400 text-slate-800 font-medium rounded-lg transition-all text-lg"
            >
              Quality Standards
            </a>
          </div>

          <p className="mt-12 text-sm text-slate-500 max-w-2xl mx-auto">
            All products are strictly for in-vitro laboratory research by qualified professionals.
            Not for human or veterinary use.
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Research Catalog</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Browse pharmaceutical-grade research compounds
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                    selectedCategory === category.id
                      ? 'bg-teal-700 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={18} />
                  {category.name}
                </button>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-slate-50 flex items-center justify-center border-b border-slate-100">
                  <div className="text-8xl font-black text-slate-200/70 select-none tracking-tighter">
                    {product.name.replace(/[^A-Z]/g, '').slice(0, 4)}
                  </div>

                  {product.badge && (
                    <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-amber-700 border border-amber-200/60 shadow-sm">
                      {product.badge}
                    </div>
                  )}

                  {product.stock === 'out' && (
                    <div className="absolute top-4 right-4 px-4 py-1.5 bg-slate-900/90 backdrop-blur-md rounded-full text-xs font-bold text-white">
                      Out of Stock
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1.5 group-hover:text-teal-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-5">{product.tagline}</p>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 mb-6">
                    <div className="flex items-center gap-1.5">
                      <Beaker size={14} />
                      <span>{product.purity}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Package size={14} />
                      <span>{product.vials} × {product.concentration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award size={14} />
                      <span>COA Provided</span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-5 border-t border-slate-100">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-bold text-slate-900">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-base text-slate-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      {product.discount && (
                        <div className="text-sm font-medium text-amber-600 mt-0.5">
                          Save {product.discount}%
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 'out'}
                      className={`px-7 py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all ${
                        product.stock === 'out'
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-teal-700 text-white hover:bg-teal-800 shadow-sm hover:shadow'
                      }`}
                    >
                      {product.stock === 'out' ? 'Unavailable' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY / BENEFITS */}
      <section id="quality" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Why Researchers Choose Us
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Uncompromising standards for laboratory precision
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Icon size={28} className="text-teal-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">Everything you need to know</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-slate-600 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedFaq === i && (
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Cart</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingCart size={48} className="text-slate-300 mb-6" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Your cart is empty</h3>
                  <p className="text-slate-600">Add research compounds to get started</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center text-xl font-bold text-slate-300 flex-shrink-0">
                        {item.product.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-slate-900">{item.product.name}</h4>
                            <p className="text-sm text-slate-600">
                              {item.product.concentration} • {item.product.purity}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 hover:bg-red-50 rounded-full text-red-600"
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => changeQuantity(item.product.id, -1)}
                              className="w-8 h-8 bg-white border border-slate-300 rounded-full hover:bg-slate-50 flex items-center justify-center"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => changeQuantity(item.product.id, 1)}
                              className="w-8 h-8 bg-white border border-slate-300 rounded-full hover:bg-slate-50 flex items-center justify-center"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-slate-900">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-xs text-slate-500">${item.product.price} each</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-white">
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 mb-4">
                    <span>Shipping</span>
                    <span className="text-teal-700 font-medium">Calculated at checkout</span>
                  </div>
                  <div className="h-px bg-slate-200 mb-4" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-teal-700">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-md">
                  Proceed to Checkout
                  <ChevronRight size={20} />
                </button>

                <p className="text-center text-xs text-slate-500 mt-5">
                  Research use only • Not for human consumption
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-20 lg:py-28 bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 bg-gradient-to-br from-teal-700 to-emerald-700 rounded-xl flex items-center justify-center">
                  <Beaker className="text-white" size={24} />
                </div>
                <span className="text-3xl font-bold text-white">Rosalina Research</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Premium research-grade compounds for scientific advancement.
                Strictly for laboratory use by qualified professionals.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
                <li><a href="#quality" className="hover:text-white transition-colors">Quality</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-6">Legal</h3>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-12">
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-10">
              <div className="flex items-start gap-4">
                <AlertCircle size={24} className="text-amber-400 flex-shrink-0 mt-1" />
                <div className="text-sm text-slate-300">
                  <strong className="text-white">For research use only.</strong><br />
                  These compounds are not approved for human consumption, diagnosis, or treatment.
                  Not evaluated by the FDA. Intended solely for qualified in-vitro laboratory studies.
                </div>
              </div>
            </div>

            <p className="text-center text-slate-500 text-sm">
              © {new Date().getFullYear()} Rosalina Research. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
