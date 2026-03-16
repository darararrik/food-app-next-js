import * as React from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import styles from "./BaseModal.module.scss";
import CloseIcon from "@/components/server/icons/CloseIcon";

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={classNames(styles.modal, className)}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default BaseModal;
