const canvas = document.getElementById('matrix');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
  const fontSize = 14;
  let columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(13,17,23,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  setInterval(draw, 30);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
  });
}

// === CHALLENGES DATA ===
const challenges = [
  {title:"Reverse Metadata Part 1", file:"CTF/PatriotCTF2025/Misc/ReverseMetaData1", flag:"MASONCC{images_****}", type:"misc"},
  {title:"Reverse Metadata Part 2", file:"CTF/PatriotCTF2025/Misc/ReverseMetaData2", flag:"PCTF{hidden_****}", type:"misc"},
  {title:"Connection Tester", file:"CTF/PatriotCTF2025/Web/ConnectionTester", flag:"PCTF{C0nnection_****}", type:"web"},
  {title:"Feedback Fallout", file:"CTF/PatriotCTF2025/Web/FeedbackFallout", flag:"PCTF{SQLI_****}", type:"web"},
  {title:"Secure Auth", file:"CTF/PatriotCTF2025/Web/SecureAuth", flag:"PCTF{cant_****}", type:"web"},
  {title:"Trust Fall", file:"CTF/PatriotCTF2025/Web/TrustFall", flag:"PCTF{auth_****}", type:"web"},
  {title:"Trust Vault", file:"CTF/PatriotCTF2025/Web/TrustVault", flag:"FLAG{py7h0n_****}", type:"web"},
];

// CHANGE THIS TO YOUR PREFERENCE:
const TOTAL_CHALLENGES_IN_CTF = 35; // ← Set real total here (or set to null to hide)

// === UPDATE COUNTERS & PROGRESS RING ===
function updateCounters() {
  const solved = challenges.length;

  // Main header counter
  document.getElementById("solveCounter").textContent = `${solved} SOLVED`;

  // Sidebar counter
  const sidebarCounter = document.getElementById("sidebarSolveCounter");
  if (TOTAL_CHALLENGES_IN_CTF) {
    sidebarCounter.textContent = `${solved} / ${TOTAL_CHALLENGES_IN_CTF}`;
  } else {
    sidebarCounter.textContent = `${solved} solved`;
  }

  // Progress ring (only if exists)
  const circle = document.getElementById('progressCircle');
  if (circle && TOTAL_CHALLENGES_IN_CTF) {
    const progress = (solved / TOTAL_CHALLENGES_IN_CTF) * 100;
    circle.style.strokeDasharray = `${progress} 100`;
  }
}

// === RECENT SOLVES (last 5, reversed = most recent first) ===
function populateRecentSolves() {
  const list = document.getElementById('recentSolvesList');
  if (!list) return;

  list.innerHTML = '';
  const recent = challenges.slice(-5).reverse(); // last 5 = most recent

  recent.forEach(chall => {
    const li = document.createElement('li');
    li.className = 'recent-solve-item';
    li.innerHTML = `
      <span class="tag tag-${chall.type}">${chall.title}</span>
    `;
    list.appendChild(li);
  });
}

// === RENDER CHALLENGES ===
function renderChallenges(filter = "all") {
  const container = document.getElementById("challengeCards");
  if (!container) return;

  container.innerHTML = "";
  const toShow = filter === "all" ? challenges : challenges.filter(c => c.type === filter);

  toShow.forEach(chall => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="category-tag tag-${chall.type}">${chall.type.toUpperCase()}</div>
      <h3>${chall.title}</h3>
      <p class="flag">Flag: <code>${chall.flag}</code></p>
      <span style="opacity:0.7">Click for writeup</span>
    `;
    card.onclick = () => location.href = chall.file;
    container.appendChild(card);
  });
}

// === TABS ===
document.querySelectorAll('#challengeTabs .tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('#challengeTabs .tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderChallenges(tab.dataset.cat);
  });
});

// === CTF MODAL ===
const ctfs = [
  { name: "PatriotCTF 2025", link: "CTF/PatriotCTF2025/patriotctf2025", solves: "7+", status: "Ended", color: "#8b949e" }
];

const grid = document.getElementById("ctfGrid");
if (grid) {
  grid.innerHTML = ctfs.map(c => `
    <div class="ctf-card" onclick="location.href='${c.link}'">
      <h3>${c.name}</h3>
      <p>${c.solves} solves</p>
      <p style="color:${c.color};font-weight:bold">${c.status}</p>
    </div>
  `).join('');
}

// Modal controls
document.getElementById('ctfToggle')?.addEventListener('click', () => {
  document.getElementById('ctfModal')?.classList.add('open');
});
document.querySelector('.close-modal')?.addEventListener('click', () => {
  document.getElementById('ctfModal')?.classList.remove('open');
});
document.getElementById('ctfModal')?.addEventListener('click', e => {
  if (e.target.id === 'ctfModal') document.getElementById('ctfModal').classList.remove('open');
});

// === THEME TOGGLE ===
document.getElementById('themeToggle')?.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  localStorage.theme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
});

// Apply saved theme
if (localStorage.theme === 'light' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
  document.documentElement.classList.add('light');
}

// === ANIMATIONS ON LOAD ===
setTimeout(() => document.getElementById('terminal')?.classList.add('reveal'), 800);
setTimeout(() => document.querySelector('.bio')?.classList.add('reveal'), 2000);
setTimeout(() => document.getElementById('challengeCards')?.classList.add('reveal'), 2800);

// === INITIALIZE EVERYTHING ===
renderChallenges();
updateCounters();
populateRecentSolves();
