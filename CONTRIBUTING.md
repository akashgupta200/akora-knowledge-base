# Contributing to Akora Documentation

This guide explains how to add new documents to the Akora documentation website.

## Quick Start

1. Create a new markdown file in the `public/docs/` folder
2. Add the document entry to `src/utils/markdownLoader.ts`
3. Commit and push your changes

## Adding a New Document

### Step 1: Create the Markdown File

Create a new `.md` file in the `public/docs/` folder:

```
public/docs/your-document-name.md
```

### Step 2: Write Your Content

Use the following template for your document:

```markdown
# Your Document Title

*Brief description of what this document covers*

## Overview

Provide a clear overview of the topic.

## Key Concepts

- **Concept 1**: Explanation
- **Concept 2**: Explanation
- **Concept 3**: Explanation

## Code Examples

```javascript
// Your JavaScript example
const example = {
  name: "Example",
  type: "demonstration"
};
```

```sql
-- Your SQL example
SELECT * FROM your_table;
```

## Related Documents

Link to other relevant documents in your documentation.
```

### Step 3: Register the Document

Open `src/utils/markdownLoader.ts` and add your document to the `documentRegistry` array:

```typescript
const documentRegistry = [
  // ... existing documents
  
  // Your Topic
  { 
    slug: 'your-document-slug', 
    title: 'Your Document Title', 
    topic: 'Your Topic', 
    file: 'your-document-name.md' 
  },
];
```

**Fields explanation:**
- `slug`: URL-friendly identifier (lowercase, hyphens only)
- `title`: Display name shown in navigation
- `topic`: Category for grouping documents
- `file`: Filename in the `public/docs/` folder

### Step 4: Commit Your Changes

```bash
git add .
git commit -m "Add new document: Your Document Title"
git push
```

## Markdown Features Supported

### Text Formatting

- **Bold text**: `**bold**` or `__bold__`
- *Italic text*: `*italic*` or `_italic_`
- ***Bold and italic***: `***text***`
- ~~Strikethrough~~: `~~text~~`
- `Inline code`: `\`code\``

### Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

### Lists

#### Unordered Lists
```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3
```

#### Ordered Lists
```markdown
1. First item
2. Second item
   1. Nested numbered item
   2. Another nested item
3. Third item
```

#### Task Lists
```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another incomplete task
```

### Code Blocks

Use triple backticks with language specification for syntax highlighting:

````markdown
```javascript
function example() {
  console.log("Hello World");
}
```

```sql
SELECT users.name, COUNT(orders.id) as order_count
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id;
```

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

```json
{
  "name": "example",
  "version": "1.0.0",
  "description": "Example configuration"
}
```
````

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1 Data | Row 1 Data | Row 1 Data |
| Row 2 Data | Row 2 Data | Row 2 Data |

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Text         | Text           | Text          |
```

### Links and Images

```markdown
[Link Text](https://example.com)
[Internal Link](/docs/other-document)

![Alt Text](/images/screenshot.png)
![Image with Title](/images/diagram.jpg "Diagram Title")
```

### Blockquotes

```markdown
> This is a blockquote
> It can span multiple lines

> **💡 Tip:** Use blockquotes for important notes
> **⚠️ Warning:** Use for warnings
> **✅ Success:** Use for positive outcomes
> **❌ Error:** Use for error conditions
```

### HTML Support

You can use HTML for advanced formatting:

```html
<details>
<summary>Click to expand</summary>

Hidden content here...

</details>

<kbd>Ctrl</kbd> + <kbd>C</kbd> for keyboard shortcuts
```

## Best Practices

### Document Structure
1. Start with a clear H1 title
2. Use H2 for main sections
3. Use H3 for subsections
4. Keep hierarchy logical

### Writing Guidelines
- Write clear, concise sentences
- Use active voice when possible
- Include practical examples
- Add cross-references to related topics
- Use consistent terminology

### Code Guidelines
- Always specify language for syntax highlighting
- Keep examples concise but complete
- Include comments in complex code
- Test examples before publishing
- Use realistic, relevant data

### Topic Organization
- Group related documents under the same topic
- Use descriptive topic names
- Create logical progression from basic to advanced
- Cross-reference related documents

## Available Topics

Current topics in the documentation:

- **Getting Started**: Introduction and setup guides
- **Development**: Development guides and API references  
- **Tutorials**: Step-by-step tutorials and examples
- **Postgres**: Database-specific documentation

You can add documents to existing topics or create new topics by using a new topic name in the document registry.

## File Structure

The documentation system uses these key files:

```
public/docs/              # Markdown files
src/utils/markdownLoader.ts  # Document registry
src/pages/Docs.tsx        # Main documentation page
src/components/MarkdownRenderer.tsx  # Markdown rendering
```

## Examples

### API Documentation Example

```markdown
# User Management API

## Create User

**Endpoint:** `POST /api/users`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-15T10:30:00Z"
}
```
```

### Database Schema Example

```markdown
# Users Table Schema

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY | Unique identifier |
| name | VARCHAR(255) | NOT NULL | User's full name |
| email | VARCHAR(255) | NOT NULL, UNIQUE | Email address |

**Create Table:**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
```

## Need Help?

If you need assistance with adding documentation:

1. Check existing documents for examples
2. Review this contributing guide
3. Look at the markdown source of similar documents
4. Ensure your changes work locally before committing

Happy documenting! 📚
