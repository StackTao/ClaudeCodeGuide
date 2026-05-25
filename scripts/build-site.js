const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "src");
const distDir = path.join(root, "dist");
const docs = [
  {
    slug: "guide",
    title: "Guide",
    description: "Book-style Claude Code guide",
    directory: "content/guide",
  },
  {
    slug: "commands",
    title: "Commands and Cases",
    description: "CLI, slash commands, Goal, Hooks, MCP, and cases",
    directory: "content/commands",
  },
  {
    slug: "skills",
    title: "Skills and Plugins",
    description: "Superpowers, GSD, Codex plugin, MCP, and community practice",
    directory: "content/skills",
  },
  {
    slug: "examples",
    title: "Templates",
    description: "AGENTS.md, review, CI, hook, and skill templates",
    directory: "content/examples",
  },
  {
    slug: "sources",
    title: "Sources",
    description: "Official, GitHub, X, LinuxDO, Reddit, and other references",
    directory: "content/sources",
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

function listMarkdownFiles(directory) {
  const directoryPath = path.join(root, directory);
  if (!fs.existsSync(directoryPath)) {
    throw new Error(`Missing document directory: ${directory}`);
  }

  return fs
    .readdirSync(directoryPath)
    .filter((file) => file.endsWith(".md"))
    .sort((left, right) => left.localeCompare(right, "zh-CN", { numeric: true }))
    .map((file) => path.join(directory, file).replace(/\\/g, "/"));
}

function readDocEntries(doc) {
  return listMarkdownFiles(doc.directory).map((file) => ({
    file,
    content: fs.readFileSync(path.join(root, file), "utf8"),
  }));
}

function splitSections(entries) {
  const sections = [];
  let inCode = false;
  let current = {
    slug: "overview",
    title: "概览",
    level: 1,
    content: [],
    sourceFile: entries[0]?.file || "",
  };
  let seenFirstHeading = false;

  for (const entry of entries) {
    const lines = entry.content.replace(/\r\n/g, "\n").split("\n");

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
          sourceFile: entry.file,
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
          sourceFile: entry.file,
        };
        continue;
      }

      current.content.push(line);
    }
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
      sectionIndex: 0,
    };
  });
}

const payload = docs.map((doc) => {
  const entries = readDocEntries(doc);
  const content = entries.map((entry) => entry.content.trim()).join("\n\n");
  const sections = splitSections(entries).map((section, index) => ({
    ...section,
    docSlug: doc.slug,
    sectionIndex: index,
  }));

  return {
    ...doc,
    file: doc.directory,
    files: entries.map((entry) => entry.file),
    updatedAt: generatedAt,
    content,
    sections,
  };
});

const output = `window.DOCS = ${JSON.stringify(payload)};\n`;
fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
for (const file of ["index.html", "app.js", "styles.css", "icon.svg", "favicon.ico"]) {
  fs.copyFileSync(path.join(srcDir, file), path.join(distDir, file));
}
fs.copyFileSync(path.join(root, "README.md"), path.join(distDir, "README.md"));
fs.copyFileSync(path.join(root, ".nojekyll"), path.join(distDir, ".nojekyll"));
fs.copyFileSync(path.join(srcDir, "404.html"), path.join(distDir, "404.html"));
fs.writeFileSync(path.join(distDir, "docs-data.js"), output, "utf8");
console.log(`Generated dist/ from ${payload.reduce((total, doc) => total + doc.files.length, 0)} Markdown files.`);
