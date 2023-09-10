import styles from "./Score.module.css";

type ScoreProps = {
  score: number;
};

function Score({ score }: ScoreProps) {
  return <span className={styles.score}>{score}/10</span>;
}

export default Score;
