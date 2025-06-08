import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GripVertical, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  Video,
  Play,
  Pause,
  X,
  Plus,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';

const SubSceneCard = ({ 
  scene, 
  sceneIndex, 
  actIndex, 
  onUpdateScene, 
  onDeleteScene,
  isDragging 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const videoUploadRef = useRef(null);

  const updateField = (field, value) => {
    onUpdateScene(actIndex, sceneIndex, { ...scene, [field]: value });
  };

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateField('thumbnailImage', e.target.result);
        toast.success('Thumbnail uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        toast.error('Please select a video file');
        return;
      }
      
      // Validate file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        toast.error('Video file too large. Maximum size is 100MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        updateField('videoClip', e.target.result);
        toast.success('Video clip uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleStoryboardUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...(scene.storyboardImages || []), e.target.result];
        if (newImages.length > 5) {
          toast.error('Maximum 5 storyboard images allowed');
          return;
        }
        updateField('storyboardImages', newImages);
        toast.success('Storyboard image added!');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeStoryboardImage = (index) => {
    const newImages = scene.storyboardImages.filter((_, i) => i !== index);
    updateField('storyboardImages', newImages);
  };

  const addRelatedAsset = () => {
    const newAssets = [...(scene.relatedAssets || []), { name: '', url: '' }];
    updateField('relatedAssets', newAssets);
  };

  const updateRelatedAsset = (index, field, value) => {
    const newAssets = [...(scene.relatedAssets || [])];
    newAssets[index] = { ...newAssets[index], [field]: value };
    updateField('relatedAssets', newAssets);
  };

  const removeRelatedAsset = (index) => {
    const newAssets = scene.relatedAssets.filter((_, i) => i !== index);
    updateField('relatedAssets', newAssets);
  };

  const cameraShots = [
    'Wide Shot', 'Medium Shot', 'Close-up', 'Extreme Close-up',
    'Over-the-shoulder', 'Point of View', 'Bird\'s Eye', 'Low Angle',
    'High Angle', 'Dutch Angle', 'Two Shot', 'Insert Shot'
  ];

  const cameraMovements = [
    'Static', 'Pan Left', 'Pan Right', 'Tilt Up', 'Tilt Down',
    'Zoom In', 'Zoom Out', 'Dolly In', 'Dolly Out', 'Tracking Shot',
    'Crane Shot', 'Handheld', 'Steadicam'
  ];

  return (
    <Card className={`w-full transition-all duration-200 ${
      isDragging ? 'shadow-lg ring-2 ring-orange-500' : 'hover:shadow-md'
    }`}>
      <CardContent className="p-0">
        {/* Scene Header */}
        <div className="p-4 border-b bg-gradient-to-r from-orange-50 to-amber-50">
          <div className="flex items-center gap-3">
            <div className="cursor-grab active:cursor-grabbing">
              <GripVertical className="h-5 w-5 text-gray-400" />
            </div>
            
            <Input
              value={scene.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Sub-Scene Title"
              className="text-lg font-semibold bg-transparent border-none p-0 focus:bg-white focus:border focus:px-2"
            />
            
            <Badge variant="secondary">Scene {sceneIndex + 1}</Badge>
            
            <div className="flex items-center gap-2 ml-auto">
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                size="sm"
                variant="ghost"
              >
                {isExpanded ? 'Collapse' : 'Expand'}
              </Button>
              
              <Button
                onClick={() => onDeleteScene(actIndex, sceneIndex)}
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scene Content */}
        <div className="p-4 space-y-6">
          {/* Media Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Thumbnail */}
            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Thumbnail
              </label>
              <ImageUpload
                onImageUpload={handleImageUpload}
                currentImage={scene.thumbnailImage}
                placeholder="Click to upload thumbnail"
              />
            </div>

            {/* Video Clip */}
            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Video className="h-4 w-4" />
                Runway Clip
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-400 transition-colors">
                {scene.videoClip ? (
                  <div className="space-y-2">
                    <video
                      ref={videoRef}
                      src={scene.videoClip}
                      className="w-full h-32 object-cover rounded"
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                      onEnded={() => setIsVideoPlaying(false)}
                    />
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        onClick={handleVideoPlay}
                        size="sm"
                        variant="outline"
                      >
                        {isVideoPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        onClick={() => updateField('videoClip', null)}
                        size="sm"
                        variant="ghost"
                        className="text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Video className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-2">Upload video clip</p>
                    <input
                      ref={videoUploadRef}
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    <Button
                      onClick={() => videoUploadRef.current?.click()}
                      size="sm"
                      variant="outline"
                    >
                      <Upload className="h-4 w-4 mr-1" />
                      Choose Video
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scene Summary */}
          <div>
            <label className="text-sm font-medium mb-2 block">Scene Summary</label>
            <Textarea
              value={scene.summary || ''}
              onChange={(e) => updateField('summary', e.target.value)}
              placeholder="Brief description of what happens in this scene..."
              className="min-h-[80px]"
            />
          </div>

          {/* Dialogue and Narration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                💬 Dialogue
              </label>
              <Textarea
                value={scene.dialogue || ''}
                onChange={(e) => updateField('dialogue', e.target.value)}
                placeholder="Character dialogue..."
                className="min-h-[120px]"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                🎙️ Narration
              </label>
              <Textarea
                value={scene.narration || ''}
                onChange={(e) => updateField('narration', e.target.value)}
                placeholder="Voice-over narration..."
                className="min-h-[120px]"
              />
            </div>
          </div>

          {isExpanded && (
            <>
              {/* Camera Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    📹 Camera Shot
                  </label>
                  <select
                    value={scene.cameraShot || ''}
                    onChange={(e) => updateField('cameraShot', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select shot type</option>
                    {cameraShots.map(shot => (
                      <option key={shot} value={shot}>{shot}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    🎬 Camera Movement
                  </label>
                  <select
                    value={scene.cameraMovement || ''}
                    onChange={(e) => updateField('cameraMovement', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select movement</option>
                    {cameraMovements.map(movement => (
                      <option key={movement} value={movement}>{movement}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Audio Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    🎵 Music
                  </label>
                  <Input
                    value={scene.music || ''}
                    onChange={(e) => updateField('music', e.target.value)}
                    placeholder="Background music or soundtrack..."
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    🔊 Sound Notes
                  </label>
                  <Input
                    value={scene.soundNotes || ''}
                    onChange={(e) => updateField('soundNotes', e.target.value)}
                    placeholder="Sound effects, ambient audio..."
                  />
                </div>
              </div>

              {/* AI Prompts */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    🎨 MidJourney Prompt
                  </label>
                  <Textarea
                    value={scene.midJourneyPrompt || ''}
                    onChange={(e) => updateField('midJourneyPrompt', e.target.value)}
                    placeholder="Detailed prompt for MidJourney image generation..."
                    className="min-h-[80px]"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    🎬 Runway Prompt
                  </label>
                  <Textarea
                    value={scene.runwayPrompt || ''}
                    onChange={(e) => updateField('runwayPrompt', e.target.value)}
                    placeholder="Prompt for Runway video generation..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              {/* Storyboard Images */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  🖼️ Storyboard Images
                  <Badge variant="outline">{(scene.storyboardImages || []).length}/5</Badge>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {(scene.storyboardImages || []).map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Storyboard ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <Button
                        onClick={() => removeStoryboardImage(index)}
                        size="sm"
                        variant="ghost"
                        className="absolute top-1 right-1 h-6 w-6 p-0 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  
                  {(scene.storyboardImages || []).length < 5 && (
                    <ImageUpload
                      onImageUpload={handleStoryboardUpload}
                      placeholder="+"
                      className="h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-orange-400 transition-colors"
                    />
                  )}
                </div>
              </div>

              {/* Writer's Notes */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  📝 Writer's Notes
                </label>
                <Textarea
                  value={scene.writersNotes || ''}
                  onChange={(e) => updateField('writersNotes', e.target.value)}
                  placeholder="Director's notes, creative ideas, production notes..."
                  className="min-h-[80px]"
                />
              </div>

              {/* Related Assets */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    🔗 Related Assets
                  </label>
                  <Button onClick={addRelatedAsset} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Asset Link
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {(scene.relatedAssets || []).map((asset, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={asset.name}
                        onChange={(e) => updateRelatedAsset(index, 'name', e.target.value)}
                        placeholder="Asset name"
                        className="flex-1"
                      />
                      <Input
                        value={asset.url}
                        onChange={(e) => updateRelatedAsset(index, 'url', e.target.value)}
                        placeholder="URL or file path"
                        className="flex-1"
                      />
                      <Button
                        onClick={() => removeRelatedAsset(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubSceneCard;

