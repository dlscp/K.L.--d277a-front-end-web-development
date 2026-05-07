// document.addEventListener('DOMContentLoaded', function () {
//     const tabLinks = document.querySelectorAll('.nav-link');
//     const tabContents = document.querySelectorAll('.tab-pane');

//     tabLinks.forEach(link => {
//         link.addEventListener('click', function () {
//             const targetId = this.getAttribute('data-bs-target').substring(1);
//             const targetContent = document.getElementById(targetId);

//             tabContents.forEach(content => {
//                 content.classList.remove('fade-in');
//             });

//             setTimeout(() => {
//                 targetContent.classList.add('fade-in');
//             }, 50);
//         });
//     });
// });

///// Imports of the components

// navbar
// ==============================
fetch('../components/navbar.html')
  .then(response => {
    // Check if the file was found
    if (!response.ok) {
      throw new Error('Navbar snippet not found');
    }
    return response.text(); // Convert the response to a text string
  })
  .then(data => {
    const mountInHeader = document.getElementById("headerNavMount");
    const fallbackMount = document.getElementById("navbar-placeholder");

    if (mountInHeader) mountInHeader.innerHTML = data;
    else if (fallbackMount) fallbackMount.innerHTML = data;

    // Now apply active state
    setActiveNavItem(getPageKeyFromPath());
  })
  .catch(error => {
    console.error('Error loading the navbar:', error);
  });

// calendar
// ==============================
fetch('../components/calendar.html')
  .then(response => {
    // Check if the file was found
    if (!response.ok) {
      throw new Error('Calendar snippet not found');
    }
    return response.text(); // Convert the response to a text string
  })
  .then(data => {
    // Inject the HTML into the placeholder
    document.getElementById('calendar-placeholder').innerHTML = data;

    initCalendar();
  })
  .catch(error => {
    console.error('Error loading the calendar:', error);
  });

//card
// ==============================
fetch('../components/card.html')
  .then(response => {
    // Check if the file was found
    if (!response.ok) {
      throw new Error('Card snippet not found');
    }
    return response.text(); // Convert the response to a text string
  })
  .then(data => {
    // Inject the HTML into the placeholder
    document.getElementById('card-placeholder').innerHTML = data;
  })
  .catch(error => {
    console.error('Error loading the card:', error);
  });

// quote
// ==============================
fetch('../components/quote.html')
  .then(response => {
    // Check if the file was found
    if (!response.ok) {
      throw new Error('quote snippet not found');
    }
    return response.text(); // Convert the response to a text string
  })
  .then(data => {
    // Inject the HTML into the placeholder
    document.getElementById('quote-placeholder').innerHTML = data;
  })
  .catch(error => {
    console.error('Error loading the quote:', error);
  });

// tabs
// ==============================
fetch('../components/tabs.html')
  .then(response => {
    // Check if the file was found
    if (!response.ok) {
      throw new Error('tabs snippet not found');
    }
    return response.text(); // Convert the response to a text string
  })
  .then(data => {
    // Inject the HTML into the placeholder
    document.getElementById('tabs-placeholder').innerHTML = data;
  })
  .catch(error => {
    console.error('Error loading the tabs:', error);
  });

// header
// ==============================
fetch('../components/header.html')
  .then(response => {
    // Check if the file was found
    if (!response.ok) {
      throw new Error('header snippet not found');
    }
    return response.text(); // Convert the response to a text string
  })
  .then(headerHtml => {
    // Inject the HTML into the placeholder
    document.getElementById('header-placeholder').innerHTML = headerHtml;

    renderPageHeader();

    // NOW load navbar so #headerNavMount exists
    return fetch('../components/navbar.html');
  })
  .then(response => {
    if (!response.ok) throw new Error('Navbar snippet not found');
    return response.text();
  })
  .then(navHtml => {
    const mountInHeader = document.getElementById("headerNavMount");
    const fallbackMount = document.getElementById("navbar-placeholder");

    if (mountInHeader) mountInHeader.innerHTML = navHtml;
    else if (fallbackMount) fallbackMount.innerHTML = navHtml;

    setActiveNavItem(getPageKeyFromPath());
  })
  .catch (error => {
  console.error('Error loading the header/navbar:', error);
});

// ==============================
// functionality
// might want to move this stuff eventually but its okay here for now
// ==============================


// ==============================
// Calendar component logic
// ==============================

function initCalendar() {
  // ===== Data =====
  // month is 0-based (0=Jan) to match JS Date.getMonth()
  // demo event data, need to adjust this to include the time eventually. 
  const eventData = {
    events: [
      // --- April 2026 ---
      {
        name: "Holy Week Public Service Schedule",
        details: "Modified hours for government offices during Semana Santa.",
        day: 1,
        month: 4,
        year: 2026
      },
      {
        name: "Coastal Cleanup Volunteer Day",
        details: "Community beach cleanup organized by municipal partners. Gloves and bags provided.",
        day: 11,
        month: 4,
        year: 2026
      },
      {
        name: "Small Business Development Workshop",
        details: "Free workshop on permits, grants, and compliance for local businesses.",
        day: 16,
        month: 4,
        year: 2026
      },
      {
        name: "Earth Day Sustainability Fair",
        details: "Public exhibits on recycling, renewable energy, and conservation programs.",
        day: 22,
        month: 4,
        year: 2026
      },

      // --- May 2026 ---
      {
        name: "Labor Day (Government Holiday)",
        details: "All non-essential government offices closed.",
        day: 1,
        month: 5,
        year: 2026
      },
      {
        name: "Territorial Budget Committee Meeting",
        details: "Public meeting to discuss fiscal priorities for FY 2026–2027.",
        day: 6,
        month: 5,
        year: 2026
      },
      {
        name: "Public Health Vaccination Clinic",
        details: "Walk-in vaccination clinic hosted by the Department of Health.",
        day: 14,
        month: 5,
        year: 2026
      },
      {
        name: "Tourism & Commerce Roundtable",
        details: "Open forum with local business owners and tourism officials.",
        day: 21,
        month: 5,
        year: 2026
      },

      // --- June 2026 ---
      {
        name: "Caribbean Innovation & Technology Expo",
        details: "Showcasing local startups, tech education, and workforce programs.",
        day: 4,
        month: 6,
        year: 2026
      },
      {
        name: "Community Emergency Preparedness Training",
        details: "Hurricane readiness training for residents and volunteers.",
        day: 10,
        month: 6,
        year: 2026
      },
      {
        name: "Department of Transportation Public Hearing",
        details: "Public comments on upcoming infrastructure improvement projects.",
        day: 17,
        month: 6,
        year: 2026
      },
      {
        name: "Puerto Rico Cultural Heritage Festival",
        details: "Public celebration featuring music, art, and local food vendors.",
        day: 25,
        month: 6,
        year: 2026
      }
    ]
  };

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // ===== State =====
  let currentDate = new Date();
  let selectedDay = null;

  // ===== Elements =====
  const yearLabel = document.getElementById("yearLabel");
  const monthsRow = document.getElementById("monthsRow");
  const datesBody = document.getElementById("datesBody");
  const eventsContainer = document.querySelector(".events-container");

  if (!yearLabel || !monthsRow || !datesBody || !eventsContainer) {
    console.error("Calendar init failed: required elements not found.");
    return;
  }

  // ===== Init =====
  renderMonths();
  renderCalendar();

  // ===== Month Header =====
  function renderMonths() {
    monthsRow.innerHTML = "";
    monthNames.forEach((m, index) => {
      const td = document.createElement("td");
      td.textContent = m;
      td.classList.add("month", "fw-semibold");
      td.style.cursor = "pointer";

      if (index === currentDate.getMonth()) td.classList.add("text-primary");

      td.addEventListener("click", () => {
        currentDate.setMonth(index);
        selectedDay = null;
        eventsContainer.innerHTML = " "; // clear details when navigating
        renderCalendar();
      });

      monthsRow.appendChild(td);
    });
  }

  // ===== Calendar Rendering =====
  function renderCalendar() {
    datesBody.innerHTML = "";
    yearLabel.textContent = currentDate.getFullYear();
    renderMonths();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let row = document.createElement("tr");

    // leading blanks
    for (let i = 0; i < firstDay; i++) row.appendChild(document.createElement("td"));

    for (let day = 1; day <= daysInMonth; day++) {
      const td = document.createElement("td");
      td.textContent = day;
      td.classList.add("date-cell");

      const events = getEvents(day, month, year);

      // Highlight event days
      if (events.length) {
        td.classList.add("fw-bold");
        td.style.cursor = "pointer";

        // Only allow selecting/clicking days with events
        td.addEventListener("click", () => {
          selectedDay = day;
          showEvents(events, month, day);
          renderSelectionHighlight();
        });
      } else {
        // Non-event days look inert (optional)
        td.classList.add("text-muted");
        td.style.cursor = "default";
      }

      row.appendChild(td);

      // wrap rows
      if ((firstDay + day) % 7 === 0) {
        datesBody.appendChild(row);
        row = document.createElement("tr");
      }
    }

    if (row.children.length) datesBody.appendChild(row);

    // keep highlight consistent when month/year changes
    renderSelectionHighlight();
  }

  // Separate function so selection highlight doesn't require re-rendering everything
  function renderSelectionHighlight() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Clear previous highlights
    datesBody.querySelectorAll("td").forEach(td => td.classList.remove("table-primary"));

    if (!selectedDay) return;

    // Only highlight if selected day still has events in current view
    const events = getEvents(selectedDay, month, year);
    if (!events.length) return;

    // Find the cell matching selectedDay and highlight it
    datesBody.querySelectorAll("td").forEach(td => {
      if (Number(td.textContent) === selectedDay) td.classList.add("table-primary");
    });
  }

  // ===== Events =====
  function getEvents(day, month, year) {
    return eventData.events.filter(e => e.day === day && e.month === month && e.year === year);
  }

  function showEvents(events, month, day) {
    // Only called when events exist
    eventsContainer.innerHTML = `
      <div class="mb-2 fw-semibold">
        Events for ${monthNames[month]} ${day}
      </div>
    `;

    events.forEach(e => {
      const card = document.createElement("div");
      card.className = "card mb-2";
      card.innerHTML = `
        <div class="card-body">
          <div class="fw-bold">${escapeHtml(e.name)}</div>
          <div class="text-muted small">${escapeHtml(e.details || "")}</div>
        </div>
      `;
      eventsContainer.appendChild(card);
    });
  }

  // Basic HTML escaping for public display safety
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[c]));
  }

  // ===== Year Controls =====
  document.getElementById("prevYear")?.addEventListener("click", () => {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    selectedDay = null;
    eventsContainer.innerHTML = "";
    renderCalendar();
  });

  document.getElementById("nextYear")?.addEventListener("click", () => {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    selectedDay = null;
    eventsContainer.innerHTML = "";
    renderCalendar();
  });
}



// ==============================
// Header component logic
// ==============================
// Header config: change these per page. 

const HEADER_CONFIG = {
  home: {
    title: "Puerto Rico",
    kicker: "United States Territory",
    sealSrc: "../images/Seal_of_Puerto_Rico.png",
    bgSrc: "../images/flag-textured_PR.jpg",
  },
  calendar: {
    title: "Public Events Calendar",
    kicker: "April – June 2026",
    sealSrc: "../images/Seal_of_Puerto_Rico.png",
    bgSrc: "../images/flag-textured_PR.jpg",
  },
  capital: {
    title: "Capital City",
    kicker: "Government & Services",
    sealSrc: "../images/Seal_of_Puerto_Rico.png",
    bgSrc: "../images/flag-textured_PR.jpg",
  },
  city1: {
    title: "City 1",
    kicker: "Agendas, Minutes, Notices",
    sealSrc: "../images/Seal_of_Puerto_Rico.png",
    bgSrc: "../images/flag-textured_PR.jpg",
  },
  city2: {
    title: "City 2",
    kicker: "Agendas, Minutes, Notices",
    sealSrc: "../images/Seal_of_Puerto_Rico.png",
    bgSrc: "../images/flag-textured_PR.jpg",
  },
  form: {
    title: "Committees & Public Meetings",
    kicker: "Agendas, Minutes, Notices",
    sealSrc: "../images/Seal_of_Puerto_Rico.png",
    bgSrc: "../images/flag-textured_PR.jpg",
  },
};

function getPageKeyFromPath() {
  const file = (window.location.pathname.split("/").pop() || "").toLowerCase();
  const base = file.replace(".html", "");

  const map = {
    "": "home",
    "index": "home",
    "calendar": "calendar",
    "capital": "capital",
    "city1": "city1",
    "city2": "city2",
    "form": "form",
  };

  return map[base] || "home";
}

function renderPageHeader(pageKey) {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  // Priority: explicit data-page > passed arg > URL
  const explicit = (header.dataset.page || "").trim();
  const key = explicit || pageKey || getPageKeyFromPath();

  const cfg = HEADER_CONFIG[key] || HEADER_CONFIG.home;

  const titleEl = document.getElementById("headerTitle");
  const kickerEl = document.getElementById("headerKicker");
  const sealEl = document.getElementById("headerSeal");
  const bgEl = header.querySelector(".page-header__bg");

  if (titleEl) titleEl.textContent = cfg.title || "";
  if (kickerEl) kickerEl.textContent = cfg.kicker || "";
  if (sealEl) {
    sealEl.src = cfg.sealSrc || "";
    sealEl.alt = `${cfg.title || "Page"} seal`;
  }
  if (bgEl) bgEl.style.backgroundImage = `url("${cfg.bgSrc || ""}")`;
}

// Run on load
// document.addEventListener("DOMContentLoaded", () => {
//   renderPageHeader();
// });


// Navbar component logic
// ==============================
// Navbar is added to header  
function setActiveNavItem(pageKey) {
  const nav = document.getElementById("siteNav");
  if (!nav) return;

  const links = nav.querySelectorAll("a.list-group-item");
  links.forEach(a => {
    a.classList.remove("active");
    a.removeAttribute("aria-current");
  });

  // Prefer matching via data-page
  const match = nav.querySelector(`a[data-page="${pageKey}"]`);
  if (match && !match.classList.contains("disabled")) {
    match.classList.add("active");
    match.setAttribute("aria-current", "page");
    return;
  }

  // Fallback: match by href filename if needed
  const currentFile = (window.location.pathname.split("/").pop() || "").toLowerCase();
  links.forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href.endsWith(currentFile)) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });
}