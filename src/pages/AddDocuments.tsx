import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, BookOpen, ChevronRight, ChevronDown, Home, Github, FileText, FolderPlus, Code, Image } from 'lucide-react';
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
            <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
              <h1>How to Add New Documents to Akora</h1>
              
              <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Complete guide for adding new topics and subtopics to your Akora documentation site.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-12 not-prose">
                <div className={`p-6 rounded-xl border ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-center mb-4">
                    <FolderPlus className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Adding New Topics
                    </h3>
                  </div>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Create main sections in your documentation
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-center mb-4">
                    <FileText className="w-6 h-6 text-green-600 mr-3" />
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Adding Subtopics
                    </h3>
                  </div>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Create detailed pages within topics
                  </p>
                </div>
              </div>

              <h2>Overview</h2>
              <p>
                Akora uses a simple file-based structure where each document is a React component. 
                To add new content, you'll create new page components and update the navigation structure.
              </p>

              <h2>Step 1: Create a New Page Component</h2>
              <p>All documentation pages are stored in the <code>src/pages</code> directory.</p>
              
              <h3>For a New Topic (Main Section)</h3>
              <p>Create a new file like <code>src/pages/DatabaseGuide.tsx</code>:</p>
              <pre className={`p-4 rounded-lg overflow-x-auto ${
                isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
              }`}>
                <code>{`import React from 'react';

const DatabaseGuide = () => {
  return (
    <div className="prose max-w-none">
      <h1>Database Guide</h1>
      <p>This is your main database documentation.</p>
      
      <h2>SQL Basics</h2>
      <p>Learn the fundamentals of SQL.</p>
      
      <h3>SELECT Statements</h3>
      <pre>
        <code className="language-sql">
{\`SELECT * FROM users WHERE active = true;\`}
        </code>
      </pre>
      
      <h2>Images</h2>
      <img src="/images/database-schema.png" alt="Database Schema" />
      
      <h2>Videos</h2>
      <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        frameBorder="0" 
        allowFullScreen>
      </iframe>
    </div>
  );
};

export default DatabaseGuide;`}</code>
              </pre>

              <h3>For a Subtopic</h3>
              <p>Create a subtopic like <code>src/pages/SQLBasics.tsx</code>:</p>
              <pre className={`p-4 rounded-lg overflow-x-auto ${
                isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
              }`}>
                <code>{`import React from 'react';

const SQLBasics = () => {
  return (
    <div className="prose max-w-none">
      <h1>SQL Basics</h1>
      <p>Learn the fundamentals of SQL database queries.</p>
      
      <h2>Common SQL Commands</h2>
      <ul>
        <li><strong>SELECT:</strong> Retrieve data from tables</li>
        <li><strong>INSERT:</strong> Add new records</li>
        <li><strong>UPDATE:</strong> Modify existing records</li>
        <li><strong>DELETE:</strong> Remove records</li>
      </ul>
      
      <h2>Example Query</h2>
      <pre>
        <code className="language-sql">
{\`SELECT users.name, users.email 
FROM users 
WHERE users.created_at >= '2024-01-01'
ORDER BY users.name ASC;\`}
        </code>
      </pre>
    </div>
  );
};

export default SQLBasics;`}</code>
              </pre>

              <h2>Step 2: Add Route to App.tsx</h2>
              <p>Open <code>src/App.tsx</code> and add your new routes:</p>
              <pre className={`p-4 rounded-lg overflow-x-auto ${
                isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
              }`}>
                <code>{`// Add imports at the top
import DatabaseGuide from "./pages/DatabaseGuide";
import SQLBasics from "./pages/SQLBasics";

// Add routes in the Routes section
<Route path="/docs/database-guide" element={<DatabaseGuide />} />
<Route path="/docs/sql-basics" element={<SQLBasics />} />`}</code>
              </pre>

              <h2>Step 3: Update Navigation</h2>
              <p>Open <code>src/pages/Docs.tsx</code> and update the <code>navigationItems</code> array:</p>
              <pre className={`p-4 rounded-lg overflow-x-auto ${
                isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
              }`}>
                <code>{`const navigationItems = [
  // ... existing sections
  {
    id: 'database',
    title: 'Database',
    items: [
      { title: 'Database Guide', path: '/docs/database-guide' },
      { title: 'SQL Basics', path: '/docs/sql-basics' },
      { title: 'Advanced Queries', path: '/docs/advanced-queries' },
    ]
  }
];`}</code>
              </pre>

              <h2>Content Guidelines</h2>
              
              <h3>Markdown Support</h3>
              <ul>
                <li><strong>Headers:</strong> Use <code>h1</code>, <code>h2</code>, <code>h3</code> tags</li>
                <li><strong>Text formatting:</strong> <code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>, <code>&lt;code&gt;</code></li>
                <li><strong>Lists:</strong> <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code></li>
                <li><strong>Links:</strong> <code>&lt;a href="..."&gt;</code> or <code>&lt;Link to="..."&gt;</code></li>
              </ul>

              <h3>Code Blocks</h3>
              <p>For syntax-highlighted code blocks:</p>
              <pre className={`p-4 rounded-lg overflow-x-auto ${
                isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
              }`}>
                <code>{`<pre className="p-4 rounded-lg bg-gray-100">
  <code className="language-sql">
{\`SELECT * FROM users;\`}
  </code>
</pre>`}</code>
              </pre>

              <h3>Images</h3>
              <p>Place images in the <code>public/images</code> directory and reference them:</p>
              <pre className={`p-4 rounded-lg overflow-x-auto ${
                isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
              }`}>
                <code>{`<img src="/images/your-image.png" alt="Description" className="w-full rounded-lg shadow-lg" />`}</code>
              </pre>

              <h3>Videos</h3>
              <p>Embed YouTube videos or other media:</p>
              <pre className={`p-4 rounded-lg overflow-x-auto ${
                isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
              }`}>
                <code>{`<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  frameBorder="0" 
  allowFullScreen
  className="w-full max-w-2xl rounded-lg">
</iframe>`}</code>
              </pre>

              <h2>File Organization</h2>
              <p>Keep your documentation organized:</p>
              <ul>
                <li><strong>Main topics:</strong> Create separate page components for major sections</li>
                <li><strong>Subtopics:</strong> Create individual pages for detailed content</li>
                <li><strong>Images:</strong> Store in <code>public/images/</code></li>
                <li><strong>Components:</strong> Create reusable components in <code>src/components/</code></li>
              </ul>

              <h2>Best Practices</h2>
              <ul>
                <li>Use descriptive file names (e.g., <code>DatabaseSetup.tsx</code>, not <code>Page1.tsx</code>)</li>
                <li>Include clear headings and subheadings</li>
                <li>Add code examples where relevant</li>
                <li>Test in both light and dark modes</li>
                <li>Keep pages focused on specific topics</li>
                <li>Link between related pages</li>
              </ul>

              <h2>Publishing Changes</h2>
              <p>Once you've added your new documents:</p>
              <ol>
                <li>Test locally by running the development server</li>
                <li>Commit your changes to Git</li>
                <li>Push to your GitHub repository</li>
                <li>GitHub Pages will automatically deploy your updates</li>
              </ol>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddDocuments;
