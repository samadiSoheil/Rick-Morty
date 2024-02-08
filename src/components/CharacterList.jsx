import { EyeIcon } from "@heroicons/react/24/outline";

export default function CharacterList({ allCharacters }) {
  return (
    <div className="character-list">
      {allCharacters.map((character) => {
        return <Character key={character.id} character={character} />;
      })}
    </div>
  );
}

function Character({ character }) {
  return (
    <div key={character.id} className="list__item">
      <img src={character.image} alt={character.name} />
      <h3 className="name">
        <span>{character.gender === "Male" ? "🧑" : "👩"}</span>
        <span>{character.name}</span>
      </h3>
      <div className="list-item__info info">
        <span className={`status ${character.status === "Dead" ? "red" : ""}`}></span>
        <span> {character.status}</span>
        <span> - {character.species}</span>
      </div>
      <button className="icon red">
        <EyeIcon />
      </button>
    </div>
  );
}
