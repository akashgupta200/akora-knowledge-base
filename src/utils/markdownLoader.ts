
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
  { slug: 'my-guide', title: 'My Guide', file: 'my-guide.md' },
  
  // Document Management
  { slug: 'add-documents', title: 'How to Add Documents', file: 'add-documents.md' },
];

// Default content for missing documents
const getDefaultContent = (title: string, slug: string) => `# ${title}

Welcome to ${title}! This document contains comprehensive information about this topic.

## Overview

This section provides an overview of the key concepts and features.

## Getting Started

Here's how you can get started with this topic:

1. **Step 1**: First, understand the basic concepts
2. **Step 2**: Review the examples and use cases
3. **Step 3**: Start implementing in your project

## Key Features

- Feature 1: Comprehensive documentation
- Feature 2: Easy to understand examples
- Feature 3: Best practices and guidelines

## Examples

\`\`\`javascript
// Example code snippet
const example = {
  title: "${title}",
  slug: "${slug}",
  status: "active"
};

console.log("Welcome to " + example.title);
\`\`\`

## Best Practices

- Always follow the recommended guidelines
- Test your implementation thoroughly
- Keep documentation up to date

## Troubleshooting

If you encounter any issues:

1. Check the console for errors
2. Verify your implementation
3. Consult the FAQ section

## Related Topics

- [Introduction](/docs/introduction)
- [Quick Start](/docs/quick-start)
- [API Documentation](/docs/api)

---

*This document was auto-generated. You can edit it using the document editor.*`;

// Optimized loading with caching and fallback content
const docCache = new Map<string, MarkdownDoc>();

export const loadMarkdownDocs = async (): Promise<MarkdownDoc[]> => {
  const docs = await Promise.all(
    documentRegistry.map(async (doc) => {
      // Check cache first
      if (docCache.has(doc.slug)) {
        return docCache.get(doc.slug)!;
      }

      try {
        console.log(`Loading document: ${doc.file}`);
        const response = await fetch(`/docs/${doc.file}`);
        let content: string;
        
        if (response.ok) {
          content = await response.text();
          console.log(`Successfully loaded: ${doc.file}`);
        } else {
          console.log(`File not found: ${doc.file}, using default content`);
          content = getDefaultContent(doc.title, doc.slug);
        }
        
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
          content: getDefaultContent(doc.title, doc.slug)
        };
        docCache.set(doc.slug, fallbackDoc);
        return fallbackDoc;
      }
    })
  );

  return docs;
};

export const getDocBySlug = async (slug: string): Promise<MarkdownDoc | null> => {
  console.log(`Getting document by slug: ${slug}`);
  
  // Check cache first for single document
  if (docCache.has(slug)) {
    console.log(`Found cached document: ${slug}`);
    return docCache.get(slug)!;
  }
  
  const docConfig = documentRegistry.find(doc => doc.slug === slug);
  if (!docConfig) {
    console.log(`No config found for slug: ${slug}`);
    return null;
  }

  try {
    console.log(`Fetching document: ${docConfig.file}`);
    const response = await fetch(`/docs/${docConfig.file}`);
    let content: string;
    
    if (response.ok) {
      content = await response.text();
      console.log(`Successfully fetched: ${docConfig.file}`);
    } else {
      console.log(`File not found: ${docConfig.file}, using default content`);
      content = getDefaultContent(docConfig.title, docConfig.slug);
    }
    
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
      content: getDefaultContent(docConfig.title, docConfig.slug)
    };
    docCache.set(slug, fallbackDoc);
    return fallbackDoc;
  }
};

// Function to save document (for the editor)
export const saveDocument = async (slug: string, content: string, title: string): Promise<boolean> => {
  try {
    // Update cache immediately for instant feedback
    const docData = {
      slug,
      title,
      path: `/docs/${slug}`,
      content
    };
    docCache.set(slug, docData);
    
    // In a real implementation, this would save to a backend
    console.log(`Document saved: ${slug}`);
    return true;
  } catch (error) {
    console.error(`Failed to save document: ${slug}`, error);
    return false;
  }
};
