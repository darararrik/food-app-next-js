import Text from "@/components/server/Text";
import styles from "./InfoText.module.scss";
import React from "react";

type InfoTextProps = {
  title: string;
  data: string;
};

const Infotext: React.FC<InfoTextProps> = ({ title, data }) => {
  return (
    <div className={styles.infoContainer}>
      <Text view="p-16">{title}</Text>
      <Text view="p-16" className={styles.data}>
        {data}
      </Text>
    </div>
  );
};

export default Infotext;
