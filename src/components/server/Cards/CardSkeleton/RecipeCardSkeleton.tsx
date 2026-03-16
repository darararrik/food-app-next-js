import Skeleton from "@/components/server/Skeleton";
import styles from "../Card/Card.module.scss";

const CardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <Skeleton height={200} borderRadius="10px 10px 0 0" />
      </div>
      <div className={styles.card__body}>
        <div className={styles.card__content}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <Skeleton width={20} height={20} borderRadius="50%" />
            <Skeleton width={100} height={20} />
          </div>
          <Skeleton width="100%" height={24} style={{ marginBottom: "8px" }} />
          <Skeleton width="80%" height={20} style={{ marginBottom: "16px" }} />
        </div>
        <div className={styles.card__footer}>
          <Skeleton width={80} height={20} />
          <Skeleton width={100} height={40} borderRadius={10} />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
