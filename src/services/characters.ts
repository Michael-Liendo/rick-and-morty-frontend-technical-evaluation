import fetch from '@/lib/fetch';
import type { ICharacter, ICharacters } from '@/types/character';

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

  static async get(id: string) {
    try {
      const request = await fetch(`/character/${id}`);
      const response = await request.json();

      return response as ICharacter;
    } catch (e) {
      console.error('Services error: ', e);
    }
  }
}
