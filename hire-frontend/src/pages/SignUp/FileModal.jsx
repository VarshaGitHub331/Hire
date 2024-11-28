import Modal from "react-modal";
import styles from "./FileModal.module.css";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFile } from "../../redux/signUpDataSlice";
import { openFileModal } from "../../redux/modalSlice";
import { closeFileModal } from "../../redux/modalSlice";
import { setResumeUrl } from "../../redux/signUpDataSlice";
export default function FileModal() {
  const { userState } = useAuthContext();
  const { user_id, token } = userState;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedFile = useSelector((store) => {
    console.log(store);
    return store.signUpDetails.selectedFile;
  });
  const fileModal = useSelector((store) => store.modal.fileModal);
  function handleFileChange(e) {
    dispatch(setSelectedFile(e.target.files[0]));
  }
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("resume", selectedFile);
    formData.append("user_id", user_id);
    console.log(selectedFile);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/freelancer/uploadResume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      dispatch(setResumeUrl(response.data.resumeUrl));
      dispatch(closeFileModal(false));
      dispatch(setSelectedFile(null));
      toast.success("Your Resume has been uploaded!", {
        duration: 3000,
      });
    } catch (e) {
      alert(e);
    }
  };
  return (
    <Modal
      isOpen={fileModal}
      onRequestClose={(e) => {
        dispatch(closeFileModal());
      }}
      contentLabel="Upload Resume"
      className={styles.box}
    >
      <h3>Add Your Resume</h3>
      <button
        onClick={(e) => {
          dispatch(closeFileModal());
        }}
        className={styles.closeButton}
      >
        &times;
      </button>
      <div className={styles.uploadBox}>
        {!selectedFile && (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "1px" }}
          >
            <span>Choose your file to</span>
            <label htmlFor="file-upload" className={styles.link}>
              upload
            </label>
            <input
              id="file-upload"
              type="file"
              className={styles.hiddenInput}
              onChange={handleFileChange}
            />
          </div>
        )}
        {selectedFile && (
          <div
            style={{
              width: "100%",
              marginLeft: "25%",
              textAlign: "left",
              color: "hsl(120, 100%, 25%)",
            }}
          >
            {" "}
            {selectedFile.name}
          </div>
        )}
      </div>

      <button
        className={styles.continue}
        disabled={!selectedFile}
        onClick={(e) => {
          handleFileUpload(e);
        }}
      >
        {selectedFile === false ? "Continue" : "Upload"}
      </button>
    </Modal>
  );
}
