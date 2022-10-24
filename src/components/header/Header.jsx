import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal, Box } from "@mui/material";
import CreateToDoForm from "../createToDoForm/CreateToDoForm";
import MenuBar from '../menuBar/MenuBar';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Header = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        marginTop: "40px",
        border: "none",
        outline: "none"
    };
    return (
        <>
            <div className="header">
                <Link to="/" className="logoLink">
                    <h1>D Inits</h1>
                </Link>

                <MenuBar />
            </div>

            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                keepMounted
                margin="10px"
                onSubmit={handleClose}
                className="createModal"
            >
                <Box sx={{ ...style }} className="createModalBox">
                    <ArrowBackIcon className="formGoBackIcon" onClick={handleClose} />
                    <CreateToDoForm />
                </Box>
            </Modal>
            <button onClick={handleOpen} className="add">
                <BorderColorIcon className="addBtn" />
            </button>
        </>
    )
}

export default Header;