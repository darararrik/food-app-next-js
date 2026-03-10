import type { Recipe } from "@/types/models/Recipe";
import Text from "@/components/server/Text";
import styles from "./IngredientsAndEquipment.module.scss";
import ingIcon from "@/assets/ing.svg";
import eqIcon from "@/assets/eq.svg";
import React from "react";
import Image from "next/image";

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
              <Image
                src={ingIcon.src || ingIcon}
                alt="ingredient"
                width={24}
                height={24}
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
              <Image
                src={eqIcon.src || eqIcon}
                alt="equipment"
                width={24}
                height={24}
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
