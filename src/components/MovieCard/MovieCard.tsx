import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";
import Score from "../Score/Score";
import LinkButton from "../LinkButton/LinkButton";
import { Movie } from "../../lib/types";

interface MovieCardProps {
  id: number;
  title: string;
  image: string;
  description: string;
  score: number;
  releaseYear: string;
  onAction: (movie: Movie) => void;
  actionName: string;
}

function MovieCard({
  id,
  title,
  image,
  description,
  score,
  releaseYear,
  onAction,
  actionName,
}: MovieCardProps) {
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
              onAction({
                id,
                title,
                posterUrl: image,
                description,
                score,
                releaseYear,
              })
            }
          />
          <Score score={score} />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
