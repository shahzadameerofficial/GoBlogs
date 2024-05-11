/* eslint-disable react/prop-types */
import {ModalDialog, Button, DialogTitle, Divider, Modal, DialogActions, DialogContent } from '@mui/joy';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConfirmDialog } from '../../store/slices/appSlice';
useState
export default function ConfirmDialog({onClose, onConfirm}) {
  const { confirmDialog } = useSelector((state)=> state.app);
  const dispatch = useDispatch()

  const handleClick = (action) => {
    if(action === 'dismiss'){

        onClose?.({visible: false})
    }else{
        onConfirm?.()
    }
    dispatch(setConfirmDialog({visible: false}))
  }

  return (
    <>
      <Modal open={confirmDialog.visible} onClose={() => handleClick('dismiss')}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            {confirmDialog.message}
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={()=> handleClick('confirm')}>
              Confirm
            </Button>
            <Button variant="plain" color="neutral" onClick={()=> handleClick('dismiss')}>
              Discard
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
}