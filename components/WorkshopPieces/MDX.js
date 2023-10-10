import { useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";

function useMDX(content) {
  const [exports, setExports] = useState({ default: runtime.Fragment });

  useEffect(() => {
    evaluate(content, { ...runtime }).then((exports) => setExports(exports));
  }, [content]);

  return exports;
}

export default function MDX({ mdxContent }) {
  const exports = useMDX(mdxContent);
  const Content = exports.default;
  return <Content />;
}
