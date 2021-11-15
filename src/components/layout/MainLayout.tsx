import * as React from 'react';

const MainLayout: React.FC = ({ children }) => (
  <div className="container flex flex-col px-4 mx-auto mb-8 space-y-4">
    {children}
  </div>
);

export default MainLayout;
