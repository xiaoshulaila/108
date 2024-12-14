import { type Address, parseEther } from 'viem';

interface GasSettingsParams {
  from: Address;
  to: Address;
  value: bigint;
}

export async function adjustGasSettings({ from, to, value }: GasSettingsParams) {
  if (!window.ethereum) {
    throw new Error('No Ethereum provider found');
  }

  // Get current gas price
  const gasPriceHex = await window.ethereum.request({
    method: 'eth_gasPrice'
  });

  // Convert hex gas price to number and add 10%
  const currentGasPrice = parseInt(gasPriceHex, 16);
  const adjustedGasPrice = BigInt(Math.floor(currentGasPrice * 1.1));

  // Estimate gas
  const gasEstimateHex = await window.ethereum.request({
    method: 'eth_estimateGas',
    params: [{
      from,
      to,
      value: value.toString(16)
    }]
  });

  // Add 10% to gas limit
  const gasLimit = BigInt(Math.floor(parseInt(gasEstimateHex, 16) * 1.1));

  return {
    gasLimit,
    gasPrice: adjustedGasPrice
  };
}