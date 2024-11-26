import Modal from "react-modal";
import styles from "./BudgetLinkedin.module.css";
import { useState } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useAuthContext } from "../../contexts/AuthContext";
export default function BudgetLinkedinModal({
  budgetLinkedin,
  setBudgetLinkedin,
  toggleBudgetLinkedin,
}) {
  const server = process.env.REACT_APP_SERVER_URL;
  const { userState } = useAuthContext();
  const { user_id, token } = userState;
  const [budget, setBudget] = useState();
  const [linkUrl, setLinkUrl] = useState("");
  const AlterProfile = useMutation({
    mutationFn: () => {
      axios.post(
        `${server}/freelancer/updateProfile`,
        { cost: budget, linkedin: linkUrl, user_id: user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Your Profile Has Been Updated");
    },
    onError: () => {
      toast.error("Some Error in Updating Profile");
    },
  });
  return (
    <Modal
      onRequestClose={toggleBudgetLinkedin}
      isOpen={budgetLinkedin}
      className={styles.box}
    >
      <button onClick={toggleBudgetLinkedin} className={styles.closeButton}>
        &times;
      </button>
      <div className={styles.budget}>
        <label for="budget">Enter Your Preferred Budget</label>
        <input
          type="number"
          id="budget"
          onChange={(e) => setBudget(e.target.value)}
        ></input>
      </div>
      <div className={styles.linkedin}>
        <label for="linkedin">Enter Your Linkedin Url</label>
        <input
          type="text"
          id="linkedin"
          onChange={(e) => setLinkUrl(e.target.value)}
        ></input>
      </div>
      <div style={{ marginTop: "10vh" }}>
        <button
          className={styles.continue}
          onClick={(e) => {
            AlterProfile.mutate();
          }}
        >
          Proceed
        </button>

        <button className={styles.skip}>Skip</button>
      </div>
    </Modal>
  );
}
