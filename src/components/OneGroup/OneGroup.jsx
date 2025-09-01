import styles from "./OneGroup.module.css";
import sendIcon from "../../assets/icons/send-icon.svg";
import sendColorIcon from "../../assets/icons/send-colorful-icon.svg";
import backIcon from "../../assets/icons/back-arrow.svg";

import { SingleNote } from "../singleNote/SingleNote";
import { useSelector, useDispatch } from "react-redux";
import { changeCurrentActiveGroup, createNote } from "../../redux/noteSlice";
import { useState } from "react";

export const OneGroup = () => {
  const { currentActiveGroup, groups } = useSelector((note) => note.note);
  const dispatch = useDispatch();

  const newGrp = groups.filter((grp) => grp.id === currentActiveGroup);
  const [content, setContent] = useState("");

  const handleCreateNote = (e) => {
    e.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) return;

    dispatch(createNote({ content: trimmedContent, groupId: newGrp[0].id }));
    setContent("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.groupName}>
        <div className={styles.groupContent}>
          <div
            className={styles.backArrow}
            onClick={() => dispatch(changeCurrentActiveGroup(null))}
          >
            <img src={backIcon} alt="Back" />
          </div>
          <div
            className={styles.img_circle}
            style={{ backgroundColor: newGrp[0].groupColor }}
          >
            <p>{newGrp[0].groupShortName}</p>
          </div>
          <h4>{newGrp[0].groupName}</h4>
        </div>
      </div>

      <div className={styles.allNotes}>
        {newGrp[0].notes?.length === 0 && <p>No Notes to display!</p>}

        {newGrp[0].notes?.map((note) => (
          <SingleNote key={note.id} note={note} groupId={newGrp[0].id} />
        ))}
      </div>

      <form className={styles.message_container} onSubmit={handleCreateNote}>
        <textarea
          className={styles.message}
          rows="6"
          placeholder="Enter your text here..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleCreateNote(e);
            }
          }}
        />
        {content.trim() ? (
          <img
            onClick={handleCreateNote}
            src={sendColorIcon}
            alt="Send"
            className={styles.sendIcon}
            title="Send"
          />
        ) : (
          <img src={sendIcon} alt="Send" className={styles.sendIcon} />
        )}
      </form>
    </div>
  );
};
