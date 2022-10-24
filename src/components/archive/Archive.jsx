import "./Archive.css";
import ToDoCard from "../toDoCard/ToDoCard";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import ToDoContext from "../../context/ToDoContext";
import ArchiveContext from "../../context/ArchiveContext";
import _ from 'lodash';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Archive = () => {
    const { toDoList, setToDoList } = useContext(ToDoContext);
    const { archiveList, setArchiveList } = useContext(ArchiveContext);
    const navigate = useNavigate();
    const handleRemoveToDo = (id) => {
        let filteredList = toDoList.filter(toDo => toDo.id === id);
        if (filteredList.length === 0) {
            setArchiveList(archiveList.filter(toDo => toDo.id !== id))
        } else {
            setToDoList(toDoList.filter(toDo => toDo.id !== id));
        }
        navigate("/");
        alert('Archived note deleted');
        // setToDoList(archiveList.filter((toDo) => toDo.id !== id));
    }

    return (
        <>
            <div className="archive">

                <Link to="/">
                    <ArrowBackIcon className="goBackIcon" />
                </Link>

                <div className="archiveItemsContainer">
                    {!_.isEmpty(archiveList) && <div className="pinnedListTitle"><h2>Archived Notes ({archiveList.length})</h2></div>}
                    {!_.isEmpty(archiveList) ? archiveList.map((toDo) => (
                        <ToDoCard key={toDo.id} {...toDo} pinnedItem={toDo.pin} archiveItem={toDo.archive} handleRemoveToDo={handleRemoveToDo} />
                    )) : null}
                    {!_.isEmpty(archiveList) && <hr />}
                    {_.isEmpty(archiveList) && <h2 style={{ color: "white" }}>No Archived Notes</h2>}
                </div>

                <div style={{ marginTop: "20px" }}>
                    {_.isEmpty(archiveList) && <Link to="/" style={{ textDecoration: "none", backgroundColor: "rgb(23, 202, 113)", padding: "10px", borderRadius: "10px", color: "white" }}>go to homepage</Link>}
                </div>
            </div>
        </>
    )
}

export default Archive;