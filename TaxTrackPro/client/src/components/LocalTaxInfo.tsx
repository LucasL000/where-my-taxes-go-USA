import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Building } from "lucide-react";
import { formatCurrency } from "@/lib/taxCalculations";

interface LocalTaxInfoProps {
  selectedState: string;
  propertyValue: number;
  annualIncome: number;
}

// Sample county/city data for major metropolitan areas
const localTaxData = {
  CA: {
    counties: [
      { name: "Los Angeles County", propertyTaxRate: 0.0075, localSalesTax: 0.0025, localPrograms: ["Metro Transit", "County Parks", "Library System", "Public Health"] },
      { name: "Orange County", propertyTaxRate: 0.0073, localSalesTax: 0.0075, localPrograms: ["Transportation Authority", "Beaches & Parks", "Fire Authority", "Public Libraries"] },
      { name: "San Francisco County", propertyTaxRate: 0.0112, localSalesTax: 0.0025, localPrograms: ["MUNI Transit", "City Parks", "Public Health", "Affordable Housing"] },
      { name: "San Diego County", propertyTaxRate: 0.0068, localSalesTax: 0.0075, localPrograms: ["SANDAG Transit", "County Parks", "Library System", "Health Services"] }
    ]
  },
  NY: {
    counties: [
      { name: "New York County (Manhattan)", propertyTaxRate: 0.0128, localSalesTax: 0.045, localPrograms: ["MTA Subway", "Central Park", "Public Schools", "FDNY/NYPD"] },
      { name: "Kings County (Brooklyn)", propertyTaxRate: 0.0067, localSalesTax: 0.045, localPrograms: ["MTA Transit", "Brooklyn Parks", "Public Libraries", "Sanitation"] },
      { name: "Queens County", propertyTaxRate: 0.0068, localSalesTax: 0.045, localPrograms: ["MTA Service", "Flushing Meadows Park", "Public Schools", "Fire Department"] },
      { name: "Nassau County", propertyTaxRate: 0.021, localSalesTax: 0.045, localPrograms: ["NICE Bus", "County Parks", "Police Department", "Public Works"] }
    ]
  },
  TX: {
    counties: [
      { name: "Harris County (Houston)", propertyTaxRate: 0.0208, localSalesTax: 0.02, localPrograms: ["Metro Transit", "Harris County Parks", "Flood Control", "Public Health"] },
      { name: "Dallas County", propertyTaxRate: 0.0197, localSalesTax: 0.02, localPrograms: ["DART Transit", "White Rock Lake", "Parkland Hospital", "Community Colleges"] },
      { name: "Travis County (Austin)", propertyTaxRate: 0.0184, localSalesTax: 0.02, localPrograms: ["Capital Metro", "County Parks", "Healthcare District", "EMS Services"] },
      { name: "Bexar County (San Antonio)", propertyTaxRate: 0.0156, localSalesTax: 0.0125, localPrograms: ["VIA Transit", "San Antonio River", "University Health", "Public Libraries"] }
    ]
  },
  FL: {
    counties: [
      { name: "Miami-Dade County", propertyTaxRate: 0.0097, localSalesTax: 0.01, localPrograms: ["Metrobus/Metrorail", "Miami Beach", "Jackson Health", "Public Schools"] },
      { name: "Broward County", propertyTaxRate: 0.0108, localSalesTax: 0.01, localPrograms: ["Broward County Transit", "Parks & Recreation", "Fire Rescue", "Libraries"] },
      { name: "Orange County (Orlando)", propertyTaxRate: 0.0089, localSalesTax: 0.005, localPrograms: ["Lynx Transit", "Orange County Parks", "Fire Rescue", "Convention Center"] },
      { name: "Hillsborough County (Tampa)", propertyTaxRate: 0.0098, localSalesTax: 0.01, localPrograms: ["HART Transit", "Hillsborough River", "Fire Rescue", "Public Health"] }
    ]
  }
};

export default function LocalTaxInfo({ selectedState, propertyValue, annualIncome }: LocalTaxInfoProps) {
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  
  const stateCounties = localTaxData[selectedState as keyof typeof localTaxData]?.counties || [];
  const countyData = stateCounties.find(county => county.name === selectedCounty);
  
  const calculateLocalTaxes = () => {
    if (!countyData) return { propertyTax: 0, salesTax: 0, total: 0 };
    
    const propertyTax = propertyValue * countyData.propertyTaxRate;
    const salesTax = (annualIncome * 0.1) * countyData.localSalesTax; // Assume 10% of income spent locally
    const total = propertyTax + salesTax;
    
    return { propertyTax, salesTax, total };
  };

  const localTaxes = calculateLocalTaxes();

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <MapPin className="mr-3 text-green-600" size={24} />
          Local Tax Information
        </h3>

        {stateCounties.length > 0 ? (
          <>
            <div className="mb-6">
              <Label htmlFor="county-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Your County/Metro Area
              </Label>
              <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your county..." />
                </SelectTrigger>
                <SelectContent>
                  {stateCounties.map((county) => (
                    <SelectItem key={county.name} value={county.name}>
                      {county.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {countyData && (
              <div className="space-y-6">
                {/* Local Tax Breakdown */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Your Local Tax Contribution</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(localTaxes.propertyTax)}
                      </div>
                      <div className="text-sm text-gray-600">Local Property Tax</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(localTaxes.salesTax)}
                      </div>
                      <div className="text-sm text-gray-600">Local Sales Tax</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-700">
                        {formatCurrency(localTaxes.total)}
                      </div>
                      <div className="text-sm text-gray-600">Total Local Taxes</div>
                    </div>
                  </div>
                </div>

                {/* Local Programs Funded */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Building className="mr-2 text-green-600" size={20} />
                    Local Programs Your Taxes Fund
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {countyData.localPrograms.map((program, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="font-medium text-gray-900">{program}</div>
                        <div className="text-sm text-green-600">
                          ~{formatCurrency(localTaxes.total / countyData.localPrograms.length)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tax Rate Information */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Local Tax Rates</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Property Tax Rate:</span>
                      <span className="ml-2 text-gray-600">{(countyData.propertyTaxRate * 100).toFixed(3)}%</span>
                    </div>
                    <div>
                      <span className="font-medium">Local Sales Tax:</span>
                      <span className="ml-2 text-gray-600">{(countyData.localSalesTax * 100).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <MapPin className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 mb-2">
              Local tax data not available for {selectedState}
            </p>
            <p className="text-sm text-gray-500">
              We currently have detailed local tax information for major metropolitan areas in CA, NY, TX, and FL.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}