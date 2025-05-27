
# How to Add Documents to Akora

*Complete guide with all markdown features supported*

## Quick Start

Adding a new document to Akora is simple:

1. Click the **"Add Document"** button in the top navigation
2. Fill in the document details
3. Write your content using markdown
4. Click **"Save Document"**

Your document will be instantly available in the navigation and searchable.

## Document Fields

### Required Fields
- **Title**: The display name of your document
- **Topic**: Main category (e.g., "Getting Started", "API Reference")
- **Content**: Your markdown content

### Optional Fields
- **Subtopic**: Sub-category for better organization (e.g., "Authentication", "Database")

## Markdown Features Supported

### Text Formatting

**Bold text** using `**bold**` or `__bold__`
*Italic text* using `*italic*` or `_italic_`
***Bold and italic*** using `***text***`
~~Strikethrough~~ using `~~text~~`
`Inline code` using backticks

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

Result:
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3

#### Ordered Lists
```markdown
1. First item
2. Second item
   1. Nested numbered item
   2. Another nested item
3. Third item
```

Result:
1. First item
2. Second item
   1. Nested numbered item
   2. Another nested item
3. Third item

#### Task Lists
```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another incomplete task
```

Result:
- [x] Completed task
- [ ] Incomplete task
- [ ] Another incomplete task

### Code Examples

#### Inline Code
Use single backticks for `inline code`.

#### Code Blocks with Syntax Highlighting

**JavaScript:**
```javascript
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

const items = [
  { name: 'Product A', price: 29.99 },
  { name: 'Product B', price: 49.99 }
];

console.log('Total:', calculateTotal(items));
```

**SQL:**
```sql
-- Get users with their order count
SELECT 
  users.name,
  users.email,
  COUNT(orders.id) as order_count,
  SUM(orders.total) as total_spent
FROM users
LEFT JOIN orders ON users.id = orders.user_id
WHERE users.active = true
  AND users.created_at >= '2024-01-01'
GROUP BY users.id
HAVING COUNT(orders.id) > 0
ORDER BY total_spent DESC;
```

**Python:**
```python
def fibonacci(n):
    """Generate fibonacci sequence up to n terms"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    sequence = [0, 1]
    for i in range(2, n):
        sequence.append(sequence[i-1] + sequence[i-2])
    
    return sequence

# Example usage
print(fibonacci(10))
```

**JSON:**
```json
{
  "api": {
    "version": "v1",
    "endpoints": {
      "users": "/api/v1/users",
      "orders": "/api/v1/orders"
    },
    "authentication": {
      "type": "bearer",
      "header": "Authorization"
    }
  },
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "akora_db"
  }
}
```

### Links and Images

#### Links
```markdown
[External Link](https://example.com)
[Internal Link](/docs/getting-started)
[Link with Title](https://example.com "This opens example.com")
```

#### Images
```markdown
![Alt text](/images/screenshot.png)
![Image with title](/images/diagram.jpg "Database Schema Diagram")
```

### Tables

```markdown
| Feature | Support | Notes |
|---------|---------|-------|
| Syntax Highlighting | ✅ Yes | Multiple languages |
| Tables | ✅ Yes | Full markdown tables |
| Images | ✅ Yes | Local and external |
| Links | ✅ Yes | Internal and external |
```

Result:
| Feature | Support | Notes |
|---------|---------|-------|
| Syntax Highlighting | ✅ Yes | Multiple languages |
| Tables | ✅ Yes | Full markdown tables |
| Images | ✅ Yes | Local and external |
| Links | ✅ Yes | Internal and external |

#### Table Alignment
```markdown
| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Text         | Text           | Text          |
| More text    | More text      | More text     |
```

### Blockquotes

```markdown
> This is a blockquote
> It can span multiple lines
> 
> Perfect for important notes or quotes

> **💡 Pro Tip:** Use blockquotes for callouts and important information
```

Result:
> This is a blockquote
> It can span multiple lines
> 
> Perfect for important notes or quotes

> **💡 Pro Tip:** Use blockquotes for callouts and important information

### Horizontal Rules

Create horizontal dividers:
```markdown
---
***
___
```

### Special Callouts

Use blockquotes with emojis for different types of callouts:

```markdown
> 💡 **Tip:** This is a helpful tip for users

> ⚠️ **Warning:** This is an important warning

> ❌ **Error:** This indicates an error condition

> ✅ **Success:** This indicates successful completion

> 📝 **Note:** This is additional information

> 🔧 **Configuration:** Setup instructions

> 🚀 **Quick Start:** Getting started information
```

Result:
> 💡 **Tip:** This is a helpful tip for users

> ⚠️ **Warning:** This is an important warning

> ❌ **Error:** This indicates an error condition

> ✅ **Success:** This indicates successful completion

> 📝 **Note:** This is additional information

### HTML Support

You can use HTML for advanced formatting:

```html
<details>
<summary>Click to expand advanced example</summary>

This content is hidden by default and can be expanded.

- You can include any markdown here
- Lists, code blocks, images, etc.
- Perfect for optional or advanced content

</details>
```

<details>
<summary>Click to expand advanced example</summary>

This content is hidden by default and can be expanded.

- You can include any markdown here
- Lists, code blocks, images, etc.
- Perfect for optional or advanced content

</details>

### Keyboard Shortcuts

```html
Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy
Use <kbd>⌘</kbd> + <kbd>V</kbd> on Mac
<kbd>Alt</kbd> + <kbd>Tab</kbd> to switch windows
```

Result: Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy

## Best Practices

### Document Structure
1. **Start with a clear H1 title** - This becomes the main heading
2. **Use H2 for main sections** - Major topics in your document
3. **Use H3 for subsections** - Detailed breakdowns
4. **Keep hierarchy logical** - Don't skip heading levels

### Content Guidelines
- **Write clear, concise sentences**
- **Use active voice when possible**
- **Include code examples for technical concepts**
- **Add cross-references to related topics**
- **Use consistent terminology throughout**

### Code Guidelines
- **Always specify language** for syntax highlighting
- **Keep examples concise** but complete
- **Include comments** in complex code blocks
- **Test examples** before publishing
- **Use realistic data** in examples

### Organization Tips
- **Group related documents** under the same topic
- **Use descriptive subtopics** for better navigation
- **Create logical progression** from basic to advanced
- **Cross-reference related documents**

## Advanced Examples

### API Documentation Example

```markdown
## POST /api/users

Creates a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
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

**Error Response:**
```json
{
  "error": "validation_failed",
  "message": "Email already exists",
  "code": 422
}
```
```

### Database Schema Example

```markdown
## Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier |
| name | VARCHAR(255) | NOT NULL | User's full name |
| email | VARCHAR(255) | NOT NULL, UNIQUE | User's email address |
| password_hash | VARCHAR(255) | NOT NULL | Encrypted password |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Account creation time |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Indexes:**
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```
```

### Configuration Example

```markdown
## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | - | PostgreSQL connection string |
| `JWT_SECRET` | Yes | - | Secret key for JWT tokens |
| `PORT` | No | 3000 | Server port |
| `NODE_ENV` | No | development | Environment mode |

**Example .env file:**
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
JWT_SECRET=your-super-secret-key-here
PORT=3000
NODE_ENV=production
```
```

## Tips for Success

1. **Use descriptive titles** - Make it easy to find your document
2. **Include examples** - Show, don't just tell
3. **Keep it updated** - Review and update content regularly
4. **Test all code** - Ensure examples work correctly
5. **Use consistent formatting** - Follow the same patterns
6. **Add context** - Explain why, not just how
7. **Link related content** - Help users find more information

---

*Ready to create your first document? Click the "Add Document" button and start writing!*
