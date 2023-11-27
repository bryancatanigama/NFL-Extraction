import { Controller, Get } from '@nestjs/common';
import { NflService } from './nfl.service';

@Controller('nfl')
export class NflController {
  constructor(private readonly nflService: NflService) {}

  @Get('/player-stats')
  buscarPorPlayer(): any {
    return this.nflService.buscarPorPlayer();
  }
  @Get('/player-stats-full')
  buscarPorPlayerTotalData(): any {
    return this.nflService.buscarPorPlayerTotalAno();
  }
}
