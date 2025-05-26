
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Search, FileText, Code, Image, ArrowRight, Zap, Shield, Globe } from 'lucide-react';

const Index = () => {
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
                to="/docs/setup" 
                className="inline-flex items-center border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold text-lg"
              >
                Setup Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything you need for professional documentation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern technologies and best practices for optimal user experience
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Rich Content Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Full markdown support with syntax highlighting, embedded media, and interactive elements
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Navigation</h3>
              <p className="text-gray-600 leading-relaxed">
                Intuitive sidebar navigation with search functionality and hierarchical organization
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Developer Friendly</h3>
              <p className="text-gray-600 leading-relaxed">
                Built with React and modern web technologies for easy customization and maintenance
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Secure & Reliable</h4>
                <p className="text-gray-600 text-sm">Static site hosting with GitHub Pages</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Responsive Design</h4>
                <p className="text-gray-600 text-sm">Perfect on desktop, tablet, and mobile</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Image className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Rich Media</h4>
                <p className="text-gray-600 text-sm">Images, videos, and interactive content</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Explore Documentation Sections
            </h2>
            <p className="text-xl text-gray-600">
              Organized content to help you find what you need quickly
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/docs/setup" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Getting Started</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Learn how to set up, customize, and deploy your documentation site
              </p>
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
            
            <Link to="/docs/tutorials" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tutorials & Guides</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Step-by-step tutorials and comprehensive guides for all skill levels
              </p>
              <div className="flex items-center text-green-600 font-medium group-hover:translate-x-2 transition-transform">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
            
            <Link to="/docs/reference" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">API Reference</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Complete API documentation and technical reference materials
              </p>
              <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform">
                Browse API <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to explore the documentation?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Dive into comprehensive guides, tutorials, and references to help you succeed
          </p>
          <Link 
            to="/docs" 
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Exploring
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
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
                Professional documentation hub built and maintained by Akash Gupta. 
                Empowering developers with comprehensive resources.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/docs" className="block text-gray-400 hover:text-white transition-colors">
                  Documentation
                </Link>
                <Link to="/docs/setup" className="block text-gray-400 hover:text-white transition-colors">
                  Setup Guide
                </Link>
                <Link to="/docs/tutorials" className="block text-gray-400 hover:text-white transition-colors">
                  Tutorials
                </Link>
                <Link to="/docs/reference" className="block text-gray-400 hover:text-white transition-colors">
                  API Reference
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Connect</h3>
              <div className="space-y-2">
                <a href="https://github.com" className="block text-gray-400 hover:text-white transition-colors">
                  GitHub
                </a>
                <p className="text-gray-400 text-sm">
                  © 2024 Akora Documentation Hub
                </p>
                <p className="text-gray-400 text-sm">
                  Built with React & Tailwind CSS
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
