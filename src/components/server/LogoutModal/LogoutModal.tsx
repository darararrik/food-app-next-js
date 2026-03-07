import React from "react";
import BaseModal from "../BaseModal";
import Button from "@/components/server/Button";
import Text from "@/components/server/Text";
import styles from "./LogoutModal.module.scss";

type LogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.content}>
        <Text view="p-20" className={styles.title}>
          Log out
        </Text>
        <Text view="p-16" className={styles.message}>
          Are you sure you want to log out?
        </Text>
        <div className={styles.actions}>
          <Button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </Button>
          <Button className={styles.confirmButton} onClick={handleConfirm}>
            Log out
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default LogoutModal;
