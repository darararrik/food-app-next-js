import { CategoryApi } from "@/api/category";
import Text from "@/components/server/Text";
import Link from "next/link";
import styles from "./categories.module.scss";

export default async function CategoriesPage() {
  const categories = await CategoryApi.getCategories();

  return (
    <div className={styles.container}>
      <Text view="title" className={styles.title}>All Categories</Text>
      
      <div className={styles.grid}>
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/?categories=${category.id}`}
            className={styles.card}
          >
            <div className={styles.cardContent}>
              <Text view="p-20" weight="bold">{category.title}</Text>
              <Text view="p-14" color="secondary" className={styles.linkText}>
                View Recipes →
              </Text>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
