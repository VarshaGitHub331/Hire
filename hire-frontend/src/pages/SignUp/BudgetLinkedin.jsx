import Modal from "react-modal";
import styles from "./BudgetLinkedin.module.css";

export default function BudgetLinkedinModal({
  budgetLinkedin,
  setBudgetLinkedin,
  toggleBudgetLinkedin,
}) {
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
        <input type="number" id="budget"></input>
      </div>
      <div className={styles.linkedin}>
        <label for="linkedin">Enter Your Linkedin Url</label>
        <input type="text" id="linkedin"></input>
      </div>
      <div style={{ marginTop: "10vh" }}>
        <button className={styles.continue}>Proceed</button>

        <button className={styles.skip}>Skip</button>
      </div>
    </Modal>
  );
}
