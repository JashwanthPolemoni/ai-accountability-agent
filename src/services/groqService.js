export async function getAIResponse(messages, tasks) {
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const taskSummary = tasks
    .map((t, i) => `${i + 1}. ${t.text} - ${t.completed ? "Done" : "Pending"}`)
    .join("\n");

  const systemPrompt = `
You are a strict AI accountability coach.

User Tasks:
${taskSummary}

Rules:
- Be brutally honest
- Identify laziness patterns
- Suggest improvements
- No generic motivation
`;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ]
      })
    }
  );

  const data = await response.json();
  return data.choices[0].message.content;
}
