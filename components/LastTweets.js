import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import moment from 'moment';
import Tweet from  './Tweet'

function LastTweets(props) {

  const [tweetsData, setTweetsData] = useState([]);

  const tweetData = [
    {
      author: "Alex",
      username:"Alexu",
      content: "#Backend rocks",
      submittedAt: new Date(),
      likes: 5,
      userLikes: ["user15", "user2", "user4"],
      hashTags: ["Backend"],
    },
    {
      author: "Henri",
      username:"Ritonn",
      content: "#God and #Genealogy rocks",
      submittedAt: new Date(),
      likes: 3,
      userLikes: ["user1", "user72", "user44"],
      hashTags: ["god", "genealogy"],
    },
    {
      author: "Etienne",
      username:"kamoo",
      content: "My #baby rocks her #Genealogy",
      submittedAt: new Date(),
      likes: 6,
      userLikes: ["user15", "user24", "user4"],
      hashTags: ["baby", "genealogy"],
    },
  ];

  let tweets = tweetData.map((data, i) => {
    let age = moment(data.submittedAt, "YYYYMMDD,h:mm:ss").fromNow();
    return (
      <Tweet
        firstName={data.author}
        username={data.username}
        content={data.content}
        age={age}
        likes={data.userLikes.length}
        userLikes={data.userLikes}
      />
    );
  });

  return (
    <div className={styles.lastTweetsContainer}>
      {tweets}
    </div>
  );
}

export default LastTweets;
