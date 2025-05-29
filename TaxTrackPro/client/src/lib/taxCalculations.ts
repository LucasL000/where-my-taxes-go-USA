import { federalAllocations, stateAllocations, stateData } from './taxData';

export interface TaxInputs {
  annualIncome: number;
  propertyValue: number;
  annualSpending: number;
}

export interface AllocationItem {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface TaxCalculationResult {
  totalTaxes: number;
  federalTotal: number;
  stateLocalTotal: number;
  federalPercentage: number;
  stateLocalPercentage: number;
  federalAllocations: AllocationItem[];
  stateAllocations: AllocationItem[];
}

export function calculateTaxAllocations(
  taxInputs: TaxInputs, 
  selectedState: string
): TaxCalculationResult {
  // Get state-specific data
  const stateInfo = stateData[selectedState as keyof typeof stateData] || stateData.CA;
  
  // Calculate actual taxes based on income, property value, and spending
  const federalIncomeTax = calculateFederalIncomeTax(taxInputs.annualIncome);
  const stateIncomeTax = taxInputs.annualIncome * stateInfo.incomeTaxRate;
  const payrollTax = calculatePayrollTax(taxInputs.annualIncome);
  const propertyTax = taxInputs.propertyValue * stateInfo.propertyTaxRate;
  const salesTax = taxInputs.annualSpending * stateInfo.salesTaxRate;
  
  // Calculate totals
  const federalTotal = federalIncomeTax + payrollTax;
  const stateLocalTotal = stateIncomeTax + propertyTax + salesTax;
  const totalTaxes = federalTotal + stateLocalTotal;
  
  if (totalTaxes === 0) {
    return {
      totalTaxes: 0,
      federalTotal: 0,
      stateLocalTotal: 0,
      federalPercentage: 0,
      stateLocalPercentage: 0,
      federalAllocations: [],
      stateAllocations: []
    };
  }

  const federalPercentage = Math.round((federalTotal / totalTaxes) * 100);
  const stateLocalPercentage = Math.round((stateLocalTotal / totalTaxes) * 100);

  // Calculate federal allocations
  const federalAllocationItems: AllocationItem[] = Object.entries(federalAllocations).map(([key, data]) => ({
    category: data.category,
    amount: federalTotal * data.percentage,
    percentage: Math.round(data.percentage * 100),
    color: data.color
  }));

  // Calculate state allocations
  const stateAllocationItems: AllocationItem[] = Object.entries(stateAllocations).map(([key, data]) => ({
    category: data.category,
    amount: stateLocalTotal * data.percentage,
    percentage: Math.round(data.percentage * 100),
    color: data.color
  }));

  return {
    totalTaxes,
    federalTotal,
    stateLocalTotal,
    federalPercentage,
    stateLocalPercentage,
    federalAllocations: federalAllocationItems,
    stateAllocations: stateAllocationItems
  };
}

// Calculate federal income tax using simplified 2023 tax brackets
function calculateFederalIncomeTax(income: number): number {
  if (income <= 11000) return income * 0.10;
  if (income <= 44725) return 1100 + (income - 11000) * 0.12;
  if (income <= 95375) return 5147 + (income - 44725) * 0.22;
  if (income <= 182050) return 16290 + (income - 95375) * 0.24;
  if (income <= 231250) return 37104 + (income - 182050) * 0.32;
  if (income <= 578125) return 52832 + (income - 231250) * 0.35;
  return 174238.25 + (income - 578125) * 0.37;
}

// Calculate payroll taxes (Social Security + Medicare)
function calculatePayrollTax(income: number): number {
  const socialSecurityTax = Math.min(income, 160200) * 0.062; // 2023 SS wage base
  const medicareTax = income * 0.0145;
  const additionalMedicareTax = income > 200000 ? (income - 200000) * 0.009 : 0;
  return socialSecurityTax + medicareTax + additionalMedicareTax;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount || 0);
}
