import styles from "../styles/Home.module.css";
import { useSelector } from "react-redux";
import moment from "moment";
import Tweet from "./Tweet";
import { useState } from "react";

function LastTweets(props) {
  const [tweetsData, setTweetsData] = useState([]);
  let token = useSelector((state) => state.users.value.token);
  let author = useSelector((state) => state.users.value._id);

  const tweets = props.tweets.map((data, i) => {
    console.log(data);
    return (
      <Tweet
        key={data._id}
        id={data._id}
        userId={data.author._id}
        firstName={data.author.firstName}
        username={data.author.username}
        content={data.content}
        age={moment(moment(data.submittedAt, "YYYYMMDD,h:mm:ss"))
          .add(2, "h")
          .fromNow()}
        likes={data.userLikes.length}
        userLikes={data.userLikes}
        onDelete={props.handleDelete}
      />
    );
  });

  return <div className={styles.lastTweetsContainer}>{tweets}</div>;
}

export default LastTweets;
