import styles from "./projectCards.module.css";
import { Link } from "react-router-dom";

export default function ProjectCard({ item }) {
  console.log(item);
  console.log("Hi");
  return (
    <Link to="/gigs?cat=design">
      <div className={styles.catcard}>
        <div className={styles.Project}>
          <img
            src={item?.img || "/path/to/default_image.jpg"} // Fallback image if item.img is undefined
            alt=""
            className={styles.Image}
          />
        </div>
        <div className={styles.foot}>
          <img
            src={item?.pp || "/path/to/default_profile_image.jpg"} // Fallback profile image
            alt="profile"
            className={styles.profile}
          />

          <div className={styles.details}>
            <div className={styles.cat}>{item?.cat || "Category"}</div>
            <div className={styles.username}>
              {item?.username || "Username"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
