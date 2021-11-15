import React, { useState } from 'react';
import { Button, TextField, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode.react';
import { CloseContext } from '@/components/SideModal';
import copyToClipboard from '@/helpers/clipboard';

export default function ReceiveCrypto() {
  const { t } = useTranslation();
  const [isTooltipOpen, setIsToolTipOpen] = useState(false);
  const walletAddress = 'TODO: 0x02348213sd1'; // TODO: replace with actual wallet address

  const handleCopy = () => {
    copyToClipboard(walletAddress);
    setIsToolTipOpen(true);
    setTimeout(() => {
      setIsToolTipOpen(false);
    }, 1500);
  };

  return (
    <CloseContext.Consumer>
      {onClose => (
        <div
          className="flex flex-col items-center space-y-8"
          style={{ minHeight: '80vh' }}
        >
          <h1 className="mt-8 text-xl font-semibold">
            {t('receive-crypto.receive-heading')}
          </h1>
          <hr className="w-full my-8 border-0 border-b border-gray-300" />

          <QRCode value={walletAddress} />

          <div className="flex space-x-8">
            <TextField
              id="walletAddress"
              size="small"
              label={t('common.wallet-address')}
              value={walletAddress}
              inputProps={{ readOnly: true }}
              variant="outlined"
            />

            <Tooltip
              open={isTooltipOpen}
              disableFocusListener
              disableTouchListener
              disableHoverListener
              title={t('common.copied-to-clipboard') as string}
            >
              <Button color="primary" variant="contained" onClick={handleCopy}>
                {t('common.copy')}
              </Button>
            </Tooltip>
          </div>

          <Button variant="outlined" onClick={onClose}>
            {t('common.close')}
          </Button>
        </div>
      )}
    </CloseContext.Consumer>
  );
}
