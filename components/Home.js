import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../reducers/users";
import LastTweets from "./LastTweets";
import Link from "next/link";
import Trends from "./Trends";
import { faUsersBetweenLines } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const router = useRouter();
  const [tweetContent, setTweetContent] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const dispatch = useDispatch();

  let user = useSelector((state) => state.users.value);
  let token = user.token;
  let author = user._id;
  let userfirstName = user.firstName;
  let userUsername = user.username;
  let profilePic=user.profilePic

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

  useEffect(() => {
    if (!token) {
      try {
        router.push("/login");
      } catch (error) {
        console.log("redirection échouée");
      }
    }
  }, [token]);


  async function handleTweetSubmit() {
    const tweet = {
      author,
      content: tweetContent,
      submittedAt: new Date(),
    };

    try {
      const response = await fetch("http://localhost:3000/tweets/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tweet),
      });
      const addedTweet = await response.json();

      await getTweets();
      await getTrends();
    } catch (error) {
      console.error("Submission failed", error);
      alert("An error occurred. Please try again.");
    }
    setTweetContent("");
  }

  // delete tweet function
  async function handleDelete(tweetId) {
    console.log(tweetId);
    try {
      const tweet = tweetsData.find((e) => e._id === tweetId);
      const tweetAuthor = tweet.author._id;
      if (tweetAuthor === author) {
        await fetch(`http://localhost:3000/tweets/${tweetId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        await getTweets();
        await getTrends();
      }
    } catch (error) {
      console.error("Deletion failed");
      alert("An error occurred. Please try again.");
    }
  }

  async function handleLogoutClick() {
    dispatch(logout());
    router.push("/login");
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
                src="/hackatweet-logo2.png"
                alt="Hackatweet Logo"
              />
            </Link>
          </div>
          <div className={styles.homeLeftBottomInfoContainer}>
            <div className={styles.userInfoContainer}>
              {token && (
                <>
                  <div className={styles.userPictureContainer}>
                    <img
                      className={styles.userPicture}
                      src={profilePic}
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
            <div className={styles.logoutContainer}>
              <input
                type="button"
                className={styles.logoutButton}
                value="Logout"
                onClick={() => handleLogoutClick()}
                style={{ cursor: "pointer" }}
              ></input>
            </div>
          </div>
        </div>

        <div className={styles.homeCenter}>
          <div className={styles.homeCenterTopContainer}>
            <div className={styles.pageTitle}>
              <h1> Home </h1>
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
                  value="Tweet"
                  onClick={() => handleTweetSubmit()}
                />
              </div>
            </div>
          </div>
          <div className={styles.homeCenterBottomContainer}>
            <LastTweets tweets={tweetsData} handleDelete={handleDelete} />
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
