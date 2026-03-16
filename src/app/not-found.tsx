import Text from "@/components/server/Text/Text";
import styles from "./not-found.module.scss";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <Text view="title">404 — Not Found</Text>
      <Text view="p-20">
        Sorry, the page you are looking for does not exist.
      </Text>
    </div>
  );
};

export default NotFound;
