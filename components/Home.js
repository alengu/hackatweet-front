import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import moment from "moment";
import Tweet from "./Tweet";
import LastTweets from "./LastTweets";
import Hashtag from "./Hashtag";

function Home() {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.homeLeft}>
          <div className={styles.logoContainer}>
            <img
              className={styles.logo}
              src="hackatweet-logo.jpg"
              alt="Hackatweet Logo"
            />
          </div>
          <div className={styles.userInfoContainer}>
            <div className={styles.userPictureContainer}>
              <img
                className={styles.userPicture}
                src=""
                alt="User Profile Picture"
              />
            </div>
            <div className={styles.userDetailsContainer}>
              <div className={styles.userFirstName}>John</div>
              <div className={styles.userUsername}>@johncena</div>
            </div>
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
              />
              <div className={styles.tweetSubmissionContainer}>
                <span className={styles.newTweetLength}>24/280</span>
                <input
                  className={styles.newTweetButton}
                  type="button"
                  value="TWEET"
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
            <h2>Last Trends</h2>
          </div>

          <div className={styles.lastTrendsContainer}>
            {/* <Trends/> */} Plenty of hashtags here
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
