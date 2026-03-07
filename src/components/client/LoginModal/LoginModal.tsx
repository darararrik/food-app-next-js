"use client";
import { observer } from "mobx-react-lite";
import Input from "@/components/server/Input";
import Button from "@/components/server/Button";
import Text from "@/components/server/Text";
import styles from "./LoginModal.module.scss";
import { useLoginModal } from "../../../shared/hooks/useLoginModal";
import BaseModal from "../../server/BaseModal";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal: React.FC<LoginModalProps> = observer(
  ({ isOpen, onClose }) => {
    const {
      isLogin,
      email,
      setEmail,
      password,
      setPassword,
      username,
      setUsername,
      error,
      loading,
      handleSubmit,
      toggleMode,
    } = useLoginModal(onClose);

    return (
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <div className={styles.loginModal}>
          <Text view="title" className={styles.title}>
            {isLogin ? "Login" : "Sign Up"}
          </Text>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <Input
              placeholder="Username"
              value={username}
              onChange={setUsername}
              required
            />
            {!isLogin && (
              <Input
                placeholder="Email"
                value={email}
                onChange={setEmail}
                type="email"
                required
              />
            )}
            <Input
              placeholder="Password"
              value={password}
              onChange={setPassword}
              type="password"
              required
            />

            {error && (
              <Text view="p-14" className={styles.errorText}>
                {error}
              </Text>
            )}

            <Button className={styles.button} type="submit" loading={loading}>
              {isLogin ? "Log In" : "Create Account"}
            </Button>
          </form>

          <div className={styles.footer}>
            <Text view="p-14">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <Text
                tag="span"
                view="p-14"
                className={styles.link}
                onClick={toggleMode}
              >
                {isLogin ? "Sign Up" : "Log In"}
              </Text>
            </Text>
          </div>
        </div>
      </BaseModal>
    );
  },
);

export default LoginModal;
