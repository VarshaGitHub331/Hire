import Modal from "react-modal";
import styles from "./ProfileModal.module.css";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ProfileModal({
  toggleProfileModal,
  profile,
  setProfile,
  profileModal,
  setProfileModal,
}) {
  const { userState } = useAuthContext();
  const { user_id, token } = userState;

  return (
    <Modal
      isOpen={profileModal}
      onRequestClose={toggleProfileModal}
      contentLabel="Upload Resume"
      className={styles.box}
    >
      <h3>Enter A Brief Description Of Yourself</h3>
      <button onClick={toggleProfileModal} className={styles.closeButton}>
        &times;
      </button>
      <div className={styles.uploadBox}>
        <textarea
          value={profile}
          style={{
            width: "90%",
            height: "90%",
            backgroundColor: "inherit",
            outline: "none",
            border: "none",
            margin: "0.5rem",
          }}
          onChange={(e) => {
            setProfile(e.target.value);
          }}
        ></textarea>
      </div>

      <button
        className={styles.continue}
        disabled={!profile}
        onClick={(e) => {
          setProfileModal(false);
        }}
      >
        Continue
      </button>
    </Modal>
  );
}
