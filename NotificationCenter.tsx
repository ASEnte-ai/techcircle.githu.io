import { Device, NewsArticle, TabNotification } from './types';

export const initialDevices: Device[] = [
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    price: '$1,199',
    marketStatus: 'Available',
    releaseDate: '2025-09-20',
    overallRating: 4.8,
    popularityScore: 98,
    iconGradient: 'from-[#1c1c1e] to-[#3a3a3c]',
    specs: {
      display: {
        size: '6.9 inches',
        tech: 'Super Retina XDR OLED, ProMotion 120Hz',
        refreshRate: '120Hz',
        resolution: '2868 x 1320 pixels (~460 ppi)',
        brightness: '2000 nits (HBM), 2600 nits (peak)',
      },
      performance: {
        chipset: 'Apple A18 Pro (3nm)',
        cpu: '6-core (2 performance, 4 efficiency)',
        gpu: '6-core Apple GPU (hardware ray tracing)',
        ram: '8GB LPDDR5X',
        storage: '256GB / 512GB / 1TB',
      },
      camera: {
        main: '48 MP, f/1.78, 24mm (second-gen sensor shift OIS)',
        ultrawide: '48 MP, f/2.2, 13mm (macro capability, hybrid focus)',
        telephoto: '12 MP, f/2.8, 120mm (5x optical zoom, tetraprism design)',
        front: '12 MP, f/1.9, TrueDepth with autofocus',
        features: '4K@120fps Dolby Vision, ProRes, Cinematic mode, Spatial Video',
      },
      battery: {
        capacity: '4,685 mAh',
        charging: '30W PD wired (50% in 30 mins)',
        wireless: '25W MagSafe (Qi2 compatible)',
      },
      design: {
        dimensions: '163.0 x 77.6 x 8.25 mm',
        weight: '227 grams',
        materials: 'Grade 5 Titanium frame, Ceramic Shield front, matte glass back',
        waterproof: 'IP68 (up to 6m for 30 mins)',
      },
      software: {
        launchOs: 'iOS 18',
        updatesPromise: '7 years of system and security updates',
      },
    },
    reviews: [
      {
        id: 'r1',
        user: 'Marcus Vance',
        rating: 5,
        comment: 'The 6.9-inch display is absolutely massive but the thinner bezels make it feel exactly like last year\'s model. The 4K@120fps video recording is incredibly smooth.',
        date: '2026-05-12',
        likes: 42,
        deviceRating: { design: 5, performance: 5, camera: 5, battery: 4 }
      },
      {
        id: 'r2',
        user: 'Sarah Jenkins',
        rating: 4,
        comment: 'Super fast, Camera Control button takes some getting used to. Sometimes Safari triggers it by mistake when resting my thumb. Battery life easily lasts 1.5 days of heavy usage.',
        date: '2026-06-01',
        likes: 19,
        deviceRating: { design: 4, performance: 5, camera: 4, battery: 5 }
      }
    ]
  },
  {
    id: 'iphone-17-slim',
    name: 'iPhone 17 Slim (Air)',
    brand: 'Apple',
    price: '$1,299 (Estimated)',
    marketStatus: 'Rumoured',
    expectedLaunch: 'September 2026',
    releaseDate: '2026-09-15',
    rumourConfidence: 85,
    overallRating: 4.5,
    popularityScore: 95,
    iconGradient: 'from-amber-500 to-rose-500',
    specs: {
      display: {
        size: '6.6 inches',
        tech: 'OLED Centered Dynamic Island, LTPO 120Hz',
        refreshRate: '120Hz',
        resolution: '2740 x 1260 pixels (~450 ppi)',
        brightness: '2400 nits (peak), Anti-reflective coating',
      },
      performance: {
        chipset: 'Apple A19 (3nm TSMC N3P)',
        cpu: '6-core CPU',
        gpu: '5-core Apple GPU',
        ram: '8GB LPDDR5X (Highly rumored)',
        storage: '128GB / 256GB',
      },
      camera: {
        main: '48 MP, f/1.8 (Single high-fidelity sensor)',
        ultrawide: 'Not present due to super thin design',
        telephoto: 'Digital crop only with high-res sensor',
        front: '24 MP, f/1.9, upgraded autofocus sensor',
        features: 'Ultra-thin module, spatial photo capture, enhanced software portraiture',
      },
      battery: {
        capacity: '3,100 mAh (Compromised for slimness)',
        charging: '25W wired standard',
        wireless: '15W MagSafe',
      },
      design: {
        dimensions: '160.0 x 74.5 x 5.1 mm (Incredibly ultra-thin)',
        weight: '165 grams',
        materials: 'Aluminium-Titanium alloy, Scratch-resistant glass back',
        waterproof: 'IP67 dust/water resistant',
      },
      software: {
        launchOs: 'iOS 19',
        updatesPromise: '7 years of updates',
      },
    },
    reviews: [
      {
        id: 'r3',
        user: 'Kyle T.',
        rating: 5,
        comment: 'If the 5.1mm rumor is true, this will completely redesign how we think about modern screen tech. I am willing to compromise on zoom cameras for a phone this thin!',
        date: '2026-05-20',
        likes: 124,
        deviceRating: { design: 5, performance: 4, camera: 3, battery: 3 }
      }
    ]
  },
  {
    id: 'galaxy-s24-ultra',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    price: '$1,299',
    marketStatus: 'Available',
    releaseDate: '2026-01-25',
    overallRating: 4.7,
    popularityScore: 92,
    iconGradient: 'from-[#2e3b4e] to-[#4b5563]',
    specs: {
      display: {
        size: '6.8 inches',
        tech: 'Dynamic AMOLED 2X, 120Hz, HDR10+, Gorilla Armor',
        refreshRate: '120Hz',
        resolution: '3120 x 1440 pixels (~505 ppi)',
        brightness: '2600 nits (peak), Extreme glare reduction',
      },
      performance: {
        chipset: 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
        cpu: '8-core (1x3.39GHz Cortex-X4 & 5x3.1GHz & 2x2.2GHz)',
        gpu: 'Adreno 750 (1 GHz)',
        ram: '12GB LPDDR5X',
        storage: '256GB / 512GB / 1TB',
      },
      camera: {
        main: '200 MP, f/1.7, OIS, Laser AF',
        ultrawide: '12 MP, f/2.2, 120˚ dual-pixel AF',
        telephoto: '50 MP (5x zoom, f/3.4, OIS) + 10 MP (3x zoom, f/2.4, OIS)',
        front: '12 MP, f/2.2, Dual Pixel PDAF',
        features: '100x Space Zoom, 8K video at 30fps, Astro-photography',
      },
      battery: {
        capacity: '5,000 mAh',
        charging: '45W PPS wired (65% in 30 mins)',
        wireless: '15W wireless (Fast Wireless Charging 2.0)',
      },
      design: {
        dimensions: '162.3 x 79.0 x 8.6 mm',
        weight: '232 grams',
        materials: 'Titanium frame, Gorilla Glass Armor front, Gorilla Glass back',
        waterproof: 'IP68 dust/water resistant (up to 1.5m for 30 mins)',
      },
      software: {
        launchOs: 'Android 14 (upgradable to Android 15, One UI 7)',
        updatesPromise: '7 years of OS upgrades and security patches',
      },
    },
    reviews: [
      {
        id: 'r4',
        user: 'David Miller',
        rating: 5,
        comment: 'The anti-reflective Gorilla Armor glass is the single best hardware upgrade on any phone in years. Absolute game changer under sunlight. Galaxy AI is genuinely useful for meeting notes.',
        date: '2026-04-18',
        likes: 56,
        deviceRating: { design: 5, performance: 5, camera: 5, battery: 5 }
      },
      {
        id: 'r5',
        user: 'Chun Song',
        rating: 4,
        comment: 'Amazing zoom and raw performance. My only complaint is its blocky, sharp corners which can dig into my palm after holding it for too long without a cover.',
        date: '2026-06-03',
        likes: 31,
        deviceRating: { design: 3, performance: 5, camera: 5, battery: 5 }
      }
    ]
  },
  {
    id: 'galaxy-s25-ultra',
    name: 'Galaxy S25 Ultra',
    brand: 'Samsung',
    price: '$1,349 (Rumoured)',
    marketStatus: 'Rumoured',
    expectedLaunch: 'January 2027',
    releaseDate: '2027-01-25',
    rumourConfidence: 91,
    overallRating: 4.6,
    popularityScore: 89,
    iconGradient: 'from-[#0b1528] to-indigo-900',
    specs: {
      display: {
        size: '6.86 inches',
        tech: 'Dynamic AMOLED 3X, 144Hz Refresh, Slimmer Bezels',
        refreshRate: '144Hz (Rumoured Upgrade)',
        resolution: '3120 x 1440 pixels',
        brightness: '3000 nits peak',
      },
      performance: {
        chipset: 'Snapdragon 8 Gen 4 / Gen 5 (3nm Oryon cores)',
        cpu: '8-core Oryon custom architecture',
        gpu: 'Adreno 830',
        ram: '16GB LPDDR6 (Rumoured upgrade for AI tasks)',
        storage: '256GB / 512GB / 1TB',
      },
      camera: {
        main: '200 MP, f/1.6, upgraded ISOCELL HP2 sensor',
        ultrawide: '50 MP, f/2.0 (Upgraded lens with autofocus)',
        telephoto: '50 MP (5x zoom, 1/2.5" sensor) + 50 MP (3x zoom, upgraded)',
        front: '12 MP high-sensitivity',
        features: '8K@60fps, Realtime AI Depth Map, ProVisual Engine',
      },
      battery: {
        capacity: '5,000 mAh with improved anode sheet',
        charging: '45W PPS charging (Rumored 65W optional)',
        wireless: '15W wireless, MagSafe-equivalent magnetic back rumors',
      },
      design: {
        dimensions: '162.1 x 77.6 x 8.2 mm (Softer rounded corners)',
        weight: '219 grams (Significantly lighter!)',
        materials: 'Grade 5 Titanium, Anti-reflective Armour Glass 2',
        waterproof: 'IP68 dust/water resistant',
      },
      software: {
        launchOs: 'Android 15 (One UI 7.1)',
        updatesPromise: '7 years of OS upgrades',
      },
    },
    reviews: [
      {
        id: 'r6',
        user: 'LeakerLeaks',
        rating: 4,
        comment: 'Leak reports confirm the corners will be slightly rounded like the S21 Ultra, preventing the palm digs! Combined with 16GB RAM for Local AI, this is the ultimate titanium upgrade path.',
        date: '2026-06-11',
        likes: 92,
        deviceRating: { design: 5, performance: 5, camera: 4, battery: 4 }
      }
    ]
  },
  {
    id: 'pixel-9-pro',
    name: 'Pixel 9 Pro XL',
    brand: 'Google',
    price: '$1,099',
    marketStatus: 'Available',
    releaseDate: '2025-08-22',
    overallRating: 4.6,
    popularityScore: 94,
    iconGradient: 'from-[#4285f4] to-[#a8c7fa]',
    specs: {
      display: {
        size: '6.8 inches',
        tech: 'Super Actua Display LTPO OLED, 1-120Hz',
        refreshRate: '120Hz',
        resolution: '2992 x 1344 pixels (~486 ppi)',
        brightness: '2000 nits (HDR), 3000 nits (peak)',
      },
      performance: {
        chipset: 'Google Tensor G4 (4nm with FOPLP)',
        cpu: '8-core (1x3.1 GHz & 3x2.6 GHz & 4x1.92 GHz)',
        gpu: 'Mali-G715 MC7 (900MHz)',
        ram: '16GB LPDDR5X (Massive RAM for On-device Gemini Nano)',
        storage: '128GB / 256GB / 512GB / 1TB',
      },
      camera: {
        main: '50 MP, f/1.68, 1/1.31" sensor, Dual Pixel OIS',
        ultrawide: '48 MP, f/1.7, 123˚, Quad PDAF (upgraded macro)',
        telephoto: '48 MP, f/2.8, 5x optical zoom, dual PDAF with OIS',
        front: '42 MP, f/2.2 with Dual Pixel autofocus',
        features: '8K Video Boost, Night Sight Video, Reimagine in Magic Editor, Gemini Live',
      },
      battery: {
        capacity: '5,060 mAh',
        charging: '37W USB-C PD (70% in 30 mins)',
        wireless: '23W wireless with Pixel Stand (Qi compatible up to 12W)',
      },
      design: {
        dimensions: '162.8 x 76.6 x 8.5 mm (Flatter glass with pill visor)',
        weight: '221 grams',
        materials: 'Satin metal frame, polished back glass (Gorilla Glass Victus 2)',
        waterproof: 'IP68 water and dust proof',
      },
      software: {
        launchOs: 'Android 14 (with immediate Android 15 upgrade)',
        updatesPromise: '7 years of Feature Drops and OS updates',
      },
    },
    reviews: [
      {
        id: 'r7',
        user: 'GeekySam',
        rating: 5,
        comment: 'Hands down the best camera system globally. Magic Editor’s new "Reimagine" tool allows you to put objects that weren’t there in seconds. The 16GB of standard RAM keeps the OS buttery smooth.',
        date: '2026-05-30',
        likes: 47,
        deviceRating: { design: 4, performance: 4, camera: 5, battery: 5 }
      },
      {
        id: 'r8',
        user: 'Elena Rostov',
        rating: 4,
        comment: 'Beautiful design change away from the generic curve bar. Cell modem reception is significantly better than the Pixel 8. Processor power lags behind Snapdragon 8 Gen 3 on games, but is okay.',
        date: '2026-06-08',
        likes: 22,
        deviceRating: { design: 5, performance: 3, camera: 5, battery: 4 }
      }
    ]
  },
  {
    id: 'pixel-10-pro',
    name: 'Pixel 10 Pro',
    brand: 'Google',
    price: '$1,099 (Rumoured)',
    marketStatus: 'Rumoured',
    expectedLaunch: 'August 2026',
    releaseDate: '2026-10-15',
    rumourConfidence: 88,
    overallRating: 4.4,
    popularityScore: 87,
    iconGradient: 'from-[#ea4335] to-[#fbbc05]',
    specs: {
      display: {
        size: '6.7 inches',
        tech: 'Eco2 OLED (ultra energy saving) LTPO, 120Hz',
        refreshRate: '120Hz',
        resolution: '2960 x 1312 pixels',
        brightness: '3200 nits peak',
      },
      performance: {
        chipset: 'Google Tensor G5 (TSMC 3nm - Full Custom Custom)',
        cpu: '10-core proprietary architecture',
        gpu: 'Imagination Technologies PowerVR series with Raytracing',
        ram: '16GB LPDDR5X',
        storage: '256GB / 512GB',
      },
      camera: {
        main: '50 MP (Upgraded Sony custom sensor)',
        ultrawide: '48 MP upgraded ultra-macro',
        telephoto: '48 MP (Generative Zoom 10x hardware-hybrid)',
        front: '48 MP with ultra-wide angle selfie lens',
        features: 'Under-display video generative overlays, real-time local video rendering',
      },
      battery: {
        capacity: '4,900 mAh with ultra-dense silicon anode',
        charging: '45W wired fast charging',
        wireless: '23W wireless standard',
      },
      design: {
        dimensions: '161.2 x 75.8 x 8.3 mm',
        weight: '210 grams (Thinner and lighter)',
        materials: 'Polished Ceramic frame, Sapphire Glass protection',
        waterproof: 'IP68 water resistant',
      },
      software: {
        launchOs: 'Android 15 / Android 16',
        updatesPromise: '7 years of updates (with native offline AI agent)',
      },
    },
    reviews: [
      {
        id: 'r9',
        user: 'PixelFanatic',
        rating: 5,
        comment: 'Since TSMC is finally manufacturing the Tensor G5 instead of Samsung Foundry, we will get incredible thermal performance and battery life. No more idle overheating!',
        date: '2026-06-12',
        likes: 110,
        deviceRating: { design: 4, performance: 5, camera: 5, battery: 5 }
      }
    ]
  },
  {
    id: 'oneplus-13',
    name: 'OnePlus 13',
    brand: 'OnePlus',
    price: '$799 (Rumoured)',
    marketStatus: 'Pre-order',
    expectedLaunch: 'July 2026',
    releaseDate: '2026-07-15',
    rumourConfidence: 94,
    overallRating: 4.7,
    popularityScore: 91,
    iconGradient: 'from-red-600 to-amber-600',
    specs: {
      display: {
        size: '6.82 inches',
        tech: 'BOE X2 Oriental OLED, micro-quad curves, LTPO 120Hz',
        refreshRate: '120Hz (1-120Hz dynamic adaptive)',
        resolution: '3168 x 1440 pixels (~510 ppi)',
        brightness: '1600 nits (HBM), 4500 nits (local peak)',
      },
      performance: {
        chipset: 'Snapdragon 9 Gen 1 / 8 Elite (3nm)',
        cpu: 'Dual copper vapor-chamber cooled 8-core CPU',
        gpu: 'Adreno Next-Gen graphics',
        ram: '12GB / 16GB / 24GB LPDDR5X',
        storage: '256GB / 512GB (UFS 4.0)',
      },
      camera: {
        main: '50 MP Sony LYT-808, OIS, f/1.6',
        ultrawide: '50 MP ultra-wide focal length Autofocus',
        telephoto: '50 MP periscope zoom f/2.6, 3x optical, 6x sensor-crop (Hasselblad Color Tuned)',
        front: '32 MP shooter, f/2.4',
        features: 'Hasselblad Master Mode, Portrait Bokeh with circular highlights, 4K@60fps all lenses',
      },
      battery: {
        capacity: '6,000 mAh (Incredible Glacier Battery technology)',
        charging: '100W SuperVOOC wired (100% in 24 mins)',
        wireless: '50W AirVOOC wireless (magnetic accessory compatible)',
      },
      design: {
        dimensions: '161.9 x 75.6 x 8.5 mm',
        weight: '213 grams',
        materials: 'Matte glass back with circular side camera housing, metal frame',
        waterproof: 'IP69 ultimate high-pressure water resistive rating',
      },
      software: {
        launchOs: 'OxygenOS 15 (based on Android 15)',
        updatesPromise: '5 years of OS updates',
      },
    },
    reviews: [
      {
        id: 'r10',
        user: 'TurboCharged',
        rating: 5,
        comment: '6000 mAh battery! OnePlus is completely leading the battery tech wars using silicon-carbon batteries. Combine that with 100W charging and this is a portable generator in your pocket.',
        date: '2026-06-09',
        likes: 67,
        deviceRating: { design: 4, performance: 5, camera: 4, battery: 5 }
      }
    ]
  },
  {
    id: 'galaxy-a35',
    name: 'Galaxy A35 5G',
    brand: 'Samsung',
    price: '$299',
    marketStatus: 'Available',
    releaseDate: '2026-03-20',
    overallRating: 4.2,
    popularityScore: 78,
    iconGradient: 'from-cyan-400 to-blue-500',
    specs: {
      display: {
        size: '6.6 inches',
        tech: 'Super AMOLED, 120Hz Refresh, Gorilla Glass Victus+',
        refreshRate: '120Hz',
        resolution: '2340 x 1080 pixels',
        brightness: '1000 nits peak',
      },
      performance: {
        chipset: 'Exynos 1380 (5nm)',
        cpu: '8-core (4x2.4 GHz Cortex-A78 & 4x2.0 GHz Cortex-A55)',
        gpu: 'Mali-G68 MP5',
        ram: '6GB LPDDR4X',
        storage: '128GB (MicroSD Card slots up to 1TB)',
      },
      camera: {
        main: '50 MP, f/1.8, PDAF, OIS',
        ultrawide: '8 MP, f/2.2, 123˚',
        telephoto: 'No dedicated optical telephoto (5MP Macro sensor present)',
        front: '13 MP, f/2.2, wide-angle',
        features: '4K@30fps video capture, Portrait Nightography',
      },
      battery: {
        capacity: '5,000 mAh',
        charging: '25W wired',
        wireless: 'No wireless charging support',
      },
      design: {
        dimensions: '161.7 x 78.0 x 8.2 mm',
        weight: '209 grams',
        materials: 'Glass Victus+ front, plastic outer frame, glass back',
        waterproof: 'IP67 dust/water resistant (up to 1m for 30 mins)',
      },
      software: {
        launchOs: 'Android 14 (One UI 6.1)',
        updatesPromise: '4 years of OS upgrades, 5 years of security updates',
      },
    },
    reviews: [
      {
        id: 'r11',
        user: 'Pennywise',
        rating: 4,
        comment: 'Unbelievable value for $299. It feels and looks exactly like the premium S24 lineup from a distance. The 120Hz screen is super bright and the battery easily runs for nearly 2 days.',
        date: '2026-06-02',
        likes: 12,
        deviceRating: { design: 5, performance: 4, camera: 4, battery: 5 }
      }
    ]
  },
  {
    id: 'pixel-8a',
    name: 'Pixel 8a',
    brand: 'Google',
    price: '$499',
    marketStatus: 'Available',
    releaseDate: '2026-05-14',
    overallRating: 4.5,
    popularityScore: 84,
    iconGradient: 'from-[#4285f4] to-emerald-500',
    specs: {
      display: {
        size: '6.1 inches',
        tech: 'OLED Activ Display LTPO, 120Hz',
        refreshRate: '120Hz',
        resolution: '2400 x 1080 pixels',
        brightness: '1400 nits (HBM), 2000 nits (peak)',
      },
      performance: {
        chipset: 'Google Tensor G3 (4nm)',
        cpu: '9-core (1x3.0 GHz & 4x2.45 GHz & 4x2.15 GHz)',
        gpu: 'Immortalis-G715 MC10',
        ram: '8GB LPDDR5X',
        storage: '128GB / 256GB',
      },
      camera: {
        main: '64 MP, f/1.89, Dual Pixel OIS',
        ultrawide: '13 MP, f/2.2, 120˚',
        telephoto: 'Super Res Zoom 8x hybrid crop',
        front: '13 MP, f/2.2, ultrawide front lens',
        features: 'Best Take, Audio Magic Eraser, Magic Editor, Circle to Search',
      },
      battery: {
        capacity: '4,492 mAh',
        charging: '18W wired, 7.5W wireless',
        wireless: 'Qi compatible wirefree power systems',
      },
      design: {
        dimensions: '152.1 x 72.7 x 8.9 mm',
        weight: '188 grams',
        materials: 'Gorilla Glass 3 front, composite matte plastic back, aluminum frame',
        waterproof: 'IP67 dust/water resistant',
      },
      software: {
        launchOs: 'Android 14 (upgradable to 15 immediately)',
        updatesPromise: '7 years of full OS upgrades and Feature Drops',
      },
    },
    reviews: [
      {
        id: 'r12',
        user: 'TechEnthusiast',
        rating: 5,
        comment: 'For $499 you get the exact same camera algorithm as the Pro model, plus a guaranteed 7 years of full operating system updates. It is the smartest purchase you can make in 2026.',
        date: '2026-05-18',
        likes: 34,
        deviceRating: { design: 4, performance: 5, camera: 5, battery: 4 }
      }
    ]
  }
];

export const initialNews: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'iPhone 17 Slim Rumors: Apple Sacrifices Rear Camera Suite for 5.1mm Structural Thickness',
    summary: 'Leaked CAD schematics indicate that the upcoming revolutionary iPhone 17 "Slim" or "Air" models will feature a single high-fidelity rear camera to achieve an ultra-sleek, pocketable 5.1mm depth.',
    content: `A flurry of supply chain leaks suggests that Cupertino is preparing its thinnest iPhone design since the iPhone 6. Rumored to be named the **iPhone 17 Slim** or **iPhone 17 Air**, this model will represent a bold step in hardware engineering.

At just **5.1mm thick**, the device will cut standard dimensions by nearly 40%. Achieving this extreme profile requires creative engineering, with suppliers reporting that Apple will utilize pre-bent titanium alloy shells and a newly developed, dense single-anode battery panel. 
    
However, this premium design will demand key compromises:
1. **Single Rear Camera**: The famous three-camera protrusion is physically impossible in a 5mm chassis. Rumors indicate Cupertino will install a single, highly optimized 48MP main lens with digital zoom enhancements.
2. **Reduced Battery Capacity**: Current cells are expected at roughly 3,100 mAh, which will put a heavy burden on the display and processor efficiency of iOS 19.

Sources say the price will start high around **$1,299**, marking it as a premium design-focused alternative to the standard Pro line. What are your thoughts on this trade-off? Write an active review on the spec sheet below!`,
    category: 'rumour',
    section: 'rumors',
    date: '2026-06-12',
    readTime: '3 min read',
    author: 'Elena Rostova',
    authorAvatar: 'ER',
    likes: 341,
    views: 1250,
    deviceTag: 'iphone-17-slim',
    hot: true
  },
  {
    id: 'news-2',
    title: 'Samsung Galaxy S25 Ultra: Design Render Leaks Reveal Rounder Outer Bezels and Lighter Titanium Weight',
    summary: 'Goodbye palm-digs! High-resolution CAD renders published by accessory makers confirm Samsung will round the corners of the Galaxy S25 Ultra while reducing the weight to just 219 grams.',
    content: `For years, users of Samsung's flagship Ultra line have expressed mixed reviews about its blocky, needle-sharp corners, which frequently dug into user palms during extended use. According to newly leaked digital CAD templates, the **Galaxy S25 Ultra** will address this layout flaw.

The renders showcase a beautifully rounded outer chassis that merges the flat screens of the S24 series with the ergonomics of older flagships. By replacing heavy internal components with lightweight carbon composite brackets, Samsung has reportedly managed to drop the weight from **232g down to just 219g**.

In terms of specs, the chip of choice remains the **Snapdragon 8 Gen 4 (or 8 Elite)**, which will be paired with **16GB LPDDR6 RAM** to power on-device generative AI tools immediately. Price rumor indexes place this model at **$1,349**, a minor bump due to memory costs.`,
    category: 'rumour',
    section: 'smartphones',
    date: '2026-06-11',
    readTime: '4 min read',
    author: 'Marcus Vance',
    authorAvatar: 'MV',
    likes: 189,
    views: 890,
    deviceTag: 'galaxy-s25-ultra',
    hot: false
  },
  {
    id: 'news-3',
    title: 'Hands-on: Google Pixel 9 Pro XL Redefines Computational Photography with Gemini Live',
    summary: 'The new Super Actua Display is stunning and the 16GB of built-in RAM handles complex generative tasks locally. Is it worth the $1,099 premium Price Tag?',
    content: `Google's latest hardware rollout has hit shelves, and we've spent three weeks putting the **Pixel 9 Pro XL** through intense lab testing. The verdict is clear: this is the most cohesive, AI-augmented device Google has ever shipped.

The hardware finally matches rivals like Apple. The flat, polished satin-metal outer frame is extremely professional, and the distinct oval camera visor looks remarkably clean compared to last year's bar design. 

**Camera Performance Review:**
Using the custom Tensor G4 processors, computational photography moves to the next level. The **Night Sight Video Boost** now renders 8K videos in the cloud 2x faster, with unmatched color saturation. The local Gemini Nano model allows users to converse seamlessly with their device with no latency via **Gemini Live**.

However, thermal testing shows the G4 chip still throttles during heavy graphics benchmark tests. But for everyday mobile work and capturing moments, Google has indeed claimed the crown.`,
    category: 'review',
    section: 'smartphones',
    date: '2026-06-05',
    readTime: '6 min read',
    author: 'Liam Chen',
    authorAvatar: 'LC',
    likes: 420,
    views: 2310,
    deviceTag: 'pixel-9-pro',
    hot: true
  },
  {
    id: 'news-4',
    title: 'OnePlus 13 Pre-Order Opens: High-Pressure IP69 Seal and Silicon-Carbon 6000mAh Battery Revealed',
    summary: 'At just $799, OnePlus breaks battery boundaries with a massive 6,000 mAh cellular cell that charges in 24 minutes with 100W power bricks.',
    content: `OnePlus continues to demonstrate aggressive market strategies. The company has officially opened pre-orders for the **OnePlus 13**, showing specs that outpace flagships costing nearly double.

At the core of the OnePlus 13 is its new **Glacier Battery** technology, utilizing highly dense silicon-carbon anodes to squeeze **6,000 mAh** into a frame that is actually thinner than the OnePlus 12. Combined with the ultra-efficient BOE X2 screen, testers report screen-on times approaching 11 hours.

Additionally, the OnePlus 13 features an ultra-robust **IP69 water resistance rating**, certifying it against high-pressure steam jet washes. For $799, it is incredibly difficult to justify more expensive models with fewer specs.`,
    category: 'launch',
    section: 'smartphones',
    date: '2026-06-10',
    readTime: '3 min read',
    author: 'Sarah Jenkins',
    authorAvatar: 'SJ',
    likes: 295,
    views: 1450,
    deviceTag: 'oneplus-13',
    hot: false
  },
  {
    id: 'news-5',
    title: 'Breaking: Google TSMC Custom Tensor G5 Deal Finalized for Pixel 10 Pro Production',
    summary: 'Industry sources confirm Google has moved away from Samsung Foundry and signed a multi-million production agreement with TSMC for the Pixel 10 Pro’s 3nm custom processors.',
    content: `The tech rivalry takes another turn as Google officially secures silicon space in TSMC's 3nm foundry lanes. For generations, the performance of Pixel's Tensor line was limited by the thermal dissipation issues of Samsung Foundry's packaging techniques. 

The upcoming **Tensor G5**, slated for the **Pixel 10 Pro**, is Google's first true "custom" silicon designed entirely ground-up by Google engineers. Analysts state this will solve thermal-throttling issues once and for all, allowing the upcoming devices to challenge Apple's high-efficiency chips.

The pricing structure is predicted to hold steady at **$1,099** to remain highly competitive against the iPhone Pro lineup.`,
    category: 'breaking',
    section: 'industry',
    date: '2026-06-13',
    readTime: '2 min read',
    author: 'Liam Chen',
    authorAvatar: 'LC',
    likes: 512,
    views: 3100,
    deviceTag: 'pixel-10-pro',
    hot: true
  },
  {
    id: 'news-6',
    title: 'Apple Watch Ultra 3: CAD Renders Expose Thinner Double-Layer Titanium and Sleep Apnea Alerts',
    summary: 'The upcoming ultimate adventure smartwatch is rumored to maintain its 49mm chassis outline but trim bulk by 1.2mm for a more ergonomic sleep-tracking fit.',
    content: `Cupertino is reportedly gearing up to announce the **Apple Watch Ultra 3** with a heavy focus on daily sleep wellness. CAD leaks indicate that while physical size remains at the 49mm signature visual format, the depth of the watches drops from 14.4mm to **13.2mm**.

This reduction is achieved by adopting a dual-layer integrated backplate that embeds health biosensors directly into the grade-5 titanium frame. The primary feature of this hardware iteration is the FDA-cleared **Sleep Apnea Alert Engine**, which relies on a proprietary continuous blood-oxygen tracker operating silently at night.

The predicted price point matches previous models at **$799 (Est.)**, maintaining its premium position in the active wearables space.`,
    category: 'rumour',
    section: 'wearables',
    date: '2026-06-12',
    readTime: '3 min read',
    author: 'Elena Rostova',
    authorAvatar: 'ER',
    likes: 154,
    views: 790,
    hot: false
  },
  {
    id: 'news-7',
    title: 'Samsung Galaxy Ring 2: Design Renders Detail 10-Day Life Span & Modular Charging Case',
    summary: 'Samsung is actively polishing the Galaxy Ring 2. Leaks reveal high-density solid-state batteries that extend fitness telemetry tracking to a continuous 10 days.',
    content: `The smart ring market is heating up. Factory floor schematics for the **Galaxy Ring 2** highlight custom micro-sensors manufactured on a flexible gold-plated substrate. 

By replacing lithium-ion pouch cells with solid-state ceramic micro-batteries, the Ring 2 will reportedly deliver **10 days of battery lifespan** on a single charge—a 40% jump from the previous standard. Additionally, weight is trimmed down to just **2.1 grams**, making it practically unnoticeable during sleep or heavy workouts.

Expect a global price point around **$399 (Est.)** at launch in late August.`,
    category: 'analysis',
    section: 'wearables',
    date: '2026-06-11',
    readTime: '4 min read',
    author: 'Marcus Vance',
    authorAvatar: 'MV',
    likes: 210,
    views: 1100,
    hot: true
  },
  {
    id: 'news-8',
    title: 'MacBook Pro M5 Architecture: TSMC 2nm Process Leaks Point to 35-Hour Battery Screen Time',
    summary: 'Leaks from TSMC tape-out lines suggest Apple’s next-generation M5 silicon will debut on an ultra-precise 2nm node, raising efficiency barriers to new heights.',
    content: `A highly detailed report from supply chain circles exposes the early tape-out configurations of the **M5 series processors** for Apple's premium laptops. The headline spec is the shift to a **2nm TSMC lithography node**, allowing Apple to packing 25% more transistors in the same silicon area.

With deep architectural enhancements, the M5 core will power upcoming 14-inch and 16-inch laptops with unmatched performance-per-watt efficiency. Hardware testers predict that continuous web browsing battery endurance will jump to an unprecedented **35 hours** on a single charge.

Expected pricing begins at **$1,599 (Est.)** for the baseline model, which continues to feature 16GB of unified memory as the absolute minimum configuration.`,
    category: 'rumour',
    section: 'laptops',
    date: '2026-06-09',
    readTime: '5 min read',
    author: 'Liam Chen',
    authorAvatar: 'LC',
    likes: 389,
    views: 1890,
    hot: true
  },
  {
    id: 'news-9',
    title: 'ASUS Zenbook S 14 OLED Benchmarks Expose Snapdragon X Elite Core Efficiency Over Intel Ultra 9',
    summary: 'A direct performance comparison under heavy compiling workloads reveals the Qualcomm Snapdragon X Elite processor stays cooler while using 45% less power.',
    content: `We put the premium ASUS Zenbook S 14 OLED through our rigid technical compile benchmarks, pitting Intel's latest Lunar Lake Core Ultra 9 architecture against the premium Qualcomm Snapdragon X Elite option.

The results are striking:
- **Efficiency**: Under intensive multi-core Docker builds, the Qualcomm variant operates at just **18 Watts**, while Intel spikes to **32 Watts**.
- **Thermals**: Surface temperatures on the keyboard deck measured 4.2°C lower on the Snapdragon system, preventing thermal throttling entirely.
- **Visuals**: The 2.8K Lumina OLED screen delivers perfect color accuracy, making either system excellent for creators who travel.

The retail price sits at **$1,399**, marking a flagship milestone for Windows-on-ARM systems.`,
    category: 'review',
    section: 'laptops',
    date: '2026-06-07',
    readTime: '5 min read',
    author: 'Sarah Jenkins',
    authorAvatar: 'SJ',
    likes: 198,
    views: 920,
    hot: false
  },
  {
    id: 'news-10',
    title: 'Price Rumours Index: Supply Chain Warns of 12% MSRP Surcharge Due to Global High-Density DRAM Demands',
    summary: 'With phone, wearable, and laptop components requiring 16GB+ RAM standards for local AI compute pipelines, component suppliers predict retail price hikes.',
    content: `An analytical price index paper released by Tokyo semiconductor groups points to an upcoming retail price hike for next-generation consumer electronics. 

The main culprit is the massive demand for **high-density LPDDR5X and LPDDR6 memory chips**. Tech manufacturers (including Apple, Samsung, Google, and Asus) are standardizing on larger memory sizes to handle on-device AI algorithms (like Gemini Nano and Apple Intelligence) locally. 

This hardware standard has caused a tight supply situation in silicon plants. Industry analysts warn we will likely see a **10% to 15% increase in global final MSRPs** starting in the third quarter. Consumers are urged to lock in existing pre-order price tags where available to bypass this semiconductor tariff pressure.`,
    category: 'analysis',
    section: 'rumors',
    date: '2026-06-13',
    readTime: '4 min read',
    author: 'Elena Rostova',
    authorAvatar: 'ER',
    likes: 304,
    views: 1420,
    hot: true
  }
];

export const initialNotifications: TabNotification[] = [
  {
    id: 'notif-1',
    title: '🔥 RUMOUR METRIC SHIFT',
    body: 'iPhone 17 Slim prototype reported to use single-mic premium spatial arrays.',
    time: '2 mins ago',
    type: 'leak',
    read: false,
    linkToId: 'iphone-17-slim'
  },
  {
    id: 'notif-2',
    title: '🚨 BREAKING SPECIFICATION DROP',
    body: 'OnePlus 13 passes final IP69 high-pressure test, pre-orders exceeding estimations.',
    time: '15 mins ago',
    type: 'alert',
    read: false,
    linkToId: 'oneplus-13'
  },
  {
    id: 'notif-3',
    title: '📢 REVIEW UPDATE',
    body: 'Average user rating for the Pixel 9 Pro XL has climbed to 4.6 stars after 20 new reader reviews.',
    time: '1 hour ago',
    type: 'review',
    read: true,
    linkToId: 'pixel-9-pro'
  }
];

export const notificationTemplates: Omit<TabNotification, 'id' | 'time' | 'read'>[] = [
  {
    title: '🔥 EXCESSIVE POWER LEAK',
    body: 'Galaxy S25 Ultra clocked at 4.2GHz on single performance core. Snapdragon 8 Gen 4 exceeds baseline expectations.',
    type: 'leak',
    linkToId: 'galaxy-s25-ultra'
  },
  {
    title: '🚨 PRICING RUMOUR DETECTED',
    body: 'Leaker reports iPhone 17 Slim component cost is 15% higher than previous estimates due to dynamic alloy frame.',
    type: 'leak',
    linkToId: 'iphone-17-slim'
  },
  {
    title: '📢 LIVE REVIEW SUBMISSION',
    body: 'New 5-star user review submitted for Pixel 10 Pro: "Perfect upgrade, custom G5 TSMC silicon is looking amazing."',
    type: 'review',
    linkToId: 'pixel-10-pro'
  },
  {
    title: '🚨 EXTREME THERMAL UPGRADE',
    body: 'OnePlus 13 dual vapor cooling chambers measured at 14,000mm² - the largest cooling space in history.',
    type: 'leak',
    linkToId: 'oneplus-13'
  },
  {
    title: '⚡ SPECIAL REPORT',
    body: 'FCC documents reveal Galaxy S25 Ultra registered with magnetic induction charging rings.',
    type: 'alert',
    linkToId: 'galaxy-s25-ultra'
  },
  {
    title: '🔥 CAMERA VISOR LEAK',
    body: 'First factory floor photo of Pixel 10 Pro visor reveals circular pill cutout layout.',
    type: 'leak',
    linkToId: 'pixel-10-pro'
  }
];

export function formatPriceByCountry(priceStr: string, countryCode: 'US' | 'UK' | 'EU' | 'IN' | 'CA'): string {
  if (!priceStr) return '';
  // Extract number from string, e.g. "$1,199" -> 1199
  const numMatch = priceStr.replace(/,/g, '').match(/\d+/);
  if (!numMatch) return priceStr; // fallback if no number found
  
  const usdPrice = parseInt(numMatch[0]);
  const isEstimated = priceStr.toLowerCase().includes('estimated') || priceStr.toLowerCase().includes('estimate') || priceStr.toLowerCase().includes('est');
  const isRumoured = priceStr.toLowerCase().includes('rumoured') || priceStr.toLowerCase().includes('rumor');
  
  let convertedPrice = '';
  switch (countryCode) {
    case 'UK':
      // GBP conversion roughly 0.82
      const gbpAmount = Math.round(usdPrice * 0.82);
      convertedPrice = `£${gbpAmount.toLocaleString('en-GB')}`;
      break;
    case 'EU':
      // EUR conversion roughly 0.93
      const eurAmount = Math.round(usdPrice * 0.93);
      convertedPrice = `€${eurAmount.toLocaleString('de-DE')}`;
      break;
    case 'IN':
      // INR conversion roughly 83
      const inrAmount = Math.round(usdPrice * 83);
      convertedPrice = `₹${inrAmount.toLocaleString('en-IN')}`;
      break;
    case 'CA':
      // CAD conversion roughly 1.37
      const cadAmount = Math.round(usdPrice * 1.37);
      convertedPrice = `CA$${cadAmount.toLocaleString('en-CA')}`;
      break;
    case 'US':
    default:
      convertedPrice = `$${usdPrice.toLocaleString('en-US')}`;
      break;
  }
  
  if (isEstimated) convertedPrice += ' (Est.)';
  if (isRumoured) convertedPrice += ' (Rumored)';
  return convertedPrice;
}

