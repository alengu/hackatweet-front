import styles from "../styles/HashTag.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Tweet from "./Tweet";
import LastTweets from "./LastTweets";
import Link from "next/link";
import { useRouter } from "next/router";
import Trends from "./Trends";

function Hashtag() {
  const [tweetContent, setTweetContent] = useState("");
  let token = useSelector((state) => state.users.value.token);
  let author = token && useSelector((state) => state.users.value._id);
  let userfirstName =
    token && useSelector((state) => state.users.value.firstName);
  let userUsername =
    token && useSelector((state) => state.users.value.username);

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.hashtagLeft}>
          <div className={styles.logoContainer}>
            <Link href="/">
              <img
                className={styles.logo}
                src="/hackatweet-logo.jpg"
                alt="Hackatweet Logo"
              />
            </Link>
          </div>
          <div className={styles.userInfoContainer}>
            {token && (
              <>
                <div className={styles.userPictureContainer}>
                  <img
                    className={styles.userPicture}
                    src="anonymousUser.jpg"
                    alt="User Profile Picture"
                  />
                </div>
                <div className={styles.userDetailsContainer}>
                  <div className={styles.userFirstName}>{userfirstName}</div>
                  <div className={styles.userUsername}>@{userUsername}</div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.hashtagCenter}>
          <div className={styles.hashtagCenterTopContainer}>
            <div className={styles.pageTitle}>
              <h1> Hashtag </h1>
            </div>
            <div className={styles.hashtagSearchContainer}>
              #<input className={styles.hashtagSearch} placeholder="" />
            </div>
          </div>
          <div className={styles.hashtagCenterBottomContainer}>
            <LastTweets />
          </div>
        </div>

        <div className={styles.hashtagRight}>
          <div className={styles.lastTrendsTitle}>
            <h2>Last Trends</h2>
          </div>

          <div className={styles.lastTrendsContainer}>{<Trends />}</div>
        </div>
      </main>
    </div>
  );
}

export default Hashtag;
