import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { createImagePreview, validateImageFile } from '../lib/fileUtils';

const ImageUpload = ({ 
  value, 
  onChange, 
  placeholder = "Click to upload image",
  className = "",
  multiple = false,
  maxFiles = 5 
}) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    
    if (multiple) {
      if (files.length > maxFiles) {
        toast.error(`Maximum ${maxFiles} files allowed`);
        return;
      }
      
      try {
        const previews = await Promise.all(
          files.map(async (file) => {
            validateImageFile(file);
            const preview = await createImagePreview(file);
            return {
              id: Date.now() + Math.random(),
              file,
              preview,
              name: file.name
            };
          })
        );
        
        const currentImages = Array.isArray(value) ? value : [];
        const newImages = [...currentImages, ...previews];
        
        if (newImages.length > maxFiles) {
          toast.error(`Maximum ${maxFiles} files allowed`);
          return;
        }
        
        onChange(newImages);
        toast.success(`${files.length} image(s) uploaded successfully`);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      const file = files[0];
      if (!file) return;
      
      try {
        validateImageFile(file);
        const preview = await createImagePreview(file);
        onChange(preview);
        toast.success('Image uploaded successfully');
      } catch (error) {
        toast.error(error.message);
      }
    }
    
    // Reset input
    e.target.value = '';
  };

  const handleRemoveImage = (indexOrId) => {
    if (multiple) {
      const currentImages = Array.isArray(value) ? value : [];
      const newImages = currentImages.filter((_, index) => index !== indexOrId);
      onChange(newImages);
    } else {
      onChange(null);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  if (multiple) {
    const images = Array.isArray(value) ? value : [];
    
    return (
      <div className={`space-y-3 ${className}`}>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((image, index) => (
              <div key={image.id || index} className="relative group">
                <img
                  src={image.preview}
                  alt={image.name || `Image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <div
          onClick={triggerFileSelect}
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center bg-muted/10 cursor-pointer hover:bg-muted/20 transition-colors"
        >
          <div className="text-muted-foreground">
            <Upload className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">{placeholder}</p>
            <p className="text-xs mt-1">
              {images.length}/{maxFiles} files uploaded
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div
        onClick={triggerFileSelect}
        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center bg-muted/10 cursor-pointer hover:bg-muted/20 transition-colors"
      >
        {value ? (
          <div className="relative group">
            <img
              src={value}
              alt="Uploaded"
              className="max-h-32 mx-auto rounded mb-2"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-0 right-0 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
            >
              <X className="h-3 w-3" />
            </Button>
            <p className="text-sm text-muted-foreground">Click to change image</p>
          </div>
        ) : (
          <div className="text-muted-foreground">
            <ImageIcon className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">{placeholder}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;

