import React, { useState, useEffect } from "react";
import Button from "@/components/server/Button";
import SearchIcon from "@/components/server/icons/SearchIcon";
import Input from "@/components/server/Input";
import styles from "./Search.module.scss";
import MultiDropdown, { type Option } from "@/components/server/MultiDropdown";

export type SearchProps = {
  searchValue: string;
  selectedOptions: Option[];
  options: Option[];
  onSearch: (value: string) => void;
  onFilter: (options: Option[]) => void;
};

const Search: React.FC<SearchProps> = ({
  searchValue,
  selectedOptions,
  options,
  onSearch,
  onFilter,
}) => {
  const [innerSearch, setInnerSearch] = useState(searchValue);

  useEffect(() => {
    setInnerSearch(searchValue);
  }, [searchValue]);

  const handleSearchClick = () => {
    onSearch(innerSearch);
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Input
          placeholder="Enter dishes"
          value={innerSearch}
          onChange={(value) => setInnerSearch(value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
        />
        <Button onClick={handleSearchClick}>
          <SearchIcon />
        </Button>
      </div>
      <MultiDropdown
        className={styles.multiDropdown}
        options={options}
        value={selectedOptions}
        onChange={onFilter}
        getTitle={(options) =>
          options.length > 0
            ? options.map((o) => o.value).join(", ")
            : "Categories"
        }
      />
    </div>
  );
};

export default Search;
