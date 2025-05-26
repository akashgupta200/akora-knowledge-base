
import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, BookOpen, ChevronRight, ChevronDown, Home, Github } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Docs = () => {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started', 'tutorials']);
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem('akora-theme');
    if (saved) {
      setIsDark(saved === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('akora-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const navigationItems = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      items: [
        { title: 'Introduction', path: '/docs/introduction' },
        { title: 'Quick Start', path: '/docs/quick-start' },
        { title: 'Installation', path: '/docs/installation' },
        { title: 'Setup Guide', path: '/docs/setup' },
      ]
    },
    {
      id: 'tutorials',
      title: 'Tutorials',
      items: [
        { title: 'Basic Tutorial', path: '/docs/basic-tutorial' },
        { title: 'Advanced Concepts', path: '/docs/advanced-concepts' },
        { title: 'Best Practices', path: '/docs/best-practices' },
      ]
    },
    {
      id: 'reference',
      title: 'Reference',
      items: [
        { title: 'API Documentation', path: '/docs/api' },
        { title: 'Configuration', path: '/docs/configuration' },
        { title: 'Troubleshooting', path: '/docs/troubleshooting' },
      ]
    },
    {
      id: 'examples',
      title: 'Examples',
      items: [
        { title: 'Code Samples', path: '/docs/code-samples' },
        { title: 'Use Cases', path: '/docs/use-cases' },
        { title: 'Integrations', path: '/docs/integrations' },
      ]
    }
  ];

  const getCurrentContent = () => {
    const path = location.pathname;
    
    if (path === '/docs/setup') {
      return (
        <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
          <h1>Setup Guide</h1>
          <p>This guide will help you set up and customize your Akora documentation site.</p>
          
          <h2>Adding New Documents</h2>
          <p>To add new documents to your Akora site:</p>
          <ol>
            <li><strong>Create a new page component</strong> in the <code>src/pages</code> directory</li>
            <li><strong>Add the route</strong> to <code>App.tsx</code></li>
            <li><strong>Update the navigation</strong> in <code>Docs.tsx</code> to include your new page</li>
          </ol>
          
          <h3>Step 1: Create a New Page</h3>
          <p>Create a new file like <code>src/pages/YourNewPage.tsx</code>:</p>
          <pre className={`p-4 rounded-lg overflow-x-auto ${
            isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
          }`}>
            <code>{`import React from 'react';

const YourNewPage = () => {
  return (
    <div className="prose max-w-none">
      <h1>Your New Page</h1>
      <p>Content goes here...</p>
    </div>
  );
};

export default YourNewPage;`}</code>
          </pre>
          
          <h3>Step 2: Add Route</h3>
          <p>In <code>App.tsx</code>, add your new route:</p>
          <pre className={`p-4 rounded-lg overflow-x-auto ${
            isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
          }`}>
            <code>{`import YourNewPage from "./pages/YourNewPage";

// Add this route:
<Route path="/docs/your-new-page" element={<YourNewPage />} />`}</code>
          </pre>
          
          <h3>Step 3: Update Navigation</h3>
          <p>In <code>Docs.tsx</code>, add your page to the navigation items:</p>
          <pre className={`p-4 rounded-lg overflow-x-auto ${
            isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
          }`}>
            <code>{`{
  title: 'Your New Page',
  path: '/docs/your-new-page'
}`}</code>
          </pre>
          
          <h2>Content Guidelines</h2>
          <ul>
            <li>Use React components for interactive content</li>
            <li>Follow the existing styling patterns</li>
            <li>Include code examples where helpful</li>
            <li>Test in both light and dark modes</li>
          </ul>
        </div>
      );
    }
    
    // Default content
    return (
      <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
        <h1>Welcome to Akora Documentation</h1>
        
        <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Your comprehensive guide to getting started and mastering the platform.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12 not-prose">
          <Link
            to="/docs/setup"
            className={`p-6 rounded-xl border transition-all hover:shadow-lg ${
              isDark 
                ? 'bg-gray-800 border-gray-700 hover:border-blue-500' 
                : 'bg-white border-gray-200 hover:border-blue-300'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              🚀 Quick Start
            </h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Get up and running in minutes with our step-by-step guide.
            </p>
          </Link>

          <Link
            to="/docs/tutorials"
            className={`p-6 rounded-xl border transition-all hover:shadow-lg ${
              isDark 
                ? 'bg-gray-800 border-gray-700 hover:border-green-500' 
                : 'bg-white border-gray-200 hover:border-green-300'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              📚 Tutorials
            </h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Learn through practical examples and hands-on exercises.
            </p>
          </Link>
        </div>

        <h2>Getting Started</h2>
        <p>
          This documentation site provides comprehensive guides, tutorials, and reference materials 
          for developers and users. Each section is carefully organized to help you find the 
          information you need quickly.
        </p>

        <h3>Features</h3>
        <ul>
          <li><strong>Markdown Support:</strong> Full markdown formatting with extensions</li>
          <li><strong>Code Highlighting:</strong> Syntax highlighting for multiple languages</li>
          <li><strong>Rich Media:</strong> Embed images, videos, and interactive content</li>
          <li><strong>Dark Mode:</strong> Toggle between light and dark themes</li>
          <li><strong>Search:</strong> Powerful search functionality across all content</li>
        </ul>

        <h3>Sample SQL Code Block</h3>
        <pre className={`p-4 rounded-lg overflow-x-auto ${
          isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
        }`}>
          <code className="language-sql">
{`SELECT users.name, COUNT(orders.id) as order_count
FROM users
LEFT JOIN orders ON users.id = orders.user_id
WHERE users.created_at >= '2024-01-01'
GROUP BY users.id, users.name
ORDER BY order_count DESC
LIMIT 10;`}
          </code>
        </pre>

        <h3>Navigation</h3>
        <p>
          Use the sidebar to navigate through different sections of the documentation. 
          Each section can be expanded to show subsections and individual pages.
        </p>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      {/* Header */}
      <header className={`border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} sticky top-0 z-50 backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Akora
                </span>
              </Link>
              
              {/* Search Bar */}
              <div className="hidden md:flex relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 w-64 rounded-lg border ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <Link
                to="/"
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Home className="w-5 h-5" />
              </Link>
              
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-80 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r min-h-screen sticky top-16 overflow-y-auto`}>
          <div className="p-6">
            <h2 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Documentation
            </h2>
            
            <nav className="space-y-2">
              {navigationItems.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      isDark 
                        ? 'text-gray-200 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-medium">{section.title}</span>
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {expandedSections.includes(section.id) && (
                    <div className="ml-4 mt-2 space-y-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`block p-2 pl-4 rounded-lg text-sm transition-colors ${
                            location.pathname === item.path
                              ? isDark 
                                ? 'bg-blue-900 text-blue-200' 
                                : 'bg-blue-100 text-blue-800'
                              : isDark 
                                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            {getCurrentContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Docs;
