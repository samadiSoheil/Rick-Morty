import "./App.css";
import Navbar, { Search } from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [id, setId] = useState(undefined);
  const [favorite, setFevorite] = useState([]);

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
        toast.error(err.response.data.error);
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

  return (
    <div className="app">
      <Toaster />
      <Navbar favorite={favorite} allCharactersLength={allCharacters.length}>
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
