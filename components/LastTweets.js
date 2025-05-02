import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import moment from "moment";
import Tweet from "./Tweet";

function LastTweets() {
  const [tweetsData, setTweetsData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/tweets/");
      const data = await response.json();
      setTweetsData(data);
    })();
  }, []);

  let tweets = tweetsData.map((data, i) => {
    
    let age = moment(data.submittedAt, "YYYYMMDD,h:mm:ss").fromNow();
    return (
      <Tweet
        key={data._id}
        id={data._id}
        firstName={data.author}
        username={data.username}
        content={data.content}
        age={age}
        likes={data.userLikes.length}
        userLikes={data.userLikes}
      />
    );
  });

  return <div className={styles.lastTweetsContainer}>{tweets}</div>;
}

export default LastTweets;
