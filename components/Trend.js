import styles from "../styles/Home.module.css";
import Link from "next/link";

function Trend(props) {
  return (
    <Link href={`/hashtags/${props.name}`}>
      <div className={styles.trend}>
        <span className={styles.trendsTitle}>{props.name}</span>
        <span className={styles.trendsTitle}>{props.nbTweets} Tweets</span>
      </div>
    </Link>
  );
}

export default Trend;
