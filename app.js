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
    {
      id: "j2",
      companyName: "Mobile First Corp",
      position: "React Native Developer",
      location: "Remote",
      type: "Full-time",
      salary: "$130,000 - $170,000",
      description: "Build cross-platform mobile apps using React Native and work closely with product team.",
      status: "Applied"
    },
    {
      id: "j3",
      companyName: "WebFlow Agency",
      position: "Web Designer & Developer",
      location: "Los Angeles, CA",
      type: "Part-time",
      salary: "$80,000 - $120,000",
      description: "Design landing pages and implement responsive layouts based on client requirements.",
      status: "Applied"
    },
    {
      id: "j4",
      companyName: "DataViz Solutions",
      position: "Data Visualization Specialist",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$125,000 - $165,000",
      description: "Create interactive dashboards and charts using modern JavaScript visualization tools.",
      status: "Applied"
    },
    {
      id: "j5",
      companyName: "CloudFirst Inc",
      position: "Backend Developer",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$140,000 - $190,000",
      description: "Develop secure APIs, handle database optimization, and maintain backend services.",
      status: "Applied"
    },
    {
      id: "j6",
      companyName: "Innovation Labs",
      position: "UI/UX Engineer",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110,000 - $150,000",
      description: "Improve user experience by building clean UI components and doing usability testing.",
      status: "Applied"
    },
    {
      id: "j7",
      companyName: "MegaCorp Solutions",
      position: "JavaScript Developer",
      location: "New York, NY",
      type: "Full-time",
      salary: "$130,000 - $170,000",
      description: "Work with frontend team to deliver scalable features and fix production UI issues.",
      status: "Applied"
    },
    {
      id: "j8",
      companyName: "StartupXYZ",
      position: "Full Stack Engineer",
      location: "Remote",
      type: "Full-time",
      salary: "$120,000 - $160,000",
      description: "Build full stack features, connect APIs, and deploy updates in a fast-paced startup team.",
      status: "Applied"
    }
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

  const statusText = interviewActive
    ? "INTERVIEW"
    : rejectedActive
      ? "REJECTED"
      : "NOT APPLIED";

  const statusClass = interviewActive
    ? "badge-success"
    : rejectedActive
      ? "badge-error"
      : "badge-ghost";

  return `
    <div class="bg-base-100 rounded-xl border border-base-300" data-id="${job.id}">
      <div class="p-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="text-sm font-bold">${job.companyName}</h3>
            <p class="text-xs opacity-70 mt-0.5">${job.position}</p>
          </div>
          <button class="btn btn-ghost btn-xs" data-action="delete" title="Delete">
            <span class="text-sm">🗑️</span>
          </button>
        </div>

        <p class="text-xs opacity-70 mt-2">
          ${job.location} &nbsp;•&nbsp; ${job.type} &nbsp;•&nbsp; ${job.salary}
        </p>

        <span class="badge ${statusClass} badge-sm mt-3">${statusText}</span>

        <p class="text-xs opacity-80 mt-3 leading-relaxed">${job.description}</p>

        <div class="mt-4 flex items-center gap-2">
          <button class="btn btn-xs ${interviewActive ? "btn-success" : "btn-outline btn-success"}"
                  data-action="interview">
            Interview
          </button>
          <button class="btn btn-xs ${rejectedActive ? "btn-error" : "btn-outline btn-error"}"
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

  document.getElementById("tabCount").innerText = `${filtered.length} jobs`;

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