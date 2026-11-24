export interface ProductVariant {
  id: string;
  label: string;
  badge?: string;
  quantityCount: number;
  price: number;
  compareAtPrice?: number;
}

export interface VideoScene {
  id: string;
  caption: string;
  durationMs: number;
  imageUrl: string;
  motionClass: 'animate-ken-burns' | 'animate-ken-burns-macro';
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  shortTitle: string;
  category: 'Skincare' | 'Sleep Wellness';
  tagline: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  imageAlt: string;
  editorialImage: string;
  editorialImageAlt: string;
  videoPoster: string;
  videoPosterAlt: string;
  videoUrl: string;
  videoTitle: string;
  videoScenes: VideoScene[];
  variants: ProductVariant[];
  description: string;
  howToUse: string[];
  details: string[];
  featuresHeading: string;
  features: ProductFeature[];
  storyOneTitle: string;
  storyOneBody: string;
  storyTwoTitle: string;
  storyTwoSteps: string[];
  faqs: ProductFaq[];
  metafieldVideoKey: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  heading: string;
  subtext: string;
  ctaLabel: string;
  targetProductId?: string;
  targetAnchor?: string;
  imageUrl: string;
  imageAlt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-beauty',
    eyebrow: 'Beauty Essentials',
    heading: 'Your daily beauty ritual.',
    subtext: 'A little self-care. A quiet moment made just for you.',
    ctaLabel: 'Discover Beauty',
    targetProductId: 'prod-eyephalt-cream',
    imageUrl: '/src/assets/images/hero_techflex_collection_1795507856789.jpg',
    imageAlt: 'fabaddons skincare and wellness collection arranged on slate-blue stone plinths',
  },
  {
    id: 'slide-wellness',
    eyebrow: 'Smart Wellness',
    heading: 'Less effort. More rest.',
    subtext: 'Practical wellness solutions designed to make your nightly routine smoother.',
    ctaLabel: 'Explore Wellness',
    targetProductId: 'prod-anti-snore',
    imageUrl: '/src/assets/images/hero_smart_wellness_1795507856197.jpg',
    imageAlt: 'Serene minimalist bedroom and vanity table with wellness travel case at twilight',
  },
  {
    id: 'slide-ritual',
    eyebrow: 'Daily, Elevated',
    heading: 'Simple upgrades. Everyday joy.',
    subtext: 'Make room for your next everyday skincare favorite.',
    ctaLabel: 'Shop Collection',
    targetAnchor: '#bestsellers',
    imageUrl: '/src/assets/images/hero_daily_ritual_1795507857245.jpg',
    imageAlt: 'Woman applying Korean eye cream in warm natural morning light',
  },
];

export const TECHFLEX_PRODUCTS: Product[] = [
  {
    id: 'prod-eyephalt-cream',
    handle: 'dr-melaxin-eyephalt-eye-cream',
    title: 'Dr. Melaxin Eyephalt Eye Cream',
    shortTitle: 'Eyephalt Eye Cream',
    category: 'Skincare',
    tagline: 'Daily Targeted Under-Eye Care',
    subtitle: 'Korean targeted under-eye firming cream',
    price: 34.0,
    compareAtPrice: 44.0,
    image: '/src/assets/images/product_eye_cream_1795507129891.jpg',
    imageAlt: 'Dr. Melaxin Eyephalt Eye Cream jar and tube on neutral travertine stone',
    editorialImage: '/src/assets/images/editorial_eye_ritual_1795507858587.jpg',
    editorialImageAlt: 'Smooth under-eye skin beside brushed silver eye cream jar and applicator',
    videoPoster: '/src/assets/images/video_eye_cream_1795507131950.jpg',
    videoPosterAlt: 'Model opening and gently applying Dr. Melaxin Eyephalt Eye Cream beneath her eye',
    videoUrl: '/src/assets/videos/demo_eye_cream.mp4',
    videoTitle: 'Under-Eye Application & Texture',
    videoScenes: [
      {
        id: 'eye-1',
        caption: '01 · Gentle ring-finger application',
        durationMs: 4200,
        imageUrl: '/src/assets/images/video_eye_cream_1795507131950.jpg',
        motionClass: 'animate-ken-burns',
      },
      {
        id: 'eye-2',
        caption: '02 · Rich, fast-absorbing peptide texture',
        durationMs: 3600,
        imageUrl: '/src/assets/images/product_eye_cream_1795507129891.jpg',
        motionClass: 'animate-ken-burns-macro',
      },
      {
        id: 'eye-3',
        caption: '03 · Daily morning & evening ritual',
        durationMs: 4000,
        imageUrl: '/src/assets/images/editorial_eye_ritual_1795507858587.jpg',
        motionClass: 'animate-ken-burns',
      },
    ],
    variants: [
      {
        id: 'eye-buy-1',
        label: 'Buy 1',
        quantityCount: 1,
        price: 34.0,
        compareAtPrice: 44.0,
      },
      {
        id: 'eye-buy-2',
        label: 'Buy 2',
        badge: 'Popular',
        quantityCount: 2,
        price: 59.0,
        compareAtPrice: 88.0,
      },
      {
        id: 'eye-buy-3',
        label: 'Buy 3',
        badge: 'Best Value',
        quantityCount: 3,
        price: 82.0,
        compareAtPrice: 132.0,
      },
    ],
    description:
      'Formulated in Korea for delicate under-eye skin, Dr. Melaxin Eyephalt Eye Cream delivers concentrated hydration and a smooth, cushioned finish that wears comfortably beneath daytime SPF or makeup.',
    howToUse: [
      'Dispense a pea-sized amount onto your ring finger after cleansing and toning.',
      'Gently tap along the orbital bone from the inner corner outward without tugging.',
      'Allow 60 seconds to absorb before layering moisturizer or sunscreen.',
    ],
    details: [
      'Volume: 15 ml / 0.5 fl oz compact jar & travel tube',
      'Texture: Silky, non-greasy cushion cream',
      'Routine: Suitable for morning and evening skincare',
    ],
    featuresHeading: 'Features for a fresher-looking eye area',
    features: [
      {
        title: 'Smoother-looking fine lines',
        description: 'Cushions dry under-eye creases with lightweight moisture for a refined finish.',
      },
      {
        title: 'Reduced puffiness look',
        description: 'Cooling fingertip application helps morning eye contours appear rested.',
      },
      {
        title: 'Temporarily firmer feel',
        description: 'Creates a supple, balanced surface that pairs smoothly under concealer.',
      },
      {
        title: 'Compact 15 ml travel size',
        description: 'Sleek brushed container fits effortlessly on your vanity or carry-on pouch.',
      },
    ],
    storyOneTitle: 'Simple care for your eye area',
    storyOneBody:
      'Designed to slot into a calm two-minute morning or evening ritual, the lightweight Korean cream absorbs without heaviness or white cast—leaving skin soft, comfortable, and prepped for the day.',
    storyTwoTitle: 'Focused care. Practical design.',
    storyTwoSteps: [
      'Start with clean, dry under-eye skin after your regular cleanser.',
      'Tap a grain-of-rice amount gently from inner to outer corner.',
      'Let the silky cream settle for 60 seconds before applying SPF or makeup.',
    ],
    faqs: [
      {
        question: 'Can I wear Dr. Melaxin Eyephalt Eye Cream under makeup?',
        answer:
          'Yes. Use a thin, tapped layer and allow 60 seconds for full absorption before applying concealer or foundation.',
      },
      {
        question: 'How often should I apply it?',
        answer:
          'It is designed for daily use in both morning and evening skincare routines.',
      },
      {
        question: 'What size is included?',
        answer:
          'Each standard unit provides 15 ml (0.5 fl oz), enough for weeks of consistent under-eye application.',
      },
    ],
    metafieldVideoKey: 'custom.eyephalt_demo_video',
  },
  {
    id: 'prod-turmeric-pads',
    handle: 'turmeric-acid-cleaning-pads',
    title: 'Turmeric Acid Cleaning Pads',
    shortTitle: 'Turmeric Cleaning Pads',
    category: 'Skincare',
    tagline: 'Dual-Sided Brightening Pads',
    subtitle: 'Dual-textured daily brightening cleansing pads',
    price: 26.0,
    compareAtPrice: 34.0,
    image: '/src/assets/images/product_turmeric_pads_1795507130913.jpg',
    imageAlt: 'Turmeric Acid Cleaning Pads open amber jar with textured golden cleansing pads',
    editorialImage: '/src/assets/images/video_turmeric_pads_1795507133095.jpg',
    editorialImageAlt: 'Woman wiping cheek gently with golden turmeric cleansing pad',
    videoPoster: '/src/assets/images/video_turmeric_pads_1795507133095.jpg',
    videoPosterAlt: 'Model holding container and wiping cheek gently with a textured turmeric cleansing pad',
    videoUrl: '/src/assets/videos/demo_turmeric_pads.mp4',
    videoTitle: 'Pad Texture & Cleansing Routine',
    videoScenes: [
      {
        id: 'turm-1',
        caption: '01 · Textured cotton pad sweep across cheek',
        durationMs: 4200,
        imageUrl: '/src/assets/images/video_turmeric_pads_1795507133095.jpg',
        motionClass: 'animate-ken-burns',
      },
      {
        id: 'turm-2',
        caption: '02 · Embossed botanical turmeric pad weave',
        durationMs: 3600,
        imageUrl: '/src/assets/images/product_turmeric_pads_1795507130913.jpg',
        motionClass: 'animate-ken-burns-macro',
      },
      {
        id: 'turm-3',
        caption: '03 · Refreshed, balanced skin prep',
        durationMs: 4000,
        imageUrl: '/src/assets/images/video_turmeric_pads_1795507133095.jpg',
        motionClass: 'animate-ken-burns',
      },
    ],
    variants: [
      {
        id: 'turm-buy-1',
        label: 'Buy 1 (60 Pads)',
        quantityCount: 1,
        price: 26.0,
        compareAtPrice: 34.0,
      },
      {
        id: 'turm-buy-2',
        label: 'Buy 2 (120 Pads)',
        badge: 'Popular',
        quantityCount: 2,
        price: 46.0,
        compareAtPrice: 68.0,
      },
      {
        id: 'turm-buy-3',
        label: 'Buy 3 (180 Pads)',
        badge: 'Best Value',
        quantityCount: 3,
        price: 64.0,
        compareAtPrice: 102.0,
      },
    ],
    description:
      'Pre-soaked cotton pads infused with turmeric root extract and gentle exfoliating acids to lift surface residue and refresh dull skin texture in one quick swipe.',
    howToUse: [
      'After washing your face, take one pre-soaked pad from the sealed jar.',
      'Sweep the embossed textured side across cheeks, forehead, and T-zone, avoiding eyes.',
      'Flip to the smooth side to gently pat remaining essence into the skin.',
    ],
    details: [
      'Count: 60 pre-soaked dual-sided cotton pads (150 ml)',
      'Key Botanical: Curcuma Longa (Turmeric) Root Extract',
      'Sealed screw-top jar preserves pad saturation',
    ],
    featuresHeading: 'Features for clear, refreshed daily prep',
    features: [
      {
        title: 'Dual-textured cotton weave',
        description: 'Embossed side lifts surface buildup while the smooth side calms and hydrates.',
      },
      {
        title: 'Botanical turmeric essence',
        description: 'Saturated in golden turmeric extract for an even, refreshed-looking glow.',
      },
      {
        title: 'Zero-mess single-step prep',
        description: 'Pre-dosed pads eliminate dripping toners or wasted cotton rounds.',
      },
      {
        title: 'Generous 60-pad jar',
        description: 'Designed for up to two months of consistent evening or morning toning.',
      },
    ],
    storyOneTitle: 'Effortless daily exfoliation & toning',
    storyOneBody:
      'Each round pad is saturated evenly so the first pad feels just as fresh as the last—giving you quick, controlled toning before serums and moisturizers.',
    storyTwoTitle: 'Gentle polish. Balanced finish.',
    storyTwoSteps: [
      'Open the airtight lid and lift one textured cotton pad.',
      'Glide softly across clean cheeks, nose, and chin.',
      'Follow with moisturizer and daytime broad-spectrum SPF.',
    ],
    faqs: [
      {
        question: 'Are the pads pre-soaked?',
        answer:
          'Yes. All 60 cotton pads arrive immersed in 150 ml of turmeric acid toning essence inside a sealed amber jar.',
      },
      {
        question: 'Can sensitive skin types use them?',
        answer:
          'We recommend starting 2–3 evenings per week and adjusting frequency based on how your skin responds.',
      },
    ],
    metafieldVideoKey: 'custom.turmeric_pads_demo_video',
  },
  {
    id: 'prod-peel-shot-spray',
    handle: 'dr-melaxin-peel-shot-kojic-acid-spray',
    title: 'Dr. Melaxin Peel Shot Kojic Acid Spray',
    shortTitle: 'Peel Shot Kojic Spray',
    category: 'Skincare',
    tagline: 'Fine-Mist Kojic Resurfacing',
    subtitle: 'Fine-mist kojic acid resurfacing spray',
    price: 38.0,
    compareAtPrice: 48.0,
    image: '/src/assets/images/product_peel_spray_1795507131935.jpg',
    imageAlt: 'Dr. Melaxin Peel Shot Kojic Acid Spray bottle on stone pedestal',
    editorialImage: '/src/assets/images/video_peel_spray_1795507134108.jpg',
    editorialImageAlt: 'Woman misting Dr. Melaxin Peel Shot Kojic Acid Spray in warm rim light',
    videoPoster: '/src/assets/images/video_peel_spray_1795507134108.jpg',
    videoPosterAlt: 'Close-up mist application of Dr. Melaxin Peel Shot Kojic Acid Spray',
    videoUrl: '/src/assets/videos/demo_peel_spray.mp4',
    videoTitle: 'Fine-Mist Spray Demonstration',
    videoScenes: [
      {
        id: 'peel-1',
        caption: '01 · Ultra-fine mist dispersion',
        durationMs: 4200,
        imageUrl: '/src/assets/images/video_peel_spray_1795507134108.jpg',
        motionClass: 'animate-ken-burns',
      },
      {
        id: 'peel-2',
        caption: '02 · Clinical frosted glass atomizer',
        durationMs: 3600,
        imageUrl: '/src/assets/images/product_peel_spray_1795507131935.jpg',
        motionClass: 'animate-ken-burns-macro',
      },
      {
        id: 'peel-3',
        caption: '03 · Even, weightless application',
        durationMs: 4000,
        imageUrl: '/src/assets/images/video_peel_spray_1795507134108.jpg',
        motionClass: 'animate-ken-burns',
      },
    ],
    variants: [
      {
        id: 'peel-buy-1',
        label: 'Buy 1 (100 ml)',
        quantityCount: 1,
        price: 38.0,
        compareAtPrice: 48.0,
      },
      {
        id: 'peel-buy-2',
        label: 'Buy 2 (200 ml)',
        badge: 'Popular',
        quantityCount: 2,
        price: 68.0,
        compareAtPrice: 96.0,
      },
      {
        id: 'peel-buy-3',
        label: 'Buy 3 (300 ml)',
        badge: 'Best Value',
        quantityCount: 3,
        price: 94.0,
        compareAtPrice: 144.0,
      },
    ],
    description:
      'An ultra-fine resurfacing mist combining kojic acid and mild botanical exfoliants for even, hands-free coverage on face or body areas needing gentle brightening care.',
    howToUse: [
      'Shake gently and hold the nozzle 15–20 cm away from clean, dry skin.',
      'Close eyes and mist 2–3 even sprays across target areas.',
      'Massage lightly or rinse as directed on the bottle, then apply moisturizer.',
    ],
    details: [
      'Volume: 100 ml / 3.4 fl oz frosted bottle',
      'Nozzle: Precision micro-droplet mist pump',
      'Always pair daytime use with broad-spectrum SPF',
    ],
    featuresHeading: 'Features for even, radiant-looking skin',
    features: [
      {
        title: 'Micro-droplet mist nozzle',
        description: 'Disperses an ultra-fine cloud for uniform coverage without harsh rubbing.',
      },
      {
        title: 'Kojic acid formula',
        description: 'Targeted brightening support designed for uneven surface tone.',
      },
      {
        title: 'Quick hands-free spray',
        description: 'Covers face, neck, and hard-to-reach areas in seconds.',
      },
      {
        title: 'Clean frosted glass bottle',
        description: 'Protects formula stability with a lockable travel-friendly cap.',
      },
    ],
    storyOneTitle: 'Weightless mist. Targeted clarity.',
    storyOneBody:
      'Skip thick, sticky peel gels. This micro-mist atomizer distributes product evenly across skin contours so every application feels clean, fast, and controlled.',
    storyTwoTitle: 'Spray. Wait. Hydrate.',
    storyTwoSteps: [
      'Cleanse skin thoroughly and pat dry with a soft towel.',
      'Close eyes and spray 2–3 pumps from 15–20 cm away.',
      'Follow with your soothing barrier moisturizer and morning SPF.',
    ],
    faqs: [
      {
        question: 'Should I shake the bottle before spraying?',
        answer:
          'Yes, a gentle shake ensures the botanical and kojic ingredients disperse evenly through the micro-mist pump.',
      },
      {
        question: 'Can I use it with other exfoliants?',
        answer:
          'Avoid layering multiple strong acid peels in the same routine; alternate evenings and moisturize well.',
      },
    ],
    metafieldVideoKey: 'custom.peel_shot_demo_video',
  },
  {
    id: 'prod-anti-snore',
    handle: 'anti-snore-mouth-piece',
    title: 'Anti Snore Mouth-Piece',
    shortTitle: 'Anti Snore Mouth-Piece',
    category: 'Sleep Wellness',
    tagline: 'Ergonomic Sleep Wellness',
    subtitle: 'Ergonomic moldable sleep mouthpiece with travel case',
    price: 29.0,
    compareAtPrice: 39.0,
    image: '/src/assets/images/product_sleep_mouthpiece_1795507131224.jpg',
    imageAlt: 'Translucent ergonomic Anti Snore Mouth-Piece beside matte white travel case',
    editorialImage: '/src/assets/images/video_sleep_mouthpiece_1795507133914.jpg',
    editorialImageAlt: 'Anti Snore Mouth-Piece beside matte travel case on calm bedroom nightstand',
    videoPoster: '/src/assets/images/video_sleep_mouthpiece_1795507133914.jpg',
    videoPosterAlt: 'Evening bedroom showcase of the Anti Snore Mouth-Piece and hygienic travel case',
    videoUrl: '/src/assets/videos/demo_sleep_mouthpiece.mp4',
    videoTitle: 'Fit, Material & Nighttime Case',
    videoScenes: [
      {
        id: 'snore-1',
        caption: '01 · Bedside setup with ventilated storage case',
        durationMs: 4200,
        imageUrl: '/src/assets/images/video_sleep_mouthpiece_1795507133914.jpg',
        motionClass: 'animate-ken-burns',
      },
      {
        id: 'snore-2',
        caption: '02 · Soft BPA-free ergonomic silicone contour',
        durationMs: 3600,
        imageUrl: '/src/assets/images/product_sleep_mouthpiece_1795507131224.jpg',
        motionClass: 'animate-ken-burns-macro',
      },
      {
        id: 'snore-3',
        caption: '03 · Custom-molded fit for restful nights',
        durationMs: 4000,
        imageUrl: '/src/assets/images/video_sleep_mouthpiece_1795507133914.jpg',
        motionClass: 'animate-ken-burns',
      },
    ],
    variants: [
      {
        id: 'snore-buy-1',
        label: 'Buy 1 + Travel Case',
        quantityCount: 1,
        price: 29.0,
        compareAtPrice: 39.0,
      },
      {
        id: 'snore-buy-2',
        label: 'Buy 2 + Dual Cases',
        badge: 'Popular',
        quantityCount: 2,
        price: 49.0,
        compareAtPrice: 78.0,
      },
      {
        id: 'snore-buy-3',
        label: 'Buy 3 + 3 Cases',
        badge: 'Best Value',
        quantityCount: 3,
        price: 69.0,
        compareAtPrice: 117.0,
      },
    ],
    description:
      'Crafted from soft, BPA-free medical-grade thermoplastic silicone, the Anti Snore Mouth-Piece features a central breathing airway channel and custom boil-and-bite fitting.',
    howToUse: [
      'Warm briefly in water according to the included fitting card until pliable.',
      'Seat gently over upper and lower teeth to form a comfortable personal impression.',
      'Rinse with cool water each morning and store inside the ventilated matte case.',
    ],
    details: [
      'Material: BPA-free & latex-free medical-grade silicone',
      'Includes: 1 Mouth-Piece + Matte Ventilated Storage Case',
      'Airway Channel: Dual-vented center port for natural breathing',
    ],
    featuresHeading: 'Features for calmer, comfortable nights',
    features: [
      {
        title: 'Custom boil-and-bite fit',
        description: 'Molds smoothly to your individual dental contour in minutes at home.',
      },
      {
        title: 'Soft medical-grade silicone',
        description: 'BPA-free, latex-free flexible material cushions gently through the night.',
      },
      {
        title: 'Central airflow channel',
        description: 'Open front breathing vent supports comfortable nasal or mouth breathing.',
      },
      {
        title: 'Hygienic matte travel case',
        description: 'Compact ventilated case keeps your mouthpiece clean at home or away.',
      },
    ],
    storyOneTitle: 'Quiet comfort built for everyday sleep',
    storyOneBody:
      'Engineered to stay low-profile and unobtrusive, the smooth rounded edges eliminate bulky hardware so you can settle into sleep comfortably.',
    storyTwoTitle: 'Mold once. Rest easy.',
    storyTwoSteps: [
      'Soften briefly in warm water as instructed on the fitting guide.',
      'Bite gently for 30 seconds to lock in your custom dental impression.',
      'Rinse clean after each night and keep protected in the matte case.',
    ],
    faqs: [
      {
        question: 'Can I re-mold the mouthpiece if the first fit feels loose?',
        answer:
          'Yes, it can be gently re-warmed and molded again following the fitting instructions for a snug, comfortable seat.',
      },
      {
        question: 'Does it include a storage case?',
        answer:
          'Every Anti Snore Mouth-Piece ships with a dedicated matte white hygienic travel case.',
      },
    ],
    metafieldVideoKey: 'custom.mouthpiece_demo_video',
  },
];

export function formatMoney(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function getDiscountPercent(price: number, compareAtPrice?: number): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
