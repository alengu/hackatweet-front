import styles from "../styles/Home.module.css";
import moment from "moment";
import Tweet from "./Tweet";

function LastTweets(props) {
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
      />
    );
  });

  return <div className={styles.lastTweetsContainer}>{tweets}</div>;
}

export default LastTweets;
