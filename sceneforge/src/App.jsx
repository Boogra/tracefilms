import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import ProjectHeader from './components/ProjectHeader';
import ActSection from './components/ActSection';
import { createDefaultProject, createDefaultAct, createDefaultSubScene } from './lib/dataModels';
import './App.css';

function App() {
  const [project, setProject] = useState(() => {
    const saved = localStorage.getItem('sceneforge-project');
    return saved ? JSON.parse(saved) : createDefaultProject();
  });

  const [draggedScene, setDraggedScene] = useState(null);
  const [dragOverScene, setDragOverScene] = useState(null);

  // Auto-save to localStorage
  useEffect(() => {
    const saveProject = () => {
      const updatedProject = {
        ...project,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('sceneforge-project', JSON.stringify(updatedProject));
      setProject(updatedProject);
    };

    const timeoutId = setTimeout(saveProject, 1000);
    return () => clearTimeout(timeoutId);
  }, [project]);

  const updateProject = (updatedProject) => {
    setProject({
      ...updatedProject,
      updatedAt: new Date().toISOString()
    });
  };

  const addAct = () => {
    const newAct = createDefaultAct(`Act ${project.acts.length + 1}`);
    updateProject({
      ...project,
      acts: [...project.acts, newAct]
    });
  };

  const updateAct = (actIndex, updatedAct) => {
    const newActs = [...project.acts];
    newActs[actIndex] = updatedAct;
    updateProject({
      ...project,
      acts: newActs
    });
  };

  const deleteAct = (actIndex) => {
    if (project.acts.length <= 1) return; // Keep at least one act
    
    const newActs = project.acts.filter((_, index) => index !== actIndex);
    updateProject({
      ...project,
      acts: newActs
    });
  };

  const addScene = (actIndex) => {
    const newScene = createDefaultSubScene();
    const newActs = [...project.acts];
    newActs[actIndex] = {
      ...newActs[actIndex],
      subScenes: [...newActs[actIndex].subScenes, newScene]
    };
    updateProject({
      ...project,
      acts: newActs
    });
  };

  const updateScene = (actIndex, sceneIndex, updatedScene) => {
    const newActs = [...project.acts];
    newActs[actIndex] = {
      ...newActs[actIndex],
      subScenes: newActs[actIndex].subScenes.map((scene, index) =>
        index === sceneIndex ? updatedScene : scene
      )
    };
    updateProject({
      ...project,
      acts: newActs
    });
  };

  const deleteScene = (actIndex, sceneIndex) => {
    const newActs = [...project.acts];
    newActs[actIndex] = {
      ...newActs[actIndex],
      subScenes: newActs[actIndex].subScenes.filter((_, index) => index !== sceneIndex)
    };
    updateProject({
      ...project,
      acts: newActs
    });
  };

  const reorderScenes = (sourceActIndex, sourceSceneIndex, targetActIndex, targetSceneIndex) => {
    const newActs = [...project.acts];
    
    // Get the scene being moved
    const sceneToMove = newActs[sourceActIndex].subScenes[sourceSceneIndex];
    
    // Remove from source
    newActs[sourceActIndex] = {
      ...newActs[sourceActIndex],
      subScenes: newActs[sourceActIndex].subScenes.filter((_, index) => index !== sourceSceneIndex)
    };
    
    // Add to target
    const targetScenes = [...newActs[targetActIndex].subScenes];
    targetScenes.splice(targetSceneIndex, 0, sceneToMove);
    
    newActs[targetActIndex] = {
      ...newActs[targetActIndex],
      subScenes: targetScenes
    };
    
    updateProject({
      ...project,
      acts: newActs
    });
  };

  const handleSave = () => {
    const updatedProject = {
      ...project,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('sceneforge-project', JSON.stringify(updatedProject));
    setProject(updatedProject);
  };

  const totalScenes = project.acts.reduce((total, act) => total + act.subScenes.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <ProjectHeader
          project={project}
          onUpdateProject={updateProject}
          onAddAct={addAct}
          onSave={handleSave}
          totalScenes={totalScenes}
        />

        <div className="space-y-6">
          {project.acts.map((act, actIndex) => (
            <ActSection
              key={act.id}
              act={act}
              actIndex={actIndex}
              onUpdateAct={updateAct}
              onDeleteAct={deleteAct}
              onAddScene={addScene}
              onUpdateScene={updateScene}
              onDeleteScene={deleteScene}
              onReorderScenes={reorderScenes}
              draggedScene={draggedScene}
              setDraggedScene={setDraggedScene}
              dragOverScene={dragOverScene}
              setDragOverScene={setDragOverScene}
            />
          ))}
        </div>

        {project.acts.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              Welcome to SceneForge
            </h2>
            <p className="text-gray-500 mb-6">
              Start forging your ideas by creating your first act.
            </p>
            <button
              onClick={addAct}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Create First Act
            </button>
          </div>
        )}
      </div>
      
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;

