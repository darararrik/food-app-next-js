"use client";

import Button from "@/components/server/Button";
import Text from "@/components/server/Text";
import styles from "./error.module.scss";

function Error({ error }: { error: Error }) {
  console.log(error);
  return (
    <div className={styles.container}>
      <Text view="title">Произошла ошибка!</Text>
      <Button onClick={() => window.location.reload()}>
        Попробовать снова
      </Button>
    </div>
  );
}
export default Error;
