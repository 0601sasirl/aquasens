import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, TrendingUp, Download } from 'lucide-react';

// Sample historical data (in real app, this would come from your database)
const generateHistoricalData = (days: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      timestamp: date.getTime(),
      ph: +(6.8 + Math.random() * 0.8).toFixed(2),
      tds: +(230 + Math.random() * 40).toFixed(1),
      turbidity: +(1.5 + Math.random() * 2).toFixed(2),
      temperature: +(23 + Math.random() * 4).toFixed(1),
    });
  }
  
  return data;
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
  const [selectedMetric, setSelectedMetric] = useState<'ph' | 'tds' | 'turbidity' | 'temperature'>('ph');

  const dataPoints = {
    '24h': 24,
    '7d': 7,
    '30d': 30,
    '90d': 90,
  };

  const data = generateHistoricalData(dataPoints[timeRange]);

  const metrics = {
    ph: { label: 'pH Level', color: '#3B82F6', unit: '', range: '6.5-8.5' },
    tds: { label: 'TDS', color: '#06B6D4', unit: 'ppm', range: '<300' },
    turbidity: { label: 'Turbidity', color: '#8B5CF6', unit: 'NTU', range: '<5' },
    temperature: { label: 'Temperature', color: '#F59E0B', unit: '°C', range: '15-25' },
  };

  const currentMetric = metrics[selectedMetric];

  // Calculate statistics
  const values = data.map(d => d[selectedMetric]);
  const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
  const min = Math.min(...values).toFixed(2);
  const max = Math.max(...values).toFixed(2);
  const trend = values[values.length - 1] > values[0] ? 'up' : 'down';
  const trendPercent = Math.abs(((values[values.length - 1] - values[0]) / values[0]) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 pb-20">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Historical water quality data</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Time Range Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Time Range</h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {(['24h', '7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`py-2 px-4 rounded-xl font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {range === '24h' ? 'Last 24h' : `Last ${range.slice(0, -1)} days`}
              </button>
            ))}
          </div>
        </div>

        {/* Metric Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(Object.keys(metrics) as Array<keyof typeof metrics>).map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`p-4 rounded-2xl transition-all ${
                selectedMetric === metric
                  ? 'bg-white dark:bg-gray-800 shadow-lg ring-2 ring-blue-500'
                  : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {metrics[metric].label}
                </span>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: metrics[metric].color }}
                ></div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {data[data.length - 1][metric]}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  {metrics[metric].unit}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {avg} {currentMetric.unit}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Minimum</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {min} {currentMetric.unit}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Maximum</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {max} {currentMetric.unit}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Trend</p>
            <div className="flex items-center gap-2">
              <TrendingUp
                className={`w-5 h-5 ${trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'}`}
              />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {trendPercent}%
              </p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {currentMetric.label} Over Time
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Safe range: {currentMetric.range} {currentMetric.unit}
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis
                dataKey="date"
                className="text-xs text-gray-600 dark:text-gray-400"
              />
              <YAxis className="text-xs text-gray-600 dark:text-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgb(31 41 55)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={currentMetric.color}
                strokeWidth={3}
                dot={{ fill: currentMetric.color, r: 4 }}
                activeDot={{ r: 6 }}
                name={currentMetric.label}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-3">💡 Insights</h3>
          <ul className="space-y-2 text-blue-100">
            <li>• Your {currentMetric.label.toLowerCase()} has {trend === 'up' ? 'increased' : 'decreased'} by {trendPercent}% over the selected period</li>
            <li>• Average reading: {avg} {currentMetric.unit} (Safe range: {currentMetric.range})</li>
            <li>• {values.filter(v => selectedMetric === 'ph' ? (v >= 6.5 && v <= 8.5) : selectedMetric === 'tds' ? v < 300 : selectedMetric === 'turbidity' ? v < 5 : true).length} out of {values.length} readings were within safe range</li>
          </ul>
        </div>
      </div>
    </div>
  );
}