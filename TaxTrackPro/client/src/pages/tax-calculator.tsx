import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import TaxInputForm from "@/components/TaxInputForm";
import TaxAllocationDisplay from "@/components/TaxAllocationDisplay";
import TaxVisualization from "@/components/TaxVisualization";
import ProgramDetails from "@/components/ProgramDetails";
import LocalTaxInfo from "@/components/LocalTaxInfo";
import { calculateTaxAllocations, type TaxInputs } from "@/lib/taxCalculations";

export default function TaxCalculator() {
  const [selectedState, setSelectedState] = useState<string>("CA");
  const [taxInputs, setTaxInputs] = useState<TaxInputs>({
    annualIncome: 0,
    propertyValue: 0,
    annualSpending: 0
  });

  const [calculations, setCalculations] = useState(
    calculateTaxAllocations(taxInputs, selectedState)
  );

  // Recalculate when inputs change
  useEffect(() => {
    const newCalculations = calculateTaxAllocations(taxInputs, selectedState);
    setCalculations(newCalculations);
  }, [taxInputs, selectedState]);

  const handleTaxInputChange = (field: keyof TaxInputs, value: number) => {
    setTaxInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Calculator className="text-2xl text-blue-600" size={32} />
              <h1 className="text-xl font-semibold text-gray-900">Tax Allocation Calculator</h1>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-600">
              <span>Understand where your tax dollars go</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Where Do Your Tax Dollars Go?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Enter your tax information below to see exactly how your tax dollars are allocated between different government spending categories at both state and federal levels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Tax Input Form */}
          <TaxInputForm
            taxInputs={taxInputs}
            selectedState={selectedState}
            totalTaxes={calculations.totalTaxes}
            onTaxInputChange={handleTaxInputChange}
            onStateChange={handleStateChange}
          />

          {/* Tax Allocation Results */}
          <TaxAllocationDisplay
            federalAllocations={calculations.federalAllocations}
            stateAllocations={calculations.stateAllocations}
            federalTotal={calculations.federalTotal}
            stateLocalTotal={calculations.stateLocalTotal}
            totalTaxes={calculations.totalTaxes}
            federalPercentage={calculations.federalPercentage}
            stateLocalPercentage={calculations.stateLocalPercentage}
            selectedState={selectedState}
          />
        </div>

        {/* Interactive Visualizations */}
        <div className="mb-12">
          <TaxVisualization
            federalAllocations={calculations.federalAllocations}
            stateAllocations={calculations.stateAllocations}
            federalTotal={calculations.federalTotal}
            stateLocalTotal={calculations.stateLocalTotal}
            totalTaxes={calculations.totalTaxes}
            selectedState={selectedState}
          />
        </div>

        {/* Local Tax Information */}
        <div className="mb-12">
          <LocalTaxInfo
            selectedState={selectedState}
            propertyValue={taxInputs.propertyValue}
            annualIncome={taxInputs.annualIncome}
          />
        </div>

        {/* Detailed Program Information */}
        <div className="mb-12">
          <ProgramDetails
            federalAllocations={calculations.federalAllocations}
            stateAllocations={calculations.stateAllocations}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>Tax Allocation Calculator - Understanding Government Spending</p>
            <p className="mt-2">Data based on federal and state budget allocations. For informational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
