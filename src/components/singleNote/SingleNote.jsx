import styles from "./singleNote.module.css";
import { useDispatch } from "react-redux";

export const SingleNote = ({ note, groupId }) => {
const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.actual_note}>{note.content}</div>
      <div className={styles.date_time_area}>
        <span>{note.date}</span>
        <span>●</span>
        <span>{note.time}</span>
      </div>
    </div>
  );
};
