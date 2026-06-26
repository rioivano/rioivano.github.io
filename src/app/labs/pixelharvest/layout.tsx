import type { Metadata } from "next";
import { SaasShell } from "../_shared/shell";
import { PIXELHARVEST } from "../_shared/brands";

export const metadata: Metadata = {
  title: "PixelHarvest — Pull Every Image From Any Page",
  description:
    "PixelHarvest scrapes every image from any public web page — right in your browser. Preview, filter, and grab image URLs in one click. A demo SaaS built by Rio Ivano.",
};

export default function PixelHarvestLayout({ children }: { children: React.ReactNode }) {
  return <SaasShell brand={PIXELHARVEST}>{children}</SaasShell>;
}
