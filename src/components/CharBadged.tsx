import getId from '@/lib/getId';
import { useEffect, useState } from 'react';
import type { ICharacter } from '@/types/character';
import Services from '@/services';
import { Badge } from './ui/badge';

export default function CharBadged({ characterUrl }: { characterUrl: string }) {
  const [character, setCharacter] = useState<ICharacter>();
  const id = getId(characterUrl);

  async function handleGetData() {
    const character = await Services.characters.get(id);

    setCharacter(character);
  }
  useEffect(() => {
    handleGetData();
  }, []);

  if (id === '0' || !id) return null;
  return (
    <>
      <Badge>{character?.name}</Badge>
    </>
  );
}
