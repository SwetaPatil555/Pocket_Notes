import { useState } from "react";
import styles from "./createGroupPop.module.css";
import { createGroup } from "../../redux/noteSlice";
import { Modal } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

export const CreateGroupPop = ({ openModal, setOpenModal }) => {
  const colors = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];

  const dispatch = useDispatch();

  const [grpTitle, setGrpTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState("");

  const { groups } = useSelector((note) => note.note);

  const handleCreateGroup = (e) => {
    e.preventDefault();
    setError("");

    const trimmedTitle = grpTitle.trim();

    // Check empty or only spaces
    if (!trimmedTitle) {
      setError("Group name cannot be empty or just spaces!");
      return;
    }

    // Check max length
    if (trimmedTitle.length > 50) {
      setError("Group name must be less than 50 characters!");
      return;
    }

    // Check if color selected
    if (!selectedColor) {
      setError("Please select a color!");
      return;
    }

    // Check duplicate group name
    const grpNames = groups.map((grp) => grp.groupName.toLowerCase());
    if (grpNames.includes(trimmedTitle.toLowerCase())) {
      setError("This group already exists!");
      return;
    }

    // Dispatch create group
    dispatch(createGroup({ groupName: trimmedTitle, groupColor: selectedColor }));
    setOpenModal(false);
    setGrpTitle("");
    setSelectedColor("");
  };

  return (
    <Modal
      opened={openModal}
      onClose={() => setOpenModal(false)}
      closeOnClickOutside
      withCloseButton={false}
      centered
    >
      <p className={styles.createNewGroup}>Create New Group</p>
      <form className={styles.modal} onSubmit={handleCreateGroup}>
        <div className={styles.modal_input}>
          <label htmlFor="grpName">Group Name</label>
          <input
            type="text"
            id="grpName"
            placeholder="Enter Group Name"
            required
            name="grpName"
            autoComplete="off"
            autoFocus
            value={grpTitle}
            onChange={(e) => setGrpTitle(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div className={styles.modal_input}>
            <label htmlFor="color">Choose Color</label>
            <div className={styles.colors}>
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={styles.modal_input_color}
                  style={{
                    backgroundColor: color,
                    border: selectedColor === color ? "2px solid black" : "none",
                  }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </div>

        <div className={styles.modal_btn_div}>
          <button type="submit" className={styles.modalBtn}>
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};
