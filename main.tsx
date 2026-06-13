import React, { useState, useEffect } from 'react';
import { initialDevices, initialNews, initialNotifications, formatPriceByCountry } from './data';
import { Device, NewsArticle, TabNotification, Review } from './types';
import NotificationCenter from './components/NotificationCenter';
import NewsFeed from './components/NewsFeed';
import DeviceDetail from './components/DeviceDetail';
import DeviceComparer from './components/DeviceComparer';
import {
  CircleDot,
  LayoutDashboard,
  Smartphone,
  Scale,
  TrendingUp,
  Search,
  Sun,
  Moon,
  Flame,
  ChevronRight,
  TrendingDown,
  Sparkles,
  Info,
  Star,
  ThumbsUp,
  MessageCircle,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Persistence-aware states
  const [devices, setDevices] = useState<Device[]>(() => {
    const saved = localStorage.getItem('techcircle_devices');
    return saved ? JSON.parse(saved) : initialDevices;
  });

  const [articles, setArticles] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('techcircle_articles');
    return saved ? JSON.parse(saved) : initialNews;
  });

  const [notifications, setNotifications] = useState<TabNotification[]>(() => {
    const saved = localStorage.getItem('techcircle_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // UI States
  const [activeTab, setActiveTab] = useState<'dashboard' | 'devices' | 'compare' | 'rumours'>('dashboard');
  
  // Country Selected for currency conversion
  const [countryCode, setCountryCode] = useState<'US' | 'UK' | 'EU' | 'IN' | 'CA'>(() => {
    const saved = localStorage.getItem('techcircle_country');
    return (saved as any) || 'US';
  });

  // Advanced Filtering parameters
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterCamera, setFilterCamera] = useState('all');
  const [filterBattery, setFilterBattery] = useState('all');
  const [filterScreenSize, setFilterScreenSize] = useState('all');
  const [filterReleaseDate, setFilterReleaseDate] = useState('all');

  // Sync countryCode
  useEffect(() => {
    localStorage.setItem('techcircle_country', countryCode);
  }, [countryCode]);

  const [globalSearch, setGlobalSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('techcircle_darkmode');
    return saved === 'true' || saved === null; // Default to dark mode for premium look
  });

  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [highlightedNewsId, setHighlightedNewsId] = useState<string | null>(null);

  // Sync to local storage on changes
  useEffect(() => {
    localStorage.setItem('techcircle_devices', JSON.stringify(devices));
  }, [devices]);

  useEffect(() => {
    localStorage.setItem('techcircle_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('techcircle_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('techcircle_darkmode', String(darkMode));
  }, [darkMode]);

  // Handle Incremental Custom User Reviews
  const handleAddNewReview = (deviceId: string, submitted: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...submitted,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };

    setDevices((prevDevices) =>
      prevDevices.map((device) => {
        if (device.id === deviceId) {
          const freshReviews = [newReview, ...device.reviews];
          // Recalculate average score
          const sum = freshReviews.reduce((acc, cr) => acc + cr.rating, 0);
          const newAvgRating = parseFloat((sum / freshReviews.length).toFixed(1));

          const updated = {
            ...device,
            reviews: freshReviews,
            overallRating: newAvgRating,
          };

          // Also update selected device to reflect reviews instantly in active detail sheet
          if (selectedDevice?.id === deviceId) {
            setSelectedDevice(updated);
          }
          return updated;
        }
        return device;
      })
    );
  };

  // Like news and rumours
  const handleLikeArticle = (articleId: string) => {
    setArticles((prev) =>
      prev.map((el) => {
        if (el.id === articleId) {
          const updated = { ...el, likes: el.likes + 1 };
          return updated;
        }
        return el;
      })
    );
  };

  // Bridge notification links directly to devices or news
  const handleNavigateToNews = (newsId: string) => {
    setHighlightedNewsId(newsId);
    setActiveTab('dashboard');
    // Find article contents
    const art = articles.find((a) => a.id === newsId);
    if (art) {
      // Just visually highlight or trigger a nice toast
    }
  };

  const handleNavigateToDevice = (deviceId: string) => {
    const found = devices.find((d) => d.id === deviceId);
    if (found) {
      setSelectedDevice(found);
    }
  };

  // Universal Search Filters
  const searchResultsDevices = globalSearch.trim()
    ? devices.filter(
        (d) =>
          d.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
          d.brand.toLowerCase().includes(globalSearch.toLowerCase())
      )
    : [];

  const searchResultsNews = globalSearch.trim()
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(globalSearch.toLowerCase()) ||
          a.summary.toLowerCase().includes(globalSearch.toLowerCase())
      )
    : [];

  const totalResultsCount = searchResultsDevices.length + searchResultsNews.length;

  // Real-time device spec filtering routine
  const extractNumericPrice = (pStr: string): number => {
    const clean = pStr.replace(/,/g, '').match(/\d+/);
    return clean ? parseInt(clean[0]) : 0;
  };

  const filteredDevices = devices.filter((device) => {
    // 1. Brand match
    if (filterBrand !== 'all' && device.brand.toLowerCase() !== filterBrand.toLowerCase()) {
      return false;
    }

    // 2. Original USD scale pricing matching
    const usdPrice = extractNumericPrice(device.price);
    if (filterPrice === 'under300') {
      if (usdPrice > 300) return false;
    } else if (filterPrice === '300to600') {
      if (usdPrice <= 300 || usdPrice > 600) return false;
    } else if (filterPrice === 'over600') {
      if (usdPrice <= 600) return false;
    }

    // 3. Camera Sensor megapixels
    const mainCamStr = device.specs.camera.main;
    const camMatch = mainCamStr ? mainCamStr.match(/(\d+)\s*MP/i) : null;
    const camMp = camMatch ? parseInt(camMatch[1]) : 0;
    if (filterCamera === '48mp' && camMp < 48) return false;
    if (filterCamera === '100mp' && camMp < 100) return false;

    // 4. Battery energy cells
    const capacityVal = parseInt(device.specs.battery.capacity.replace(/[^0-9]/g, '')) || 0;
    if (filterBattery === '4500' && capacityVal < 4500) return false;
    if (filterBattery === '5000' && capacityVal < 5000) return false;

    // 5. Physical screen standard
    const screenFloat = parseFloat(device.specs.display.size) || 0;
    if (filterScreenSize === 'under6.5' && screenFloat >= 6.5) return false;
    if (filterScreenSize === '6.5to6.7' && (screenFloat < 6.5 || screenFloat > 6.7)) return false;
    if (filterScreenSize === 'over6.7' && screenFloat <= 6.7) return false;

    // 6. Launch date logs (Virtual Time context: June 13, 2026)
    if (filterReleaseDate !== 'all' && device.releaseDate) {
      const devDate = new Date(device.releaseDate).getTime();
      const refDate3M = new Date('2026-03-13').getTime(); // Last 3 Months
      const refDate1Y = new Date('2025-06-13').getTime(); // Last Year
      if (filterReleaseDate === '3months' && devDate < refDate3M) return false;
      if (filterReleaseDate === '1year' && devDate < refDate1Y) return false;
    }

    return true;
  });

  return (
    <div className={darkMode ? 'dark min-h-screen bg-brand-bg text-slate-200 font-sans' : 'min-h-screen bg-slate-50 text-slate-900 font-sans'}>
      
      {/* 1. APP BAR HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-brand-panel/95 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand Brand */}
          <div
            onClick={() => {
              setActiveTab('dashboard');
              setGlobalSearch('');
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="p-2 bg-gradient-to-tr from-blue-650 to-blue-500 rounded-xl relative overflow-hidden group-hover:scale-105 transition-transform duration-250">
              <CircleDot className="h-5 w-5 text-white animate-spin-slow" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm md:text-base tracking-tight leading-none text-slate-900 dark:text-white uppercase">
                Tech <span className="bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">Circle</span>
              </h1>
              <span className="text-[9px] font-bold text-slate-400 tracking-wider block mt-0.5">PRICE & SPECS MATRIX</span>
            </div>
          </div>

          {/* Interactive Universal Search Bar */}
          <div className="hidden md:block relative max-w-md w-full mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search phones, rumors, specs, or reviews..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full text-xs pl-10 pr-10 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-brand-input text-slate-850 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-sm transition-all"
              />
              {globalSearch && (
                <button
                  onClick={() => setGlobalSearch('')}
                  className="absolute right-3 top-2 text-[10px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Floating Search Results Dropdown overlay */}
            <AnimatePresence>
              {globalSearch && isSearchFocused && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsSearchFocused(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-full max-w-sm bg-white dark:bg-brand-panel border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800"
                  >
                    <div className="p-3 bg-slate-50 dark:bg-brand-bg text-[10px] font-bold text-slate-400 flex justify-between uppercase">
                      <span>Matches Found ({totalResultsCount})</span>
                      <button onClick={() => setGlobalSearch('')} className="hover:underline">Clear Search</button>
                    </div>

                    <div className="p-2 max-h-72 overflow-y-auto space-y-2">
                      {/* Devices matched */}
                      {searchResultsDevices.length > 0 && (
                        <div>
                          <span className="text-[9px] uppercase font-extrabold text-blue-500 px-2 block mb-1">Devices Specs</span>
                          {searchResultsDevices.map((d) => (
                            <div
                              key={d.id}
                              onClick={() => {
                                setSelectedDevice(d);
                                setGlobalSearch('');
                              }}
                              className="p-2 hover:bg-slate-50 dark:hover:bg-brand-card/40 rounded-lg cursor-pointer flex items-center justify-between text-left transition-colors"
                            >
                              <div>
                                <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">{d.name}</h4>
                                <p className="text-[10px] text-slate-400 leading-none mt-0.5">{d.brand} &middot; {d.price}</p>
                              </div>
                              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-brand-input px-1.5 py-0.5 rounded">
                                View Specs
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* News matches */}
                      {searchResultsNews.length > 0 && (
                        <div className="pt-2">
                          <span className="text-[9px] uppercase font-extrabold text-amber-500 px-2 block mb-1">Rumors & Reports</span>
                          {searchResultsNews.map((a) => (
                            <div
                              key={a.id}
                              onClick={() => {
                                setGlobalSearch('');
                                handleNavigateToNews(a.id);
                              }}
                              className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg cursor-pointer text-left transition-colors"
                            >
                              <h4 className="font-semibold text-xs text-slate-900 dark:text-white leading-snug line-clamp-1">{a.title}</h4>
                              <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wide">{a.category} &middot; {a.readTime}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {totalResultsCount === 0 && (
                        <p className="p-4 text-center text-xs text-slate-450 dark:text-slate-505">
                          No matching hardware or reviews found.
                        </p>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Action buttons drawer: Push Simulator + Notifications + Dark Mode Toggle */}
          <div className="flex items-center gap-2 md:gap-4.5">
            {/* Real-time push center */}
            <NotificationCenter
              notifications={notifications}
              setNotifications={setNotifications}
              onNavigateToNews={handleNavigateToNews}
              onNavigateToDevice={handleNavigateToDevice}
            />

            {/* Country Selector for Region Pricing */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-brand-input rounded-xl border border-slate-200/80 dark:border-slate-800/80 px-2 py-1 shadow-sm">
              <span className="text-[9px] font-bold text-slate-400 uppercase hidden sm:inline mr-0.5 ml-1">Region</span>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value as any)}
                className="text-[11px] font-black bg-transparent text-slate-800 dark:text-slate-250 border-none outline-none cursor-pointer focus:ring-0 select-none p-1"
                title="Select pricing region country"
                id="country-pricing-dropdown"
              >
                <option value="US" className="dark:bg-brand-panel dark:text-white">🇺🇸 USD ($)</option>
                <option value="UK" className="dark:bg-brand-panel dark:text-white">🇬🇧 GBP (£)</option>
                <option value="EU" className="dark:bg-brand-panel dark:text-white">🇪🇺 EUR (€)</option>
                <option value="IN" className="dark:bg-brand-panel dark:text-white">🇮🇳 INR (₹)</option>
                <option value="CA" className="dark:bg-brand-panel dark:text-white">🇨🇦 CAD (C$)</option>
              </select>
            </div>

            {/* Crisp Dark Mode Switch */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer"
              id="theme-toggler"
            >
              {darkMode ? <Sun className="h-5.5 w-5.5 text-amber-400" /> : <Moon className="h-5.5 w-5.5 text-blue-600" />}
            </button>
          </div>

        </div>
      </header>

      {/* 2. MAIN SUB NAVIGATION NAVIGATION TABS */}
      <nav className="bg-slate-100/50 dark:bg-brand-panel/45 border-b border-slate-200/50 dark:border-slate-800/80 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1.5 py-3 overflow-x-auto">
            
            {/* TAB: DASHBOARD */}
            <button
              id="nav-dashboard"
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0 ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 dark:bg-blue-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-250 hover:bg-slate-100 dark:hover:bg-brand-card'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Newsroom Feed</span>
            </button>

            {/* TAB: DEVICES SPEC INDEX */}
            <button
              id="nav-devices"
              onClick={() => setActiveTab('devices')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0 ${
                activeTab === 'devices'
                  ? 'bg-blue-600 dark:bg-blue-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-250 hover:bg-slate-100 dark:hover:bg-brand-card'
              }`}
            >
              <Smartphone className="h-4 w-4" />
              <span>Spec Sheets & Reviews</span>
            </button>

            {/* TAB: MATRIX COMPARATOR */}
            <button
              id="nav-compare"
              onClick={() => setActiveTab('compare')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0 ${
                activeTab === 'compare'
                  ? 'bg-blue-600 dark:bg-blue-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-250 hover:bg-slate-100 dark:hover:bg-brand-card'
              }`}
            >
              <Scale className="h-4 w-4" />
              <span>Phone Compare Tool</span>
            </button>

            {/* TAB: RUMOURS RADAR */}
            <button
              id="nav-rumours"
              onClick={() => setActiveTab('rumours')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0 ${
                activeTab === 'rumours'
                  ? 'bg-blue-600 dark:bg-blue-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-250 hover:bg-slate-100 dark:hover:bg-brand-card'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Confidence Leak Radar</span>
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile search bar block */}
      <div className="block md:hidden p-3 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search news, specs, or reviews..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white"
          />
          {globalSearch && (
            <button onClick={() => setGlobalSearch('')} className="absolute right-3 top-2 text-[10px] text-slate-450 uppercase font-black">Clear</button>
          )}
        </div>
        {/* Mobile results list overlay */}
        {globalSearch && (
          <div className="mt-2 bg-slate-50 dark:bg-slate-950 p-2 rounded-xl max-h-56 overflow-y-auto border border-slate-200 dark:border-slate-800 text-left">
            <span className="text-[9px] uppercase font-bold text-slate-400 block px-1">Universal Matches:</span>
            {searchResultsDevices.map((d) => (
              <div
                key={d.id}
                onClick={() => {
                  setSelectedDevice(d);
                  setGlobalSearch('');
                }}
                className="p-2 hover:bg-white dark:hover:bg-slate-900 rounded-lg text-xs font-semibold cursor-pointer text-slate-800 dark:text-slate-200 mt-1 flex justify-between border border-transparent dark:border-slate-900"
              >
                <span>{d.name} ({d.brand})</span>
                <span className="text-blue-500 block">Spec Matrix</span>
              </div>
            ))}
            {searchResultsNews.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  handleNavigateToNews(n.id);
                  setGlobalSearch('');
                }}
                className="p-2 hover:bg-white dark:hover:bg-slate-900 rounded-lg text-xs cursor-pointer text-slate-800 dark:text-slate-200 mt-1 flex justify-between border border-transparent dark:border-slate-900"
              >
                <span className="line-clamp-1">{n.title}</span>
                <span className="text-amber-500 block shrink-0">{n.category}</span>
              </div>
            ))}
            {totalResultsCount === 0 && <p className="p-3 text-[11px] text-slate-450 text-center">No search matches found.</p>}
          </div>
        )}
      </div>

      {/* 3. SHEETS BODY CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: NEWSROOM FEED / DASHBOARD */}
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
              className="space-y-8 text-left"
            >
              {/* Hero Banner Feature */}
              <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-900 to-indigo-950 text-white border border-slate-800 relative overflow-hidden shadow-2xl flex flex-col md:flex-row gap-6 items-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_45%)]" />
                
                <div className="flex-1 relative z-10 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold bg-blue-600 px-2 py-0.5 rounded leading-none">
                      Industry Highlight
                    </span>
                    <span className="text-xs text-slate-300 font-bold">&middot; 5 mins ago</span>
                  </div>
                  <h2 className="text-2xl md:text-3.5xl font-black tracking-tight leading-tight">
                    Apple Silicon A19 Shift: 5.1mm Target Chassis Thickness Mandated For Slim Line
                  </h2>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">
                    Exclusive internal blueprints leak Cupertino's final CAD templates. The upcoming premium iPhone Slim replaces heavy carbon coils with high-density pre-bent alloys, but splits cameras down to a single lens.
                  </p>
                  
                  <div className="pt-2">
                    <button
                      onClick={() => handleNavigateToNews('news-1')}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-xs font-bold rounded-xl shadow-lg transition-all hover:translate-x-0.5 inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      Read leak report <ArrowRight className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>

                {/* Simulated Spec Gauge Widget */}
                <div className="w-full md:w-72 bg-slate-950/40 p-5 rounded-2xl border border-white/5 relative z-10 backdrop-blur-sm shadow-inner self-stretch flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-black text-slate-400 block">Spec Spotlight</span>
                    <h4 className="font-bold text-sm text-amber-400 mt-1">iPhone 17 Slim (Air)</h4>
                    <p className="text-[10px] text-slate-300 mt-1 lines-clamp-3">CAD drawings show Apple dropping depth indicators to just 5.1mm height threshold.</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 text-slate-300">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span>Leaker Confidence:</span>
                      <span className="text-emerald-400">85% Certitude</span>
                    </div>
                    {/* Progress slider bar */}
                    <div className="h-1.5 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feed Grid header */}
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Tech Circle Newsroom</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Explore price rumors, leaks, launch logs, and verified comments.</p>
                  </div>
                  {/* Total counter */}
                  <span className="text-xs font-bold bg-slate-100 dark:bg-slate-900 p-2 rounded-xl text-slate-500">
                    📚 {articles.length} Reports
                  </span>
                </div>

                {/* News Feed core */}
                <div className="mt-6">
                  <NewsFeed
                    articles={articles}
                    onLikeArticle={handleLikeArticle}
                    onNavigateToDevice={handleNavigateToDevice}
                  />
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: DEVICES DISPLAY INDEX */}
          {activeTab === 'devices' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
              className="space-y-6 text-left"
              id="devices-specs-index"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Tech Circle Spectrum Index</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Explore physical spec dimensions. Price estimates automatically convert across 5 major global currencies.</p>
                </div>
                {/* Visual filter summary */}
                <span className="text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-amber-400 px-3.5 py-1.5 rounded-xl border border-blue-500/10 shrink-0">
                  ⚡ Found {filteredDevices.length} matched models
                </span>
              </div>

              {/* Advanced Filtering Panel */}
              <div className="p-5 bg-slate-100/55 dark:bg-brand-panel/90 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Search className="h-3.5 w-3.5 text-blue-500" /> Advanced Spec Query Matrix
                  </span>
                  
                  {(filterBrand !== 'all' || filterPrice !== 'all' || filterCamera !== 'all' || filterBattery !== 'all' || filterScreenSize !== 'all' || filterReleaseDate !== 'all') && (
                    <button
                      onClick={() => {
                        setFilterBrand('all');
                        setFilterPrice('all');
                        setFilterCamera('all');
                        setFilterBattery('all');
                        setFilterScreenSize('all');
                        setFilterReleaseDate('all');
                      }}
                      className="text-[10px] font-black text-red-500 hover:text-red-700 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  
                  {/* BRAND */}
                  <div className="space-y-1">
                    <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Manufacturer</label>
                    <select
                      value={filterBrand}
                      onChange={(e) => setFilterBrand(e.target.value)}
                      className="w-full text-[11px] font-bold py-2 px-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-brand-input text-slate-800 dark:text-slate-250 cursor-pointer focus:outline-none"
                    >
                      <option value="all">All Brands</option>
                      <option value="Apple">Apple</option>
                      <option value="Samsung">Samsung</option>
                      <option value="Google">Google</option>
                      <option value="OnePlus">OnePlus</option>
                    </select>
                  </div>

                  {/* PRICE RANGE */}
                  <div className="space-y-1">
                    <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">MSRP Class (USD)</label>
                    <select
                      value={filterPrice}
                      onChange={(e) => setFilterPrice(e.target.value)}
                      className="w-full text-[11px] font-bold py-2 px-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-brand-input text-slate-800 dark:text-slate-250 cursor-pointer focus:outline-none"
                    >
                      <option value="all">Any Price</option>
                      <option value="under300">Under $300</option>
                      <option value="300to600">$300 - $600</option>
                      <option value="over600">Over $600</option>
                    </select>
                  </div>

                  {/* CAMERA */}
                  <div className="space-y-1">
                    <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Camera Sensor</label>
                    <select
                      value={filterCamera}
                      onChange={(e) => setFilterCamera(e.target.value)}
                      className="w-full text-[11px] font-bold py-2 px-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-brand-input text-slate-800 dark:text-slate-250 cursor-pointer focus:outline-none"
                    >
                      <option value="all">Any Resolution</option>
                      <option value="48mp">Min 48 Megapixels</option>
                      <option value="100mp">Min 100 Megapixels</option>
                    </select>
                  </div>

                  {/* BATTERY */}
                  <div className="space-y-1">
                    <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Battery Power</label>
                    <select
                      value={filterBattery}
                      onChange={(e) => setFilterBattery(e.target.value)}
                      className="w-full text-[11px] font-bold py-2 px-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-brand-input text-slate-800 dark:text-slate-250 cursor-pointer focus:outline-none"
                    >
                      <option value="all">Any Capacity</option>
                      <option value="4500">dense (&ge;4,500 mAh)</option>
                      <option value="5000">Extreme (&ge;5,000 mAh)</option>
                    </select>
                  </div>

                  {/* SCREEN SIZE */}
                  <div className="space-y-1">
                    <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Physical Screen</label>
                    <select
                      value={filterScreenSize}
                      onChange={(e) => setFilterScreenSize(e.target.value)}
                      className="w-full text-[11px] font-bold py-2 px-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-brand-input text-slate-800 dark:text-slate-250 cursor-pointer focus:outline-none"
                    >
                      <option value="all">Any Sizing</option>
                      <option value="under6.5">Compact (&lt;6.5")</option>
                      <option value="6.5to6.7">Medium (6.5" - 6.7")</option>
                      <option value="over6.7">Cinematic (&gt;6.7")</option>
                    </select>
                  </div>

                  {/* LAUNCH RECENCY */}
                  <div className="space-y-1">
                    <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Manufacturer Era</label>
                    <select
                      value={filterReleaseDate}
                      onChange={(e) => setFilterReleaseDate(e.target.value)}
                      className="w-full text-[11px] font-bold py-2 px-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-brand-input text-slate-800 dark:text-slate-250 cursor-pointer focus:outline-none"
                    >
                      <option value="all">All Launch Eras</option>
                      <option value="3months">Within Last 3 Months</option>
                      <option value="1year">Within Last Year</option>
                    </select>
                  </div>

                </div>

                {/* Active filter pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px]">
                  <span className="text-slate-400 font-bold uppercase">Active Constraints:</span>
                  {filterBrand === 'all' && filterPrice === 'all' && filterCamera === 'all' && filterBattery === 'all' && filterScreenSize === 'all' && filterReleaseDate === 'all' ? (
                    <span className="text-slate-440 dark:text-slate-500 font-semibold italic">Unrestricted Matrix</span>
                  ) : (
                    <>
                      {filterBrand !== 'all' && (
                        <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg font-bold">Brand: {filterBrand}</span>
                      )}
                      {filterPrice !== 'all' && (
                        <span className="px-2 py-0.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg font-bold">Price Range: {filterPrice === 'under300' ? '< $300' : filterPrice === '300to600' ? '$300-$600' : '> $600'}</span>
                      )}
                      {filterCamera !== 'all' && (
                        <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg font-bold">Camera: {filterCamera === '48mp' ? '>= 48MP' : '>= 100MP'}</span>
                      )}
                      {filterBattery !== 'all' && (
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg font-bold">Battery: {filterBattery === '4500' ? '>= 4.5Ah' : '>= 5.0Ah'}</span>
                      )}
                      {filterScreenSize !== 'all' && (
                        <span className="px-2 py-0.5 bg-pink-500/10 text-pink-650 rounded-lg font-bold">Size: {filterScreenSize}</span>
                      )}
                      {filterReleaseDate !== 'all' && (
                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg font-bold">Launched: {filterReleaseDate === '3months' ? '3m' : '1y'}</span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Devices grid */}
              {filteredDevices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDevices.map((device) => {
                    return (
                      <div
                        key={device.id}
                        className="group relative flex flex-col justify-between p-6 bg-white dark:bg-brand-card border border-slate-200/80 dark:border-slate-800/80 shadow-sm rounded-3xl hover:shadow-2xl hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden"
                      >
                        {/* Brand color band header */}
                        <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${device.iconGradient}`} />

                        <div>
                          {/* Meta status info */}
                          <div className="flex items-center justify-between gap-2 mb-4">
                            <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
                              {device.brand}
                            </span>
                            
                            {device.marketStatus === 'Rumoured' ? (
                              <span className="text-[9px] font-extrabold uppercase bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded border border-red-500/20">
                                Rumour Peak ({device.rumourConfidence}%)
                              </span>
                            ) : device.marketStatus === 'Pre-order' ? (
                              <span className="text-[9px] font-extrabold uppercase bg-yellow-500/10 text-yellow-600 dark:text-amber-400 px-2 py-0.5 rounded border border-yellow-500/20">
                                Pre-order Reserve
                              </span>
                            ) : (
                              <span className="text-[9px] font-extrabold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                                Now Retail
                              </span>
                            )}
                          </div>

                          {/* Name and pricing */}
                          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors">
                            {device.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-black text-slate-800 dark:text-slate-100">
                              {formatPriceByCountry(device.price, countryCode)}
                            </span>
                            {device.marketStatus === 'Rumoured' && (
                              <span className="text-[10px] text-slate-400 font-medium">Predicted MSRP</span>
                            )}
                          </div>

                          {/* Quick highlights spec list */}
                          <div className="mt-5 space-y-2 text-xs">
                            <div className="flex items-center text-slate-500 dark:text-slate-400">
                              <span className="font-semibold w-20 shrink-0 text-slate-400 mr-2 uppercase text-[9px] tracking-wider">Screen</span>
                              <span className="line-clamp-1">{device.specs.display.size} &middot; {device.specs.display.tech.split(',')[0]}</span>
                            </div>
                            <div className="flex items-center text-slate-500 dark:text-slate-400">
                              <span className="font-semibold w-20 shrink-0 text-slate-400 mr-2 uppercase text-[9px] tracking-wider">Silicon</span>
                              <span className="line-clamp-1">{device.specs.performance.chipset}</span>
                            </div>
                            <div className="flex items-center text-slate-500 dark:text-slate-400">
                              <span className="font-semibold w-20 shrink-0 text-slate-400 mr-2 uppercase text-[9px] tracking-wider">Battery</span>
                              <span className="line-clamp-1">{device.specs.battery.capacity} ({device.specs.battery.charging.split(' ')[0]})</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive block ratings and button */}
                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
                          <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                            <span className="text-slate-700 dark:text-slate-300">{device.overallRating}</span>
                            <span className="text-[10px] text-slate-400">({device.reviews.length} reviews)</span>
                          </div>

                          <button
                            onClick={() => setSelectedDevice(device)}
                            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-slate-100 dark:text-slate-950 text-xs font-bold rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer flex items-center gap-1"
                          >
                            Specs & reviews <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center p-12 bg-slate-100 dark:bg-brand-panel/40 border border-slate-250 dark:border-slate-800 rounded-3xl space-y-4">
                  <p className="text-sm font-semibold text-slate-500">
                    No high-fidelity details found matching this spec constraint array.
                  </p>
                  <button
                    onClick={() => {
                      setFilterBrand('all');
                      setFilterPrice('all');
                      setFilterCamera('all');
                      setFilterBattery('all');
                      setFilterScreenSize('all');
                      setFilterReleaseDate('all');
                    }}
                    className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 cursor-pointer transition-all active:scale-95"
                  >
                    Reset Query Parameters
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: MATRIX DEVICE COMPARER */}
          {activeTab === 'compare' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
              className="space-y-6 text-left"
            >
              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Side-by-Side Comparison Matrix</h2>
                <p className="text-xs text-slate-500 mt-0.5">Place flagship phones and rumors dynamically to analyze specifications weight difference.</p>
              </div>

              {/* Core comparer */}
              <DeviceComparer
                devices={devices}
                countryCode={countryCode}
                onViewDeviceDetails={(id) => {
                  const d = devices.find((x) => x.id === id);
                  if (d) setSelectedDevice(d);
                }}
              />
            </motion.div>
          )}

          {/* TAB 4: RUMOURS & PRICE ANALYSIS INDEX */}
          {activeTab === 'rumours' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
              className="space-y-8 text-left"
            >
              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Tech Circle Leak Radar</h2>
                <p className="text-xs text-slate-500 mt-0.5">Predicted manufacturer margins, expected release dates, and supply chain confidence indicators.</p>
              </div>

              {/* Rumors analysis layout cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Leak indicators column */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Thermometer scale visualization */}
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Flame className="h-5 w-5 text-orange-500 animate-pulse" />
                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Flagship Price Rumour Temperature</h3>
                      </div>
                      <span className="text-[10px] font-bold bg-orange-550/15 text-orange-650 dark:text-orange-400 border border-orange-500/10 px-2 py-0.5 rounded uppercase">
                        Active Index
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-normal">
                      Historical inflation and hardware additions like customized LPDDR6 modules indicate minor MSRP shifts for upcoming devices. Click below to adjust reviews!
                    </p>

                    {/* Custom Gauge progress thermometer */}
                    <div className="space-y-4 pt-2">
                      {devices
                        .filter((d) => d.marketStatus === 'Rumoured')
                        .map((rd) => {
                          return (
                            <div
                              key={rd.id}
                              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                            >
                              <div>
                                <h4 className="font-extrabold text-xs text-slate-850 dark:text-slate-100">{rd.name}</h4>
                                <span className="text-[10px] text-slate-450 mt-0.5 inline-block">Estimated Price: <strong>{rd.price}</strong> &middot; Launching: {rd.expectedLaunch}</span>
                              </div>

                              <div className="w-full sm:w-44 space-y-1">
                                <div className="flex justify-between text-[11px] font-bold">
                                  <span className="text-slate-400">Confidence Score</span>
                                  <span className={rd.rumourConfidence && rd.rumourConfidence > 90 ? 'text-emerald-500 font-extrabold' : 'text-amber-500'}>
                                    {rd.rumourConfidence}% Certitude
                                  </span>
                                </div>
                                {/* Bar */}
                                <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      rd.rumourConfidence && rd.rumourConfidence > 90 ? 'bg-emerald-500' : 'bg-amber-500'
                                    }`}
                                    style={{ width: `${rd.rumourConfidence}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Pricing prediction report */}
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
                    <h3 className="font-black text-sm text-slate-900 dark:text-white">Why are phone prices shifting?</h3>
                    <div className="prose prose-slate dark:prose-invert text-xs leading-relaxed text-slate-500 dark:text-slate-400 space-y-4">
                      <p>
                        A typical flagship bill-of-materials (BOM) has inflated by approximately <strong>$60 to $85</strong> over the last two fiscal quarters. This hike is fueled by two primary technical components:
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <div className="p-3 bg-red-400/5 border border-red-500/10 rounded-xl space-y-1">
                          <span className="font-bold text-red-600 dark:text-red-400 block uppercase text-[10px]">3nm Foundry Premium</span>
                          <p className="text-[11px] leading-relaxed">TSMC packaging and customized wafer baking for Apple A19 and Snapdragon 8 Elite processors are 15% more expensive than Gen 3 architectures.</p>
                        </div>
                        <div className="p-3 bg-blue-400/5 border border-blue-500/10 rounded-xl space-y-1">
                          <span className="font-bold text-blue-600 dark:text-blue-400 block uppercase text-[10px]">16GB RAM Standarization</span>
                          <p className="text-[11px] leading-relaxed">To parse local Gemini Nano and Siri LLM calls directly on the system chassis, manufacturers are mandating ultra-performance memory blocks.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Sidebar index list */}
                <div className="space-y-6">
                  
                  {/* Launch tracker countdown alerts */}
                  <div className="p-5 bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl border border-indigo-900/60 shadow-lg space-y-4">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-300" />
                      <h4 className="font-black text-xs uppercase text-slate-350 tracking-wider">Manufacturer Pipeline Tracker</h4>
                    </div>

                    <div className="divide-y divide-white/10 space-y-3.5 text-xs">
                      <div className="pt-3 first:pt-0">
                        <span className="text-[10px] uppercase font-bold text-slate-400">July 2026</span>
                        <h5 className="font-bold text-slate-100 mt-1">OnePlus 13 Launch Announcement</h5>
                        <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">Expected debut of Snapdragon 9 Gen 1 chip alongside silicon-carbon Glacier charging cell.</p>
                      </div>

                      <div className="pt-3">
                        <span className="text-[10px] uppercase font-bold text-slate-400">August 2026</span>
                        <h5 className="font-bold text-slate-100 mt-1">Google Pixel 10 TSMC Tensor Reveal</h5>
                        <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">Custom Tensor G5 manufactured completely outside Samsung Fab lines on TSMC 3nm wafers.</p>
                      </div>

                      <div className="pt-3">
                        <span className="text-[10px] uppercase font-bold text-slate-400">September 2026</span>
                        <h5 className="font-bold text-slate-100 mt-1">Apple iPhone 17 (Air / Slim) Debut</h5>
                        <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">5.1mm ultra-thin luxury frame is expected to trigger secondary design-revival wave.</p>
                      </div>
                    </div>
                  </div>

                  {/* Help widget */}
                  <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm flex items-start gap-3">
                    <Info className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-850 dark:text-slate-100">Contribute pricing rumors</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Read leaks on the home tab, click any phone specs to submit a verified reader review, and adjust performance indicators in real time!
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 4. FOOTER CREDITS */}
      <footer className="mt-16 py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="p-1 px-1.5 font-extrabold bg-blue-600 rounded text-white text-[10px]">TC</span>
            <span className="font-bold text-slate-800 dark:text-slate-300">Tech Circle</span>
            <span>&middot; ASEnte &copy; 2026</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => {
                // Quick reset local storage back to defaults
                localStorage.clear();
                window.location.reload();
              }}
              className="text-blue-500 hover:underline inline-block cursor-pointer"
            >
              Reset Data to Defaults
            </button>
          </div>
        </div>
      </footer>

      {/* 5. FLOATING COMPREHENSIVE SPEC DETAIL WITH USER REVIEWS DRAWER MODAL */}
      <AnimatePresence>
        {selectedDevice && (
          <DeviceDetail
            device={selectedDevice}
            onAddReview={handleAddNewReview}
            countryCode={countryCode}
            onClose={() => setSelectedDevice(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
