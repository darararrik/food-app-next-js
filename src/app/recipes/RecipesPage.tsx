import styles from "./RecipesPage.module.scss";
import heroRecipesText from "@/assets/hero-recipes.svg";
import { RecipeApi } from "@/api/recipe";
import { CategoryApi } from "@/api/category";
import { SearchWrapper } from "./components/Search/SearchWrapper";
import { PaginationWrapper } from "@/components/client/Pagination/components/PaginationWrapper";
import { ListWrapper } from "@/components/server/List/RecipeList/ListWrapper";
import Image from "next/image";
import { parseSearchParams } from "@/shared/parseSearchParams";
import Text from "@/components/server/Text";
type RecipesPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const RecipesPage = async ({ searchParams }: RecipesPageProps) => {
  const {
    page,
    search,
    categories: selectedCategories,
  } = parseSearchParams(searchParams);

  const [recipesResponse, categoriesModel] = await Promise.all([
    RecipeApi.getRecipes(page, search, selectedCategories),
    CategoryApi.getCategories(),
  ]);

  const categories = categoriesModel.map((c) => ({
    key: c.id.toString(),
    value: c.title,
  }));

  return (
    <div className={styles.recipesPage}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <Image
            src={heroRecipesText}
            alt="Recipes"
            className={styles.heroTitleImage}
          />
        </div>
      </section>

      <div className={styles.content}>
        <section className={styles.descriptionSection}>
          <Text view="p-20">
            Find the perfect food and <span className={styles.highlight}>drink ideas</span> for
            every occasion, from <span className={styles.highlight}>weeknight dinners</span> to{" "}
            <span className={styles.highlight}>holiday feasts</span>.
          </Text>
        </section>
        <SearchWrapper initialCategories={categories} />
        <ListWrapper isFav={false} initialRecipes={recipesResponse.data} />
        <div className={styles.paginationSection}>
          <PaginationWrapper
            totalPages={recipesResponse.meta.pagination.pageCount}
            currentPage={page}
          />
        </div>
      </div>
    </div>
  );
};
export default RecipesPage;
