
import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, BookOpen, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { loadAllDocuments, getDocBySlug, DocumentTopic, MarkdownDoc } from '../utils/markdownLoader';

const Docs = () => {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [topics, setTopics] = useState<DocumentTopic[]>([]);
  const [currentDoc, setCurrentDoc] = useState<MarkdownDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const allTopics = await loadAllDocuments();
      setTopics(allTopics);
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    const loadCurrentDoc = async () => {
      const path = location.pathname;
      const slug = path.replace('/docs/', '').replace('/docs', '');
      
      if (slug && slug !== '') {
        setLoading(true);
        const doc = await getDocBySlug(slug);
        setCurrentDoc(doc);
        setLoading(false);
      } else {
        setCurrentDoc(null);
      }
    };

    loadCurrentDoc();
  }, [location.pathname]);

  const filteredTopics = topics.map(topic => ({
    ...topic,
    subtopics: topic.subtopics.map(subtopic => ({
      ...subtopic,
      docs: subtopic.docs.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.topic.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(subtopic => subtopic.docs.length > 0)
  })).filter(topic => topic.subtopics.length > 0);

  const isViewingDocument = currentDoc !== null;

  return (
    <div className={`min-h-screen flex ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r`}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/docs" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className={`font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Akora Docs
              </span>
            </Link>
          </div>

          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 w-full rounded-lg border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          {/* Documents List */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Loading documents...
              </div>
            ) : filteredTopics.length > 0 ? (
              <div className="space-y-4">
                {filteredTopics.map((topic) => (
                  <div key={topic.id}>
                    <h3 className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                      {topic.title}
                    </h3>
                    {topic.subtopics.map((subtopic) => (
                      <div key={subtopic.id} className="space-y-1">
                        {subtopic.docs.map((doc) => (
                          <Link
                            key={doc.slug}
                            to={`/docs/${doc.slug}`}
                            className={`block px-2 py-1 text-sm rounded transition-colors ${
                              currentDoc?.slug === doc.slug
                                ? isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                                : isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {doc.title}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                No documents found matching "{searchQuery}"
              </div>
            ) : (
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                No documents available.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                {isViewingDocument && (
                  <Link 
                    to="/docs" 
                    className={`text-sm ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                  >
                    ← Back to Documents
                  </Link>
                )}
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
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Loading documents...
                </div>
              </div>
            ) : isViewingDocument ? (
              <div>
                <div className="mb-6">
                  <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {currentDoc.title}
                  </h1>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {currentDoc.topic}
                  </p>
                </div>
                
                <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
                  <MarkdownRenderer content={currentDoc.content} isDark={isDark} />
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Akora Documentation
                  </h1>
                  <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Comprehensive guides, tutorials, and references for developers
                  </p>
                </div>

                {topics.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {topics.map((topic) => (
                      <div key={topic.id} className={`p-6 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {topic.title}
                        </h2>
                        <div className="space-y-2">
                          {topic.subtopics.map((subtopic) => 
                            subtopic.docs.map((doc) => (
                              <Link
                                key={doc.slug}
                                to={`/docs/${doc.slug}`}
                                className={`block p-2 rounded transition-colors ${
                                  isDark 
                                    ? 'text-gray-300 hover:bg-gray-700' 
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                {doc.title}
                              </Link>
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      No documents available.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Docs;
