import { IChainData } from './interface';
import supportedChains from './chains';

export function getChainData(chainId: number): IChainData | null {
  const chainData = supportedChains.filter((chain: any) => chain.chain_id === chainId)[0];

  return chainData;
}
