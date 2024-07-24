import type { ReactNode } from 'react';
import { Card } from './ui/card';

export default function Modal({
  isOpenActionModal,
  children,
}: { isOpenActionModal: boolean; children: ReactNode }) {
  return (
    <>
      {isOpenActionModal && (
        <div className="fixed right-0 top-0 z-10 flex h-screen w-screen flex-col items-center justify-center drop-shadow-lg backdrop-blur-[2px] bg-[#00000055]">
          <Card className="min-w-96">{children}</Card>
        </div>
      )}
    </>
  );
}
