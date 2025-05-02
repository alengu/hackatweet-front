import styles from "../styles/Tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,faTrashCan } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

function Tweet(props) {
  return (
    <div className={styles.tweetCard}>
      <div className={styles.tweetTop}>
        <div className={styles.userPictureContainer}>
          <img className={styles.userPicture} />
        </div>

        <span className={styles.userFirstName}> {props.firstName} </span>
        <span className={styles.userUsername}> @{props.username} </span> .  
        <span className={styles.tweetAge}> {props.age}</span>
      </div>
      <div className={styles.tweetContent}>{props.content}</div>
      <div className={styles.tweetBottom}>
        <div className={styles.tweetLikes}>
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => console.log("liked")}
            className={styles.likeHeart}
          />
          4
        </div>
        <div className={styles.deleteButton}>
        <FontAwesomeIcon
            icon={faTrashCan}
            onClick={() => console.log("liked")}
            className={styles.likeHeart}
          />
        </div>
      </div>
    </div>
  );
}

export default Tweet;
