'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Services from '@/services';

import CharBadged from '@/components/CharBadged';
import type { IEpisodes } from '@/types/episode';

export default function Home() {
  const [episodes, setEpisodes] = useState<IEpisodes[]>();

  async function getAllEpisodes() {
    const results = await Services.episodes.getAll();
    setEpisodes(results?.results);
  }

  useEffect(() => {
    getAllEpisodes();
  }, []);
  return (
    <div className="">
      <div className="flex justify-center items-center">
        <div className="grid w-full max-w-sm items-center gap-1 mt-4">
          <label htmlFor="find">Episode</label>
          <div className="flex items-center">
            <Input
              type="search"
              id="find"
              placeholder=""
              className="rounded-r-none"
            />
            <Button className="rounded-l-none bg-blue-600 hover:bg-blue-600/90">
              Find
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-8">
        {episodes?.map((episode) => (
          <Card key={episode.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{episode.name}</CardTitle>
                <small>
                  <time dateTime={episode.created}>{episode.air_date}</time>
                </small>
              </div>
            </CardHeader>
            <CardContent>
              <h3>Characters</h3>
              <div className="space-x-1 ">
                {/*   {episode.characters.splice(0, 4).map((character) => (
                  <CharBadged key={character} characterUrl={character} />
                ))} */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
