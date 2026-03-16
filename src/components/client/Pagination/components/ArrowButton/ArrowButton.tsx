import classNames from "classnames";
import styles from "./ArrowButton.module.scss";
import ArrowIcon from "@/components/server/icons/ArrowIcon";

type ArrowButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      className={classNames(
        styles.arrowButton,
        styles[`arrowButton_direction-${direction}`],
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <ArrowIcon className={styles.icon} />
    </button>
  );
};

export default ArrowButton;
