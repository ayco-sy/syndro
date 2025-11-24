// === MATRIX RAIN (SAFE) ===
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
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';
    drops.forEach((y,i) => {
      const text = chars[Math.floor(Math.random()*chars.length)];
      ctx.fillText(text, i*fontSize, y*fontSize);
      if (y*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }
  setInterval(draw, 35);
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
  });
}

// === ANIMATIONS ===
setTimeout(() => document.getElementById('terminal')?.classList.add('reveal'), 800);
setTimeout(() => document.querySelector('.bio')?.classList.add('reveal'), 2000);
setTimeout(() => document.getElementById('challengeCards')?.classList.add('reveal'), 2800);

// === THEME TOGGLE ===
document.getElementById('themeToggle')?.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  localStorage.theme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
});
if (localStorage.theme === 'light' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
  document.documentElement.classList.add('light');
}

// === CHALLENGES ===
const challenges = [
  {title:"Reverse Metadata Part 1", file:"CTF/PatriotCTF2025/Misc/ReverseMetaData1", flag:"MASONCC{images_****}", type:"misc"},
  {title:"Reverse Metadata Part 2", file:"CTF/PatriotCTF2025/Misc/ReverseMetaData2", flag:"PCTF{hidden_****}", type:"misc"},
  {title:"Connection Tester", file:"CTF/PatriotCTF2025/Web/ConnectionTester", flag:"PCTF{C0nnection_****}", type:"web"},
  {title:"Feedback Fallout", file:"CTF/PatriotCTF2025/Web/FeedbackFallout", flag:"PCTF{SQLI_****}", type:"web"},
  {title:"Secure Auth", file:"CTF/PatriotCTF2025/Web/SecureAuth", flag:"PCTF{cant_****}", type:"web"},
  {title:"Trust Fall", file:"CTF/PatriotCTF2025/Web/TrustFall", flag:"PCTF{auth_****}", type:"web"},
  {title:"Trust Vault", file:"CTF/PatriotCTF2025/Web/TrustVault", flag:"FLAG{py7h0n_****}", type:"web"},
];

document.getElementById("solveCounter").textContent = challenges.length + " SOLVED";

function renderChallenges(filter = "all") {
  const container = document.getElementById("challengeCards");
  if (!container) return;
  container.innerHTML = "";
  const filtered = filter === "all" ? challenges : challenges.filter(c => c.type === filter);
  filtered.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="category-tag tag-${c.type}">${c.type.toUpperCase()}</div>
      <h3>${c.title}</h3>
      <p class="flag">Flag: <code>${c.flag}</code></p>
      <span style="opacity:0.7">Click for writeup</span>
    `;
    card.onclick = () => location.href = c.file;
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

document.getElementById('ctfModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'ctfModal') {
    document.getElementById('ctfModal').classList.remove('open');
  }
});

// === INITIAL RENDER ===
renderChallenges();
