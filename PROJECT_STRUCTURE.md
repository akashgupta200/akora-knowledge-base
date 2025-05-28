
# Akora Documentation - Project Structure

This document explains the structure and purpose of each file and folder in the Akora documentation website.

## Root Directory

```
akora/
├── public/                 # Static assets and documentation files
├── src/                    # React application source code
├── CONTRIBUTING.md         # Guide for adding new documentation
├── PROJECT_STRUCTURE.md    # This file - explains project structure
├── README.md              # Project overview and setup instructions
└── [config files]         # Build and configuration files
```

## Public Directory (`public/`)

Contains static assets served directly by the web server.

```
public/
├── docs/                   # 📚 DOCUMENTATION FILES
│   ├── introduction.md     # Introduction to Akora
│   ├── how-to-add-documents.md  # Guide for adding new docs
│   ├── quick-start.md      # Quick start guide
│   ├── api-guide.md        # API development guide
│   ├── database-setup.md   # Database setup instructions
│   ├── basic-tutorial.md   # Basic tutorial
│   ├── advanced-concepts.md # Advanced concepts
│   ├── best-practices.md   # Best practices guide
│   ├── postgres-backup.md  # Postgres backup guide
│   └── postgres-restore.md # Postgres restore guide
├── favicon.ico            # Website icon
└── placeholder.svg        # Placeholder image
```

### 📚 Adding New Documentation

All documentation files go in `public/docs/`. After adding a new `.md` file:
1. Register it in `src/utils/markdownLoader.ts`
2. Choose an appropriate topic (or create a new one)
3. Commit your changes

## Source Directory (`src/`)

Contains the React application code.

```
src/
├── components/            # Reusable UI components
├── pages/                # Main application pages  
├── utils/                # Utility functions
├── hooks/                # Custom React hooks
├── lib/                  # External library configurations
├── main.tsx              # Application entry point
└── App.tsx               # Main app component and routing
```

### Components (`src/components/`)

```
src/components/
├── ui/                    # 🎨 SHADCN/UI COMPONENTS
│   ├── button.tsx         # Button component
│   ├── dialog.tsx         # Modal dialog component
│   ├── input.tsx          # Input field component
│   ├── textarea.tsx       # Text area component
│   ├── select.tsx         # Select dropdown component
│   ├── toast.tsx          # Toast notification component
│   └── [other UI components]
└── MarkdownRenderer.tsx   # 📝 RENDERS MARKDOWN CONTENT
```

**Key Components:**
- `MarkdownRenderer.tsx`: Converts markdown text to HTML with syntax highlighting
- `ui/`: Pre-built UI components from shadcn/ui library for consistent design

### Pages (`src/pages/`)

```
src/pages/
├── Index.tsx              # 🏠 HOMEPAGE
├── Docs.tsx               # 📖 DOCUMENTATION PAGE
└── NotFound.tsx           # 404 error page
```

**Page Descriptions:**
- `Index.tsx`: Landing page with topic overview and navigation
- `Docs.tsx`: Main documentation interface with sidebar, search, and content display  
- `NotFound.tsx`: Displayed when user visits non-existent pages

### Utils (`src/utils/`)

```
src/utils/
└── markdownLoader.ts      # 🔧 DOCUMENT MANAGEMENT
```

**Key File:**
- `markdownLoader.ts`: 
  - Contains document registry (add new docs here)
  - Loads markdown files from `public/docs/`
  - Organizes documents by topics
  - Provides document search and retrieval functions

### Other Directories

```
src/
├── hooks/                 # Custom React hooks (toast notifications)
├── lib/                   # Utility libraries (CSS class helpers)
└── [TypeScript configs]   # Type definitions and configurations
```

## Configuration Files

```
akora/
├── package.json           # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite build tool configuration
├── eslint.config.js      # Code linting rules
└── postcss.config.js     # CSS processing configuration
```

## Key Technologies

- **React 18**: Frontend framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **Shadcn/UI**: High-quality UI component library
- **React Router**: Client-side routing
- **React Markdown**: Markdown rendering with syntax highlighting

## Important Files for Contributors

### 1. Adding Documentation
- **Primary**: `public/docs/[your-file].md` - Create your markdown file
- **Required**: `src/utils/markdownLoader.ts` - Register your document

### 2. UI Changes
- **Styling**: `src/components/ui/` - Modify existing components
- **Layout**: `src/pages/Docs.tsx` - Modify documentation layout
- **Homepage**: `src/pages/Index.tsx` - Modify landing page

### 3. Functionality Changes  
- **Document Loading**: `src/utils/markdownLoader.ts`
- **Routing**: `src/App.tsx`
- **Markdown Rendering**: `src/components/MarkdownRenderer.tsx`

## Development Workflow

1. **Install dependencies**: `npm install`
2. **Start dev server**: `npm run dev`
3. **Add documentation**: Create `.md` file in `public/docs/`
4. **Register document**: Add entry to `markdownLoader.ts`
5. **Test locally**: Verify document appears and renders correctly
6. **Commit changes**: `git add . && git commit -m "Add new documentation"`
7. **Deploy**: Push to main branch (auto-deploys)

## File Naming Conventions

- **Markdown files**: `kebab-case.md` (e.g., `database-setup.md`)
- **React components**: `PascalCase.tsx` (e.g., `MarkdownRenderer.tsx`)
- **Utility files**: `camelCase.ts` (e.g., `markdownLoader.ts`)
- **Slugs**: `kebab-case` (e.g., `database-setup`)

## Deployment

The application is built as a static website that can be deployed to:
- GitHub Pages (recommended)
- Netlify
- Vercel
- Any static hosting service

Build command: `npm run build`
Output directory: `dist/`

---

**For adding new documentation, see [CONTRIBUTING.md](CONTRIBUTING.md)**
