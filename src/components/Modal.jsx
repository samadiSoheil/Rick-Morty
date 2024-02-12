import { EyeIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import CharacterList, { Character } from "./CharacterList";

export default function Modal({
  character,
  isOpenModal,
  onCloseModal,
  onDeletFaveCharac,
}) {
  if (!isOpenModal) return null;
  return (
    <div>
      <div className="backdrop">
        <div className="modal">
          <div className="modal__header">
            <h3 className="title">Your favorite characters</h3>
            <button className="icon close" onClick={() => onCloseModal((is) => !is)}>
              <XCircleIcon />
            </button>
          </div>
          {!character.length ? (
            <p className="name">You Don't Like Any Character!</p>
          ) : (
            character.map((c) => {
              return (
                <Character key={c.id} character={c}>
                  <button className="icon red" onClick={() => onDeletFaveCharac(c.id)}>
                    <TrashIcon />
                  </button>
                </Character>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
