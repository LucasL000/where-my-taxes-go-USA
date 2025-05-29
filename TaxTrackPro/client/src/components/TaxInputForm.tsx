import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Calculator } from "lucide-react";
import { US_STATES, stateData } from "@/lib/taxData";
import { formatCurrency, type TaxInputs } from "@/lib/taxCalculations";

interface TaxInputFormProps {
  taxInputs: TaxInputs;
  selectedState: string;
  totalTaxes: number;
  onTaxInputChange: (field: keyof TaxInputs, value: number) => void;
  onStateChange: (state: string) => void;
}

export default function TaxInputForm({
  taxInputs,
  selectedState,
  totalTaxes,
  onTaxInputChange,
  onStateChange
}: TaxInputFormProps) {
  const handleInputChange = (field: keyof TaxInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onTaxInputChange(field, value);
  };

  const selectedStateName = selectedState 
    ? stateData[selectedState as keyof typeof stateData]?.name || "Other"
    : "";

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Calculator className="mr-3 text-blue-600" size={24} />
          Your Financial Information
        </h3>
        
        {/* State Selection */}
        <div className="mb-6">
          <Label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Your State
          </Label>
          <Select value={selectedState || "CA"} onValueChange={onStateChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a state..." />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tax Input Fields */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="annual-income" className="block text-sm font-medium text-gray-700 mb-2">
              Annual Income ($)
            </Label>
            <Input
              type="number"
              id="annual-income"
              placeholder="75,000"
              value={taxInputs.annualIncome || ""}
              onChange={handleInputChange('annualIncome')}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Your total annual income before taxes</p>
          </div>

          <div>
            <Label htmlFor="property-value" className="block text-sm font-medium text-gray-700 mb-2">
              Property Value ($)
            </Label>
            <Input
              type="number"
              id="property-value"
              placeholder="400,000"
              value={taxInputs.propertyValue || ""}
              onChange={handleInputChange('propertyValue')}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Current market value of your property (enter 0 if you don't own property)</p>
          </div>

          <div>
            <Label htmlFor="annual-spending" className="block text-sm font-medium text-gray-700 mb-2">
              Annual Spending ($)
            </Label>
            <Input
              type="number"
              id="annual-spending"
              placeholder="40,000"
              value={taxInputs.annualSpending || ""}
              onChange={handleInputChange('annualSpending')}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">How much you spend per year on taxable goods and services</p>
          </div>
        </div>

        {/* Total Display */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Total Annual Taxes</div>
          <div className="text-2xl font-semibold text-gray-900">
            {formatCurrency(totalTaxes)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
