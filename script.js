/* =============================================================
   ClubOrbit — Clean Client-side UI Interactivity Script
   Pure Vanilla JavaScript · Zero Dependencies · No Build Tools
============================================================= */

// Global State
const appState = {
  isLoggedIn: localStorage.getItem('co_isLoggedIn') !== 'false', // default true
  isMockup: false,
  userName: localStorage.getItem('co_userName') || 'Sahil Shinde',
  userRole: 'Lead Community Architect & Full-Stack Crafter',
  userBio: localStorage.getItem('co_userBio') || 'Architecting high-signal tech communities, Indie hacking, and building full-stack products.',
  userLocation: localStorage.getItem('co_userLoc') || 'Mumbai, India',
  userAvatar: 'SS',
  joinedClubs: JSON.parse(localStorage.getItem('co_joinedClubs') || '[1, 2, 6]'),
  followedClubs: JSON.parse(localStorage.getItem('co_followedClubs') || '[1, 2, 4, 6]'),
  registeredEvents: JSON.parse(localStorage.getItem('co_registeredEvents') || '[1, 3]'),
  likedDiscussions: JSON.parse(localStorage.getItem('co_likedDiscussions') || '[1, 2]'),
  savedDiscussions: JSON.parse(localStorage.getItem('co_savedDiscussions') || '[1]')
};

function saveState() {
  localStorage.setItem('co_isLoggedIn', appState.isLoggedIn);
  localStorage.setItem('co_userName', appState.userName);
  localStorage.setItem('co_userBio', appState.userBio);
  localStorage.setItem('co_userLoc', appState.userLocation);
  localStorage.setItem('co_joinedClubs', JSON.stringify(appState.joinedClubs));
  localStorage.setItem('co_followedClubs', JSON.stringify(appState.followedClubs));
  localStorage.setItem('co_registeredEvents', JSON.stringify(appState.registeredEvents));
  localStorage.setItem('co_likedDiscussions', JSON.stringify(appState.likedDiscussions));
  localStorage.setItem('co_savedDiscussions', JSON.stringify(appState.savedDiscussions));
}

// Toast Notifications
let toastTimeout = null;
function notify(message) {
  let toast = document.getElementById('toast');
  let toastMsg = document.getElementById('toast-message');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.innerHTML = '<span>✓</span> <span id="toast-message"></span>';
    document.body.appendChild(toast);
    toastMsg = document.getElementById('toast-message');
  }
  if (toastMsg) toastMsg.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Modal Controllers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('show');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('show');
}

// Close modals when clicking backdrop
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('show');
  }
  // Close dropdowns when clicking outside
  if (!e.target.closest('.notification-wrap')) {
    document.getElementById('notif-dropdown')?.classList.remove('show');
  }
  if (!e.target.closest('.profile-wrap')) {
    document.getElementById('profile-dropdown')?.classList.remove('show');
  }
});

// Mockup Mode Toggle (9:16 Aspect Ratio)
function toggleMockupMode() {
  appState.isMockup = !appState.isMockup;
  const standardShell = document.getElementById('standard-app-shell');
  const mockupContainer = document.getElementById('mockup-mode-container');
  const viewportInner = document.getElementById('browser-viewport-inner');
  const toggleBtns = document.querySelectorAll('.mockup-toggle-btn');

  if (appState.isMockup) {
    if (mockupContainer && standardShell && viewportInner) {
      viewportInner.appendChild(standardShell);
      mockupContainer.classList.add('active');
    }
    toggleBtns.forEach(b => b.classList.add('active-mockup'));
    notify('Switched to 9:16 Showcase Mockup (1080×1920 Frame)');
  } else {
    if (mockupContainer && standardShell) {
      document.body.prepend(standardShell);
      mockupContainer.classList.remove('active');
    }
    toggleBtns.forEach(b => b.classList.remove('active-mockup'));
    notify('Switched to Full Responsive Web View');
  }
}

// Auth Mode Toggle (Public vs Member)
function toggleAuthMode() {
  appState.isLoggedIn = !appState.isLoggedIn;
  saveState();
  updateAuthUI();
  notify(appState.isLoggedIn ? 'Authenticated as Sahil Shinde (Member/Lead)' : 'Switched to Public Mode (Guest view)');
}

function updateAuthUI() {
  const badge = document.getElementById('auth-mode-badge');
  const badgeText = document.getElementById('auth-mode-text');
  const userActions = document.getElementById('header-user-actions');

  if (badge && badgeText) {
    if (appState.isLoggedIn) {
      badge.className = 'auth-mode-badge logged-in';
      badgeText.textContent = 'Member (Auth)';
    } else {
      badge.className = 'auth-mode-badge guest';
      badgeText.textContent = 'Public (Guest)';
    }
  }

  if (userActions) {
    if (appState.isLoggedIn) {
      userActions.innerHTML = `
        <div class="profile-wrap">
          <button class="mini-profile" onclick="document.getElementById('profile-dropdown')?.classList.toggle('show');" aria-label="Profile Menu">
            <span class="avatar avatar-me">${appState.userAvatar}</span>
            <span style="font-size:10px;">▾</span>
          </button>
          <div id="profile-dropdown" class="profile-dropdown">
            <div class="dropdown-user">
              <span class="avatar avatar-me">${appState.userAvatar}</span>
              <div><b>${appState.userName}</b><small>@sahilshinde</small></div>
            </div>
            <a href="profile.html">👤 My Profile</a>
            <a href="clubs.html">🪐 My Communities</a>
            <a href="discussions.html">💬 Discussions</a>
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

  // Update Member-only elements visibility
  document.querySelectorAll('.member-only-feature').forEach(el => {
    el.style.display = appState.isLoggedIn ? '' : 'none';
  });
}

// Club Actions: Join / Leave
function toggleClubJoin(btn, clubId, clubName) {
  if (!appState.isLoggedIn) {
    openModal('auth-modal');
    return;
  }
  const id = Number(clubId);
  const idx = appState.joinedClubs.indexOf(id);
  if (idx >= 0) {
    appState.joinedClubs.splice(idx, 1);
    btn.className = 'btn btn-outline btn-sm';
    btn.innerHTML = '+ Join';
    notify(`You left ${clubName || 'the club'}`);
  } else {
    appState.joinedClubs.push(id);
    btn.className = 'btn btn-joined btn-sm';
    btn.innerHTML = '✓ Joined';
    notify(`Welcome! You are now a member of ${clubName || 'the club'}.`);
  }
  saveState();
}

// Club Actions: Follow / Unfollow
function toggleClubFollow(btn, clubId, clubName) {
  const id = Number(clubId);
  const idx = appState.followedClubs.indexOf(id);
  if (idx >= 0) {
    appState.followedClubs.splice(idx, 1);
    btn.classList.remove('is-followed');
    notify(`Unfollowed ${clubName || 'club'}`);
  } else {
    appState.followedClubs.push(id);
    btn.classList.add('is-followed');
    notify(`Following ${clubName || 'club'}!`);
  }
  saveState();
}

// Event Registration / RSVP
function toggleEventRSVP(btn, eventId, eventTitle) {
  if (!appState.isLoggedIn) {
    openModal('auth-modal');
    return;
  }
  const id = Number(eventId);
  const idx = appState.registeredEvents.indexOf(id);
  if (idx >= 0) {
    appState.registeredEvents.splice(idx, 1);
    if (btn) {
      btn.className = 'btn btn-primary btn-sm';
      btn.textContent = 'RSVP Now';
    }
    notify(`Registration cancelled for '${eventTitle || 'event'}'`);
  } else {
    appState.registeredEvents.push(id);
    if (btn) {
      btn.className = 'btn btn-joined btn-sm';
      btn.textContent = '✓ Registered';
    }
    notify(`Confirmed! You are registered for '${eventTitle || 'event'}'. Digital pass in Profile.`);
  }
  saveState();
}

// Discussion Like Toggle
function toggleDiscussionLike(btn, discId) {
  const id = Number(discId);
  const countEl = btn.querySelector('span');
  let currentLikes = parseInt(countEl?.textContent || '0', 10);
  const idx = appState.likedDiscussions.indexOf(id);
  if (idx >= 0) {
    appState.likedDiscussions.splice(idx, 1);
    btn.classList.remove('liked');
    if (countEl) countEl.textContent = Math.max(0, currentLikes - 1);
    notify('Like removed');
  } else {
    appState.likedDiscussions.push(id);
    btn.classList.add('liked');
    if (countEl) countEl.textContent = currentLikes + 1;
    notify('Liked discussion!');
  }
  saveState();
}

// Discussion Save Toggle
function toggleDiscussionSave(btn, discId) {
  const id = Number(discId);
  const idx = appState.savedDiscussions.indexOf(id);
  if (idx >= 0) {
    appState.savedDiscussions.splice(idx, 1);
    btn.classList.remove('saved-active');
    btn.classList.remove('is-saved');
    notify('Removed from saved items');
  } else {
    appState.savedDiscussions.push(id);
    btn.classList.add('saved-active');
    btn.classList.add('is-saved');
    notify('Discussion bookmarked in your Profile!');
  }
  saveState();
}

// Filter Functionality for Category Pills
function filterCategories(containerSelector, itemSelector, categoryAttr, selectedCat, activeClass = 'chip-active') {
  const chips = document.querySelectorAll(`${containerSelector} button`);
  chips.forEach(chip => {
    if (chip.textContent.trim().toLowerCase() === selectedCat.toLowerCase()) {
      chip.classList.add(activeClass);
    } else {
      chip.classList.remove(activeClass);
    }
  });

  const items = document.querySelectorAll(itemSelector);
  let visibleCount = 0;
  items.forEach(item => {
    const itemCat = item.getAttribute(categoryAttr) || '';
    if (selectedCat.toLowerCase() === 'all' || itemCat.toLowerCase() === selectedCat.toLowerCase()) {
      item.style.display = '';
      visibleCount++;
    } else {
      item.style.display = 'none';
    }
  });

  const countEl = document.getElementById('filter-results-count');
  if (countEl) countEl.textContent = `${visibleCount} communities to discover`;
}

// Search Filter
function searchFilter(inputEl, itemSelector, textSelector) {
  const query = inputEl.value.trim().toLowerCase();
  const items = document.querySelectorAll(itemSelector);
  items.forEach(item => {
    const text = item.querySelector(textSelector)?.textContent.toLowerCase() || '';
    if (!query || text.includes(query)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

// Discussion Comments Poster
function postComment(e, formEl, threadListId) {
  e.preventDefault();
  const input = formEl.querySelector('input') || formEl.querySelector('textarea');
  if (!input || !input.value.trim()) return;
  const content = input.value.trim();
  const list = document.getElementById(threadListId);
  if (list) {
    const commentEl = document.createElement('div');
    commentEl.className = 'thread-comment';
    commentEl.innerHTML = `
      <span class="avatar avatar-me" style="width:28px;height:28px;font-size:10px;">${appState.userAvatar}</span>
      <div class="comment-content">
        <div class="comment-author">
          <b>${appState.userName}</b>
          <span class="comment-role">Member</span>
          <small>Just now</small>
        </div>
        <p>${content}</p>
      </div>
    `;
    list.appendChild(commentEl);
    input.value = '';
    notify('Comment added to discussion!');
  }
}

// Profile Tab Switcher
function switchProfileTab(tabName) {
  document.querySelectorAll('.profile-tab-btn').forEach(btn => {
    btn.classList.toggle('active-tab', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.profile-tab-content').forEach(section => {
    section.style.display = section.id === `profile-tab-${tabName}` ? '' : 'none';
  });
}

// Club Details Tab Switcher
function switchClubTab(tabName) {
  document.querySelectorAll('.club-tab-nav button').forEach(btn => {
    btn.classList.toggle('active-tab', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.club-tab-content').forEach(section => {
    section.style.display = section.id === `club-tab-${tabName}` ? '' : 'none';
  });
}

// Handle Forms: Create Club
function handleCreateClubSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('new-club-name')?.value.trim();
  if (!name) return;
  notify(`Club "${name}" created successfully! Check directory.`);
  closeModal('create-club-modal');
  e.target.reset();
}

// Handle Forms: Create Event
function handleCreateEventSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('new-event-title')?.value.trim();
  if (!title) return;
  notify(`Event "${title}" published! Visible on calendar.`);
  closeModal('create-event-modal');
  e.target.reset();
}

// Handle Forms: Create Discussion
function handleCreateDiscussionSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('new-disc-title')?.value.trim();
  if (!title) return;
  notify(`Discussion "${title}" posted to community feed!`);
  closeModal('create-discussion-modal');
  e.target.reset();
}

// Handle Forms: Edit Profile
function handleEditProfileSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById('profile-name-input');
  const bioInput = document.getElementById('profile-bio-input');
  const locInput = document.getElementById('profile-loc-input');

  if (nameInput) appState.userName = nameInput.value.trim();
  if (bioInput) appState.userBio = bioInput.value.trim();
  if (locInput) appState.userLocation = locInput.value.trim();

  saveState();
  updateAuthUI();

  // Update profile text if on profile page
  const pName = document.getElementById('display-profile-name');
  const pBio = document.getElementById('display-profile-bio');
  const pLoc = document.getElementById('display-profile-loc');
  if (pName) pName.textContent = appState.userName;
  if (pBio) pBio.textContent = appState.userBio;
  if (pLoc) pLoc.textContent = appState.userLocation;

  notify('Profile updated successfully!');
  closeModal('edit-profile-modal');
}

// Initial Run on Page Load
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
});
