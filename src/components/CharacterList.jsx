import { EyeIcon } from "@heroicons/react/24/outline";

export default function CharacterList({ allCharacters, isLoading, onShowCharacter }) {
  if (isLoading)
    return (
      <div className="characters-list">
        <Loading />
      </div>
    );

  return (
    <div className="characters-list">
      {allCharacters.map((character) => {
        return (
          <Character key={character.id} character={character}>
            <ShowCharacter onShowCharacter={onShowCharacter} characterId={character.id} />
          </Character>
        );
      })}
    </div>
  );
}

export function Character({ character, children }) {
  if (!character || character.length == 0) return null;
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
      {children}
    </div>
  );
}

function Loading() {
  return <p className="name">Loading Data...</p>;
}

function ShowCharacter({ onShowCharacter, characterId }) {
  return (
    <button className="icon red" onClick={() => onShowCharacter(characterId)}>
      <EyeIcon />
    </button>
  );
}
