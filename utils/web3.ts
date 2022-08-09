/* eslint-disable @typescript-eslint/no-explicit-any */
import { constants, ethers, utils } from 'ethers';
import { getAddress } from 'ethers/lib/utils';

import Event from './event';

const networks: { [key: number]: string } = {
  1: 'Ethereum Mainnet',
  3: 'Ropsten Test Network',
  4: 'Rinkeby Test Network',
  5: 'Goerli Test Network',
  42: 'Kovan Test Network',
};

export interface Token {
  name: string;
  address: string;
  decimals: number;
  symbol: string;
  logoURI: string;
  balance?: ethers.BigNumber;
}

export const ETH_ADDR = constants.AddressZero;

const getNetworkName = (chainId: number) => {
  return networks[chainId] || `Network ${chainId}`;
};

function formatAddress(address: string) {
  if (!address) {
    return '';
  }
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

export const formatUSD = (value: number, maxFraction = 0) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFraction,
  });
  return formatter.format(value);
};

export const formatPercentage = (value: number, maxFraction = 2) => {
  const formatted = String(value * 100);
  if (maxFraction > 0) {
    const split = formatted.split('.');
    if (split.length > 1) {
      return `${split[0]}.${split[1].substr(0, maxFraction)}`;
    }
  }
  return formatted;
};

export const formatBalance = (value: ethers.BigNumberish, decimals = 18, maxFraction = 2) => {
  const formatted = ethers.utils.formatUnits(value, decimals);
  if (maxFraction > 0) {
    const split = formatted.split('.');
    if (split.length > 1) {
      return `${split[0]}.${split[1].substr(0, maxFraction)}`;
    }
  }
  return formatted;
};

export const parseBalance = (value: string, decimals = 18) => {
  return ethers.utils.parseUnits(value || '0', decimals);
};

export const isEmptyValue = (text: string) =>
  ethers.BigNumber.isBigNumber(text)
    ? ethers.BigNumber.from(text).isZero()
    : text === '' || text.replace(/0/g, '').replace(/\./, '') === '';

export const isETH = (token?: Token) =>
  token?.address.toLowerCase() === ethers.constants.AddressZero.toLowerCase();

export const pow10 = (exp: ethers.BigNumberish) => {
  return ethers.BigNumber.from(10).pow(exp);
};

export const formatDate = (date: Date) => {
  return `${date.toLocaleDateString('en-US')} ${date.toLocaleTimeString('en-US')}`;
};

export { getNetworkName, formatAddress };
