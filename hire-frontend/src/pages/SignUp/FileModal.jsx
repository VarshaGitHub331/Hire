import Modal from "react-modal";
import styles from "./FileModal.module.css";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function FileModal({
  toggleFileModal,
  selectedFile,
  setSelectedFile,
  fileModal,
  setFileModal,
  setResumeUrl,
}) {
  const { userState } = useAuthContext();
  const { user_id, token } = userState;
  const navigate = useNavigate();

  function handleFileChange(e) {
    setSelectedFile(e.target.files[0]);
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
      setResumeUrl(response.data.resumeUrl);
      setFileModal(false);
      setSelectedFile(null);
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
      onRequestClose={toggleFileModal}
      contentLabel="Upload Resume"
      className={styles.box}
    >
      <h3>Add Your Resume</h3>
      <button onClick={toggleFileModal} className={styles.closeButton}>
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
