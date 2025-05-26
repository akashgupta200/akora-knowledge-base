
# Markdown Guide for Akora

This guide covers the markdown syntax and features supported in Akora documentation.

## Basic Formatting

### Text Formatting
- **Bold text** using `**bold**` or `__bold__`
- *Italic text* using `*italic*` or `_italic_`
- ***Bold and italic*** using `***text***`
- ~~Strikethrough~~ using `~~text~~`
- `Inline code` using backticks

### Headings
```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

## Lists

### Unordered Lists
```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3
```

### Ordered Lists
```markdown
1. First item
2. Second item
   1. Nested numbered item
   2. Another nested item
3. Third item
```

### Task Lists
```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another incomplete task
```

## Code Blocks

### Inline Code
Use single backticks for `inline code`.

### Code Blocks with Syntax Highlighting
````markdown
```sql
SELECT users.name, COUNT(orders.id) as order_count
FROM users
LEFT JOIN orders ON users.id = orders.user_id
WHERE users.active = true
GROUP BY users.id
ORDER BY order_count DESC;
```

```javascript
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```
````

## Links and Images

### Links
```markdown
[Link text](https://example.com)
[Internal link](/docs/getting-started)
[Link with title](https://example.com "This is a title")
```

### Images
```markdown
![Alt text](/images/screenshot.png)
![Alt text](/images/diagram.jpg "Image title")
```

### Image with Link
```markdown
[![Alt text](/images/thumbnail.png)](/images/full-size.png)
```

## Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
| Row 3    | Data     | Data     |
```

### Table Alignment
```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| Text | Text   | Text  |
```

## Blockquotes

```markdown
> This is a blockquote
> It can span multiple lines

> **Note:** This is an important note
> Use blockquotes for callouts and important information
```

## Horizontal Rules

```markdown
---
***
___
```

## HTML Support

Akora supports HTML elements within markdown for advanced formatting:

### Video Embeds
```html
<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        frameborder="0" allowfullscreen>
</iframe>
```

### Custom Styling
```html
<div style="background: #f0f0f0; padding: 20px; border-radius: 8px;">
  <strong>Custom Box:</strong> This content has custom styling.
</div>
```

### Details/Summary (Collapsible Sections)
```html
<details>
<summary>Click to expand</summary>

This content is hidden by default and can be expanded by clicking the summary.

- You can include any markdown here
- Lists, code blocks, etc.

</details>
```

## Special Features

### Callout Boxes
Use blockquotes with emojis for different types of callouts:

```markdown
> 💡 **Tip:** This is a helpful tip for users

> ⚠️ **Warning:** This is an important warning

> ❌ **Error:** This indicates an error condition

> ✅ **Success:** This indicates successful completion

> 📝 **Note:** This is additional information
```

### Keyboard Shortcuts
```markdown
Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy
Use <kbd>⌘</kbd> + <kbd>V</kbd> on Mac
```

### Math Expressions (if needed)
For mathematical expressions, you can use HTML:
```html
<p>E = mc<sup>2</sup></p>
<p>H<sub>2</sub>O</p>
```

## Best Practices

### Document Structure
1. Start with a clear H1 title
2. Use H2 for main sections
3. Use H3 for subsections
4. Keep heading hierarchy logical

### Content Guidelines
- Write clear, concise sentences
- Use active voice when possible
- Include code examples for technical concepts
- Add cross-references to related topics

### Image Guidelines
- Use descriptive alt text
- Optimize images for web (compress file sizes)
- Use consistent image styling
- Place images in `/public/images/` directory

### Code Guidelines
- Always specify language for syntax highlighting
- Keep code examples concise and relevant
- Include comments in complex code blocks
- Test all code examples before publishing

## Markdown Extensions

Akora supports these additional markdown features:

### Footnotes
```markdown
This is text with a footnote[^1].

[^1]: This is the footnote content.
```

### Abbreviations
```markdown
*[HTML]: Hyper Text Markup Language
*[CSS]: Cascading Style Sheets

The HTML and CSS specifications are maintained by W3C.
```

### Definition Lists
```markdown
Term 1
:   Definition for term 1

Term 2
:   Definition for term 2
    
    With multiple paragraphs.
```

This guide covers the most commonly used markdown features in Akora. For more advanced formatting needs, you can always fall back to HTML within your markdown documents.
```
