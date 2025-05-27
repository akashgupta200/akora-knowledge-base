# How to Add New Documents to Akora

A simple 3-step process to add new documentation to this site.

## Step 1: Create Your Markdown File

1. Create a new `.md` file in the `public/docs/` folder
2. Name it descriptively (e.g., `my-guide.md`, `api-tutorial.md`)
3. Write your content using standard markdown

### Example File Structure
```
public/docs/my-new-guide.md
```

### Example Content
```markdown
# My New Guide

This is my comprehensive guide on...

## Features
- Easy to write
- Supports code blocks
- Images and links work

```javascript
console.log("Hello World!");
```

![Example](/images/example.png)
```

## Step 2: Register Your Document

Open `src/utils/markdownLoader.ts` and add your document to the registry:

```javascript
const documentRegistry = [
  // ... existing documents
  { slug: 'my-new-guide', title: 'My New Guide', file: 'my-new-guide.md' },
];
```

**Important:** The `slug` becomes the URL path, `title` appears in navigation, and `file` must match your markdown filename.

## Step 3: Add Navigation Link

Open `src/pages/Docs.tsx` and add your document to the appropriate navigation section:

```javascript
const navigationItems = [
  {
    id: 'getting-started', // or 'tutorials', 'reference', 'examples'
    title: 'Getting Started',
    items: [
      // ... existing items
      { title: 'My New Guide', path: '/docs/my-new-guide' },
    ]
  }
];
```

## That's It!

Your document will now be:
- ✅ Automatically loaded and cached
- ✅ Rendered with syntax highlighting
- ✅ Accessible via navigation
- ✅ Available at `/docs/your-slug`

## Tips for Success

### File Naming
- Use lowercase with hyphens: `api-reference.md`
- Be descriptive but concise
- Avoid spaces and special characters

### Content Guidelines
- Start with a clear H1 title
- Use proper markdown formatting
- Include code examples where helpful
- Add images to `public/images/` folder

### Navigation Organization
Choose the right section:
- **Getting Started**: Installation, setup, basics
- **Tutorials**: Step-by-step learning guides
- **Reference**: API docs, configuration, technical details
- **Examples**: Code samples, use cases, integrations

### Testing Your Document
1. Save your markdown file
2. Add it to the registry
3. Add navigation link
4. Visit the URL to test

The system will automatically handle loading, caching, and rendering your content with full syntax highlighting and responsive design.

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify file paths are correct
3. Ensure markdown syntax is valid
4. Test the direct file URL: `/docs/your-file.md`
