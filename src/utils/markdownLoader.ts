
export interface MarkdownDoc {
  slug: string;
  title: string;
  content: string;
  path: string;
}

// Expanded document registry with more topics and subtopics
const documentRegistry = [
  // Getting Started
  { slug: 'introduction', title: 'Introduction', file: 'introduction.md' },
  { slug: 'quick-start', title: 'Quick Start', file: 'quick-start.md' },
  { slug: 'installation', title: 'Installation Guide', file: 'installation.md' },
  { slug: 'setup', title: 'Setup Guide', file: 'setup.md' },
  
  // Tutorials
  { slug: 'basic-tutorial', title: 'Basic Tutorial', file: 'basic-tutorial.md' },
  { slug: 'advanced-concepts', title: 'Advanced Concepts', file: 'advanced-concepts.md' },
  { slug: 'best-practices', title: 'Best Practices', file: 'best-practices.md' },
  
  // Reference
  { slug: 'api', title: 'API Documentation', file: 'api.md' },
  { slug: 'configuration', title: 'Configuration', file: 'configuration.md' },
  { slug: 'troubleshooting', title: 'Troubleshooting', file: 'troubleshooting.md' },
  
  // Examples
  { slug: 'code-samples', title: 'Code Samples', file: 'code-samples.md' },
  { slug: 'use-cases', title: 'Use Cases', file: 'use-cases.md' },
  { slug: 'integrations', title: 'Integrations', file: 'integrations.md' },
  
  // Additional Topics
  { slug: 'tutorials', title: 'Tutorial Hub', file: 'tutorials.md' },
  { slug: 'reference', title: 'Reference Guide', file: 'reference.md' },
  { slug: 'oracle_backup', title: 'Oracle Backup', file: 'oracle_backup.md' },
  
  // Document Management
  { slug: 'add-documents', title: 'How to Add Documents', file: 'add-documents.md' },
];

// Optimized loading with caching
const docCache = new Map<string, MarkdownDoc>();

export const loadMarkdownDocs = async (): Promise<MarkdownDoc[]> => {
  const docs = await Promise.all(
    documentRegistry.map(async (doc) => {
      // Check cache first
      if (docCache.has(doc.slug)) {
        return docCache.get(doc.slug)!;
      }

      try {
        const response = await fetch(`/docs/${doc.file}`);
        const content = response.ok ? await response.text() : `# ${doc.title}\n\nContent coming soon...`;
        
        const docData = {
          slug: doc.slug,
          title: doc.title,
          path: `/docs/${doc.slug}`,
          content
        };
        
        // Cache the document
        docCache.set(doc.slug, docData);
        return docData;
      } catch (error) {
        console.log(`Failed to load ${doc.file}:`, error);
        const fallbackDoc = {
          slug: doc.slug,
          title: doc.title,
          path: `/docs/${doc.slug}`,
          content: `# ${doc.title}\n\nContent coming soon...`
        };
        docCache.set(doc.slug, fallbackDoc);
        return fallbackDoc;
      }
    })
  );

  return docs;
};

export const getDocBySlug = async (slug: string): Promise<MarkdownDoc | null> => {
  // Check cache first for single document
  if (docCache.has(slug)) {
    return docCache.get(slug)!;
  }
  
  const docConfig = documentRegistry.find(doc => doc.slug === slug);
  if (!docConfig) return null;

  try {
    const response = await fetch(`/docs/${docConfig.file}`);
    const content = response.ok ? await response.text() : `# ${docConfig.title}\n\nContent coming soon...`;
    
    const docData = {
      slug: docConfig.slug,
      title: docConfig.title,
      path: `/docs/${docConfig.slug}`,
      content
    };
    
    docCache.set(slug, docData);
    return docData;
  } catch (error) {
    console.log(`Failed to load ${docConfig.file}:`, error);
    const fallbackDoc = {
      slug: docConfig.slug,
      title: docConfig.title,
      path: `/docs/${docConfig.slug}`,
      content: `# ${docConfig.title}\n\nContent coming soon...`
    };
    docCache.set(slug, fallbackDoc);
    return fallbackDoc;
  }
};
