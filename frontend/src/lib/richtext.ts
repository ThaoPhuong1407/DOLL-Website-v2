export function renderRichText(content?: string | null) {
  if (!content) return "";

  // If it already has valid list tags, trust it as HTML
  if (/<(ul|ol|li)[^>]*>/i.test(content)) return content;

  // Normalize common artifacts from copy/paste or WYSIWYG exports
  const cleaned = content
    .replace(/<\/?(ul|ol)>/gi, "")
    .replace(/<\/li>/gi, "")
    .replace(/<br\s*\/?>(\r?\n)?/gi, "\n")
    .replace(/&nbsp;/gi, " ")
    .replace(/<\/?(p|div)>/gi, "\n")
    .replace(/\r\n/g, "\n");

  const lines = cleaned.split(/\n/);
  const blocks: string[] = [];
  let listBuffer: string[] | null = null;

  const flushList = () => {
    if (listBuffer && listBuffer.length) {
      blocks.push(`<ul>${listBuffer.map((li) => `<li>${li}</li>`).join("")}</ul>`);
    }
    listBuffer = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Headings written as **Heading**
    const headingMatch = trimmed.match(/^\*\*(.+)\*\*$/);
    if (headingMatch) {
      flushList();
      blocks.push(`<h3>${formatInline(headingMatch[1])}</h3>`);
      continue;
    }

    // Bullet lines starting with - or *
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const item = trimmed.slice(2).trim();
      if (!listBuffer) listBuffer = [];
      listBuffer.push(formatInline(item));
      continue;
    }

    flushList();
    blocks.push(`<p>${formatInline(trimmed)}</p>`);
  }
  flushList();

  return blocks.join("");
}

function formatInline(text: string) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/_([^_]+)_/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}
