// Centralized locomotion type constants for consistent filtering
// Database values are: quadruped, biped, gliding, swimming

export const LOCOMOTION_TYPES = {
  QUADRUPED: 'quadruped',
  BIPED: 'biped',
  GLIDING: 'gliding',
  SWIMMING: 'swimming'
} as const;

export type LocomotionType = typeof LOCOMOTION_TYPES[keyof typeof LOCOMOTION_TYPES];

// Icons for each locomotion type
export const LOCOMOTION_ICONS = {
  [LOCOMOTION_TYPES.QUADRUPED]: '🦏',
  [LOCOMOTION_TYPES.BIPED]: '🚶',
  [LOCOMOTION_TYPES.GLIDING]: '🦅',
  [LOCOMOTION_TYPES.SWIMMING]: '🏊'
} as const;

// Translation keys for each locomotion type
export const LOCOMOTION_TRANSLATION_KEYS = {
  [LOCOMOTION_TYPES.QUADRUPED]: 'dinosaur.quadruped',
  [LOCOMOTION_TYPES.BIPED]: 'dinosaur.biped',
  [LOCOMOTION_TYPES.GLIDING]: 'dinosaur.gliding',
  [LOCOMOTION_TYPES.SWIMMING]: 'dinosaur.swimming'
} as const;

// Helper function to get locomotion type icon
export const getLocomotionIcon = (type: string | undefined): string => {
  if (!type) return '🦕';
  const normalizedType = type.toLowerCase();
  return LOCOMOTION_ICONS[normalizedType as LocomotionType] || '🦕';
};

// Helper function to validate locomotion type
export const isValidLocomotionType = (type: string): type is LocomotionType => {
  return Object.values(LOCOMOTION_TYPES).includes(type as LocomotionType);
};