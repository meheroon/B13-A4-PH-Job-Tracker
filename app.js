function getDefaultJobs() {
  return [
    {
      id: "j1",
      companyName: "CloudPOS",
      position: "Junior Frontend Developer",
      location: "Dhaka (Hybrid)",
      type: "Full-time",
      salary: "৳25,000 - ৳35,000",
      description: "Build UI screens from Figma and fix responsive issues for dashboard pages.",
      status: "Applied"
    },
    
  ];
}

function getFilteredJobs(jobs, activeTab) {
  if (activeTab === "all") return jobs;
  if (activeTab === "interview") return jobs.filter(j => j.status === "Interview");
  if (activeTab === "rejected") return jobs.filter(j => j.status === "Rejected");
  return jobs;
}

function createJobCard(job) {
  const interviewActive = job.status === "Interview";
  const rejectedActive = job.status === "Rejected";

  return `
    <div class="card bg-base-100 shadow" data-id="${job.id}">
      <div class="card-body">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h3 class="font-bold text-lg">${job.position}</h3>
            <p class="text-sm opacity-70">${job.companyName}</p>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="delete" title="Delete">
            ✕
          </button>
        </div>

        <div class="mt-2 flex flex-wrap gap-2">
          <span class="badge badge-outline">${job.location}</span>
          <span class="badge badge-outline">${job.type}</span>
          <span class="badge badge-outline">${job.salary}</span>
        </div>

        <p class="text-sm mt-3 opacity-80">${job.description}</p>

        <div class="card-actions mt-4 justify-between">
          <button class="btn btn-sm ${interviewActive ? "btn-success" : "btn-outline"}"
                  data-action="interview">
            Interview
          </button>

          <button class="btn btn-sm ${rejectedActive ? "btn-error" : "btn-outline"}"
                  data-action="rejected">
            Rejected
          </button>
        </div>
      </div>
    </div>
  `;
}
function renderJobs(jobs, activeTab) {
  const grid = document.getElementById("jobsGrid");
  const empty = document.getElementById("emptyState");

  const filtered = getFilteredJobs(jobs, activeTab);

  document.getElementById("tabCount").innerText = filtered.length;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");
  grid.innerHTML = filtered.map(createJobCard).join("");
}
function renderDashboard(jobs) {
  const total = jobs.length;
  const interview = jobs.filter(j => j.status === "Interview").length;
  const rejected = jobs.filter(j => j.status === "Rejected").length;

  document.getElementById("countTotal").innerText = total;
  document.getElementById("countInterview").innerText = interview;
  document.getElementById("countRejected").innerText = rejected;
}
function setActiveTab(tabName) {
  const tabs = document.querySelectorAll("[data-tab]");
  tabs.forEach(t => t.classList.remove("tab-active"));
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("tab-active");
}
function setupTabs(onTabChange) {
  document.querySelectorAll("[data-tab]").forEach(tab => {
    tab.addEventListener("click", () => onTabChange(tab.dataset.tab));
  });
}
function setupJobActions(jobsRef, onChange) {
  const grid = document.getElementById("jobsGrid");

  grid.addEventListener("click", (e) => {
    const actionBtn = e.target.closest("[data-action]");
    if (!actionBtn) return;

    const card = e.target.closest("[data-id]");
    if (!card) return;

    const id = card.dataset.id;
    const action = actionBtn.dataset.action;

    const idx = jobsRef.findIndex(j => j.id === id);
    if (idx === -1) return;

    if (action === "interview") {
      jobsRef[idx].status = "Interview";
    } else if (action === "rejected") {
      jobsRef[idx].status = "Rejected";
    } else if (action === "delete") {
      jobsRef.splice(idx, 1);
    }

    onChange();
  });
}
const STORAGE_KEY = "ph_job_tracker_jobs";

function saveJobs(jobs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

function loadJobs() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return getDefaultJobs();
  try {
    return JSON.parse(data);
  } catch {
    return getDefaultJobs();
  }
}
function init() {
  let jobs = loadJobs();
  let activeTab = "all";

  function renderAll() {
    saveJobs(jobs);
    setActiveTab(activeTab);
    renderDashboard(jobs);
    renderJobs(jobs, activeTab);
  }

  setupTabs((tabName) => {
    activeTab = tabName;
    renderAll();
  });

  setupJobActions(jobs, renderAll);

  renderAll();
}

init();