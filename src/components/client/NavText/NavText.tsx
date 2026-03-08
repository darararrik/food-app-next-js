"use client";
import Text from "@/components/server/Text/Text";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavText.module.scss";
import classNames from "classnames";

interface NavTextProps {
  to: string;
  text: string;
  end?: boolean;
  onClick?: () => void;
}

const NavText: React.FC<NavTextProps> = ({ to, text, end, onClick }) => {
  const pathname = usePathname();

  const isActive = end
    ? pathname === to
    : pathname.startsWith(to) && (to !== "/" || pathname === "/");

  return (
    <Link
      href={to}
      onClick={onClick}
      className={classNames(styles.link, { [styles.active]: isActive })}
    >
      <Text view="p-16">{text}</Text>
    </Link>
  );
};

export default NavText;
