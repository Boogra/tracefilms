import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Download, 
  Save, 
  FileText, 
  Image as ImageIcon,
  Play,
  Settings,
  FileDown,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import { generateScriptMarkdown, downloadMarkdownFile, generateProjectSummary } from '../../lib/sceneforge/exportUtils';

const ProjectHeader = ({ 
  project, 
  onUpdateProject, 
  onAddAct, 
  onExportPDF, 
  onSave,
  totalScenes 
}) => {
  const updateField = (field, value) => {
    onUpdateProject({ ...project, [field]: value });
  };

  const handleExportMarkdown = () => {
    try {
      const markdown = generateScriptMarkdown(project);
      const filename = `${project.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_script.md`;
      downloadMarkdownFile(markdown, filename);
      toast.success('Script exported as Markdown successfully!');
    } catch (error) {
      toast.error('Failed to export script');
      console.error('Export error:', error);
    }
  };

  const handleExportPDF = async () => {
    try {
      // Generate markdown content for local PDF conversion
      const markdown = generateScriptMarkdown(project);
      
      // For now, fallback to markdown export since we're fully local
      // In the future, this could use a local PDF generation library
      handleExportMarkdown();
      toast.info('PDF export will be available in future versions. Exported as Markdown for now.');
    } catch (error) {
      // Fallback to markdown export
      handleExportMarkdown();
      toast.info('Exported as Markdown instead');
    }
  };

  const summary = generateProjectSummary(project);

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/sceneforge-logo.png" 
                alt="SceneForge" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  SceneForge
                </h1>
                <p className="text-sm text-muted-foreground italic">Forging Ideas</p>
              </div>
            </div>
            <div className="flex-1 ml-6">
              <Input
                value={project.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="text-xl font-semibold border-none p-0 bg-transparent"
                placeholder="Project Title"
              />
              <div className="flex items-center gap-4 mt-1">
                <Badge variant="secondary">
                  {project.acts.length} Acts
                </Badge>
                <Badge variant="secondary">
                  {totalScenes} Scenes
                </Badge>
                <Badge variant={summary.completionPercentage > 50 ? "default" : "secondary"}>
                  {summary.completionPercentage}% Complete
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Last updated: {new Date(project.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportMarkdown}>
              <FileDown className="h-4 w-4 mr-1" />
              Export MD
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <Download className="h-4 w-4 mr-1" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Project Description</label>
            <Textarea
              value={project.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Brief description of your script project..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4">
              <Button onClick={onAddAct} className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Act
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Visual Storyboard Manager</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                <span>{summary.scenesWithDialogue} scenes with dialogue</span>
                <span className="mx-2">•</span>
                <span>{summary.scenesWithThumbnails} with thumbnails</span>
              </div>
              <Button variant="ghost" size="sm">
                <ImageIcon className="h-4 w-4 mr-1" />
                Gallery View
              </Button>
              <Button variant="ghost" size="sm">
                <Play className="h-4 w-4 mr-1" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectHeader;

