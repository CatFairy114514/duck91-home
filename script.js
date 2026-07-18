import { siteConfig } from "./site.config.js";

const THEME_KEY = "duck-home-theme";
const root = document.documentElement;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isUsableUrl(url) {
  return typeof url === "string" && url.trim().length > 0;
}

function renderSiteText() {
  const { site, about } = siteConfig;
  document.title = site.name;
  document.querySelectorAll("[data-site-name]").forEach((element) => {
    element.textContent = site.name;
  });
  document.querySelector("[data-site-eyebrow]").textContent = site.eyebrow;
  document.querySelector("[data-site-tagline]").textContent = site.tagline;
  document.querySelector("[data-site-intro]").textContent = site.intro;

  document.querySelector("[data-avatar-text]").textContent = about.avatarText;
  document.querySelector("[data-about-title]").textContent = about.title;
  document.querySelector("[data-about-description]").textContent = about.description;
}

function makeProjectAction(action, options = {}) {
  const { fallbackLabel = "立即访问", modifier = "" } = options;
  if (!isUsableUrl(action?.url)) {
    return `
      <button class="button button-disabled project-action" type="button" disabled aria-disabled="true">
        链接待补充 <span aria-hidden="true">↗</span>
      </button>`;
  }

  const external = action.linkType === "external";
  const actionLabel = action.ctaLabel || action.label || fallbackLabel;
  return `
    <a class="button button-secondary project-action${modifier}" href="${escapeHtml(action.url)}"${external ? ' target="_blank" rel="noreferrer"' : ""}>
      ${escapeHtml(actionLabel)} <span aria-hidden="true">${external ? "↗" : "→"}</span>
      <span class="sr-only">${external ? "（在新窗口打开）" : ""}</span>
    </a>`;
}

function makeProjectVisual(project, index) {
  const details = project.details;
  const coverDetails = details
    ? `
        <div class="project-cover-shade" aria-hidden="true"></div>
        <div class="project-cover-copy" aria-hidden="true">
          <p class="project-cover-subtitle">${escapeHtml(details.subtitle || "")}</p>
          <p class="project-cover-title">${escapeHtml(details.title || project.name)}</p>
          <p class="project-cover-tagline">${escapeHtml(details.tagline || "")}</p>
          <p class="project-cover-helper">${escapeHtml(details.helper || "")}</p>
        </div>`
    : "";

  if (isUsableUrl(project.coverImage)) {
    const coverAlt = project.coverAlt || project.visualLabel || `${project.name} 封面`;
    return `
      <div class="project-visual has-cover">
        <img class="project-cover" src="${escapeHtml(project.coverImage)}" alt="${escapeHtml(coverAlt)}" loading="lazy" decoding="async">
        ${coverDetails}
      </div>`;
  }

  return `
    <div class="project-visual visual-${escapeHtml(project.visual)}" role="img" aria-label="${escapeHtml(project.visualLabel)}">
      <div class="visual-noise" aria-hidden="true"></div>
      <span class="visual-kicker" aria-hidden="true">PROJECT 0${index + 1}</span>
      <div class="visual-symbol" aria-hidden="true">${project.visual === "game" ? "◇" : "↗"}</div>
      <div class="visual-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      ${coverDetails}
    </div>`;
}

function makeProjectDetails(project, index) {
  if (!project.details) return "";

  const { details } = project;
  const detailId = `project-details-${index + 1}`;
  return `
    <section class="project-details" id="${detailId}" aria-label="${escapeHtml(details.title || project.name)}详情">
      <p class="project-details-description">${escapeHtml(details.description || "")}</p>
      <ul class="project-rule-list" aria-label="${escapeHtml(details.listLabel || "项目摘要")}">
        ${(details.rules || []).map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}
      </ul>
      <ul class="project-detail-tags" aria-label="项目详情标签">
        ${(details.tags || []).map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}
      </ul>
    </section>`;
}

function makeProjectDetailToggle(project, index) {
  if (!project.details) return "";

  const detailId = `project-details-${index + 1}`;
  const expandLabel = project.details.expandLabel || "查看详情";
  const title = project.details.title || project.name;
  return `
    <button class="project-detail-toggle" type="button" data-project-detail-toggle data-detail-title="${escapeHtml(title)}" data-expand-label="${escapeHtml(expandLabel)}" data-collapse-label="${escapeHtml(project.details.collapseLabel || "收起详情")}" aria-expanded="false" aria-controls="${detailId}" aria-label="展开${escapeHtml(title)}详情">
      <span data-detail-toggle-label>${escapeHtml(expandLabel)}</span>
      <span class="project-detail-toggle-icon" aria-hidden="true">↓</span>
    </button>`;
}

function renderProjects() {
  const projectList = document.querySelector("#project-list");
  const projects = siteConfig.projects.filter((project) => project.visible !== false);

  projectList.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-card${project.details ? " project-card-has-details" : ""}${project.secondaryAction ? " project-card-has-secondary-action" : ""} reveal"${project.details ? ' tabindex="0"' : ""} style="--card-delay: ${index * 90}ms">
          ${makeProjectVisual(project, index)}
          <div class="project-body">
            <div class="project-meta">
              <span class="status status-${escapeHtml(project.statusTone || "neutral")}">${escapeHtml(project.status)}</span>
            </div>
            <div class="project-default-content">
              <h3>${escapeHtml(project.name)}</h3>
              <p>${escapeHtml(project.description)}</p>
              <ul class="tag-list" aria-label="项目标签">
                ${project.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}
              </ul>
            </div>
            ${makeProjectDetails(project, index)}
            <div class="project-actions">
              ${makeProjectDetailToggle(project, index)}
              ${makeProjectAction(project)}
              ${project.secondaryAction ? makeProjectAction(project.secondaryAction, { modifier: " project-action-secondary" }) : ""}
            </div>
          </div>
        </article>`,
    )
    .join("");
}

function setupProjectDetailToggles() {
  document.querySelectorAll("[data-project-detail-toggle]").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const card = toggle.closest(".project-card-has-details");
      if (!card) return;

      const isExpanded = card.classList.toggle("is-expanded");
      const title = toggle.dataset.detailTitle || "项目";
      const label = toggle.querySelector("[data-detail-toggle-label]");

      toggle.setAttribute("aria-expanded", String(isExpanded));
      toggle.setAttribute("aria-label", `${isExpanded ? "收起" : "展开"}${title}详情`);
      label.textContent = isExpanded ? toggle.dataset.collapseLabel : toggle.dataset.expandLabel;
    });
  });
}

function renderAboutLinks() {
  const links = siteConfig.about.links;
  document.querySelector("#about-links").innerHTML = links
    .map((link) => {
      if (!isUsableUrl(link.url)) {
        return `<span class="text-link is-pending">${escapeHtml(link.label)} <small>待补充</small></span>`;
      }
      return `<a class="text-link" href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)} <span aria-hidden="true">↗</span></a>`;
    })
    .join("");
}

function renderContacts() {
  document.querySelector("#contact-list").innerHTML = siteConfig.contacts
    .map((contact, index) => {
      const content = `
        <span class="contact-index">0${index + 1}</span>
        <span class="contact-content"><strong>${escapeHtml(contact.label)}</strong><small>${escapeHtml(contact.hint)}</small></span>
        <span class="contact-arrow" aria-hidden="true">${isUsableUrl(contact.url) ? "↗" : "—"}</span>`;

      if (!isUsableUrl(contact.url)) {
        return `<div class="contact-item is-pending" aria-label="${escapeHtml(contact.label)}：待补充">${content}</div>`;
      }
      return `<a class="contact-item" href="${escapeHtml(contact.url)}" target="_blank" rel="noreferrer" aria-label="访问 ${escapeHtml(contact.label)}（在新窗口打开）">${content}</a>`;
    })
    .join("");
}

function systemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function activeTheme() {
  return root.dataset.theme || systemTheme();
}

function updateThemeButton() {
  const button = document.querySelector(".theme-toggle");
  const icon = button.querySelector(".theme-icon");
  const label = button.querySelector(".theme-label");
  const currentTheme = activeTheme();
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  button.setAttribute("aria-label", `切换为${nextTheme === "dark" ? "深色" : "浅色"}模式`);
  button.setAttribute("title", `切换为${nextTheme === "dark" ? "深色" : "浅色"}模式`);
  button.setAttribute("aria-pressed", String(currentTheme === "dark"));
  icon.textContent = currentTheme === "dark" ? "☾" : "☼";
  label.textContent = currentTheme === "dark" ? "深色" : "浅色";
}

function setupThemeToggle() {
  const button = document.querySelector(".theme-toggle");
  updateThemeButton();

  button.addEventListener("click", () => {
    const nextTheme = activeTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    try {
      localStorage.setItem(THEME_KEY, nextTheme);
    } catch (_) {
      // 存储不可用时仍允许本次会话切换。
    }
    updateThemeButton();
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (!root.dataset.theme) updateThemeButton();
  });
}

function init() {
  renderSiteText();
  renderProjects();
  setupProjectDetailToggles();
  renderAboutLinks();
  renderContacts();
  document.querySelector("#year").textContent = new Date().getFullYear();
  setupThemeToggle();
}

init();
