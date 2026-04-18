// ATDB Trade International — canonical company + fleet data.
// Single source of truth used across the marketing site.

import craneImg from "@/assets/eq-crane-liebherr.jpg";
import rollerImg from "@/assets/eq-roller-sakai.jpg";
import excavatorImg from "@/assets/eq-excavator-cat.jpg";
import backhoeImg from "@/assets/eq-backhoe-case.jpg";
import supportImg from "@/assets/eq-support.jpg";

export const COMPANY = {
  name: "M/S ATDB Trade International",
  short: "ATDB",
  tagline: "Your Project, Our Power.",
  tagline_bn: "আপনার প্রজেক্ট, আমাদের শক্তি।",
  founded: 2000,
  yearsOperating: new Date().getFullYear() - 2000,
  proprietor: "Md. Saiful Alam (Milon)",
  ceo: "Md. Rezaur Rahman Khan (Baboo)",
  staff: 25,
  phones: [
    { label: "Proprietor", number: "+8801712106242", whatsapp: "8801712106242" },
    { label: "CEO", number: "+8801816666067", whatsapp: "8801816666067" },
  ],
  email: "saifulaapi@gmail.com",
  tin: "138463501804",
  vat: "5021075252",
  bank: "Pubali Bank PLC — A/C 3433901022792",
  offices: [
    {
      city: "Dhaka",
      label: "Corporate Office",
      address: "House #319 (8F), Lane #8, East Kazi Para, Kafrul, Dhaka-1216",
    },
    {
      city: "Tangail",
      label: "Branch Office",
      address: "House #311 (2F), Boro Kalibari Road, Tangail-1900",
    },
  ],
} as const;

export const PRIMARY_WHATSAPP = COMPANY.phones[0].whatsapp;

export type EquipmentCategory = "cranes" | "rollers" | "excavators" | "support";

export interface Equipment {
  id: string;
  category: EquipmentCategory;
  name: string;
  brand: string;
  model: string;
  capacity: string;
  origin: string;
  year?: number;
  image: string;
  featured?: boolean;
}

export const CATEGORIES: Record<
  EquipmentCategory,
  { slug: EquipmentCategory; label: string; label_bn: string; tagline: string; image: string }
> = {
  cranes: {
    slug: "cranes",
    label: "Mobile Cranes",
    label_bn: "ক্রেন",
    tagline: "7 units · 10T to 120T · Liebherr & Kato",
    image: craneImg,
  },
  rollers: {
    slug: "rollers",
    label: "Road Rollers",
    label_bn: "রোড রোলার",
    tagline: "9 units · 1T to 12T · Sakai, Dynapac, Bomag",
    image: rollerImg,
  },
  excavators: {
    slug: "excavators",
    label: "Excavators & Heavy",
    label_bn: "এক্সক্যাভেটর",
    tagline: "6 units · CAT, Komatsu, JCB, CASE",
    image: excavatorImg,
  },
  support: {
    slug: "support",
    label: "Support Equipment",
    label_bn: "সাপোর্ট ইকুইপমেন্ট",
    tagline: "Generators, compactors, cutters & drills",
    image: supportImg,
  },
};

export const FLEET: Equipment[] = [
  // Cranes
  { id: "ATDB-CR-001", category: "cranes", name: "Liebherr LTM 1120-5.1", brand: "Liebherr", model: "LTM 1120-5.1", capacity: "120 Tons", origin: "Germany", year: 2005, image: craneImg, featured: true },
  { id: "ATDB-CR-002", category: "cranes", name: "Liebherr LTM 1070-4.1", brand: "Liebherr", model: "LTM 1070-4.1", capacity: "70 Tons", origin: "Germany", year: 2005, image: craneImg, featured: true },
  { id: "ATDB-CR-003", category: "cranes", name: "Kato KR-50H-V", brand: "Kato", model: "KR-50H-V", capacity: "50 Tons", origin: "Japan", year: 2003, image: craneImg, featured: true },
  { id: "ATDB-CR-004", category: "cranes", name: "Kato KR-35H-III", brand: "Kato", model: "KR-35H-III", capacity: "35 Tons", origin: "Japan", year: 2012, image: craneImg },
  { id: "ATDB-CR-005", category: "cranes", name: "Kato KR-25H-V7", brand: "Kato", model: "KR-25H-V7", capacity: "25 Tons", origin: "Japan", year: 2017, image: craneImg },
  { id: "ATDB-CR-006", category: "cranes", name: "Kato KR-150", brand: "Kato", model: "KR-150", capacity: "15 Tons", origin: "Japan", image: craneImg },
  { id: "ATDB-CR-007", category: "cranes", name: "Kato KR-10H", brand: "Kato", model: "KR-10H", capacity: "10 Tons", origin: "Japan", year: 2002, image: craneImg },

  // Rollers
  { id: "ATDB-RR-001", category: "rollers", name: "Sakai 10T Roller", brand: "Sakai", model: "SV902", capacity: "10 Ton", origin: "Japan", image: rollerImg, featured: true },
  { id: "ATDB-RR-002", category: "rollers", name: "Sakai 10T Roller", brand: "Sakai", model: "SV900", capacity: "10 Ton", origin: "Japan", image: rollerImg },
  { id: "ATDB-RR-003", category: "rollers", name: "Dynapac 10T Roller", brand: "Dynapac", model: "CA250", capacity: "10 Ton", origin: "Sweden", image: rollerImg },
  { id: "ATDB-RR-004", category: "rollers", name: "Dynapac 12T Roller", brand: "Dynapac", model: "CA302", capacity: "12 Ton", origin: "Sweden", image: rollerImg },
  { id: "ATDB-RR-005", category: "rollers", name: "Bomag Tandem", brand: "Bomag", model: "BW", capacity: "4/6 Ton", origin: "Germany", image: rollerImg },
  { id: "ATDB-RR-006", category: "rollers", name: "Hawa Tandem", brand: "Hawa", model: "—", capacity: "4/6 Ton", origin: "Japan", image: rollerImg },
  { id: "ATDB-RR-007", category: "rollers", name: "Advance Roller", brand: "Advance", model: "—", capacity: "8.5 Ton", origin: "Japan", image: rollerImg },
  { id: "ATDB-RR-008", category: "rollers", name: "Sakai Mini Tandem", brand: "Sakai", model: "—", capacity: "1/2 Ton", origin: "Japan", image: rollerImg },
  { id: "ATDB-RR-009", category: "rollers", name: "Sakai Tandem", brand: "Sakai", model: "—", capacity: "3.5/5 Ton", origin: "Japan", image: rollerImg },

  // Excavators
  { id: "ATDB-EX-001", category: "excavators", name: "CAT Soil Compactor", brand: "Caterpillar", model: "CS54B", capacity: "12/18 Ton", origin: "USA", image: excavatorImg },
  { id: "ATDB-EX-002", category: "excavators", name: "CAT Excavator 320BU", brand: "Caterpillar", model: "320BU", capacity: "20 Ton", origin: "USA", image: excavatorImg, featured: true },
  { id: "ATDB-EX-003", category: "excavators", name: "Komatsu PC40", brand: "Komatsu", model: "PC40", capacity: "4 Ton", origin: "Japan", image: excavatorImg },
  { id: "ATDB-EX-004", category: "excavators", name: "CASE Backhoe 770EX", brand: "CASE", model: "770EX", capacity: "Backhoe Loader", origin: "USA", image: backhoeImg, featured: true },
  { id: "ATDB-EX-005", category: "excavators", name: "XCMG Pay Loader", brand: "XCMG", model: "KMC 950", capacity: "5 Ton Bucket", origin: "China", image: excavatorImg },
  { id: "ATDB-EX-006", category: "excavators", name: "JCB Backhoe", brand: "JCB", model: "JC 0.6", capacity: "Backhoe Loader", origin: "UK", image: backhoeImg },

  // Support
  { id: "ATDB-SP-001", category: "support", name: "Honda Cutting Machines", brand: "Honda", model: "—", capacity: "4 units", origin: "Japan", image: supportImg },
  { id: "ATDB-SP-002", category: "support", name: "Plate / Sand Compactors", brand: "Mixed", model: "—", capacity: "4 units", origin: "Japan", image: supportImg },
  { id: "ATDB-SP-003", category: "support", name: "Diesel Generators", brand: "Mixed", model: "—", capacity: "4 units", origin: "—", image: supportImg },
  { id: "ATDB-SP-004", category: "support", name: "Asphalt Core Cutter", brand: "—", model: "—", capacity: "1 unit", origin: "—", image: supportImg },
  { id: "ATDB-SP-005", category: "support", name: "Big Drill Hammers", brand: "—", model: "—", capacity: "5 units", origin: "—", image: supportImg },
  { id: "ATDB-SP-006", category: "support", name: "TATA Drum Trucks", brand: "TATA", model: "—", capacity: "2 units", origin: "India", image: supportImg },
];

export const FEATURED = FLEET.filter((e) => e.featured);

export function getCategoryFleet(cat: EquipmentCategory) {
  return FLEET.filter((e) => e.category === cat);
}

export function getEquipmentById(id: string) {
  return FLEET.find((e) => e.id.toLowerCase() === id.toLowerCase());
}

export function buildWhatsappRentLink(eq: Equipment) {
  const msg = `আমি ${eq.name} (${eq.id}) ভাড়া নিতে চাই।\n\nI'd like to rent the ${eq.name} (${eq.id} · ${eq.capacity}).\nProject location: \nDuration (days): \nPlease send a quotation. — ATDB website`;
  return `https://wa.me/${PRIMARY_WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

export function buildWhatsappGenericLink(text?: string) {
  const msg =
    text ??
    `Hello ATDB Trade International,\n\nI'd like to discuss a heavy-equipment rental for an upcoming project. Please share availability and a quotation.`;
  return `https://wa.me/${PRIMARY_WHATSAPP}?text=${encodeURIComponent(msg)}`;
}
