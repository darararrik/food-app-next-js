import styles from "./RecipesPage.module.scss";
import heroRecipesText from "@/assets/hero-recipes.svg";
import { RecipeApi } from "@/api/recipe";
import { CategoryApi } from "@/api/category";
import { SearchWrapper } from "./components/Search/SearchWrapper";
import { PaginationWrapper } from "@/components/client/Pagination/components/PaginationWrapper";
import { ListWrapper } from "@/components/server/List/RecipeList/ListWrapper";
import Image from "next/image";
import { parseSearchParams } from "@/shared/parseSearchParams";
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
        <SearchWrapper initialCategories={categories} />
        <ListWrapper isFav={false} initialRecipes={recipesResponse.data} />
      </div>

      <PaginationWrapper
        totalPages={recipesResponse.meta.pagination.pageCount}
        currentPage={page}
      />
    </div>
  );
};
export default RecipesPage;
