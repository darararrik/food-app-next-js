import { Suspense } from "react";
import RecipesPage from "./recipes";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  return (
    <Suspense>
      <RecipesPage searchParams={params} />
    </Suspense>
  );
}
