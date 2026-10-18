import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KitHomes — Find a place that feels like home",
  description: "Discover verified homes, connect directly with landlords, and find compatible roommates across Nigeria. A T3kit product.",
  applicationName: "KitHomes",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "KitHomes" }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f3b3f"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
