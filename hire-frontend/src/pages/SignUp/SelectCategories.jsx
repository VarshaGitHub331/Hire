import { useQuery, useMutation } from "@tanstack/react-query";
import { getCategories } from "../../apis/Categories";
import styles from "./SelectCategories.module.css";
import Modal from "react-modal";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setUserCategories } from "../../redux/signUpDataSlice";

import { closeCategoryModal } from "../../redux/modalSlice";
import { openSkillModal } from "../../redux/modalSlice";

export default function CategoryModal() {
  const { data: categories, isLoading } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });
  const server = process.env.REACT_APP_SERVER_URL;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [search, setSearch] = useState("");
  const { userState } = useAuthContext();
  const { user_id, token } = userState;
  const userCategories = useSelector(
    (store) => store.signUpDetails.userCategories
  );

  const categoryModal = useSelector((store) => store.modal.categoryModal);
  const dispatch = useDispatch();
  const SubmitCategories = useMutation({
    mutationFn: (categories) => {
      axios.post(
        `${server}/freelancer/updateCategories`,
        {
          user_id: user_id,
          categories,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Your Interests Have Been Updated", {
        duration: 3000,
      });
      dispatch(setUserCategories(selectedCategories));
      dispatch(openSkillModal());
      dispatch(closeCategoryModal());
    },
    onError: () => {
      toast.error("Some error saving details", {
        duration: 3000,
      });
    },
  });

  const FetchCategory = useCallback(() => {
    if (!categories) return;
    setAvailableCategories(() => {
      if (search === "") return categories;
      return categories.filter((cat) =>
        cat.category_name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [categories, search]);
  const AddCategories = async (e) => {
    await SubmitCategories.mutateAsync(selectedCategories);
  };
  useEffect(() => {
    if (categories) setAvailableCategories(categories);
  }, [categories]);

  useEffect(() => {
    FetchCategory();
  }, [FetchCategory, search]);

  return (
    <Modal
      contentLabel="Select Categories"
      className={styles.box}
      onRequestClose={(e) => {
        dispatch(closeCategoryModal());
      }}
      isOpen={categoryModal}
    >
      <h3>Select Categories You Are Interested In</h3>
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find Your Categories"
          />
        </div>
        <button onClick={FetchCategory}>Search</button>
      </div>
      <ScrollableCheckBox
        categories={availableCategories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <button
        onClick={(e) => {
          dispatch(closeCategoryModal());
        }}
        className={styles.closeButton}
      >
        &times;
      </button>
      <button
        className={styles.continue}
        disabled={!selectedCategories.length}
        onClick={(e) => {
          AddCategories(e);
        }}
      >
        {selectedCategories.length === 0 ? "Continue" : "Add Categories"}
      </button>
    </Modal>
  );
}

function ScrollableCheckBox({ categories, setSelectedCategories }) {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
  };

  return (
    <div className={styles.scrollableContainer}>
      {categories.map((category) => (
        <div key={category.id} className={styles.checkboxItem}>
          <input
            type="checkbox"
            value={category.category_id}
            onChange={handleCheckboxChange}
          />
          <label>{category.category_name}</label>
        </div>
      ))}
    </div>
  );
}
