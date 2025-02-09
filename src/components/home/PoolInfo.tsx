import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAccount } from 'wagmi';
import CountdownTimer from '../CountdownTimer';
import { useInvest } from '../../hooks/useInvest';
import { useFomoData } from '../../hooks/useFomoData';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

const PoolInfo: React.FC = () => {
  const { t } = useLanguage();
  const { address } = useAccount();
  const { isCorrectNetwork } = useNetworkStatus();
  const { fomoPool, fomoEndTime, isLoading: isLoadingData } = useFomoData();
  const { invest, isLoading: isInvesting, isSuccess } = useInvest();

  const handleInvest = async () => {
    if (!address || !isCorrectNetwork) return;
    
    try {
      await invest();
    } catch (error: any) {
      // Handle user rejection gracefully
      if (error?.code === 4001) {
        console.log('Transaction rejected by user');
        return;
      }
      console.error('Investment failed:', error);
    }
  };

  const isLoading = isLoadingData || isInvesting;

  return (
    <div className="bg-[#2B3139] rounded-2xl p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl text-binance-text mb-2">{t('poolAmount')}</h2>
        <p className="text-4xl font-bold text-binance-yellow">
          {isLoading ? '...' : `${fomoPool.toFixed(3)} BNB`}
        </p>
      </div>

      <div className="mb-6">
        <CountdownTimer timestamp={fomoEndTime} />
      </div>

      <div className="space-y-2">
        <button
          onClick={handleInvest}
          disabled={!address || !isCorrectNetwork || isLoading}
          className="w-full bg-binance-yellow text-black font-bold py-4 rounded-lg text-xl hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!address 
            ? t('connectWallet')
            : !isCorrectNetwork
              ? t('switchNetwork')
              : isLoading 
                ? t('processing')
                : t('joinNow')}
        </button>

        <p className="text-sm text-binance-yellow text-center">
          {t('fomoHint')}
        </p>
      </div>

      {isSuccess && (
        <p className="mt-4 text-center text-green-500">
          {t('investSuccess')}
        </p>
      )}
    </div>
  );
};

export default PoolInfo;