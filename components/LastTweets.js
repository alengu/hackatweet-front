import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import moment from "moment";
import Tweet from "./Tweet";

function LastTweets() {
  const [tweetsData, setTweetsData] = useState([]);
  let token = useSelector((state) => state.users.value.token);
  let author = token && useSelector((state) => state.users.value._id);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/tweets/");
      const data = await response.json();
      setTweetsData(data);
    })();
  }, []);

  // delete tweet function
  async function handleDelete(tweetId) {
    try {
      console.log('tweet id : ', tweetId)
      console.log(tweetsData);
      const tweet = tweetsData.find((e) => e._id === tweetId);
      console.log(tweet);
      const tweetAuthor = tweet.author;
      console.log(tweetAuthor);
      if (tweetAuthor === author) {
        console.log('on est dans la condition')
      const response = await fetch(
        `http://localhost:3000/tweets/${tweetId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        }
      );
      const deletedTweet = await response.json();
      console.log("Tweet deleted =>", deletedTweet.deletedCount);
      setTweetsData(tweets => tweets.filter(tweet => tweet.id !== tweetId));
    }
    } catch (error) {
      console.error("Deletion failed");
      alert("An error occurred. Please try again.");
    } 
  };

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
        onDelete={handleDelete}
      />
    );
  });

  return <div className={styles.lastTweetsContainer}>{tweets}</div>;
}

export default LastTweets;
