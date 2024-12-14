import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import PoolInfo from '../components/home/PoolInfo';
import PoolStats from '../components/home/PoolStats';
import ReferralLink from '../components/ReferralLink';

const Home: React.FC = () => {
  const { t } = useLanguage();

  const stats = {
    totalUsers: '1,234',
    exitNumber: '561',
    weeklyReferrals: '21',
    totalReferrals: '789'
  };

  return (
    <Layout>
      <div className="flex-1 p-4 max-w-screen-xl mx-auto w-full pb-20">
        <div className="space-y-6">
          <Carousel />
          
          <div className="grid gap-6 md:grid-cols-2">
            <PoolInfo poolAmount="100" />
            
            <div className="space-y-6">
              <PoolStats {...stats} />
              
              <div className="bg-[#2B3139] rounded-lg p-6">
                <ReferralLink />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;