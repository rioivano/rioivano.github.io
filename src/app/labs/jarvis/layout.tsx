import type { Metadata } from "next";
import { SaasShell } from "../_shared/shell";
import { JARVIS } from "../_shared/brands";

export const metadata: Metadata = {
  title: "Jarvis Mode — Live Motion Particles",
  description:
    "Jarvis Mode turns on your camera and lets a field of particles swarm and reshape to follow your every movement — real-time motion tracking in the browser. A demo by Rio Ivano.",
};

export default function JarvisLayout({ children }: { children: React.ReactNode }) {
  return <SaasShell brand={JARVIS}>{children}</SaasShell>;
}
