"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/store/RootStoreProvider";
import styles from "./Header.module.scss";
import logo from "@/assets/logo.svg";
import Text from "@/components/server/Text/Text";
import LoginModal from "@/components/client/LoginModal";
import LogoutModal from "@/components/server/LogoutModal/LogoutModal";
import CloseIcon from "@/components/server/icons/CloseIcon";
import classNames from "classnames";
import MenuIcon from "@/components/server/icons/MenuIcon";
import FavoriteIcon from "@/components/server/icons/FavoriteIcon";
import UserIcon from "@/components/server/icons/UserIcon";
import NavLinks from "@/components/server/NavLinks";
import { RecipeApi } from "@/api/recipe";
import { useRouter } from "next/navigation";

const Header = observer(() => {
  const { userStore, favoriteStore } = useRootStore();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSearchingRandom, setIsSearchingRandom] = useState(false);
  const router = useRouter();

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

  const handleRandomRecipe = async () => {
    if (isSearchingRandom) return;
    setIsSearchingRandom(true);
    try {
      const randomRecipe = await RecipeApi.getRandomRecipe();
      if (randomRecipe) {
        router.push(`/recipes/${randomRecipe.documentId}`);
        if (isMenuOpen) setIsMenuOpen(false);
      }
    } finally {
      setIsSearchingRandom(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.burger} onClick={toggleMenu}>
          <MenuIcon />
        </button>

        <Link href="/" className={styles.logo}>
          <Image src={logo.src} alt="Logo" width={36} height={36} />
          <Text view="p-20">Food Client</Text>
        </Link>

        <nav className={classNames(styles.nav, styles.desktopNav)}>
          <NavLinks
            isMounted={isMounted}
            isAuthenticated={userStore.isAuthenticated}
          />
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
            <NavLinks
              isMounted={isMounted}
              isAuthenticated={userStore.isAuthenticated}
              onLinkClick={toggleMenu}
            />
          </nav>
        </div>

        <div className={styles.actions}>
          {isMounted && (
            <button 
              className={styles.randomButton} 
              onClick={handleRandomRecipe}
              disabled={isSearchingRandom}
              title="Get Random Recipe"
            >
              🎲
            </button>
          )}

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
