import type { Recipe } from "@/types/models/Recipe";
import Text from "@/components/server/Text";
import styles from "./IngredientsAndEquipment.module.scss";
import ingIcon from "@/assets/ing.svg";
import eqIcon from "@/assets/eq.svg";
import React from "react";

type IngredientsAndEquipmentProps = {
  recipe: Recipe;
};

const IngredientsAndEquipment: React.FC<IngredientsAndEquipmentProps> = ({
  recipe,
}) => {
  return (
    <div className={styles.ingredientsAndEquipmentContainer}>
      <div className={styles.ingredientsContainer}>
        <Text view="p-20" weight="bold" className={styles.title}>
          Ingredients
        </Text>
        <div className={styles.ingredientsGrid}>
          {recipe.ingredients?.map((ingredient) => (
            <div key={ingredient.id} className={styles.ingredient}>
              <img
                src={ingIcon.src || ingIcon}
                alt="ingredient"
                className={styles.icon}
              />
              <Text view="p-16">{`${ingredient.amount} ${ingredient.name}`}</Text>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.dividerContainer}>
        <div className={styles.circle}></div>
        <div className={styles.divider}></div>
      </div>
      <div className={styles.equipmentContainer}>
        <Text view="p-20" weight="bold" className={styles.title}>
          Equipment
        </Text>
        <div className={styles.equipmentGrid}>
          {recipe.equipments?.map((equipment) => (
            <div key={equipment.id} className={styles.equipment}>
              <img
                src={eqIcon.src || eqIcon}
                alt="equipment"
                className={styles.icon}
              />
              <Text view="p-16">{equipment.name}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngredientsAndEquipment;
