import { Card, CardContent } from "@/components/ui/card";
import { Flag, MapPin } from "lucide-react";
import { formatCurrency, type AllocationItem } from "@/lib/taxCalculations";
import { stateData } from "@/lib/taxData";

interface TaxAllocationDisplayProps {
  federalAllocations: AllocationItem[];
  stateAllocations: AllocationItem[];
  federalTotal: number;
  stateLocalTotal: number;
  totalTaxes: number;
  federalPercentage: number;
  stateLocalPercentage: number;
  selectedState: string;
}

export default function TaxAllocationDisplay({
  federalAllocations,
  stateAllocations,
  federalTotal,
  stateLocalTotal,
  totalTaxes,
  federalPercentage,
  stateLocalPercentage,
  selectedState
}: TaxAllocationDisplayProps) {
  const selectedStateName = selectedState 
    ? stateData[selectedState as keyof typeof stateData]?.name || "Other"
    : "";

  return (
    <div className="space-y-6">
      {/* Federal Tax Allocation */}
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Flag className="mr-3 text-blue-600" size={24} />
            Federal Tax Allocation
          </h3>
          
          <div className="space-y-3">
            {federalAllocations.map((allocation, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <div className={`w-3 h-3 ${allocation.color} rounded-full mr-3`}></div>
                  <span className="text-sm font-medium text-gray-700">{allocation.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatCurrency(allocation.amount)}
                  </div>
                  <div className="text-xs text-gray-500">{allocation.percentage}%</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-900">Total Federal Taxes</span>
              <span className="text-lg font-bold text-blue-600">{formatCurrency(federalTotal)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* State Tax Allocation */}
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="mr-3 text-green-600" size={24} />
            State & Local Tax Allocation
            {selectedStateName && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({selectedStateName})
              </span>
            )}
          </h3>
          
          <div className="space-y-3">
            {stateAllocations.map((allocation, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <div className={`w-3 h-3 ${allocation.color} rounded-full mr-3`}></div>
                  <span className="text-sm font-medium text-gray-700">{allocation.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatCurrency(allocation.amount)}
                  </div>
                  <div className="text-xs text-gray-500">{allocation.percentage}%</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-900">Total State & Local Taxes</span>
              <span className="text-lg font-bold text-green-600">{formatCurrency(stateLocalTotal)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Breakdown Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalTaxes)}</div>
            <div className="text-sm text-gray-600">Total Taxes Paid</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{federalPercentage}%</div>
            <div className="text-sm text-gray-600">Federal Allocation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stateLocalPercentage}%</div>
            <div className="text-sm text-gray-600">State & Local Allocation</div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Understanding Your Tax Contributions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Federal Taxes Include:</h4>
              <ul className="space-y-1">
                <li>• Federal income tax</li>
                <li>• Social Security and Medicare taxes</li>
                <li>• Federal unemployment tax</li>
                <li>• Federal excise taxes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">State & Local Taxes Include:</h4>
              <ul className="space-y-1">
                <li>• State income tax</li>
                <li>• Property taxes</li>
                <li>• State and local sales taxes</li>
                <li>• Local utility taxes</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">ℹ️ Note:</span> This calculator uses approximate allocations based on recent government budget data. Actual allocations may vary by year and specific circumstances.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
