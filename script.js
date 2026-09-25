/* ============ EDIT ME: CONFIG ============ */
const CONFIG = {
  coupleName: "You & Her",
  yourName: "[Boo boo]",
  herName: "[HER NAME]",
  anniversaryDate: "2024-09-25T00:00:00",
  movieDate: "[Date]",
  movieTime: "[Time]"
};

/* ============ EDIT ME: let her pick from these ============ */
const MOVIE_OPTIONS = [
  {name:"[Romance Pick]", genre:"Romance", emoji:"💕"},
  {name:"[Comedy Pick]", genre:"Comedy", emoji:"😂"},
  {name:"[Action Pick]", genre:"Action", emoji:"🔥"},
  {name:"[Animated Pick]", genre:"Animated", emoji:"✨"}
];
const CINEMA_OPTIONS = [
  {name:"[Cinema One]"},
  {name:"[Cinema Two]"},
  {name:"[Cinema Three]"}
];

/* ============ EDIT ME: STORY DATA ============ */
const STORY = [
  {date:"[Date]", title:"The Beginning 🌱", text:"It all started with a simple moment — something that seemed ordinary at the time, but became the start of something beautiful.", image:"assets/images/photo-01.jpg"},
  {date:"[Date]", title:"Our First Memories 💬", text:"Some of our first conversations and little moments became memories I never want to forget.", image:"assets/images/photo-02.jpg"},
  {date:"[Date]", title:"The Moment We Became Us ❤️", text:"And somewhere along the way, you became more than just a part of my life.", image:"assets/images/photo-03.jpg"},
  {date:"[Date]", title:"Through the Years 🌙", text:"One more day that became part of our story.", image:"assets/images/photo-04.jpg"}
];

const LITTLE_THINGS = ["Those random conversations.","Our stupid jokes.","That smile.","The moments only we understand.","The ordinary days that somehow became special."];

/* ============ EDIT ME: PHOTO/MEMORY DATA ============ */
const MEMORIES = [
  {image:"assets/images/photo-05.jpg", date:"[Date]", title:"Our favorite day ❤️", desc:"Nothing extraordinary happened. But being with you made it special.", category:"favorites", tall:true},
  {image:"assets/images/photo-06.jpg", date:"[Date]", title:"That random day", desc:"Just an ordinary afternoon that stuck with me.", category:"cute"},
  {image:"assets/images/photo-07.jpg", date:"[Date]", title:"That silly moment", desc:"We couldn't stop laughing.", category:"funny"},
  {image:"assets/images/photo-08.jpg", date:"[Date]", title:"One of my favorites", desc:"A memory I keep coming back to.", category:"favorites", tall:true},
  {image:"assets/images/photo-09.jpg", date:"[Date]", title:"A special day", desc:"One to remember.", category:"special"},
  {image:"assets/images/photo-10.jpg", date:"[Date]", title:"Our date night", desc:"Just the two of us.", category:"dates"}
];

const REMEMBER = ["❤️ Your smile","💬 Our random conversations","😂 The way we laugh together","🌙 Our late-night talks","🥰 The little things you do","📸 All the memories we've created"];

/* ---------- render ---------- */
function photoTag(src, alt){
  return `<img src="${src}" alt="${alt}" onerror="this.outerHTML='<div class=\\'photo photo-fallback\\'>replace ${src}</div>'">`;
}
document.getElementById('timeline').innerHTML = STORY.map(s=>`
  <div class="entry reveal">
    <div class="dot"></div>
    <div class="date">${s.date}</div>
    <h3>${s.title}</h3>
    <p>${s.text}</p>
    ${photoTag(s.image, s.title).replace('<img','<img class="photo"')}
  </div>`).join('');

document.getElementById('little-things').innerHTML = LITTLE_THINGS.map(t=>`<div class="card"><div class="emoji">🤍</div><p>${t}</p></div>`).join('');
document.getElementById('remember').innerHTML = REMEMBER.map(t=>`<div class="card"><p>${t}</p></div>`).join('');

const cats = ["ALL","❤️ FAVORITES","🥰 CUTE","😂 FUNNY","🌸 SPECIAL","🎬 DATES"];
const catKey = {"ALL":"all","❤️ FAVORITES":"favorites","🥰 CUTE":"cute","😂 FUNNY":"funny","🌸 SPECIAL":"special","🎬 DATES":"dates"};
document.getElementById('filters').innerHTML = cats.map((c,i)=>`<button class="${i===0?'active':''}" data-cat="${catKey[c]}">${c}</button>`).join('');

function renderGallery(filter){
  const g = document.getElementById('gallery');
  const items = MEMORIES.filter(m=>filter==='all'||m.category===filter);
  g.innerHTML = items.map((m,i)=>`
    <div class="mcard ${m.tall?'tall':''}" onclick='openModal(${i},"${filter}")'>
      ${photoTag(m.image,m.title).replace('<img','<img loading="lazy"')}
      <div class="cap">${m.title}</div>
    </div>`).join('');
  g.dataset.filter = filter;
}
renderGallery('all');
document.getElementById('filters').addEventListener('click', e=>{
  if(e.target.tagName!=='BUTTON') return;
  document.querySelectorAll('#filters button').forEach(b=>b.classList.remove('active'));
  e.target.classList.add('active');
  renderGallery(e.target.dataset.cat);
});

function openModal(i, filter){
  const items = MEMORIES.filter(m=>filter==='all'||m.category===filter);
  const m = items[i];
  document.getElementById('modal-box').innerHTML = `
    ${photoTag(m.image,m.title)}
    <div class="modal-body">
      <div class="date">${m.date}</div>
      <h3>${m.title}</h3>
      <p>${m.desc}</p>
    </div>`;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('modal').addEventListener('click', e=>{ if(e.target.id==='modal') closeModal(); });
window.addEventListener('keydown', e=>{ if(e.key === 'Escape') closeModal(); });

/* letter */
const LETTER_LINES = [
  `Dear ${CONFIG.herName},`,
  "When I look back at everything we've shared, I realize how many little moments became some of my favorite memories.",
  "Thank you for being part of my story.",
  "And I hope this is only the beginning of all the memories we still have left to make.",
  "Happy Anniversary, my love. ❤️"
];
let letterOpened = false;
function openLetter(){
  if(letterOpened) return; letterOpened = true;
  const box = document.getElementById('letter-content');
  box.innerHTML = LETTER_LINES.map(l=>`<p>${l}</p>`).join('') + `<p class="sign">Love,<br>${CONFIG.yourName}</p>`;
  box.classList.add('open');
  const ps = box.querySelectorAll('p');
  ps.forEach((p,i)=> setTimeout(()=>p.classList.add('in'), i*450));
  box.scrollIntoView({behavior:'smooth', block:'center'});
}

/* counter */
function updateCounter(){
  const start = new Date(CONFIG.anniversaryDate).getTime();
  const now = Date.now();
  let diff = Math.max(0, now-start);
  const d = Math.floor(diff/86400000); diff-=d*86400000;
  const h = Math.floor(diff/3600000); diff-=h*3600000;
  const m = Math.floor(diff/60000); diff-=m*60000;
  const s = Math.floor(diff/1000);
  document.getElementById('glass').innerHTML = [[d,'DAYS'],[h,'HOURS'],[m,'MIN'],[s,'SEC']]
    .map(([v,l])=>`<div><div class="num">${v}</div><div class="lbl">${l}</div></div>`).join('');
}
updateCounter(); setInterval(updateCounter,1000);

/* surprise */
const io2 = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      const lines = document.querySelectorAll('#lines .line');
      lines.forEach((l,i)=> setTimeout(()=>l.classList.add('in'), i*900));
      setTimeout(()=> document.getElementById('reveal-btn').classList.add('in'), lines.length*900);
      io2.disconnect();
    }
  });
},{threshold:.4});
io2.observe(document.getElementById('surprise'));

function confettiBurst(){
  const glyphs = ['❤️','✨','🎉','💕','🌸'];
  for(let i=0;i<26;i++){
    const c = document.createElement('span');
    c.className = 'confetti';
    c.textContent = glyphs[Math.floor(Math.random()*glyphs.length)];
    c.style.left = Math.random()*100+'vw';
    c.style.fontSize = (14+Math.random()*14)+'px';
    c.style.animationDuration = (2.6+Math.random()*2)+'s';
    c.style.animationDelay = (Math.random()*0.6)+'s';
    document.body.appendChild(c);
    setTimeout(()=>c.remove(), 5200);
  }
}

function openSurprisePage(){
  const page = document.getElementById('surprise-page');
  page.classList.add('show');
  const field = page.querySelector('.sp-field');
  if(!field.childElementCount){
    const glyphs = ['✨','🤍','•'];
    for(let i=0;i<14;i++){
      const s = document.createElement('span');
      s.className = 'particle';
      const g = glyphs[i%glyphs.length];
      s.textContent = g;
      s.style.left = (Math.random()*94)+'%';
      s.style.top = (Math.random()*90)+'%';
      s.style.fontSize = (g==='•' ? 6+Math.random()*4 : 12+Math.random()*14)+'px';
      if(g==='•') s.style.color = 'rgba(244,233,238,.7)';
      s.style.setProperty('--dur',(6+Math.random()*6).toFixed(1)+'s');
      s.style.animationDelay = (Math.random()*5).toFixed(1)+'s';
      field.appendChild(s);
    }
  }
}

let pickedMovie = null, pickedCinema = null;

function renderChoices(){
  document.getElementById('movie-grid').innerHTML = MOVIE_OPTIONS.map((m,i)=>`
    <div class="movie-card" data-i="${i}" onclick="selectMovie(${i})">
      <div class="mc-badge">💕 picked</div>
      <div class="mc-emoji">${m.emoji}</div>
      <div class="mc-name">${m.name}</div>
      <div class="mc-genre">${m.genre}</div>
    </div>`).join('');
  document.getElementById('cinema-list').innerHTML = CINEMA_OPTIONS.map((c,i)=>`
    <div class="cinema-pill" data-i="${i}" onclick="selectCinema(${i})">📍 ${c.name}</div>`).join('');
}
function selectMovie(i){
  pickedMovie = MOVIE_OPTIONS[i];
  document.querySelectorAll('.movie-card').forEach(el=>el.classList.toggle('picked', +el.dataset.i===i));
  checkReady();
}
function selectCinema(i){
  pickedCinema = CINEMA_OPTIONS[i];
  document.querySelectorAll('.cinema-pill').forEach(el=>el.classList.toggle('picked', +el.dataset.i===i));
  checkReady();
}
function checkReady(){
  document.getElementById('confirm-btn').classList.toggle('ready', !!(pickedMovie && pickedCinema));
}
function confirmChoice(){
  if(!pickedMovie || !pickedCinema) return;
  document.getElementById('t-movie').textContent = pickedMovie.name;
  document.getElementById('t-date').textContent = CONFIG.movieDate;
  document.getElementById('t-time').textContent = CONFIG.movieTime;
  document.getElementById('t-cinema').textContent = pickedCinema.name;
  document.getElementById('choice-step').classList.remove('show');
  document.getElementById('ticket-wrap').classList.add('show');
  setTimeout(()=>{ document.getElementById('final-msg').classList.add('show'); confettiBurst(); }, 700);
}

function openGift(){
  renderChoices();
  document.getElementById('gift').style.display='none';
  document.getElementById('choice-step').classList.add('show');
}

/* floating background particles per stage */
function addParticles(id, opts={}){
  const section = document.getElementById(id);
  if(!section) return;
  const field = document.createElement('div');
  field.className = 'particle-field';
  const glyphs = opts.dark ? ['✨','🤍','•'] : ['❤️','✨','•'];
  const count = opts.count || 7;
  for(let i=0;i<count;i++){
    const s = document.createElement('span');
    s.className = 'particle';
    const g = glyphs[i % glyphs.length];
    s.textContent = g;
    s.style.left = (Math.random()*92)+'%';
    s.style.top = (Math.random()*88)+'%';
    s.style.fontSize = (g==='•' ? 6+Math.random()*4 : 12+Math.random()*14)+'px';
    if(g==='•') s.style.color = opts.dark ? 'rgba(244,233,238,.7)' : 'rgba(154,63,92,.5)';
    s.style.setProperty('--dur',(6+Math.random()*6).toFixed(1)+'s');
    s.style.animationDelay = (Math.random()*5).toFixed(1)+'s';
    field.appendChild(s);
  }
  section.insertBefore(field, section.firstChild);
}
['story','memories','remember-section','counter'].forEach(id=>addParticles(id,{count:12}));
addParticles('letter',{count:13, dark:true});
addParticles('surprise',{count:16, dark:true});
addParticles('opening',{count:9});

/* scroll: reveal, progress, nav, section highlighting */
const io = new IntersectionObserver(entries=>{
  entries.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('in'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* nav section active highlight */
const navLinks = document.querySelectorAll('nav a');
const sectionObserver = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      const id = en.target.getAttribute('id');
      navLinks.forEach(link=>{
        const href = link.getAttribute('href').replace('#','');
        link.classList.toggle('active', href === id);
      });
    }
  });
},{threshold:0.3});
['story','memories','letter','surprise'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) sectionObserver.observe(el);
});

let lastScroll = 0;
let scrollTimer = null;
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const pct = (h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
  const progressEl = document.getElementById('progress');
  if(progressEl) progressEl.style.width = pct+'%';
  
  const nav = document.getElementById('nav');
  const past = h.scrollTop > window.innerHeight*0.4;
  const goingUp = h.scrollTop < lastScroll;
  
  if(past && (goingUp || window.innerWidth <= 600)){
    nav.classList.add('show'); nav.classList.remove('hide');
  } else if (!past) {
    nav.classList.remove('show'); nav.classList.add('hide');
  }
  
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(()=>{
    if(past) { nav.classList.add('show'); nav.classList.remove('hide'); }
  }, 1200);
  
  lastScroll = h.scrollTop;
});

/* music */
const audio = document.getElementById('audio');
let playing=false;
document.getElementById('music-btn').addEventListener('click', ()=>{
  playing = !playing;
  const label = document.getElementById('music-label');
  if(playing){ audio.play().catch(()=>{}); label.classList.add('show'); document.getElementById('music-btn').textContent='⏸'; }
  else { audio.pause(); label.classList.remove('show'); document.getElementById('music-btn').textContent='🎵'; }
});

/* premium desktop-only touches */
const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(fine && !reduced){
  document.querySelectorAll('.photo, .mcard, .ticket, .card').forEach(el=>{
    el.style.transition = (el.style.transition ? el.style.transition+', ' : '')+'transform .25s ease';
    el.addEventListener('mousemove', e=>{
      const r = el.getBoundingClientRect();
      const px = (e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5;
      el.style.transform = `perspective(600px) rotateX(${(-py*6).toFixed(2)}deg) rotateY(${(px*6).toFixed(2)}deg)`;
    });
    el.addEventListener('mouseleave', ()=>{ el.style.transform=''; });
  });

  const trail = document.createElement('div');
  trail.style.cssText = 'position:fixed;width:8px;height:8px;border-radius:50%;background:radial-gradient(circle,rgba(201,161,94,.9),transparent 70%);pointer-events:none;z-index:2001;transition:transform .08s linear;opacity:0;';
  document.body.appendChild(trail);
  let tX=0, tY=0;
  document.addEventListener('mousemove', e=>{
    tX=e.clientX; tY=e.clientY;
    trail.style.opacity='.7';
    trail.style.transform = `translate(${tX-4}px, ${tY-4}px)`;
    clearTimeout(trail._t);
    trail._t = setTimeout(()=> trail.style.opacity='0', 600);
  });
}
