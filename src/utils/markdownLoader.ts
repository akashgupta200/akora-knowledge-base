
export interface MarkdownDoc {
  slug: string;
  title: string;
  content: string;
  path: string;
}

export const loadMarkdownDocs = async (): Promise<MarkdownDoc[]> => {
  // This is a simplified version - in a real app you'd fetch from a server or build process
  const docs = [
    {
      slug: 'introduction',
      title: 'Introduction',
      path: '/docs/introduction',
      content: await fetch('/docs/introduction.md').then(r => r.text()).catch(() => '# Introduction\n\nContent not found.')
    },
    {
      slug: 'quick-start',
      title: 'Quick Start',
      path: '/docs/quick-start',
      content: await fetch('/docs/quick-start.md').then(r => r.text()).catch(() => '# Quick Start\n\nContent not found.')
    },
    {
      slug: 'api',
      title: 'API Documentation',
      path: '/docs/api',
      content: await fetch('/docs/api.md').then(r => r.text()).catch(() => '# API Documentation\n\nContent not found.')
    },
    {
      slug: 'configuration',
      title: 'Configuration',
      path: '/docs/configuration',
      content: await fetch('/docs/configuration.md').then(r => r.text()).catch(() => '# Configuration\n\nContent not found.')
    }
  ];

  return docs;
};

export const getDocBySlug = async (slug: string): Promise<MarkdownDoc | null> => {
  const docs = await loadMarkdownDocs();
  return docs.find(doc => doc.slug === slug) || null;
};
