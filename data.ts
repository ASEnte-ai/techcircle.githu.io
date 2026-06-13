export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  deviceRating?: {
    design: number;
    performance: number;
    camera: number;
    battery: number;
  };
}

export interface DeviceSpecs {
  display: {
    size: string;
    tech: string;
    refreshRate: string;
    resolution: string;
    brightness: string;
  };
  performance: {
    chipset: string;
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
  };
  camera: {
    main: string;
    ultrawide: string;
    telephoto: string;
    front: string;
    features: string;
  };
  battery: {
    capacity: string;
    charging: string;
    wireless: string;
  };
  design: {
    dimensions: string;
    weight: string;
    materials: string;
    waterproof: string;
  };
  software: {
    launchOs: string;
    updatesPromise: string;
  };
}

export interface Device {
  id: string;
  name: string;
  brand: string;
  price: string;
  marketStatus: 'Available' | 'Rumoured' | 'Pre-order';
  expectedLaunch?: string;
  releaseDate?: string; // ISO date string for sorting/filtering
  rumourConfidence?: number; // 0-100%
  specs: DeviceSpecs;
  iconGradient: string; // Tailind gradient format
  reviews: Review[];
  overallRating: number;
  popularityScore: number; // For sorting
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'breaking' | 'rumour' | 'review' | 'analysis' | 'launch';
  section: 'smartphones' | 'wearables' | 'laptops' | 'industry' | 'rumors';
  date: string;
  readTime: string;
  author: string;
  authorAvatar: string;
  likes: number;
  views: number;
  deviceTag?: string; // Links to a Device.id
  hot?: boolean;
}

export interface TabNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  type: 'leak' | 'alert' | 'update' | 'review';
  read: boolean;
  linkToId?: string; // id of device or news
}
