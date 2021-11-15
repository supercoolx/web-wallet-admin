import React from 'react';
import { VERSION } from '@/environments/version';

function Version() {
  const semanticVersion = VERSION.semver.version || '0.0.0';
  return (
    <div className="w-full p-1 text-center">
      <span className="text-sm link-white">
        Equs Web Wallet: v{semanticVersion}
      </span>
    </div>
  );
}

export default Version;
