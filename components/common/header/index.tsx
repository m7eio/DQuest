import React from 'react';
import WalletConnect from '@/components/wallet';

export default function Header() {
  return (
    <nav className="flex justify-between items-center px-4 py-2">
      <h3 className="text-lg font-bold">DQuest - A decentralized quest platform</h3>
      <WalletConnect />
    </nav>
  );
}
