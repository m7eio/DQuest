import { ethers } from 'ethers';

export const lookupAddress = async (address: string) => {
  const provider = ethers.getDefaultProvider(ethers.providers.getNetwork(1), {
    infura: 'efb69c15a51f45eeaf2add1d3339a1fd',
  });

  return provider.lookupAddress(address);
};

export const getResolver = async (ens: string) => {
  const provider = ethers.getDefaultProvider(ethers.providers.getNetwork(1), {
    infura: 'efb69c15a51f45eeaf2add1d3339a1fd',
  });
  const resolver = await provider.getResolver(ens);
  return resolver;
};
