// Matrix Rain
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const fontSize = 14;
const columns = canvas.width / fontSize;
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
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
});

// Animations
setTimeout(() => document.getElementById('terminal').classList.add('reveal'), 800);
setTimeout(() => document.querySelector('.bio').classList.add('reveal'), 2000);
setTimeout(() => document.getElementById('challengeCards').classList.add('reveal'), 2800);

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  localStorage.theme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
});

// Load theme
if (localStorage.theme === 'light' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: light)').matches))
  document.documentElement.classList.add('light');

// Challenges
const challenges = [
  // Misc
  
  {title:"Reverse Metadata Part 1",file:"CTF/patriotCTF2025/Misc/ReverseMetaData1.html",flag:"MASONCC{images_****}",type:"misc"},
  {title:"Reverse Metadata Part 2",file:"CTF/patriotCTF2025/Misc/ReverseMetaData2.html",flag:"PCTF{hidden_****}",type:"misc"},


  // Web

   {title:"Reverse Metadata Part 1",file:"CTF/PatriotCTF2025/Web/ConnectionTester.html",flag:"PCTF{C0nnection_****}",type:"web"},
   {title:"Reverse Metadata Part 1",file:"CTF/PatriotCTF2025/Web/FeedbackFallout.html",flag:"{SQLI_****}",type:"web"},
   {title:"Reverse Metadata Part 1",file:"CTF/PatriotCTF2025/Web/SecureAuth.html",flag:"PCTF{cant_****}",type:"web"},
   {title:"Reverse Metadata Part 1",file:"CTF/PatriotCTF2025/Web/TrustFall.html",flag:"PCTF{auth_****}",type:"web"},
   {title:"Reverse Metadata Part 1",file:"CTF/PatriotCTF2025/Web/TrustVault.html",flag:"FLAG{py7h0n_****}",type:"web"},

  // Crypto




  // Pwn




 // Forensics
];

document.getElementById("solveCounter").textContent = challenges.length + " SOLVED";

function renderChallenges(filter = "all") {
  const container = document.getElementById("challengeCards");
  container.innerHTML = "";
  const filtered = filter === "all" ? challenges : challenges.filter(c => c.type === filter);
  filtered.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="category-tag tag-${c.type}">${c.type.toUpperCase()}</div>
      <h3>${c.title}</h3>
      <p class="flag">Flag: <code>${c.flag}</code></p>
      <span style="opacity:0.7">Click for writeup</sapan>
    `;
    card.onclick = () => location.href = c.file;
    container.appendChild(card);
  });
}

document.querySelectorAll('#challengeTabs .tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('#challengeTabs .tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderChallenges(tab.dataset.cat);
  });
});

// CTF Modal
const ctfs = [
  { name: "PatriotCTF 2025", link: "CTF/PatriotCTF2025/patriotctf2025.html", solves: "6+", status: "Ended", color: "var(--gray)" },
  // Add more CTFs here
];

function renderCTFs() {
  document.getElementById("ctfGrid").innerHTML = ctfs.map(ctf => `
    <div class="ctf-card" onclick="location.href='${ctf.link}'">
      <h3>${ctf.name}</h3>
      <p>${ctf.solves} solves</p>
      <p style="color:${ctf.color};font-weight:bold">${ctf.status}</p>
    </div>
  `).join('');
}
renderCTFs();

document.getElementById('ctfToggle').addEventListener('click', () => {
  document.getElementById('ctfModal').classList.add('open');
});
document.querySelector('.close-modal').addEventListener('click', () => {
  document.getElementById('ctfModal').classList.remove('open');
});
document.getElementById('ctfModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('ctfModal')) {
    document.getElementById('ctfModal').classList.remove('open');
  }
});

renderChallenges();
