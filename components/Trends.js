import styles from "../styles/Home.module.css";
import Trend from "./Trend";

function Trends(props) {
  let trends = props.trends.map((data, i) => {
    return <Trend key={data._id} {...data} />;
  });

  return <div className={styles.lastTweetsContainer}>{trends}</div>;
}

export default Trends;
