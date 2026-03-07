"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/store/RootStoreProvider";
import styles from "./Header.module.scss";
import logo from "@/assets/logo.svg";
import Text from "@/components/server/Text/Text";
import NavText from "@/components/client/NavText/NavText";
import LoginModal from "@/components/client/LoginModal";
import LogoutModal from "@/components/server/LogoutModal/LogoutModal";
import CloseIcon from "@/components/server/icons/CloseIcon";
import classNames from "classnames";
import MenuIcon from "@/components/server/icons/MenuIcon";
import FavoriteIcon from "@/components/server/icons/FavoriteIcon";
import UserIcon from "@/components/server/icons/UserIcon";

const Header = observer(() => {
  const { userStore, favoriteStore } = useRootStore();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleUserClick = () => {
    if (userStore.isAuthenticated) {
      setLogoutModalOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
    favoriteStore.setShowLoginModal(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.burger} onClick={toggleMenu}>
          <MenuIcon />
        </button>

        <Link href="/" className={styles.logo}>
          <img src={logo.src} alt="Logo" width={36} height={36} />
          <Text view="p-20">Food Client</Text>
        </Link>

        <nav className={classNames(styles.nav, styles.desktopNav)}>
          <NavText to="/" text="Recipes" />
          {isMounted && userStore.isAuthenticated && (
            <>
              <NavText to="/favorites" text="Favorites" />
              <NavText to="/products" text="Products" />
              <NavText to="/menu-items" text="Menu Items" />
              <NavText to="/planning" text="Planning" />
            </>
          )}
        </nav>

        <div
          className={classNames(styles.mobileMenu, {
            [styles.open]: isMenuOpen,
          })}
        >
          <button className={styles.closeMenu} onClick={toggleMenu}>
            <CloseIcon />
          </button>
          <nav className={styles.mobileNav}>
            <NavText to="/" text="Recipes" onClick={toggleMenu} />
            {isMounted && userStore.isAuthenticated && (
              <>
                <NavText
                  to="/favorites"
                  text="Favorites"
                  onClick={toggleMenu}
                />
                <NavText to="/products" text="Products" onClick={toggleMenu} />
                <NavText
                  to="/menu-items"
                  text="Menu Items"
                  onClick={toggleMenu}
                />
                <NavText to="/planning" text="Planning" onClick={toggleMenu} />
              </>
            )}
          </nav>
        </div>

        <div className={styles.actions}>
          {isMounted && userStore.isAuthenticated && (
            <Link href="/favorites">
              <FavoriteIcon width={20} height={20} />
            </Link>
          )}
          <div className={styles.actionIcon} onClick={handleUserClick}>
            <UserIcon
              color={
                isMounted && userStore.isAuthenticated ? "primary" : "accent"
              }
            />
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen || favoriteStore.showLoginModal}
        onClose={handleLoginModalClose}
      />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={() => userStore.logout()}
      />
    </header>
  );
});

export default Header;
