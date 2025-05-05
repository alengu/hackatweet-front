import styles from "../styles/Home.module.css";

function Trend(props) {
  return (
    <div className={styles.trend}>
      <span className={styles.trendsTitle}>{props.name}</span>
      <span className={styles.trendsTitle}>{props.nbTweets} Tweets</span>
    </div>
  );
}

export default Trend;
