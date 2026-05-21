const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const contentDir = path.join(root, "content");
const srcDir = path.join(root, "src");
const distDir = path.join(root, "dist");
const docs = [
  {
    slug: "guide",
    title: "Guide",
    description: "Book-style Claude Code guide",
    file: "content/claude-code-guide.md",
  },
  {
    slug: "commands",
    title: "Commands and Cases",
    description: "CLI, slash commands, Goal, Hooks, MCP, and cases",
    file: "content/commands-and-cases.md",
  },
  {
    slug: "skills",
    title: "Skills and Plugins",
    description: "Superpowers, GSD, Codex plugin, MCP, and community practice",
    file: "content/skills-and-plugins.md",
  },
  {
    slug: "examples",
    title: "Templates",
    description: "AGENTS.md, review, CI, hook, and skill templates",
    file: "content/examples.md",
  },
  {
    slug: "sources",
    title: "Sources",
    description: "Official, GitHub, X, LinuxDO, Reddit, and other references",
    file: "content/sources.md",
  },
];

const generatedAt = new Date().toISOString();
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[`~!@#$%^&*()+=[\]{};:'",.<>/?\\|，。！？：；（）【】《》、]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);

function splitSections(content) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const sections = [];
  let inCode = false;
  let current = {
    slug: "overview",
    title: "概览",
    level: 1,
    content: [],
  };
  let seenFirstHeading = false;

  for (const line of lines) {
    if (line.startsWith("```")) {
      inCode = !inCode;
      current.content.push(line);
      continue;
    }

    const match = inCode ? null : line.match(/^(#{1,2})\s+(.+)$/);
    if (match && seenFirstHeading) {
      sections.push({
        ...current,
        content: current.content.join("\n").trim(),
      });
      const title = match[2].trim();
      current = {
        slug: slugify(title) || `section-${sections.length + 1}`,
        title,
        level: match[1].length,
        content: [line],
      };
      continue;
    }

    if (match && !seenFirstHeading) {
      seenFirstHeading = true;
      const title = match[2].trim();
      current = {
        slug: "overview",
        title,
        level: match[1].length,
        content: [line],
      };
      continue;
    }

    current.content.push(line);
  }

  if (current.content.join("\n").trim()) {
    sections.push({
      ...current,
      content: current.content.join("\n").trim(),
    });
  }

  const used = new Map();
  return sections.map((section) => {
    const count = used.get(section.slug) || 0;
    used.set(section.slug, count + 1);
    const sectionSlug = count ? `${section.slug}-${count + 1}` : section.slug;
    return {
      ...section,
      docSlug: "",
      sectionSlug,
      slug: sectionSlug,
      sourceFile: "",
      sectionIndex: 0,
    };
  });
}

const payload = docs.map((doc) => {
  const filePath = path.join(root, doc.file);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing document: ${doc.file}`);
  }

  const content = fs.readFileSync(filePath, "utf8");
  const sections = splitSections(content).map((section, index) => ({
    ...section,
    docSlug: doc.slug,
    sourceFile: doc.file,
    sectionIndex: index,
  }));

  return {
    ...doc,
    updatedAt: generatedAt,
    content,
    sections,
  };
});

const output = `window.DOCS = ${JSON.stringify(payload)};\n`;
fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
for (const file of ["index.html", "app.js", "styles.css"]) {
  fs.copyFileSync(path.join(srcDir, file), path.join(distDir, file));
}
fs.copyFileSync(path.join(root, "README.md"), path.join(distDir, "README.md"));
fs.copyFileSync(path.join(root, ".nojekyll"), path.join(distDir, ".nojekyll"));
fs.copyFileSync(path.join(srcDir, "404.html"), path.join(distDir, "404.html"));
fs.writeFileSync(path.join(distDir, "docs-data.js"), output, "utf8");
console.log(`Generated dist/ from ${payload.length} Markdown files.`);
