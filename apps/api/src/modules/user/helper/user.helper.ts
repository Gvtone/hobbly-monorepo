export function GenerateRandomUsername() {
  const adjectives = [
    'misty',
    'calm',
    'bright',
    'soft',
    'wild',
    'quiet',
    'cozy',
    'velvet',
    'lazy',
    'golden',
    'lunar',
    'pastel',
    'crisp',
    'breezy',
    'amber',
    'frosty',
    'silky',
    'rosy',
    'dewy',
    'mossy',
  ];

  const nouns = [
    'crafter',
    'sketcher',
    'reader',
    'dreamer',
    'maker',
    'writer',
    'explorer',
    'collector',
    'keeper',
    'wanderer',
    'tinkerer',
    'doodler',
    'brewer',
    'stitcher',
    'carver',
    'planter',
    'strummer',
    'weaver',
    'potter',
    'narrator',
  ];

  const number = Math.floor(Math.random() * 900) + 100;
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adj}_${noun}_${number}`;
}
