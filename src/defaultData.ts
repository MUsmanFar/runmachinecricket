import { Service, Testimonial, PricingLine, LegalPageData, HomepageContent, BusinessSettings } from "./types";

export const defaultSettings: BusinessSettings = {
  id: "general",
  businessName: "Run Machine Cricket",
  phone: "+1 (856) 287-3131",
  whatsApp: "18562873131",
  email: "runmachinecricket49@gmail.com",
  notificationEmail: "runmachinecricket49@gmail.com",
  address: "Philadelphia Suburbs",
  facebookUrl: "https://facebook.com/runmachinecricket",
  instagramUrl: "https://instagram.com/runmachinecricket"
};

export const defaultServices: Service[] = [
  {
    id: "cricket-bat-repairs",
    title: "Cricket Bat Repairs",
    description: "General structural diagnostics and spot mending. We treat fiber tears, secure loose surface splinters, repair minor shoulder fissures, and restore the bat's natural swing profile using elite workspace clamping techniques.",
    startingPrice: 25,
    duration: "2 - 3 Days",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.36.39 PM.jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.25 PM (1).jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (1).jpeg",
    faqs: [
      { question: "What is general mending suitable for?", answer: "Perfect for lightweight surface splinters or minor split back shoulders before they expand." }
    ]
  },
  {
    id: "surface-crack-repair",
    title: "Surface Crack Repair",
    description: "Multi-point fissure sealing. We clear dirt from surface cracks, inject high-grade flexible polymer wood-bonding epoxy, clamp the cleft under high hydraulic pressure, and finish with a micro-sanded smooth layer.",
    startingPrice: 20,
    duration: "2 Days",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.36.39 PM (1).jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.25 PM (2).jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (2).jpeg",
    faqs: [
      { question: "Are surface cracks normal?", answer: "Yes, they are common playing battle scars, but they must be glued quickly to prevent catastrophic snapping." }
    ]
  },
  {
    id: "full-refurbishment",
    title: "Full Refurbishment",
    description: "Our hallmark signature transformation. We strip old stickers, sand back the entire willow blade, lift minor playing dents, seal cracks, fit a new premium grip, apply dual-cycle cold-press linseed oil, and hand-buff for an ultra-premium satin shine.",
    startingPrice: 50,
    duration: "4 - 5 Days",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.36.39 PM (2).jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.25 PM.jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (3).jpeg",
    faqs: [
      { question: "Are new stickers included?", answer: "We sand off old stickers and can either preserve your clear wood look, apply generic protectives, or mount custom stickers supplied by you." }
    ]
  },
  {
    id: "laser-name-engraving",
    title: "Laser Name Engraving",
    description: "Personalize your weapon of choice. Using our precision digital laser engraving system, we can carve your name, initials, or squad number directly into the wood grain without affecting the bat's structural density or integrity.",
    startingPrice: 15,
    duration: "1 Day",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.36.40 PM.jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.26 PM.jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (4).jpeg",
    faqs: [
      { question: "Does engraving hurt the bat's performance?", answer: "Not at all. The laser etching depth is calibrated to less than 0.2mm, keeping the sweet spot and power fully intact." }
    ]
  },
  {
    id: "weight-reduction",
    title: "Weight Reduction & Tuning",
    description: "Fine-tune your bat's pickup. We selectively shave wood from key non-structural points along the spine or scalloped cavity, shifting the center of balance upward to make your bat feel up to 2 ounces lighter in the hands.",
    startingPrice: 40,
    duration: "3 Days",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.37.02 PM.jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.28 PM.jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (5).jpeg",
    faqs: [
      { question: "How much weight can you safely shave off?", answer: "Usually 1 to 3 ounces. We always balance structural safety with the optimum pickup profile." }
    ]
  },
  {
    id: "hand-knocking-in",
    title: "Hand Knocking In",
    description: "The traditional, gold-standard preparation. Our skilled craftsmen manually strike the bat over 10,000 times using a heavy hickory mallet, carefully modeling the rounded edges, toe section, and sweet spot to guarantee match-ready hardening.",
    startingPrice: 30,
    duration: "3 - 4 Days",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM.jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.30 PM.jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (1).jpeg",
    faqs: [
      { question: "Why is hand-knocking preferred over machine only?", answer: "Hand knocking allows our craftsman to feel and adapt to soft grain pockets, ensuring complete custom protection." }
    ]
  },
  {
    id: "machine-knocking-in",
    title: "Machine Knocking In",
    description: "Rapid mechanized fiber preparation. We load your bat into our customized automated knocking rig, executing pre-calculated strikes that safely condense the outer willow layers for deep defense against seam marks.",
    startingPrice: 25,
    duration: "1 - 2 Days",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (1).jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.25 PM (1).jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (2).jpeg",
    faqs: [
      { question: "Is machine hitting completely safe?", answer: "Yes, our automated rig is specifically calibrated to strike with the exact pneumatic force suitable for premium English willow." }
    ]
  },
  {
    id: "machine-pressing",
    title: "Machine Pressing",
    description: "Our high-tech roll pressing procedure. We feed the blade through our custom-calibrated wood pressing machine. This process compresses new or soft willow fibers uniformly, hardening the face and maximizing the spring/ping effect.",
    startingPrice: 20,
    duration: "1 Day",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (2).jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.25 PM (2).jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (3).jpeg",
    faqs: [
      { question: "What is the purpose of pressing?", answer: "Pressing compresses wood cells and brings back natural resilience, crucial for a high-performing sweet spot." }
    ]
  },
  {
    id: "re-handle",
    title: "Re-Handle Service",
    description: "Is your bat handle clicked or loose? We surgically pull out your existing damaged handle and slot in a professional-grade concentric triple-spring Singapore cane handle, wrapped with cork damping layer for maximum shock absorption.",
    startingPrice: 35,
    duration: "3 - 4 Days",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (3).jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.25 PM.jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (4).jpeg",
    faqs: [
      { question: "How do I know if my handle is cracked?", answer: "A loose handle often clicks distinctively when you strike ball shadows, or has a small twist when holding." }
    ]
  },
  {
    id: "handle-re-binding",
    title: "Handle Re-Binding",
    description: "Enhance your grip structure. We strip the outer layer, tightly bind the cane handle with heavy-duty structural thread under high torque, and double-seal it with professional water-resistant shellac compound.",
    startingPrice: 15,
    duration: "1 - 2 Days",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (4).jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.26 PM.jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (5).jpeg",
    faqs: [
      { question: "What is handle binding?", answer: "The string wrapping under your rubber grip. It binds the cane pieces together tightly to preserve structural flex." }
    ]
  },
  {
    id: "bat-oiling",
    title: "Bat Oiling",
    description: "Nourishment for high-performance wood. We apply two precise, hand-rubbed cycles of raw, double-filtered English linseed oil to retain natural moisture and lock out dry-cracking split vulnerabilities.",
    startingPrice: 10,
    duration: "1 - 2 Days",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (5).jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.28 PM.jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM.jpeg",
    faqs: [
      { question: "Can a bat be over-oiled?", answer: "Yes! Over-oiling waterlogs the wood cell fibers making the bat feel heavy and dead inside. We use calibrated cycles." }
    ]
  },
  {
    id: "re-stickering",
    title: "Re-Stickering Service",
    description: "Give your bat a clean cosmetic transformation. We remove legacy sticker glue, compound sand the wood clean, and apply brand new premium dynamic protective decals or customized stickering supplied by you.",
    startingPrice: 20,
    duration: "1 - 2 Days",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.36.39 PM.jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.30 PM.jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (1).jpeg",
    faqs: [
      { question: "Can I supply my own branded decals?", answer: "Absolutely. We will sand, align, and professionally dry-seal your supplied stickers to avoid bubbles or lifting." }
    ]
  },
  {
    id: "edge-grafts-rolling",
    title: "Edge Grafts & Rolling",
    description: "Mend heavily shattered edges. We scoop out dead, soft impact wood from the edge splits, graft a high-density raw willow insert block, seal it under extreme pressure, and custom-roll the margins to match the original curvature.",
    startingPrice: 25,
    duration: "3 Days",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.36.39 PM (1).jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.25 PM (1).jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (2).jpeg",
    faqs: [
      { question: "Is a grafted edge as strong as the original?", answer: "Yes, our cross-graft gluing creates a bond stronger than the surrounding wood cells, returning the rebound bounce." }
    ]
  },
  {
    id: "toe-guard-fitting",
    title: "Toe Guard Fitting",
    description: "Guard against yorkers and water swell. We clean the base of the bat, treat it, and fit a professional-grade vulcanized rubber toe guard block using industrial water-resistant adhesives. Formulated for ultimate floor protection.",
    startingPrice: 10,
    duration: "1 Day",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.36.39 PM (2).jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.25 PM (2).jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (3).jpeg",
    faqs: [
      { question: "Why fit a toe guard?", answer: "It seals the raw grain from absorbing damp turf moisture when standing at the crease, preventing splitting." }
    ]
  },
  {
    id: "re-gripping",
    title: "Re-Gripping Service",
    description: "Fresh premium rubber handle installation. We strip the dry handle rubber and reload it with a pro-approved high-tactility octopus or dynamic matrix rubber pattern. Maximizes comfort and swing control.",
    startingPrice: 8,
    duration: "1 Day",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.36.40 PM.jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.25 PM.jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (4).jpeg",
    faqs: [
      { question: "How often should I change my grip?", answer: "For ideal control, we recommend fitting a fresh grip at the start of every season, or whenever the rubber hardens." }
    ]
  },
  {
    id: "thread-binding",
    title: "Thread Binding",
    description: "Reinforce fine surface splinters. We tightly bind weak wood zones along the face or edge borders with high-strength composite thread, creating structural sleeves that stop splits from expanding under load.",
    startingPrice: 12,
    duration: "1 Day",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.37.02 PM.jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.26 PM.jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (5).jpeg",
    faqs: [
      { question: "Will the thread alter the ping?", answer: "We use ultra-slim Kevlar threads that bind wood fibers without deadening the rebound velocity." }
    ]
  },
  {
    id: "shoulder-repairs",
    title: "Shoulder Repairs",
    description: "Meticulous shoulder cleft stabilization. Impact or dropping can split the thin shoulder profile. We clean the neck region, apply flexible wood resin, clamp it, and bind the shoulders cleanly to restore maximum stiffness.",
    startingPrice: 25,
    duration: "2 - 3 Days",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM.jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.28 PM.jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM.jpeg",
    faqs: [
      { question: "Can shoulder splitting ruin the bat?", answer: "Left untreated, the handle joint will separate. Repairing it quickly completely protects your bat's longevity." }
    ]
  },
  {
    id: "full-service",
    title: "Full Service Elite Integration",
    description: "The complete luxury workshop overhaul. Includes fully mending superficial fissures, full-surface roll pressing, triple oiling, brand-new custom toe guard, professional handle re-binding, a fresh premium grip, and mirror buffing.",
    startingPrice: 75,
    duration: "5 - 6 Days",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.36.39 PM.jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.25 PM (1).jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (1).jpeg",
    faqs: [
      { question: "Who is this premium overhaul package for?", answer: "Highly recommended for professional players or cricketers looking to give their prized heirloom bats another life." }
    ]
  },
  {
    id: "end-of-season-service",
    title: "End Of Season Service",
    description: "Bespoke hibernation preparation. We clean of dirt and grass marks, extract embedded moisture, lightly seal surface fissures, oil the blade, and store it in our clinical climate-controlled curing room to prevent storage wood rot.",
    startingPrice: 45,
    duration: "3 Days",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.36.39 PM (1).jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.30 PM.jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (2).jpeg",
    faqs: [
      { question: "Why is post-season storage treatment important?", answer: "Leaving bats with season dampness trapped inside over winter causes wood decay and fiber embrittlement." }
    ]
  },
  {
    id: "pre-season-service",
    title: "Pre-Season Service",
    description: "Wake your bat up for play. We remove winter oxidation, execute a light machine roll-pressing process to re-activate the willow's springiness, apply linseed sealing, fit a fresh grip and custom face scuff protector.",
    startingPrice: 45,
    duration: "3 Days",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.36.39 PM (2).jpeg",
    beforeImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.25 PM (2).jpeg",
    afterImageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (3).jpeg",
    faqs: [
      { question: "Does my bat need a wake up session?", answer: "Definitely. Cured winter timber becomes dry and stiff. Re-pressing/conditioning is vital to avoid sudden shock cracks." }
    ]
  }
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Alex Richardson",
    rating: 5,
    review: "Sent my snapped Gray-Nicolls bat in for a cane handle replacement and full refurbishment. I'm absolutely speechless. The repair is seamless, the pickup feels better than the original, and it is finished with a glass-like buff. Run Machine Cricket are true masters of the craft!",
    batModel: "Gray-Nicolls Legend",
    serviceReceived: "Handle Replacement & Refurb",
    date: "June 14, 2026",
    isFeatured: true
  },
  {
    id: "t2",
    name: "Mohammad Zahid",
    rating: 5,
    review: "Outstanding work on my SG Player Edition bat. It had a severe edge split and dry toe swelling. They fixed the cracks, bound them with composite wraps, and fitted a premium toe guard. Tested it in the nets yesterday—ping is fully intact and the timber sounds solid as a rock.",
    batModel: "SG Kookaburra Player Ed.",
    serviceReceived: "Toe Repair & Edge Binding",
    date: "June 18, 2026",
    isFeatured: true
  },
  {
    id: "t3",
    name: "Marcus Davies",
    rating: 5,
    review: "Had a brilliant experience using their nationwide shipping service. Sent my worn-out Kookaburra bat on Monday and received it back fully refurbished, freshly oiled, fitted with a custom scuff sleeve and a brand new octopus grip on Friday. The pricing is remarkably fair for this level of elite craftsmanship.",
    batModel: "Kookaburra Ghost Pro",
    serviceReceived: "Full Premium Refurbishment",
    date: "May 29, 2026",
    isFeatured: true
  }
];

export const defaultPricingTable: PricingLine[] = [
  // Workshop Classics
  { id: "p1", serviceGroup: "Workshop Classics", serviceName: "Toe Guard Fitting", price: "$10", priceType: "Starting From" },
  { id: "p2", serviceGroup: "Workshop Classics", serviceName: "Re-Gripping Service", price: "$8", priceType: "Fixed" },
  { id: "p3", serviceGroup: "Workshop Classics", serviceName: "Bat Oiling & Sealing", price: "$10", priceType: "Fixed" },
  { id: "p4", serviceGroup: "Workshop Classics", serviceName: "Thread Binding", price: "$12", priceType: "Fixed" },
  { id: "p5", serviceGroup: "Workshop Classics", serviceName: "Laser Name Engraving", price: "$15", priceType: "Fixed" },

  // Structural Services
  { id: "p6", serviceGroup: "Structural Services", serviceName: "Re-Handle (Singapore Cane)", price: "$35", priceType: "Starting From" },
  { id: "p7", serviceGroup: "Structural Services", serviceName: "Handle Re-Binding", price: "$15", priceType: "Fixed" },
  { id: "p8", serviceGroup: "Structural Services", serviceName: "Surface Crack Repair", price: "$20", priceType: "Starting From" },
  { id: "p9", serviceGroup: "Structural Services", serviceName: "Edge Grafts & Rolling", price: "$25", priceType: "Custom Quote" },
  { id: "p10", serviceGroup: "Structural Services", serviceName: "Shoulder Repairs", price: "$25", priceType: "Custom Quote" },

  // Premium Bundles
  { id: "p11", serviceGroup: "Premium Bundles", serviceName: "Full Refurbishment Pack", price: "$50", priceType: "Starting From" },
  { id: "p12", serviceGroup: "Premium Bundles", serviceName: "Full Service Elite Overhaul", price: "$75", priceType: "Starting From" },
  { id: "p13", serviceGroup: "Premium Bundles", serviceName: "End Of Season Care", price: "$45", priceType: "Fixed" },
  { id: "p14", serviceGroup: "Premium Bundles", serviceName: "Pre-Season Care Package", price: "$45", priceType: "Fixed" }
];

export const defaultLegalPages: LegalPageData[] = [
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    content: "At Run Machine Cricket, we value and respect your privacy. This Privacy Policy details how we collect, protect, and process your client information when you use our bat repair booking system.\n\n### Information We Collect\nWe collect information essential for repairing and returning your high-end cricket bats, specifically:\n- Full Name and Email Address\n- Phone and WhatsApp Numbers\n- Postal Address (City, State, Zip, Country) for returning couriers\n- Descriptions and images of your cricket bats.\n\n### How We Use Your Data\nYour data is utilized strictly for:\n1. Generating accurate price quotes and repair estimates.\n2. Arranging door-to-door couriers and shipping.\n3. Contacting you regarding your bat's progress via professional WhatsApp updates.\n\nWe NEVER sell, trade, or distribute your customer data to marketing agencies or third parties. All authentication data is handled securely through Google Firebase Auth layers.",
    lastUpdated: "June 2026"
  },
  {
    id: "terms-conditions",
    title: "Terms & Conditions",
    content: "Welcome to Run Machine Cricket. By booking a repair, requesting a quote, or shipping your equipment to our workshop, you agree to comply with the following professional terms:\n\n### 1. Bat Diagnostics & Pre-Screening\nOur craftsmen inspect every bat upon arrival. If we uncover secondary severe structural issues (such as deep rotted core wetness, extensive internal splits, or termite infestations) that make repair unsafe or impractical, we will pause and contact you immediately to discuss alternatives.\n\n### 2. Turnaround & Service Timelines\nWhile we strive for extreme precision and fast turnaround (e.g., 3 to 5 business days), wood composite epoxies and curing linseeds require environment-specific times. Timelines shared during booking are targets, and we will update you if adjustments are necessary to ensure the structural longevity of your willow.\n\n### 3. Playing Risks on Wood\nCricket bats are subjected to extreme high-velocity impacts. While our structural handle replacements and crack bindings are calculated to perform long-term, wood is a organic, natural material. We cannot warrant against subsequent cracks caused by mis-hit balls, severe yorkers, or low-quality balls outside our control.",
    lastUpdated: "June 2026"
  },
  {
    id: "refund-policy",
    title: "Refund & Warranty Policy",
    content: "We stand behind our craftsmanship and work with ultimate passion. Our policies detail your refund boundaries:\n\n### 1. Workmanship Quality Guarantee\nIf you receive a repaired bat and there is a direct defect in the workmanship (e.g., the replacement handle clicks immediately, or the toe guard adhesive splits pre-play), we will recall the bat at our cost and repair it immediately or issue a full service refund.\n\n### 2. Canceled/Aborted Orders\nIf you book a repair and decide to cancel before shipping your bat, we issue a 100% refund. If the bat is already at our workshop and we diagnosed it but you decide not to proceed, you will only be charged the courier return shipping fee.",
    lastUpdated: "June 2026"
  },
  {
    id: "shipping-policy",
    title: "Shipping & Return Logistics Policy",
    content: "We operate a high-reliability nationwide repair logistics network. Detailed below is our shipping strategy:\n\n### 1. Sending Your Bat\nWhen packing your bat, please use a protective padded bubble envelope or bat box. Clearly print your Booking ID on the package. We recommend using a registered, tracked service such as Royal Mail Tracked, DHL, or DPD to ensure secure transit.\n\n### 2. Return Transit\nOnce the master craftsman signs off on the quality inspection, we box your bat using professional heavy-duty impact sleeves. We ship back to you via our registered premium couriers with dynamic track numbers, which are instantly messaged to you.",
    lastUpdated: "June 2026"
  },
  {
    id: "cookie-policy",
    title: "Cookie & Preference Policy",
    content: "Our system uses necessary light cookies strictly to maintain user dashboard session variables and login states securely through Google Firebase. We do not use intrusive tracking scripts or ad retargeting pixels.",
    lastUpdated: "June 2026"
  }
];

export const defaultHomepageContent: HomepageContent = {
  id: "hero",
  headline: "RESTORE THE POWER. MASTER THE PICKUP.",
  subheadline: "Professional premium cricket bat repair, handle replacements, and full bespoke refurbishments. Handcrafted by elite workshop master craftsmen utilizing top-grade Singapore cane and raw English linseed.",
  ctaText: "Book Workshop Appointment",
  whatsAppNumber: "18562873131"
};

export interface WorkshopGalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: "Repair" | "Workshop" | "Before/After" | string;
  description?: string;
  createdAt?: string;
}

export const defaultGallery: WorkshopGalleryItem[] = [
  {
    id: "gal-1",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (1).jpeg",
    title: "Polished Willow Face Grid",
    category: "Before/After",
    description: "Fully completed premium refurbishment displaying clean wood grain patterns."
  },
  {
    id: "gal-2",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (2).jpeg",
    title: "Master Craftsman Chiseling",
    category: "Workshop",
    description: "Custom shaping a handle inset block with precise hand woodcutting tools."
  },
  {
    id: "gal-3",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (3).jpeg",
    title: "Fiber Split Pre-treatment",
    category: "Repair",
    description: "Saddled splits along the back shoulders before gluing and hydraulic clamping."
  },
  {
    id: "gal-4",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (4).jpeg",
    title: "Precision Sanding Bench",
    category: "Workshop",
    description: "Sanding back old stickers and grass blemishes to expose raw quality timber."
  },
  {
    id: "gal-5",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (5).jpeg",
    title: "Applying Singapore Cane Handle",
    category: "Workshop",
    description: "Assembling triple-spring handle into the custom wedge splice."
  },
  {
    id: "gal-6",
    imageUrl: "/images/WhatsApp Image 2026-07-26 at 5.38.31 PM.jpeg",
    title: "Before & After Surface Split",
    category: "Before/After",
    description: "Seamless edge grafting and pressure rolling that completely returns sweet spot ping."
  }
];
