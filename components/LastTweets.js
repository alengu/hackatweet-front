import styles from "../styles/Home.module.css";
import { useSelector } from "react-redux";
import moment from "moment";
import Tweet from "./Tweet";
import { useState } from "react";

function LastTweets(props) {
  const [tweetsData, setTweetsData] = useState([]);
  let token = useSelector((state) => state.users.value.token);
  let author = token && useSelector((state) => state.users.value._id);

  const tweets = props.tweets.map((data, i) => {
    return (
      <Tweet
        key={data._id}
        id={data._id}
        firstName={data.author}
        username={data.username}
        content={data.content}
        age={moment(data.submittedAt, "YYYYMMDD,h:mm:ss").fromNow()}
        likes={data.userLikes.length}
        userLikes={data.userLikes}
        onDelete={props.handleDelete}
      />
    );
  });

  return <div className={styles.lastTweetsContainer}>{tweets}</div>;
}

export default LastTweets;
