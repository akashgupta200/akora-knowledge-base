
import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentTopic } from '../utils/markdownLoader';
import { FileText, ChevronRight } from 'lucide-react';

interface DocumentListProps {
  topics: DocumentTopic[];
  isDark: boolean;
}

const DocumentList: React.FC<DocumentListProps> = ({ topics, isDark }) => {
  return (
    <div className="space-y-8">
      {topics.map((topic) => (
        <div key={topic.id} className={`rounded-lg border p-6 ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {topic.title}
          </h2>
          
          <div className="space-y-4">
            {topic.subtopics.map((subtopic) => (
              <div key={subtopic.id}>
                <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {subtopic.title}
                </h3>
                
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {subtopic.docs.map((doc) => (
                    <Link
                      key={doc.slug}
                      to={`/docs/${doc.slug}`}
                      className={`flex items-center gap-3 p-4 rounded-lg border transition-all hover:shadow-md ${
                        isDark 
                          ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-200' 
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{doc.title}</h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {topic.title} • {subtopic.title}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
