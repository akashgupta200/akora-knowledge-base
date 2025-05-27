
# Code Samples

Practical examples and code snippets for common tasks.

## JavaScript Examples

### Basic Function
```javascript
function greetUser(name) {
  return `Hello, ${name}! Welcome to Akora.`;
}

// Usage
console.log(greetUser("Developer"));
```

### API Call Example
```javascript
async function fetchDocuments() {
  try {
    const response = await fetch('/api/documents');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
}
```

## React Component Example

```jsx
import React, { useState } from 'react';

const DocumentViewer = ({ documentId }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const loadDocument = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/docs/${documentId}.md`);
      const text = await response.text();
      setContent(text);
    } catch (error) {
      console.error('Failed to load document:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={loadDocument}>
        Load Document
      </button>
      {loading && <p>Loading...</p>}
      {content && <div>{content}</div>}
    </div>
  );
};
```

## CSS Examples

### Responsive Grid
```css
.documentation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

@media (max-width: 768px) {
  .documentation-grid {
    grid-template-columns: 1fr;
  }
}
```

## More Examples

Check out our [Use Cases](/docs/use-cases) for real-world applications of these patterns.
