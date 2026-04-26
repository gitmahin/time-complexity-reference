import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import matter from "gray-matter";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import fs from "fs/promises";
import { mdxToHtml } from "@/lib/mdxToHtml";
import React from "react";
import { Metadata } from "next";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DATA_OF_ALL_LANG_COMPLEXITY,
  listOfProgrammingLanguagesWithLinks,
} from "@/constants";
import { MDXDisplay } from "@/components/mdx";

type LangPagePropsType = {
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return listOfProgrammingLanguagesWithLinks.map((item) => ({
    lang: item.link.slice(1),
  }));
}

export async function generateMetadata({
  params,
}: LangPagePropsType): Promise<Metadata> {
  const { lang } = await params;
  const filePath = `src/content/${lang}.mdx`;
  let fileContent: string | null = null;

  try {
    fileContent = await fs.readFile(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      title: data.title,
    };
  } catch (error) {
    return {
      title: "No content",
    };
  }
}

export default async function LangPage({ params }: LangPagePropsType) {
  const { lang } = await params;
  const filePath = `src/content/${lang}.mdx`;
  //   -- Get specific data based on programming language
  const langData = DATA_OF_ALL_LANG_COMPLEXITY[lang];
  return <MDXDisplay filePath={filePath} langData={langData} />;
}
