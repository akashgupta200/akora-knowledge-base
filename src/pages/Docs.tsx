import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, BookOpen, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import DocumentList from '../components/DocumentList';
import DocumentEditor from '../components/DocumentEditor';
import { loadAllDocuments, getDocBySlug, DocumentTopic, MarkdownDoc } from '../utils/markdownLoader';

const Docs = () => {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [topics, setTopics] = useState<DocumentTopic[]>([]);
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
        doc.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.subtopic && doc.subtopic.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })).filter(subtopic => subtopic.docs.length > 0)
  })).filter(topic => topic.subtopics.length > 0);

  const isViewingDocument = currentDoc !== null;

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      {/* Header */}
      <header className={`border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/docs" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className={`font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Akora Docs
                </span>
              </Link>
              
              {!isViewingDocument && (
                <div className="hidden md:flex relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 w-64 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <DocumentEditor isDark={isDark} onSave={loadDocuments} />
              
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Loading documents...
            </div>
          </div>
        ) : isViewingDocument ? (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Link 
                  to="/docs" 
                  className={`text-sm ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                >
                  ← Back to Documents
                </Link>
                <h1 className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {currentDoc.title}
                </h1>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentDoc.topic} {currentDoc.subtopic && `• ${currentDoc.subtopic}`}
                </p>
              </div>
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

            {filteredTopics.length > 0 ? (
              <DocumentList topics={filteredTopics} isDark={isDark} />
            ) : searchQuery ? (
              <div className="text-center py-12">
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  No documents found matching "{searchQuery}"
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  No documents available. Add your first document to get started!
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Docs;
