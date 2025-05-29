import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, BarChart3, TrendingUp, Eye } from "lucide-react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { formatCurrency, type AllocationItem } from "@/lib/taxCalculations";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

interface TaxVisualizationProps {
  federalAllocations: AllocationItem[];
  stateAllocations: AllocationItem[];
  federalTotal: number;
  stateLocalTotal: number;
  totalTaxes: number;
  selectedState: string;
}

export default function TaxVisualization({
  federalAllocations,
  stateAllocations,
  federalTotal,
  stateLocalTotal,
  totalTaxes,
  selectedState
}: TaxVisualizationProps) {
  const [showCharts, setShowCharts] = useState(false);
  const [activeChart, setActiveChart] = useState<'pie' | 'historical' | 'comparison'>('pie');

  // Prepare pie chart data
  const federalPieData = {
    labels: federalAllocations.map(item => item.category),
    datasets: [{
      data: federalAllocations.map(item => item.amount),
      backgroundColor: [
        '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444',
        '#6366F1', '#F97316', '#14B8A6', '#84CC16', '#EC4899',
        '#64748B', '#06B6D4', '#22C55E', '#F472B6', '#A855F7', '#6B7280'
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  const statePieData = {
    labels: stateAllocations.map(item => item.category),
    datasets: [{
      data: stateAllocations.map(item => item.amount),
      backgroundColor: [
        '#3B82F6', '#6366F1', '#10B981', '#F59E0B', '#EF4444',
        '#F97316', '#22C55E', '#14B8A6', '#8B5CF6', '#EC4899',
        '#06B6D4', '#64748B', '#6B7280'
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  // Historical tax data (simplified example - you could expand this with real data)
  const historicalData = {
    labels: ['1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020', '2023'],
    datasets: [
      {
        label: 'Federal Tax Rate (%)',
        data: [20.4, 17.8, 17.0, 19.0, 18.0, 20.6, 15.1, 16.3, 19.3],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'State & Local Tax Rate (%)',
        data: [7.3, 8.4, 9.2, 9.1, 9.8, 9.9, 9.8, 10.3, 11.2],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }
    ]
  };

  // Tax comparison data
  const comparisonData = {
    labels: ['Your Taxes', 'US Average', 'Top 10%', 'Top 1%'],
    datasets: [{
      label: 'Annual Tax Burden ($)',
      data: [
        totalTaxes,
        totalTaxes * 0.85, // Approximate US average
        totalTaxes * 1.8,  // Top 10%
        totalTaxes * 4.2   // Top 1%
      ],
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            if (activeChart === 'pie') {
              return `${context.label}: ${formatCurrency(context.raw)}`;
            }
            return context.formattedValue;
          }
        }
      }
    }
  };

  if (!showCharts) {
    return (
      <Card className="border border-gray-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Tax Visualizations</h3>
          <p className="text-gray-600 mb-6">
            View interactive charts showing your tax allocation, historical trends, and comparisons
          </p>
          <Button 
            onClick={() => setShowCharts(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Eye className="mr-2" size={20} />
            Show Interactive Charts
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeChart === 'pie' ? 'default' : 'outline'}
              onClick={() => setActiveChart('pie')}
              size="sm"
            >
              <PieChart className="mr-2" size={16} />
              Allocation Charts
            </Button>
            <Button
              variant={activeChart === 'historical' ? 'default' : 'outline'}
              onClick={() => setActiveChart('historical')}
              size="sm"
            >
              <TrendingUp className="mr-2" size={16} />
              Historical Trends
            </Button>
            <Button
              variant={activeChart === 'comparison' ? 'default' : 'outline'}
              onClick={() => setActiveChart('comparison')}
              size="sm"
            >
              <BarChart3 className="mr-2" size={16} />
              Tax Comparison
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowCharts(false)}
              size="sm"
            >
              Hide Charts
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chart Display */}
      {activeChart === 'pie' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Federal Tax Allocation
              </h3>
              <div className="h-80">
                <Pie data={federalPieData} options={chartOptions} />
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                Total: {formatCurrency(federalTotal)}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                State & Local Tax Allocation
              </h3>
              <div className="h-80">
                <Pie data={statePieData} options={chartOptions} />
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                Total: {formatCurrency(stateLocalTotal)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {activeChart === 'historical' && (
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Historical Tax Rates (1950-2023)
            </h3>
            <div className="h-96">
              <Line data={historicalData} options={{
                ...chartOptions,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Tax Rate (%)'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Year'
                    }
                  }
                }
              }} />
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              Shows average effective tax rates as percentage of income over time
            </p>
          </CardContent>
        </Card>
      )}

      {activeChart === 'comparison' && (
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Tax Burden Comparison
            </h3>
            <div className="h-96">
              <Bar data={comparisonData} options={{
                ...chartOptions,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Annual Tax Burden ($)'
                    }
                  }
                }
              }} />
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              Compare your tax burden to different income groups
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}