import {
  Controller,
  Get,
  Res,
  InternalServerErrorException,
  HttpException,
  UseGuards,
  Inject,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './core/auth/jwt-auth.guard';
import { ModelService } from './core/db/model.service-provider';
import {
  SampleModelDefinition,
  SampleType,
} from './core/db/model-defs/sample.model-def';

@Controller()
export class AppController {
  constructor(
    @Inject(SampleModelDefinition.name)
    protected readonly sampleModelService: ModelService,
  ) {}

  @Get()
  getHello(@Res() res: Response): void {
    try {
      res.status(200).json({ ok: true });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unknown error: ' + JSON.stringify(error, null, 2),
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test/name')
  async getName(@Req() req: Request, @Res() res: Response): Promise<void> {
    // tslint:disable-next-line: no-console
    console.log('getName user:', req.user);
    try {
      const SampleModel = await this.sampleModelService.getModelAsync();

      res.status(200).json({
        ok: true,
        name: SampleModel.modelName,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unknown error: ' + JSON.stringify(error, null, 2),
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test/list')
  async getList(@Req() req: Request, @Res() res: Response): Promise<void> {
    // tslint:disable-next-line: no-console
    console.log('getList user:', req.user);
    try {
      const SampleModel = await this.sampleModelService.getModelAsync();

      const resultDocs = await SampleModel.find(
        (err: Error, docs: SampleType[]) => {
          if (err) {
            throw err;
          }
          return docs;
        },
      );
      res.status(200).json({ ok: true, docs: resultDocs });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unknown error: ' + JSON.stringify(error, null, 2),
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test/new')
  async insertNew(@Req() req: Request, @Res() res: Response): Promise<void> {
    // tslint:disable-next-line: no-console
    console.log('insertNew user:', req.user);
    try {
      const SampleModel = await this.sampleModelService.getModelAsync();

      const idValue = Date.now();
      const resultDoc = await SampleModel.create(
        {
          id: idValue,
          title: `Title - ID: ${idValue}`,
        } as SampleType,
        (err: Error, doc: SampleType) => {
          if (err) {
            throw err;
          }
          return doc;
        },
      );
      res.status(200).json({ ok: true, doc: resultDoc });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unknown error: ' + JSON.stringify(error, null, 2),
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test/drop-all')
  async dropAll(@Req() req: Request, @Res() res: Response): Promise<void> {
    // tslint:disable-next-line: no-console
    console.log('dropAll user:', req.user);
    try {
      const SampleModel = await this.sampleModelService.getModelAsync();

      const resultDoc = await SampleModel.deleteMany({});
      res.status(200).json({ ok: true });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unknown error: ' + JSON.stringify(error, null, 2),
      );
    }
  }
}
