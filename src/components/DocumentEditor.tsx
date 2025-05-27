
import React, { useState, useEffect } from 'react';
import { Save, Edit, Eye, Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner';
import MarkdownRenderer from './MarkdownRenderer';
import { saveDocument, MarkdownDoc } from '../utils/markdownLoader';

interface DocumentEditorProps {
  doc?: MarkdownDoc | null;
  isDark: boolean;
  onSave?: (doc: MarkdownDoc) => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ doc, isDark, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (doc) {
      setTitle(doc.title);
      setContent(doc.content);
      setSlug(doc.slug);
    }
  }, [doc]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!doc) {
      // Auto-generate slug for new documents
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please provide both title and content');
      return;
    }

    if (!slug.trim()) {
      toast.error('Please provide a valid slug');
      return;
    }

    setSaving(true);
    try {
      const success = await saveDocument(slug, content, title);
      if (success) {
        const savedDoc = {
          slug,
          title,
          content,
          path: `/docs/${slug}`
        };
        
        if (onSave) {
          onSave(savedDoc);
        }
        
        toast.success('Document saved successfully!');
        setIsOpen(false);
      } else {
        toast.error('Failed to save document');
      }
    } catch (error) {
      toast.error('Error saving document');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    if (!doc) {
      setTitle('');
      setContent('# New Document\n\nStart writing your content here...');
      setSlug('');
    } else {
      setTitle(doc.title);
      setContent(doc.content);
      setSlug(doc.slug);
    }
    setIsPreview(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={doc ? "outline" : "default"}
          size="sm"
          onClick={resetForm}
          className="flex items-center gap-2"
        >
          {doc ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {doc ? 'Edit' : 'Add Document'}
        </Button>
      </DialogTrigger>
      
      <DialogContent className={`max-w-6xl h-[90vh] flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className={`flex items-center justify-between ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span>{doc ? 'Edit Document' : 'Add New Document'}</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center gap-2"
              >
                {isPreview ? <Edit className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {isPreview ? 'Edit' : 'Preview'}
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {!isPreview && (
            <div className="flex gap-4 flex-shrink-0">
              <div className="flex-1">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Title
                </label>
                <Input
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter document title"
                  className={isDark ? 'bg-gray-700 text-white' : ''}
                />
              </div>
              <div className="flex-1">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Slug (URL path)
                </label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="document-slug"
                  disabled={!!doc}
                  className={isDark ? 'bg-gray-700 text-white' : ''}
                />
              </div>
            </div>
          )}

          <div className="flex-1 min-h-0">
            {isPreview ? (
              <div className={`h-full overflow-y-auto p-4 border rounded-lg ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                <MarkdownRenderer content={content} isDark={isDark} />
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Content (Markdown)
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="# Your Document Title

Write your content in Markdown format...

## Section 1

Your content here with **bold** and *italic* text.

```javascript
// Code examples
console.log('Hello World');
```

- Bullet points
- More bullet points

[Links](https://example.com) work too!"
                  className={`flex-1 resize-none font-mono text-sm ${isDark ? 'bg-gray-700 text-white' : ''}`}
                  style={{ minHeight: '400px' }}
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentEditor;
