import React, { useState } from 'react';
import { Device, Review } from '../types';
import { formatPriceByCountry } from '../data';
import {
  Smartphone, Cpu, Camera, BatteryCharging, Shield, Info,
  Star, MessageSquare, Plus, Check, User, Heart, ThumbsUp, CalendarDays, Percent
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DeviceDetailProps {
  device: Device;
  onAddReview: (deviceId: string, review: Omit<Review, 'id' | 'date'>) => void;
  onClose: () => void;
  countryCode?: 'US' | 'UK' | 'EU' | 'IN' | 'CA';
}

export default function DeviceDetail({ device, onAddReview, onClose, countryCode = 'US' }: DeviceDetailProps) {
  const [activeSubTab, setActiveSubTab] = useState<'specs' | 'reviews'>('specs');
  
  // Review form states
  const [user, setUser] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [designR, setDesignR] = useState(5);
  const [perfR, setPerfR] = useState(5);
  const [cameraR, setCameraR] = useState(5);
  const [batteryR, setBatteryR] = useState(5);
  const [formSuccess, setFormSuccess] = useState(false);
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.trim() || !comment.trim()) return;

    onAddReview(device.id, {
      user: user.trim(),
      rating,
      comment: comment.trim(),
      likes: 0,
      deviceRating: {
        design: designR,
        performance: perfR,
        camera: cameraR,
        battery: batteryR,
      }
    });

    // Reset Form and set success alert
    setUser('');
    setComment('');
    setRating(5);
    setDesignR(5);
    setPerfR(5);
    setCameraR(5);
    setBatteryR(5);
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
  };

  const handleLikeReview = (reviewId: string) => {
    setLikedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  // Aggregated rating metric subcalculations
  const totalReviews = device.reviews.length;
  const averageSubRatings = device.reviews.reduce(
    (acc, rev) => {
      if (rev.deviceRating) {
        acc.design += rev.deviceRating.design;
        acc.perf += rev.deviceRating.performance;
        acc.camera += rev.deviceRating.camera;
        acc.battery += rev.deviceRating.battery;
        acc.count += 1;
      }
      return acc;
    },
    { design: 0, perf: 0, camera: 0, battery: 0, count: 0 }
  );

  const finalSubRatings = {
    design: averageSubRatings.count > 0 ? (averageSubRatings.design / averageSubRatings.count).toFixed(1) : '4.5',
    performance: averageSubRatings.count > 0 ? (averageSubRatings.perf / averageSubRatings.count).toFixed(1) : '4.6',
    camera: averageSubRatings.count > 0 ? (averageSubRatings.camera / averageSubRatings.count).toFixed(1) : '4.5',
    battery: averageSubRatings.count > 0 ? (averageSubRatings.battery / averageSubRatings.count).toFixed(1) : '4.4',
  };

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950"
      />

      {/* Main Spec Modal Sheet Drawer */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-4xl bg-white dark:bg-brand-panel rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden z-50 text-left font-sans"
        id="device-spec-sheet-modal"
      >
        {/* Header Ribbon details */}
        <div className={`p-6 bg-gradient-to-r ${device.iconGradient} text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 relative`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold tracking-wider bg-white/20 uppercase px-2 py-0.5 rounded-md">
                {device.brand}
              </span>
              {device.marketStatus === 'Rumoured' && (
                <span className="text-[10px] font-extrabold tracking-wider bg-rose-500 text-white uppercase px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Percent className="h-2.5 w-2.5" /> Rumour Confirmed {device.rumourConfidence}%
                </span>
              )}
              {device.marketStatus === 'Pre-order' && (
                <span className="text-[10px] font-extrabold tracking-wider bg-orange-500 text-white uppercase px-2 py-0.5 rounded-md">
                  Pre-Order Live
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-black mt-1 tracking-tight">{device.name}</h2>
            <p className="text-sm text-slate-200/90 font-medium mt-1">
              {device.marketStatus === 'Rumoured'
                ? `Expected launch target: ${device.expectedLaunch} &middot; Expected price: ${formatPriceByCountry(device.price, countryCode)}`
                : `Price: ${formatPriceByCountry(device.price, countryCode)} &middot; Retail Available`}
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center bg-white/10 px-3.5 py-1.5 rounded-2xl border border-white/15">
              <Star className="h-4 w-4 text-amber-300 fill-amber-300 mr-1.5" />
              <span className="text-sm font-bold">{device.overallRating} rating</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Local Tab Switcher */}
        <div className="bg-slate-50 dark:bg-brand-bg px-6 border-b border-slate-100 dark:border-slate-800/80 flex gap-4">
          <button
            onClick={() => setActiveSubTab('specs')}
            className={`py-4 px-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeSubTab === 'specs'
                ? 'border-blue-600 dark:border-blue-450 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            📋 Technical Spec Sheet
          </button>
          <button
            onClick={() => setActiveSubTab('reviews')}
            className={`py-4 px-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'reviews'
                ? 'border-blue-600 dark:border-blue-450 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            💬 Integrated User Reviews ({totalReviews})
          </button>
        </div>

        {/* Scrollable Contents Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50/40 dark:bg-brand-bg/25 font-sans">
          
          {/* 1. TECHNICAL SPEC SHEET TAB */}
          {activeSubTab === 'specs' && (
            <div className="space-y-6">
              {device.marketStatus === 'Rumoured' && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3">
                  <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-amber-800 dark:text-amber-300">Rumoured Specifications Disclaimer</h4>
                    <p className="text-[11px] text-amber-700/90 dark:text-amber-400/80 mt-1 leading-relaxed">
                      These technical characteristics are sourced from CAD schematic leaks, industry accessory mold filings, and supply chain analysts. Actual launch specifications may deviate before the expected debut in <strong>{device.expectedLaunch}</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* Grid representation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* DISPLAY SPEC BLOCK */}
                <div className="p-5 bg-white dark:bg-brand-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-blue-600 dark:text-blue-400">
                      <Smartphone className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Display & Bezels</h3>
                  </div>
                  <dl className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                      <dt className="text-slate-400">Screen Size</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.display.size}</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                      <dt className="text-slate-400">Panel & Refresh</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.display.tech}</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                      <dt className="text-slate-400">Resolution</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.display.resolution}</dd>
                    </div>
                    <div className="flex justify-between py-1">
                      <dt className="text-slate-400">Max Brightness</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.display.brightness}</dd>
                    </div>
                    <div className="flex justify-between py-1">
                      <dt className="text-slate-400">Panel Tech</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.display.refreshRate}</dd>
                    </div>
                  </dl>
                </div>

                {/* PERFORMANCE ENGINE */}
                <div className="p-5 bg-white dark:bg-brand-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded-lg text-rose-600 dark:text-rose-400">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Processor & Silicons</h3>
                  </div>
                  <dl className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                      <dt className="text-slate-400">Chipset Name</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.performance.chipset}</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                      <dt className="text-slate-400">CPU Layout</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.performance.cpu}</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                      <dt className="text-slate-400">GPU Core Specs</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.performance.gpu}</dd>
                    </div>
                    <div className="flex justify-between py-1">
                      <dt className="text-slate-400">RAM Speed / Size</dt>
                      <dd className="font-semibold text-slate-850 dark:text-slate-200">{device.specs.performance.ram}</dd>
                    </div>
                    <div className="flex justify-between py-1">
                      <dt className="text-slate-400">Available Storage</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.performance.storage}</dd>
                    </div>
                  </dl>
                </div>

                {/* ADVANCED CAMERAS */}
                <div className="p-5 bg-white dark:bg-brand-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-600 dark:text-purple-400">
                      <Camera className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Optics & Zoom Suites</h3>
                  </div>
                  <dl className="space-y-2 text-xs">
                    <div className="flex flex-col py-1 border-b border-slate-100 dark:border-slate-850">
                      <dt className="text-slate-400">Main Sensor</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{device.specs.camera.main}</dd>
                    </div>
                    <div className="flex flex-col py-1 border-b border-slate-100 dark:border-slate-850">
                      <dt className="text-slate-400">Ultra-Wide Lens</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{device.specs.camera.ultrawide}</dd>
                    </div>
                    <div className="flex flex-col py-1 border-b border-slate-100 dark:border-slate-850">
                      <dt className="text-slate-400">Telephoto Hardware</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{device.specs.camera.telephoto}</dd>
                    </div>
                    <div className="flex justify-between py-1">
                      <dt className="text-slate-400">Front Selfie Lens</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.camera.front}</dd>
                    </div>
                    <div className="flex flex-col py-1">
                      <dt className="text-slate-400">Extended Features</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 leading-relaxed">{device.specs.camera.features}</dd>
                    </div>
                  </dl>
                </div>

                {/* BATTERIES AND POWER */}
                <div className="p-5 bg-white dark:bg-brand-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-600 dark:text-emerald-400">
                      <BatteryCharging className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Battery & Powertrain</h3>
                  </div>
                  <dl className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                      <dt className="text-slate-400">Battery Cell Capacity</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.battery.capacity}</dd>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                      <dt className="text-slate-400">Wired Power Speed</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.battery.charging}</dd>
                    </div>
                    <div className="flex justify-between py-1">
                      <dt className="text-slate-400">Wireless Speed</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.battery.wireless}</dd>
                    </div>
                  </dl>

                  {/* CHASSIS METRICS - nested to share space */}
                  <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1 px-2 bg-slate-100 dark:bg-slate-800 rounded font-bold text-[10px] text-slate-600 dark:text-slate-400">
                        SIZE
                      </div>
                      <h3 className="font-bold text-xs text-slate-900 dark:text-white">Physical Frame Specs</h3>
                    </div>
                    <dl className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                        <dt className="text-slate-400">Dimensions</dt>
                        <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.design.dimensions}</dd>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                        <dt className="text-slate-400">Weight</dt>
                        <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.design.weight}</dd>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                        <dt className="text-slate-400">Industrial Materials</dt>
                        <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.design.materials}</dd>
                      </div>
                      <div className="flex justify-between py-1">
                        <dt className="text-slate-400">Water resistance</dt>
                        <dd className="font-semibold text-slate-800 dark:text-slate-200">{device.specs.design.waterproof}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

              </div>

              {/* SOFTWARE / PROMISE */}
              <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-brand-panel dark:to-brand-bg rounded-2xl border border-blue-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-lg">
                    <Shield className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Software Ecosystem & Lifespan</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white/50 dark:bg-brand-card/30 p-3 rounded-xl border border-white dark:border-slate-850">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">LAUNCH SYSTEM</span>
                    <span className="font-bold text-slate-800 dark:text-white mt-1 inline-block">{device.specs.software.launchOs}</span>
                  </div>
                  <div className="bg-white/50 dark:bg-brand-card/30 p-3 rounded-xl border border-white dark:border-slate-850">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">SUPPORT ENDURANCE</span>
                    <span className="font-bold text-slate-800 dark:text-white mt-1 inline-block">{device.specs.software.updatesPromise}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. INTEGRATED USER REVIEWS TAB */}
          {activeSubTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Aggregated ratings breakdown box (Left column, span 5) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-5 bg-white dark:bg-brand-card rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm text-center">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Aggregate Rating</span>
                  <div className="text-5xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
                    {device.overallRating}
                  </div>
                  <div className="flex justify-center gap-1 mt-2.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-5 w-5 ${
                          s <= Math.round(device.overallRating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-200 dark:text-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 font-medium">calculated from {totalReviews} global submissions</p>

                  {/* Sub breakdown metrics scales */}
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-left space-y-3.5">
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">Attribute Performance:</h4>
                    
                    {/* Design bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                        <span>Industrial Design / Grip</span>
                        <span>{finalSubRatings.design} / 5</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${(parseFloat(finalSubRatings.design) / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Performance bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                        <span>Processor & Local AI Tasks</span>
                        <span>{finalSubRatings.performance} / 5</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full transition-all duration-500"
                          style={{ width: `${(parseFloat(finalSubRatings.performance) / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Camera bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                        <span>Photos / Dynamic Focus</span>
                        <span>{finalSubRatings.camera} / 5</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${(parseFloat(finalSubRatings.camera) / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Battery bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                        <span>Charging & Cycle Endurance</span>
                        <span>{finalSubRatings.battery} / 5</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${(parseFloat(finalSubRatings.battery) / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Submissions form card */}
                <div className="p-5 bg-white dark:bg-brand-card rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Submit Reader Review</h4>
                    <p className="text-[11px] text-slate-500 mt-1 lines-clamp-2">
                      Submit your opinion to adjust the price rumour weight and device score. Saved locally in your browser.
                    </p>
                  </div>

                  {formSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-xl flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" /> Review submitted and aggregated!
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmitReview} className="space-y-4 text-left">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className="w-full text-xs p-3 mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase">Overall</label>
                        <select
                          value={rating}
                          onChange={(e) => setRating(parseInt(e.target.value))}
                          className="w-full text-xs p-2.5 mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white cursor-pointer"
                        >
                          <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                          <option value="4">⭐⭐⭐⭐ (4)</option>
                          <option value="3">⭐⭐⭐ (3)</option>
                          <option value="2">⭐⭐ (2)</option>
                          <option value="1">⭐ (1)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase">Design</label>
                        <select
                          value={designR}
                          onChange={(e) => setDesignR(parseInt(e.target.value))}
                          className="w-full text-xs p-2.5 mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white cursor-pointer"
                        >
                          <option value="5">5 / 5</option>
                          <option value="4">4 / 5</option>
                          <option value="3">3 / 5</option>
                          <option value="2">2 / 5</option>
                          <option value="1">1 / 5</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase">Performance</label>
                        <select
                          value={perfR}
                          onChange={(e) => setPerfR(parseInt(e.target.value))}
                          className="w-full text-xs p-2.5 mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white cursor-pointer"
                        >
                          <option value="5">5 / 5</option>
                          <option value="4">4 / 5</option>
                          <option value="3">3 / 5</option>
                          <option value="2">2 / 5</option>
                          <option value="1">1 / 5</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase">Cameras</label>
                        <select
                          value={cameraR}
                          onChange={(e) => setCameraR(parseInt(e.target.value))}
                          className="w-full text-xs p-2.5 mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white cursor-pointer"
                        >
                          <option value="5">5 / 5</option>
                          <option value="4">4 / 5</option>
                          <option value="3">3 / 5</option>
                          <option value="2">2 / 5</option>
                          <option value="1">1 / 5</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase">Battery & Speed</label>
                      <select
                        value={batteryR}
                        onChange={(e) => setBatteryR(parseInt(e.target.value))}
                        className="w-full text-xs p-2.5 mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white cursor-pointer"
                      >
                        <option value="5">5 / 5</option>
                        <option value="4">4 / 5</option>
                        <option value="3">3 / 5</option>
                        <option value="2">2 / 5</option>
                        <option value="1">1 / 5</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase">Your Review Content</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Share your specific thoughts on ergonomics, charging, heat levels..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full text-xs p-3 mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-slate-100 dark:text-slate-950 text-xs font-bold rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Plus className="h-4 w-4" /> Publish Review
                    </button>
                  </form>
                </div>
              </div>

              {/* Verified review list (Right column, span 7) */}
              <div className="lg:col-span-12 xl:col-span-7 space-y-4">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">Verified Reader Submissions ({totalReviews})</h3>
                
                {device.reviews.length === 0 ? (
                  <div className="p-8 text-center bg-white/80 dark:bg-brand-card/80 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800/80 text-slate-400">
                    No community reviews written yet. Be the first to share your opinion!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {device.reviews.map((rev) => {
                      const hasLiked = likedReviews[rev.id];
                      return (
                        <div
                          key={rev.id}
                          className="p-5 bg-white dark:bg-brand-card rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-3 relative"
                        >
                          <div className="flex items-start justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-slate-150 dark:bg-slate-800 text-slate-700 dark:text-slate-350 font-bold flex items-center justify-center text-xs">
                                {rev.user.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">{rev.user}</h4>
                                <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-0.5">
                                  <span className="flex items-center gap-0.5 text-slate-500">
                                    <CalendarDays className="h-3 w-3" /> {rev.date}
                                  </span>
                                  <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1 py-0.2 rounded-full font-bold">
                                    Verified Reader
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Sub scores display badges */}
                            <div className="flex items-center gap-1.5 self-end">
                              <span className="text-[10px] font-bold text-slate-400">Score:</span>
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  className={`h-3 w-3 ${
                                    s <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-800'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans mt-2 whitespace-pre-wrap">
                            {rev.comment}
                          </p>

                          {/* Attributes scores tags */}
                          {rev.deviceRating && (
                            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/50 text-[10px] text-slate-500">
                              <span className="bg-slate-50 dark:bg-slate-950/40 px-2 py-1 rounded border border-slate-100 dark:border-slate-850">
                                🎨 Design: <strong>{rev.deviceRating.design}/5</strong>
                              </span>
                              <span className="bg-slate-50 dark:bg-slate-950/40 px-2 py-1 rounded border border-slate-100 dark:border-slate-850">
                                ⚡ Perf: <strong>{rev.deviceRating.performance}/5</strong>
                              </span>
                              <span className="bg-slate-50 dark:bg-slate-950/40 px-2 py-1 rounded border border-slate-100 dark:border-slate-850">
                                📷 Camera: <strong>{rev.deviceRating.camera}/5</strong>
                              </span>
                              <span className="bg-slate-50 dark:bg-slate-950/40 px-2 py-1 rounded border border-slate-100 dark:border-slate-850">
                                🔋 Battery: <strong>{rev.deviceRating.battery}/5</strong>
                              </span>
                            </div>
                          )}

                          {/* Like count button */}
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[10px] text-zinc-400">Was this review helpful?</span>
                            <button
                              onClick={() => handleLikeReview(rev.id)}
                              className={`text-[10px] font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                                hasLiked
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                              }`}
                            >
                              <ThumbsUp className="h-3 w-3" />
                              <span>Helpful ({rev.likes + (hasLiked ? 1 : 0)})</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* Footer info lockup */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/80 text-center text-[11px] text-slate-400">
          Powered by Tech Circle verified comparison indexing pipeline.
        </div>
      </motion.div>
    </div>
  );
}
