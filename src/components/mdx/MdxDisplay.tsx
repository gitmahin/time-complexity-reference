import matter from "gray-matter";
import fs from "fs/promises";
import { LangData } from "@/constants";
import { mdxToHtml } from "@/lib/mdxToHtml";
import { EmptyMdx } from "./EmptyMdx";

type MDXDisplayPropsType = {
  filePath: string;
  langData?: LangData;
};

export const MDXDisplay = async ({
  filePath,
  langData,
}: MDXDisplayPropsType) => {
  let fileContent: string | null = null;
  let MDxComponent: React.ReactElement | null = null;

  try {
    fileContent = await fs.readFile(filePath, "utf-8");
    const { content } = matter(fileContent);
    MDxComponent = await mdxToHtml(content, langData);
  } catch (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <EmptyMdx />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-5 py-20">
      <div className="max-w-[700px] w-full mx-auto">
        <article className="prose  prose-gray dark:prose-invert ">
          {MDxComponent}
        </article>
      </div>
    </div>
  );
};
