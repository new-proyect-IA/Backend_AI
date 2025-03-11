import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        /* Entrenar la AI para que tome el roll que necitamos
        Ejemplo:

        */
        content: `
        Te serán proveídos textos en español con posibles errore ortográficos y gramaticales,
        Las palabras usadas deben existir en el diccionario de la Real academia Española,
        Debes de responder en formato JSON
        tu tarea es corregirlos y retornar información soluciones,
        también debes de dar un porcentaje de aciertos por usuario,

        Si no hay errores, debes de retornar un mensaje de felicitaciones.

        Ejemplo de salida:
        {
            userScore: number
            errors: string[], // ['error -> solución']
            message: string, // usa emojis y texto para felicitar al usuario
        }

    `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    store: true,
  });

  //   console.log(completion);
  //   console.log(completion.choices[0].message);

  const jsonResp = completion.choices[0].message.content;

  return jsonResp;
};
