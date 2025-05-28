
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, ArrowRight, Zap, FileText, Code } from 'lucide-react';
import { loadAllDocuments, DocumentTopic } from '../utils/markdownLoader';

const Index = () => {
  const [topics, setTopics] = useState<DocumentTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const allTopics = await loadAllDocuments();
        setTopics(allTopics);
      } catch (error) {
        console.error('Failed to load topics:', error);
      }
      setLoading(false);
    };

    loadTopics();
  }, []);

  const getTopicIcon = (topicTitle: string) => {
    const title = topicTitle.toLowerCase();
    if (title.includes('getting started') || title.includes('introduction')) {
      return BookOpen;
    } else if (title.includes('development') || title.includes('api')) {
      return Code;
    } else {
      return FileText;
    }
  };

  const getTopicColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600', 
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-indigo-500 to-indigo-600',
      'from-red-500 to-red-600'
    ];
    return colors[index % colors.length];
  };

  const getTopicHoverColor = (index: number) => {
    const colors = [
      'hover:border-blue-200',
      'hover:border-green-200',
      'hover:border-purple-200', 
      'hover:border-orange-200',
      'hover:border-indigo-200',
      'hover:border-red-200'
    ];
    return colors[index % colors.length];
  };

  const getTopicTextColor = (index: number) => {
    const colors = [
      'text-blue-600',
      'text-green-600',
      'text-purple-600',
      'text-orange-600', 
      'text-indigo-600',
      'text-red-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Akora</h1>
                <p className="text-xs text-gray-500">Documentation Hub</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/docs" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Browse Docs
              </Link>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              <span>Built and maintained by Akash Gupta</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Professional
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Documentation
              </span>
              <span className="block">Hub</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Comprehensive, organized, and accessible documentation for developers and teams. 
              Everything you need to learn, reference, and implement.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/docs" 
                className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Documentation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                to="/docs/how-to-add-documents" 
                className="inline-flex items-center border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold text-lg"
              >
                How to Add Documents
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Topics Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Browse Documentation Topics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides and references organized by topic
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="text-lg text-gray-600">Loading topics...</div>
            </div>
          ) : topics.length > 0 ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
              {topics.map((topic, index) => {
                const IconComponent = getTopicIcon(topic.title);
                const firstDoc = topic.subtopics[0]?.docs[0];
                const docCount = topic.subtopics.reduce((total, subtopic) => total + subtopic.docs.length, 0);
                
                return (
                  <Link 
                    key={topic.id} 
                    to={firstDoc ? `/docs/${firstDoc.slug}` : '/docs'} 
                    className={`group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 ${getTopicHoverColor(index)}`}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${getTopicColor(index)} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{topic.title}</h3>
                    <p className="text-gray-600 text-center leading-relaxed mb-4">
                      {docCount} document{docCount !== 1 ? 's' : ''} available
                    </p>
                    <div className={`flex items-center justify-center ${getTopicTextColor(index)} font-medium group-hover:translate-x-2 transition-transform`}>
                      Browse <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">
                No documentation topics available yet.
              </p>
              <Link 
                to="/docs" 
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Your First Document
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold text-lg">Akora</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Professional documentation hub built with React, TypeScript, and Tailwind CSS. 
                Organize and share your knowledge effectively.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Documentation</h3>
              <div className="space-y-2">
                <Link to="/docs" className="block text-gray-400 hover:text-white transition-colors">
                  Browse All Docs
                </Link>
                <Link to="/docs/how-to-add-documents" className="block text-gray-400 hover:text-white transition-colors">
                  How to Add Documents
                </Link>
                {topics.slice(0, 3).map(topic => (
                  <Link 
                    key={topic.id} 
                    to={`/docs`} 
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {topic.title}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">About</h3>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">
                  Built and maintained by Akash Gupta
                </p>
                <p className="text-gray-400 text-sm">
                  © 2024 Akora Documentation Hub
                </p>
                <p className="text-gray-400 text-sm">
                  Powered by React & Tailwind CSS
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
