
export interface MarkdownDoc {
  slug: string;
  title: string;
  content: string;
  path: string;
}

// Simple document registry - just add new documents here
const documentRegistry = [
  { slug: 'introduction', title: 'Introduction', file: 'introduction.md' },
  { slug: 'quick-start', title: 'Quick Start', file: 'quick-start.md' },
  { slug: 'api', title: 'API Documentation', file: 'api.md' },
  { slug: 'configuration', title: 'Configuration', file: 'configuration.md' },
];

export const loadMarkdownDocs = async (): Promise<MarkdownDoc[]> => {
  const docs = await Promise.all(
    documentRegistry.map(async (doc) => {
      try {
        const response = await fetch(`/docs/${doc.file}`);
        const content = response.ok ? await response.text() : `# ${doc.title}\n\nContent not found.`;
        return {
          slug: doc.slug,
          title: doc.title,
          path: `/docs/${doc.slug}`,
          content
        };
      } catch (error) {
        console.log(`Failed to load ${doc.file}:`, error);
        return {
          slug: doc.slug,
          title: doc.title,
          path: `/docs/${doc.slug}`,
          content: `# ${doc.title}\n\nContent not found.`
        };
      }
    })
  );

  return docs;
};

export const getDocBySlug = async (slug: string): Promise<MarkdownDoc | null> => {
  const docs = await loadMarkdownDocs();
  return docs.find(doc => doc.slug === slug) || null;
};
