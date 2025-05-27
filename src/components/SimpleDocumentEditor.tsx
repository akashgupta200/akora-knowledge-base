
import React, { useState } from 'react';
import { Plus, Save, Eye, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import MarkdownRenderer from './MarkdownRenderer';
import { saveDocument, MarkdownDoc } from '../utils/markdownLoader';

interface SimpleDocumentEditorProps {
  isDark: boolean;
  onSave?: () => void;
}

const topics = [
  'Getting Started',
  'Development', 
  'Tutorials',
  'Examples',
  'Reference'
];

const subtopics = {
  'Getting Started': ['General'],
  'Development': ['APIs', 'Database', 'Security', 'General'],
  'Tutorials': ['Beginner', 'Advanced', 'General'],
  'Examples': ['General'],
  'Reference': ['General']
};

const SimpleDocumentEditor: React.FC<SimpleDocumentEditorProps> = ({ isDark, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [subtopic, setSubtopic] = useState('');
  const [saving, setSaving] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const resetForm = () => {
    setTitle('');
    setContent(`# New Document

## Overview

Write your document content here...

## Examples

\`\`\`javascript
// Your code examples
console.log("Hello World");
\`\`\`

## SQL Examples

\`\`\`sql
SELECT * FROM your_table;
\`\`\`
`);
    setTopic('');
    setSubtopic('');
    setIsPreview(false);
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || !topic) {
      toast.error('Please fill in title, content, and topic');
      return;
    }

    setSaving(true);
    try {
      const slug = generateSlug(title);
      const docData: Partial<MarkdownDoc> = {
        slug,
        title,
        content,
        topic,
        subtopic: subtopic || 'General',
        createdAt: new Date().toISOString()
      };

      const success = await saveDocument(docData);
      if (success) {
        toast.success('Document saved successfully!');
        setIsOpen(false);
        resetForm();
        if (onSave) onSave();
      } else {
        toast.error('Failed to save document');
      }
    } catch (error) {
      toast.error('Error saving document');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={resetForm} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Document
        </Button>
      </DialogTrigger>
      
      <DialogContent className={`max-w-5xl h-[90vh] flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className={`flex items-center justify-between ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span>Add New Document</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
              >
                {isPreview ? <Edit className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {isPreview ? 'Edit' : 'Preview'}
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {!isPreview && (
            <div className="grid grid-cols-2 gap-4 flex-shrink-0">
              <Input
                placeholder="Document Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={isDark ? 'bg-gray-700 text-white' : ''}
              />
              <div className="grid grid-cols-2 gap-2">
                <Select value={topic} onValueChange={(value) => {
                  setTopic(value);
                  setSubtopic('General');
                }}>
                  <SelectTrigger className={isDark ? 'bg-gray-700 text-white' : ''}>
                    <SelectValue placeholder="Select Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {topic && (
                  <Select value={subtopic} onValueChange={setSubtopic}>
                    <SelectTrigger className={isDark ? 'bg-gray-700 text-white' : ''}>
                      <SelectValue placeholder="Subtopic" />
                    </SelectTrigger>
                    <SelectContent>
                      {subtopics[topic as keyof typeof subtopics]?.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          )}

          <div className="flex-1 min-h-0">
            {isPreview ? (
              <div className={`h-full overflow-y-auto p-4 border rounded-lg ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                <MarkdownRenderer content={content} isDark={isDark} />
              </div>
            ) : (
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your markdown content here..."
                className={`flex-1 resize-none font-mono text-sm ${isDark ? 'bg-gray-700 text-white' : ''}`}
                style={{ minHeight: '400px' }}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SimpleDocumentEditor;
