
export interface MarkdownDoc {
  slug: string;
  title: string;
  content: string;
  topic: string;
  createdAt: string;
}

export interface DocumentTopic {
  id: string;
  title: string;
  subtopics: DocumentSubtopic[];
}

export interface DocumentSubtopic {
  id: string;
  title: string;
  docs: MarkdownDoc[];
}

// Document registry organized by topics (without subtopics)
const documentRegistry = [
  // Getting Started
  { slug: 'introduction', title: 'Introduction to Akora', topic: 'Getting Started', file: 'introduction.md' },
  { slug: 'how-to-add-documents', title: 'How to Add Documents', topic: 'Getting Started', file: 'how-to-add-documents.md' },
  { slug: 'quick-start', title: 'Quick Start Guide', topic: 'Getting Started', file: 'quick-start.md' },
  { slug: 'installation', title: 'Installation', topic: 'Getting Started', file: 'installation.md' },
  
  // Development
  { slug: 'api-guide', title: 'API Development Guide', topic: 'Development', file: 'api-guide.md' },
  { slug: 'database-setup', title: 'Database Setup', topic: 'Development', file: 'database-setup.md' },
  { slug: 'authentication', title: 'Authentication', topic: 'Development', file: 'authentication.md' },
  
  // Tutorials
  { slug: 'basic-tutorial', title: 'Basic Tutorial', topic: 'Tutorials', file: 'basic-tutorial.md' },
  { slug: 'advanced-concepts', title: 'Advanced Concepts', topic: 'Tutorials', file: 'advanced-concepts.md' },
  { slug: 'best-practices', title: 'Best Practices', topic: 'Tutorials', file: 'best-practices.md' },

  // Postgres
  { slug: 'postgres-backup', title: 'Postgres Backup', topic: 'Postgres', file: 'postgres-backup.md' },
  { slug: 'postgres restore', title: 'Postgres Restore', topic: 'Postgres', file: 'postgres-recovery.md' },
  
];

// Generate default content for documents
const getDefaultContent = (title: string, topic: string) => {
  return `# ${title}

*Topic: ${topic}*

## Overview

This document covers ${title.toLowerCase()} and provides comprehensive information about this topic.

## Key Points

- **Important Feature 1**: Description of the first key feature
- **Important Feature 2**: Description of the second key feature  
- **Important Feature 3**: Description of the third key feature

## Code Examples

Here's a basic example:

\`\`\`javascript
// Example implementation
const example = {
  title: "${title}",
  topic: "${topic}",
  status: "active"
};

console.log("Working with:", example.title);
\`\`\`

## SQL Examples

\`\`\`sql
-- Example SQL query
SELECT * FROM documents 
WHERE topic = '${topic}'
ORDER BY created_at DESC;
\`\`\`

## Related Documents

- [Introduction](/docs/introduction)
- [Quick Start](/docs/quick-start)
- [How to Add Documents](/docs/how-to-add-documents)

---

*Last updated: ${new Date().toLocaleDateString()}*`;
};

// Cache for documents
const docCache = new Map<string, MarkdownDoc>();

// Local storage key for custom documents
const CUSTOM_DOCS_KEY = 'akora-custom-documents';

// Get custom documents from localStorage
const getCustomDocuments = (): MarkdownDoc[] => {
  try {
    const stored = localStorage.getItem(CUSTOM_DOCS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load custom documents:', error);
    return [];
  }
};

// Save custom documents to localStorage
const saveCustomDocuments = (docs: MarkdownDoc[]): void => {
  try {
    localStorage.setItem(CUSTOM_DOCS_KEY, JSON.stringify(docs));
  } catch (error) {
    console.error('Failed to save custom documents:', error);
  }
};

// Get all available topics from both predefined and custom documents
export const getAllTopics = (): string[] => {
  const predefinedTopics = [...new Set(documentRegistry.map(doc => doc.topic))];
  const customDocs = getCustomDocuments();
  const customTopics = [...new Set(customDocs.map(doc => doc.topic))];
  
  return [...new Set([...predefinedTopics, ...customTopics])].sort();
};

// Load all documents and organize by topics
export const loadAllDocuments = async (): Promise<DocumentTopic[]> => {
  // Clear cache to ensure fresh data
  docCache.clear();
  
  // Load predefined documents
  const predefinedDocs = await Promise.all(
    documentRegistry.map(async (doc) => {
      try {
        const response = await fetch(`/docs/${doc.file}`);
        let content: string;
        
        if (response.ok) {
          content = await response.text();
        } else {
          content = getDefaultContent(doc.title, doc.topic);
        }
        
        const docData: MarkdownDoc = {
          slug: doc.slug,
          title: doc.title,
          content,
          topic: doc.topic,
          createdAt: new Date().toISOString()
        };
        
        docCache.set(doc.slug, docData);
        return docData;
      } catch (error) {
        const fallbackDoc: MarkdownDoc = {
          slug: doc.slug,
          title: doc.title,
          content: getDefaultContent(doc.title, doc.topic),
          topic: doc.topic,
          createdAt: new Date().toISOString()
        };
        docCache.set(doc.slug, fallbackDoc);
        return fallbackDoc;
      }
    })
  );

  // Load custom documents
  const customDocs = getCustomDocuments();
  customDocs.forEach(doc => {
    docCache.set(doc.slug, doc);
  });

  // Combine all documents
  const allDocs = [...predefinedDocs, ...customDocs];

  // Organize documents by topics
  const topicsMap = new Map<string, DocumentTopic>();
  
  allDocs.forEach(doc => {
    if (!topicsMap.has(doc.topic)) {
      topicsMap.set(doc.topic, {
        id: doc.topic.toLowerCase().replace(/\s+/g, '-'),
        title: doc.topic,
        subtopics: []
      });
    }
    
    const topic = topicsMap.get(doc.topic)!;
    
    // Create a single subtopic for all documents in a topic
    let generalSubtopic = topic.subtopics.find(s => s.title === 'General');
    if (!generalSubtopic) {
      generalSubtopic = {
        id: 'general',
        title: 'General',
        docs: []
      };
      topic.subtopics.push(generalSubtopic);
    }
    generalSubtopic.docs.push(doc);
  });

  return Array.from(topicsMap.values());
};

// Get single document by slug
export const getDocBySlug = async (slug: string): Promise<MarkdownDoc | null> => {
  if (docCache.has(slug)) {
    return docCache.get(slug)!;
  }
  
  // Check custom documents first
  const customDocs = getCustomDocuments();
  const customDoc = customDocs.find(doc => doc.slug === slug);
  if (customDoc) {
    docCache.set(slug, customDoc);
    return customDoc;
  }
  
  // Check predefined documents
  const docConfig = documentRegistry.find(doc => doc.slug === slug);
  if (!docConfig) {
    return null;
  }

  try {
    const response = await fetch(`/docs/${docConfig.file}`);
    let content: string;
    
    if (response.ok) {
      content = await response.text();
    } else {
      content = getDefaultContent(docConfig.title, docConfig.topic);
    }
    
    const docData: MarkdownDoc = {
      slug: docConfig.slug,
      title: docConfig.title,
      content,
      topic: docConfig.topic,
      createdAt: new Date().toISOString()
    };
    
    docCache.set(slug, docData);
    return docData;
  } catch (error) {
    const fallbackDoc: MarkdownDoc = {
      slug: docConfig.slug,
      title: docConfig.title,
      content: getDefaultContent(docConfig.title, docConfig.topic),
      topic: docConfig.topic,
      createdAt: new Date().toISOString()
    };
    docCache.set(slug, fallbackDoc);
    return fallbackDoc;
  }
};

// Save document (for editor)
export const saveDocument = async (doc: Partial<MarkdownDoc>): Promise<boolean> => {
  try {
    if (!doc.slug || !doc.title || !doc.content || !doc.topic) {
      throw new Error('Missing required fields');
    }

    const docData: MarkdownDoc = {
      slug: doc.slug,
      title: doc.title,
      content: doc.content,
      topic: doc.topic,
      createdAt: doc.createdAt || new Date().toISOString()
    };
    
    // Add to cache
    docCache.set(doc.slug, docData);
    
    // Get existing custom documents
    const customDocs = getCustomDocuments();
    
    // Check if document already exists
    const existingIndex = customDocs.findIndex(d => d.slug === doc.slug);
    
    if (existingIndex >= 0) {
      // Update existing document
      customDocs[existingIndex] = docData;
    } else {
      // Add new document
      customDocs.push(docData);
    }
    
    // Save to localStorage
    saveCustomDocuments(customDocs);
    
    console.log(`Document saved: ${doc.slug}`);
    return true;
  } catch (error) {
    console.error(`Failed to save document:`, error);
    return false;
  }
};
