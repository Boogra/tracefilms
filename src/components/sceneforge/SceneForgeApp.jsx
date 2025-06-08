import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ProjectHeader from './ProjectHeader';
import ActSection from './ActSection';
import { createDefaultProject, createDefaultAct, createDefaultSubScene } from '../../lib/sceneforge/dataModels';

const SceneForgeApp = () => {
  const [project, setProject] = useState(() => {
    const saved = localStorage.getItem('sceneforge-project');
    return saved ? JSON.parse(saved) : createDefaultProject();
  });

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('sceneforge-project', JSON.stringify(project));
  }, [project]);

  const updateProject = (updates) => {
    setProject(prev => ({ ...prev, ...updates }));
  };

  const addNewAct = () => {
    const newAct = createDefaultAct(`Act ${project.acts.length + 1}`);
    setProject(prev => ({
      ...prev,
      acts: [...prev.acts, newAct]
    }));
    toast.success('New act added');
  };

  const updateAct = (actId, updates) => {
    setProject(prev => ({
      ...prev,
      acts: prev.acts.map(act => 
        act.id === actId ? { ...act, ...updates } : act
      )
    }));
  };

  const deleteAct = (actId) => {
    setProject(prev => ({
      ...prev,
      acts: prev.acts.filter(act => act.id !== actId)
    }));
    toast.success('Act deleted');
  };

  const addSubScene = (actId) => {
    const act = project.acts.find(a => a.id === actId);
    const newSubScene = createDefaultSubScene();
    
    setProject(prev => ({
      ...prev,
      acts: prev.acts.map(act => 
        act.id === actId 
          ? { ...act, subScenes: [...act.subScenes, newSubScene] }
          : act
      )
    }));
    toast.success('New scene added');
  };

  const updateSubScene = (actId, subSceneId, updates) => {
    setProject(prev => ({
      ...prev,
      acts: prev.acts.map(act => 
        act.id === actId 
          ? {
              ...act,
              subScenes: act.subScenes.map(scene => 
                scene.id === subSceneId ? { ...scene, ...updates } : scene
              )
            }
          : act
      )
    }));
  };

  const deleteSubScene = (actId, subSceneId) => {
    setProject(prev => ({
      ...prev,
      acts: prev.acts.map(act => 
        act.id === actId 
          ? {
              ...act,
              subScenes: act.subScenes.filter(scene => scene.id !== subSceneId)
            }
          : act
      )
    }));
    toast.success('Scene deleted');
  };

  const reorderSubScenes = (actId, oldIndex, newIndex) => {
    setProject(prev => ({
      ...prev,
      acts: prev.acts.map(act => {
        if (act.id === actId) {
          const newSubScenes = [...act.subScenes];
          const [removed] = newSubScenes.splice(oldIndex, 1);
          newSubScenes.splice(newIndex, 0, removed);
          return { ...act, subScenes: newSubScenes };
        }
        return act;
      })
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <ProjectHeader 
          project={project}
          onUpdateProject={updateProject}
          onAddNewAct={addNewAct}
        />
        
        <div className="space-y-8">
          {project.acts.map((act) => (
            <ActSection
              key={act.id}
              act={act}
              onUpdateAct={(updates) => updateAct(act.id, updates)}
              onDeleteAct={() => deleteAct(act.id)}
              onAddSubScene={() => addSubScene(act.id)}
              onUpdateSubScene={(subSceneId, updates) => updateSubScene(act.id, subSceneId, updates)}
              onDeleteSubScene={(subSceneId) => deleteSubScene(act.id, subSceneId)}
              onReorderSubScenes={(oldIndex, newIndex) => reorderSubScenes(act.id, oldIndex, newIndex)}
            />
          ))}
        </div>

        {project.acts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No acts yet</h3>
            <p className="text-gray-600 mb-4">Start building your script by adding your first act.</p>
            <button
              onClick={addNewAct}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Add First Act
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneForgeApp;

