// Federal tax allocation percentages based on 2023 federal budget
export const federalAllocations = {
  defense: { 
    percentage: 0.13, 
    category: "Defense & Military",
    color: "bg-blue-500"
  },
  socialSecurity: { 
    percentage: 0.21, 
    category: "Social Security",
    color: "bg-purple-500"
  },
  medicare: { 
    percentage: 0.15, 
    category: "Medicare",
    color: "bg-green-500"
  },
  medicaid: { 
    percentage: 0.10, 
    category: "Medicaid & CHIP",
    color: "bg-emerald-500"
  },
  interestDebt: { 
    percentage: 0.10, 
    category: "Interest on National Debt",
    color: "bg-red-500"
  },
  veterans: { 
    percentage: 0.04, 
    category: "Veterans Benefits & Services",
    color: "bg-orange-500"
  },
  education: { 
    percentage: 0.03, 
    category: "Education & Training",
    color: "bg-indigo-500"
  },
  transportation: { 
    percentage: 0.02, 
    category: "Transportation & Infrastructure",
    color: "bg-amber-500"
  },
  unemployment: { 
    percentage: 0.02, 
    category: "Unemployment Insurance",
    color: "bg-teal-500"
  },
  agriculture: { 
    percentage: 0.02, 
    category: "Agriculture & Food Assistance",
    color: "bg-lime-500"
  },
  justice: { 
    percentage: 0.02, 
    category: "Justice & Law Enforcement",
    color: "bg-slate-500"
  },
  science: { 
    percentage: 0.02, 
    category: "Science & Space Programs",
    color: "bg-cyan-500"
  },
  energy: { 
    percentage: 0.01, 
    category: "Energy & Environment",
    color: "bg-green-600"
  },
  housing: { 
    percentage: 0.01, 
    category: "Housing Assistance",
    color: "bg-pink-500"
  },
  international: { 
    percentage: 0.01, 
    category: "International Affairs",
    color: "bg-violet-500"
  },
  other: { 
    percentage: 0.11, 
    category: "Other Federal Programs",
    color: "bg-gray-500"
  }
};

// State tax allocation percentages (varies by state, using average as baseline)
export const stateAllocations = {
  education: { 
    percentage: 0.35, 
    category: "Public Education (K-12)",
    color: "bg-blue-500"
  },
  higherEd: { 
    percentage: 0.12, 
    category: "Higher Education & Universities",
    color: "bg-indigo-500"
  },
  healthcare: { 
    percentage: 0.15, 
    category: "Healthcare & Social Services",
    color: "bg-green-500"
  },
  transportation: { 
    percentage: 0.08, 
    category: "Transportation & Roads",
    color: "bg-amber-500"
  },
  publicSafety: { 
    percentage: 0.07, 
    category: "Public Safety & Police",
    color: "bg-red-500"
  },
  corrections: { 
    percentage: 0.05, 
    category: "Corrections & Prisons",
    color: "bg-orange-500"
  },
  parks: { 
    percentage: 0.03, 
    category: "Parks & Recreation",
    color: "bg-green-600"
  },
  environment: { 
    percentage: 0.02, 
    category: "Environmental Protection",
    color: "bg-emerald-500"
  },
  libraries: { 
    percentage: 0.02, 
    category: "Libraries & Cultural Programs",
    color: "bg-purple-500"
  },
  housing: { 
    percentage: 0.02, 
    category: "Housing & Community Development",
    color: "bg-pink-500"
  },
  utilities: { 
    percentage: 0.02, 
    category: "Public Utilities & Services",
    color: "bg-cyan-500"
  },
  administration: { 
    percentage: 0.03, 
    category: "Government Administration",
    color: "bg-slate-500"
  },
  other: { 
    percentage: 0.04, 
    category: "Other State & Local Services",
    color: "bg-gray-500"
  }
};

// State-specific tax rates and allocations
export const stateData = {
  AL: { name: "Alabama", incomeTaxRate: 0.05, salesTaxRate: 0.04, propertyTaxRate: 0.0041, federalSplit: 0.78 },
  AK: { name: "Alaska", incomeTaxRate: 0.0, salesTaxRate: 0.0, propertyTaxRate: 0.0089, federalSplit: 0.82 },
  AZ: { name: "Arizona", incomeTaxRate: 0.025, salesTaxRate: 0.056, propertyTaxRate: 0.0066, federalSplit: 0.77 },
  AR: { name: "Arkansas", incomeTaxRate: 0.055, salesTaxRate: 0.065, propertyTaxRate: 0.0062, federalSplit: 0.79 },
  CA: { name: "California", incomeTaxRate: 0.093, salesTaxRate: 0.0875, propertyTaxRate: 0.0075, federalSplit: 0.72 },
  CO: { name: "Colorado", incomeTaxRate: 0.0463, salesTaxRate: 0.029, propertyTaxRate: 0.0051, federalSplit: 0.74 },
  CT: { name: "Connecticut", incomeTaxRate: 0.07, salesTaxRate: 0.0635, propertyTaxRate: 0.021, federalSplit: 0.71 },
  DE: { name: "Delaware", incomeTaxRate: 0.066, salesTaxRate: 0.0, propertyTaxRate: 0.0057, federalSplit: 0.75 },
  FL: { name: "Florida", incomeTaxRate: 0.0, salesTaxRate: 0.07, propertyTaxRate: 0.009, federalSplit: 0.79 },
  GA: { name: "Georgia", incomeTaxRate: 0.0575, salesTaxRate: 0.04, propertyTaxRate: 0.0092, federalSplit: 0.76 },
  HI: { name: "Hawaii", incomeTaxRate: 0.08, salesTaxRate: 0.04, propertyTaxRate: 0.0031, federalSplit: 0.73 },
  ID: { name: "Idaho", incomeTaxRate: 0.058, salesTaxRate: 0.06, propertyTaxRate: 0.0069, federalSplit: 0.78 },
  IL: { name: "Illinois", incomeTaxRate: 0.0495, salesTaxRate: 0.0825, propertyTaxRate: 0.021, federalSplit: 0.73 },
  IN: { name: "Indiana", incomeTaxRate: 0.032, salesTaxRate: 0.07, propertyTaxRate: 0.0085, federalSplit: 0.77 },
  IA: { name: "Iowa", incomeTaxRate: 0.0385, salesTaxRate: 0.06, propertyTaxRate: 0.0154, federalSplit: 0.76 },
  KS: { name: "Kansas", incomeTaxRate: 0.031, salesTaxRate: 0.065, propertyTaxRate: 0.0141, federalSplit: 0.76 },
  KY: { name: "Kentucky", incomeTaxRate: 0.05, salesTaxRate: 0.06, propertyTaxRate: 0.0086, federalSplit: 0.78 },
  LA: { name: "Louisiana", incomeTaxRate: 0.0425, salesTaxRate: 0.0545, propertyTaxRate: 0.0056, federalSplit: 0.78 },
  ME: { name: "Maine", incomeTaxRate: 0.075, salesTaxRate: 0.055, propertyTaxRate: 0.0133, federalSplit: 0.74 },
  MD: { name: "Maryland", incomeTaxRate: 0.0575, salesTaxRate: 0.06, propertyTaxRate: 0.0111, federalSplit: 0.72 },
  MA: { name: "Massachusetts", incomeTaxRate: 0.05, salesTaxRate: 0.0625, propertyTaxRate: 0.0124, federalSplit: 0.71 },
  MI: { name: "Michigan", incomeTaxRate: 0.0425, salesTaxRate: 0.06, propertyTaxRate: 0.0144, federalSplit: 0.75 },
  MN: { name: "Minnesota", incomeTaxRate: 0.0985, salesTaxRate: 0.0688, propertyTaxRate: 0.0114, federalSplit: 0.73 },
  MS: { name: "Mississippi", incomeTaxRate: 0.05, salesTaxRate: 0.07, propertyTaxRate: 0.0061, federalSplit: 0.8 },
  MO: { name: "Missouri", incomeTaxRate: 0.054, salesTaxRate: 0.0423, propertyTaxRate: 0.0097, federalSplit: 0.77 },
  MT: { name: "Montana", incomeTaxRate: 0.0675, salesTaxRate: 0.0, propertyTaxRate: 0.0084, federalSplit: 0.78 },
  NE: { name: "Nebraska", incomeTaxRate: 0.0684, salesTaxRate: 0.055, propertyTaxRate: 0.0176, federalSplit: 0.76 },
  NV: { name: "Nevada", incomeTaxRate: 0.0, salesTaxRate: 0.0685, propertyTaxRate: 0.0084, federalSplit: 0.8 },
  NH: { name: "New Hampshire", incomeTaxRate: 0.0, salesTaxRate: 0.0, propertyTaxRate: 0.0186, federalSplit: 0.75 },
  NJ: { name: "New Jersey", incomeTaxRate: 0.1075, salesTaxRate: 0.0663, propertyTaxRate: 0.0249, federalSplit: 0.69 },
  NM: { name: "New Mexico", incomeTaxRate: 0.059, salesTaxRate: 0.0513, propertyTaxRate: 0.0076, federalSplit: 0.79 },
  NY: { name: "New York", incomeTaxRate: 0.103, salesTaxRate: 0.08, propertyTaxRate: 0.016, federalSplit: 0.7 },
  NC: { name: "North Carolina", incomeTaxRate: 0.0475, salesTaxRate: 0.0475, propertyTaxRate: 0.0084, federalSplit: 0.76 },
  ND: { name: "North Dakota", incomeTaxRate: 0.0295, salesTaxRate: 0.05, propertyTaxRate: 0.0098, federalSplit: 0.78 },
  OH: { name: "Ohio", incomeTaxRate: 0.0399, salesTaxRate: 0.0725, propertyTaxRate: 0.0157, federalSplit: 0.75 },
  OK: { name: "Oklahoma", incomeTaxRate: 0.05, salesTaxRate: 0.045, propertyTaxRate: 0.009, federalSplit: 0.78 },
  OR: { name: "Oregon", incomeTaxRate: 0.099, salesTaxRate: 0.0, propertyTaxRate: 0.0087, federalSplit: 0.74 },
  PA: { name: "Pennsylvania", incomeTaxRate: 0.0307, salesTaxRate: 0.06, propertyTaxRate: 0.015, federalSplit: 0.76 },
  RI: { name: "Rhode Island", incomeTaxRate: 0.0599, salesTaxRate: 0.07, propertyTaxRate: 0.0146, federalSplit: 0.73 },
  SC: { name: "South Carolina", incomeTaxRate: 0.07, salesTaxRate: 0.06, propertyTaxRate: 0.0057, federalSplit: 0.77 },
  SD: { name: "South Dakota", incomeTaxRate: 0.0, salesTaxRate: 0.045, propertyTaxRate: 0.0128, federalSplit: 0.79 },
  TN: { name: "Tennessee", incomeTaxRate: 0.0, salesTaxRate: 0.07, propertyTaxRate: 0.0066, federalSplit: 0.8 },
  TX: { name: "Texas", incomeTaxRate: 0.0, salesTaxRate: 0.0825, propertyTaxRate: 0.0181, federalSplit: 0.78 },
  UT: { name: "Utah", incomeTaxRate: 0.0495, salesTaxRate: 0.061, propertyTaxRate: 0.0066, federalSplit: 0.77 },
  VT: { name: "Vermont", incomeTaxRate: 0.086, salesTaxRate: 0.06, propertyTaxRate: 0.0189, federalSplit: 0.73 },
  VA: { name: "Virginia", incomeTaxRate: 0.0575, salesTaxRate: 0.043, propertyTaxRate: 0.0081, federalSplit: 0.74 },
  WA: { name: "Washington", incomeTaxRate: 0.0, salesTaxRate: 0.065, propertyTaxRate: 0.0092, federalSplit: 0.76 },
  WV: { name: "West Virginia", incomeTaxRate: 0.065, salesTaxRate: 0.06, propertyTaxRate: 0.0059, federalSplit: 0.79 },
  WI: { name: "Wisconsin", incomeTaxRate: 0.0765, salesTaxRate: 0.05, propertyTaxRate: 0.0194, federalSplit: 0.74 },
  WY: { name: "Wyoming", incomeTaxRate: 0.0, salesTaxRate: 0.04, propertyTaxRate: 0.0062, federalSplit: 0.81 },
  DC: { name: "Washington D.C.", incomeTaxRate: 0.0975, salesTaxRate: 0.06, propertyTaxRate: 0.0085, federalSplit: 0.68 }
};

export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "Washington D.C." },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" }
];
