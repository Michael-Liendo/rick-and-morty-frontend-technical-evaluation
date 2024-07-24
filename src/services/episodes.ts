import fetch from '@/lib/fetch';
import type { IResponse } from '@/types';
import type { IEpisode } from '@/types/episode';
export class Episodes {
  static async getAll() {
    try {
      const request = await fetch('/episode');
      const response = await request.json();

      return response as IResponse<IEpisode>;
    } catch (e) {
      console.error('Services error: ', e);
    }
  }
}
