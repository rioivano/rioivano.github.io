import type { Metadata } from "next";
import { SaasShell } from "../_shared/shell";
import { COPYFORGE } from "../_shared/brands";

export const metadata: Metadata = {
  title: "CopyForge — AI Copywriting Studio",
  description:
    "CopyForge is an AI copywriting studio that forges scroll-stopping headlines, taglines, and ad copy in seconds. A demo SaaS built by Rio Ivano.",
};

export default function CopyForgeLayout({ children }: { children: React.ReactNode }) {
  return <SaasShell brand={COPYFORGE}>{children}</SaasShell>;
}
