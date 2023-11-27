import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'src/commons/puppeteer/puppeteer.module';
import { NflController } from './nfl.controller';
import { NflService } from './nfl.service';
import { PrismaModule } from 'src/infra/database/prisma.module';

@Module({
  imports: [PuppeteerModule, PrismaModule],
  controllers: [NflController],
  providers: [NflService],
})
export class NflModule {}
