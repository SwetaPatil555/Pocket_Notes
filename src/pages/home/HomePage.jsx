import React, { useEffect, useState } from "react";
import styles from "./homePage.module.css";
import { NoteArea } from "../../components/NoteArea/NoteArea";
import { OneGroup } from "../../components/OneGroup/OneGroup";
import { Sidebar } from "../../components/sidebar/Sidebar";

import { useSelector } from "react-redux";

export default function HomePage() {
  const [windowWith, setWindowWith] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWindowWith(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { currentActiveGroup } = useSelector((note) => note.note);

  const isCurrGrpNull = currentActiveGroup === null;

  return (
    <div className={styles.container}>
      <div
        className={styles.left_container}
        style={{ display: isCurrGrpNull || (windowWith < 720 && "none") }}
      >
        <Sidebar />
      </div>


      {!currentActiveGroup ? (
        <div className={styles.right_container}>
          <NoteArea />
        </div>
        
      ) : (
        (currentActiveGroup || windowWith > 719) && (
          <div className={styles.right_container} style={{ display: "block" }}>
            <OneGroup />
          </div>
        )
      )}
    </div>
  );
}
