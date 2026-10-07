import localFont from "next/font/local";

export const SpaceGrotesk = localFont({
  src: [
    {
      path: "../../../../public/fonts/SpaceGrotesk-Regular.woff2",
      weight: "400",
    },
  ],
  variable: "--font-space-grotesk",
});
