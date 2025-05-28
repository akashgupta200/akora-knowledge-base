
# Akora Documentation Hub

> A modern, static documentation website built and maintained by Akash Gupta

[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222?logo=github)](https://pages.github.com/)

## 🌟 Features

- **📚 Comprehensive Documentation**: Organized by topics for easy navigation
- **🎨 Modern Design**: Clean, responsive interface with light/dark mode toggle
- **🔍 Smart Search**: Powerful search functionality across all content
- **📝 Markdown Support**: Full markdown formatting with syntax highlighting
- **📱 Mobile Friendly**: Responsive design that works on all devices
- **⚡ Fast & Static**: Optimized for GitHub Pages deployment
- **🔧 Git-Based**: All documentation stored as markdown files in Git

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

# Open http://localhost:5173
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
├── public/docs/           # 📚 Documentation markdown files
├── src/
│   ├── pages/
│   │   ├── Index.tsx      # Landing page
│   │   ├── Docs.tsx       # Documentation interface
│   │   └── NotFound.tsx   # 404 page
│   ├── components/        # Reusable UI components
│   ├── utils/
│   │   └── markdownLoader.ts  # 🔧 Document registry and loader
│   └── lib/               # Utility functions
├── CONTRIBUTING.md        # 📖 Guide for adding documentation
├── PROJECT_STRUCTURE.md   # 🏗️ Detailed project structure
└── README.md             # This file
```

## ✏️ Adding Documentation

### Quick Guide
1. Create a markdown file in `public/docs/`
2. Add it to the document registry in `src/utils/markdownLoader.ts`
3. Commit and push your changes

### Example
```typescript
// In src/utils/markdownLoader.ts
const documentRegistry = [
  // ... existing documents
  { 
    slug: 'my-new-guide', 
    title: 'My New Guide', 
    topic: 'Oracle', 
    file: 'my-new-guide.md' 
  },
];
```

**For detailed instructions, see [CONTRIBUTING.md](CONTRIBUTING.md)**

## 📖 Supported Markdown Features

- **Text Formatting**: Bold, italic, strikethrough, inline code
- **Headings**: All levels (H1-H6)
- **Lists**: Ordered, unordered, and task lists
- **Code Blocks**: Syntax highlighting for multiple languages
- **Tables**: Full markdown table support
- **Links & Images**: Internal and external linking
- **Blockquotes**: For callouts and important notes
- **HTML**: Limited HTML support for advanced formatting

## 🎨 Available Topics

Documents are organized into these topics:

- **Getting Started**: Introduction and setup guides
- **Oracle**: Oracle Database administration and management
- **Postgres**: PostgreSQL installation, configuration, and maintenance
- **AWS**: Amazon Web Services guides and best practices
- **Azure**: Microsoft Azure platform documentation
- **OCI**: Oracle Cloud Infrastructure resources

You can add to existing topics or create new ones when adding documentation.

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and building
- **UI Components**: Shadcn/UI for consistent design
- **Icons**: Lucide React icon library
- **Markdown**: React Markdown with syntax highlighting
- **Deployment**: GitHub Pages with automatic CI/CD

## 🚀 Deployment

### GitHub Pages (Recommended)
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push changes to trigger automatic deployment

### Other Platforms
The built application (`npm run build`) can be deployed to any static hosting service:
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront

## 🎨 Customization

### Theme Colors
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Supports both light and dark modes

### Adding New Topics
Simply use a new topic name in the document registry - the system will automatically create the topic category.

## 📚 Documentation Topics

### Database Technologies
- **Oracle Database**: Setup, backup strategies, and performance tuning
- **PostgreSQL**: Installation, configuration, and administration

### Cloud Platforms
- **AWS**: EC2 setup, RDS configuration, and S3 management
- **Azure**: Virtual machine deployment, SQL database, and storage
- **OCI**: Compute instances, autonomous database, and object storage

### Getting Started
- Quick start guides and introduction materials
- How to add new documentation

## 🔐 Access Control

- **Maintainer (Akash Gupta)**: Full repository access
- **Contributors**: Submit pull requests for documentation updates
- **Public**: Read-only access to published documentation

## 📄 License

This project is built and maintained by **Akash Gupta**. All content and code are proprietary unless otherwise specified.

## 🤝 Contributing

This documentation project welcomes contributions:

1. **Fork the repository**
2. **Add your documentation** following the [Contributing Guide](CONTRIBUTING.md)
3. **Submit a pull request** for review
4. **Get feedback** and iterate if needed

For questions or technical support:
- Create an issue in this repository
- Review existing documentation for examples
- Contact Akash Gupta directly

---

**Built with ❤️ by Akash Gupta**
