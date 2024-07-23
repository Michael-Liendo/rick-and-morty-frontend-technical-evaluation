'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Services from '@/services';
import { useEffect, useState } from 'react';

import EditSvg from '@/components/EditSvg';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import getRandomNumber from '@/lib/RandomNumbers';
import type { IEpisode } from '@/types/episode';

export default function Home() {
  const [episodes, setEpisodes] = useState<IEpisode[]>();

  const [isOpenActionModal, setIsOpenActionModal] = useState<{
    isOpen: boolean;
    isCreate: boolean;
    index?: number;
  }>({
    isOpen: false,
    isCreate: false,
  });
  const [modalData, setModalData] = useState<IEpisode>({
    name: '',
    created: '',
    characters: [],
    air_date: new Date().toLocaleDateString('es', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    }),
    episode: getRandomNumber(100, 1000).toString(),
    id: getRandomNumber(100, 1000),
    url: '1',
  });

  // Filter

  const [filterName, setFilterName] = useState<string>();

  async function getAllEpisodes() {
    const episodesRaw = localStorage.getItem('episodes');
    if (!episodesRaw) {
      const results = await Services.episodes.getAll();
      setEpisodes(results?.results);
      localStorage.setItem('episodes', JSON.stringify(results?.results));
    } else {
      const episodes = JSON.parse(episodesRaw);
      setEpisodes(episodes);
    }
  }

  function handleOpenModalEditEpisode(index: number) {
    if (!episodes) return;
    setModalData(episodes?.at(index) ?? modalData);
    setIsOpenActionModal({ isCreate: false, isOpen: true, index });
  }
  function handleOpenModalCreateEpisode() {
    if (!episodes) return;
    setIsOpenActionModal({ isCreate: true, isOpen: true });
  }

  function handleSubmitModalAction() {
    if (isOpenActionModal.isCreate) {
      setEpisodes((prev) => {
        const newArray = [...(prev ?? [])];
        newArray.unshift(modalData);
        localStorage.setItem('episodes', JSON.stringify(newArray));

        return newArray;
      });
    } else {
      setEpisodes((prev) => {
        const newArray = [...(prev ?? [])];
        newArray[isOpenActionModal?.index || 0] = modalData;
        localStorage.setItem('episodes', JSON.stringify(newArray));

        return newArray;
      });
    }

    handleCloseModalAction();
  }

  function handleCloseModalAction() {
    setIsOpenActionModal({ isCreate: false, isOpen: false, index: undefined });
    setModalData({
      name: '',
      characters: [],
      created: new Date().toDateString(),
      air_date: new Date().toLocaleDateString('es', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }),
      episode: '',
      id: getRandomNumber(100, 1000),
      url: getRandomNumber(100, 1000).toString(),
    });
  }

  useEffect(() => {
    getAllEpisodes();
  }, []);
  return (
    <>
      <div className="flex">
        <div
          title="sidebar"
          className="hidden sm:block w-1/5 sm:w-1/4 mr-10 pr-5 border-r min-h-screen"
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
        </div>

        <div title="main" className="w-full">
          <div className="mt-10 flex justify-between sm:justify-end items-center">
            <div className="flex sm:hidden items-center">
              <h1 className="text-xl sm:text-2xl mr-2">Search</h1>
              <Input
                type="search"
                id="find"
                placeholder="Morty"
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
            <Button
              onClick={handleOpenModalCreateEpisode}
              className="text-xl bg-blue-600 hover:bg-blue-600/90"
            >
              Create
            </Button>
          </div>

          <Table className="mt-10 w-full">
            <TableCaption>Table of Episodes</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Air Date</TableHead>
                <TableHead>Characters Count</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {episodes
                ?.filter(({ name }) =>
                  filterName
                    ? name
                        .toLocaleLowerCase()
                        .includes(filterName.toLocaleLowerCase())
                    : true,
                )
                .map((episode, index) => (
                  <TableRow key={episode.id}>
                    <TableCell>{episode.episode}</TableCell>
                    <TableCell className="truncate font-medium">
                      {episode.name}
                    </TableCell>
                    <TableCell className="truncate">
                      {episode.air_date}
                    </TableCell>

                    <TableCell>{episode.characters?.length}</TableCell>
                    <TableCell className="text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenModalEditEpisode(index)}
                      >
                        <i className="max-w-24">
                          <EditSvg />
                        </i>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">{episodes?.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
      {/* ==== modal edit ==== */}
      {isOpenActionModal.isOpen && (
        <div className="fixed right-0 top-0 z-10 flex h-screen w-screen flex-col items-center justify-center drop-shadow-lg backdrop-blur-[2px] bg-[#00000055]">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>
                {isOpenActionModal.isCreate ? 'Create ' : 'Edit '}
                Episode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
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
              </div>
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
