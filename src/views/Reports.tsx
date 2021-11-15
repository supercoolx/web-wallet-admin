import { observer } from 'mobx-react-lite';
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

function Reports() {
  return (
    <MainLayout>
      <div className="container p-6 mx-auto space-y-2">reports</div>
    </MainLayout>
  );
}

export default observer(Reports);
