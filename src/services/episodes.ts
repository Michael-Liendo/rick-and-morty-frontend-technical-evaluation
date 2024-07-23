import fetch from '@/lib/fetch';

import type { IEpisodes } from '@/types/episode';

export class Episodes {
  static async getAll() {
    try {
      const request = await fetch('/episode');
      const response = await request.json();

      return response as IEpisodes;
    } catch (e) {
      console.error('Services error: ', e);
    }
  }
}
