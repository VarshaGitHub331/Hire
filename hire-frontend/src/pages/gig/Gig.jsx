import styles from "./Gig.module.css";
import { useState, useEffect, useRef } from "react";
import { gigs } from "../../Data.js";
import GigCard from "../../components/gigCards/gigCard";
export default function Gig() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [sortVal, setSortVal] = useState("Best Selling");
  const [next, setNext] = useState(0);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      )
        setOpen(false);
    });
    return document.removeEventListener("click", (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpen(false);
    });
  }, []);
  return (
    <div className={styles.GigContainer}>
      <span className={styles.direction}>
        HIRE &gt; GRAPHICS & DESIGN &gt;{" "}
      </span>
      <h2>AI ARTISTS</h2>
      <span className={styles.about}>
        Explore the boundaries of Art And Technology with Hire's AI Artists
      </span>
      <div className={styles.menu}>
        <div className={styles.price}>
          <span>Budget</span>
          <input type="number" placeholder="min" />
          <input type="number" placeholder="max" />
          <button>Apply</button>
        </div>

        <div className={styles.right}>
          <span className={styles.sort}>Sort By</span>
          <span className={styles.sortType}>{sortVal}</span>
          <img
            src="/assets/down.png"
            alt="down"
            style={{ cursor: "pointer" }}
            width={15}
            height={15}
            onClick={(e) => setOpen((open) => !open)}
            ref={buttonRef}
          />
          {open && (
            <div className={styles.rightMenu} ref={menuRef}>
              <span
                onClick={(e) => {
                  setSortVal("Newest");
                }}
              >
                Newest
              </span>
              <span
                onClick={(e) => {
                  setSortVal("Best Selling");
                }}
              >
                Best Selling
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.gigs}>
        {gigs &&
          gigs.map((item, index, arr) => {
            return index === next ||
              index === (next + 1) % gigs.length ||
              index === (next + 2) % gigs.length ? (
              <GigCard item={item} />
            ) : (
              ""
            );
          })}

        <img
          src="/assets/next.jpg"
          alt="next"
          className={styles.next}
          onClick={(e) => setNext((next) => (next + 1) % gigs.length)}
        />
      </div>
    </div>
  );
}
