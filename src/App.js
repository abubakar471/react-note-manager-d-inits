import './App.css';
import Header from "./components/header/Header";
import ToDoList from "./components/toDoList/ToDoList";
import CreateToDo from './components/createToDoForm/CreateToDoForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDoContext from './context/ToDoContext';
import ArchiveContext from "./context/ArchiveContext";
import useLocalStorage from './components/hooks/useLocalStorage';
import ToDoDetailedCard from "./components/toDoDetailedCard/ToDoDetailedCard";
import TimeBar from './components/timeBar/TimeBar';
import NotFound from './components/notFound/NotFound';
import PinnedList from "./components/pinnedList/PinnedList";
import Archive from "./components/archive/Archive";
import Footer from "./components/footer/Footer";

function App() {
  const [toDoList, setToDoList] = useLocalStorage('toDoList', []);
  const [archiveList, setArchiveList] = useLocalStorage('archiveList', []);

  return (
    <>
      <BrowserRouter>
        <ToDoContext.Provider value={{ toDoList, setToDoList }}>
          <ArchiveContext.Provider value={{ archiveList, setArchiveList }}>
            <Header />
            <TimeBar />

            <Routes>
              <Route exact path="/" element={<ToDoList />} />
              <Route exact path="/create" element={<CreateToDo />} />
              <Route exact path="/todo/:id" element={<ToDoDetailedCard />} />
              <Route exact path="/pinnedNotes" element={<PinnedList />} />
              <Route exact path="/archive" element={<Archive />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/todo/*" element={<NotFound />} />
            </Routes>

            <Footer />
          </ArchiveContext.Provider>
        </ToDoContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
