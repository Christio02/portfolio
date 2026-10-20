import type { ReactNode } from "react";

// Matches [label](https://example.com)
const MARKDOWN_LINK_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

const renderBulletWithLinks = (text: string): ReactNode[] => {
  const elements: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(MARKDOWN_LINK_PATTERN)) {
    const [fullMatch, label, href] = match;
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      elements.push(text.slice(lastIndex, matchIndex));
    }

    elements.push(
      <a
        key={matchIndex}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-2 hover:opacity-80"
      >
        {label}
      </a>,
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
};

export default renderBulletWithLinks;
