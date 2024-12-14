import { sepolia } from 'wagmi/chains';
import Dream108ABI from '../contracts/abi/Dream108.json';

export const CONTRACT_CONFIG = {
  address: '0xE577cf919959C2Ac8Aee371a891E15263D6E85DF' as `0x${string}`,
  abi: Dream108ABI,
  chainId: sepolia.id
} as const;