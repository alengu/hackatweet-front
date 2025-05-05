import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import moment from "moment";
import Tweet from "./Tweet";
import LastTweets from "./LastTweets";
import Hashtag from "./Hashtag";
import Link from "next/link";
import { useRouter } from "next/router";//récupération de l'url
import Trends from "./Trends";

function Home() {
  const router = useRouter();
  const [tweetContent, setTweetContent] = useState("");
  const [tweets, setTweets] = useState([]);

  let token = useSelector((state) => state.users.value.token);
  let author = token && useSelector((state) => state.users.value._id);
  let userfirstName =
    token && useSelector((state) => state.users.value.firstName);
  let userUsername =
    token && useSelector((state) => state.users.value.username);

  useEffect(() => {
    if (!token) {
      try {
        router.push('/login');     
    } catch(error) {
        console.log('redirection échouée');
    }
    }

  }, [])

 

  async function handleTweetSubmit() {// manque la gestion des hashtags à l'ajout du tweet
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
      const addedTweet = await response.json();
      console.log("added tweet =>", addedTweet);
      console.log("id de l'added tweet = ", addedTweet._id);
      setTweets(tweet);
    } catch (error) {
      console.error("Submission failed", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.homeLeft}>
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
            <LastTweets />
          </div>
        </div>

        <div className={styles.homeRight}>
          <div className={styles.lastTrendsTitle}>
            <h2>Trends</h2>
          </div>

          <div className={styles.lastTrendsContainer}>{<Trends />}</div>
        </div>
      </main>
    </div>
  );
}

export default Home;
