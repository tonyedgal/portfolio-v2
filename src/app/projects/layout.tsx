import { ProjectQueryProvider } from "@/components/ProjectQueryProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ProjectQueryProvider>{children}</ProjectQueryProvider>;
}
