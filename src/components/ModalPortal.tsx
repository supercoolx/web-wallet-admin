import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

export interface IModalPortalProps {
  children: React.ReactNode;
}

export default function ModalPortal({ children }: IModalPortalProps) {
  const modalRoot = document.getElementById('modal');
  const element = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    modalRoot?.appendChild(element);

    return () => {
      modalRoot?.removeChild(element);
    };
  });

  return createPortal(children, element);
}
