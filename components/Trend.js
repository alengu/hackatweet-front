import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function Trend(props) {
  return (
    <div className={styles.trend}>
      <span className={styles.trendsTitle}>{props.name}</span>
      <span className={styles.trendsTitle}>{props.nbTweets} Tweets</span>
    </div>
  );
}

export default Trend;
