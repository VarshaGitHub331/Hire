import styles from "./gigCard.module.css";
import { Link } from "react-router-dom";
export default function GigCard({ item }) {
  return (
    <Link to="/gig/123">
      <div className={styles.gigCard}>
        <div className={styles.Gigimage}>
          <img src={item.img} alt="gig" />
        </div>
        <div className={styles.user}>
          <div className={styles.profile}>
            <img src={item.pp} alt="profile" />
            <span style={{ fontWeight: 600 }}>{item.username}</span>
          </div>
          <div className={styles.desc}>{item.desc}</div>
          <div className={styles.rating}>
            <img src="/assets/star.png" alt="star" className={styles.star} />
            <span style={{ fontWeight: 600 }}>{item.star}</span>
          </div>
          <div className={styles.details}>
            <span style={{ fontWeight: 600 }}>FROM $ {item.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
