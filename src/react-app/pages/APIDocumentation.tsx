import { useState } from 'react';
import { Code, Copy, Check, Key, Zap, Shield, Book } from 'lucide-react';

const endpoints = [
  {
    method: 'GET',
    endpoint: '/api/v1/sensors',
    description: 'Get all sensors for authenticated user',
    auth: true,
    example: {
      request: `curl -X GET https://api.aquasens.com/v1/sensors \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "sensors": [
    {
      "id": "sensor_abc123",
      "name": "Kitchen Tap",
      "location": "Home",
      "status": "online",
      "last_reading": "2024-02-17T10:30:00Z"
    }
  ],
  "total": 1
}`
    }
  },
  {
    method: 'GET',
    endpoint: '/api/v1/readings/:sensor_id',
    description: 'Get latest water quality readings for a sensor',
    auth: true,
    example: {
      request: `curl -X GET https://api.aquasens.com/v1/readings/sensor_abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "sensor_id": "sensor_abc123",
  "timestamp": "2024-02-17T10:30:00Z",
  "data": {
    "ph": 7.2,
    "tds": 245,
    "turbidity": 2.3,
    "temperature": 25
  },
  "quality_score": 85,
  "status": "excellent"
}`
    }
  },
  {
    method: 'POST',
    endpoint: '/api/v1/readings',
    description: 'Submit new sensor reading',
    auth: true,
    example: {
      request: `curl -X POST https://api.aquasens.com/v1/readings \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sensor_id": "sensor_abc123",
    "ph": 7.2,
    "tds": 245,
    "turbidity": 2.3,
    "temperature": 25
  }'`,
      response: `{
  "id": "reading_xyz789",
  "sensor_id": "sensor_abc123",
  "timestamp": "2024-02-17T10:30:00Z",
  "quality_score": 85,
  "alerts": []
}`
    }
  },
  {
    method: 'GET',
    endpoint: '/api/v1/analytics/:sensor_id',
    description: 'Get historical analytics and trends',
    auth: true,
    example: {
      request: `curl -X GET https://api.aquasens.com/v1/analytics/sensor_abc123?period=7d \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "sensor_id": "sensor_abc123",
  "period": "7d",
  "averages": {
    "ph": 7.15,
    "tds": 248,
    "turbidity": 2.1,
    "temperature": 24.5
  },
  "trends": {
    "ph": "stable",
    "tds": "increasing",
    "turbidity": "decreasing"
  }
}`
    }
  }
];

export default function APIDocumentation() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'request' | 'response'>('request');

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              API Documentation
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AquaSens REST API
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Integrate water quality monitoring into your applications with our powerful API
          </p>
        </div>

        {/* Quick Start */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <Key className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Get API Key</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Available for Pro and Enterprise plans. Generate keys in Settings.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Rate Limits</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              1000 requests/hour for Pro, unlimited for Enterprise.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Authentication</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bearer token authentication with API keys.
            </p>
          </div>
        </div>

        {/* Base URL */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Book className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Base URL
          </h3>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 font-mono text-sm">
            <code className="text-blue-600 dark:text-blue-400">
              https://api.aquasens.com
            </code>
          </div>
        </div>

        {/* Endpoints */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Endpoints</h2>
          
          {endpoints.map((endpoint, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Endpoint Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-3 py-1 rounded-lg font-mono text-sm font-semibold ${
                      endpoint.method === 'GET'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-gray-900 dark:text-white font-mono">
                    {endpoint.endpoint}
                  </code>
                  {endpoint.auth && (
                    <span className="ml-auto px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg text-xs font-semibold">
                      🔒 Auth Required
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {endpoint.description}
                </p>
              </div>

              {/* Code Examples */}
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setActiveTab('request')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      activeTab === 'request'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Request
                  </button>
                  <button
                    onClick={() => setActiveTab('response')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      activeTab === 'response'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Response
                  </button>
                </div>

                <div className="relative">
                  <button
                    onClick={() =>
                      copyToClipboard(
                        activeTab === 'request'
                          ? endpoint.example.request
                          : endpoint.example.response,
                        index
                      )
                    }
                    className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-300" />
                    )}
                  </button>

                  <pre className="bg-gray-900 text-gray-100 rounded-xl p-6 overflow-x-auto text-sm">
                    <code>
                      {activeTab === 'request'
                        ? endpoint.example.request
                        : endpoint.example.response}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SDKs & Libraries */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">SDKs & Libraries</h3>
          <p className="mb-6 text-blue-100">
            Official client libraries to make integration even easier
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            {['Python', 'Node.js', 'Go', 'Ruby'].map((lang) => (
              <div
                key={lang}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Code className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">{lang}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Need help with the API?
          </p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
            Contact Developer Support
          </button>
        </div>
      </div>
    </div>
  );
}