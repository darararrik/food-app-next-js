import styles from "./RecipesPage.module.scss";
import Text from "@/components/server/Text";
import heroRecipesText from "@/assets/hero-recipes.svg";
import { RecipeApi } from "@/api/recipe";
import { CategoryApi } from "@/api/category";
import { RecipeList } from "../../components/server/List/RecipeList/RecipeList";
import { SearchWrapper } from "./components/Search/SearchWrapper";
import { PaginationWrapper } from "../../components/client/Pagination/components/PaginationWrapper";

type RecipesPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const RecipesPage = async ({ searchParams }: RecipesPageProps) => {
  const page = Number(searchParams.page) || 1;
  const search = (searchParams.search as string) || "";
  const categoriesParam = (searchParams.categories as string) || "";
  const selectedCategories = categoriesParam ? categoriesParam.split(",") : [];

  const [recipesResponse, categoriesRaw] = await Promise.all([
    RecipeApi.getRecipes(page, search, selectedCategories),
    CategoryApi.getCategories(),
  ]);

  const categories = categoriesRaw.map((cat) => ({
    key: cat.id.toString(),
    value: cat.title,
  }));

  const { data: recipes, meta } = recipesResponse;
  const totalPages = meta.pagination.pageCount;

  return (
    <div className={styles.recipesPage}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <img
            src={heroRecipesText.src}
            alt="Recipes"
            className={styles.heroTitleImage}
          />
        </div>
      </section>
      <div className={styles.content}>
        <section className={styles.descriptionSection}>
          <div className={styles.container}>
            <Text view="p-20" className={styles.descriptionText}>
              Find the perfect food and{" "}
              <span className={styles.highlight}>drink ideas</span> for every
              occasion, from{" "}
              <span className={styles.highlight}>weeknight dinners</span> to{" "}
              <span className={styles.highlight}>holiday feasts</span>.
            </Text>
          </div>
        </section>
        <section className={styles.searchSection}>
          <SearchWrapper initialCategories={categories} />
        </section>

        <RecipeList recipes={recipes} />
      </div>

      <section className={styles.paginationSection}>
        <PaginationWrapper totalPages={totalPages} currentPage={page} />
      </section>
    </div>
  );
};

export default RecipesPage;
