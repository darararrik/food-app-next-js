import classNames from "classnames";
import React from "react";
import Text from "@/components/server/Text";
import styles from "./Card.module.scss";
import Image from "next/image";
export type CardProps = {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={classNames(styles.card, className)} onClick={onClick}>
      <div className={styles.card__header}>
        {image && (
          <Image
            src={image}
            alt=""
            width={200}
            height={200}
            className={styles.card__image}
          />
        )}
      </div>
      <div className={styles.card__body}>
        <div className={styles.card__content}>
          {captionSlot && (
            <Text
              view="p-18"
              color="secondary"
              weight="medium"
              className={styles.card__caption}
            >
              {captionSlot}
            </Text>
          )}

          <Text
            view="p-20"
            maxLines={2}
            weight="medium"
            color="primary"
            className={styles.card__title}
          >
            {title}
          </Text>

          <Text
            view="p-16"
            color="secondary"
            maxLines={3}
            weight="normal"
            className={styles.card__subtitle}
          >
            {subtitle}
          </Text>
        </div>
        <div className={styles.card__footer}>
          {contentSlot && (
            <Text
              view="p-16"
              weight="bold"
              color="primary"
              className={styles.card__contentSlot}
            >
              {contentSlot}
            </Text>
          )}
          {actionSlot && (
            <div className={styles.card__actionSlot}>{actionSlot}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
