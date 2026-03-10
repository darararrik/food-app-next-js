import "@/shared/styles/global.scss";
import { RootStoreProvider } from "@/store/RootStoreProvider";
import Header from "@/components/client/Header/Header";
import { StoreInitializer } from "@/store/StoreInitializer";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { roboto } from "@/shared/fonts/fonts";

export const metadata: Metadata = {
  title: "Food App",
  description: "Recipes, favorites and menu planning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={roboto.variable}>
        <RootStoreProvider>
          <StoreInitializer>
            <Header />
            <main>{children}</main>
          </StoreInitializer>
        </RootStoreProvider>
      </body>
    </html>
  );
}
