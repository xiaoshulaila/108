import { useCallback } from 'react';
import { useAccount, useContractWrite, usePublicClient } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_CONFIG } from '../config/contract';
import { useReferral } from './useReferral';
import { useNetworkStatus } from './useNetworkStatus';

export function useInvest() {
  const { address } = useAccount();
  const { isCorrectNetwork } = useNetworkStatus();
  const { referrer } = useReferral();
  const publicClient = usePublicClient();
  
  const { 
    writeAsync: writeContract,
    isPending: isLoading,
    isSuccess,
    error
  } = useContractWrite({
    ...CONTRACT_CONFIG,
    functionName: 'invest',
  });

  const invest = useCallback(async () => {
    if (!address) throw new Error('Please connect wallet first');
    if (!isCorrectNetwork) throw new Error('Please switch to the correct network');
    if (!publicClient) throw new Error('Public client not available');

    try {
      // Simulate the transaction first to get gas estimate
      const gasEstimate = await publicClient.estimateContractGas({
        address: CONTRACT_CONFIG.address,
        abi: CONTRACT_CONFIG.abi,
        functionName: 'invest',
        args: [referrer],
        value: parseEther('1.08'),
        account: address,
      });

      // Add 10% to gas estimate
      const gasLimit = gasEstimate * 110n / 100n;

      // Execute the transaction
      const tx = await writeContract({
        args: [referrer],
        value: parseEther('1.08'),
        gas: gasLimit,
      });

      return tx;
    } catch (error) {
      console.error('Investment failed:', error);
      throw error;
    }
  }, [address, isCorrectNetwork, referrer, writeContract, publicClient]);

  return {
    invest,
    isLoading,
    isSuccess,
    error
  };
}