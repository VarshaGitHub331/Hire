import { Link } from "react-router-dom";
import styles from "./CatCard.module.css";
export default function CatCard({ item }) {
  return (
    <Link to="/gigs?cat=design">
      <div className={styles.catcard}>
        <img src={item.img} alt="" className={styles.Image}></img>

        <span className={styles.title}>{item.title}</span>
      </div>
    </Link>
  );
}
