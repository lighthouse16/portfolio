import katex from "katex";

interface MathProps {
  math: string;
  block?: boolean;
}

export function Math({ math, block = false }: MathProps) {
  const html = katex.renderToString(math, {
    displayMode: block,
    throwOnError: false,
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
