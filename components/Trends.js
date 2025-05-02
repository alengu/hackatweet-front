import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import moment from "moment";
import Trend from "./Trend";

function Trends(props) {
  const [trendsData, setTrendsData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/hashtags/");
      const data = await response.json();

      setTrendsData(data);
    })();
  }, []);

  let trends = trendsData.map((data, i) => {
    return <Trend key={data._id} {...data} />;
  });

  return <div className={styles.lastTweetsContainer}>{trends}</div>;
}

export default Trends;
