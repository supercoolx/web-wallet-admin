import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

function basePath() {
  const location = useLocation();

  return useMemo(() => location.pathname.replace(/\/m\/.*/, ''), [location]);
}

export default basePath;
