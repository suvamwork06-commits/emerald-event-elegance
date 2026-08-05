/**
 * Single source of truth for all site copy, imagery and data.
 * Edit this file to update the website — every section reads from here.
 */
import heroWedding from "@/assets/hero-wedding.jpg";
import cardEvents from "@/assets/card-events.jpg";
import cardCatering from "@/assets/card-catering.jpg";
import aboutMain from "@/assets/about-main.jpg";
import about2 from "@/assets/about-2.jpg";
import about3 from "@/assets/about-3.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import cateringHero from "@/assets/catering-hero.jpg";
import menuBuffet from "@/assets/menu-buffet.jpg";
import menuBengali from "@/assets/menu-bengali.jpg";
import menuContinental from "@/assets/menu-continental.jpg";
import menuItalian from "@/assets/menu-italian.jpg";
import menuLive from "@/assets/menu-live.jpg";
import menuDessert from "@/assets/menu-dessert.jpg";
import menuMocktail from "@/assets/menu-mocktail.jpg";
import ctaFloral from "@/assets/cta-floral.jpg";

export const images = {
  heroWedding,
  cardEvents,
  cardCatering,
  aboutMain,
  about2,
  about3,
  cateringHero,
  ctaFloral,
};

export const brand = {
  name: "Maison Aurelle",
  monogram: "MA",
  tagline: "Luxury Event Atelier",
  phone: "+91 98300 00000",
  phoneHref: "tel:+919830000000",
  whatsapp: "919830000000",
  email: "concierge@maisonaurelle.com",
  address: "The Atelier, 21 Camac Street, Kolkata 700016, India",
  hours: [
    { day: "Monday — Friday", time: "10:00 — 19:00" },
    { day: "Saturday", time: "11:00 — 17:00" },
    { day: "Sunday", time: "By appointment" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
  mapEmbed:
    "https://www.google.com/maps?q=Camac%20Street%2C%20Kolkata&output=embed",
};

export const services = [
  {
    title: "Wedding Planning",
    text: "From the first conversation to the final farewell, a single atelier team choreographs every hour of your celebration.",
  },
  {
    title: "Corporate Events",
    text: "Boardroom precision with couture presentation — galas, awards evenings and executive retreats.",
  },
  {
    title: "Destination Weddings",
    text: "Palaces, vineyards, private islands. Logistics handled quietly so the romance stays in view.",
  },
  {
    title: "Luxury Decor",
    text: "Bespoke sets, imported blooms and custom joinery built for a single unforgettable night.",
  },
  {
    title: "Photography",
    text: "Editorial-trained photographers and cinematographers who document without ever intruding.",
  },
  {
    title: "Entertainment",
    text: "String ensembles, world-touring DJs, aerialists and curated performance programming.",
  },
  {
    title: "Celebrity Management",
    text: "Discreet artist liaison, riders, security and privacy protocols managed end to end.",
  },
  {
    title: "Luxury Catering",
    text: "Chef-led menus, live counters and service brigades trained to five-star standards.",
  },
];

export const whyUs = [
  {
    title: "One Atelier, One Standard",
    text: "Your event is never subcontracted. The team you meet is the team on the floor, from concept to curtain call.",
  },
  {
    title: "Designed, Not Decorated",
    text: "Every celebration begins as a drawing. Colour, scale, scent and sound are composed before a single flower is ordered.",
  },
  {
    title: "Absolute Discretion",
    text: "Fifteen years of private celebrations for families who value silence as much as spectacle.",
  },
  {
    title: "Invisible Logistics",
    text: "Permits, freight, contingency plans and minute-by-minute run sheets — carried entirely by us.",
  },
];

export const timeline = [
  { step: "I", title: "Consultation", text: "An unhurried conversation about people, place and feeling." },
  { step: "II", title: "Concept Creation", text: "Mood, palette and narrative rendered as a design book." },
  { step: "III", title: "Venue Selection", text: "Curated shortlists, private viewings, negotiated terms." },
  { step: "IV", title: "Design Planning", text: "Drawings, samples, tastings and technical rehearsals." },
  { step: "V", title: "Execution", text: "A silent production machine across every hour of build." },
  { step: "VI", title: "Celebration", text: "You are a guest at your own event. Nothing less." },
];

export const featured = [
  { title: "The Emerald Wedding", place: "Udaipur, India", image: portfolio1 },
  { title: "Corporate Gala", place: "Marina Bay, Singapore", image: portfolio2 },
  { title: "Luxury Birthday", place: "Private Estate, Alibaug", image: portfolio5 },
  { title: "Brand Launch", place: "Dubai Opera District", image: portfolio4 },
  { title: "Fashion Event", place: "Milan, Italy", image: portfolio6 },
  { title: "Destination Wedding", place: "Lake Como, Italy", image: portfolio3 },
];

export const portfolio = [
  { title: "Vows by the Sea", category: "Destination Wedding", image: portfolio1 },
  { title: "The Emerald Gala", category: "Corporate", image: portfolio2 },
  { title: "Couture Bridal", category: "Editorial", image: portfolio3 },
  { title: "Gold Geometry", category: "Brand Launch", image: portfolio4 },
  { title: "Candlelit Twelve", category: "Private Dining", image: portfolio5 },
  { title: "House of Silk", category: "Fashion Show", image: portfolio6 },
  { title: "Orchid Pavilion", category: "Luxury Decor", image: cardEvents },
  { title: "The Chef's Table", category: "Catering", image: cardCatering },
];

export const stats = [
  { value: 500, suffix: "+", label: "Events Produced" },
  { value: 200, suffix: "+", label: "Luxury Weddings" },
  { value: 100, suffix: "+", label: "Corporate Clients" },
  { value: 15, suffix: "+", label: "Years of Craft" },
];

export const trustedBy = [
  "Taj Palaces",
  "Four Seasons",
  "Aman Resorts",
  "The Oberoi",
  "Rolls-Royce",
  "Moët Hennessy",
  "Cartier",
  "Vogue Weddings",
];

export const testimonials = [
  {
    quote:
      "They understood the family before they understood the brief. Three days, four hundred guests, and not one visible seam.",
    name: "Aditi & Rohan Mehra",
    role: "Palace Wedding, Udaipur",
    image: portfolio1,
  },
  {
    quote:
      "Our global summit felt like a private members' club. Our chairman still talks about the second evening.",
    name: "Marcus Lindqvist",
    role: "Group CEO, Nordvest Capital",
    image: portfolio2,
  },
  {
    quote:
      "The catering alone would have made the night. Every course arrived as though the kitchen were ten steps away.",
    name: "Sanjana Roy",
    role: "Anniversary Celebration, Alibaug",
    image: portfolio5,
  },
];

export const instagramFeed = [
  portfolio3,
  cardEvents,
  menuDessert,
  portfolio5,
  menuMocktail,
  portfolio1,
];

export const menu = [
  {
    title: "Wedding Buffet",
    note: "Grand Service",
    text: "Twelve live stations, silver domes and a service brigade of one steward to every eight guests.",
    image: menuBuffet,
  },
  {
    title: "Royal Bengali",
    note: "Heritage",
    text: "Kosha mangsho, daab chingri and radhaballabhi, plated with the restraint of a tasting menu.",
    image: menuBengali,
  },
  {
    title: "Continental",
    note: "Chef's Table",
    text: "Seared diver scallops, saffron beurre blanc, and produce flown in twice weekly.",
    image: menuContinental,
  },
  {
    title: "Italian",
    note: "Hand Rolled",
    text: "Pasta rolled at the venue each morning, finished with Alba truffle and aged parmigiano.",
    image: menuItalian,
  },
  {
    title: "Live Counters",
    note: "Theatre",
    text: "Flambé, robata and raw bars where the cooking becomes part of the evening's choreography.",
    image: menuLive,
  },
  {
    title: "Desserts",
    note: "Patisserie",
    text: "Chocolate spheres, gold leaf, and a dessert cart that arrives at exactly the right moment.",
    image: menuDessert,
  },
  {
    title: "Mocktails",
    note: "Bar Programme",
    text: "Cold-pressed botanicals and crystal service, built by a dedicated beverage director.",
    image: menuMocktail,
  },
];

export const cateringPillars = [
  {
    title: "Chef Philosophy",
    text: "Our executive chef has cooked in two Michelin kitchens and one royal household. Menus are written for your guests, never copied from a folder.",
  },
  {
    title: "Fresh Ingredients",
    text: "Daily market sourcing, cold-chain transport and produce logged for provenance before it reaches a pan.",
  },
  {
    title: "Presentation",
    text: "Custom porcelain, brass and stone service pieces selected to match your event's palette.",
  },
  {
    title: "Luxury Service",
    text: "Silver-service brigades briefed and rehearsed on site, with timing measured to the minute.",
  },
];

export const cateringReviews = [
  {
    name: "Meera Kapoor",
    role: "Wedding, Kolkata",
    rating: 5,
    text: "Six hundred guests and every plate arrived hot. The Bengali menu made our elders cry.",
    image: portfolio3,
  },
  {
    name: "Devon Clarke",
    role: "Brand Dinner, Dubai",
    rating: 5,
    text: "The live counters became the story of the evening. Guests photographed the food before the room.",
    image: portfolio4,
  },
  {
    name: "Ananya Sen",
    role: "Anniversary, Goa",
    rating: 5,
    text: "Faultless, quiet, elegant service. We never once had to look for anyone.",
    image: portfolio6,
  },
];

export const foodGallery = [
  menuDessert,
  menuBuffet,
  cardCatering,
  menuItalian,
  menuMocktail,
  menuBengali,
  menuLive,
  menuContinental,
];