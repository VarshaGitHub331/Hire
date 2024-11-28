import Modal from "react-modal";
import styles from "./ProfileModal.module.css";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { openProfileModal } from "../../redux/modalSlice";
import { closeProfileModal } from "../../redux/modalSlice";
import { setProfile } from "../../redux/signUpDataSlice";
export default function ProfileModal() {
  const { userState } = useAuthContext();
  const { user_id, token } = userState;
  const dispatch = useDispatch();
  const profileModal = useSelector((store) => store.modal.profileModal);
  const profile = useSelector((store) => store.signUpDetails.profile);

  return (
    <Modal
      isOpen={profileModal}
      onRequestClose={(e) => {
        dispatch(closeProfileModal());
      }}
      contentLabel="Upload Resume"
      className={styles.box}
    >
      <h3>Enter A Brief Description Of Yourself</h3>
      <button
        onClick={(e) => {
          dispatch(closeProfileModal());
        }}
        className={styles.closeButton}
      >
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
            dispatch(setProfile(e.target.value));
          }}
        ></textarea>
      </div>

      <button
        className={styles.continue}
        disabled={!profile}
        onClick={(e) => {
          dispatch(closeProfileModal(false));
        }}
      >
        Continue
      </button>
    </Modal>
  );
}
