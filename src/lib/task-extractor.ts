import { generateOllamaResponse } from './ollama';

export interface ExtractedTask {
  title: string;
  weight: number;
  deadline: string | null;
  estimated_minutes: number | null;
  confidence: number;
}

export interface ExtractionResult {
  tasks: ExtractedTask[];
  project_name: string | null;
  summary: string;
}

const SYSTEM_PROMPT = `
You are Scribe, an AI assistant that extracts actionable tasks from notes.

Analyze the following note and extract:
1. Individual tasks (action items)
2. Suggested deadlines (YYYY-MM-DD format)
3. Project name (group related tasks)
4. Task weights (1-10 based on urgency/complexity)
5. Estimated time (in minutes)

Respond ONLY with valid JSON:
{
  "tasks": [
    {
      "title": "task description",
      "weight": 1-10, // Must be between 1 and 10
      "deadline": "YYYY-MM-DD" | null,
      "estimated_minutes": 30 | null,
      "confidence": 0.9
    }
  ],
  "project_name": "Project name" | null,
  "summary": "Brief summary of the note."
}
`;

export async function extractTasks(noteContent: string): Promise<ExtractionResult> {
  const prompt = `${SYSTEM_PROMPT}\nNote Content:\n${noteContent}`;
  const responseText = await generateOllamaResponse(prompt);
  try {
    let cleanText = responseText.trim();
    // Strip markdown formatting if the model incorrectly wraps the JSON payload
    cleanText = cleanText.replace(/^```[a-z]*\s*/i, '').replace(/\s*```$/i, '');
    const result = JSON.parse(cleanText);
    return result as ExtractionResult;
  } catch (error) {
    console.error("Failed to parse the AI response as JSON", responseText);
    throw new Error("Invalid JSON from AI model.");
  }
}
