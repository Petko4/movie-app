import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";
import Score from "../Score/Score";
import { useContext } from "react";
import { LocalStorageContext } from "../../App";
import LinkButton from "../LinkButton/LinkButton";

interface MovieCardProps {
  id: number;
  title: string;
  image: string;
  description: string;
  score: number;
  onAction: (movie: Movie) => void;
  actionName: string;
}

function MovieCard({
  id,
  title,
  image,
  description,
  score,
  onAction,
  actionName,
}: MovieCardProps) {
  const { addMovie } = useContext(LocalStorageContext);

  return (
    <div className={styles.card}>
      <div className={styles.poster}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.details}>
        <h2>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.container}>
          <Link to={`/detail/${id}`}>Detail</Link>
          <LinkButton
            name={actionName}
            onClick={() =>
              onAction({ id, title, posterUrl: image, description, score })
            }
          />
          <Score score={score} />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
