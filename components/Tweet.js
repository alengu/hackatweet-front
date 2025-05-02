import styles from "../styles/Tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

function Tweet(props) {
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

      setLikesNumber(data.userLikes.length);
      if (data.userLikes.some((e) => e === userId)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    })();

  }, []);

  async function handleLikeClick() { // pour lundi !@Etienne
    //si isLiked = true => alors supprimer l'utilisateur de la liste des userLikes et update le nombre

    //si is liked = false => alors ajouter l'utilisateur de la liste des userLikes

    setIsLiked(!isLiked);
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
          {props.likes}
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
