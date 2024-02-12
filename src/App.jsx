import "./App.css";
import Navbar, { Search } from "./components/Navbar";
import CharacterList, { Character } from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "./components/Modal";

function App() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [id, setId] = useState(undefined);
  const [favorite, setFevorite] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        setAllCharacters(data.results);
      } catch (err) {
        setAllCharacters([]);
        if (!err.response) {
          toast.error(err.message);
        } else {
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query]);

  const handleShowCharacter = (elemId) => {
    // console.log(elemId);
    setId(elemId);
  };
  // console.log(id);
  let isFave = false;
  const handleAddFavorite = (elem) => {
    console.log(elem);
    setFevorite((prevCharac) => [...prevCharac, elem]);
  };
  console.log(favorite);

  isFave = favorite.find((i) => i.id == id);

  const handleDeleteFaveCharac = (elemId) => {
    console.log(elemId);
    let filterdFaveCharac = favorite.filter((p) => p.id != elemId);
    console.log(filterdFaveCharac);

    setFevorite(filterdFaveCharac);
  };
  return (
    <div className="app">
      <Toaster />
      <Modal
        isOpenModal={isOpenModal}
        onCloseModal={setIsOpenModal}
        character={favorite}
        onDeletFaveCharac={handleDeleteFaveCharac}
      ></Modal>
      <Navbar
        favorite={favorite}
        allCharactersLength={allCharacters.length}
        onOpenModal={setIsOpenModal}
      >
        <Search query={query} setQuery={setQuery} />
      </Navbar>
      <div className="main">
        <CharacterList
          allCharacters={allCharacters}
          isLoading={isLoading}
          onShowCharacter={handleShowCharacter}
        />
        <CharacterDetail
          isFave={isFave}
          characterId={id}
          onAddFavorite={handleAddFavorite}
        />
      </div>
    </div>
  );
}
export default App;
