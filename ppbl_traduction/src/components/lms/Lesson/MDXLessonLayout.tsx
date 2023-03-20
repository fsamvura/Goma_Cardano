import { Box, Button, IconButton, useClipboard } from "@chakra-ui/react";
import * as React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FaCopy } from "react-icons/fa";
import type { ReactNode } from 'react';
import { MDXProvider } from "@mdx-js/react";
import { Components } from "@mdx-js/react/lib";

type CodeProps = {
  node: {
    meta: string;
  };
  inline: boolean;
  className: string;
  children: string;
};

type mdxComponents = {
  code: ({ node, inline, className, children, ...props }: CodeProps) => ReactNode;
  // add other components here as needed
};

export const components: mdxComponents = {
  code: ({ node, inline, className, children, ...props }: CodeProps): ReactNode => {
    const match = /language-(\w+)/.exec(className || '');
    // const { onCopy, hasCopied } = useClipboard(children);

    return !inline && match ? (
      <Box pos="relative">
        {/* <IconButton
          pos="absolute"
          top="1rem"
          right="1rem"
          size="sm"
          icon={<FaCopy />}
          aria-label="Copy code"
          onClick={onCopy}
          isDisabled={hasCopied}
        />
        <SyntaxHighlighter
          language={match[1]}
          style={dracula}
          PreTag="div"
          children={String(children).replace(/\n$/, '')}
          {...props}
        /> */}
      </Box>
    ) : (
      <code className={className} {...props}>
        {/* <SyntaxHighlighter
          language={match ? match[1] : undefined}
          style={nord}
          PreTag="span"
          children={children.replace(/\n$/, '')}
          customStyle={{ fontSize: "medium", paddingTop: "0.2em", paddingBottom: "0.2em", paddingLeft: "0.5em", paddingRight: "0.5em" }}
        /> */}
      </code>
    );
  },
  // add other components here as needed
};

type Props = {
  children?: React.ReactNode;
};
const MDXLessonLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box w="80%" p="5" className="mdx-content">
      <MDXProvider components={components as Components}>
        {children}
      </MDXProvider>
    </Box>
  );
};

export default MDXLessonLayout;
