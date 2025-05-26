import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, BookOpen, ChevronRight, ChevronDown, Home, Github } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { getDocBySlug, MarkdownDoc } from '../utils/markdownLoader';

const Docs = () => {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started']);
  const [currentDoc, setCurrentDoc] = useState<MarkdownDoc | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const loadCurrentDoc = async () => {
      setLoading(true);
      const path = location.pathname;
      
      // Extract slug from path
      const slug = path.replace('/docs/', '').replace('/docs', '');
      
      if (slug && slug !== '') {
        const doc = await getDocBySlug(slug);
        setCurrentDoc(doc);
      } else {
        // Default content for /docs
        setCurrentDoc({
          slug: 'welcome',
          title: 'Welcome to Akora Documentation',
          path: '/docs',
          content: `# Welcome to Akora Documentation

Your comprehensive guide to getting started and mastering the platform.

## Quick Navigation

- [Introduction](/docs/introduction) - Learn about Akora and its features
- [Quick Start](/docs/quick-start) - Get up and running in minutes  
- [API Documentation](/docs/api) - Complete API reference
- [Configuration](/docs/configuration) - Setup and customization guide

## Getting Started

This documentation site provides comprehensive guides, tutorials, and reference materials for developers and users. Each section is carefully organized to help you find the information you need quickly.

Use the sidebar to navigate through different sections of the documentation. Each section can be expanded to show subsections and individual pages.

## Adding New Documents

To add new markdown documents to this site:

1. **Create a markdown file** in the \`public/docs/\` folder (e.g., \`my-new-doc.md\`)
2. **Add it to the document registry** in \`src/utils/markdownLoader.ts\`:
   \`\`\`javascript
   { slug: 'my-new-doc', title: 'My New Document', file: 'my-new-doc.md' }
   \`\`\`
3. **Add navigation link** in \`src/pages/Docs.tsx\` navigationItems array
4. **Add route** in \`src/App.tsx\` if needed

That's it! Your document will automatically be loaded and displayed.`
        });
      }
      setLoading(false);
    };

    loadCurrentDoc();
  }, [location.pathname]);

  const navigationItems = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      items: [
        { title: 'Introduction', path: '/docs/introduction' },
        { title: 'Quick Start', path: '/docs/quick-start' },
        { title: 'API Documentation', path: '/docs/api' },
        { title: 'Configuration', path: '/docs/configuration' },
        { title: 'Oracle Backup', path: '/docs/oracle_backup' },
      ]
    }
  ];

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
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
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
            {loading ? (
              <div className={`text-center py-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Loading...
              </div>
            ) : currentDoc ? (
              <MarkdownRenderer content={currentDoc.content} isDark={isDark} />
            ) : (
              <div className={`text-center py-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Document not found. Please check the URL or navigate using the sidebar.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Docs;
