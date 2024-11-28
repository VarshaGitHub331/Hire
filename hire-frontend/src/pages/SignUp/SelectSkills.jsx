import { useQuery, useMutation } from "@tanstack/react-query";
import { getSkills } from "../../apis/Skills";
import { useState, useEffect, useCallback } from "react";
import styles from "./SelectSkills.module.css";
import Modal from "react-modal";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { openSkillModal } from "../../redux/modalSlice";
import { closeSkillModal } from "../../redux/modalSlice";
import { openBudgetLinkedin } from "../../redux/modalSlice";
import { setUserSkills } from "../../redux/signUpDataSlice";
export default function SkillModal() {
  const { data: skills, isLoading } = useQuery({
    queryFn: () => getSkills(userCategories),
    queryKey: ["skills"],
  });
  const server = process.env.REACT_APP_SERVER_URL;
  const [requestedSkills, setRequestedSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillNeeded, setSkillNeeded] = useState("");
  const { userState } = useAuthContext();
  const { user_id, token } = userState;
  const dispatch = useDispatch();
  const skillModal = useSelector((store) => store.modal.skillModal);

  const userCategories = useSelector(
    (store) => store.signUpDetails.userCategories
  );
  const userSkills = useSelector((store) => store.signUpDetails.userSkills);
  const budgetLinkedin = useSelector((store) => store.modal.budgetLinkedin);
  const handleSkillRequest = useCallback(() => {
    if (!skills || !skillNeeded) return [];
    const filteredSkills = skills.filter((skill) =>
      skill.skill_name.toLowerCase().includes(skillNeeded.toLowerCase())
    );
    setRequestedSkills(filteredSkills);
  }, [skillNeeded, skills]);

  useEffect(() => {
    handleSkillRequest();
  }, [skillNeeded, skills, handleSkillRequest]);
  const AddSkills = useMutation({
    mutationFn: (skills) => {
      axios.post(
        `${server}/freelancer/addSkills`,
        { skills: skills, user_id: user_id },
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
      dispatch(openBudgetLinkedin());
      dispatch(closeSkillModal());
    },
    onError: () => {
      toast.error("Some Error in Updating Profile");
    },
  });

  return (
    <Modal
      onRequestClose={(e) => {
        dispatch(closeSkillModal());
      }}
      isOpen={skillModal}
      className={styles.box}
    >
      <h3>Select Skills From Your Favourite Categories!!</h3>
      <div className={styles.search}>
        <div className={styles.searchInput}>
          <img
            src="/assets/sicon.png"
            alt="question"
            width="30px"
            height="30px"
          />
          <input
            type="text"
            placeholder="Find Your Skills"
            value={skillNeeded}
            onChange={(e) => setSkillNeeded(e.target.value)}
          />
        </div>
        <button>Search</button>
      </div>
      <div className={styles.skillBox}>
        {selectedSkills?.map((requested_skill) => (
          <div key={requested_skill.id} className={styles.skillContainer}>
            <button>{requested_skill.skill_name}</button>
            <div
              className={styles.closeIcon}
              onClick={() =>
                setSelectedSkills((prev) =>
                  prev.filter(
                    (skill) => skill.skill_id !== requested_skill.skill_id
                  )
                )
              }
            >
              &times;
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={(e) => {
          dispatch(closeSkillModal());
        }}
        className={styles.closeButton}
      >
        &times;
      </button>
      <div className={styles.suggestBox}>
        {requestedSkills?.map((requested_skill) => (
          <button
            key={requested_skill.id}
            className={styles.skillButton}
            onClick={(e) => {
              if (
                !selectedSkills.find(
                  (skill) => skill.skill_id === requested_skill.skill_id
                )
              )
                setSelectedSkills((selectedSkills) => [
                  ...selectedSkills,
                  requested_skill,
                ]);
            }}
          >
            {requested_skill.skill_name}
          </button>
        ))}
      </div>
      <button
        className={styles.continue}
        disabled={!selectedSkills.length}
        onClick={(e) => {
          AddSkills.mutate(selectedSkills);
        }}
      >
        {selectedSkills.length === 0 ? "Continue" : "Add Skills"}
      </button>
    </Modal>
  );
}
