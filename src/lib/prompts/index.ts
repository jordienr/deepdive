export function getSubtopicsPrompt(topic: string) {
  if (!topic) {
    throw new Error("Topic is required.");
  }
  const p = `
    Generate a list of subtopics for ${topic} in the following JSON format: 
      [
        { 
          "title": string, 
          "description": string, 
          "difficulty": "beginner" | "intermediate" | "advanced"
        }
      ]
    Return only the JSON minified.`;

  return p;
}

export function getTopicDetailPrompt(mainTopic: string, subtopic: string) {
  if (!mainTopic || !subtopic) {
    throw new Error("Main Topic and Subtopic are required.");
  }
  const p = `Explain the topic: ${subtopic} (of ${mainTopic}). Use simple language and avoid jargon. Try to not sound like a robot or AI. Return only the a JSON minified for rendering in a website. For example:
    [
      {
        element: "h1" | "h2" | "h3" | "p"...
        content: string
      }
    ]`;

  return p;
}
