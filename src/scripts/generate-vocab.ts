import { GoogleGenAI, Type } from '@google/genai';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateBatch(batchNum: number) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 100 unique high-frequency TOEIC English vocabulary words. 
    Batch number: ${batchNum}. Ensure these are different from common basic words.
    Provide word, partOfSpeech (e.g., v., n., adj.), chinese (Traditional Chinese), example (English), and exampleChinese (Traditional Chinese).`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            partOfSpeech: { type: Type.STRING },
            chinese: { type: Type.STRING },
            example: { type: Type.STRING },
            exampleChinese: { type: Type.STRING }
          },
          required: ["word", "partOfSpeech", "chinese", "example", "exampleChinese"]
        }
      }
    }
  });
  return JSON.parse(response.text || "[]");
}

async function main() {
  let allWords: any[] = [];
  const batches = 19; // 19 * 100 = 1900 words
  
  for (let i = 1; i <= batches; i++) {
    console.log(`Generating batch ${i}/${batches}...`);
    try {
      const words = await generateBatch(i);
      allWords = allWords.concat(words);
      console.log(`Batch ${i} success. Total words: ${allWords.length}`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (e) {
      console.error(`Error in batch ${i}:`, e);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  const filePath = path.join(process.cwd(), 'src/data/vocabulary.json');
  fs.writeFileSync(filePath, JSON.stringify(allWords, null, 2));
  console.log(`Saved ${allWords.length} words to ${filePath}`);
}

main();
