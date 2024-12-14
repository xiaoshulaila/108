import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useWallet } from '../../../hooks/useWallet';
import { useUserInfo } from '../../../hooks/useUserInfo';
import { useAccount } from 'wagmi';

export const ProfileActions: React.FC = () => {
  const { t } = useLanguage();
  const { disconnect } = useWallet();
  const { address } = useAccount();
  const { userInfo } = useUserInfo(address);

  const handleUpgradePartnership = () => {
    // TODO: Implement upgrade partnership logic
    console.log('Upgrading partnership...');
  };

  return (
    <div className="space-y-4">
      {userInfo.hasJoined && !userInfo.isPartner && (
        <button
          onClick={handleUpgradePartnership}
          className="w-full bg-binance-yellow text-black font-medium py-3 rounded-lg hover:bg-binance-yellow/90 transition-colors"
        >
          {t('upgradePartner')}
        </button>
      )}
      
      <button
        onClick={disconnect}
        className="w-full bg-binance-gray text-white font-medium py-3 rounded-lg hover:bg-opacity-80 transition-colors"
      >
        {t('logout')}
      </button>
    </div>
  );
};