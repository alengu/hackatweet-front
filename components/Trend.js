import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

function Trend(props) {
  const router = useRouter();
  console.log("hashtag ? =>", router.query.hashtags);

  return (
    <div className={styles.trend}>
      <Link href={`/hashtags/${props.name}`}>
        <span className={styles.trendsTitle}>{props.name}</span>
      </Link>
      <span className={styles.trendsTitle}>{props.nbTweets} Tweets</span>
    </div>
  );
}

export default Trend;
