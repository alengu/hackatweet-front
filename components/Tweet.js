import styles from "../styles/Tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

function Tweet(props) {
  let token = useSelector((state) => state.users.value.token);
  const [isLiked, setIsLiked] = useState(false);
  let likeStyle = isLiked ? { color: "red" } : {};
  const [likesNumber, setLikesNumber] = useState(0);
  let userId = useSelector((state) => state.users.value._id);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/tweets/userlikes/${props.id}`
      );
      const data = await response.json();

      setLikesNumber(data.userLikes.length); // au chargement de la page, affichage du nombre de likes du tweet
      if (data.userLikes.some((e) => e === userId)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    })();
  }, []);

  async function handleLikeClick() {
    let userlikedTweet = { tweetId: props.id, userId: userId };

    if (!isLiked) {
      setLikesNumber((prev) => prev + 1);
      setIsLiked(true);

      let responseLike = await fetch(
        "http://localhost:3000/tweets/userLikes/like",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userlikedTweet),
        }
      );
      let tweetliked = responseLike.json();
    } else {
      setLikesNumber((prev) => prev - 1);
      setIsLiked(false);

      let responseUnlike = await fetch(
        "http://localhost:3000/tweets/userLikes/unlike",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(userlikedTweet),
        }
      );
      let tweetUnliked = responseUnlike.json();
    }
  }

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
        <div className={styles.tweetLikes} style={likeStyle}>
          <FontAwesomeIcon
            icon={faHeart}
            className={styles.likeHeart}
            style={{ marginRight: "5px", ...likeStyle }}
            onClick={() => handleLikeClick()}
          />
          {likesNumber}
        </div>
        <div className={styles.deleteButton}>
          {userId === props.userId && (
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => props.onDelete(props.id)}
              className={styles.likeHeart}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Tweet;
