import React, { ReactElement, } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import Web3ModalProvider from '../components/web3modal';

import '../styles/globals.css';

export type PageLayout = ({ children }: { children: ReactElement }) => ReactElement;

type NextPageWithLayout = NextPage & {
  layout: PageLayout;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <Web3ModalProvider>
      <Component {...pageProps} />
    </Web3ModalProvider>
  );
}

export default MyApp;
