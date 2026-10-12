/* =============================================================
   ClubOrbit — Pure Vanilla JavaScript Application Core
   No Node.js, No Build Tools, Runs in Any Browser Directly
============================================================= */

// --- 1. INITIAL STATE & DATA ---
const state = {
  currentPage: 'Home',
  isLoggedIn: true,
  isMockupMode: false,
  selectedClubId: null,
  activeCategory: 'All',
  searchQuery: '',
  eventFilter: 'All Events',
  discussionTab: 'All',
  clubDetailTab: 'overview',
  memberSearchQuery: '',

  currentUser: {
    name: 'Sahil Shinde',
    avatar: 'SS',
    role: 'Lead Community Architect & Full-Stack Crafter',
    handle: '@sahilshinde',
    email: 'sahil.shinde@cluborbit.io',
    bio: 'Architecting high-signal tech communities, Indie hacking, and building full-stack products with clean systems design.',
    location: 'Mumbai, India',
    joinedDate: 'Joined March 2025'
  },

  joinedClubIds: [1, 2, 6],
  followedClubIds: [1, 2, 4, 6],
  registeredEventIds: [1, 3],
  savedDiscussionIds: [1, 2],
  likedDiscussionIds: [1, 2],
  pinnedDiscussionIds: [1],

  activities: [
    { id: 1, text: "Commented on 'What’s one tiny design detail...'", club: "Design Circle", time: "5 min ago", icon: "💬" },
    { id: 2, text: "Joined Design Circle as an active member", club: "Design Circle", time: "Yesterday", icon: "✳" },
    { id: 3, text: "Registered for 'Designing for Humans, Not Just Screens'", club: "Design Circle", time: "2 days ago", icon: "🎟" },
    { id: 4, text: "Liked Sana Kapoor's milestone post in Indie Hackers Hub", club: "Indie Hackers Hub", time: "3 days ago", icon: "❤️" },
    { id: 5, text: "Followed the Future Stack community", club: "Future Stack", time: "5 days ago", icon: "✦" }
  ],

  clubs: [
    {
      id: 1,
      name: "Design Circle",
      category: "Design",
      membersCount: 2420,
      tag: "CREATIVE",
      icon: "✳",
      color: "lavender",
      desc: "A vibrant home for curious UX/UI designers, visual thinkers, design system leads, and product crafters.",
      bannerImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      lead: "Aarav Mehta",
      leadRole: "Lead Product Designer @ OrbitLab",
      leadAvatar: "AM",
      founded: "January 2024",
      rules: [
        "Share work-in-progress and constructive feedback with kindness.",
        "Credit original designers and sources in inspirations.",
        "No unsolicited pitching or commercial spam."
      ],
      announcements: [
        {
          id: 101,
          title: "🎨 Annual Portfolio Review & Critiques kicks off next week!",
          date: "Yesterday at 4:30 PM",
          author: "Aarav Mehta",
          pinned: true,
          content: "We have invited 6 design leads from top tech firms to review member design portfolios. Check the event calendar to reserve your 15-minute slot!"
        },
        {
          id: 102,
          title: "Figma Tokens 2.0 Workshop Resources now available",
          date: "Oct 8, 2026",
          author: "Priya Sharma",
          pinned: false,
          content: "Slides, Figma community file template, and recording link have been uploaded to our resources hub."
        }
      ],
      members: [
        { id: "m1", name: "Aarav Mehta", role: "Admin", avatar: "AM", handle: "@aarav", joined: "Jan 2024", location: "Bengaluru, India" },
        { id: "m2", name: "Priya Sharma", role: "Moderator", avatar: "PS", handle: "@priya_design", joined: "Feb 2024", location: "Mumbai, India" },
        { id: "m3", name: "Sahil Shinde", role: "Member", avatar: "SS", handle: "@sahilshinde", joined: "Mar 2025", location: "Mumbai, India" },
        { id: "m4", name: "Elena Rostova", role: "Member", avatar: "ER", handle: "@elena_ux", joined: "Apr 2025", location: "Berlin, Germany" },
        { id: "m5", name: "Marcus Chen", role: "Member", avatar: "MC", handle: "@marcus_ui", joined: "May 2025", location: "Singapore" }
      ]
    },
    {
      id: 2,
      name: "Indie Hackers Hub",
      category: "Entrepreneurship",
      membersCount: 1840,
      tag: "BUILDERS",
      icon: "↗",
      color: "mint",
      desc: "Build in public, share honest metrics, swap growth tactics, and ship sustainable software products together.",
      bannerImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      lead: "Sana Kapoor",
      leadRole: "Founder @ MicroMetrics",
      leadAvatar: "SK",
      founded: "March 2024",
      rules: [
        "Share real numbers, honest struggles, and transparent wins.",
        "Give more feedback than you ask for your own projects.",
        "Encourage shipping small over waiting for perfection."
      ],
      announcements: [
        {
          id: 103,
          title: "🚀 $0 to $1k MRR Cohort registrations open",
          date: "2 days ago",
          author: "Sana Kapoor",
          pinned: true,
          content: "Join our peer accountability sprint starting Nov 1. Limited to 25 indie hackers committed to weekly shipping."
        }
      ],
      members: [
        { id: "m6", name: "Sana Kapoor", role: "Admin", avatar: "SK", handle: "@sanakapoor", joined: "Mar 2024", location: "New Delhi, India" },
        { id: "m7", name: "Vikram Sethi", role: "Moderator", avatar: "VS", handle: "@vik_builds", joined: "Apr 2024", location: "Pune, India" },
        { id: "m8", name: "Sahil Shinde", role: "Member", avatar: "SS", handle: "@sahilshinde", joined: "Mar 2025", location: "Mumbai, India" }
      ]
    },
    {
      id: 3,
      name: "Lens & Light",
      category: "Photography",
      membersCount: 986,
      tag: "PHOTO",
      icon: "◉",
      color: "peach",
      desc: "Capture stories, master manual exposures, explore 35mm film, and join weekend photowalks around the globe.",
      bannerImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      lead: "Rohan Joshi",
      leadRole: "Street & Documentary Photographer",
      leadAvatar: "RJ",
      founded: "February 2024",
      rules: [
        "All cameras, from vintage SLRs to smartphones, are celebrated.",
        "Include EXIF / lens info when sharing photo technical breakdown.",
        "Treat all subjects with dignity and respect local photo ethics."
      ],
      announcements: [],
      members: [
        { id: "m10", name: "Rohan Joshi", role: "Admin", avatar: "RJ", handle: "@rohan_lens", joined: "Feb 2024", location: "Mumbai, India" },
        { id: "m11", name: "Aditi Rao", role: "Moderator", avatar: "AR", handle: "@aditi_35mm", joined: "Mar 2024", location: "Jaipur, India" }
      ]
    },
    {
      id: 4,
      name: "Level Up Lounge",
      category: "Gaming",
      membersCount: 3120,
      tag: "GAMING",
      icon: "⌁",
      color: "blue",
      desc: "Squad up for competitive multiplayer, indie game discoveries, speedruns, and cozy weekend discord game nights.",
      bannerImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      lead: "Kavya Nair",
      leadRole: "Esports Caster & Streamer",
      leadAvatar: "KN",
      founded: "November 2023",
      rules: [
        "Zero tolerance for toxicity, rage quit shaming, or griefing.",
        "Tag all plot spoilers clearly."
      ],
      announcements: [],
      members: [
        { id: "m13", name: "Kavya Nair", role: "Admin", avatar: "KN", handle: "@kavyagames", joined: "Nov 2023", location: "Bengaluru, India" }
      ]
    },
    {
      id: 5,
      name: "The Sound Room",
      category: "Music",
      membersCount: 1240,
      tag: "MUSIC",
      icon: "♫",
      color: "pink",
      desc: "For passionate audiophiles, bedroom beatmakers, vinyl collectors, and live session organizers.",
      bannerImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      lead: "Devansh Roy",
      leadRole: "Electronic Music Producer",
      leadAvatar: "DR",
      founded: "April 2024",
      rules: ["Give feedback on mixdowns with timestamps."],
      announcements: [],
      members: []
    },
    {
      id: 6,
      name: "Future Stack",
      category: "Technology",
      membersCount: 4650,
      tag: "TECH",
      icon: "</>",
      color: "mint",
      desc: "Dive deep into AI agents, TypeScript, Rust, distributed systems, open-source architectures, and cloud frontiers.",
      bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      lead: "Ananya Deshmukh",
      leadRole: "Staff Systems Engineer @ CloudPulse",
      leadAvatar: "AD",
      founded: "October 2023",
      rules: ["Reproducible code snippets only."],
      announcements: [],
      members: [
        { id: "m18", name: "Ananya Deshmukh", role: "Admin", avatar: "AD", handle: "@ananya_dev", joined: "Oct 2023", location: "Hyderabad, India" }
      ]
    },
    {
      id: 7,
      name: "Founders Table",
      category: "Entrepreneurship",
      membersCount: 742,
      tag: "STARTUPS",
      icon: "✦",
      color: "peach",
      desc: "Intimate, high-trust circle for early-stage founders navigating product-market fit, fundraising, and hiring.",
      bannerImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      lead: "Karthik Verma",
      leadRole: "2x Founder, Angel Investor",
      leadAvatar: "KV",
      founded: "January 2024",
      rules: ["Chatham House Rule applies to all private founder roundtables."],
      announcements: [],
      members: []
    },
    {
      id: 8,
      name: "Weekend Wanderers",
      category: "Lifestyle",
      membersCount: 1530,
      tag: "OUTDOORS",
      icon: "⌖",
      color: "lavender",
      desc: "Day hikes, heritage walking tours, campsite stargazing, and discovering unseen trails off the beaten path.",
      bannerImage: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      lead: "Simran Gill",
      leadRole: "Outdoor Expedition Leader",
      leadAvatar: "SG",
      founded: "May 2024",
      rules: ["Leave no trace ethics on every single gathering."],
      announcements: [],
      members: []
    }
  ],

  events: [
    {
      id: 1,
      day: "18",
      month: "OCT",
      year: "2026",
      title: "Designing for Humans, Not Just Screens: Micro-interactions that Delight",
      type: "Interactive Workshop",
      category: "Design",
      clubId: 1,
      host: "Design Circle",
      time: "6:30 PM - 8:00 PM IST",
      place: "Online · Live Zoom & Figma Jam",
      isOnline: true,
      color: "lavender",
      attendeesCount: 142,
      maxCapacity: 200,
      speaker: "Aarav Mehta & Elena Rostova",
      description: "Go beyond standard UI design paradigms. In this hands-on workshop, we break down tactile animations, thoughtful auditory micro-feedback, state transitions, and accessible ergonomics that elevate apps from utilitarian to unforgettable.",
      agenda: [
        { time: "6:30 PM", topic: "The Cognitive Psychology of Tactile Delight" },
        { time: "7:00 PM", topic: "Live Figma + Protopie Micro-interaction Build" },
        { time: "7:40 PM", topic: "Audience Critique & Live Q&A" }
      ]
    },
    {
      id: 2,
      day: "21",
      month: "OCT",
      year: "2026",
      title: "Ship It: Indie Product Showcase & Live Founder Feedback",
      type: "Community Meetup",
      category: "Entrepreneurship",
      clubId: 2,
      host: "Indie Hackers Hub",
      time: "7:00 PM - 8:30 PM IST",
      place: "Online · StreamYard Live & Discord Lounge",
      isOnline: true,
      color: "mint",
      attendeesCount: 96,
      maxCapacity: 150,
      speaker: "Sana Kapoor & Vikram Sethi",
      description: "Five brave indie founders will get 5 minutes each to demo their newly shipped side-projects or micro-SaaS platforms followed by 5 minutes of honest, constructive feedback from seasoned founders.",
      agenda: [
        { time: "7:00 PM", topic: "Welcome & State of Indie Bootstrapping 2026" },
        { time: "7:15 PM", topic: "5 Live Product Pitches & Lightning Demos" },
        { time: "8:05 PM", topic: "Breakout Rooms & Networking Lounge" }
      ]
    },
    {
      id: 3,
      day: "25",
      month: "OCT",
      year: "2026",
      title: "Old Quarter Street Photography Walk & Golden Hour Framing",
      type: "Photo Walk",
      category: "Photography",
      clubId: 3,
      host: "Lens & Light",
      time: "7:30 AM - 10:30 AM IST",
      place: "Colaba & Ballard Estate, Mumbai · In Person",
      isOnline: false,
      color: "peach",
      attendeesCount: 38,
      maxCapacity: 45,
      speaker: "Rohan Joshi",
      description: "Explore the historic colonial architecture, bustling morning bazaars, and sun-drenched maritime alleyways of Mumbai. We focus on shadows, leading lines, and candid portraiture.",
      agenda: [
        { time: "7:30 AM", topic: "Chai & Briefing at Ballard Estate Gate" },
        { time: "8:00 AM", topic: "Guided Photowalk through Docklands" }
      ]
    },
    {
      id: 4,
      day: "28",
      month: "OCT",
      year: "2026",
      title: "Rust for TypeScript Developers: High-Performance Web Services",
      type: "Technical Deep-Dive",
      category: "Technology",
      clubId: 6,
      host: "Future Stack",
      time: "8:00 PM - 9:30 PM IST",
      place: "Online · Google Meet & Live CodeSandbox",
      isOnline: true,
      color: "mint",
      attendeesCount: 215,
      maxCapacity: 300,
      speaker: "Ananya Deshmukh",
      description: "Transition smoothly from TS async/await to Rust's memory ownership model, zero-cost abstractions, pattern matching, and building blazingly fast backend microservices.",
      agenda: []
    },
    {
      id: 5,
      day: "02",
      month: "NOV",
      year: "2026",
      title: "Late Night Lo-Fi Beat Showcase & Production Masterclass",
      type: "Jam & Masterclass",
      category: "Music",
      clubId: 5,
      host: "The Sound Room",
      time: "9:00 PM - 10:45 PM IST",
      place: "Online · Twitch & Discord High-Fidelity Audio",
      isOnline: true,
      color: "pink",
      attendeesCount: 74,
      maxCapacity: 120,
      speaker: "Devansh Roy",
      description: "Learn how to record cassette tape saturations, humanize drum grooves, and dial in warm jazz chords for introspective lo-fi music.",
      agenda: []
    }
  ],

  discussions: [
    {
      id: 1,
      initials: "AM",
      name: "Aarav Mehta",
      role: "Admin",
      clubId: 1,
      club: "Design Circle",
      time: "24 min ago",
      title: "What’s one tiny design detail in modern software that you can’t stop noticing?",
      body: "For me, it is the way a thoughtfully animated empty state or an unexpected playful micro-copy during a 404 page can turn user frustration into spontaneous delight. What micro-detail has made you fall in love with an interface recently?",
      likes: 68,
      color: "lavender",
      tag: "Design Talk",
      pinned: true,
      comments: [
        { id: "c1", author: "Priya Sharma", avatar: "PS", role: "Moderator", time: "18 min ago", content: "Subtle spring physics when dragging cards. When an interface respects physical momentum, it stops feeling like pixels and feels tangible." },
        { id: "c2", author: "Elena Rostova", avatar: "ER", role: "Member", time: "12 min ago", content: "Inline keyboard shortcuts (like typing 'j' and 'k' to browse feeds or '⌘K' for command palettes). Game changer!" },
        { id: "c3", author: "Sahil Shinde", avatar: "SS", role: "Lead Architect", time: "5 min ago", content: "Progressive disclosure! Only showing secondary buttons when hovering a card keeps everything clean without removing power features." }
      ]
    },
    {
      id: 2,
      initials: "SK",
      name: "Sana Kapoor",
      role: "Admin",
      clubId: 2,
      club: "Indie Hackers Hub",
      time: "1 hour ago",
      title: "I launched my first paid micro-SaaS side project today! Here are the raw numbers 🚀",
      body: "After 3 months of late-night coding sessions, 40 customer interview calls, and countless self-doubt moments, we officially closed our first 5 paying annual customers ($1,200 ARR total). Documenting what worked and what flopped.",
      likes: 95,
      color: "mint",
      tag: "Milestone",
      pinned: false,
      comments: [
        { id: "c4", author: "Vikram Sethi", avatar: "VS", role: "Moderator", time: "45 min ago", content: "Huge congratulations Sana! The first paying customer is always the hardest." }
      ]
    },
    {
      id: 3,
      initials: "RJ",
      name: "Rohan Joshi",
      role: "Admin",
      clubId: 3,
      club: "Lens & Light",
      time: "3 hours ago",
      title: "One prime lens for a whole weekend getaway. What are you picking and why?",
      body: "I am heading to Rajasthan for 48 hours and challenging myself to leave my heavy zoom lenses at home and pack only a single 35mm f/1.8 prime. Curious what focal length everyone would choose.",
      likes: 42,
      color: "peach",
      tag: "Photography",
      pinned: false,
      comments: [
        { id: "c5", author: "Aditi Rao", avatar: "AR", role: "Moderator", time: "2 hours ago", content: "Always 28mm for street and environmental portraits! It forces you to get physically close." }
      ]
    },
    {
      id: 4,
      initials: "AD",
      name: "Ananya Deshmukh",
      role: "Admin",
      clubId: 6,
      club: "Future Stack",
      time: "5 hours ago",
      title: "Running AI models entirely client-side via WebGPU in 2026: Real-world benchmarks",
      body: "We just ported an on-device semantic search embeddings pipeline to WebGPU using Transformers.js v3. Inference latency dropped from 420ms to 24ms. Local privacy-first intelligence in the browser is officially here.",
      likes: 112,
      color: "mint",
      tag: "Architecture",
      pinned: false,
      comments: []
    }
  ]
};

// --- 2. TOAST NOTIFICATION UTILITY ---
let toastTimer = null;
function notify(message) {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-message");
  if (!toast || !msgEl) return;
  msgEl.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// Log new activity
function logActivity(text, clubName, icon = "✦") {
  state.activities.unshift({
    id: Date.now(),
    text,
    club: clubName || "",
    time: "Just now",
    icon
  });
}

// --- 3. NAVIGATION ROUTER ---
function navigateTo(pageName) {
  state.currentPage = pageName;
  state.selectedClubId = null;
  const mobileNav = document.getElementById("main-nav");
  if (mobileNav) mobileNav.classList.remove("mobile-open");
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderApp();
}

// Open club details
function openClubDetails(clubId) {
  state.selectedClubId = clubId;
  state.currentPage = "Clubs";
  state.clubDetailTab = "overview";
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderApp();
}

// Toggle Auth mode (Public Guest vs Member Admin)
function toggleAuthMode() {
  state.isLoggedIn = !state.isLoggedIn;
  if (state.isLoggedIn) {
    notify(`Welcome back, ${state.currentUser.name}! Authenticated mode enabled.`);
  } else {
    notify("Switched to Public Mode (Signed Out).");
    if (state.currentPage === "Clubs" || state.currentPage === "Discussions" || state.currentPage === "Profile") {
      state.currentPage = "Home";
    }
  }
  renderApp();
}

// Toggle 9:16 Mockup Viewport mode
function toggleMockupMode() {
  state.isMockupMode = !state.isMockupMode;
  notify(state.isMockupMode ? "Switched to 9:16 Showcase Mockup (1080×1920 Frame)" : "Switched to Full Responsive View");
  renderApp();
}

// --- 4. INTERACTION HANDLERS ---
function toggleJoinClub(clubId) {
  if (!state.isLoggedIn) {
    openModal("auth-modal");
    return;
  }
  const club = state.clubs.find(c => c.id === clubId);
  const idx = state.joinedClubIds.indexOf(clubId);
  if (idx >= 0) {
    state.joinedClubIds.splice(idx, 1);
    logActivity(`Left ${club?.name}`, club?.name, "👋");
    notify(`You left ${club?.name}`);
  } else {
    state.joinedClubIds.push(clubId);
    logActivity(`Joined ${club?.name} as an active member`, club?.name, "✳");
    notify(`Welcome to ${club?.name}! Joined successfully.`);
  }
  renderApp();
}

function toggleFollowClub(clubId) {
  const club = state.clubs.find(c => c.id === clubId);
  const idx = state.followedClubIds.indexOf(clubId);
  if (idx >= 0) {
    state.followedClubIds.splice(idx, 1);
    notify(`Unfollowed ${club?.name}`);
  } else {
    state.followedClubIds.push(clubId);
    logActivity(`Followed ${club?.name}`, club?.name, "⭐");
    notify(`Following ${club?.name}!`);
  }
  renderApp();
}

function toggleRegisterEvent(eventId) {
  if (!state.isLoggedIn) {
    openModal("auth-modal");
    return;
  }
  const ev = state.events.find(e => e.id === eventId);
  const idx = state.registeredEventIds.indexOf(eventId);
  if (idx >= 0) {
    state.registeredEventIds.splice(idx, 1);
    logActivity(`Cancelled registration for '${ev?.title}'`, ev?.host, "🎟");
    notify(`Registration cancelled for '${ev?.title}'`);
  } else {
    state.registeredEventIds.push(eventId);
    logActivity(`Registered for '${ev?.title}'`, ev?.host, "🎟");
    notify(`You are registered for '${ev?.title}'! Ticket added to Profile.`);
  }
  renderApp();
}

function toggleSaveDiscussion(discId) {
  const idx = state.savedDiscussionIds.indexOf(discId);
  if (idx >= 0) {
    state.savedDiscussionIds.splice(idx, 1);
    notify("Removed from saved items.");
  } else {
    state.savedDiscussionIds.push(discId);
    notify("Discussion saved to your profile!");
  }
  renderApp();
}

function toggleLikeDiscussion(discId) {
  const disc = state.discussions.find(d => d.id === discId);
  const idx = state.likedDiscussionIds.indexOf(discId);
  if (idx >= 0) {
    state.likedDiscussionIds.splice(idx, 1);
    notify("Like removed.");
  } else {
    state.likedDiscussionIds.push(discId);
    logActivity(`Liked discussion '${disc?.title?.slice(0, 30)}...'`, disc?.club, "❤️");
    notify("Liked discussion!");
  }
  renderApp();
}

function togglePinDiscussion(discId) {
  const idx = state.pinnedDiscussionIds.indexOf(discId);
  if (idx >= 0) {
    state.pinnedDiscussionIds.splice(idx, 1);
    notify("Discussion unpinned.");
  } else {
    state.pinnedDiscussionIds.push(discId);
    notify("Discussion pinned to top!");
  }
  renderApp();
}

function deleteDiscussion(discId) {
  if (confirm("Are you sure you want to delete this discussion?")) {
    state.discussions = state.discussions.filter(d => d.id !== discId);
    closeModal("thread-modal");
    notify("Discussion removed by moderator.");
    renderApp();
  }
}

// --- 5. MODAL SYSTEM ---
function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add("show");
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove("show");
}

// Open Event Details Modal
let activeEventInModal = null;
function openEventDetailsModal(eventId) {
  const ev = state.events.find(e => e.id === eventId);
  if (!ev) return;
  activeEventInModal = ev;
  const isReg = state.registeredEventIds.includes(ev.id);

  const container = document.getElementById("event-details-modal-content");
  if (!container) return;

  container.innerHTML = `
    <div class="event-details-header">
      <div class="event-date-badge date-${ev.color || 'lavender'}">
        <b>${ev.day}</b>
        <span>${ev.month}</span>
      </div>
      <div>
        <span class="event-type-pill">${ev.type}</span>
        <h2>${ev.title}</h2>
        <div class="event-hosted-by">Hosted by <b>${ev.host}</b> · Category: ${ev.category}</div>
      </div>
    </div>

    <div class="event-meta-grid">
      <div class="meta-card">
        <div><b>Date & Time</b><small>${ev.day} ${ev.month} · ${ev.time}</small></div>
      </div>
      <div class="meta-card">
        <div><b>Location</b><small>${ev.place}</small></div>
      </div>
      <div class="meta-card">
        <div><b>Attendance</b><small>${ev.attendeesCount + (isReg ? 1 : 0)} / ${ev.maxCapacity || 200} registered</small></div>
      </div>
    </div>

    <div class="event-section-block">
      <h3>About this event</h3>
      <p>${ev.description}</p>
    </div>

    ${ev.agenda && ev.agenda.length ? `
      <div class="event-section-block">
        <h3>Event Agenda</h3>
        <div class="agenda-timeline">
          ${ev.agenda.map(item => `
            <div class="agenda-item">
              <span class="agenda-time">${item.time}</span>
              <span class="agenda-topic">${item.topic}</span>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <div class="event-action-bar">
      ${isReg ? `
        <div class="ticket-pass-box">
          <div class="ticket-pass-info">
            <div>
              <b>You are Registered! ✓</b>
              <p>Confirmation Pass #CO-${ev.id}829 · Free Admission</p>
            </div>
          </div>
          <button class="btn btn-outline btn-sm" onclick="toggleRegisterEvent(${ev.id}); openEventDetailsModal(${ev.id});">
            Cancel Registration
          </button>
        </div>
      ` : `
        <div class="register-cta-box">
          <div>
            <b>Free Community Registration</b>
            <p>Limited seats remaining. Instant confirmation sent to your profile.</p>
          </div>
          <button class="btn btn-primary btn-lg" onclick="toggleRegisterEvent(${ev.id}); openEventDetailsModal(${ev.id});">
            Register Now
          </button>
        </div>
      `}
    </div>
  `;

  openModal("event-details-modal");
}

// Open Discussion Thread Modal
let activeDiscInModal = null;
function openDiscussionThreadModal(discId) {
  const d = state.discussions.find(disc => disc.id === discId);
  if (!d) return;
  activeDiscInModal = d;

  const isLiked = state.likedDiscussionIds.includes(d.id);
  const isPinned = state.pinnedDiscussionIds.includes(d.id) || d.pinned;
  const comments = d.comments || [];

  const container = document.getElementById("thread-modal-content");
  if (!container) return;

  container.innerHTML = `
    <div class="thread-main-post">
      <div class="thread-author-bar">
        <span class="avatar av-${d.color || 'lavender'}">${d.initials}</span>
        <div>
          <b>${d.name}</b>
          <small>in <strong>${d.club}</strong> · ${d.time}</small>
        </div>
        ${isPinned ? '<span class="pinned-badge">📌 Pinned</span>' : ''}
      </div>

      <span class="discussion-tag">${d.tag}</span>
      <h2>${d.title}</h2>
      <p class="thread-body-text">${d.body}</p>

      <div class="thread-interactions">
        <button class="thread-like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLikeDiscussion(${d.id}); openDiscussionThreadModal(${d.id});">
          ♥ <span>${d.likes + (isLiked ? 1 : 0)} likes</span>
        </button>
        <span class="thread-count">💬 ${comments.length} replies</span>

        ${state.isLoggedIn ? `
          <div class="moderator-actions-bar">
            <button class="btn btn-outline btn-xs" onclick="togglePinDiscussion(${d.id}); openDiscussionThreadModal(${d.id});">
              ${isPinned ? 'Unpin' : 'Pin Post'}
            </button>
            <button class="btn btn-outline btn-xs danger-text" onclick="deleteDiscussion(${d.id})">
              Delete
            </button>
          </div>
        ` : ''}
      </div>
    </div>

    <div class="thread-replies-section">
      <h3>Responses (${comments.length})</h3>
      <div class="comments-stream">
        ${comments.length ? comments.map(c => `
          <div class="comment-bubble">
            <span class="avatar comment-avatar">${c.avatar}</span>
            <div class="comment-content">
              <div class="comment-header">
                <b>${c.author}</b>
                ${c.role ? `<span class="comment-role-tag">${c.role}</span>` : ''}
                <small>${c.time}</small>
              </div>
              <p>${c.content}</p>
            </div>
          </div>
        `).join('') : '<p style="font-size:12px;color:var(--muted);padding:10px 0;">No comments yet. Be the first to reply!</p>'}
      </div>

      <form class="comment-composer" onsubmit="handlePostComment(event, ${d.id})">
        <input id="new-comment-input" required placeholder="${state.isLoggedIn ? 'Write a thoughtful reply...' : 'Sign in to join the conversation'}">
        <button type="submit" class="btn btn-primary btn-sm">Reply</button>
      </form>
    </div>
  `;

  openModal("thread-modal");
}

function handlePostComment(e, discId) {
  e.preventDefault();
  if (!state.isLoggedIn) {
    openModal("auth-modal");
    return;
  }
  const input = document.getElementById("new-comment-input");
  if (!input || !input.value.trim()) return;

  const d = state.discussions.find(disc => disc.id === discId);
  if (!d) return;

  d.comments.push({
    id: "c_" + Date.now(),
    author: state.currentUser.name,
    avatar: state.currentUser.avatar,
    role: "Member",
    time: "Just now",
    content: input.value.trim()
  });

  logActivity(`Commented on '${d.title.slice(0, 30)}...'`, d.club, "💬");
  notify("Your reply was posted!");
  openDiscussionThreadModal(discId);
  renderApp();
}

// Manage Members Modal
let activeClubForMembers = null;
function openManageMembersModal(clubId) {
  const club = state.clubs.find(c => c.id === clubId);
  if (!club) return;
  activeClubForMembers = club;

  const container = document.getElementById("manage-members-content");
  if (!container) return;

  const members = club.members || [];
  container.innerHTML = `
    <span class="eyebrow">CLUB GOVERNANCE</span>
    <h2>Manage Members: ${club.name}</h2>
    <p>Review member roles, promote moderators, or invite new contributors.</p>

    <form class="invite-member-form" onsubmit="handleInviteMember(event, ${club.id})">
      <input id="invite-email-input" type="email" placeholder="Invite collaborator via email..." required>
      <button type="submit" class="btn btn-primary btn-sm">+ Invite</button>
    </form>

    <div class="manage-member-list">
      ${members.map(m => `
        <div class="manage-member-row">
          <span class="avatar member-avatar">${m.avatar}</span>
          <div class="member-info-col">
            <b>${m.name}</b>
            <small>${m.handle} · Joined ${m.joined}</small>
          </div>
          <div class="member-role-control">
            <select class="role-select" onchange="handleRoleChange(${club.id}, '${m.id}', this.value)">
              <option value="Admin" ${m.role === 'Admin' ? 'selected' : ''}>Admin</option>
              <option value="Moderator" ${m.role === 'Moderator' ? 'selected' : ''}>Moderator</option>
              <option value="Member" ${m.role === 'Member' ? 'selected' : ''}>Member</option>
            </select>
            ${m.name !== 'Sahil Shinde' ? `
              <button class="icon-btn remove-member-btn" title="Remove member" onclick="handleRemoveMember(${club.id}, '${m.id}')">✕</button>
            ` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  openModal("manage-members-modal");
}

function handleInviteMember(e, clubId) {
  e.preventDefault();
  const input = document.getElementById("invite-email-input");
  if (!input || !input.value.trim()) return;
  const email = input.value.trim();
  const club = state.clubs.find(c => c.id === clubId);
  if (club) {
    club.members.push({
      id: "m_" + Date.now(),
      name: email.split("@")[0],
      role: "Member",
      avatar: email.slice(0, 2).toUpperCase(),
      handle: "@" + email.split("@")[0],
      joined: "Today",
      location: "Invited Member"
    });
    club.membersCount++;
    notify(`Invitation sent to ${email}!`);
    openManageMembersModal(clubId);
    renderApp();
  }
}

function handleRoleChange(clubId, memberId, newRole) {
  const club = state.clubs.find(c => c.id === clubId);
  if (club) {
    const m = club.members.find(mem => mem.id === memberId);
    if (m) {
      m.role = newRole;
      notify(`${m.name}'s role updated to ${newRole}`);
      renderApp();
    }
  }
}

function handleRemoveMember(clubId, memberId) {
  const club = state.clubs.find(c => c.id === clubId);
  if (club) {
    club.members = club.members.filter(m => m.id !== memberId);
    club.membersCount = Math.max(1, club.membersCount - 1);
    notify("Member removed from club.");
    openManageMembersModal(clubId);
    renderApp();
  }
}

// Publish Announcement Modal
let activeClubForAnnouncement = null;
function openPublishAnnouncementModal(clubId) {
  const club = state.clubs.find(c => c.id === clubId);
  if (!club) return;
  activeClubForAnnouncement = club;
  openModal("announcement-modal");
}

function handlePublishAnnouncement(e) {
  e.preventDefault();
  if (!activeClubForAnnouncement) return;
  const title = document.getElementById("ann-title-input")?.value.trim();
  const content = document.getElementById("ann-body-input")?.value.trim();
  const isPinned = document.getElementById("ann-pin-checkbox")?.checked;

  if (!title || !content) return;

  activeClubForAnnouncement.announcements.unshift({
    id: Date.now(),
    title,
    content,
    pinned: isPinned,
    author: state.currentUser.name,
    date: "Just now"
  });

  logActivity(`Published announcement in ${activeClubForAnnouncement.name}`, activeClubForAnnouncement.name, "📢");
  notify(`Announcement broadcast to ${activeClubForAnnouncement.name}!`);
  closeModal("announcement-modal");
  renderApp();
}

// Create Club Form
function handleCreateClub(e) {
  e.preventDefault();
  const name = document.getElementById("new-club-name")?.value.trim();
  const category = document.getElementById("new-club-cat")?.value;
  const color = document.getElementById("new-club-color")?.value;
  const desc = document.getElementById("new-club-desc")?.value.trim();

  if (!name || !desc) return;

  const newClub = {
    id: Date.now(),
    name,
    category,
    color,
    desc,
    tag: category.toUpperCase().slice(0, 7),
    icon: category === "Technology" ? "</>" : category === "Photography" ? "◉" : "✦",
    membersCount: 1,
    featured: true,
    lead: state.currentUser.name,
    leadRole: "Founder",
    leadAvatar: state.currentUser.avatar,
    founded: "Today",
    rules: ["Welcome all new members warmly."],
    announcements: [],
    members: [{
      id: "m_creator",
      name: state.currentUser.name,
      role: "Admin",
      avatar: state.currentUser.avatar,
      handle: state.currentUser.handle,
      joined: "Today",
      location: state.currentUser.location
    }]
  };

  state.clubs.unshift(newClub);
  state.joinedClubIds.push(newClub.id);
  logActivity(`Created community '${newClub.name}'`, newClub.name, "🚀");
  notify(`Club '${newClub.name}' created successfully!`);
  closeModal("create-club-modal");
  renderApp();
}

// Create Event Form
function handleCreateEvent(e) {
  e.preventDefault();
  const title = document.getElementById("new-event-title")?.value.trim();
  const clubId = Number(document.getElementById("new-event-club")?.value) || 1;
  const day = document.getElementById("new-event-day")?.value.trim() || "30";
  const month = document.getElementById("new-event-month")?.value.trim().toUpperCase() || "OCT";
  const time = document.getElementById("new-event-time")?.value.trim() || "7:00 PM IST";
  const place = document.getElementById("new-event-place")?.value.trim() || "Online · Live session";
  const isOnline = document.getElementById("new-event-format")?.value === "online";
  const desc = document.getElementById("new-event-desc")?.value.trim() || "";

  const chosenClub = state.clubs.find(c => c.id === clubId) || state.clubs[0];

  const newEv = {
    id: Date.now(),
    title,
    clubId: chosenClub.id,
    host: chosenClub.name,
    category: chosenClub.category,
    day,
    month,
    time,
    place,
    isOnline,
    type: "Workshop",
    color: chosenClub.color || "lavender",
    attendeesCount: 1,
    maxCapacity: 150,
    speaker: state.currentUser.name,
    description: desc,
    agenda: []
  };

  state.events.unshift(newEv);
  state.registeredEventIds.push(newEv.id);
  logActivity(`Scheduled event '${newEv.title}'`, newEv.host, "📅");
  notify(`Event '${newEv.title}' published!`);
  closeModal("create-event-modal");
  renderApp();
}

// Create Discussion Form
function handleCreateDiscussion(e) {
  e.preventDefault();
  const title = document.getElementById("new-disc-title")?.value.trim();
  const clubId = Number(document.getElementById("new-disc-club")?.value) || 1;
  const tag = document.getElementById("new-disc-tag")?.value || "Discussion";
  const body = document.getElementById("new-disc-body")?.value.trim();

  if (!title || !body) return;
  const chosenClub = state.clubs.find(c => c.id === clubId) || state.clubs[0];

  state.discussions.unshift({
    id: Date.now(),
    initials: state.currentUser.avatar,
    name: state.currentUser.name,
    role: "Member",
    clubId: chosenClub.id,
    club: chosenClub.name,
    time: "Just now",
    title,
    body,
    likes: 1,
    color: chosenClub.color || "lavender",
    tag,
    pinned: false,
    comments: []
  });

  logActivity(`Started discussion '${title.slice(0, 30)}...'`, chosenClub.name, "💬");
  notify("Discussion published to feed!");
  closeModal("create-discussion-modal");
  renderApp();
}

// Edit Profile Form
function handleSaveProfile(e) {
  e.preventDefault();
  const name = document.getElementById("profile-name-input")?.value.trim();
  const bio = document.getElementById("profile-bio-input")?.value.trim();
  const loc = document.getElementById("profile-loc-input")?.value.trim();

  if (name) state.currentUser.name = name;
  if (bio) state.currentUser.bio = bio;
  if (loc) state.currentUser.location = loc;

  notify("Profile updated successfully!");
  closeModal("edit-profile-modal");
  renderApp();
}

// --- 6. PAGE RENDERERS ---

// Render Home Screen
function renderHomeScreen() {
  const filtered = state.clubs.filter(c => {
    if (state.activeCategory === 'All') return true;
    return c.category.toLowerCase() === state.activeCategory.toLowerCase();
  });

  const spotlight = state.discussions[0];

  return `
    <div class="home-page-container">
      <section class="hero">
        <div class="hero-copy">
          <div class="hero-pill">
            <span>✨</span> YOUR PEOPLE ARE OUT THERE <span class="pill-dot"></span>
          </div>
          <h1>Find your people.<br><span>Follow your curiosity.</span></h1>
          <p>
            Discover communities that get you, meet collaborators who inspire you,
            and turn shared interests into meaningful projects, discussions, and gatherings.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary btn-lg" onclick="navigateTo('${state.isLoggedIn ? "Clubs" : "Events"}')">
              Explore Communities →
            </button>
            <button class="btn btn-quiet btn-lg" onclick="navigateTo('About')">
              How It Works <span class="play-icon">▶</span>
            </button>
          </div>
          <div class="hero-proof">
            <div class="avatar-stack">
              <span class="avatar av1">R</span>
              <span class="avatar av2">K</span>
              <span class="avatar av3">J</span>
              <span class="avatar av4">T</span>
            </div>
            <div>
              <div class="proof-stars">★★★★★ <b>4.9 / 5</b></div>
              <small>Loved by 12,000+ creators, builders, and learners</small>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="visual-glow"></div>
          <div class="visual-orbit orbit-a"></div>
          <div class="visual-orbit orbit-b"></div>
          <div class="visual-orbit orbit-c"></div>

          <div class="hero-center">
            <div style="font-size:32px;">🪐</div>
            <span>your orbit<br>starts here</span>
          </div>

          <div class="float-card float-design">
            <span class="float-icon lavender">✳</span>
            <span><b>Design Circle</b><small>2.4k members</small></span>
            <span class="online-dot"></span>
          </div>
          <div class="float-card float-tech">
            <span class="float-icon mint">&lt;/&gt;</span>
            <span><b>Future Stack</b><small>4.6k members</small></span>
            <span class="online-dot"></span>
          </div>
          <div class="float-card float-music">
            <span class="float-icon peach">♫</span>
            <span><b>The Sound Room</b><small>1.2k members</small></span>
          </div>

          <div class="float-person person-one">A</div>
          <div class="float-person person-two">M</div>
          <div class="float-person person-three">J</div>
        </div>

        <div class="hero-bottom-note">
          <span class="note-icon">👥</span>
          <span><b>Belong somewhere inspiring.</b><small>One authentic interest at a time.</small></span>
          <span style="font-size:14px;color:var(--muted);">↗</span>
        </div>
      </section>

      <section class="stats-strip">
        <div><b>12k<span>+</span></b><small>Community members</small></div>
        <div><b>340</b><small>Active communities</small></div>
        <div><b>1.8k</b><small>Events hosted</small></div>
        <div><b>42k<span>+</span></b><small>Connections made</small></div>
        <div class="stats-note"><span class="pulse-dot"></span> Real-time active network</div>
      </section>

      <section class="section-block">
        <div class="section-heading">
          <div>
            <div class="eyebrow">CURATED SPACES</div>
            <h2>Featured <span>Communities.</span></h2>
            <p>Hand-picked circles with active weekly discussions, workshops, and friendly leaders.</p>
          </div>
          <button class="text-link" onclick="navigateTo('Clubs')">Explore all ${state.clubs.length} clubs →</button>
        </div>

        <div class="category-chips">
          ${["All", "Technology", "Design", "Entrepreneurship", "Gaming", "Photography"].map(cat => `
            <button class="${state.activeCategory === cat ? 'chip-active' : ''}" onclick="state.activeCategory = '${cat}'; renderApp();">${cat}</button>
          `).join('')}
        </div>

        <div class="club-grid">
          ${filtered.slice(0, 4).map(club => {
            const isJoined = state.joinedClubIds.includes(club.id);
            const isFollowed = state.followedClubIds.includes(club.id);
            return `
              <article class="club-card">
                <div class="club-art art-${club.color}" onclick="openClubDetails(${club.id})">
                  <span class="club-art-icon">${club.icon}</span>
                  <span class="art-orbit orbit-one"></span>
                  <span class="art-orbit orbit-two"></span>
                  <span class="club-tag">${club.tag}</span>
                  <button class="card-arrow" onclick="event.stopPropagation(); openClubDetails(${club.id})">↗</button>
                </div>
                <div class="club-card-body">
                  <div class="club-card-top">
                    <span class="category-label">${club.category}</span>
                    <span class="member-count">👥 ${club.membersCount}</span>
                  </div>
                  <h3 onclick="openClubDetails(${club.id})">${club.name}</h3>
                  <p>${club.desc}</p>
                  <div class="club-card-bottom">
                    <div class="avatar-stack">
                      <span class="avatar av1">A</span>
                      <span class="avatar av2">M</span>
                      <span class="avatar av3">S</span>
                      <span class="avatar-stack-count">+${club.id * 14}</span>
                    </div>
                    <div class="card-btn-group">
                      <button class="btn ${isJoined ? 'btn-joined' : 'btn-outline'} btn-sm" onclick="toggleJoinClub(${club.id})">
                        ${isJoined ? '✓ Joined' : '+ Join'}
                      </button>
                      <button class="icon-follow-btn ${isFollowed ? 'is-followed' : ''}" onclick="toggleFollowClub(${club.id})" title="${isFollowed ? 'Following' : 'Follow'}">
                        ★
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </section>

      <section class="trending-section">
        <div class="section-heading">
          <div>
            <div class="eyebrow">WHAT'S HAPPENING NOW</div>
            <h2>Trending in your <span>Orbit.</span></h2>
            <p>Hot discussions, milestone celebrations, and upcoming gatherings.</p>
          </div>
          <button class="text-link" onclick="navigateTo('Discussions')">See all discussions →</button>
        </div>

        <div class="trending-grid">
          ${spotlight ? `
            <article class="trend-feature">
              <div class="trend-top">
                <span class="trend-badge"><span class="flame-icon">🔥</span> TRENDING CONVERSATION</span>
                <button class="save-btn ${state.savedDiscussionIds.includes(spotlight.id) ? 'is-saved' : ''}" onclick="toggleSaveDiscussion(${spotlight.id})">🔖</button>
              </div>
              <div class="trend-art" onclick="openDiscussionThreadModal(${spotlight.id})" style="cursor:pointer;">
                <div class="trend-art-shape shape-one"></div>
                <div class="trend-art-shape shape-two"></div>
                <span>DESIGN<br>MATTERS.</span>
                <div class="trend-art-label">${spotlight.club.toUpperCase()} · SPOTLIGHT</div>
              </div>
              <div class="trend-content">
                <span class="category-label">${spotlight.club}</span>
                <h3 onclick="openDiscussionThreadModal(${spotlight.id})">${spotlight.title}</h3>
                <p>${spotlight.body}</p>
                <div class="trend-foot">
                  <span>💬 ${spotlight.comments?.length || 3} replies</span>
                  <span>♥ ${spotlight.likes} likes</span>
                  <button onclick="openDiscussionThreadModal(${spotlight.id})">Join Conversation ↗</button>
                </div>
              </div>
            </article>
          ` : ''}

          <div class="upcoming-panel">
            <div class="panel-heading">
              <div>
                <div class="eyebrow">CALENDAR SNEAK PEEK</div>
                <h3>Coming up next</h3>
              </div>
              <button class="round-link" onclick="navigateTo('Events')">↗</button>
            </div>
            <div class="mini-events-container">
              ${state.events.slice(0, 3).map(ev => `
                <div class="mini-event" onclick="openEventDetailsModal(${ev.id})" style="cursor:pointer;">
                  <div class="mini-date date-${ev.color || 'lavender'}">
                    <b>${ev.day}</b>
                    <span>${ev.month}</span>
                  </div>
                  <div class="mini-event-info">
                    <b>${ev.title}</b>
                    <small>${ev.time} · ${ev.host}</small>
                  </div>
                  <button>›</button>
                </div>
              `).join('')}
            </div>
            <button class="btn btn-outline full-btn" onclick="navigateTo('Events')">Browse all ${state.events.length} events →</button>
          </div>
        </div>
      </section>

      <section class="home-pillars-section">
        <div class="pillars-grid">
          <div class="pillar-card">
            <span class="pillar-icon lavender">🧭</span>
            <h3>No awkward small talk</h3>
            <p>Every club is grounded in a specific, genuine craft or passion. Conversations skip pleasantries and jump right into the good stuff.</p>
          </div>
          <div class="pillar-card">
            <span class="pillar-icon mint">🛡️</span>
            <h3>High-trust communities</h3>
            <p>Vetted moderators, clear codes of conduct, and human-led moderation ensure supportive environments where everyone can share freely.</p>
          </div>
          <div class="pillar-card">
            <span class="pillar-icon peach">📅</span>
            <h3>Beyond just chat</h3>
            <p>From live Figma jams to street photo walks and virtual demo days, experience real-time collaboration with fellow members.</p>
          </div>
        </div>
      </section>

      <section class="cta-banner">
        <div class="cta-spark spark-a">✳</div>
        <div class="cta-spark spark-b">✦</div>
        <div class="cta-content">
          <span class="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <h2>Good things happen<br>when we <span>find each other.</span></h2>
          <p>There is a vibrant orbit waiting for your curiosity. Come join us today.</p>
          <button class="btn btn-white btn-lg" onclick="navigateTo('${state.isLoggedIn ? "Clubs" : "Events"}')">
            ${state.isLoggedIn ? "Browse Your Clubs" : "Explore Gatherings"} →
          </button>
        </div>
        <div class="cta-orbit-art">
          <div class="cta-ring ring-one"></div>
          <div class="cta-ring ring-two"></div>
          <div class="cta-ring ring-three"></div>
          <div style="font-size:55px;">🪐</div>
        </div>
      </section>
    </div>
  `;
}

// Render Clubs Screen (Directory or Details)
function renderClubsScreen() {
  if (state.selectedClubId) {
    const club = state.clubs.find(c => c.id === state.selectedClubId);
    if (!club) return '';

    const isJoined = state.joinedClubIds.includes(club.id);
    const isFollowed = state.followedClubIds.includes(club.id);
    const clubDiscussions = state.discussions.filter(d => d.clubId === club.id);
    const clubEvents = state.events.filter(e => e.clubId === club.id);
    const clubMembers = (club.members || []).filter(m =>
      m.name.toLowerCase().includes(state.memberSearchQuery.toLowerCase()) ||
      m.handle.toLowerCase().includes(state.memberSearchQuery.toLowerCase())
    );

    return `
      <div class="club-details-screen">
        <div class="details-top-nav">
          <button class="btn btn-outline btn-sm back-btn" onclick="state.selectedClubId = null; renderApp();">
            ← Back to Communities
          </button>
          <div class="breadcrumbs">
            <span>Clubs</span>
            <span>/</span>
            <span class="current">${club.name}</span>
          </div>
        </div>

        <div class="club-details-hero">
          <div class="club-banner-bg" style="background-image: url('${club.bannerImage}');">
            <div class="banner-overlay"></div>
          </div>
          <div class="club-hero-content">
            <div class="club-hero-avatar art-${club.color}">
              <span>${club.icon}</span>
            </div>
            <div class="club-hero-text">
              <div class="club-hero-badges">
                <span class="category-pill">${club.category}</span>
                <span class="tag-pill">${club.tag}</span>
                <span class="founded-pill">Established ${club.founded || '2024'}</span>
              </div>
              <h1>${club.name}</h1>
              <p>${club.desc}</p>
              <div class="club-hero-stats">
                <span>👥 <b>${club.membersCount}</b> members</span>
                <span>💬 <b>${clubDiscussions.length}</b> discussions</span>
                <span>📅 <b>${clubEvents.length}</b> events</span>
              </div>
            </div>
            <div class="club-hero-actions">
              <button class="btn ${isJoined ? 'btn-joined' : 'btn-primary'} btn-lg" onclick="toggleJoinClub(${club.id})">
                ${isJoined ? '✓ Joined Member' : '+ Join Community'}
              </button>
              <button class="btn ${isFollowed ? 'btn-joined' : 'btn-outline'} btn-lg" onclick="toggleFollowClub(${club.id})">
                ${isFollowed ? '★ Following' : '☆ Follow'}
              </button>
              <div class="admin-actions-group">
                <button class="btn btn-outline btn-lg" onclick="openManageMembersModal(${club.id})">
                  ⚙ Manage Members
                </button>
                <button class="btn btn-outline btn-lg" onclick="openPublishAnnouncementModal(${club.id})">
                  📢 Broadcast
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="club-tab-nav">
          <button class="${state.clubDetailTab === 'overview' ? 'active-tab' : ''}" onclick="state.clubDetailTab = 'overview'; renderApp();">
            Overview & Guidelines
          </button>
          <button class="${state.clubDetailTab === 'discussions' ? 'active-tab' : ''}" onclick="state.clubDetailTab = 'discussions'; renderApp();">
            Discussions (${clubDiscussions.length})
          </button>
          <button class="${state.clubDetailTab === 'members' ? 'active-tab' : ''}" onclick="state.clubDetailTab = 'members'; renderApp();">
            Members Directory (${club.members?.length || 5})
          </button>
          <button class="${state.clubDetailTab === 'announcements' ? 'active-tab' : ''}" onclick="state.clubDetailTab = 'announcements'; renderApp();">
            Announcements (${club.announcements?.length || 0})
          </button>
        </div>

        ${state.clubDetailTab === 'overview' ? `
          <div class="club-overview-grid">
            <div class="overview-main">
              <div class="overview-card leader-card">
                <div class="leader-info">
                  <span class="avatar leader-avatar">${club.leadAvatar || 'AM'}</span>
                  <div>
                    <span class="eyebrow">COMMUNITY LEAD</span>
                    <b>${club.lead}</b>
                    <small>${club.leadRole}</small>
                  </div>
                </div>
                <p>"Welcome to ${club.name}! Whether you are a beginner or a veteran, don't hesitate to share your work, ask for feedback, and introduce yourself."</p>
              </div>

              <div class="overview-card">
                <div class="card-title-bar">
                  <span class="purple-text" style="font-size:18px;">🛡️</span>
                  <h3>Community Guidelines</h3>
                </div>
                <div class="rules-list">
                  ${(club.rules || ["Be kind and respectful.", "No unsolicited ads."]).map((rule, idx) => `
                    <div class="rule-item">
                      <span class="rule-num">0${idx + 1}</span>
                      <p>${rule}</p>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="overview-card">
                <div class="card-title-bar">
                  <span class="purple-text" style="font-size:18px;">📅</span>
                  <h3>Upcoming Club Gatherings</h3>
                  <button class="btn btn-outline btn-xs" onclick="openModal('create-event-modal')">+ Host Event</button>
                </div>
                ${clubEvents.length ? `
                  <div class="club-events-list">
                    ${clubEvents.map(ev => `
                      <div class="club-event-row" onclick="openEventDetailsModal(${ev.id})">
                        <div class="mini-date date-${ev.color || 'lavender'}">
                          <b>${ev.day}</b>
                          <span>${ev.month}</span>
                        </div>
                        <div class="event-row-info">
                          <b>${ev.title}</b>
                          <small>${ev.time} · ${ev.place}</small>
                        </div>
                        <button class="btn btn-outline btn-xs">View Details</button>
                      </div>
                    `).join('')}
                  </div>
                ` : `
                  <p style="font-size:12px;color:var(--muted);">No upcoming events scheduled right now.</p>
                `}
              </div>
            </div>

            <aside class="overview-aside">
              <div class="aside-card">
                <h3>About ${club.name}</h3>
                <p>${club.desc}</p>
                <div class="aside-meta-list">
                  <div><span class="meta-label">Category</span><span class="meta-value">${club.category}</span></div>
                  <div><span class="meta-label">Total Roster</span><span class="meta-value">${club.membersCount}</span></div>
                  <div><span class="meta-label">Founded</span><span class="meta-value">${club.founded || '2024'}</span></div>
                </div>
              </div>
              <div class="aside-card quick-links-card">
                <h3>Quick Actions</h3>
                <button class="quick-link-btn" onclick="openModal('create-discussion-modal')">💬 Start a discussion</button>
                <button class="quick-link-btn" onclick="openModal('create-event-modal')">📅 Schedule community event</button>
                <button class="quick-link-btn" onclick="openManageMembersModal(${club.id})">👥 Invite collaborator</button>
              </div>
            </aside>
          </div>
        ` : ''}

        ${state.clubDetailTab === 'discussions' ? `
          <div class="club-tab-content">
            <div class="tab-actions-bar">
              <div>
                <h2>Community Conversations</h2>
                <p>Questions, critiques, and showcases inside ${club.name}.</p>
              </div>
              <button class="btn btn-primary" onclick="openModal('create-discussion-modal')">+ Start Discussion</button>
            </div>
            ${clubDiscussions.length ? `
              <div class="club-discussions-stream">
                ${clubDiscussions.map(d => `
                  <article class="discussion-card" onclick="openDiscussionThreadModal(${d.id})">
                    <div class="discussion-author">
                      <span class="avatar av-${d.color || 'lavender'}">${d.initials}</span>
                      <div><b>${d.name}</b><small>${d.time} · ${d.tag}</small></div>
                      ${d.pinned ? '<span class="pinned-badge">📌 Pinned</span>' : ''}
                    </div>
                    <h3>${d.title}</h3>
                    <p>${d.body}</p>
                    <div class="discussion-actions">
                      <button>💬 ${d.comments?.length || 0} replies</button>
                      <button>♥ ${d.likes} likes</button>
                      <span class="thread-view-prompt" style="margin-left:auto;color:var(--purple);font-size:11px;font-weight:700;">View Thread ↗</span>
                    </div>
                  </article>
                `).join('')}
              </div>
            ` : '<p style="font-size:13px;color:var(--muted);padding:30px 0;">No discussions posted yet in this club.</p>'}
          </div>
        ` : ''}

        ${state.clubDetailTab === 'members' ? `
          <div class="club-tab-content">
            <div class="tab-actions-bar">
              <div>
                <h2>Members Directory</h2>
                <p>Connect with fellow members and organizers in ${club.name}.</p>
              </div>
              <button class="btn btn-primary" onclick="openManageMembersModal(${club.id})">Manage & Invite</button>
            </div>
            <div class="member-search-toolbar">
              <input placeholder="Search member by name or handle..." oninput="state.memberSearchQuery = this.value; renderApp();" value="${state.memberSearchQuery}">
            </div>
            <div class="members-directory-grid">
              ${clubMembers.map(m => `
                <div class="member-directory-card">
                  <span class="avatar member-card-avatar">${m.avatar}</span>
                  <div class="member-card-body">
                    <div class="name-row">
                      <b>${m.name}</b>
                      <span class="role-badge role-${m.role.toLowerCase()}">${m.role}</span>
                    </div>
                    <small class="member-handle">${m.handle}</small>
                    <small class="member-location">${m.location || 'Earth'}</small>
                    <small class="member-joined">Joined ${m.joined}</small>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${state.clubDetailTab === 'announcements' ? `
          <div class="club-tab-content">
            <div class="tab-actions-bar">
              <div>
                <h2>Club Announcements</h2>
                <p>Official notices and broadcasts from community organizers.</p>
              </div>
              <button class="btn btn-primary" onclick="openPublishAnnouncementModal(${club.id})">📢 Broadcast</button>
            </div>
            ${club.announcements && club.announcements.length ? `
              <div class="announcements-stream">
                ${club.announcements.map(a => `
                  <div class="announcement-card ${a.pinned ? 'pinned' : ''}">
                    <div class="announcement-top">
                      <div class="announcement-tag">${a.pinned ? '📌 PINNED NOTICE' : 'ANNOUNCEMENT'}</div>
                      <small>${a.date}</small>
                    </div>
                    <h3>${a.title}</h3>
                    <p>${a.content}</p>
                    <div class="announcement-author">Posted by <b>${a.author}</b></div>
                  </div>
                `).join('')}
              </div>
            ` : '<p style="font-size:13px;color:var(--muted);padding:30px 0;">No announcements posted yet.</p>'}
          </div>
        ` : ''}
      </div>
    `;
  }

  // Directory View
  const filtered = state.clubs.filter(c => {
    const matchesCat = state.activeCategory === 'All' || c.category === state.activeCategory;
    const matchesQuery = c.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                         c.desc.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return `
    <div class="clubs-directory-page">
      <div class="page-heading">
        <div>
          <div class="eyebrow">FIND YOUR CORNER</div>
          <h1>Your people are <span>here.</span></h1>
          <p>
            Explore communities built around the crafts, passions, and curiosities you love.
            Join circles to participate in member discussions, workshops, and projects.
          </p>
        </div>
        <button class="btn btn-primary" onclick="openModal('create-club-modal')">+ Create a Club</button>
      </div>

      <div class="clubs-toolbar">
        <div class="search-field">
          <span>🔍</span>
          <input placeholder="Search clubs by name, craft, or interest..." oninput="state.searchQuery = this.value; renderApp();" value="${state.searchQuery}">
        </div>
        <button class="btn btn-outline filter-button" onclick="state.activeCategory = 'All'; state.searchQuery = ''; renderApp();">
          Reset filters
        </button>
      </div>

      <div class="category-chips">
        ${["All", "Technology", "Design", "Photography", "Gaming", "Music", "Entrepreneurship", "Lifestyle"].map(c => `
          <button class="${state.activeCategory === c ? 'chip-active' : ''}" onclick="state.activeCategory = '${c}'; renderApp();">${c}</button>
        `).join('')}
      </div>

      <div class="results-line">
        <span><b>${filtered.length}</b> communities to discover</span>
        <button onclick="notify('Sorted by active member count.')">Most popular ↓</button>
      </div>

      <div class="club-grid clubs-full-grid">
        ${filtered.map(club => {
          const isJoined = state.joinedClubIds.includes(club.id);
          const isFollowed = state.followedClubIds.includes(club.id);
          return `
            <article class="club-card">
              <div class="club-art art-${club.color}" onclick="openClubDetails(${club.id})">
                <span class="club-art-icon">${club.icon}</span>
                <span class="art-orbit orbit-one"></span>
                <span class="art-orbit orbit-two"></span>
                <span class="club-tag">${club.tag}</span>
                <button class="card-arrow" onclick="event.stopPropagation(); openClubDetails(${club.id})">↗</button>
              </div>
              <div class="club-card-body">
                <div class="club-card-top">
                  <span class="category-label">${club.category}</span>
                  <span class="member-count">👥 ${club.membersCount}</span>
                </div>
                <h3 onclick="openClubDetails(${club.id})">${club.name}</h3>
                <p>${club.desc}</p>
                <div class="club-card-bottom">
                  <div class="avatar-stack">
                    <span class="avatar av1">A</span>
                    <span class="avatar av2">M</span>
                    <span class="avatar av3">S</span>
                    <span class="avatar-stack-count">+${club.id * 12}</span>
                  </div>
                  <div class="card-btn-group">
                    <button class="btn ${isJoined ? 'btn-joined' : 'btn-outline'} btn-sm" onclick="toggleJoinClub(${club.id})">
                      ${isJoined ? '✓ Joined' : '+ Join'}
                    </button>
                    <button class="icon-follow-btn ${isFollowed ? 'is-followed' : ''}" onclick="toggleFollowClub(${club.id})" title="${isFollowed ? 'Following' : 'Follow'}">
                      ★
                    </button>
                  </div>
                </div>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// Render Events Screen
function renderEventsScreen() {
  const filtered = state.events.filter(ev => {
    if (state.eventFilter === 'Online') return ev.isOnline;
    if (state.eventFilter === 'In Person') return !ev.isOnline;
    return true;
  });

  return `
    <div class="events-page-container">
      <div class="page-heading">
        <div>
          <div class="eyebrow">MAKE IT HAPPEN IRL & ONLINE</div>
          <h1>Put it on your <span>calendar.</span></h1>
          <p>
            Hands-on workshops, portfolio critiques, city photowalks, and deep dive roundtables.
            Every week has something extraordinary to experience with your community.
          </p>
        </div>
        <button class="btn btn-primary" onclick="openModal('create-event-modal')">+ Host an Event</button>
      </div>

      <div class="events-hero">
        <div class="events-hero-copy">
          <span class="event-hero-pill">📅 ACTIVE COMMUNITY CALENDAR</span>
          <h2>Less passive scrolling.<br>More <span>meaningful gathering.</span></h2>
          <p>
            Connect beyond chat rooms. Learn actionable skills directly from industry operators
            and build lasting friendships with members who share your drive.
          </p>
        </div>
        <div class="calendar-illustration">
          <div class="cal-top"><span></span><span></span><span></span></div>
          <div class="cal-grid">
            ${Array.from({length: 21}, (_, i) => `
              <span class="${[4, 9, 15, 18].includes(i) ? 'cal-highlight' : ''}">${i + 1}</span>
            `).join('')}
          </div>
          <div class="cal-float">✓ 4 Live Sessions this week</div>
        </div>
      </div>

      <div class="section-heading events-heading">
        <div>
          <div class="eyebrow">SAVE YOUR SPOT</div>
          <h2>Upcoming Gatherings</h2>
          <p>Explore virtual sessions and in-person experiences.</p>
        </div>
        <div class="category-chips compact-chips">
          ${["All Events", "Online", "In Person"].map(opt => `
            <button class="${state.eventFilter === opt ? 'chip-active' : ''}" onclick="state.eventFilter = '${opt}'; renderApp();">${opt}</button>
          `).join('')}
        </div>
      </div>

      <div class="event-list">
        ${filtered.map(ev => {
          const isReg = state.registeredEventIds.includes(ev.id);
          return `
            <article class="event-card">
              <div class="event-date date-${ev.color || 'lavender'}" onclick="openEventDetailsModal(${ev.id})" style="cursor:pointer;">
                <b>${ev.day}</b>
                <span>${ev.month}</span>
              </div>
              <div class="event-info">
                <div class="event-badge-row">
                  <span class="event-type">${ev.type}</span>
                  <span class="${ev.isOnline ? 'online-tag' : 'inperson-tag'}">${ev.isOnline ? '💻 Virtual' : '📍 In-Person'}</span>
                </div>
                <h3 onclick="openEventDetailsModal(${ev.id})">${ev.title}</h3>
                <div class="event-meta">
                  <span>🕒 ${ev.time}</span>
                  <span>📍 ${ev.place}</span>
                </div>
                <div class="event-host">
                  <span class="host-dot">${ev.host.slice(0, 1)}</span>
                  <span>Hosted by <b>${ev.host}</b></span>
                  <span class="attendees">👥 ${ev.attendeesCount + (isReg ? 1 : 0)} attending</span>
                </div>
              </div>
              <div class="event-card-actions">
                <button class="btn btn-outline btn-sm" onclick="openEventDetailsModal(${ev.id})">Event Details</button>
                <button class="btn ${isReg ? 'btn-joined' : 'btn-primary'} btn-sm" onclick="toggleRegisterEvent(${ev.id})">
                  ${isReg ? '✓ Registered' : 'RSVP Now'}
                </button>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// Render Discussions Screen
function renderDiscussionsScreen() {
  const filtered = state.discussions.filter(d => {
    if (state.discussionTab === 'Trending') return d.likes > 50;
    if (state.discussionTab !== 'All') return d.tag.toLowerCase().includes(state.discussionTab.toLowerCase());
    return true;
  }).sort((a, b) => {
    const isA = state.pinnedDiscussionIds.includes(a.id) || a.pinned;
    const isB = state.pinnedDiscussionIds.includes(b.id) || b.pinned;
    if (isA && !isB) return -1;
    if (!isA && isB) return 1;
    return 0;
  });

  return `
    <div class="discussions-page-container">
      <div class="page-heading">
        <div>
          <div class="eyebrow">THE COMMUNITY FEED</div>
          <h1>Good ideas start <span>here.</span></h1>
          <p>
            Share an unfiltered journey, ask for code/design critiques, or join discussions
            that push your craft forward.
          </p>
        </div>
        <button class="btn btn-primary" onclick="openModal('create-discussion-modal')">+ Start a Discussion</button>
      </div>

      <div class="discussion-layout">
        <div class="discussion-main">
          <div class="feed-tabs">
            ${["All", "Trending", "Design Talk", "Milestone", "Photography", "Architecture"].map(t => `
              <button class="${state.discussionTab === t ? 'feed-tab-active' : ''}" onclick="state.discussionTab = '${t}'; renderApp();">${t}</button>
            `).join('')}
          </div>

          <button class="composer" onclick="openModal('create-discussion-modal')">
            <span class="avatar avatar-me">${state.currentUser.avatar}</span>
            <span>What's on your mind today, ${state.currentUser.name.split(' ')[0]}?</span>
            <span class="composer-plus">+</span>
          </button>

          <div class="discussions-stream">
            ${filtered.map(d => {
              const isLiked = state.likedDiscussionIds.includes(d.id);
              const isSaved = state.savedDiscussionIds.includes(d.id);
              const isPinned = state.pinnedDiscussionIds.includes(d.id) || d.pinned;
              return `
                <article class="discussion-card">
                  <div class="discussion-author">
                    <span class="avatar author-avatar av-${d.color || 'lavender'}">${d.initials}</span>
                    <div>
                      <div class="author-name-row">
                        <b>${d.name}</b>
                        ${d.role ? `<span class="author-role-tag">${d.role}</span>` : ''}
                      </div>
                      <small>in <strong>${d.club}</strong> · ${d.time}</small>
                    </div>
                    ${isPinned ? '<span class="pinned-badge">📌 Pinned</span>' : ''}
                    ${state.isLoggedIn ? `
                      <div class="card-mod-controls">
                        <button class="mod-btn" title="Pin post" onclick="togglePinDiscussion(${d.id})">📌</button>
                        <button class="mod-btn danger" title="Delete post" onclick="deleteDiscussion(${d.id})">✕</button>
                      </div>
                    ` : ''}
                  </div>

                  <span class="discussion-tag">${d.tag}</span>
                  <h3 onclick="openDiscussionThreadModal(${d.id})" style="cursor:pointer;">${d.title}</h3>
                  <p onclick="openDiscussionThreadModal(${d.id})" style="cursor:pointer;">${d.body}</p>

                  <div class="discussion-actions">
                    <button onclick="openDiscussionThreadModal(${d.id})">💬 <b>${d.comments?.length || 0}</b> replies</button>
                    <button class="${isLiked ? 'liked' : ''}" onclick="toggleLikeDiscussion(${d.id})">♥ <span>${d.likes + (isLiked ? 1 : 0)}</span></button>
                    <button class="${isSaved ? 'saved-active' : ''}" onclick="toggleSaveDiscussion(${d.id})">🔖</button>
                    <button class="share-btn" onclick="notify('Discussion link copied!')">↗ Share</button>
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </div>

        <aside class="discussion-sidebar">
          <div class="sidebar-card welcome-card">
            <span class="sidebar-icon">✨</span>
            <h3>Your voice belongs here.</h3>
            <p>Every thriving community is built by people who show up and share what they're learning.</p>
            <button class="btn btn-primary full-btn" onclick="openModal('create-discussion-modal')">Start a discussion</button>
          </div>

          <div class="sidebar-card">
            <div class="sidebar-title">
              <h3>Featured Circles</h3>
            </div>
            ${state.clubs.slice(0, 4).map(c => `
              <div class="sidebar-club" onclick="openClubDetails(${c.id})" style="cursor:pointer;">
                <span class="sidebar-club-icon art-${c.color}">${c.icon}</span>
                <span><b>${c.name}</b><small>${c.membersCount} members</small></span>
                <span>›</span>
              </div>
            `).join('')}
          </div>
        </aside>
      </div>
    </div>
  `;
}

// Render Profile Screen
function renderProfileScreen() {
  const joinedClubs = state.clubs.filter(c => state.joinedClubIds.includes(c.id));
  const regEvents = state.events.filter(e => state.registeredEventIds.includes(e.id));
  const savedDiscs = state.discussions.filter(d => state.savedDiscussionIds.includes(d.id));

  return `
    <div class="profile-page-container">
      <div class="profile-cover">
        <div class="cover-orbit cover-o1"></div>
        <div class="cover-orbit cover-o2"></div>
        <span class="cover-spark">✦</span>
      </div>

      <section class="profile-overview">
        <div class="profile-avatar-large">
          ${state.currentUser.avatar}
          <span class="online-badge"></span>
        </div>
        <div class="profile-intro">
          <span class="eyebrow">MEMBER PROFILE</span>
          <h1>${state.currentUser.name} <span class="verified">✓</span></h1>
          <p>${state.currentUser.bio}</p>
          <div class="profile-location">
            <span>📍 ${state.currentUser.location}</span>
            <span>·</span>
            <span>📅 ${state.currentUser.joinedDate}</span>
            <span>·</span>
            <span class="role-tag-pill">${state.currentUser.role}</span>
          </div>
        </div>
        <button class="btn btn-outline edit-profile" onclick="openModal('edit-profile-modal')">
          ⚙ Edit Profile
        </button>
      </section>

      <div class="profile-stats">
        <div><b>${state.joinedClubIds.length}</b><span>Clubs Joined</span></div>
        <div><b>${state.registeredEventIds.length}</b><span>Events Registered</span></div>
        <div><b>${state.savedDiscussionIds.length}</b><span>Saved Items</span></div>
        <div><b>${state.followedClubIds.length}</b><span>Followed</span></div>
      </div>

      <div class="profile-sections">
        <section class="profile-panel">
          <div class="panel-heading">
            <div>
              <div class="eyebrow">YOUR ACTIVE CIRCLES</div>
              <h2>My Clubs (${joinedClubs.length})</h2>
            </div>
            <button class="text-link" onclick="navigateTo('Clubs')">Discover more →</button>
          </div>
          ${joinedClubs.length ? `
            <div class="profile-list-group">
              ${joinedClubs.map(c => `
                <div class="profile-list-item">
                  <span class="sidebar-club-icon art-${c.color}">${c.icon}</span>
                  <div class="profile-item-details" onclick="openClubDetails(${c.id})" style="cursor:pointer;">
                    <b>${c.name}</b>
                    <small>${c.category} · ${c.membersCount} members</small>
                  </div>
                  <div class="profile-item-actions">
                    <button class="btn btn-outline btn-xs" onclick="openClubDetails(${c.id})">View</button>
                    <button class="icon-btn remove-btn" onclick="toggleJoinClub(${c.id})">✕</button>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : '<p class="profile-empty">No clubs joined yet.</p>'}
        </section>

        <section class="profile-panel">
          <div class="panel-heading">
            <div>
              <div class="eyebrow">CONFIRMED GATHERINGS</div>
              <h2>My Events (${regEvents.length})</h2>
            </div>
            <button class="text-link" onclick="navigateTo('Events')">Browse calendar →</button>
          </div>
          ${regEvents.length ? `
            <div class="profile-list-group">
              ${regEvents.map(e => `
                <div class="profile-list-item">
                  <div class="mini-date date-${e.color || 'lavender'}">
                    <b>${e.day}</b>
                    <span>${e.month}</span>
                  </div>
                  <div class="profile-item-details" onclick="openEventDetailsModal(${e.id})" style="cursor:pointer;">
                    <b>${e.title}</b>
                    <small>${e.time} · ${e.place}</small>
                  </div>
                  <div class="profile-item-actions">
                    <span class="registered-badge">🎟 Confirmed</span>
                    <button class="btn btn-outline btn-xs" onclick="openEventDetailsModal(${e.id})">Pass</button>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : '<p class="profile-empty">No events registered yet.</p>'}
        </section>
      </div>

      <section class="activity-panel">
        <div class="panel-heading">
          <div>
            <div class="eyebrow">YOUR DIGITAL FOOTPRINT</div>
            <h2>Recent Activity</h2>
          </div>
        </div>
        <div class="activity-stream">
          ${state.activities.map(act => `
            <div class="activity-item-row">
              <span class="activity-type-icon">${act.icon}</span>
              <div class="activity-item-info">
                <b>${act.text}</b>
                <small>${act.club ? act.club + ' · ' : ''}${act.time}</small>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

// Render About Screen
function renderAboutScreen() {
  return `
    <div class="about-page-container">
      <section class="about-hero">
        <span class="eyebrow">✨ A LITTLE ABOUT OUR MISSION</span>
        <h1>The internet feels better<br>when it feels <span>like us.</span></h1>
        <p>
          ClubOrbit was founded on a simple truth: real belonging shouldn't happen by accident.
          We help people discover communities where niche interests turn into friendships,
          half-formed ideas become collaborative projects, and showing up feels completely natural.
        </p>
        <button class="btn btn-primary btn-lg" onclick="navigateTo('${state.isLoggedIn ? "Clubs" : "Events"}')">
          ${state.isLoggedIn ? "Explore Clubs" : "Join the Community"} →
        </button>
        <div class="about-hero-art">
          <div class="about-art-circle circle-a">✳</div>
          <div class="about-art-circle circle-b">👥</div>
          <div class="about-art-circle circle-c">♫</div>
          <div class="about-art-circle circle-d">&lt;/&gt;</div>
          <div class="about-art-core">
            <div style="font-size:36px;">🪐</div>
            <span>Better<br>together</span>
          </div>
        </div>
      </section>

      <section class="about-mission">
        <div>
          <div class="eyebrow">WHY WE BUILT CLUBORBIT</div>
          <h2>Belonging shouldn't be <span>left to chance.</span></h2>
        </div>
        <p>
          Traditional social algorithms reward rage-bait and doom-scrolling. ClubOrbit is designed
          for genuine peer connection, authentic craft learning, and intimate community spaces.
        </p>
      </section>

      <section class="values-grid">
        <article>
          <span class="value-icon lavender">❤️</span>
          <h3>People over vanity profiles</h3>
          <p>Real human connection beats a polished bio. We make space for raw work-in-progress.</p>
        </article>
        <article>
          <span class="value-icon mint">🧭</span>
          <h3>Curiosity is a superpower</h3>
          <p>From vintage 35mm cameras to distributed Rust systems, every interest is celebrated.</p>
        </article>
        <article>
          <span class="value-icon peach">🛡️</span>
          <h3>Room and safety for everyone</h3>
          <p>Communities thrive when members feel secure, valued, and respected.</p>
        </article>
      </section>

      <section class="how-section">
        <div class="section-heading">
          <div>
            <div class="eyebrow">THREE INTUITIVE STEPS</div>
            <h2>Finding your orbit is <span>effortless.</span></h2>
          </div>
        </div>
        <div class="steps-grid">
          <article>
            <span>01</span>
            <h3>Explore what moves you</h3>
            <p>Browse communities by category, activity level, or host format.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Show up as yourself</h3>
            <p>Join a club with one click, introduce yourself, or RSVP for an event.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Let good things happen</h3>
            <p>Collaborate on real-world projects, receive constructive feedback, and build your network.</p>
          </article>
        </div>
      </section>
    </div>
  `;
}

// Render Contact Screen
function renderContactScreen() {
  return `
    <div class="contact-page-container">
      <div class="page-heading">
        <div>
          <div class="eyebrow">WE'RE ALL EARS</div>
          <h1>Let's start a <span>conversation.</span></h1>
          <p>
            Whether you have a product question, want to partner with us, or need help with a club —
            our friendly support team is here for you.
          </p>
        </div>
      </div>

      <div class="contact-layout">
        <section class="contact-form-panel">
          <span class="eyebrow">SEND US A DIRECT MESSAGE</span>
          <h2>What's on your mind?</h2>
          <p>Fill out the fields below and our team will get back to you within 24 hours.</p>

          <form class="contact-form" onsubmit="event.preventDefault(); notify('Message received! Support Ticket #CO-9214 created.'); this.reset();">
            <div class="form-row">
              <label>Your Full Name<input required placeholder="e.g. Maya Lin"></label>
              <label>Email Address<input type="email" required placeholder="maya@example.com"></label>
            </div>
            <label>Topic
              <select required>
                <option value="">Choose a topic</option>
                <option>General Inquiries</option>
                <option>Club Leadership Support</option>
                <option>Event Hosting</option>
                <option>Safety & Moderation</option>
              </select>
            </label>
            <label>Message<textarea required rows="4" placeholder="How can we help?"></textarea></label>
            <button class="btn btn-primary btn-lg" type="submit">Send Message →</button>
          </form>
        </section>

        <aside class="contact-aside">
          <div class="contact-info-card">
            <span class="contact-icon lavender">✉️</span>
            <h3>Direct Email</h3>
            <b>hello@cluborbit.example</b>
            <small>Mon – Fri, 9:00 AM – 6:00 PM IST</small>
          </div>
          <div class="contact-note">
            <span style="font-size:22px;">🛡️</span>
            <div>
              <b>Safety & Trust Priority</b>
              <p>Reports and violations are reviewed within 1 hour by our task force.</p>
            </div>
          </div>
        </aside>
      </div>

      <section class="faq-section">
        <div class="section-heading">
          <div><div class="eyebrow">COMMON QUESTIONS</div><h2>Frequently asked <span>questions.</span></h2></div>
        </div>
        <div class="faq-grid">
          <details class="faq-item">
            <summary><span>Is ClubOrbit free to use?</span><span class="faq-plus">+</span></summary>
            <p>Yes! Discovering clubs, joining communities, participating in discussions, and RSVPing is 100% free.</p>
          </details>
          <details class="faq-item">
            <summary><span>How do I create a club?</span><span class="faq-plus">+</span></summary>
            <p>Click '+ Create a Club' on the Clubs page to configure your cover, guidelines, and channels.</p>
          </details>
          <details class="faq-item">
            <summary><span>Can I host online events?</span><span class="faq-plus">+</span></summary>
            <p>Yes, we support both virtual workshops (Zoom/Meet/Twitch) and in-person meetups.</p>
          </details>
          <details class="faq-item">
            <summary><span>How is moderation handled?</span><span class="faq-plus">+</span></summary>
            <p>Every club has designated moderators with tools to pin, remove spam, and maintain kindness.</p>
          </details>
        </div>
      </section>
    </div>
  `;
}

// --- 7. MAIN RENDER CONTROLLER ---
function renderApp() {
  const mainContent = document.getElementById("main-content");
  if (!mainContent) return;

  // Update Navigation links in Header
  const navContainer = document.getElementById("main-nav");
  if (navContainer) {
    const navItems = state.isLoggedIn
      ? ["Home", "Clubs", "Events", "Discussions", "Profile", "About", "Contact"]
      : ["Home", "Events", "About", "Contact"];

    navContainer.innerHTML = navItems.map(item => `
      <button class="nav-link ${state.currentPage === item ? 'active' : ''}" onclick="navigateTo('${item}')">
        ${item}
      </button>
    `).join('') + (!state.isLoggedIn ? `
      <div class="mobile-guest-actions">
        <button class="btn btn-outline btn-sm" onclick="openModal('auth-modal')">Sign In</button>
      </div>
    ` : '');
  }

  // Update Auth Mode Badge in Header
  const authBadge = document.getElementById("auth-mode-badge");
  if (authBadge) {
    authBadge.className = `auth-mode-badge ${state.isLoggedIn ? 'logged-in' : 'guest'}`;
    authBadge.innerHTML = `
      <span class="mode-dot"></span>
      <span>${state.isLoggedIn ? 'Member (Auth)' : 'Public (Guest)'}</span>
    `;
  }

  // Update User Profile / Login buttons in Header
  const userActions = document.getElementById("header-user-actions");
  if (userActions) {
    if (state.isLoggedIn) {
      userActions.innerHTML = `
        <div class="profile-wrap">
          <button class="mini-profile" onclick="document.getElementById('profile-dropdown')?.classList.toggle('show');">
            <span class="avatar avatar-me">${state.currentUser.avatar}</span>
            <span style="font-size:10px;">▾</span>
          </button>
          <div id="profile-dropdown" class="profile-dropdown">
            <div class="dropdown-user">
              <span class="avatar avatar-me">${state.currentUser.avatar}</span>
              <div><b>${state.currentUser.name}</b><small>${state.currentUser.handle}</small></div>
            </div>
            <button onclick="navigateTo('Profile')">👤 My Profile</button>
            <button onclick="navigateTo('Clubs')">🪐 My Communities</button>
            <button onclick="navigateTo('Discussions')">💬 Discussions</button>
            <div class="dropdown-divider"></div>
            <button class="logout-btn" onclick="toggleAuthMode()">Log Out</button>
          </div>
        </div>
      `;
    } else {
      userActions.innerHTML = `
        <div class="header-auth-buttons">
          <button class="btn btn-quiet btn-sm" onclick="openModal('auth-modal')">Sign In</button>
          <button class="btn btn-primary btn-sm" onclick="openModal('auth-modal')">Get Started</button>
        </div>
      `;
    }
  }

  // Render Page Content
  let pageHtml = '';
  switch (state.currentPage) {
    case 'Home': pageHtml = renderHomeScreen(); break;
    case 'Clubs': pageHtml = renderClubsScreen(); break;
    case 'Events': pageHtml = renderEventsScreen(); break;
    case 'Discussions': pageHtml = renderDiscussionsScreen(); break;
    case 'Profile': pageHtml = renderProfileScreen(); break;
    case 'About': pageHtml = renderAboutScreen(); break;
    case 'Contact': pageHtml = renderContactScreen(); break;
    default: pageHtml = renderHomeScreen();
  }
  mainContent.innerHTML = pageHtml;

  // Handle Mockup Mode Frame
  const mockupOuter = document.getElementById("mockup-mode-container");
  const standardShell = document.getElementById("standard-app-shell");
  const mockupUrl = document.getElementById("mockup-address-text");

  if (mockupUrl) {
    mockupUrl.textContent = `https://cluborbit.io/${state.currentPage.toLowerCase()}`;
  }

  if (state.isMockupMode) {
    if (mockupOuter) mockupOuter.classList.add("show");
    const mockupInner = document.getElementById("browser-viewport-inner");
    if (mockupInner && standardShell && standardShell.parentElement !== mockupInner) {
      mockupInner.appendChild(standardShell);
    }
  } else {
    if (mockupOuter) mockupOuter.classList.remove("show");
    const body = document.body;
    if (standardShell && standardShell.parentElement !== body) {
      body.insertBefore(standardShell, mockupOuter);
    }
  }
}

// --- 8. INITIALIZATION ON DOM READY ---
document.addEventListener("DOMContentLoaded", () => {
  // Populate Club Select Dropdowns in Modals
  const clubSelects = ["new-event-club", "new-disc-club"];
  clubSelects.forEach(selectId => {
    const sel = document.getElementById(selectId);
    if (sel) {
      sel.innerHTML = state.clubs.map(c => `
        <option value="${c.id}">${c.name} (${c.category})</option>
      `).join('');
    }
  });

  // Global close on modal backdrop click
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove("show");
      }
    });
  });

  // Initialize App Render
  renderApp();
});
