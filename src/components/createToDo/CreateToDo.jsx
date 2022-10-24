import React from "react";
import "./AddBook.css";
import CreateToDoForm from '../createToDoForm/CreateToDoForm';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import ToDoContext from "../../context/ToDoContext"

const CreateToDo = () => {
    const { toDoList, setToDoList } = useContext(ToDoContext);
    const navigate = useNavigate();
    function handleCreateToDo(toDo) {
        setToDoList([toDo, ...toDoList]);
        navigate("/");
    };
    const myfunc = (toDo) => {
        console.log(toDo)
    }
    return (
        <React.Fragment>
            <div className="div">
                <CreateToDoForm {...props} handleSubmit={handleSubmit} />
            </div>
        </React.Fragment>
    );
};

export default AddBook;
