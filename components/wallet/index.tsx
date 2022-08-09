import Link from 'next/link';
import React, { FC, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Avatar from '@/components/common/avatar';
import { useWalletProvider } from '@/components/web3modal';
import { formatAddress } from '@/utils/format';

type WalletConnectProps = {
  className?: string;
};

const MenuLink: FC<{
  href: string;
  className: string;
  onClick?: React.MouseEventHandler;
}> = (props) => {
  const { href, children, onClick, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest} onClick={onClick}>
        {children}
      </a>
    </Link>
  );
};

const WalletConnect: FC<WalletConnectProps> = ({ className }) => {
  const { data, connect: handleConnectWallet, resetApp: onClickDisconnect } = useWalletProvider();
  const { address } = data || {};

  if (address) {
    return (
      <div className={className}>
        <div className="mr-10 flex items-center space-x-2">
          <Menu>
            <Menu.Button className="z-10 flex items-center rounded-3xl border border-transparent py-0.5 text-sm text-green-50">
              <div className="z-10 h-9 w-9 cursor-pointer overflow-hidden rounded-full border-2 border-white">
                <Avatar address={address} diameter={32} />
              </div>
              <span className="ml-2 text-black">{formatAddress(address)}</span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute top-12 right-10 z-20 flex flex-col rounded-2xl bg-yellow-50 p-2 shadow-lg">
                <Menu.Item>
                  {({ active }) => (
                    <MenuLink
                      href="#"
                      className={`whitespace-nowrap rounded-xl px-5 py-1.5 text-center text-sm text-neutral-800 ${
                        active && 'bg-yellow-100'
                      }`}
                      onClick={onClickDisconnect}
                    >
                      Disconnect
                    </MenuLink>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* <div className="rounded-3xl bg-yellow-50 w-16 py-1 px-2 flex space-x-2.5 justify-end absolute">
            <BellIcon className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
          </div> */}
        </div>
      </div>
    );
  }
  return (
    <span
      className="font-base flex-horizontal cursor-pointer rounded-full bg-[#121212] py-[10px] px-[24px] font-semibold text-[#fff] hover:text-[#fff]"
      onClick={handleConnectWallet}
    >
      Connect Wallet
    </span>
  );
};

export default WalletConnect;
