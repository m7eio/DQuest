import React from 'react';

export default function Footer() {
  return (
    <footer className="relative flex flex-col items-center bg-black py-10 text-white">
      <div className="text-lg">A decentralized quest platform for the decentralized world.</div>
      <a href="https://pob.work" target="blank" className="text-base text-gray-400 mt-2 underline">
        Powered by POB protocol
      </a>
    </footer>
  );
}
