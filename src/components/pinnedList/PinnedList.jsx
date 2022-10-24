import "./PinnedList.css"
import { useContext } from "react";
import _ from 'lodash';
import ToDoContext from "../../context/ToDoContext";
import ToDoCard from "../toDoCard/ToDoCard";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PinnedList = () => {
    const { toDoList, setToDoList } = useContext(ToDoContext);
    let pinnedList = toDoList.filter(toDo => {
        return toDo.pin === true;
    })

    const handleRemoveToDo = (id) => {
        setToDoList(toDoList.filter((toDo) => toDo.id !== id));
    }

    return (
        <>
            <div className="pinnedList">
                <Link to="/">
                    <ArrowBackIcon className="goBackIcon" />
                </Link>
                {!_.isEmpty(pinnedList) && <div className="pinnedListTitle"><h2>Pinned Notes</h2></div>}
                {!_.isEmpty(pinnedList) ? pinnedList.map((toDo) => (
                    <ToDoCard key={toDo.id} {...toDo} pinnedItem={toDo.pin} handleRemoveToDo={handleRemoveToDo} />
                )) : null}
                {!_.isEmpty(pinnedList) && <hr />}
                {_.isEmpty(pinnedList) && <h2 style={{ color: "white" }}>No Pinned Notes</h2>}
            </div>

            <div className="pinnedList">
                {_.isEmpty(pinnedList) && <Link to="/" style={{ textDecoration: "none", backgroundColor: "rgb(23, 202, 113)", padding: "10px", borderRadius: "10px", color: "white" }}>go to homepage</Link>}
            </div>
        </>
    )
}


export default PinnedList