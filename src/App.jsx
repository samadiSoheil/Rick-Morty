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

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        setAllCharacters(data.results.splice(0));
      } catch (err) {
        setAllCharacters([]);
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query]);

  return (
    <div className="app">
      <Toaster />
      <Navbar allCharactersLength={allCharacters.length}>
        <Search query={query} setQuery={setQuery} />
      </Navbar>
      <div className="main">
        <CharacterList allCharacters={allCharacters} isLoading={isLoading} />
        <CharacterDetail />
      </div>
    </div>
  );
}
export default App;
