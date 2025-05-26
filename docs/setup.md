
# Akora Documentation Setup Guide

## Overview
Akora is a static documentation website built with React and designed for GitHub Pages deployment. This guide will help you set up, customize, and deploy your documentation site.

## Project Structure
```
akora/
├── src/
│   ├── pages/
│   │   ├── Index.tsx          # Landing page
│   │   ├── Docs.tsx           # Documentation layout
│   │   └── NotFound.tsx       # 404 page
│   ├── components/            # Reusable components
│   ├── styles/               # Custom styles
│   └── data/                 # Documentation content
├── docs/                     # Documentation files
│   ├── getting-started/
│   ├── tutorials/
│   ├── reference/
│   └── examples/
└── public/                   # Static assets
```

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Setup Steps
1. Clone the repository
```bash
git clone <your-repo-url>
cd akora
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open http://localhost:8080 in your browser

## Content Management

### Adding New Documentation
1. Create markdown files in the appropriate `/docs` subdirectory
2. Update the navigation structure in `src/pages/Docs.tsx`
3. Follow the markdown formatting guidelines

### Supported Content Types
- **Markdown**: Full CommonMark support with extensions
- **Code Blocks**: Syntax highlighting for SQL, JavaScript, Python, etc.
- **Images**: Place in `/public/images` and reference with `/images/filename.jpg`
- **Videos**: YouTube embeds and direct video files
- **Links**: Internal navigation and external links

### Example Markdown Document
```markdown
# Page Title

## Section Heading

Regular paragraph text with **bold** and *italic* formatting.

### Code Example
\`\`\`sql
SELECT * FROM users WHERE active = true;
\`\`\`

### Image
![Alt text](/images/screenshot.png)

### Video Embed
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
```

## GitHub Pages Deployment

### Automatic Deployment
1. Push changes to the main branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Site will be available at `https://yourusername.github.io/akora`

### Manual Deployment
```bash
npm run build
npm run deploy
```

### Custom Domain (Optional)
1. Add CNAME file to `/public` directory with your domain
2. Configure DNS settings with your domain provider
3. Enable custom domain in repository settings

## Customization

### Branding
- Update site title and description in `index.html`
- Replace logo and favicon in `/public`
- Modify colors and theme in `src/index.css`

### Navigation
- Edit navigation structure in `src/pages/Docs.tsx`
- Add/remove sections and pages as needed
- Update routing in `src/App.tsx`

### Styling
- Primary colors: Blue (#3B82F6) and Purple (#8B5CF6)
- Typography: System fonts with fallbacks
- Dark mode: Automatic toggle with localStorage persistence

## Admin Control

### Content Updates (Akash Gupta Only)
1. Edit markdown files directly in the repository
2. Use GitHub's web interface for quick edits
3. Commit changes to trigger automatic deployment

### Access Control
- Repository permissions control who can edit content
- GitHub Pages serves content publicly (read-only)
- Consider branch protection rules for additional security

## Best Practices

### Content Organization
- Use clear, descriptive page titles
- Organize content hierarchically
- Include cross-references between related topics
- Add search-friendly keywords

### Performance
- Optimize images before uploading
- Use appropriate image formats (WebP for modern browsers)
- Keep markdown files under 100KB for best performance

### SEO
- Add meta descriptions to important pages
- Use proper heading hierarchy (H1 > H2 > H3)
- Include alt text for all images

## Troubleshooting

### Build Issues
- Check Node.js version compatibility
- Clear node_modules and reinstall dependencies
- Verify all imports are correct

### Deployment Issues
- Check GitHub Actions logs for errors
- Ensure GitHub Pages is enabled in repository settings
- Verify branch configuration matches deployment settings

### Search Not Working
- Search is client-side and requires content to be loaded
- Large amounts of content may affect search performance
- Consider implementing server-side search for larger sites

## Support

For technical issues or questions about Akora:
- Create an issue in the GitHub repository
- Contact Akash Gupta directly
- Check the troubleshooting section above

## License

This project is maintained by Akash Gupta and is available for documentation purposes.
```
