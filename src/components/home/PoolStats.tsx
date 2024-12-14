import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUserStats } from '../../hooks/useUserStats';
import { useAccount } from 'wagmi';
import { useUserInfo } from '../../hooks/useUserInfo';

const PoolStats: React.FC = () => {
  const { t } = useLanguage();
  const { currentIndex, threeOutOneIndex, isLoading: isStatsLoading } = useUserStats();
  const { address } = useAccount();
  const { userInfo, isLoading: isUserLoading } = useUserInfo(address);

  // 计算下一个出局会员编号
  const nextExitNumber = threeOutOneIndex + 1;

  const stats = [
    { 
      label: t('totalUsers'), 
      value: isStatsLoading ? '...' : currentIndex.toString()
    },
    { 
      label: t('exitNumber'), 
      value: isStatsLoading ? '...' : threeOutOneIndex.toString() 
    },
    { 
      label: t('nextExitMember'), 
      value: isStatsLoading ? '...' : nextExitNumber.toString(),
      highlight: true
    },
    { 
      label: t('userNumber'), 
      value: address ? (
        isUserLoading ? '...' : (
          userInfo.hasJoined ? 
            userInfo.userId.toString() : 
            t('notJoined')
        )
      ) : t('pleaseConnect'),
      highlight: userInfo.hasJoined
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-[#2B3139] rounded-lg p-4">
          <div className="text-binance-text">{stat.label}</div>
          <div className={`text-xl font-bold mt-1 ${stat.highlight ? 'text-binance-yellow' : ''}`}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PoolStats;