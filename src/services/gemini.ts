import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface Flashcard {
  word: string;
  partOfSpeech: string;
  chinese: string;
  example: string;
}

export async function generateFlashcards(day: number): Promise<Flashcard[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate 25 high-frequency TOEIC English vocabulary words for Day ${day} out of 80.
    Provide the word, part of speech (e.g., n., v., adj.), traditional Chinese explanation, and an English example sentence.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING, description: "The English word" },
            partOfSpeech: { type: Type.STRING, description: "Part of speech, e.g., n., v., adj." },
            chinese: { type: Type.STRING, description: "Traditional Chinese explanation" },
            example: { type: Type.STRING, description: "An English example sentence" }
          },
          required: ["word", "partOfSpeech", "chinese", "example"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse flashcards", e);
    return [];
  }
}

export interface ExamQuestion {
  id: string;
  type: string;
  audioText?: string; // Text to be spoken via TTS for listening parts
  imageUrl?: string; // For Part 1
  text?: string; // For reading parts
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export async function generateMockExamPart(part: number): Promise<ExamQuestion[]> {
  let prompt = "";
  let count = 5; // Generate 5 questions per part for demonstration to avoid long wait times
  
  switch (part) {
    case 1:
      prompt = `Generate ${count} TOEIC Part 1 (Photographs) mock questions. 
      For each question, provide a description of an imaginary photograph (imageUrl can be a placeholder or just use audioText for the 4 options), 
      the 4 options (A, B, C, D) to be spoken, the correct answer, and an explanation in Traditional Chinese.`;
      break;
    case 2:
      prompt = `Generate ${count} TOEIC Part 2 (Question-Response) mock questions.
      For each question, provide the spoken question/statement, 3 spoken responses (A, B, C), the correct answer, and an explanation in Traditional Chinese.`;
      break;
    case 3:
      prompt = `Generate ${count} TOEIC Part 3 (Short Conversations) mock questions.
      For each question, provide the transcript of a short conversation between 2 people, a question about the conversation, 4 written options, the correct answer, and an explanation in Traditional Chinese.`;
      break;
    case 4:
      prompt = `Generate ${count} TOEIC Part 4 (Short Talks) mock questions.
      For each question, provide the transcript of a short talk/announcement, a question about the talk, 4 written options, the correct answer, and an explanation in Traditional Chinese.`;
      break;
    case 5:
      prompt = `Generate ${count} TOEIC Part 5 (Incomplete Sentences) mock questions.
      For each question, provide a sentence with a blank, 4 written options to fill the blank, the correct answer, and an explanation in Traditional Chinese.`;
      break;
    case 6:
      prompt = `Generate ${count} TOEIC Part 6 (Text Completion) mock questions.
      For each question, provide a short text with a blank, 4 written options to fill the blank, the correct answer, and an explanation in Traditional Chinese.`;
      break;
    case 7:
      prompt = `Generate ${count} TOEIC Part 7 (Reading Comprehension) mock questions.
      For each question, provide a short reading passage (email, notice, etc.), a question about the passage, 4 written options, the correct answer, and an explanation in Traditional Chinese.`;
      break;
    default:
      prompt = `Generate 5 TOEIC mock questions.`;
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            type: { type: Type.STRING, description: "e.g., 'listening' or 'reading'" },
            audioText: { type: Type.STRING, description: "Transcript for listening parts. For Part 1 & 2, include the options in the audio text." },
            text: { type: Type.STRING, description: "Reading passage or sentence with blank" },
            question: { type: Type.STRING, description: "The question being asked" },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Array of 3 or 4 options"
            },
            answer: { type: Type.STRING, description: "The exact string of the correct option" },
            explanation: { type: Type.STRING, description: "Explanation in Traditional Chinese" }
          },
          required: ["id", "type", "question", "options", "answer", "explanation"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse mock exam", e);
    return [];
  }
}
