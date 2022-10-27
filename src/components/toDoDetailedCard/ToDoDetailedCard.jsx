import "./ToDoDetailedCard.css";
import { useState } from "react";
import { Modal, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateToDoForm from "../createToDoForm/CreateToDoForm";
import { useContext } from "react";
import ToDoContext from "../../context/ToDoContext"
import ArchiveContext from "../../context/ArchiveContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import NotFound from "../notFound/NotFound";
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

const ToDoDetailedCard = () => {
    const { toDoList, setToDoList } = useContext(ToDoContext);
    const { archiveList, setArchiveList } = useContext(ArchiveContext);
    console.log(archiveList)
    const { id } = useParams();
    console.log(id)
    const detailedToDo = (id) => {
        let filteredList = toDoList.filter(t => t.id === id);
        if (filteredList.length === 0) {
            filteredList = archiveList.filter(t => t.id === id)
            console.log('working')
        }
        console.log(filteredList)
        return filteredList[0];
    }

    console.log(detailedToDo(id))

    const navigate = useNavigate();
    const [pinned, setPinned] = useState(detailedToDo(id).pin);
    const [archive, setArchive] = useState(detailedToDo(id).archive);
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

    const handleRemoveToDo = (id) => {
        let filteredList = toDoList.filter(toDo => toDo.id === id);
        if (filteredList.length === 0) {

            setArchiveList(archiveList.filter(toDo => toDo.id !== id))
        } else {
            setToDoList(toDoList.filter(toDo => toDo.id !== id));
        }
        navigate("/");
    }

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
        // navigate('/');
    }
    const handleArchive = (toDo) => {
        let toDoToArchive = updateToDoHandler(id);
        toDoToArchive.id = id;
        toDoToArchive.archive = !archive;
        const filteredToDoList = toDoList.filter((toDo) => toDo.id !== id);
        setArchive(!archive);
        setArchiveList([toDoToArchive, ...archiveList]);
        setToDoList([...filteredToDoList])
        alert("Note archived")
        navigate("/");
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
        setToDoList([toDoToUnarchive, ...toDoList])
        alert('Note Unarchived')
        navigate("/");
    }
    return (
        <>
            {detailedToDo(id) !== undefined ? <div className="toDoDetailedCardContiainer">
                <div className="goBackIconContainer" >
                    <Link to="/">
                        <ArrowBackIcon className="goBackIcon" />
                    </Link>
                </div>
                <div className="toDoDetailedCard">
                    <div className="options">
                        {!archive ? (pinned ? <PushPinIcon onClick={handlePin} color="primary" className="pinIcon" /> : <PushPinOutlinedIcon onClick={handlePin} color="primary" className="pinIcon" />) :
                            null}
                        {!archive ? <ArchiveIcon onClick={handleArchive} color="primary" className="archiveIcon" /> : <UnarchiveIcon onClick={handleUnarchive} color="primary" className="archiveIcon" />}
                        <EditIcon className="editOption" onClick={handleOpen} />
                        <DeleteIcon className="deleteOption" onClick={() => handleRemoveToDo(id)} />
                    </div>
                    <div className="titleAndDate">
                        <h2 className="title">{detailedToDo(id).title}</h2>
                        <p className="description">{detailedToDo(id).description}</p>
                        <p className="date">{new Date(detailedToDo(id).date).toDateString()}</p>
                    </div>
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
                        <CreateToDoForm {...updateToDoHandler(id)} toDoToEdit={updateToDoHandler(id)} edit />
                    </Box>
                </Modal>
            </div> : <NotFound />}
        </>
    )
}

export default ToDoDetailedCard;
