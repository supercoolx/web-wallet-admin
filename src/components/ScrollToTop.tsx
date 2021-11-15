import React, { ReactNode, useEffect } from 'react';
import { withRouter, RouteChildrenProps } from 'react-router-dom';

interface IScrollToTopProps {
  history: RouteChildrenProps['history'];
  children?: ReactNode;
}

function ScrollToTop({ history, children }: IScrollToTopProps) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
    return () => {
      unlisten();
    };
  }, []);

  return <>{children}</>;
}

export default withRouter(ScrollToTop);
