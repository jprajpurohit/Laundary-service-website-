import { LaundryServiceDetail, ServiceItem, OrderRecord, StainCareItem, ReviewItem } from '../types';

export const LAUNDRY_SERVICES: LaundryServiceDetail[] = [
  {
    id: 'wash-fold',
    title: 'Daily Wash & Fold',
    shortDesc: 'Everyday clothing sorted by color, washed with gentle eco-detergents, tumble-dried, and folded crisp.',
    longDesc: 'Our most popular hassle-free service. We weigh your laundry, sort by light and dark fabrics, wash in temperature-regulated ozone water, tumble dry on medium heat, and deliver your clothes packed in breathable protective bags.',
    image: '/src/assets/images/service_wash_fold_1793869086109.jpg',
    features: ['Hypoallergenic plant detergents', 'Whites & colors separated', 'Pair-matched socks guarantee', 'Fluff & crisp fold'],
    startingPrice: '$2.20 / lb (or $18 / bag)',
    bestFor: 'T-shirts, denim, socks, gym wear, pajamas, underwear'
  },
  {
    id: 'dry-cleaning',
    title: 'Eco-Dry Cleaning',
    shortDesc: 'Solvent-safe gentle dry cleaning for delicate designer garments, tailored suits, and silks.',
    longDesc: 'Zero harsh chemicals or pungent petroleum odors. We utilize advanced liquid silicone and hydrocarbon gentle solutions that protect delicate fibers, preserve vibrant dyes, and prolong the lifespan of your luxury garments.',
    image: '/src/assets/images/service_dry_cleaning_1793869084023.jpg',
    features: ['Zero toxic PERC chemicals', 'Hand-steamed and shaped', 'Recyclable wooden hangers', 'Pre-inspected collar & button check'],
    startingPrice: '$7.50 / garment',
    bestFor: 'Wool coats, business suits, silk blouses, blazers, evening dresses'
  },
  {
    id: 'steam-press',
    title: 'Steam Press & Ironing',
    shortDesc: 'Precision hand-pressing with high-pressure dry steam for razor-sharp creases and smooth drapes.',
    longDesc: 'Say goodbye to wrinkled office shirts and creased trousers. Our press specialists steam-relax fibers and iron each piece by hand on vacuum boards, keeping fabrics crisp without burning or shine.',
    image: '/src/assets/images/service_steam_press_1793869085916.jpg',
    features: ['High-pressure steam sanitization', 'Zero scorching or fabric shine', 'Hung or folded options', 'Collar stays provided'],
    startingPrice: '$3.50 / item',
    bestFor: 'Dress shirts, pleated skirts, dress trousers, linen wear'
  },
  {
    id: 'bedding-linens',
    title: 'Duvet & Bedding Spa',
    shortDesc: 'Deep thermal sanitization for bulky down comforters, quilts, mattress pads, and plush hotel towels.',
    longDesc: 'Large-capacity industrial washers treat large beddings that do not fit in domestic machines. Eliminates 99.9% of dust mites and allergens while preserving down loftiness.',
    image: '/src/assets/images/hero_laundry_studio_1793869084305.jpg',
    features: ['Anti-dust mite sanitization', 'High-loft down revival', 'Hypoallergenic rinse', 'Aroma-free or gentle lavender'],
    startingPrice: '$16.00 / piece',
    bestFor: 'King & queen comforters, duvets, wool blankets, pillow restoration'
  }
];

export const SERVICE_ITEMS: ServiceItem[] = [
  // Wash & Fold
  {
    id: 'wf-bag-small',
    name: 'Small Bag Wash & Fold (up to 12 lbs)',
    category: 'wash-fold',
    price: 18.00,
    unit: 'bag',
    description: 'Perfect for 1 person for a week (approx. 15-20 casual items)',
    turnaroundHours: 24,
    popular: true,
    ecoFriendly: true
  },
  {
    id: 'wf-bag-large',
    name: 'Family Bag Wash & Fold (up to 25 lbs)',
    category: 'wash-fold',
    price: 32.00,
    unit: 'bag',
    description: 'Great for households, gym gear, towels & everyday essentials',
    turnaroundHours: 24,
    ecoFriendly: true
  },
  {
    id: 'wf-per-lb',
    name: 'By Weight Wash & Fold',
    category: 'wash-fold',
    price: 2.20,
    unit: 'lb',
    description: 'Billed accurately upon check-in with digital weigh scale',
    turnaroundHours: 24,
    ecoFriendly: true
  },

  // Dry Cleaning
  {
    id: 'dc-shirt',
    name: 'Men / Women Dress Shirt',
    category: 'dry-cleaning',
    price: 4.50,
    unit: 'item',
    description: 'Inspected, stain pre-treated, pressed & hung on wooden hanger',
    turnaroundHours: 24,
    popular: true
  },
  {
    id: 'dc-suit-2pc',
    name: 'Two-Piece Suit (Jacket + Pants)',
    category: 'dry-cleaning',
    price: 15.00,
    unit: 'set',
    description: 'Gentle solvent-free care, structured shoulder mold pressing',
    turnaroundHours: 48,
    popular: true
  },
  {
    id: 'dc-dress',
    name: 'Dress / Evening Gown',
    category: 'dry-cleaning',
    price: 13.50,
    unit: 'item',
    description: 'Delicate handling of silk, chiffon, lace, and embellishments',
    turnaroundHours: 48
  },
  {
    id: 'dc-wool-coat',
    name: 'Overcoat / Trench Coat / Blazer',
    category: 'dry-cleaning',
    price: 16.00,
    unit: 'item',
    description: 'Deep fiber conditioning, lint removal, water-repellent finishing',
    turnaroundHours: 48
  },
  {
    id: 'dc-sweater',
    name: 'Cashmere / Wool Knit Sweater',
    category: 'dry-cleaning',
    price: 7.00,
    unit: 'item',
    description: 'Pill de-fuzzing and gentle flat reshape drying',
    turnaroundHours: 24
  },

  // Ironing
  {
    id: 'iron-shirt',
    name: 'Shirt Steam Press Only',
    category: 'ironing',
    price: 3.00,
    unit: 'item',
    description: 'Clean items pressed crisp and wrinkle-free with collar stays',
    turnaroundHours: 24
  },
  {
    id: 'iron-trousers',
    name: 'Trousers / Slacks Press',
    category: 'ironing',
    price: 4.00,
    unit: 'item',
    description: 'Precision center crease or flat press according to preference',
    turnaroundHours: 24
  },
  {
    id: 'iron-linen-shirt',
    name: 'Linen Shirt / Kurta Press',
    category: 'ironing',
    price: 4.50,
    unit: 'item',
    description: 'High-temp moisture-steam treatment for stubborn linen creases',
    turnaroundHours: 24
  },

  // Bedding & Linens
  {
    id: 'bed-duvet',
    name: 'Down / Fiber Comforter (Queen/King)',
    category: 'bedding-linens',
    price: 24.00,
    unit: 'item',
    description: 'Deep ozone thermal wash and sanitizing high-loft tumbler',
    turnaroundHours: 48,
    popular: true
  },
  {
    id: 'bed-sheets-set',
    name: 'Bed Sheet Set (Fitted + Flat + 2 Pillowcases)',
    category: 'bedding-linens',
    price: 16.00,
    unit: 'set',
    description: 'Washed in hot water, dried, steam-ironed flat and folded',
    turnaroundHours: 24
  },
  {
    id: 'bed-pillow',
    name: 'Pillow Restoration & Sanitization',
    category: 'bedding-linens',
    price: 9.00,
    unit: 'item',
    description: 'Anti-allergen ultraviolet treatment and fluffing',
    turnaroundHours: 24
  }
];

export const DEMO_ORDERS: Record<string, OrderRecord> = {
  'LND-8492': {
    orderId: 'LND-8492',
    customerName: 'J. Prajpurohit',
    phone: '+1 (555) 234-8901',
    address: '742 Evergreen Terrace, Suite 4B',
    pickupDate: 'Today, Nov 5',
    pickupTimeSlot: '9:00 AM - 11:00 AM',
    deliveryDate: 'Tomorrow, Nov 6 (Express 24h)',
    serviceType: 'Eco-Dry Cleaning & Steam Press',
    items: [
      { name: 'Men Dress Shirt (Hand Press)', qty: 3 },
      { name: 'Two-Piece Suit (Navy Wool)', qty: 1 },
      { name: 'Cashmere Knit Sweater', qty: 1 }
    ],
    totalAmount: 35.50,
    status: 'washing',
    driverName: 'Marcus Ramirez (Courier #14)',
    driverPhone: '+1 (555) 891-2300',
    specialInstructions: 'Please use unscented hypoallergenic wash. Ring doorbell twice upon arrival.',
    timeline: [
      {
        step: 'placed',
        title: 'Order Scheduled',
        description: 'Scheduled online with 24-hour express turnaround.',
        timestamp: 'Nov 5, 08:15 AM',
        completed: true
      },
      {
        step: 'picked_up',
        title: 'Collected by Courier',
        description: 'Driver Marcus collected 5 garments in waterproof eco-bag.',
        timestamp: 'Nov 5, 09:40 AM',
        completed: true
      },
      {
        step: 'inspecting',
        title: 'Digital Barcode Inspection',
        description: 'Items photographed, fabric care tags logged, pre-treatment spots marked.',
        timestamp: 'Nov 5, 10:25 AM',
        completed: true
      },
      {
        step: 'washing',
        title: 'Ozone Washing & Treatment in Progress',
        description: 'Washing in gentle liquid silicone bath with color lock.',
        timestamp: 'Nov 5, 11:50 AM',
        completed: false,
        current: true
      },
      {
        step: 'pressing',
        title: 'Steam Finishing & Hand Creasing',
        description: 'Individual hand-ironing on vacuum boards and wooden hanger mounting.',
        timestamp: 'Estimated Nov 5, 3:30 PM',
        completed: false
      },
      {
        step: 'out_for_delivery',
        title: 'Out for Doorstep Delivery',
        description: 'En route with electric courier van.',
        timestamp: 'Estimated Nov 6, 9:30 AM',
        completed: false
      },
      {
        step: 'delivered',
        title: 'Delivered Fresh to Doorstep',
        description: 'Handed to resident or contactless drop with photo proof.',
        timestamp: 'Estimated Nov 6, 10:30 AM',
        completed: false
      }
    ]
  },
  'LND-9104': {
    orderId: 'LND-9104',
    customerName: 'Sarah Jenkins',
    phone: '+1 (555) 774-1120',
    address: '128 Ocean View Blvd, Apt 12',
    pickupDate: 'Nov 4',
    pickupTimeSlot: '2:00 PM - 4:00 PM',
    deliveryDate: 'Today, Nov 5',
    serviceType: 'Daily Wash & Fold (Family Size)',
    items: [
      { name: 'Family Bag Wash & Fold (22 lbs)', qty: 1 },
      { name: 'Queen Down Comforter Spa', qty: 1 }
    ],
    totalAmount: 56.00,
    status: 'out_for_delivery',
    driverName: 'Elena Rostova (Courier #08)',
    driverPhone: '+1 (555) 432-8819',
    specialInstructions: 'Contactless delivery, please leave by front gate.',
    timeline: [
      {
        step: 'placed',
        title: 'Order Scheduled',
        description: 'Confirmed online with express wash & fold.',
        timestamp: 'Nov 4, 11:20 AM',
        completed: true
      },
      {
        step: 'picked_up',
        title: 'Collected by Courier',
        description: 'Collected laundry bag and bedding.',
        timestamp: 'Nov 4, 02:45 PM',
        completed: true
      },
      {
        step: 'inspecting',
        title: 'Inspection & Weight Checked',
        description: '22 lbs wash & fold + 1 queen comforter.',
        timestamp: 'Nov 4, 03:30 PM',
        completed: true
      },
      {
        step: 'washing',
        title: 'Deep Thermal Sanitization',
        description: 'Completed in allergen-safe eco cycle.',
        timestamp: 'Nov 4, 05:40 PM',
        completed: true
      },
      {
        step: 'pressing',
        title: 'Fluff, Fold & Packaging',
        description: 'Completed and packed in recyclable moisture-proof wrapping.',
        timestamp: 'Nov 5, 08:15 AM',
        completed: true
      },
      {
        step: 'out_for_delivery',
        title: 'Out for Doorstep Delivery',
        description: 'Elena is 4 stops away from your address.',
        timestamp: 'Nov 5, 10:30 AM',
        completed: false,
        current: true
      },
      {
        step: 'delivered',
        title: 'Delivered Fresh to Doorstep',
        description: 'Contactless drop with photo verification.',
        timestamp: 'Estimated Nov 5, 11:15 AM',
        completed: false
      }
    ]
  }
};

export const STAIN_GUIDE_DATA: StainCareItem[] = [
  {
    id: 'coffee',
    name: 'Coffee & Espresso',
    iconName: 'Coffee',
    quickDos: 'Blot immediately with cold water and a clean white cloth or paper towel. Keep the stain moist.',
    donts: 'Do NOT rub aggressively or apply hot water; heat permanently bakes tannin proteins into fibers.',
    proTreatment: 'We apply cold bio-enzyme neutralizers followed by mild acidic rinse to lift tannic acids completely.',
    severity: 'Moderate'
  },
  {
    id: 'red-wine',
    name: 'Red Wine',
    iconName: 'Wine',
    quickDos: 'Dab (never scrub) with sparkling water or club soda. Sprinkle a pinch of table salt to absorb excess liquid.',
    donts: 'Do NOT use white wine or chemical bleaches which weaken delicate fibers and cause yellow halos.',
    proTreatment: 'Ozone oxidative micro-treatment safely dissolves chromophore dye pigments without fabric distress.',
    severity: 'Urgent'
  },
  {
    id: 'oil-grease',
    name: 'Cooking Oil & Butter',
    iconName: 'Droplet',
    quickDos: 'Dust with cornstarch, talcum, or chalk powder to draw out lipids for 10 minutes before shaking off.',
    donts: 'Do NOT rinse with water first, as oil is hydrophobic and will spread outward into surrounding fibers.',
    proTreatment: 'Targeted ultrasonic grease surfactant bath breaks ester chains and dissolves greasy stains completely.',
    severity: 'Moderate'
  },
  {
    id: 'ink',
    name: 'Ballpoint Ink & Marker',
    iconName: 'PenTool',
    quickDos: 'Place paper towel underneath and dab gently with rubbing alcohol on a cotton swab from the outer edge.',
    donts: 'Do NOT throw into regular domestic washer; drying will set ink resin permanently into weave.',
    proTreatment: 'Solvent capillary extraction draws color pigments upward into specialized blotting vacuum tables.',
    severity: 'Urgent'
  },
  {
    id: 'sweat-collar',
    name: 'Collar & Underarm Yellowing',
    iconName: 'Sparkles',
    quickDos: 'Pre-treat collars with a drop of liquid dish soap diluted in lukewarm water before handing to us.',
    donts: 'Do NOT use chlorine bleach, as chlorine reacts with aluminum antiperspirants and turns yellow stains darker.',
    proTreatment: 'Protease enzyme soak breaks down protein-salt bonds followed by oxygen brightener bath.',
    severity: 'Light'
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Priya Sharma',
    location: 'Downtown Metro',
    rating: 5,
    service: 'Eco-Dry Cleaning',
    comment: 'I sent my vintage silk saree and wool winter coat. Both returned looking brand new without that chemical solvent smell! The online tracker kept me updated every step of the way.',
    date: '2 days ago',
    verified: true,
    turnaround: '24h Express'
  },
  {
    id: 'rev-2',
    author: 'David Chen',
    location: 'Oakridge District',
    rating: 5,
    service: 'Daily Wash & Fold',
    comment: 'As a busy software engineer, doing 3 loads of laundry a week was draining. Their wash & fold is neatly bundled, socks are paired, and the driver arrived right on time.',
    date: '1 week ago',
    verified: true,
    turnaround: 'Same-day Pickup'
  },
  {
    id: 'rev-3',
    author: 'Elena Gomez',
    location: 'West End',
    rating: 5,
    service: 'Steam Press & Ironing',
    comment: 'The collar stays and crisp lines on my husband’s dress shirts are unmatched. Wooden hangers and zero shine marks on dark navy pants. Truly 5-star hotel quality.',
    date: '2 weeks ago',
    verified: true,
    turnaround: '24h Standard'
  },
  {
    id: 'rev-4',
    author: 'Marcus Vance',
    location: 'Harbor Heights',
    rating: 5,
    service: 'Duvet & Bedding Spa',
    comment: 'Cleaned a massive king goose-down comforter that wouldn’t fit my apartment washer. Came back ultra fluffy, sanitized, and smelling of gentle lavender.',
    date: '3 weeks ago',
    verified: true,
    turnaround: '48h Deep Clean'
  }
];

export const FAQ_DATA = [
  {
    q: 'How does pickup and doorstep delivery work?',
    a: 'Simply choose your preferred 1-hour time window on our website. Our uniformed courier arrives with clean reusable laundry bags. Once cleaned, hand-pressed, and inspected, we deliver your fresh clothes back to your door within 24 to 48 hours.'
  },
  {
    q: 'What is your turnaround time for express laundry?',
    a: 'Our standard wash & fold turnaround is 24 hours. For express orders booked before 10:00 AM, same-day evening delivery is available for a small express surcharge. Eco-dry cleaning typically completes within 24–48 hours.'
  },
  {
    q: 'Do you separate whites and dark colors?',
    a: 'Yes, absolutely! Every single wash & fold order is meticulously inspected and sorted into darks, lights, and whites, and washed using customized water temperatures and fabric-appropriate spin speeds.'
  },
  {
    q: 'What detergents and cleaning solutions do you use?',
    a: 'We strictly use 100% biodegradable, hypoallergenic, plant-derived detergents that are gentle on sensitive skin and safe for babies and pets. We never use harsh petroleum solvents or carcinogenic PERC.'
  },
  {
    q: 'What if I am not home during the delivery window?',
    a: 'You can specify contactless delivery instructions (e.g., leave with front desk concierge, porch box, or behind screen door). Our driver takes a photo upon drop-off and sends an instant SMS confirmation.'
  },
  {
    q: 'Is there a minimum order amount for free delivery?',
    a: 'Pickup and delivery are 100% FREE for all orders over $30. For orders under $30, a standard low flat courier fee of $4.99 applies.'
  }
];
