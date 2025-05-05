import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Tweet from "./Tweet";
import LastTweets from "./LastTweets";
import Hashtag from "./Hashtag";
import Link from "next/link";

import Trends from "./Trends";

function Home() {
  const [tweetContent, setTweetContent] = useState("");
  let token = useSelector((state) => state.users.value.token);
  let author = token && useSelector((state) => state.users.value._id);
  let userfirstName =
    token && useSelector((state) => state.users.value.firstName);
  let userUsername =
    token && useSelector((state) => state.users.value.username);

  const [tweetsData, setTweetsData] = useState([]);
  const [trendsData, setTrendsData] = useState([]);

  const getTweets = async () => {
    const response = await fetch("http://localhost:3000/tweets/");
    const data = await response.json();
    setTweetsData(data);
  };

  const getTrends = async () => {
    const response = await fetch("http://localhost:3000/hashtags/");
    const data = await response.json();
    setTrendsData(data);
  };

  //add a new tweet
  async function handleTweetSubmit() {
    const tweet = {
      author,
      content: tweetContent,
      submittedAt: new Date(),
    };

    try {
      const response = await fetch(
        "http://localhost:3000/tweets/",

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tweet),
        }
      );

      getTweets();
      getTrends();
    } catch (error) {
      console.error("Submission failed", error);
      alert("An error occurred. Please try again.");
    }
  }

  useEffect(() => {
    (async () => {
      await getTweets();
      await getTrends();
    })();
  }, []);

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.homeLeft}>
          <div className={styles.logoContainer}>
            <Link href="/">
              <img
                className={styles.logo}
                src="hackatweet-logo.jpg"
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

        <div className={styles.homeCenter}>
          <div className={styles.homeCenterTopContainer}>
            <div className={styles.pageTitle}>
              <h1> HOME </h1>
            </div>
            <div className={styles.newTweetContainer}>
              <input
                className={styles.newTweetInput}
                placeholder="What's up?"
                onChange={(e) => setTweetContent(e.target.value)}
                value={tweetContent}
              />
              <div className={styles.tweetSubmissionContainer}>
                <span className={styles.newTweetLength}>
                  {tweetContent.length}/280
                </span>
                <input
                  className={styles.newTweetButton}
                  type="button"
                  value="TWEET"
                  onClick={() => handleTweetSubmit()}
                />
              </div>
            </div>
          </div>
          <div className={styles.homeCenterBottomContainer}>
            <LastTweets tweets={tweetsData} />
          </div>
        </div>

        <div className={styles.homeRight}>
          <div className={styles.lastTrendsTitle}>
            <h2>Trends</h2>
          </div>

          <div className={styles.lastTrendsContainer}>
            {<Trends trends={trendsData} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
