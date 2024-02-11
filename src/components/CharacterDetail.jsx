import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { character, episodes } from "../../data/data";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CharacterDetail({ characterId, onAddFavorite, isFave }) {
  // fetch Single Character
  const [singleCharacter, setSingleCharacter] = useState(null);
  const [allEpisode, setAllEpisode] = useState(null);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${characterId}`
        );
        // console.log(data);
        setSingleCharacter(data);

        // fetch episodes
        const episodesArr = data.episode.map((e) => {
          return e.split("/").at(-1);
        });
        // console.log(episodesArr);
        const { data: episode } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesArr}`
        );
        // console.log(episode);
        episode ? setAllEpisode([episode].flat().splice(0)) : null;
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
    characterId ? fetchCharacter() : null;
  }, [characterId]);

  if (!singleCharacter)
    return (
      <p
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        className="character-detail name"
      >
        Select a character to see their details
      </p>
    );
  if (!singleCharacter) return null;

  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img
          src={singleCharacter.image}
          alt={singleCharacter.name}
          className="character-detail__img"
        />
        <div className="character-detail__info">
          <h3 className="name">
            <span>{singleCharacter.gender == "Male" ? "🧑" : "👩"}</span>
            <span>{singleCharacter.name}</span>
          </h3>
          <div className="info">
            <span
              className={`status ${singleCharacter.status === "Dead" ? "red" : ""}`}
            ></span>
            <span> {singleCharacter.status}</span>
            <span> - {singleCharacter.species}</span>
          </div>
          <div className="location">
            <p>Last known location</p>
            <p>{singleCharacter.location.name}</p>
          </div>
          <div className="actions">
            {isFave ? (
              <p className="btn">it's in fave ❤</p>
            ) : (
              <button
                className="btn btn--primary"
                onClick={() => onAddFavorite(singleCharacter)}
              >
                Add to favorite
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="title">
          <h2>List of Episodes</h2>
          <ArrowUpCircleIcon className="icon" />
        </div>
        <ul>
          {!allEpisode
            ? null
            : allEpisode.map((e, index) => {
                return (
                  <li key={e.id}>
                    <div>
                      {String(index + 1).padStart(2, "0") + ` -`} {e.episode} :{" "}
                      <strong>{e.name}</strong>
                    </div>
                    <div className="badge badge--secondary">{e.air_date}</div>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
}
