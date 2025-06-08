// PDF export utilities for the Script Flow Tool

export const generateScriptMarkdown = (project) => {
  let markdown = `# ${project.title}\n\n`;
  
  if (project.description) {
    markdown += `${project.description}\n\n`;
  }
  
  markdown += `**Project Details:**\n`;
  markdown += `- Total Acts: ${project.acts.length}\n`;
  markdown += `- Total Scenes: ${project.acts.reduce((total, act) => total + act.subScenes.length, 0)}\n`;
  markdown += `- Created: ${new Date(project.createdAt).toLocaleDateString()}\n`;
  markdown += `- Last Updated: ${new Date(project.updatedAt).toLocaleDateString()}\n\n`;
  
  markdown += `---\n\n`;
  
  project.acts.forEach((act, actIndex) => {
    markdown += `## ${act.title}\n\n`;
    
    if (act.subScenes.length === 0) {
      markdown += `*No scenes in this act.*\n\n`;
      return;
    }
    
    act.subScenes.forEach((scene, sceneIndex) => {
      markdown += `### Scene ${sceneIndex + 1}: ${scene.title || 'Untitled Scene'}\n\n`;
      
      if (scene.summary) {
        markdown += `**Summary:** ${scene.summary}\n\n`;
      }
      
      if (scene.dialogue) {
        markdown += `**Dialogue:**\n`;
        markdown += `${scene.dialogue}\n\n`;
      }
      
      if (scene.narration) {
        markdown += `**Narration:**\n`;
        markdown += `${scene.narration}\n\n`;
      }
      
      // Camera details
      if (scene.cameraShot || scene.cameraMovement) {
        markdown += `**Camera:**\n`;
        if (scene.cameraShot) markdown += `- Shot: ${scene.cameraShot}\n`;
        if (scene.cameraMovement) markdown += `- Movement: ${scene.cameraMovement}\n`;
        markdown += `\n`;
      }
      
      // Audio details
      if (scene.music || scene.soundNotes) {
        markdown += `**Audio:**\n`;
        if (scene.music) markdown += `- Music: ${scene.music}\n`;
        if (scene.soundNotes) markdown += `- Sound Notes: ${scene.soundNotes}\n`;
        markdown += `\n`;
      }
      
      // AI Prompts
      if (scene.midJourneyPrompt) {
        markdown += `**MidJourney Prompt:**\n`;
        markdown += `${scene.midJourneyPrompt}\n\n`;
      }
      
      if (scene.runwayPrompt) {
        markdown += `**Runway Prompt:**\n`;
        markdown += `${scene.runwayPrompt}\n\n`;
      }
      
      // Writer's notes
      if (scene.writersNotes) {
        markdown += `**Writer's Notes:**\n`;
        markdown += `${scene.writersNotes}\n\n`;
      }
      
      // Related assets
      if (scene.relatedAssets && scene.relatedAssets.length > 0) {
        markdown += `**Related Assets:**\n`;
        scene.relatedAssets.forEach(asset => {
          markdown += `- [${asset.name}](${asset.url})\n`;
        });
        markdown += `\n`;
      }
      
      markdown += `---\n\n`;
    });
  });
  
  return markdown;
};

export const downloadMarkdownFile = (content, filename) => {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateProjectSummary = (project) => {
  const totalScenes = project.acts.reduce((total, act) => total + act.subScenes.length, 0);
  const scenesWithDialogue = project.acts.reduce((total, act) => 
    total + act.subScenes.filter(scene => scene.dialogue && scene.dialogue.trim()).length, 0
  );
  const scenesWithNarration = project.acts.reduce((total, act) => 
    total + act.subScenes.filter(scene => scene.narration && scene.narration.trim()).length, 0
  );
  const scenesWithThumbnails = project.acts.reduce((total, act) => 
    total + act.subScenes.filter(scene => scene.thumbnailImage).length, 0
  );
  
  return {
    totalActs: project.acts.length,
    totalScenes,
    scenesWithDialogue,
    scenesWithNarration,
    scenesWithThumbnails,
    completionPercentage: totalScenes > 0 ? Math.round((scenesWithDialogue + scenesWithNarration) / (totalScenes * 2) * 100) : 0
  };
};

