import "@/shared/styles/global.scss";
import { RootStoreProvider } from "@/store/RootStoreProvider";
import Header from "@/components/client/Header/Header";
import { StoreInitializer } from "@/store/StoreInitializer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
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
