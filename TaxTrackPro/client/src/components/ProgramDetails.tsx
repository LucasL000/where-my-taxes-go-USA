import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info, ArrowRight } from "lucide-react";
import { formatCurrency, type AllocationItem } from "@/lib/taxCalculations";

interface ProgramDetailsProps {
  federalAllocations: AllocationItem[];
  stateAllocations: AllocationItem[];
}

// Detailed program information
const programDetails = {
  "Defense & Military": {
    description: "Funds the Department of Defense, military operations worldwide, veteran care, and national security infrastructure.",
    subprograms: [
      { name: "Active Military Personnel", percentage: 35, description: "Salaries and benefits for active duty service members" },
      { name: "Military Operations & Maintenance", percentage: 30, description: "Day-to-day operations, training, and equipment maintenance" },
      { name: "Military Construction & Procurement", percentage: 25, description: "New equipment, weapons systems, and facility construction" },
      { name: "Military Family Housing & Benefits", percentage: 10, description: "Housing, healthcare, and family support services" }
    ]
  },
  "Social Security": {
    description: "Provides retirement, disability, and survivor benefits to eligible Americans.",
    subprograms: [
      { name: "Retirement Benefits", percentage: 75, description: "Monthly payments to retirees 62 and older" },
      { name: "Disability Insurance", percentage: 20, description: "Benefits for workers unable to work due to disability" },
      { name: "Survivor Benefits", percentage: 5, description: "Benefits for spouses and children of deceased workers" }
    ]
  },
  "Medicare": {
    description: "Health insurance program for Americans 65 and older and certain younger people with disabilities.",
    subprograms: [
      { name: "Hospital Insurance (Part A)", percentage: 50, description: "Covers inpatient hospital stays and skilled nursing" },
      { name: "Medical Insurance (Part B)", percentage: 30, description: "Covers doctor visits and outpatient services" },
      { name: "Medicare Advantage (Part C)", percentage: 15, description: "Private insurance plans that include Parts A and B" },
      { name: "Prescription Drug Coverage (Part D)", percentage: 5, description: "Prescription drug insurance coverage" }
    ]
  },
  "Public Education (K-12)": {
    description: "Funding for elementary and secondary education, including teacher salaries, facilities, and educational programs.",
    subprograms: [
      { name: "Teacher Salaries & Benefits", percentage: 60, description: "Compensation for teachers and educational staff" },
      { name: "School Facilities & Maintenance", percentage: 20, description: "Building construction, maintenance, and utilities" },
      { name: "Educational Materials & Technology", percentage: 10, description: "Textbooks, computers, and learning resources" },
      { name: "Special Programs & Support Services", percentage: 10, description: "Special education, counseling, and extracurricular activities" }
    ]
  },
  "Higher Education & Universities": {
    description: "State funding for public colleges, universities, and community colleges.",
    subprograms: [
      { name: "Faculty Salaries & Research", percentage: 50, description: "Professor salaries and research funding" },
      { name: "Campus Operations & Maintenance", percentage: 25, description: "Facility upkeep and campus services" },
      { name: "Student Financial Aid", percentage: 15, description: "State-funded scholarships and grants" },
      { name: "Capital Projects", percentage: 10, description: "New buildings and major renovations" }
    ]
  },
  "Healthcare & Social Services": {
    description: "State and local health programs, mental health services, and social welfare programs.",
    subprograms: [
      { name: "Public Health Programs", percentage: 40, description: "Disease prevention, immunizations, and health monitoring" },
      { name: "Mental Health Services", percentage: 25, description: "Community mental health centers and crisis intervention" },
      { name: "Social Services", percentage: 20, description: "Child welfare, family services, and elder care" },
      { name: "Emergency Medical Services", percentage: 15, description: "Ambulance services and emergency response" }
    ]
  },
  "Transportation & Roads": {
    description: "Highway construction and maintenance, public transit, and transportation infrastructure.",
    subprograms: [
      { name: "Highway Maintenance & Repair", percentage: 45, description: "Road resurfacing, pothole repair, and bridge maintenance" },
      { name: "New Road Construction", percentage: 30, description: "Building new highways and expanding existing roads" },
      { name: "Public Transit Systems", percentage: 15, description: "Buses, light rail, and subway systems" },
      { name: "Traffic Management & Safety", percentage: 10, description: "Traffic signals, signs, and safety improvements" }
    ]
  },
  "Public Safety & Police": {
    description: "Local police departments, emergency services, and crime prevention programs.",
    subprograms: [
      { name: "Police Officer Salaries", percentage: 70, description: "Wages and benefits for police officers" },
      { name: "Equipment & Vehicles", percentage: 15, description: "Police cars, communication equipment, and protective gear" },
      { name: "Training & Professional Development", percentage: 10, description: "Police academy training and continuing education" },
      { name: "Community Policing Programs", percentage: 5, description: "Neighborhood watch and community outreach initiatives" }
    ]
  }
};

export default function ProgramDetails({ federalAllocations, stateAllocations }: ProgramDetailsProps) {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const handleProgramClick = (program: AllocationItem) => {
    setSelectedProgram(program.category);
  };

  const getSelectedProgramDetails = () => {
    if (!selectedProgram || !programDetails[selectedProgram as keyof typeof programDetails]) {
      return null;
    }
    return programDetails[selectedProgram as keyof typeof programDetails];
  };

  const getSelectedProgramAmount = () => {
    const federal = federalAllocations.find(item => item.category === selectedProgram);
    const state = stateAllocations.find(item => item.category === selectedProgram);
    return federal?.amount || state?.amount || 0;
  };

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Info className="mr-3 text-blue-600" size={24} />
            Detailed Program Breakdown
          </h3>
          <p className="text-gray-600 mb-6">
            Click on any program below to see detailed information about how your tax dollars are used within that program.
          </p>

          {/* Federal Programs */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Federal Programs</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {federalAllocations
                .filter(item => programDetails[item.category as keyof typeof programDetails])
                .map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 justify-between hover:bg-blue-50"
                  onClick={() => handleProgramClick(item)}
                >
                  <div className="text-left">
                    <div className="font-medium">{item.category}</div>
                    <div className="text-sm text-gray-600">{formatCurrency(item.amount)}</div>
                  </div>
                  <ArrowRight size={16} className="text-gray-400" />
                </Button>
              ))}
            </div>
          </div>

          {/* State Programs */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">State & Local Programs</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {stateAllocations
                .filter(item => programDetails[item.category as keyof typeof programDetails])
                .map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 justify-between hover:bg-green-50"
                  onClick={() => handleProgramClick(item)}
                >
                  <div className="text-left">
                    <div className="font-medium">{item.category}</div>
                    <div className="text-sm text-gray-600">{formatCurrency(item.amount)}</div>
                  </div>
                  <ArrowRight size={16} className="text-gray-400" />
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedProgram}</DialogTitle>
            </DialogHeader>
            
            {getSelectedProgramDetails() && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Your Contribution</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(getSelectedProgramAmount())}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    This is how much of your tax dollars goes to {selectedProgram.toLowerCase()}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Program Overview</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {getSelectedProgramDetails()?.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">How Your Money Is Used</h4>
                  <div className="space-y-4">
                    {getSelectedProgramDetails()?.subprograms.map((subprogram, index) => {
                      const subAmount = getSelectedProgramAmount() * (subprogram.percentage / 100);
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-gray-900">{subprogram.name}</h5>
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">
                                {formatCurrency(subAmount)}
                              </div>
                              <div className="text-sm text-gray-600">
                                {subprogram.percentage}%
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{subprogram.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}