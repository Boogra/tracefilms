import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  ChevronDown, 
  ChevronRight, 
  GripVertical,
  Trash2
} from 'lucide-react';
import SubSceneCard from './SubSceneCard';

const ActSection = ({ 
  act, 
  actIndex, 
  onUpdateAct, 
  onDeleteAct, 
  onAddScene, 
  onUpdateScene, 
  onDeleteScene,
  onReorderScenes,
  draggedScene,
  setDraggedScene,
  dragOverScene,
  setDragOverScene
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dragOverAct, setDragOverAct] = useState(false);

  const updateActTitle = (title) => {
    onUpdateAct(actIndex, { ...act, title });
  };

  const handleAddScene = () => {
    onAddScene(actIndex);
  };

  const handleSceneDragStart = (e, sceneIndex) => {
    setDraggedScene({ actIndex, sceneIndex });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleSceneDragOver = (e, sceneIndex) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedScene && (draggedScene.actIndex !== actIndex || draggedScene.sceneIndex !== sceneIndex)) {
      setDragOverScene({ actIndex, sceneIndex });
    }
  };

  const handleSceneDragLeave = (e) => {
    // Only clear if we're leaving the entire act area
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverScene(null);
    }
  };

  const handleSceneDrop = (e, targetSceneIndex) => {
    e.preventDefault();
    
    if (!draggedScene) return;
    
    const { actIndex: sourceActIndex, sceneIndex: sourceSceneIndex } = draggedScene;
    
    // If dropping in the same position, do nothing
    if (sourceActIndex === actIndex && sourceSceneIndex === targetSceneIndex) {
      setDraggedScene(null);
      setDragOverScene(null);
      return;
    }
    
    onReorderScenes(sourceActIndex, sourceSceneIndex, actIndex, targetSceneIndex);
    setDraggedScene(null);
    setDragOverScene(null);
  };

  const handleActDragOver = (e) => {
    e.preventDefault();
    if (draggedScene && draggedScene.actIndex !== actIndex) {
      setDragOverAct(true);
    }
  };

  const handleActDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverAct(false);
    }
  };

  const handleActDrop = (e) => {
    e.preventDefault();
    
    if (!draggedScene) return;
    
    const { actIndex: sourceActIndex, sceneIndex: sourceSceneIndex } = draggedScene;
    
    // Move scene to the end of this act
    onReorderScenes(sourceActIndex, sourceSceneIndex, actIndex, act.subScenes.length);
    setDraggedScene(null);
    setDragOverAct(false);
  };

  return (
    <Card className={`w-full mb-4 transition-all duration-200 ${
      dragOverAct ? 'ring-2 ring-orange-500 ring-opacity-50 bg-orange-50' : ''
    }`}>
      <CardContent className="p-0">
        <div 
          className="p-4 border-b bg-gradient-to-r from-slate-50 to-slate-100"
          onDragOver={handleActDragOver}
          onDragLeave={handleActDragLeave}
          onDrop={handleActDrop}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1 h-8 w-8"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
              
              <Input
                value={act.title}
                onChange={(e) => updateActTitle(e.target.value)}
                className="text-lg font-semibold bg-transparent border-none p-0 focus:bg-white focus:border focus:px-2"
                placeholder={`Act ${actIndex + 1}`}
              />
              
              <Badge variant="outline" className="ml-2">
                {act.subScenes.length} scene{act.subScenes.length !== 1 ? 's' : ''}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handleAddScene}
                size="sm"
                variant="outline"
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Scene
              </Button>
              
              {actIndex > 0 && (
                <Button
                  onClick={() => onDeleteAct(actIndex)}
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {!isCollapsed && (
          <div className="p-4 space-y-4">
            {act.subScenes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="mb-4">No scenes in this act yet.</p>
                <Button onClick={handleAddScene} variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add First Scene
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {act.subScenes.map((scene, sceneIndex) => (
                  <div key={scene.id} className="relative">
                    {/* Drop indicator */}
                    {dragOverScene && 
                     dragOverScene.actIndex === actIndex && 
                     dragOverScene.sceneIndex === sceneIndex && (
                      <div className="absolute -top-2 left-0 right-0 h-1 bg-orange-500 rounded-full z-10" />
                    )}
                    
                    <div
                      draggable
                      onDragStart={(e) => handleSceneDragStart(e, sceneIndex)}
                      onDragOver={(e) => handleSceneDragOver(e, sceneIndex)}
                      onDragLeave={handleSceneDragLeave}
                      onDrop={(e) => handleSceneDrop(e, sceneIndex)}
                      className={`transition-all duration-200 ${
                        draggedScene && 
                        draggedScene.actIndex === actIndex && 
                        draggedScene.sceneIndex === sceneIndex 
                          ? 'opacity-50 scale-95' 
                          : ''
                      }`}
                    >
                      <SubSceneCard
                        scene={scene}
                        sceneIndex={sceneIndex}
                        actIndex={actIndex}
                        onUpdateScene={onUpdateScene}
                        onDeleteScene={onDeleteScene}
                        isDragging={draggedScene && 
                                   draggedScene.actIndex === actIndex && 
                                   draggedScene.sceneIndex === sceneIndex}
                      />
                    </div>
                  </div>
                ))}
                
                {/* Drop zone at the end */}
                {draggedScene && (
                  <div
                    onDragOver={(e) => handleSceneDragOver(e, act.subScenes.length)}
                    onDrop={(e) => handleSceneDrop(e, act.subScenes.length)}
                    className={`h-8 border-2 border-dashed rounded-lg transition-all duration-200 ${
                      dragOverScene && 
                      dragOverScene.actIndex === actIndex && 
                      dragOverScene.sceneIndex === act.subScenes.length
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-300'
                    }`}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActSection;

