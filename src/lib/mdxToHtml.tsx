import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import React, { type ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { ComplexityView, DataTypeTabs } from "@/components/mdx";
import { LangData } from "@/constants";
import {
  transformerNotationHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationWordHighlight,
  transformerNotationFocus,
} from "@shikijs/transformers";
import { Badge } from "@/components/ui/badge";

type AnchorProps = ComponentPropsWithoutRef<"a"> & {
  children: React.ReactNode;
};

type PreTagProps = ComponentPropsWithoutRef<"pre">;

type CodeElementProps = {
  children?: React.ReactNode;
  className?: string;
  ["data-language"]?: string;
};

export const mdxToHtml = async (content: string, data?: LangData) => {
  const { content: MdxComponent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: {
                dark: "github-dark-high-contrast",
                light: "github-light-high-contrast",
              },
              transformers: [
                transformerNotationDiff(),
                transformerNotationHighlight(),
                transformerNotationErrorLevel(),
                transformerNotationWordHighlight(),
                transformerNotationFocus(),
              ],
            },
          ],
        ],
      },
    },
    components: {
      a: ({ href, children, ...props }: AnchorProps) => {
        const className =
          "text-text-color_1 hover:text-text-color_2 underline underline-offset-2 decoration-text-color_1 transition-colors hover:decoration-text-color_2";
        if (typeof href === "string" && href.startsWith("/")) {
          return (
            <Link href={href} className={className}>
              {children}
            </Link>
          );
        }
        return (
          <a
            href={typeof href === "string" ? href : undefined}
            target="_blank"
            rel="noopener noreferrer group"
            className={`${className} inline-flex`}
            {...props}
          >
            {children}

            <ExternalLink
              size={14}
              className="pl-0.5 group-hover:text-blue-600!"
            />
          </a>
        );
      },
      code: ({ children, ...props }: CodeElementProps) => {
        return (
          <code
            {...props}
            className="bg-zinc-800 px-1.5 py-[1px] rounded border"
          >
            {children}
          </code>
        );
      },
      pre: ({ children, ...props }: PreTagProps) => {
        const codeElement = React.Children.only(
          children
        ) as React.ReactElement<CodeElementProps>;
        const language = codeElement?.props?.["data-language"] ?? "bash";

        return (
          <div className="relative">
            <Badge variant={"outline"} className="absolute top-2 right-2 z-10">
              {language}
            </Badge>
            <pre
              {...props}
              className="bg-(--shiki-dark-bg) next-mdx-remote-codeblock  p-0"
            >
              {children}
            </pre>
          </div>
        );
      },
      ButtonGroup,
      Button,
      ComplexityView: (props) => <ComplexityView {...props} data={data} />,
      DataTypeTabs: (props) => (
        <DataTypeTabs {...props} tabs={data ? Object.keys(data) : {}} />
      ),
    },
  });

  return MdxComponent;
};
