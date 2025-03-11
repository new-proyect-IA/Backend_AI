import { Injectable } from '@nestjs/common';
import { orthographyCheckCase } from './use-cases';
import { Orthography } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  // Este servicio solo va llamar casos de uso

  async orthographyCheck(orthography: Orthography) {
    return await orthographyCheckCase(this.openai, {
      prompt: orthography.prompt,
    });
  }
}
