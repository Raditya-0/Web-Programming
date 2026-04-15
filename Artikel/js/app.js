//  app.js — Auth, artikel, routing, utilities

/* Bootstrap & seed */
document.addEventListener('DOMContentLoaded', () => {
  seedData();       // dari data.js
  initPage();
});

/ Auth helpers */
function getCurrentUser() {
  const raw = localStorage.getItem('currentUser');
  return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

function requireAuth() {
  if (!getCurrentUser()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

/* Article helpers */
function getArticles() {
  return JSON.parse(localStorage.getItem('articles') || '[]');
}

function saveArticles(articles) {
  localStorage.setItem('articles', JSON.stringify(articles));
}

function getArticleById(id) {
  return getArticles().find(a => String(a.id) === String(id));
}

function getNextArticleId() {
  const articles = getArticles();
  if (!articles.length) return 1;
  return Math.max(...articles.map(a => Number(a.id))) + 1;
}

/* User helpers */
function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function getUserById(id) {
  return getUsers().find(u => u.id === id);
}

/* Avatar helpers */
const AVATAR_COLORS = [
  '#1a8917', '#2563eb', '#d97706', '#7c3aed',
  '#db2777', '#0891b2', '#65a30d', '#dc2626',
];

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function avatarHTML(name, size = 36) {
  const color = getAvatarColor(name);
  const initials = getInitials(name);
  return `<span class="avatar-initials" style="background:${color};width:${size}px;height:${size}px;font-size:${Math.round(size * 0.38)}px">${initials}</span>`;
}

/* Date helpers */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* Page router */
function initPage() {
  const page = document.body.dataset.page;
  renderNavbar();
  switch (page) {
    case 'index':    initIndex();    break;
    case 'login':    initLogin();    break;
    case 'register': initRegister(); break;
    case 'article':  initArticle();  break;
    case 'profile':  initProfile();  break;
    case 'write':    initWrite();    break;
  }
}

/* Navbar */
function renderNavbar() {
  const user = getCurrentUser();
  const authEl = document.getElementById('nav-auth');
  if (!authEl) return;

  if (user) {
    authEl.innerHTML = `
      <a href="write.html" class="btn btn-success btn-sm me-2 btn-write-nav text-white d-flex align-items-center gap-1" style="border-radius: 6px; padding: 0.4rem 0.8rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>
        Tulis
      </a>
      <div class="dropdown">
        <button class="btn btn-link p-0 d-flex align-items-center text-decoration-none dropdown-toggle-no-caret" type="button" data-bs-toggle="dropdown" style="border-radius: 50%;">
          ${avatarHTML(user.name, 40)}
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow-sm">
          <li><span class="dropdown-item-text small text-muted px-3 py-1">${user.email}</span></li>
          <li><hr class="dropdown-divider my-1"></li>
          <li><a class="dropdown-item" href="profile.html">Profil Saya</a></li>
          <li><a class="dropdown-item" href="write.html">Tulis Artikel</a></li>
          <li><hr class="dropdown-divider my-1"></li>
          <li><button class="dropdown-item text-danger" onclick="logout()">Keluar</button></li>
        </ul>
      </div>`;
  } else {
    authEl.innerHTML = `
      <a href="login.html" class="btn btn-outline-secondary btn-sm me-2">Masuk</a>
      <a href="register.html" class="btn btn-dark btn-sm">Daftar</a>`;
  }
}

/* INDEX PAGE */
function initIndex() {
  const articles = getArticles();
  renderFeatured(articles[0]);
  renderArticleGrid(articles.slice(1));
  renderSidebar(articles);
  initCategoryFilter(articles);
  
  const user = getCurrentUser();
  const btnStartWriting = document.getElementById('btn-start-writing');
  if (btnStartWriting && user) {
    btnStartWriting.href = 'write.html';
  }
}

function renderFeatured(article) {
  const el = document.getElementById('featured-article');
  if (!el || !article) return;
  el.innerHTML = `
    <div class="featured-card">
      <a href="article.html?id=${article.id}" class="featured-img-wrap">
        <img src="${article.imageUrl}" alt="${article.title}" loading="lazy">
      </a>
      <div class="featured-body">
        <span class="badge-cat">${article.category}</span>
        <a href="article.html?id=${article.id}" class="text-decoration-none">
          <h2 class="featured-title">${article.title}</h2>
        </a>
        <p class="featured-preview">${article.preview}</p>
        <div class="article-meta d-flex align-items-center gap-2 mt-3">
          ${avatarHTML(article.authorName, 28)}
          <span class="meta-author">${article.authorName}</span>
          <span class="meta-sep">·</span>
          <span class="meta-date">${formatDate(article.date)}</span>
          <span class="meta-sep">·</span>
          <span class="meta-read">${article.readTime} menit baca</span>
        </div>
      </div>
    </div>`;
}

function renderArticleGrid(articles, containerId = 'article-grid') {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!articles.length) {
    el.innerHTML = '<p class="text-muted text-center py-5">Tidak ada artikel ditemukan.</p>';
    return;
  }
  el.innerHTML = articles.map(articleCardHTML).join('');
}

function articleCardHTML(article) {
  return `
    <div class="article-card" data-category="${article.category}">
      <a href="article.html?id=${article.id}" class="card-img-wrap">
        <img src="${article.imageUrl}" alt="${article.title}" loading="lazy">
      </a>
      <div class="card-body-custom">
        <div class="d-flex align-items-center gap-2 mb-2">
          ${avatarHTML(article.authorName, 24)}
          <span class="card-author">${article.authorName}</span>
        </div>
        <a href="article.html?id=${article.id}" class="text-decoration-none">
          <h3 class="card-title-custom">${article.title}</h3>
        </a>
        <p class="card-preview">${article.preview.substring(0, 120)}…</p>
        <div class="card-footer-custom d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-2">
            <span class="badge-cat">${article.category}</span>
            <span class="meta-read">${article.readTime} menit</span>
          </div>
          <span class="meta-date">${formatDate(article.date)}</span>
        </div>
      </div>
    </div>`;
}

function renderSidebar(articles) {
  renderTopics();
  renderRecommendedAuthors(articles);
}

function renderTopics() {
  const el = document.getElementById('sidebar-topics');
  if (!el) return;
  const topics = ['Teknologi', 'Kampus', 'Riset', 'Opini'];
  el.innerHTML = topics.map(t =>
    `<a href="#" class="topic-chip" onclick="filterByCategory('${t}'); return false;">${t}</a>`
  ).join('');
}

function renderRecommendedAuthors(articles) {
  const el = document.getElementById('sidebar-authors');
  if (!el) return;
  const authorMap = {};
  articles.forEach(a => {
    if (!authorMap[a.authorId]) {
      authorMap[a.authorId] = { id: a.authorId, name: a.authorName, count: 0 };
    }
    authorMap[a.authorId].count++;
  });
  const sorted = Object.values(authorMap).sort((a, b) => b.count - a.count).slice(0, 4);
  el.innerHTML = sorted.map(a => `
    <a href="profile.html?id=${a.id}" class="d-flex align-items-center gap-3 author-rec-row text-decoration-none">
      ${avatarHTML(a.name, 40)}
      <div>
        <div class="fw-semibold small author-rec-name text-dark">${a.name}</div>
        <div class="text-muted" style="font-size:.78rem">${a.count} artikel</div>
      </div>
    </a>`).join('');
}

function initCategoryFilter(articles) {
  const btns = document.querySelectorAll('[data-filter]');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      const filtered = cat === 'Semua' ? articles.slice(1) : articles.slice(1).filter(a => a.category === cat);
      renderArticleGrid(filtered);
    });
  });
}

function filterByCategory(cat) {
  const btn = document.querySelector(`[data-filter="${cat}"]`);
  if (btn) btn.click();
}

/* LOGIN PAGE */
function initLogin() {
  if (getCurrentUser()) { window.location.href = 'index.html'; return; }
  const form = document.getElementById('login-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors(form);
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!validateEmail(email)) { showError(form.email, 'Format email tidak valid.'); return; }
    if (!password) { showError(form.password, 'Password tidak boleh kosong.'); return; }

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) { showError(form.password, 'Email atau password salah.'); return; }

    setCurrentUser(user);
    window.location.href = 'index.html';
  });
}

/* REGISTER PAGE */
function initRegister() {
  if (getCurrentUser()) { window.location.href = 'index.html'; return; }
  const form = document.getElementById('register-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors(form);
    const name     = form.fullname.value.trim();
    const email    = form.email.value.trim();
    const password = form.password.value;
    const confirm  = form.confirm.value;

    let valid = true;
    if (!name) { showError(form.fullname, 'Nama lengkap wajib diisi.'); valid = false; }
    if (!validateEmail(email)) { showError(form.email, 'Format email tidak valid.'); valid = false; }
    if (password.length < 6) { showError(form.password, 'Password minimal 6 karakter.'); valid = false; }
    if (password !== confirm) { showError(form.confirm, 'Konfirmasi password tidak cocok.'); valid = false; }
    if (!valid) return;

    const users = getUsers();
    if (users.find(u => u.email === email)) {
      showError(form.email, 'Email sudah terdaftar.');
      return;
    }

    const newUser = {
      id: 'u' + Date.now(),
      name,
      email,
      password,
      bio: '',
      joinDate: new Date().toISOString().split('T')[0],
    };
    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);
    window.location.href = 'index.html';
  });
}

/* ARTICLE PAGE */
function initArticle() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const article = getArticleById(id);
  if (!article) {
    document.getElementById('article-container').innerHTML =
      '<div class="text-center py-5"><h3>Artikel tidak ditemukan.</h3><a href="index.html" class="btn btn-outline-secondary mt-3">Kembali</a></div>';
    return;
  }

  document.title = article.title + ' — KampusKita';
  document.getElementById('article-title').textContent = article.title;
  document.getElementById('article-author-avatar').innerHTML = avatarHTML(article.authorName, 44);
  document.getElementById('article-author-name').textContent = article.authorName;
  document.getElementById('article-date').textContent = formatDate(article.date);
  document.getElementById('article-readtime').textContent = article.readTime + ' menit baca';
  document.getElementById('article-body').innerHTML = article.content;
  document.getElementById('article-hero-img').src = article.imageUrl;
  document.getElementById('article-hero-img').alt = article.title;

  // Tags
  const tagsEl = document.getElementById('article-tags');
  if (tagsEl) {
    tagsEl.innerHTML = article.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');
  }

  // Claps
  initClaps(article);

  // Related articles
  const related = getArticles()
    .filter(a => String(a.id) !== String(id) && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 3);
  renderArticleGrid(related.length ? related : getArticles().filter(a => String(a.id) !== String(id)).slice(0, 3), 'related-grid');
}

function initClaps(article) {
  const key = `claps_${article.id}`;
  const userClapKey = `clapped_${article.id}_${(getCurrentUser() || {}).id || 'anon'}`;

  let claps = parseInt(localStorage.getItem(key) || article.claps);
  const clapped = localStorage.getItem(userClapKey) === '1';

  const btn = document.getElementById('clap-btn');
  const counter = document.getElementById('clap-count');
  if (!btn || !counter) return;

  counter.textContent = claps;
  if (clapped) btn.classList.add('clapped');

  btn.addEventListener('click', () => {
    if (!getCurrentUser()) { window.location.href = 'login.html'; return; }
    if (localStorage.getItem(userClapKey) === '1') return;
    claps++;
    localStorage.setItem(key, claps);
    localStorage.setItem(userClapKey, '1');
    counter.textContent = claps;
    btn.classList.add('clapped');
    btn.querySelector('.clap-icon').classList.add('clap-animate');
    setTimeout(() => btn.querySelector('.clap-icon').classList.remove('clap-animate'), 400);
  });
}

/* PROFILE PAGE */
function initProfile() {
  const urlParams = new URLSearchParams(window.location.search);
  const authorId = urlParams.get('id');
  const currentUser = getCurrentUser();
  
  let user;
  let isOwnProfile = false;

  if (authorId) {
    user = getUserById(authorId);
    if (!user) {
      document.querySelector('main').innerHTML = '<p class="text-center mt-5">Pengguna tidak ditemukan.</p>';
      return;
    }
    isOwnProfile = (currentUser && currentUser.id === authorId);
  } else {
    if (!requireAuth()) return;
    user = currentUser;
    isOwnProfile = true;
  }

  document.getElementById('profile-avatar').innerHTML = avatarHTML(user.name, 80);
  document.getElementById('profile-name').textContent = user.name;
  document.getElementById('profile-bio').textContent = user.bio || 'Belum ada bio.';
  document.getElementById('profile-join').textContent = 'Bergabung ' + formatDate(user.joinDate);

  const myArticles = getArticles().filter(a => String(a.authorId) === String(user.id));
  document.getElementById('profile-article-count').textContent = myArticles.length;

  renderMyArticles(myArticles, isOwnProfile);

  // Hide Edit button and Saved tab if viewing someone else's profile
  const btnEdit = document.querySelector('[data-bs-target="#editProfileModal"]');
  const tabsNav = document.getElementById('profile-tabs');
  const savedTab = document.querySelector('#profile-tabs [data-tab="saved"]');
  const myArticlesTab = document.querySelector('#profile-tabs [data-tab="my-articles"]');
  
  if (!isOwnProfile) {
    if (btnEdit) btnEdit.style.display = 'none';
    if (savedTab) savedTab.parentElement.style.display = 'none';
    if (myArticlesTab) myArticlesTab.textContent = 'Artikel Penulis';
  } else {
    renderSavedArticles(user);
    initProfileEdit(user);
    initProfileTabs(user);
  }
}

function renderMyArticles(articles, isOwnProfile) {
  const el = document.getElementById('my-articles-list');
  if (!el) return;
  if (!articles.length) {
    el.innerHTML = `<p class="text-muted text-center py-4">${isOwnProfile ? 'Kamu' : 'Penulis'} belum menulis artikel.</p>`;
    return;
  }
  el.innerHTML = articles.map(a => `
    <div class="profile-article-row d-flex gap-3 align-items-start">
      <img src="${a.imageUrl}" alt="${a.title}" class="profile-article-thumb">
      <div class="flex-grow-1">
        <a href="article.html?id=${a.id}" class="text-decoration-none text-dark">
          <h6 class="fw-semibold mb-1 profile-article-title">${a.title}</h6>
        </a>
        <p class="text-muted small mb-1">${a.preview.substring(0, 80)}…</p>
        <div class="d-flex gap-2 align-items-center">
          <span class="badge-cat">${a.category}</span>
          <span class="text-muted" style="font-size:.78rem">${formatDate(a.date)}</span>
        </div>
      </div>
    </div>`).join('');
}

function renderSavedArticles(user) {
  const el = document.getElementById('saved-articles-list');
  if (!el) return;
  const savedIds = JSON.parse(localStorage.getItem(`saved_${user.id}`) || '[]');
  const saved = getArticles().filter(a => savedIds.includes(String(a.id)));
  if (!saved.length) {
    el.innerHTML = '<p class="text-muted text-center py-4">Belum ada artikel yang disimpan.</p>';
    return;
  }
  el.innerHTML = saved.map(a => `
    <div class="profile-article-row d-flex gap-3 align-items-start">
      <img src="${a.imageUrl}" alt="${a.title}" class="profile-article-thumb">
      <div class="flex-grow-1">
        <a href="article.html?id=${a.id}" class="text-decoration-none text-dark">
          <h6 class="fw-semibold mb-1 profile-article-title">${a.title}</h6>
        </a>
        <div class="d-flex gap-2 align-items-center">
          <span class="badge-cat">${a.category}</span>
          <span class="text-muted" style="font-size:.78rem">${formatDate(a.date)}</span>
        </div>
      </div>
    </div>`).join('');
}

function initProfileEdit(user) {
  const form = document.getElementById('edit-profile-form');
  if (!form) return;
  form.fullname.value = user.name;
  form.bio.value = user.bio || '';

  form.addEventListener('submit', e => {
    e.preventDefault();
    const newName = form.fullname.value.trim();
    const newBio  = form.bio.value.trim();
    if (!newName) { showError(form.fullname, 'Nama tidak boleh kosong.'); return; }

    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx].name = newName;
      users[idx].bio  = newBio;
      saveUsers(users);
      setCurrentUser(users[idx]);
    }
    bootstrap.Modal.getInstance(document.getElementById('editProfileModal')).hide();
    location.reload();
  });
}

function initProfileTabs(user) {
  document.querySelectorAll('#profile-tabs .nav-link').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#profile-tabs .nav-link').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.querySelectorAll('.tab-content-panel').forEach(p => p.classList.add('d-none'));
      document.getElementById(`tab-${target}`).classList.remove('d-none');
    });
  });
}

/* WRITE PAGE */
function initWrite() {
  if (!requireAuth()) return;
  const form = document.getElementById('write-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors(form);
    const title    = form['article-title'].value.trim();
    const content  = form['article-content'].value.trim();
    const category = form['article-category'].value;

    let valid = true;
    if (!title) { showError(form['article-title'], 'Judul wajib diisi.'); valid = false; }
    if (content.length < 50) { showError(form['article-content'], 'Isi artikel minimal 50 karakter.'); valid = false; }
    if (!valid) return;

    const user = getCurrentUser();
    const articles = getArticles();
    const id = getNextArticleId();
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.max(1, Math.round(wordCount / 200));
    const imgSeed = 'user' + id;

    const newArticle = {
      id,
      title,
      preview: content.substring(0, 180),
      content: content.split('\n\n').map(p => p.trim()).filter(Boolean)
        .map(p => p.startsWith('#') ? `<h2>${p.replace(/^#+\s*/, '')}</h2>` : `<p>${p}</p>`)
        .join('\n'),
      authorId: user.id,
      authorName: user.name,
      date: new Date().toISOString().split('T')[0],
      category,
      readTime,
      imageUrl: `https://picsum.photos/seed/${imgSeed}/800/400`,
      claps: 0,
      tags: [category],
    };

    articles.unshift(newArticle);
    saveArticles(articles);
    window.location.href = `article.html?id=${id}`;
  });
}

/* Form validation helpers */
function showError(input, message) {
  input.classList.add('is-invalid');
  let fb = input.parentElement.querySelector('.invalid-feedback');
  if (!fb) {
    fb = document.createElement('div');
    fb.className = 'invalid-feedback';
    input.parentElement.appendChild(fb);
  }
  fb.textContent = message;
}

function clearErrors(form) {
  form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
  form.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
