import "./ToDoCard.css";
import { useState } from "react";
import { Modal, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateToDoForm from "../createToDoForm/CreateToDoForm";
import { useContext } from "react";
import ToDoContext from "../../context/ToDoContext";
import ArchiveContext from "../../context/ArchiveContext";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PushPinIcon from '@mui/icons-material/PushPin';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

const ToDoCard = ({ id, title, description, date, pinnedItem, archiveItem, handleRemoveToDo }) => {
    const { toDoList, setToDoList } = useContext(ToDoContext);
    const { archiveList, setArchiveList } = useContext(ArchiveContext);
    const [pinned, setPinned] = useState(pinnedItem);
    const [archive, setArchive] = useState(archiveItem)
    const navigate = useNavigate();
    const handlePin = (toDo) => {
        let toDoToPin = updateToDoHandler(id);
        toDoToPin.id = id;
        toDoToPin.pin = !pinned;
        const filteredToDoList = toDoList.filter((toDo) => toDo.id !== id);

        setToDoList([toDoToPin, ...filteredToDoList]);
        setPinned(!pinned);

        if (!pinned) {
            alert('Note pinned');
        } else {

            alert('Note unpinned');
        }
        navigate("/")
    }
    const handleArchive = (toDo) => {
        let toDoToArchive = updateToDoHandler(id);
        toDoToArchive.id = id;
        toDoToArchive.archive = !archive;
        const filteredToDoList = toDoList.filter((toDo) => toDo.id !== id);
        setArchive(!archive);
        setArchiveList([toDoToArchive, ...archiveList]);
        setToDoList([...filteredToDoList])
        navigate("/");
        alert('Note archived')
    }

    const handleUnarchive = (toDo) => {
        let toDoToUnarchive = archiveList.filter(toDo => {
            return toDo.id === id;
        })[0];

        toDoToUnarchive.id = id;
        toDoToUnarchive.archive = !archive;
        const filteredToDoList = archiveList.filter((toDo) => toDo.id !== id);
        setArchive(!archive);
        setArchiveList([...filteredToDoList]);
        setToDoList([toDoToUnarchive, ...filteredToDoList])
        navigate("/");
        alert("Note unarchived")
    }

    const updateToDoHandler = (id) => {
        let toDoToUpdate = toDoList.filter(toDo => {
            return toDo.id === id;
        });

        if (toDoToUpdate.length === 0) {
            toDoToUpdate = archiveList.filter(toDo => {
                return toDo.id === id;
            });
        }

        return toDoToUpdate[0];
    }

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
        outline: "none",
        border: "none"
    };


    return (
        <>
            <div className="toDoCard">
                <div className="options">
                    {pinned && <PushPinIcon onClick={handlePin} color="primary" className="pinIcon" />}
                    {!archive ? <ArchiveIcon onClick={handleArchive} color="primary" className="archiveIcon" /> : <UnarchiveIcon onClick={handleUnarchive} color="primary" className="archiveIcon" />}
                    <EditIcon className="editOption" onClick={handleOpen} />
                    <DeleteIcon className="deleteOption" onClick={() => handleRemoveToDo(id)} />
                </div>

                <Link to={`/todo/${id}`} className="toDoLink">
                    <div className="titleAndDate">
                        <h2 className="title">{title}</h2>
                        <p className="date">{new Date(date).toDateString()}</p>
                    </div>
                </Link>
            </div>

            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                keepMounted
                margin="10px"
                onSubmit={handleClose}
                className="editNoteModal"
            >
                <Box sx={{ ...style }} className="editNoteModalBox">
                    <ArrowBackIcon className="formGoBackIcon" onClick={handleClose} />
                    <CreateToDoForm
                        {...updateToDoHandler(id)}
                        toDoToEdit={updateToDoHandler(id)}
                        edit
                        archived={archive}
                    />
                </Box>
            </Modal>
        </>
    )
}

export default ToDoCard;