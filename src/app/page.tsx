'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Services from '@/services';
import type { ICharacter } from '@/types/character';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [characters, setCharacters] = useState<ICharacter[]>();

  async function getAllCharacters() {
    const results = await Services.characters.getAll();
    setCharacters(results?.results);
  }

  useEffect(() => {
    getAllCharacters();
  }, []);
  return (
    <div className="">
      <div className="flex justify-center items-center">
        <div className="grid w-full max-w-sm items-center gap-1 mt-4">
          <label htmlFor="find">Character</label>
          <div className="flex items-center">
            <Input
              type="search"
              id="find"
              placeholder="Morty"
              className="rounded-r-none"
            />
            <Button className="rounded-l-none bg-blue-600 hover:bg-blue-600/90">
              Find
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-8">
        {characters?.map((character) => (
          <Card key={character.id}>
            <Image
              src={character.image}
              alt={`${character.name} photo`}
              className="rounded-t-lg"
              width={400}
              height={500}
            />
            <CardContent>
              <h1 className="text-2xl">{character.name}</h1>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
