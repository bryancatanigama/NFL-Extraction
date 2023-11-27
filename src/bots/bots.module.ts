import { Module } from '@nestjs/common';
import { NflModule } from './nfl/nfl.module';

@Module({
  imports: [NflModule],
})
export class BotsModule {}
