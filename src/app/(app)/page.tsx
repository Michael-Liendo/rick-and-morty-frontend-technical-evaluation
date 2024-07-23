'use client';

import EditSvg from '@/components/EditSvg';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import getRandomNumber from '@/lib/RandomNumbers';
import Services from '@/services';
import type { ICharacter } from '@/types/character';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [characters, setCharacters] = useState<ICharacter[]>();

  const [isOpenActionModal, setIsOpenActionModal] = useState<{
    isOpen: boolean;
    isCreate: boolean;
    index?: number;
  }>({
    isOpen: false,
    isCreate: false,
  });
  const [modalData, setModalData] = useState<ICharacter>({
    name: '',
    created: new Date(),
    episode: [getRandomNumber(0, 71).toString()],
    gender: 'Male',
    id: getRandomNumber(100, 1000),
    image: '',
    location: { name: 'Venezuela', url: '1' },
    origin: { name: 'Earth', url: '1' },
    species: 'Human',
    status: 'Alive',
    type: '',
    url: '1',
  });

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

  function handleOpenModalEditCharacter(index: number) {
    if (!characters) return;
    setModalData(characters?.at(index) ?? modalData);
    setIsOpenActionModal({ isCreate: false, isOpen: true, index });
  }
  function handleOpenModalCreateCharacter() {
    if (!characters) return;
    setIsOpenActionModal({ isCreate: true, isOpen: true });
  }

  function handleSubmitModalAction() {
    if (isOpenActionModal.isCreate) {
      setCharacters((prev) => {
        const newArray = [...(prev ?? [])];
        newArray.unshift(modalData);
        localStorage.setItem('characters', JSON.stringify(newArray));

        return newArray;
      });
    } else {
      setCharacters((prev) => {
        const newArray = [...(prev ?? [])];
        newArray[isOpenActionModal?.index || 0] = modalData;
        localStorage.setItem('characters', JSON.stringify(newArray));

        return newArray;
      });
    }

    handleCloseModalAction();
  }

  function handleCloseModalAction() {
    setIsOpenActionModal({ isCreate: false, isOpen: false, index: undefined });
    setModalData({
      name: '',
      created: new Date(),
      episode: [getRandomNumber(0, 71).toString()],
      gender: 'Male',
      id: getRandomNumber(100, 1000),
      image: 'https://rickandmortyapi.com/api/character/avatar/19.jpeg',
      location: { name: '', url: '0' },
      origin: { name: '', url: '0' },
      species: 'Human',
      status: 'Alive',
      type: '',
      url: '1',
    });
  }

  useEffect(() => {
    getAllCharacters();
  }, []);

  return (
    <>
      <div className="flex">
        <div
          title="sidebar"
          className="min-w-5 max-w-xs mr-3 sm:mr-10 pr-2 sm:pr-5 border-r min-h-screen"
        >
          <div className="grid w-full max-w-sm items-center gap-1">
            <h1 className="text-xl sm:text-2xl mt-8">Search</h1>
            <div className="flex items-center">
              <Input
                type="search"
                id="find"
                placeholder="Morty"
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl mt-8">Filters</h1>
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
          <div className="mt-10 flex justify-end items-center">
            <Button
              onClick={handleOpenModalCreateCharacter}
              className="text-xl bg-blue-600 hover:bg-blue-600/90"
            >
              Create
            </Button>
          </div>
          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {characters
              ?.filter(
                ({ species, gender, status, name }) =>
                  (filterSpecie ? filterSpecie === species : true) &&
                  (filterStatus ? filterStatus === status : true) &&
                  (filterGender ? filterGender === gender : true) &&
                  (filterName
                    ? name
                        .toLocaleLowerCase()
                        .includes(filterName.toLocaleLowerCase())
                    : true),
              )
              .map((character, index) => {
                return (
                  <Card className="max-w-96" key={character.id}>
                    <Image
                      src={character.image}
                      alt={`${character.name} photo`}
                      className="rounded-t-lg w-full object-cover h-96"
                      width={500}
                      height={400}
                    />
                    <CardContent>
                      <div className="flex items-start justify-between mt-2">
                        <h1 className="text-xl sm:text-2xl">
                          {character.name}
                        </h1>
                        <button
                          type="button"
                          onClick={() => handleOpenModalEditCharacter(index)}
                        >
                          <i className=" max-w-24">
                            <EditSvg />
                          </i>
                        </button>
                      </div>
                      <h2 title={character.origin.name} className=" truncate">
                        {character.origin.name}
                      </h2>
                      <h2
                        title={character.origin.name}
                        className={`${character.status === 'Alive' && 'text-green-600'} ${character.status === 'Dead' && 'text-red-600'} ${character.status === 'unknown' && 'text-slate-600'} font-semibold`}
                      >
                        {character.status}
                      </h2>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
      {/* ==== modal edit ==== */}
      {isOpenActionModal.isOpen && (
        <div className="fixed right-0 top-0 z-10 flex h-screen w-screen flex-col items-center justify-center drop-shadow-lg backdrop-blur-[2px] bg-[#00000055]">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>
                {isOpenActionModal.isCreate ? 'Create ' : 'Edit '}
                character
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="name">Image</label>
                    <Input
                      id="name"
                      type="url"
                      placeholder="https://rickandmortyapi.com/api/character/avatar/19.jpeg"
                      value={modalData.image}
                      onChange={(e) => {
                        setModalData((prev) => {
                          return { ...prev, image: e.target.value };
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="name">Name</label>
                    <Input
                      id="name"
                      placeholder="Rick"
                      value={modalData.name}
                      onChange={(e) => {
                        setModalData((prev) => {
                          return { ...prev, name: e.target.value };
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="name">Location</label>
                    <Input
                      id="locations"
                      placeholder="Venezuela"
                      onChange={(e) => {
                        setModalData((prev) => {
                          return {
                            ...prev,
                            location: {
                              ...prev.location,
                              name: e.target.value,
                            },
                          };
                        });
                      }}
                      value={modalData.location.name}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="name">Status</label>
                    <Select
                      onValueChange={(e) => {
                        setModalData((prev) => {
                          return { ...prev, status: e };
                        });
                      }}
                      value={modalData.status}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          {Array.from(statuses).map((val) => (
                            <SelectItem key={val} value={val}>
                              {val}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleCloseModalAction}>
                Cancel
              </Button>
              <Button className="bg-blue-600" onClick={handleSubmitModalAction}>
                {isOpenActionModal.isCreate ? 'Create' : 'Edit'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
