import React from "react";

import Markdown from "react-markdown";
import { allPlugins, rehypePlugins, remarkPlugins } from "./pluginSet";



export interface ContentProps {
  /** Hypertext to render. */
  children?: string | null | undefined;
};

export const Content = ({
  children,
  remarkPlugins,
  rehypePlugins,
  ...props
}: ContentProps & React.ComponentProps<typeof Markdown>) => {
  const textToProcess = children?.replace("\n", "\n\n");
  return <Markdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins} {...props}>{textToProcess}</Markdown>
}

Content.DefaultRemarkPlugins = remarkPlugins;
Content.DefaultRehypePlugins = rehypePlugins;
Content.DefaultPlugins = allPlugins;