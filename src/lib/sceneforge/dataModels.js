// Data models for the SceneForge application

export const createDefaultProject = () => ({
  id: generateId(),
  title: 'New SceneForge Project',
  description: '',
  acts: [createDefaultAct('Act 1')],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const createDefaultAct = (title = 'New Act') => ({
  id: generateId(),
  title,
  subScenes: []
});

export const createDefaultSubScene = () => ({
  id: generateId(),
  title: '',
  summary: '',
  dialogue: '',
  narration: '',
  cameraShot: '',
  cameraMovement: '',
  music: '',
  soundNotes: '',
  midJourneyPrompt: '',
  runwayPrompt: '',
  writersNotes: '',
  thumbnailImage: null,
  videoClip: null, // New field for video clips
  storyboardImages: [],
  relatedAssets: []
});

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Camera shot types for dropdown
export const CAMERA_SHOTS = [
  'Wide Shot',
  'Medium Shot', 
  'Close-up',
  'Extreme Close-up',
  'Over-the-shoulder',
  'Point of View',
  'Bird\'s Eye',
  'Low Angle',
  'High Angle',
  'Dutch Angle',
  'Two Shot',
  'Insert Shot'
];

// Camera movements for dropdown
export const CAMERA_MOVEMENTS = [
  'Static',
  'Pan Left',
  'Pan Right', 
  'Tilt Up',
  'Tilt Down',
  'Zoom In',
  'Zoom Out',
  'Dolly In',
  'Dolly Out',
  'Tracking Shot',
  'Crane Shot',
  'Handheld',
  'Steadicam'
];

// Validation functions
export const validateScene = (scene) => {
  const errors = [];
  
  if (!scene.title || scene.title.trim() === '') {
    errors.push('Scene title is required');
  }
  
  if (!scene.summary || scene.summary.trim() === '') {
    errors.push('Scene summary is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateProject = (project) => {
  const errors = [];
  
  if (!project.title || project.title.trim() === '') {
    errors.push('Project title is required');
  }
  
  if (project.acts.length === 0) {
    errors.push('Project must have at least one act');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

