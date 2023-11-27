import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

import type { Browser, Page } from 'puppeteer';

puppeteer.use(StealthPlugin());

@Injectable()
export class PuppeteerService {
  private browser: Browser | null = null;

  async initBrowser(
    headlessMode: 'new' | boolean = 'new',
    site: string,
  ): Promise<Page> {
    this.browser = await puppeteer.launch({
      headless: headlessMode === 'new' ? true : headlessMode,
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true,
      dumpio: false,
    });

    const page = await this.browser.newPage();
    await page.setViewport({ width: 1800, height: 1200 });
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    );
    await page.goto(site, {
      waitUntil: 'load',
      timeout: 0, // Sem limite de tempo
    });
    return page;
  }

  async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
