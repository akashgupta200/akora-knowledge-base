
# Akora Documentation Hub

> A modern, static documentation website built and maintained by Akash Gupta

[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222?logo=github)](https://pages.github.com/)

## 🌟 Features

- **📚 Comprehensive Documentation**: Organized topics and subtopics like a knowledge base
- **🎨 Modern Design**: Clean, responsive interface with light/dark mode toggle
- **🔍 Smart Search**: Powerful search functionality across all content
- **📝 Markdown Support**: Full markdown formatting with syntax highlighting
- **🎥 Rich Media**: Support for embedded images, videos, and interactive content
- **📱 Mobile Friendly**: Responsive design that works on all devices
- **⚡ Fast & Static**: Optimized for GitHub Pages deployment

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd akora

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:8080
```

### Building for Production
```bash
# Build the site
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
akora/
├── src/
│   ├── pages/
│   │   ├── Index.tsx          # Landing page
│   │   ├── Docs.tsx           # Documentation layout
│   │   └── NotFound.tsx       # 404 page
│   ├── components/            # Reusable UI components
│   ├── lib/                   # Utility functions
│   └── styles/               # Global styles
├── docs/                     # Documentation content
│   ├── setup.md              # Setup guide
│   ├── markdown-guide.md     # Markdown reference
│   └── ...                   # Other documentation files
├── public/                   # Static assets
└── README.md                 # This file
```

## ✏️ Content Management

### Adding New Documentation
1. Create markdown files in the `/docs` directory
2. Update navigation in `src/pages/Docs.tsx`
3. Commit and push changes

### Supported Content Types
- **Markdown**: CommonMark with extensions
- **Code Blocks**: SQL, JavaScript, Python, and more
- **Images**: Place in `/public/images/`
- **Videos**: YouTube embeds and direct files
- **Interactive Elements**: HTML within markdown

### Example Content
```markdown
# Page Title

## Code Example
\`\`\`sql
SELECT * FROM users WHERE active = true;
\`\`\`

## Image
![Description](/images/screenshot.png)

## Video
<iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
```

## 🎨 Customization

### Theme Colors
The site uses a modern blue and purple gradient theme:
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Supports both light and dark modes

### Navigation
Update the navigation structure in `src/pages/Docs.tsx`:
```typescript
const navigationItems = [
  {
    id: 'section-id',
    title: 'Section Title',
    items: [
      { title: 'Page Title', path: '/docs/page-path' }
    ]
  }
];
```

## 🚀 Deployment

### GitHub Pages (Recommended)
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push changes to trigger automatic deployment

### Manual Deployment
```bash
npm run build
# Copy dist/ contents to your web server
```

### Custom Domain
1. Add `CNAME` file to `/public` with your domain
2. Configure DNS with your provider
3. Enable custom domain in repository settings

## 🔐 Access Control

- **Admin (Akash Gupta)**: Full repository access for content updates
- **Public**: Read-only access to published documentation
- **Contributors**: Can submit pull requests for review

## 📖 Documentation Guides

- [Setup Guide](docs/setup.md) - Complete setup and deployment instructions
- [Markdown Guide](docs/markdown-guide.md) - Markdown syntax and features
- [Customization Guide](docs/customization.md) - Theming and branding options

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and building
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React icon library
- **Deployment**: GitHub Pages with automatic CI/CD

## 📄 License

This project is built and maintained by **Akash Gupta**. All content and code are proprietary unless otherwise specified.

## 🤝 Contributing

This is a personal documentation project maintained by Akash Gupta. For suggestions or issues:

1. Create an issue in the repository
2. Contact Akash Gupta directly
3. Submit a pull request for review

## 📞 Support

For questions or technical support:
- Create an issue in this repository
- Contact: Akash Gupta
- Documentation: [Setup Guide](docs/setup.md)

---

**Built with ❤️ by Akash Gupta**
```
