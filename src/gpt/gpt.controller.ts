import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { GptService } from './gpt.service';
import { Orthography, ProsCornDiscusserDto } from './dtos';


@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() orthography: Orthography) {
    return this.gptService.orthographyCheck(orthography);
  }

  @Post('pros-cons-discusser')
  prosConsDiscusser(@Body() orthography: ProsCornDiscusserDto) {
    return this.gptService.prosConsDiscusser(orthography);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDiscusserStream(
    @Body() prosCornDiscusser: ProsCornDiscusserDto,
    @Res() res:Response
  ) {

    const stream = await this.gptService.prosConsDiscusserStream(prosCornDiscusser);

    res.setHeader('Content-Type', 'application/json');
    res.status( HttpStatus.OK )

    for await ( const chunk of stream ) {
      const piece = chunk.choices[0].delta.content || '';
      res.write(piece)
    }

    res.end()
  }
}
