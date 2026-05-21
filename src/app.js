const SITE_CONFIG = {
  title: "Claude Code 中文技巧与工具共建知识库",
  githubRepo: "StackTao/ClaudeCodeGuide",
  githubBranch: "main",
  githubPages: "https://stacktao.github.io/ClaudeCodeGuide/",
};

const DOC_LABELS = {
  guide: {
    title: "主指南",
    description: "社区共建的 Claude Code 使用技巧、工具和实战工作流",
  },
  commands: {
    title: "命令与案例",
    description: "CLI、Slash 命令、Goal、Hooks、MCP 和真实案例",
  },
  skills: {
    title: "Skills 与插件",
    description: "Superpowers、Skills、插件、MCP 与社区工具清单",
  },
  examples: {
    title: "模板附录",
    description: "可复制的 Prompt、AGENTS.md、Review、CI 和 Hook 模板",
  },
  sources: {
    title: "来源索引",
    description: "官方、GitHub、X、LinuxDO、Reddit 与社区来源",
  },
};

const state = {
  currentDocSlug: "",
  currentSectionSlug: "",
  headings: [],
  githubBranch: SITE_CONFIG.githubBranch,
};

const byId = (id) => document.getElementById(id);

function applyTheme(theme) {
  const resolved =
    theme ||
    localStorage.getItem("cc-guide-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = resolved;
  localStorage.setItem("cc-guide-theme", resolved);
  if (byId("themeButton")) byId("themeButton").textContent = resolved === "dark" ? "☼" : "◐";
}

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[`~!@#$%^&*()+=[\]{};:'",.<>/?\\|，。！？：；（）【】《》、]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const inlineMarkdown = (text) => {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  return html;
};

function highlightText(text, query) {
  const escaped = escapeHtml(text);
  const normalized = query.trim();
  if (!normalized) return escaped;
  const safeQuery = normalized.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return escaped.replace(new RegExp(safeQuery, "gi"), (match) => `<mark>${match}</mark>`);
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  state.headings = [];
  let inCode = false;
  let code = [];
  let inTable = false;
  let table = [];
  let listType = null;
  let paragraph = [];
  let blockquote = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushBlockquote = () => {
    if (!blockquote.length) return;
    html.push(`<blockquote>${blockquote.map((line) => `<p>${inlineMarkdown(line)}</p>`).join("")}</blockquote>`);
    blockquote = [];
  };

  const flushList = () => {
    if (!listType) return;
    html.push(`</${listType}>`);
    listType = null;
  };

  const flushTable = () => {
    if (!inTable) return;
    const rows = table.filter((row) => !/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(row));
    const rendered = rows
      .map((row, index) => {
        const cells = row
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((cell) => `<${index === 0 ? "th" : "td"}>${inlineMarkdown(cell.trim())}</${index === 0 ? "th" : "td"}>`)
          .join("");
        return `<tr>${cells}</tr>`;
      })
      .join("");
    html.push(`<table>${rendered}</table>`);
    table = [];
    inTable = false;
  };

  const closeBlocks = () => {
    flushParagraph();
    flushBlockquote();
    flushList();
    flushTable();
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      closeBlocks();
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        code = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      code.push(line);
      continue;
    }

    if (/^\|.+\|$/.test(line.trim())) {
      flushParagraph();
      flushBlockquote();
      flushList();
      inTable = true;
      table.push(line);
      continue;
    }

    if (inTable) flushTable();

    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      closeBlocks();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const idBase = slugify(text) || `section-${state.headings.length + 1}`;
      const id = state.headings.some((heading) => heading.id === idBase)
        ? `${idBase}-${state.headings.length + 1}`
        : idBase;
      state.headings.push({ level, text, id });
      html.push(`<h${level} id="${id}">${inlineMarkdown(text)}</h${level}>`);
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      flushParagraph();
      flushBlockquote();
      if (listType !== "ul") {
        flushList();
        listType = "ul";
        html.push("<ul>");
      }
      html.push(`<li>${inlineMarkdown(line.replace(/^\s*[-*]\s+/, ""))}</li>`);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      flushParagraph();
      flushBlockquote();
      if (listType !== "ol") {
        flushList();
        listType = "ol";
        html.push("<ol>");
      }
      html.push(`<li>${inlineMarkdown(line.replace(/^\s*\d+\.\s+/, ""))}</li>`);
      continue;
    }

    if (/^>\s?/.test(line)) {
      flushParagraph();
      flushList();
      blockquote.push(line.replace(/^>\s?/, ""));
      continue;
    }

    if (!line.trim()) {
      closeBlocks();
      continue;
    }

    flushBlockquote();
    flushList();
    paragraph.push(line.trim());
  }

  closeBlocks();
  if (inCode) html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
  return html.join("\n");
}

function docBySlug(slug) {
  return window.DOCS.find((doc) => doc.slug === slug) || window.DOCS[0];
}

function sectionBySlug(doc, sectionSlug) {
  return doc.sections?.find((section) => section.slug === sectionSlug) || doc.sections?.[0];
}

function displayDoc(doc) {
  return {
    ...doc,
    title: DOC_LABELS[doc.slug]?.title || doc.title,
    description: DOC_LABELS[doc.slug]?.description || doc.description,
  };
}

function githubUrl(path = "") {
  return `https://github.com/${SITE_CONFIG.githubRepo}${path}`;
}

function setText(id, text) {
  const element = byId(id);
  if (element) element.textContent = text;
}

function renderNav() {
  byId("docNav").innerHTML = window.DOCS.map(
    (rawDoc) => {
      const doc = displayDoc(rawDoc);
      const sections = (doc.sections || [])
        .map(
          (section) => `
            <button class="section-item" data-doc="${doc.slug}" data-section="${section.slug}" type="button">
              ${escapeHtml(section.title.replace(/`/g, ""))}
            </button>
          `,
        )
        .join("");
      return `
        <div class="nav-group" data-group="${doc.slug}">
          <button class="nav-item" data-doc="${doc.slug}" type="button">
            <strong>${escapeHtml(doc.title)}</strong>
            <span>${escapeHtml(doc.description)}</span>
          </button>
          <div class="section-list">${sections}</div>
        </div>
    `;
    },
  ).join("");

  byId("docNav").addEventListener("click", (event) => {
    const sectionButton = event.target.closest("[data-section]");
    if (sectionButton) {
      navigate(sectionButton.dataset.doc, sectionButton.dataset.section);
      byId("sidebar").classList.remove("open");
      return;
    }

    const button = event.target.closest("[data-doc]");
    if (!button) return;
    const doc = docBySlug(button.dataset.doc);
    navigate(doc.slug, doc.sections?.[0]?.slug || "overview");
    byId("sidebar").classList.remove("open");
  });
}

function renderToc() {
  const tocItems = state.headings
    .filter((heading) => heading.level >= 2 && heading.level <= 3)
    .map(
      (heading) =>
        `<button class="toc-h${heading.level}" data-heading="${escapeHtml(heading.id)}" type="button">${escapeHtml(heading.text.replace(/`/g, ""))}</button>`,
    )
    .join("");
  byId("toc").innerHTML = `<div class="toc-title">本页目录</div>${tocItems}`;
}

function sectionBody(section) {
  const lines = section.content.split("\n");
  if (/^#{1,2}\s+/.test(lines[0] || "")) {
    return lines.slice(1).join("\n").trim();
  }
  return section.content;
}

function renderDoc(docSlug, sectionSlug) {
  const doc = displayDoc(docBySlug(docSlug));
  const section = sectionBySlug(doc, sectionSlug);
  state.currentDocSlug = doc.slug;
  state.currentSectionSlug = section.slug;
  document.title = `${section.title} - ${doc.title} - ${SITE_CONFIG.title}`;
  byId("docMeta").innerHTML = `
    <div class="breadcrumb">${escapeHtml(doc.title)} / ${escapeHtml(section.title.replace(/`/g, ""))}</div>
    <h1>${escapeHtml(section.title.replace(/`/g, ""))}</h1>
    <p>${escapeHtml(doc.description)}</p>
    <div class="section-progress">
      <span>第 ${(doc.sections || []).findIndex((item) => item.slug === section.slug) + 1} / ${(doc.sections || []).length} 节</span>
      <span>最后构建：${escapeHtml(new Date(doc.updatedAt).toLocaleDateString())}</span>
      <span>来源可信度：分层标注</span>
    </div>
  `;
  byId("articleContent").innerHTML = renderMarkdown(sectionBody(section));
  renderToc();
  renderIssues();
  document.querySelectorAll(".nav-group").forEach((item) => item.classList.toggle("open", item.dataset.group === doc.slug));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.doc === doc.slug));
  document.querySelectorAll(".section-item").forEach((item) =>
    item.classList.toggle("active", item.dataset.doc === doc.slug && item.dataset.section === section.slug),
  );
  renderPager(doc, section);
  updateIssueLinks();
  updateGithubLinks();
}

function renderPager(doc, section) {
  const sections = doc.sections || [];
  const index = sections.findIndex((item) => item.slug === section.slug);
  const previous = sections[index - 1];
  const next = sections[index + 1];
  const pager = document.createElement("nav");
  pager.className = "section-pager";
  pager.innerHTML = `
    ${
      previous
        ? `<button class="pager-card" data-doc="${doc.slug}" data-section="${previous.slug}" type="button"><span>上一节</span><strong>${escapeHtml(previous.title.replace(/`/g, ""))}</strong></button>`
        : `<span></span>`
    }
    ${
      next
        ? `<button class="pager-card next" data-doc="${doc.slug}" data-section="${next.slug}" type="button"><span>下一节</span><strong>${escapeHtml(next.title.replace(/`/g, ""))}</strong></button>`
        : `<span></span>`
    }
  `;
  const article = byId("articleContent");
  article.querySelector(".section-pager")?.remove();
  article.appendChild(pager);
}

function parseRoute() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const doc = docBySlug(parts[0]);
  return {
    docSlug: doc.slug,
    sectionSlug: parts[1] || doc.sections?.[0]?.slug || "overview",
  };
}

function navigate(docSlug, sectionSlug) {
  history.pushState(null, "", `#/${docSlug}/${sectionSlug}`);
  byId("searchInput").value = "";
  byId("searchResults").hidden = true;
  renderDoc(docSlug, sectionSlug);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function currentDoc() {
  return displayDoc(docBySlug(state.currentDocSlug));
}

function currentSection() {
  return sectionBySlug(currentDoc(), state.currentSectionSlug);
}

function buildIssueBody() {
  const doc = currentDoc();
  const section = currentSection();
  const feedbackType = byId("feedbackType")?.value || "文档反馈";
  const body = byId("commentBody").value.trim() || "请在这里描述发现的错误、建议修改内容和参考来源。";
  return [
    `## 反馈类型`,
    feedbackType,
    "",
    `## 文档位置`,
    `- 页面：${doc.title}`,
    `- 章节：${section.title}`,
    `- 文件：${doc.file}`,
    `- 页面链接：${location.href}`,
    `- 章节标识：${doc.slug}/${section.slug}`,
    "",
    "## 问题或建议",
    body,
    "",
    "## 期望修改",
    "- [ ] 修正事实错误",
    "- [ ] 补充来源",
    "- [ ] 更新示例",
    "- [ ] 改善表达",
  ].join("\n");
}

function updateIssueLinks() {
  const doc = currentDoc();
  const section = currentSection();
  const feedbackType = byId("feedbackType")?.value || "文档反馈";
  const titleText = `[${feedbackType}] ${doc.title} / ${section.title}`;
  const title = encodeURIComponent(titleText);
  const body = encodeURIComponent(buildIssueBody());
  const labels = encodeURIComponent("documentation,feedback");
  const issueUrl = githubUrl(`/issues/new?title=${title}&body=${body}&labels=${labels}`);
  const query = encodeURIComponent(`repo:${SITE_CONFIG.githubRepo} is:issue "${doc.slug}/${section.slug}"`);
  byId("openIssue").href = issueUrl;
  byId("issueTopLink").href = issueUrl;
  byId("searchIssues").href = githubUrl(`/issues?q=${query}`);
}

function updateGithubLinks() {
  const doc = currentDoc();
  const section = currentSection();
  const branch = state.githubBranch || SITE_CONFIG.githubBranch;
  const githubTopLink = byId("githubTopLink");
  const githubSidebarLink = byId("githubSidebarLink");
  const githubRepoLink = byId("githubRepoLink");
  const githubPagesLink = byId("githubPagesLink");
  const githubActionsLink = byId("githubActionsLink");
  const githubEditLink = byId("githubEditLink");
  const githubHistoryLink = byId("githubHistoryLink");

  if (githubTopLink) githubTopLink.href = githubUrl("");
  if (githubSidebarLink) githubSidebarLink.href = githubUrl("");
  if (githubRepoLink) githubRepoLink.href = githubUrl("");
  if (githubPagesLink) githubPagesLink.href = SITE_CONFIG.githubPages;
  if (githubActionsLink) githubActionsLink.href = githubUrl("/actions/workflows/pages.yml");
  if (githubEditLink) {
    githubEditLink.href = githubUrl(`/edit/${branch}/${doc.file}`);
    githubEditLink.title = `编辑 ${doc.file} / ${section.title}`;
  }
  if (githubHistoryLink) {
    githubHistoryLink.href = githubUrl(`/commits/${branch}/${doc.file}`);
    githubHistoryLink.title = `查看 ${doc.file} 的提交历史`;
  }
}

async function loadGithubStatus() {
  const status = byId("githubStatusText");
  if (status) status.textContent = "正在检查远端更新...";
  try {
    const repoResponse = await fetch(`https://api.github.com/repos/${SITE_CONFIG.githubRepo}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!repoResponse.ok) throw new Error(`仓库信息 HTTP ${repoResponse.status}`);
    const repo = await repoResponse.json();
    const branch = repo.default_branch || SITE_CONFIG.githubBranch;
    state.githubBranch = branch;
    updateGithubLinks();
    setText("githubPagesText", repo.has_pages ? `GitHub Pages 已启用：${SITE_CONFIG.githubPages}` : "GitHub Pages 尚未启用：推送后请在仓库 Settings > Pages 选择 GitHub Actions。");

    const response = await fetch(`https://api.github.com/repos/${SITE_CONFIG.githubRepo}/commits/${branch}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const sha = data.sha.slice(0, 7);
    const date = new Date(data.commit.committer.date).toLocaleString("zh-CN");
    const message = data.commit.message.split("\n")[0];
    if (status) status.textContent = `${branch} @ ${sha} · ${date} · ${message}`;
  } catch (error) {
    if (status) status.textContent = `无法读取实时状态，可直接打开仓库查看：${error.message}`;
    setText("githubPagesText", `线上站点地址：${SITE_CONFIG.githubPages}`);
  }
}

async function copyText(text) {
  await navigator.clipboard.writeText(text);
  showToast("已复制");
}

function showToast(message) {
  const toast = byId("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function issueSearchQuery() {
  const doc = currentDoc();
  const section = currentSection();
  return `"${doc.slug}/${section.slug}"`;
}

async function renderIssues() {
  const list = byId("issueList");
  if (!list) return;
  list.innerHTML = `<p class="empty">正在读取 GitHub 相关反馈...</p>`;
  const query = encodeURIComponent(`repo:${SITE_CONFIG.githubRepo} is:issue ${issueSearchQuery()}`);
  try {
    const response = await fetch(`https://api.github.com/search/issues?q=${query}&per_page=5`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    list.innerHTML = data.items?.length
      ? data.items
          .map(
            (issue) => `
              <a class="issue-item" href="${issue.html_url}" target="_blank" rel="noreferrer">
                <span>#${issue.number} · ${escapeHtml(issue.state === "open" ? "开放" : "已关闭")}</span>
                <strong>${escapeHtml(issue.title)}</strong>
              </a>
            `,
          )
          .join("")
      : `<p class="empty">暂无关联 Issue。你可以用上方按钮提交本节反馈。</p>`;
  } catch (error) {
    const fallback = byId("searchIssues")?.href || githubUrl("/issues");
    list.innerHTML = `<p class="empty">无法读取 GitHub Issue：${escapeHtml(error.message)}。<a href="${fallback}" target="_blank" rel="noreferrer">打开 GitHub 搜索</a></p>`;
  }
}

function searchDocs(query) {
  const normalized = query.trim().toLowerCase();
  const panel = byId("searchResults");
  if (!normalized) {
    panel.hidden = true;
    return;
  }

  const results = [];
  for (const doc of window.DOCS) {
    const viewDoc = displayDoc(doc);
    for (const section of doc.sections || []) {
      const lower = section.content.toLowerCase();
      const index = lower.indexOf(normalized);
      if (index >= 0 || viewDoc.title.toLowerCase().includes(normalized) || section.title.toLowerCase().includes(normalized)) {
        const start = Math.max(0, index - 70);
        const excerpt = index >= 0 ? section.content.slice(start, index + 160).replace(/\s+/g, " ") : viewDoc.description;
        results.push({ doc: viewDoc, section, excerpt });
      }
    }
  }

  panel.hidden = false;
  panel.innerHTML = results.length
    ? `
        <div class="search-results-head">
          <span>搜索结果</span>
          <strong>${results.length}</strong>
        </div>
        ${results
          .slice(0, 8)
          .map(
            ({ doc, section, excerpt }) => `
            <div class="result-item" data-doc="${doc.slug}" data-section="${section.slug}">
              <strong>${escapeHtml(doc.title)} / ${escapeHtml(section.title.replace(/`/g, ""))}</strong>
              <p>${highlightText(excerpt, query)}</p>
            </div>
          `,
          )
          .join("")}
      `
    : `<div class="search-empty"><strong>没有找到匹配内容</strong><span>可以试试命令名、插件名、MCP、Superpowers、Goal。</span></div>`;
}

function bindEvents() {
  window.addEventListener("popstate", () => {
    const route = parseRoute();
    renderDoc(route.docSlug, route.sectionSlug);
  });

  byId("menuButton").addEventListener("click", () => byId("sidebar").classList.toggle("open"));
  byId("themeButton").addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
  byId("refreshGithub")?.addEventListener("click", loadGithubStatus);
  byId("searchInput").addEventListener("input", (event) => searchDocs(event.target.value));
  byId("searchInput").addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      byId("searchInput").value = "";
      byId("searchResults").hidden = true;
      byId("searchInput").blur();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search")) byId("searchResults").hidden = true;
  });
  byId("searchResults").addEventListener("click", (event) => {
    const item = event.target.closest("[data-section]");
    if (item) navigate(item.dataset.doc, item.dataset.section);
  });
  byId("articleContent").addEventListener("click", (event) => {
    const item = event.target.closest("[data-section]");
    if (item) navigate(item.dataset.doc, item.dataset.section);
  });
  byId("toc").addEventListener("click", (event) => {
    const item = event.target.closest("[data-heading]");
    if (!item) return;
    const heading = document.getElementById(item.dataset.heading);
    if (!heading) return;
    heading.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  byId("feedbackForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const body = byId("commentBody").value.trim();
    if (!body) return;
    window.open(byId("openIssue").href, "_blank", "noopener,noreferrer");
  });

  byId("feedbackType").addEventListener("change", updateIssueLinks);
  byId("commentBody").addEventListener("input", updateIssueLinks);
  byId("copyIssue").addEventListener("click", () => copyText(buildIssueBody()));
  byId("copyPageLink").addEventListener("click", () => copyText(`${currentDoc().title} / ${currentSection().title}\n${location.href}`));
  byId("refreshIssues").addEventListener("click", renderIssues);
}

applyTheme();
renderNav();
bindEvents();
{
  const route = parseRoute();
  renderDoc(route.docSlug, route.sectionSlug);
}
setText("githubStatusText", "正在检查远端更新...");
loadGithubStatus();
