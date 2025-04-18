import OpenAI from 'openai';

interface Comparison {
    prompt: string
}


export const prosConsDiscusserStreamCase = async (
    openai: OpenAI,
    comparison: Comparison,
) => {
    const { prompt } = comparison;

    return await openai.chat.completions.create({
        stream: true,
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            /* Entrenar la AI para que tome el roll que necitamos
            Ejemplo:
    bloc
            */
            content:
            `
              Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
              la respuesta debe de ser en formato markdown,
              los pros y contras deben de estar en una lista,
            `,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 500
      });

}