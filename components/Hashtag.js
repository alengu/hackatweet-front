import styles from "../styles/HashTag.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/users";
import moment from "moment";
import Tweet from "./Tweet";
import LastTweets from "./LastTweets";
import Link from "next/link";
import { useRouter } from "next/router";
import Trends from "./Trends";

function Hashtag() {

  const dispatch = useDispatch();
  const [tweetContent, setTweetContent] = useState("");
  let token = useSelector((state) => state.users.value.token);
  let author = useSelector((state) => state.users.value._id);
  let userfirstName = useSelector((state) => state.users.value.firstName);
  let userUsername = useSelector((state) => state.users.value.username);

  async function handleLogoutClick() {
    dispatch(logout());
    router.push("/login");
  }

  const router = useRouter();

  //const { hashtags } = router.query;
  const query = router.query;
  const hashtags = query.hashtags ? query.hashtags[0] : null;

  const [tweetsData, setTweetsData] = useState([]);
  const [trendsData, setTrendsData] = useState([]);

  const getTweets = async (value) => {
    const url = value
      ? `http://localhost:3000/tweets?hashtag=${value}`
      : "http://localhost:3000/tweets";
    const response = await fetch(url);
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
  }, []);

  useEffect(() => {
    (async () => {
      await getTweets(hashtags);
    })();
  }, [hashtags]);

  useEffect(() => {
    (async () => {
      await getTrends();
    })();
  }, []);

  async function handleDelete(tweetId) {
    try {
      const tweet = tweetsData.find((e) => e._id === tweetId);
      const tweetAuthor = tweet.author._id;
      if (tweetAuthor === author) {
        await fetch(`http://localhost:3000/tweets/${tweetId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        await getTweets(hashtags);
        await getTrends();
      }
    } catch (error) {
      console.error("Deletion failed");
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.hashtagLeft}>
          <div className={styles.logoContainer}>
            <Link href="/">
              <img
                className={styles.logo}
                src="/hackatweet-logo2.png"
                alt="Hackatweet Logo"
              />
            </Link>
          </div>
          <div className={styles.hashtagLeftBottomInfoContainer}>
            <div className={styles.userInfoContainer}>
              {token && (
                <>
                  <div className={styles.userPictureContainer}>
                    <img
                      className={styles.userPicture}
                      src="/anonymousUser.jpg"
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
              ></input>
            </div>
          </div>
        </div>

        <div className={styles.hashtagCenter}>
          <div className={styles.hashtagCenterTopContainer}>
            <div className={styles.pageTitle}>
              <h1> Hashtag </h1>
            </div>
            <div className={styles.hashtagSearchContainer}>
              #
              <input
                className={styles.hashtagSearch}
                placeholder=""
                onChange={(e) => router.replace(`/hashtags/${e.target.value}`)}
                value={hashtags}
              />
            </div>
          </div>
          <div className={styles.hashtagCenterBottomContainer}>
            <LastTweets tweets={tweetsData} handleDelete={handleDelete} />
          </div>
        </div>

        <div className={styles.hashtagRight}>
          <div className={styles.lastTrendsTitle}>
            <h2>Last Trends</h2>
          </div>

          <div className={styles.lastTrendsContainer}>
            {<Trends trends={trendsData} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Hashtag;
