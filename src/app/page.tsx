'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Services from '@/services';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { ICharacter } from '@/types/character';

export default function Home() {
  const [characters, setCharacters] = useState<ICharacter[]>();

  const [species, setSpecies] = useState<Set<string>>(new Set());
  const [statuses, setStatuses] = useState<Set<string>>(new Set());
  const [genders, setGenders] = useState<Set<string>>(new Set());

  // Filter
  const [filterSpecie, setFilterSpecie] = useState<string>();
  const [filterStatus, setFilterStatus] = useState<string>();
  const [filterName, setFilterName] = useState<string>();
  const [filterGender, setFilterGender] = useState<string>();

  async function getAllCharacters() {
    const charactersRaw = localStorage.getItem('characters');
    if (!charactersRaw) {
      const results = await Services.characters.getAll();
      setCharacters(results?.results);
      localStorage.setItem('characters', JSON.stringify(results?.results));
      handleSetFilters(results?.results);
    } else {
      const characters = JSON.parse(charactersRaw);
      setCharacters(characters);
      handleSetFilters(characters);
    }
  }

  function handleSetFilters(characters: ICharacter[] | undefined) {
    // biome-ignore lint/complexity/noForEach: <explanation>
    characters?.forEach((character) => {
      setSpecies((prev) => prev.add(character.species));
    });

    // biome-ignore lint/complexity/noForEach: <explanation>
    characters?.forEach((character) => {
      setStatuses((prev) => prev.add(character.status));
    });
    // biome-ignore lint/complexity/noForEach: <explanation>
    characters?.forEach((character) => {
      setGenders((prev) => prev.add(character.gender));
    });
  }

  function handleEditCharacter(index: number) {}

  useEffect(() => {
    getAllCharacters();
  }, []);

  return (
    <>
      <div className="flex ">
        <div title="sidebar" className="w-1/5 sm:w-1/4 pt-24">
          <h1 className="text-xl sm:text-2xl">Filters</h1>
          <p className="mt-3">Specie</p>
          <div className="space-x-3">
            {Array.from(species).map((specie) => (
              <Badge
                onClick={() =>
                  setFilterSpecie((prev) =>
                    prev === specie ? undefined : specie,
                  )
                }
                className={`${filterSpecie === specie && 'bg-blue-500'}`}
                key={specie as string}
              >
                {specie as string}
              </Badge>
            ))}
          </div>
          <p className="mt-3">Status</p>
          <div className="space-x-3">
            {Array.from(statuses).map((status) => (
              <Badge
                onClick={() =>
                  setFilterStatus((prev) =>
                    prev === status ? undefined : status,
                  )
                }
                className={`${filterStatus === status && 'bg-blue-500'}`}
                key={status as string}
              >
                {status as string}
              </Badge>
            ))}
          </div>
          <p className="mt-3">Gender</p>
          <div className="space-x-3">
            {Array.from(genders).map((gender) => (
              <Badge
                onClick={() =>
                  setFilterGender((prev) =>
                    prev === gender ? undefined : gender,
                  )
                }
                className={`${filterGender === gender && 'bg-blue-500'}`}
                key={gender as string}
              >
                {gender as string}
              </Badge>
            ))}
          </div>
        </div>

        <div title="main">
          <div className="flex justify-center items-center">
            <div className="grid w-full max-w-sm items-center gap-1 mt-4">
              <label htmlFor="find">Find Character</label>
              <div className="flex items-center">
                <Input
                  type="search"
                  id="find"
                  placeholder="Morty"
                  className="rounded-r-none"
                  onChange={(e) => setFilterName(e.target.value)}
                />
                <Button className="rounded-l-none bg-blue-600 hover:bg-blue-600/90">
                  Find
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-8">
            {characters
              ?.filter(
                ({ species, gender, status }) =>
                  (filterSpecie ? filterSpecie === species : true) &&
                  (filterStatus ? filterStatus === status : true) &&
                  (filterGender ? filterGender === gender : true),
              )
              .map((character) => {
                return (
                  <Card key={character.id}>
                    <Image
                      src={character.image}
                      alt={`${character.name} photo`}
                      className="rounded-t-lg w-full object-cover"
                      width={500}
                      height={400}
                    />
                    <CardContent className="flex items-start justify-between mt-2">
                      <h1 className="text-xl sm:text-2xl">{character.name}</h1>
                      <small
                        title={character.origin.name}
                        className="truncate max-w-24"
                      >
                        {character.origin.name}
                      </small>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
