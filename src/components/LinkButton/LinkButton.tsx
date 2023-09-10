import style from "./LinkButton.module.css";

type LinkButtonProps = {
  name: string;
  onClick: (event: React.MouseEvent) => void;
};

function LinkButton({ name, onClick }: LinkButtonProps) {
  return (
    <button className={style.linkButton} onClick={onClick}>
      {name}
    </button>
  );
}

export default LinkButton;
