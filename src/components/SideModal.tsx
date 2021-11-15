import React, { useState, createContext, useEffect } from 'react';
import {
  makeStyles,
  Dialog,
  DialogProps,
  DialogContent,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import useBasePath from '@/hooks/basePath';

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} unmountOnExit />
);

export const CloseContext = createContext(() => {});

const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 400,
  },
  backDrop: {
    backdropFilter: 'blur(4px)',
  },
});

function SideModal({ children, open: initalState }: DialogProps) {
  const classes = useStyles();
  const history = useHistory();
  const basePath = useBasePath();
  const [open, setOpen] = useState(initalState);

  useEffect(() => {
    history.listen(() => setOpen(true));
  }, [history]);

  const handleClose = () => {
    setOpen(false);
    window.setTimeout(() => history.push(basePath), 300);
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      open={open}
      onClose={handleClose}
      scroll="paper"
      classes={{
        paper: classes.dialog,
      }}
      BackdropProps={{ classes: { root: classes.backDrop } }}
    >
      <CloseContext.Provider value={handleClose}>
        <DialogContent>{children}</DialogContent>
      </CloseContext.Provider>
    </Dialog>
  );
}

export default SideModal;
