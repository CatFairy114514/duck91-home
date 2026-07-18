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

function makeProjectAction(project) {
  if (!isUsableUrl(project.url)) {
    return `
      <button class="button button-disabled project-action" type="button" disabled aria-disabled="true">
        链接待补充 <span aria-hidden="true">↗</span>
      </button>`;
  }

  const external = project.linkType === "external";
  const actionLabel = project.ctaLabel || "立即访问";
  return `
    <a class="button button-secondary project-action" href="${escapeHtml(project.url)}"${external ? ' target="_blank" rel="noreferrer"' : ""}>
      ${escapeHtml(actionLabel)} <span aria-hidden="true">${external ? "↗" : "→"}</span>
      <span class="sr-only">${external ? "（在新窗口打开）" : ""}</span>
    </a>`;
}

function renderProjects() {
  const projectList = document.querySelector("#project-list");
  const projects = siteConfig.projects.filter((project) => project.visible !== false);

  projectList.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-card reveal" style="--card-delay: ${index * 90}ms">
          <div class="project-visual visual-${escapeHtml(project.visual)}" role="img" aria-label="${escapeHtml(project.visualLabel)}">
            <div class="visual-noise" aria-hidden="true"></div>
            <span class="visual-kicker" aria-hidden="true">PROJECT 0${index + 1}</span>
            <div class="visual-symbol" aria-hidden="true">${project.visual === "game" ? "◇" : "↗"}</div>
            <div class="visual-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
          </div>
          <div class="project-body">
            <div class="project-meta">
              <span class="status status-${escapeHtml(project.statusTone || "neutral")}">${escapeHtml(project.status)}</span>
            </div>
            <h3>${escapeHtml(project.name)}</h3>
            <p>${escapeHtml(project.description)}</p>
            <ul class="tag-list" aria-label="项目标签">
              ${project.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}
            </ul>
            ${makeProjectAction(project)}
          </div>
        </article>`,
    )
    .join("");
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
  renderAboutLinks();
  renderContacts();
  document.querySelector("#year").textContent = new Date().getFullYear();
  setupThemeToggle();
}

init();
