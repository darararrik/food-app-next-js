import React, { useState } from "react";
import Button from "@/components/server/Button";
import SearchIcon from "@/components/server/icons/SearchIcon";
import Input from "@/components/server/Input";
import styles from "./Search.module.scss";
import MultiDropdown, { type Option } from "@/components/server/MultiDropdown";

export type SearchProps = {
  searchValue: string;
  selectedOptions: Option[];
  options: Option[];
  rating: number | null;
  totalTime: number | null;
  cookingTime: number | null;
  preparationTime: number | null;
  vegetarian: boolean | null;
  onFilter: (options: Option[]) => void;
  onApplyFilters: (filters: {
    search: string;
    rating: number | null;
    totalTime: number | null;
    cookingTime: number | null;
    preparationTime: number | null;
    vegetarian: boolean | null;
  }) => void;
};

const Search: React.FC<SearchProps> = ({
  searchValue,
  selectedOptions,
  options,
  rating,
  totalTime,
  cookingTime,
  preparationTime,
  vegetarian,
  onFilter,
  onApplyFilters,
}) => {
  const [innerSearch, setInnerSearch] = useState(searchValue);
  const [innerRating, setInnerRating] = useState(rating);
  const [innerTotalTime, setInnerTotalTime] = useState(totalTime);
  const [innerCookingTime, setInnerCookingTime] = useState(cookingTime);
  const [innerPreparationTime, setInnerPreparationTime] = useState(preparationTime);
  const [innerVegetarian, setInnerVegetarian] = useState(vegetarian);

  const [prevSearchValue, setPrevSearchValue] = useState(searchValue);

  if (searchValue !== prevSearchValue) {
    setInnerSearch(searchValue);
    setInnerRating(rating);
    setInnerTotalTime(totalTime);
    setInnerCookingTime(cookingTime);
    setInnerPreparationTime(preparationTime);
    setInnerVegetarian(vegetarian);
    setPrevSearchValue(searchValue);
  }

  const handleSearchClick = () => {
    onApplyFilters({
      search: innerSearch,
      rating: innerRating,
      totalTime: innerTotalTime,
      cookingTime: innerCookingTime,
      preparationTime: innerPreparationTime,
      vegetarian: innerVegetarian,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
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
      </div>

      <div className={styles.extraFilters}>
        <Input
          type="number"
          placeholder="Min Rating (0-5)"
          value={innerRating !== null ? innerRating.toString() : ""}
          onChange={(val) => setInnerRating(val ? Number(val) : null)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSearchClick(); }}
          min={0}
          max={5}
        />
        <Input
          type="number"
          placeholder="Max Total Time (min)"
          value={innerTotalTime !== null ? innerTotalTime.toString() : ""}
          onChange={(val) => setInnerTotalTime(val ? Number(val) : null)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSearchClick(); }}
        />
        <Input
          type="number"
          placeholder="Max Cooking Time (min)"
          value={innerCookingTime !== null ? innerCookingTime.toString() : ""}
          onChange={(val) => setInnerCookingTime(val ? Number(val) : null)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSearchClick(); }}
        />
        <Input
          type="number"
          placeholder="Max Prep Time (min)"
          value={innerPreparationTime !== null ? innerPreparationTime.toString() : ""}
          onChange={(val) => setInnerPreparationTime(val ? Number(val) : null)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSearchClick(); }}
        />
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={innerVegetarian === true}
            onChange={(e) => setInnerVegetarian(e.target.checked ? true : null)}
          />
          Vegetarian Only
        </label>
      </div>

      <div className={styles.bottomRow}>
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
    </div>
  );
};

export default Search;
