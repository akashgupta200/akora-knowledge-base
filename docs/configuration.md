
# Configuration Guide

Learn how to configure and customize your Akora documentation site.

## Environment Setup

### Development Environment

1. Clone the repository
2. Install dependencies
3. Start the development server

```bash
git clone https://github.com/yourusername/akora.git
cd akora
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Site Configuration

### Basic Settings

Configure basic site settings in your configuration file:

```yaml
site:
  title: "Akora Documentation"
  description: "Comprehensive documentation hub"
  author: "Akash Gupta"
  url: "https://yourdomain.com"
```

### Navigation Structure

Customize the sidebar navigation:

```yaml
navigation:
  - title: "Getting Started"
    items:
      - title: "Introduction"
        path: "/docs/introduction"
      - title: "Quick Start"
        path: "/docs/quick-start"
  
  - title: "Reference"
    items:
      - title: "API Documentation"
        path: "/docs/api"
      - title: "Configuration"
        path: "/docs/configuration"
```

### Theme Customization

#### Colors

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #6366f1;
  --background-color: #ffffff;
  --text-color: #1f2937;
}

[data-theme="dark"] {
  --background-color: #111827;
  --text-color: #f9fafb;
}
```

#### Typography

```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.3;
}
```

## Deployment

### GitHub Pages

1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. Configure build action

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Custom Domain

To use a custom domain:

1. Add a `CNAME` file to your repository
2. Configure DNS settings
3. Enable HTTPS in GitHub Pages settings

```
# CNAME file content
docs.yourdomain.com
```
