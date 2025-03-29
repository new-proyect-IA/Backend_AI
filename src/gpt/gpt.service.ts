import { Injectable } from '@nestjs/common';
import { orthographyCheckCase, prosConsDiscusserCase, prosConsDiscusserStreamCase } from './use-cases';
import { Orthography } from './dtos';
import OpenAI from 'openai';
import { ProsCornDiscusserDto } from './dtos/prosconsdiscusser.dto';

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

  async prosConsDiscusser(Proscorndiscusser: ProsCornDiscusserDto) {
    return await prosConsDiscusserCase(this.openai, {
      prompt: Proscorndiscusser.prompt,
    });
  }

  async prosConsDiscusserStream(Proscorndiscusser: ProsCornDiscusserDto) {
    return await prosConsDiscusserStreamCase(this.openai, {
      prompt: Proscorndiscusser.prompt,
    });
  }
}
