// MATRIX RAIN
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let w, h, columns, drops;

function initMatrix() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  columns = Math.floor(w / 14);
  drops = Array(columns).fill(1);
}
function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0,0,w,h);
  ctx.fillStyle = '#0f0';
  ctx.font = '14px monospace';
  for (let i = 0; i < drops.length; i++) {
    const text = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"[Math.floor(Math.random()*58)];
    ctx.fillText(text, i*14, drops[i]*14);
    if (drops[i]*14 > h && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
initMatrix();
setInterval(drawMatrix, 35);
window.addEventListener('resize', initMatrix);

// ANIMATIONS
setTimeout(() => document.getElementById('terminal')?.classList.add('reveal'), 800);
setTimeout(() => document.querySelector('.bio')?.classList.add('reveal'), 2000);
setTimeout(() => document.getElementById('challengeCards')?.classList.add('reveal'), 2800);

// THEME
document.getElementById('themeToggle').addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  localStorage.theme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
});
if (localStorage.theme === 'light' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
  document.documentElement.classList.add('light');
}

// CHALLENGES
const challenges = [
  {title:"Reverse Metadata Part 1", file:"CTF/PatriotCTF2025/Misc/ReverseMetaData1.html", flag:"MASONCC{images_can_hide_more_than_pixels}", type:"misc"},
  {title:"Reverse Metadata Part 2", file:"CTF/PatriotCTF2025/Misc/ReverseMetaData2.html", flag:"PCTF{hidden_in_plain_sight_but_not_really}", type:"misc"},
  {title:"Connection Tester", file:"CTF/PatriotCTF2025/Web/ConnectionTester.html", flag:"PCTF{C0nnection_t3st3d_and_pwned}", type:"web"},
  {title:"Feedback Fallout", file:"CTF/PatriotCTF2025/Web/FeedbackFallout.html", flag:"PCTF{SQLI_is_still_king_in_2025}", type:"web"},
  {title:"Secure Auth", file:"CTF/PatriotCTF2025/Web/SecureAuth.html", flag:"PCTF{cant_touch_this_jwt}", type:"web"},
  {title:"Trust Fall", file:"CTF/PatriotCTF2025/Web/TrustFall.html", flag:"PCTF{auth_bypass_never_fails}", type:"web"},
  {title:"Trust Vault", file:"CTF/PatriotCTF2025/Web/TrustVault.html", flag:"FLAG{py7h0n_pickl3_is_d4nger0us}", type:"web"},
];

document.getElementById("solveCounter").textContent = challenges.length + " SOLVED";

let currentFilter = "all";
let searchQuery = "";

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function highlight(text, query) {
  if (!query) return escapeHtml(text);
  const regex = new RegExp(`(${query})`, 'gi');
  return escapeHtml(text).replace(regex, '<span class="highlight">$1</span>');
}

function render() {
  const container = document.getElementById("challengeCards");
  const empty = document.getElementById("emptyState");
  let list = challenges;

  if (currentFilter !== "all") list = list.filter(c => c.type === currentFilter);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(c => c.title.toLowerCase().includes(q) || c.flag.toLowerCase().includes(q));
  }

  container.innerHTML = "";
  empty.style.display = list.length === 0 ? "block" : "none";

  list.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="category-tag tag-${c.type}">${c.type.toUpperCase()}</div>
      <h3>${highlight(c.title, searchQuery)}</h3>
      <p class="flag">Flag: <code>${highlight(c.flag, searchQuery)}</code></p>
      <small>Click for writeup</small>
    `;
    card.onclick = () => location.href = c.file;
    container.appendChild(card);
  });
}

// SEARCH + TABS
document.getElementById("searchInput").addEventListener("input", e => {
  searchQuery = e.target.value.trim();
  render();
});

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentFilter = tab.dataset.cat;
    render();
  });
});

// CTF MODAL
document.getElementById("ctfToggle").addEventListener("click", () => {
  document.getElementById("ctfModal").classList.add("open");
});
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("ctfModal").classList.remove("open");
});
document.getElementById("ctfModal").addEventListener("click", e => {
  if (e.target === e.currentTarget) document.getElementById("ctfModal").classList.remove("open");
});

document.getElementById("ctfGrid").innerHTML = `
  <div class="ctf-card" onclick="location.href='CTF/PatriotCTF2025/patriotctf2025.html'">
    <h3>PatriotCTF 2025</h3>
    <p><strong>7+</strong> solves • <span style="color:#8b949e">Ended</span></p>
  </div>
`;

// INITIAL RENDER
render();
