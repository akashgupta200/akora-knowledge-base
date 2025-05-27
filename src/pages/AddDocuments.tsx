import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, BookOpen, Home, Github, FileText, FolderPlus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AddDocuments = () => {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started']);
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
        { title: 'Adding Documents', path: '/docs/add-documents' },
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

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-4xl mx-auto">
        <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
          <h1>How to Add New Documents to Akora</h1>
          
          <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Simple 3-step process to add new documentation.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12 not-prose">
            <div className={`p-6 rounded-xl border ${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Create Markdown File
                </h3>
              </div>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Add your .md file to public/docs/ folder
              </p>
            </div>

            <div className={`p-6 rounded-xl border ${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center mb-4">
                <FolderPlus className="w-6 h-6 text-green-600 mr-3" />
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Register Document
                </h3>
              </div>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Add entry to markdownLoader.ts
              </p>
            </div>
          </div>

          <h2>Step 1: Create Your Markdown File</h2>
          <p>Create a new <code>.md</code> file in the <code>public/docs/</code> folder:</p>
          
          <pre className={`p-4 rounded-lg overflow-x-auto ${
            isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
          }`}>
            <code>{`public/docs/my-guide.md`}</code>
          </pre>

          <p>Write your content in markdown format:</p>
          
          <pre className={`p-4 rounded-lg overflow-x-auto ${
            isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
          }`}>
            <code>{`# My Guide

This is my new documentation page.

## Features

- Easy to write
- Supports code blocks
- Images and links work

\`\`\`javascript
console.log("Hello World!");
\`\`\`

![Example](/images/example.png)
`}</code>
          </pre>

          <h2>Step 2: Register Your Document</h2>
          <p>Open <code>src/utils/markdownLoader.ts</code> and add your document to the registry:</p>
          
          <pre className={`p-4 rounded-lg overflow-x-auto ${
            isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
          }`}>
            <code>{`const documentRegistry = [
  { slug: 'introduction', title: 'Introduction', file: 'introduction.md' },
  { slug: 'quick-start', title: 'Quick Start', file: 'quick-start.md' },
  { slug: 'my-guide', title: 'My Guide', file: 'my-guide.md' }, // ← Add this line
];`}</code>
          </pre>

          <h2>Step 3: Add Navigation Link</h2>
          <p>Open <code>src/pages/Docs.tsx</code> and add your document to the navigation:</p>
          
          <pre className={`p-4 rounded-lg overflow-x-auto ${
            isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
          }`}>
            <code>{`const navigationItems = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      { title: 'Introduction', path: '/docs/introduction' },
      { title: 'Quick Start', path: '/docs/quick-start' },
      { title: 'My Guide', path: '/docs/my-guide' }, // ← Add this line
    ]
  }
];`}</code>
          </pre>

          <h2>That's It!</h2>
          <p>Your document will now be automatically:</p>
          <ul>
            <li>✅ Loaded from the markdown file</li>
            <li>✅ Rendered with syntax highlighting</li>
            <li>✅ Accessible via navigation</li>
            <li>✅ Available at <code>/docs/my-guide</code></li>
          </ul>

          <h2>Tips</h2>
          <ul>
            <li>Use descriptive slug names (e.g., 'api-reference' not 'page1')</li>
            <li>Keep file names simple, lowercase with hyphens</li>
            <li>Test your markdown in the preview</li>
            <li>Images go in <code>public/images/</code> folder</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AddDocuments;
