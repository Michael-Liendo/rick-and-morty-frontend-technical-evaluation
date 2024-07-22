import fetch from '@/lib/fetch';
import type { ICharacters } from '@/types/character';

export class Characters {
  static async getAll() {
    try {
      const request = await fetch('/character');
      const response = await request.json();

      return response as ICharacters;
    } catch (e) {
      console.error('Services error: ', e);
    }
  }
}
