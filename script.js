// Matrix rain
const canvas = document.getElementById('matrix');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
  const fontSize = 19;
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

// Challenges
const challenges = [
  // Misc
  {title:"Reverse Metadata Part 1", file:"CTF/PatriotCTF2025/Misc/ReverseMetaData1", flag:"MASONCC{images_****}", type:"misc"},
  {title:"Reverse Metadata Part 2", file:"CTF/PatriotCTF2025/Misc/ReverseMetaData2", flag:"PCTF{hidden_****}", type:"misc"},

  // web
  {title:"Connection Tester", file:"CTF/PatriotCTF2025/Web/ConnectionTester", flag:"PCTF{C0nnection_****}", type:"web"},
  {title:"Feedback Fallout", file:"CTF/PatriotCTF2025/Web/FeedbackFallout", flag:"PCTF{SQLI_****}", type:"web"},
  {title:"Secure Auth", file:"CTF/PatriotCTF2025/Web/SecureAuth", flag:"PCTF{cant_****}", type:"web"},
  {title:"Trust Fall", file:"CTF/PatriotCTF2025/Web/TrustFall", flag:"PCTF{auth_****}", type:"web"},
  {title:"Trust Vault", file:"CTF/PatriotCTF2025/Web/TrustVault", flag:"FLAG{py7h0n_****}", type:"web"},
];

// MAIN PROGRESS + COLORED BACKGROUND + NEON TRAILS
function updateCategoryStats() {
  const solved = { web:0, misc:0, crypto:0, pwn:0, forensics:0, rev:0 };
  challenges.forEach(c => {
    if (solved.hasOwnProperty(c.type)) solved[c.type]++;
  });

  const totalSolved = challenges.length;

  fetch('totals.json')
    .then(r => r.json())
    .then(totals => {
      const totalChallenges = Object.values(totals).reduce((a,b) => a + b, 0);
      const percent = totalChallenges > 0 ? Math.round((totalSolved / totalChallenges) * 100) : 0;

      // Update progress
      const circle = document.getElementById('circle-overall');
      const text = document.getElementById('text-overall');
      const bgCircle = document.querySelector('.circle-bg-dynamic');

      if (circle) circle.style.strokeDashoffset = 100 - percent;
      if (text) text.textContent = `${percent}%`;

      // Color the background circle based on progress
      if (bgCircle) {
        if (percent >= 80) bgCircle.style.stroke = '#39ff14';
        else if (percent >= 60) bgCircle.style.stroke = '#00ff9d';
        else if (percent >= 40) bgCircle.style.stroke = '#00d0ff';
        else if (percent >= 20) bgCircle.style.stroke = '#ffa500';
        else bgCircle.style.stroke = '#ff2e63';
        bgCircle.style.opacity = 0.25 + (percent / 200);
      }

      // Trails
      const container = document.getElementById('category-trails');
      container.innerHTML = '';

      const cats = [
        {type:'web',       label:'WEB',       angle:60},
        {type:'misc',      label:'MISC',      angle:130},
        {type:'crypto',    label:'CRYPTO',    angle:180},
        {type:'pwn',       label:'PWN',       angle:230},
        {type:'forensics', label:'FORENSICS', angle:290},
        {type:'rev',       label:'REV',       angle:340}
      ];

      cats.forEach((cat, i) => {
        if (solved[cat.type] > 0) {
          setTimeout(() => {
            const trail = document.createElement('div');
            trail.className = `category-trail trail-${cat.type}`;
            trail.dataset.label = `${cat.label} • ${solved[cat.type]}`;
            trail.style.transform = `rotate(${cat.angle}deg)`;
            container.appendChild(trail);
          }, i * 150);
        }
      });
    })
    .catch(() => {
      document.getElementById('text-overall').textContent = totalSolved;
    });

  document.getElementById("solveCounter").textContent = `${totalSolved} SOLVED`;
}

// Recent solves
function populateRecentSolves() {
  const list = document.getElementById('recentSolvesList');
  list.innerHTML = '';
  challenges.slice(-6).reverse().forEach(c => {
    const li = document.createElement('li');
    li.className = 'recent-solve-item';
    li.innerHTML = `<span class="tag tag-${c.type}">${c.title}</span>`;
    list.appendChild(li);
  });
}

// Render cards
function renderChallenges(filter = "all") {
  const container = document.getElementById("challengeCards");
  container.innerHTML = "";
  const toShow = filter === "all" ? challenges : challenges.filter(c => c.type === filter);
  toShow.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<div class="category-tag tag-${c.type}">${c.type.toUpperCase()}</div>
                      <h3>${c.title}</h3>
                      <p class="flag">Flag: <code>${c.flag}</code></p>
                      <span style="opacity:0.7">Click for writeup</span>`;
    card.onclick = () => location.href = c.file;
    container.appendChild(card);
  });
}

// Tabs + Modal + Theme + Init
document.querySelectorAll('#challengeTabs .tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('#challengeTabs .tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderChallenges(tab.dataset.cat);
  });
});

const ctfs = [{ name: "PatriotCTF 2025", link: "CTF/PatriotCTF2025/patriotctf2025", solves: "7+", status: "Ended", color: "#8b949e" }];
document.getElementById("ctfGrid").innerHTML = ctfs.map(c => `
  <div class="ctf-card" onclick="location.href='${c.link}'">
    <h3>${c.name}</h3><p>${c.solves} solves</p>
    <p style="color:${c.color};font-weight:bold">${c.status}</p>
  </div>`).join('');

document.getElementById('ctfToggle')?.addEventListener('click', () => document.getElementById('ctfModal').classList.add('open'));
document.querySelector('.close-modal')?.addEventListener('click', () => document.getElementById('ctfModal').classList.remove('open'));
document.getElementById('ctfModal')?.addEventListener('click', e => { if (e.target.id === 'ctfModal') document.getElementById('ctfModal').classList.remove('open'); });

document.getElementById('themeToggle')?.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  localStorage.theme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
});

// VISITOR COUNTER
async function updateVisitorCount() {
  const countElement = document.getElementById('visitorCount');

  try {
    // This endpoint is 100% alive as of November 2025
    const response = await fetch('https://api.counterapi.dev/v2/syndro-counter/syndro-visitors/up', {
      method: 'POST',
      cache: 'no-store'
    });

    if (!response.ok) throw new Error('API error');

    const data = await response.json();
    const count = data.value;

    countElement.textContent = count.toLocaleString();
    countElement.classList.add('visitor-text');

    if (count % 1000 === 0 && count > 0) {
      countElement.classList.add('celebrate');
    }
  } catch (err) {
    // Graceful fallback – localStorage so it never shows ∞ again
    let localCount = parseInt(localStorage.getItem('syndro-local-visits') || '0') + 1;
    localStorage.setItem('syndro-local-visits', localCount);
    countElement.textContent = localCount.toLocaleString();
    countElement.classList.add('visitor-text');
    console.warn('CounterAPI failed, using local count:', localCount);
  }
}

setTimeout(() => document.getElementById('terminal')?.classList.add('reveal'), 800);
setTimeout(() => document.querySelector('.bio')?.classList.add('reveal'), 2000);
setTimeout(() => document.getElementById('challengeCards')?.classList.add('reveal'), 2800);

updateVisitorCount();
renderChallenges();
updateCategoryStats();
populateRecentSolves();

// SEARCH FUNCTIONALITY
document.getElementById('searchBar')?.addEventListener('input', function(e) {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll('.card').forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const flag = card.querySelector('.flag').textContent.toLowerCase();
    card.style.display = (title.includes(term) || flag.includes(term)) ? 'block' : 'none';
  });
});


// LIVE CLOCK
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  document.getElementById('liveClock').textContent = time;
}
updateClock();
setInterval(updateClock, 1000);
