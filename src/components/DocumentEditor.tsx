
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Plus, Save } from 'lucide-react';
import { MarkdownDoc, saveDocument, getAllTopics } from '../utils/markdownLoader';
import { useToast } from '../hooks/use-toast';

interface DocumentEditorProps {
  isDark: boolean;
  onSave: () => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ isDark, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const topics = getAllTopics();
    setAvailableTopics(topics);
  }, []);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleSave = async () => {
    if (!title || !content || !topic) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (title, content, topic)",
        variant: "destructive",
      });
      return;
    }

    const slug = generateSlug(title);
    const newDoc: MarkdownDoc = {
      slug,
      title,
      content,
      topic,
      createdAt: new Date().toISOString(),
    };

    const success = await saveDocument(newDoc);
    
    if (success) {
      toast({
        title: "Success",
        description: "Document saved successfully!",
      });
      
      // Reset form
      setTitle('');
      setContent('');
      setTopic('');
      setIsOpen(false);
      
      // Refresh documents
      onSave();
    } else {
      toast({
        title: "Error",
        description: "Failed to save document",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Document
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Document title"
              />
            </div>
            <div>
              <Label htmlFor="topic">Topic *</Label>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select or create topic" />
                </SelectTrigger>
                <SelectContent>
                  {availableTopics.map((topicOption) => (
                    <SelectItem key={topicOption} value={topicOption}>
                      {topicOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2">
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Or type a new topic name"
                />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your markdown content here..."
              className="min-h-[400px] font-mono"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Document
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentEditor;
