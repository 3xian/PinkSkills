const demos = {
  review: {
    command: "/pink-review",
    log: [
      ["00:01", "Resolved change scope"],
      ["00:03", "Traced affected call paths"],
      ["00:07", "Ran defect + simplification passes"],
    ],
    title: "Review complete",
    count: "2 findings",
    result: "Evidence first. Every finding includes a trigger, impact, location, and verification path.",
    tags: ["correctness", "maintainability", "verified"],
  },
  requirements: {
    command: "/parse-requirements",
    log: [
      ["00:01", "Read source text + marked images"],
      ["00:04", "Mapped 6 atomic requirements"],
      ["00:09", "Grounded modules in the codebase"],
    ],
    title: "Analysis complete",
    count: "6 requirements",
    result: "Source-faithful requirements with current-state evidence, implementation steps, and observable verification.",
    tags: ["traceable", "codebase-fit", "testable"],
  },
};

const command = document.querySelector("#demo-command");
const log = document.querySelector("#demo-log");
const resultCard = document.querySelector(".result-card");
const resultTitle = resultCard?.querySelector(".result-head span:first-child");
const resultCount = resultCard?.querySelector(".result-count");
const resultText = document.querySelector("#demo-result");
const resultMeta = resultCard?.querySelector(".result-meta");

function renderDemo(name) {
  const demo = demos[name];
  if (!demo || !command || !log || !resultTitle || !resultCount || !resultText || !resultMeta) return;

  command.textContent = demo.command;
  log.replaceChildren(...demo.log.map(([time, message]) => {
    const row = document.createElement("div");
    row.innerHTML = `<span class="log-time">${time}</span><span class="log-check">✓</span><span></span>`;
    row.lastElementChild.textContent = message;
    return row;
  }));
  resultTitle.innerHTML = "<i></i>";
  resultTitle.append(document.createTextNode(` ${demo.title}`));
  resultCount.textContent = demo.count;
  resultText.textContent = demo.result;
  resultMeta.replaceChildren(...demo.tags.map((tag) => {
    const item = document.createElement("span");
    item.textContent = tag;
    return item;
  }));
}

document.querySelectorAll(".demo-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".demo-tab").forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    renderDemo(tab.dataset.demo);
  });
});

const toast = document.querySelector(".toast");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.append(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  if (!copied) throw new Error("Copy command was rejected");
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const source = document.querySelector(button.dataset.copy);
    if (!source) return;

    try {
      await copyText(source.textContent.trim());
      const label = button.querySelector("span");
      if (label) label.textContent = "Copied";
      showToast("Command copied to clipboard");
      window.setTimeout(() => {
        if (label) label.textContent = "Copy";
      }, 1800);
    } catch {
      showToast("Select the command and copy it manually");
    }
  });
});

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -28px" });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".spotlight").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      element.style.setProperty("--mouse-x", `${event.clientX - bounds.left}px`);
      element.style.setProperty("--mouse-y", `${event.clientY - bounds.top}px`);
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
