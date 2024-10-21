import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import React, { useState } from "react";

const ConfirmModal = React.forwardRef(({ callback, title, approveButtonText, cancelButtonText }, ref) => {
    const [showModal, setShowModal] = useState(false);
    const [inputValue, setInputValue] = useState("");

    React.useImperativeHandle(ref, () => ({
        show: () => {
            setShowModal(true);
        }
    }));

    const handleConfirm = () => {
        setShowModal(true);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        if (inputValue) {
            callback(inputValue);
        }
        setShowModal(false);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <Dialog
            open={showModal}
            onClose={handleClose} >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <MDInput type="text" value={inputValue} onChange={handleInputChange} />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <MDButton variant="contained" color="white" onClick={handleClose}>{cancelButtonText}</MDButton>
                <MDButton variant="contained" color="white" onClick={handleSubmit}>{approveButtonText}</MDButton>
            </DialogActions>
        </Dialog>
    );
});

export default ConfirmModal;
