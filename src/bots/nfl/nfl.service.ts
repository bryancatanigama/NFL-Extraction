import { Injectable } from '@nestjs/common';
import { PuppeteerService } from 'src/commons/puppeteer/puppeteer.service';
import * as cheerio from 'cheerio';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class NflService {
  constructor(
    private puppeteerService: PuppeteerService,
    private prisma: PrismaService,
  ) {}

  async buscarPorPlayer() {
    try {
      const page = await this.puppeteerService.initBrowser(
        true,
        'https://www.nfl.com/stats/player-stats/category/passing/1970/reg/all/passingyards/desc',
      );

      const players = [];
      while (true) {
        page.waitForTimeout(3000);
        const currentPageContent = await page.content();
        const $ = cheerio.load(currentPageContent);

        const trElements = $('tbody tr');

        trElements.each((index, element) => {
          const imageUrl = $(element).find('img.img-responsive').attr('src');
          const playerName = $(element)
            .find('.d3-o-player-fullname')
            .text()
            .trim();
          const tdElements = $(element).find('td');
          const stats = tdElements.map((i, el) => $(el).text().trim()).get();

          // Create an object for each player
          const playerData = {
            name_player: playerName,
            image_player: imageUrl,
            passing_yards_player_stats: parseInt(stats[1]),
            yards_per_attempt_player_stats: parseFloat(stats[2]),
            attempts_player_stats: parseInt(stats[3]),
            completions_player_stats: parseInt(stats[4]),
            completion_percentage_player_stats: parseFloat(stats[5]),
            touchdowns_player_stats: parseInt(stats[6]),
            interceptions_player_stats: parseInt(stats[7]),
            quarterback_rating_player_stats: parseFloat(stats[8]),
            first_downs_player_stats: parseInt(stats[9]),
            first_down_percentage_player_stats: parseFloat(stats[10]),
            twenty_plus_yard_completions_player_stats: parseInt(stats[11]),
            forty_plus_yard_completions_player_stats: parseInt(stats[12]),
            longest_pass_player_stats: parseInt(stats[13]),
            sacks_player_stats: parseInt(stats[14]),
            sack_yards_player_stats: parseInt(stats[15]),
            data_player_stats: 1970,
            data_cadastro: new Date(),
          };

          players.push(playerData);
        });

        const nextPageButton = $('.nfl-o-table-pagination__next');
        const hasNextPage =
          nextPageButton.length > 0 && !nextPageButton.is(':disabled');
        console.log(`Has Next Page: ${hasNextPage}`);

        if (hasNextPage) {
          console.log('Clicking next page');
          await page.click('.nfl-o-table-pagination__next');

          await page.waitForTimeout(3000);
        } else {
          console.log('No more pages, breaking loop');
          break;
        }
      }

      const createdPlayers = await this.prisma.player_stats.createMany({
        data: players,
      });

      console.log('Players saved to the database:', createdPlayers);
      return players;
    } catch (error) {
      console.error('Erro ao buscar os players:', error);
    } finally {
      await this.puppeteerService.closeBrowser();
    }
  }
  async buscarPorPlayerTotalAno() {
    try {
      const players = [];
      const anos = Array.from({ length: 2023 - 1969 + 1 }, (v, k) => k + 1970);
      for (const ano of anos) {
        console.log(ano);

        const url = `https://www.nfl.com/stats/player-stats/category/passing/${ano}/reg/all/passingyards/desc`;
        const page = await this.puppeteerService.initBrowser(false, url);
        page.waitForTimeout(2000);
        while (true) {
          page.waitForTimeout(3000);
          const currentPageContent = await page.content();
          const $ = cheerio.load(currentPageContent);

          const trElements = $('tbody tr');

          trElements.each((index, element) => {
            const imageUrl = $(element).find('img.img-responsive').attr('src');
            const playerName = $(element)
              .find('.d3-o-player-fullname')
              .text()
              .trim();
            const tdElements = $(element).find('td');
            const stats = tdElements.map((i, el) => $(el).text().trim()).get();

            // Create an object for each player
            const playerData = {
              name_player: playerName,
              image_player: imageUrl,
              passing_yards_player_stats: parseInt(stats[1]),
              yards_per_attempt_player_stats: parseFloat(stats[2]),
              attempts_player_stats: parseInt(stats[3]),
              completions_player_stats: parseInt(stats[4]),
              completion_percentage_player_stats: parseFloat(stats[5]),
              touchdowns_player_stats: parseInt(stats[6]),
              interceptions_player_stats: parseInt(stats[7]),
              quarterback_rating_player_stats: parseFloat(stats[8]),
              first_downs_player_stats: parseInt(stats[9]),
              first_down_percentage_player_stats: parseFloat(stats[10]),
              twenty_plus_yard_completions_player_stats: parseInt(stats[11]),
              forty_plus_yard_completions_player_stats: parseInt(stats[12]),
              longest_pass_player_stats: parseInt(stats[13]),
              sacks_player_stats: parseInt(stats[14]),
              sack_yards_player_stats: parseInt(stats[15]),
              data_player_stats: ano,
              data_cadastro: new Date(),
            };

            players.push(playerData);
          });

          const nextPageButton = $('.nfl-o-table-pagination__next');
          const hasNextPage =
            nextPageButton.length > 0 && !nextPageButton.is(':disabled');
          console.log(`Has Next Page: ${hasNextPage}`);

          if (hasNextPage) {
            console.log('Clicking next page');
            await page.click('.nfl-o-table-pagination__next');

            await page.waitForTimeout(3000);
          } else {
            console.log('No more pages, breaking loop');
            break;
          }
        }

        // const createdPlayers = await this.prisma.player_stats.createMany({
        //   data: players,
        // });

        // console.log('Players saved to the database:', createdPlayers);
        await this.puppeteerService.closeBrowser();
      }
      return players;
    } catch (error) {
      console.error('Erro ao buscar os players:', error);
    } finally {
      await this.puppeteerService.closeBrowser();
    }
  }
}
