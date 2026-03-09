const fs = require('fs');

let tsCode = fs.readFileSync('src/data/vocabulary.ts', 'utf8');

// Strip interface
tsCode = tsCode.replace(/export interface FlashcardData \{[\s\S]*?\}/, '');

// Strip type annotations
tsCode = tsCode.replace(/const coreVocabulary: FlashcardData\[\] =/g, 'const coreVocabulary =');
tsCode = tsCode.replace(/export const toeicVocabulary: FlashcardData\[\] =/g, 'const toeicVocabulary =');
tsCode = tsCode.replace(/export function getFlashcardsForDay\(day: number\): FlashcardData\[\] \{/g, 'function getFlashcardsForDay(day) {');

let htmlCode = fs.readFileSync('index.html', 'utf8');

htmlCode = htmlCode.replace(
  "import { getFlashcardsForDay } from '/src/data/vocabulary.ts';",
  tsCode
);

fs.writeFileSync('index.html', htmlCode);
console.log('Done!');
