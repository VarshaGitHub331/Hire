import Featured from "../../components/featured/featured";
import styles from "./Home.module.css";
import Categories from "../../components/slider/slide";
import Projects from "../../components/projectSlider/projectSlider.jsx";
export default function Home() {
  return (
    <div className={styles.home}>
      <Featured />
      <Categories />
      <div className={styles.features}>
        <div className={styles.container}>
          <div className={styles.item}>
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className={styles.title}>
              <img src="/assets/check.png" alt="sorry" />
              The best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className={styles.title}>
              <img src="/assets/check.png" alt="sorry" />
              Quality work done quickly
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className={styles.title}>
              <img src="/assets/check.png" alt="sorry" />
              Protected payments, every time
            </div>
            <p>
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
            <div className={styles.title}>
              <img src="/assets/check.png" alt="sorry" />
              24/7 support
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </div>
        </div>
      </div>
      <Projects />
    </div>
  );
}
