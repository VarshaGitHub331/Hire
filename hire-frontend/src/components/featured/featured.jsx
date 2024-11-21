import styles from "./featured.module.css";
import { getCategories } from "../../apis/Categories";
import { useQuery } from "@tanstack/react-query";
export default function Featured() {
  const { data: categories, isLoading } = useQuery({
    queryFn: () => getCategories(),
    queryKey: ["categories"],
  });
  return (
    <div className={styles.featured}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.title}>
            Find the perfect Freelancer Services for your business
          </h1>
          <div className={styles.search}>
            <div className={styles.searchInput}>
              <img
                src="/assets/sicon.png"
                alt="question"
                width="30px"
                height="30px"
              />
              <input type="text" placeholder="Find Your Services" />
            </div>
            <button>Search</button>
          </div>
          <div className={styles.popular}>
            <span>Popular</span>
            <button>Web Design</button>
            <button>Wordpress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className={styles.right}>
          <img
            src="/assets/man.png"
            alt="person"
            width="350px"
            height="370px"
          />
        </div>
      </div>
    </div>
  );
}
