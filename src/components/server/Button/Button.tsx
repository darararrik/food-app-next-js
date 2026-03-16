import classNames from "classnames";
import React from "react";
import styles from "./Button.module.scss";
import Loader from "@/components/server/Loader";
import Text from "@/components/server/Text";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={classNames(styles.button, className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading && (
        <Loader size="s" className={classNames(styles.button__loader)} />
      )}
      <Text view="button" className={styles.button__text}>
        {children}
      </Text>
    </button>
  );
};

export default Button;
