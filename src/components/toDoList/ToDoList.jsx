import "./ToDoList.css";
import { useContext, useState } from "react";
import { Modal, Box } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import _ from 'lodash';
import ToDoContext from "../../context/ToDoContext";
import ToDoCard from "../toDoCard/ToDoCard";


const ToDoList = () => {
    const { toDoList, setToDoList } = useContext(ToDoContext);
    let pinnedList = toDoList.filter(toDo => {
        return toDo.pin === true;
    })


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
        marginTop: "40px"
    };

    // useEffect(() => {
    //     setToDoList(() => JSON.parse(localStorage.getItem('toDoList')));
    //     console.log("to do list rendered")
    // }, [toDoList !== JSON.parse(localStorage.getItem('toDoList'))])
    console.log(toDoList === JSON.parse(localStorage.getItem('toDoList')))
    console.log(JSON.parse(localStorage.getItem('toDoList')))
    console.log(toDoList)
    const handleRemoveToDo = (id) => {
        setToDoList(toDoList.filter((toDo) => toDo.id !== id));
        alert("Note Deleted");
    }
    const clearAllHandler = () => {
        setToDoList([]);
        handleClose();
    }

    return (
        <>
            <div className="pinnedList">
                {!_.isEmpty(pinnedList) && <div className="toDoListTitle">
                    <h2>Pinned Notes ({pinnedList.length})</h2>
                </div>}

                {!_.isEmpty(pinnedList) ? pinnedList.map((toDo) => (
                    <ToDoCard key={toDo.id} {...toDo} pinnedItem={toDo.pin} handleRemoveToDo={handleRemoveToDo} />
                )) : null}
                {!_.isEmpty(pinnedList) && <hr />}
            </div>


            <div className="toDoList">
                {!_.isEmpty(toDoList) && <div className="toDoListTitle">
                    <h2>All Notes ({toDoList.length})</h2>
                    <button onClick={handleOpen} className="clearAllBtn">Clear All</button>
                </div>}
                {!_.isEmpty(toDoList) ? (
                    toDoList.map((toDo) => (
                        <ToDoCard key={toDo.id} {...toDo} archiveItem={toDo.archive} handleRemoveToDo={handleRemoveToDo} />
                    ))
                ) : (
                    <p className="message">No Notes Available. Please Add Some Notes.</p>
                )}
            </div>


            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                keepMounted
                margin="10px"
                onSubmit={handleClose}
                className="clearAllModal"
            >
                <Box sx={{ ...style }} className="clearAllModalBox">
                    <ArrowBackIcon className="formGoBackIcon" onClick={handleClose} />
                    <h2 className="clearAllWarningTitle">Are you sure you want to clear all notes?</h2>
                    <div className="clearAllOptionsBtnContainer">
                        <button className="clearYes" onClick={clearAllHandler}>Yes</button>
                        <button className="clearNo" onClick={handleClose}>No</button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default ToDoList