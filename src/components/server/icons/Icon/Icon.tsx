"use client";
import classNames from "classnames";
import * as React from "react";
import styles from "./Icon.module.scss";

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: "primary" | "secondary" | "accent";
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color,
  width = 24,
  height = 24,
  children,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      className={classNames(
        styles.icon,
        color && styles[`icon_color-${color}`],
        className,
      )}
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
