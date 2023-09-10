import styles from "./MoreButton.module.css";
type MoreButton = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

function MoreButton({ onClick }: MoreButton) {
  return (
    <button className={styles.btn} onClick={onClick}>
      More {">>"}
    </button>
  );
}

export default MoreButton;
