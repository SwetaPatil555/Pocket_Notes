import styles from "./sidebar.module.css";
import { changeCurrentActiveGroup } from "../../redux/noteSlice";
import { useState } from "react";
import { CreateGroupPop } from "../createGroupPop/CreateGroupPop";
import { useSelector, useDispatch } from "react-redux";

export const Sidebar = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { currentActiveGroup, groups } = useSelector((note) => note.note);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Pocket Notes</h1>
      </div>

      <div className={styles.group_container}>
        {groups?.map((group) => (
          <div
            key={group.id}
            className={styles.single_group}
            style={{
              background:
                currentActiveGroup === group.id && "rgba(241, 234, 234, 1)",
            }}
            onClick={() => {

              dispatch(changeCurrentActiveGroup(group.id));
            }}
          >
            <div
              className={styles.img_circle}
              style={{ backgroundColor: group.groupColor }}
            >
              <p>{group.groupShortName}</p>
            </div>

            <h4>{group.groupName}</h4>
          </div>
        ))}
      </div>

      <div onClick={() => setOpenModal(true)} className={styles.create_group}>
        +
      </div>
      <CreateGroupPop openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};
