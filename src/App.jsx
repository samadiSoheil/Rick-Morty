import "./App.css";
import Navbar from "./components/Navbar";
import CharacterList from "./components/CharacterList";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharacterList />
      </div>
    </div>
  );
}
export default App;
