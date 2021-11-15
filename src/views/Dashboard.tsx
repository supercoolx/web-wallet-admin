import { observer } from 'mobx-react-lite';
import React from 'react';
import SubNav from '@/components/SubNav';
import MainLayout from '@/components/layout/MainLayout';

function Dashboard() {
  return (
    <MainLayout>
      <div className="flex space-x-4">
        <SubNav />
      </div>
    </MainLayout>
  );
}

export default observer(Dashboard);
