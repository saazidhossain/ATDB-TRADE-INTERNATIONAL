// Localised string bundles for the PDF spec sheet.
// Kept in a dedicated module so each renderer can import only what it needs.

export interface Strings {
  title: string;
  contact: string;
  phoneL: string;
  emailL: string;
  whatsappL: string;
  disclaimer: string;
  generated: string;
  category: string;
  brand: string;
  model: string;
  capacity: string;
  origin: string;
  year: string;
  fuel: string;
  fleet: string;
  operator: string;
  operatorVal: string;
  inspection: string;
  inspectionVal: string;
  assetId: string;
  unitSuffix: string;
}

export const STRINGS_EN: Strings = {
  title: "Equipment Specification Sheet",
  contact: "Contact ATDB Trade International",
  phoneL: "Phone",
  emailL: "Email",
  whatsappL: "WhatsApp",
  disclaimer:
    "Specifications are indicative. Inspection-certified, operator included, mobilisation on request.",
  generated: "Generated",
  category: "Category",
  brand: "Brand",
  model: "Model",
  capacity: "Capacity",
  origin: "Country of Origin",
  year: "Year of Manufacture",
  fuel: "Fuel",
  fleet: "In Fleet",
  operator: "Operator",
  operatorVal: "Certified operator included",
  inspection: "Inspection",
  inspectionVal: "City Inspection Services CIS/077/2018",
  assetId: "Asset ID",
  unitSuffix: "unit(s)",
};

export const STRINGS_BN: Strings = {
  title: "ইকুইপমেন্ট স্পেসিফিকেশন শিট",
  contact: "যোগাযোগ — ATDB Trade International",
  phoneL: "ফোন",
  emailL: "ইমেইল",
  whatsappL: "হোয়াটসঅ্যাপ",
  disclaimer: "স্পেসিফিকেশন নির্দেশক। ইন্সপেকশন-সার্টিফাইড, অপারেটর সহ, অনুরোধে মোবিলাইজেশন।",
  generated: "তৈরি",
  category: "ক্যাটাগরি",
  brand: "ব্র্যান্ড",
  model: "মডেল",
  capacity: "ক্যাপাসিটি",
  origin: "উৎপত্তি দেশ",
  year: "নির্মাণ বছর",
  fuel: "জ্বালানি",
  fleet: "ফ্লিটে",
  operator: "অপারেটর",
  operatorVal: "সার্টিফাইড অপারেটর সহ",
  inspection: "ইন্সপেকশন",
  inspectionVal: "City Inspection Services CIS/077/2018",
  assetId: "অ্যাসেট আইডি",
  unitSuffix: "ইউনিট",
};
