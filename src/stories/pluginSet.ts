import Markdown from "react-markdown";
import remarkMath from 'remark-math';
import callouts from 'remark-callouts';
import remarkParse from 'remark-parse';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
// @ts-ignore
import remarkMermaid from 'remark-mermaid-plugin';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import rehypeTypography from './rehypeTypographyPlugin';
import React from 'react';


// @ts-ignore
export const remarkPlugins: React.ComponentProps<typeof Markdown>['remarkPlugins'] = [remarkMath, callouts, remarkParse, remarkGfm, remarkMermaid];
export const rehypePlugins: React.ComponentProps<typeof Markdown>['rehypePlugins'] = [rehypeKatex, rehypeRaw, rehypeStringify, rehypeTypography];
export const allPlugins = {
    remarkPlugins: remarkPlugins,
    rehypePlugins: rehypePlugins
};
