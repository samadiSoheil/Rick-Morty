import "./App.css";
import Navbar from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        let res = await fetch("https://rickandmortyapi.com/api/character");
        if (!res.ok) throw new Error("it is not find Characters information!");
        let data = await res.json();
        setAllCharacters(data.results.splice(0, 5));
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Toaster />
      <Navbar />
      <div className="main">
        <CharacterList allCharacters={allCharacters} isLoading={isLoading} />
        <CharacterDetail />
      </div>
    </div>
  );
}
export default App;
