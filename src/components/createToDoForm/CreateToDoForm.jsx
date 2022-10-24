import "./CreateToDoForm.css";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import ToDoContext from "../../context/ToDoContext";
import ArchiveContext from "../../context/ArchiveContext";

// importing v4 as uuid
import { v4 as uuidv4 } from 'uuid';
const CreateToDoForm = (props) => {
    const [toDo, setToDo] = useState({
        title: props.title ? props.title : '',
        description: props.description ? props.description : ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const { title, description, date } = toDo;
    const { toDoList, setToDoList } = useContext(ToDoContext);
    const { archiveList, setArchiveList } = useContext(ArchiveContext);
    const navigate = useNavigate();

    function handleCreateAndUpdateToDo(toDo) {
        if (!props.edit) {
            setToDoList([toDo, ...toDoList]);
            alert('Note created');
            navigate("/");
        } else if (props.edit && props.archived) {
            const filteredToDoList = archiveList.filter((toDo) => toDo.id !== props.id);

            setArchiveList([toDo, ...filteredToDoList]);
            // localStorage.setItem("archiveList", JSON.stringify());
            alert('Note updated');

            // window.location.reload();
        }
        else {
            const filteredToDoList = toDoList.filter((toDo) => toDo.id !== props.id);
            setToDoList([toDo, ...filteredToDoList]);
            alert('Note updated');
            navigate("/");
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const values = [title, description, date];
        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== '';
        });

        let errorMsg = '';
        if (allFieldsFilled) {
            const toDo = {
                id: props.id || uuidv4(),
                title,
                description,
                pin: props.pin || false,
                archive: props.archive || false,
                date: new Date()
            };
            handleCreateAndUpdateToDo(toDo);
        } else {
            errorMsg = 'Please fill out all the fields.';
        }
        setErrorMsg(errorMsg);

        setToDo({
            title: '', description: ''
        })

    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setToDo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
            <div className="createToDo">
                <h2>{props.edit ? `Edit ${title}` : "Create A Note"}</h2>
                <hr />
                <form className="toDoForm" onSubmit={handleSubmit}>
                    <div className="formControl">
                        {errorMsg}
                        <TextField
                            name="title"
                            value={title}
                            id="outlined-basic"
                            label="Task Title"
                            placeholder="Enter Task Title"
                            variant="standard"
                            margin="dense"
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="description"
                            value={description}
                            multiline id="outlined-basic"
                            label="Description"
                            placeholder="Description"
                            variant="standard"
                            margin="dense"
                            onChange={handleInputChange}
                        />
                        <button type="submit" className="createBtn">{props.edit ? "update" : "create"}</button>
                    </div>
                </form>
            </div>


        </>
    );
}

export default CreateToDoForm;