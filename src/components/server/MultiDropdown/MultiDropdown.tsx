"use client";
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import Input from "@/components/server/Input";
import ArrowDownIcon from "@/components/server/icons/ArrowDownIcon";
import styles from "./MultiDropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFilter("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleOptionClick = (option: Option) => {
    const isSelected = value.some((v) => v.key === option.key);
    let newValue;
    if (isSelected) {
      newValue = value.filter((v) => v.key !== option.key);
    } else {
      newValue = [...value, option];
    }
    onChange(newValue);
  };

  const filteredOptions = options.filter((option) =>
    (option.value || "").toLowerCase().includes(filter.toLowerCase()),
  );

  const isEmpty = value.length === 0;

  return (
    <div
      className={classNames(styles.multiDropdownWrapper, className)}
      ref={rootRef}
    >
      <Input
        value={isOpen ? filter : isEmpty ? "" : getTitle(value)}
        placeholder={getTitle(value)}
        onChange={(val) => setFilter(val)}
        onClick={handleInputClick}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary" />}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && !disabled && (
        <div className={styles.multiDropdownOptions}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.key}
                className={classNames(styles.multiDropdownOption, {
                  [styles.multiDropdownOption_selected]: value.some(
                    (v) => v.key === option.key,
                  ),
                })}
                onClick={() => handleOptionClick(option)}
              >
                {option.value}
              </div>
            ))
          ) : (
            <div className={styles.multiDropdownOption}>No options</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
