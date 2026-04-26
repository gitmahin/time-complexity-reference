import { MDXDisplay } from "@/components/mdx";
import Image from "next/image";

export default function Home() {
  const  filePath = `src/content/home.mdx`;

  return <MDXDisplay filePath={filePath}  />;
}
