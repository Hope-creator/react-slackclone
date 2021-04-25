import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

interface SimpleModalProps {
    opener: React.ReactNode;
    children: React.ReactElement;
}


export const SimpleModal: React.FC<SimpleModalProps> = ({opener, children}) => {

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
        <div onClick={handleOpen}>
            {opener}
        </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {children}
      </Modal>
    </div>
  );
}