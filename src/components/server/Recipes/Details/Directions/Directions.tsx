import type { Direction } from "@/types/models/Direction";
import Text from "@/components/server/Text";
import styles from "./Directions.module.scss";
import React from "react";

type DirectionsProps = {
  direction: Direction[];
};

const Directions: React.FC<DirectionsProps> = ({ direction }) => {
  return (
    <div className={styles.directionsContainer}>
      {direction?.map((item, index) => (
        <div key={item.id}>
          <Text view="p-16" className={styles.title}>
            Step {index + 1}
          </Text>
          <Text view="p-14">{item.description}</Text>
        </div>
      ))}
    </div>
  );
};

export default Directions;
