import React from "react";
import {
  BlocksRenderer as StrapiBlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

type BlocksRendererProps = {
  content: BlocksContent | unknown;
};

// Thin wrapper so we can keep local imports while delegating the heavy lifting to Strapi's renderer.
export function BlocksRenderer({ content }: BlocksRendererProps) {
  if (!content) return null;
  return <StrapiBlocksRenderer content={content as BlocksContent} />;
}

export default BlocksRenderer;
