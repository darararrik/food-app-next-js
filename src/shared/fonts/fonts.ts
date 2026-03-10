import localFont from "next/font/local";

export const roboto = localFont({
  src: [
    {
      path: "../static/Roboto/Roboto-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../static/Roboto/Roboto-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../static/Roboto/Roboto-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
  display: "swap",
});
