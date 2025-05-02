import styles from "../styles/Hashtag.module.css";

function Hashtag() {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.hashtagLeft}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} src="hackatweet-logo.jpg" alt="Hackatweet Logo" />
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

        <div className={styles.hashtagCenter}>
          <div className={styles.hashtagCenterTopContainer}>
            <div className={styles.pageTitle}>
              <h1> Hashtag </h1>
            </div>
            <div className={styles.hashtagSearchContainer}>
              <input
                className={styles.hashtagSearch}
                placeholder="#"
              />
              
            </div>
          </div>
          <div className={styles.hashtagCenterBottomContainer}>
            Plenty of tweets here
            {/* <LastTweets/> */}
          </div>
        </div>

        <div className={styles.hashtagRight}>
          <div className={styles.lastTrendsTitle}>
            <h2>Last Trends</h2>
          </div>

          <div className={styles.lastTrendsContainer}>{/* <Trends/> */} Plenty of hashtags here</div>
        </div>
      </main>
    </div>
  );
}

export default Hashtag;
