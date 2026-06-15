// ===== GLOBAL SITE DATA STORE =====
let siteData = {
  owner:{
    name:'HiveMind Owner',
    role:'Founder & Lead Developer',
    bio:'Passionate developer with expertise in Discord bots, web development, and UI design. Building digital solutions that stand out from the crowd.',
    email:'owner@hivemind.dev',
    phone:'+91 XXXXXXXXXX',
    avatar:''
  },
  services:[
    {icon:'🌐',title:'Website Development',desc:'Custom websites with stunning animations, smooth scrolling, and mobile-first design.',features:['Landing Pages','Portfolio Sites','Business Websites','E-commerce','React Apps']},
    {icon:'🎨',title:'UI/UX Design',desc:'Pixel-perfect interfaces with advanced micro-interactions and premium design systems.',features:['Figma Designs','Design Systems','Prototyping','Component Libraries','Responsive UI']},
    {icon:'🤖',title:'Discord Bots',desc:'Powerful, feature-rich Discord bots tailored for your server\'s needs.',features:['Moderation Bots','Music Bots','All-in-One Bots','Custom Commands','Dashboard Panel']},
    {icon:'⚡',title:'Automation',desc:'Streamline your workflow with smart automations and API integrations.',features:['Task Automation','API Integration','Web Scraping','Bot Automation','Webhook Setup']},
    {icon:'💼',title:'Portfolio Sites',desc:'Impressive portfolios that get you hired and wow your clients.',features:['Developer Portfolios','Designer Portfolios','Freelancer Sites','Personal Brand','SEO Optimized']},
    {icon:'🔧',title:'Custom Projects',desc:'Have a unique idea? We build bespoke solutions for any requirement.',features:['Consultation Free','Requirements Analysis','Custom Build','Testing & QA','Post-launch Support']}
  ],
  projects:[
    {
      name:'SentinX Security',emoji:'🛡️',color:'linear-gradient(135deg,#7B2FFF,#4B0DB0)',
      tagline:'Advanced Security & Moderation Bot',
      badge:'Security Bot',
      features:['Auto-mod with AI detection','Anti-raid & anti-nuke protection','Custom ban/kick/mute commands','Logging system with audit trail','Verification system','Temp-ban & temp-mute support'],
      tags:['Discord.js','Node.js','MongoDB','Security'],
      stats:[{num:'50+',label:'Servers'},{num:'10K+',label:'Users Protected'},{num:'99.9%',label:'Uptime'}]
    },
    {
      name:'HiveMind Music',emoji:'🎵',color:'linear-gradient(135deg,#00F5FF,#0080A0)',
      tagline:'Premium Music Experience for Discord',
      badge:'Music Bot',
      features:['High-quality audio streaming','YouTube, Spotify & SoundCloud','Queue management system','Equalizer & bass boost','Playlist save & load','Vote-skip & DJ mode'],
      tags:['Discord.js','Lavalink','Python','Audio'],
      stats:[{num:'30+',label:'Servers'},{num:'5K+',label:'Songs Played'},{num:'24/7',label:'Online'}]
    },
    {
      name:'Venus All-in-One',emoji:'🌟',color:'linear-gradient(135deg,#FF2FBF,#8B00FF)',
      tagline:'The Ultimate All-in-One Discord Bot',
      badge:'All-in-One',
      features:['Moderation + Music + Fun','Economy & leveling system','Custom welcome messages','Reaction roles & auto-roles','Giveaways & polls','Dashboard web panel'],
      tags:['Discord.js','React','MongoDB','Express'],
      stats:[{num:'80+',label:'Commands'},{num:'20+',label:'Servers'},{num:'15K+',label:'Members'  }]
    }
  ],
  pricing:[
    {
      name:'Starter',price:'299',currency:'₹',period:'per project',featured:false,
      features:[
        {text:'Single Page Website',active:true},{text:'Basic Bot (10 commands)',active:true},
        {text:'Mobile Responsive',active:true},{text:'3 Day Delivery',active:true},
        {text:'1 Revision',active:true},{text:'Advanced Animations',active:false},
        {text:'Source Code',active:false},{text:'24/7 Support',active:false}
      ]
    },
    {
      name:'Pro',price:'799',currency:'₹',period:'per project',featured:true,
      features:[
        {text:'Multi-Page Website',active:true},{text:'Advanced Bot (50 commands)',active:true},
        {text:'Premium Animations',active:true},{text:'5 Day Delivery',active:true},
        {text:'3 Revisions',active:true},{text:'Advanced Animations',active:true},
        {text:'Source Code Included',active:true},{text:'24/7 Support',active:false}
      ]
    },
    {
      name:'Elite',price:'1999',currency:'₹',period:'per project',featured:false,
      features:[
        {text:'Full Custom Website',active:true},{text:'Complex Bot + Dashboard',active:true},
        {text:'Pro Animations + Design',active:true},{text:'7 Day Delivery',active:true},
        {text:'Unlimited Revisions',active:true},{text:'All Premium Features',active:true},
        {text:'Full Source Code',active:true},{text:'24/7 Priority Support',active:true}
      ]
    }
  ]
};

// LocalStorage Synchronization
function loadData(){
  const saved=localStorage.getItem('hivemind_data');
  if(saved){try{siteData=JSON.parse(saved)}catch(e){}}
}
function saveData(){
  localStorage.setItem('hivemind_data',JSON.stringify(siteData));
}

// ===== CORE ENGINE RENDERING =====
function renderAll(){
  renderOwner();
  renderServices();
  renderProjects();
  renderPricing();
}

function renderOwner(){
  const o=siteData.owner;
  document.getElementById('ownerName').textContent=o.name;
  document.getElementById('ownerRole').textContent=o.role;
  document.getElementById('ownerBio').textContent=o.bio;
  document.getElementById('ownerEmail').textContent=o.email;
  document.getElementById('ownerPhone').textContent=o.phone;
  document.getElementById('ownerEmailLink').href='mailto:'+o.email;
  document.getElementById('ownerPhoneLink').href='tel:'+o.phone;
  if(o.avatar){
    document.getElementById('ownerAvatarEl').innerHTML=`<img src="${o.avatar}" alt="Owner Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
  } else {
    document.getElementById('ownerAvatarEl').innerHTML=`<div class="avatar-placeholder">👤</div>`;
  }
}

function renderServices(){
  const grid=document.getElementById('servicesGrid');
  if(!grid) return;
  grid.innerHTML=siteData.services.map((s,i)=>`
    <div class="service-card reveal">
      <div class="service-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <button class="btn-expand" onclick="toggleExpand(this)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        VIEW FEATURES
      </button>
      <div class="expand-content">
        <ul class="service-features show">
          ${s.features.map(f=>`<li>${f}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
  observeReveal();
  attachCursorHooks();
}

function renderProjects(){
  const grid=document.getElementById('projectsGrid');
  if(!grid) return;
  grid.innerHTML=siteData.projects.map(p=>`
    <div class="project-card reveal">
      <div class="project-header">
        <div class="project-logo" style="background:${p.color}">${p.emoji}</div>
        <span class="project-badge">${p.badge}</span>
      </div>
      <div class="project-body">
        <h3>${p.name}</h3>
        <p class="tagline">${p.tagline}</p>
        <ul class="features-list">
          ${p.features.map(f=>`<li><span class="dot"></span>${f}</li>`).join('')}
        </ul>
        <div class="project-tags">
          ${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="project-stats">
        ${p.stats.map(s=>`<div class="stat"><div class="stat-num">${s.num}</div><div class="stat-label">${s.label}</div></div>`).join('')}
      </div>
    </div>
  `).join('');
  observeReveal();
  attachCursorHooks();
}

function renderPricing(){
  const grid=document.getElementById('pricingGrid');
  if(!grid) return;
  grid.innerHTML=siteData.pricing.map(p=>`
    <div class="pricing-card ${p.featured?'featured':''} reveal">
      <div class="plan-name">${p.name}</div>
      <div class="plan-price">
        <span class="currency">${p.currency}</span><span class="amount">${p.price}</span>
        <div class="period">${p.period}</div>
      </div>
      <div class="plan-divider"></div>
      <ul class="plan-features">
        ${p.features.map(f=>`
          <li class="${f.active?'active':''}">
            <span class="${f.active?'check':'cross'}">${f.active?'✓':'✗'}</span>
            ${f.text}
          </li>
        `).join('')}
      </ul>
      <button class="${p.featured?'btn-plan btn-plan-filled':'btn-plan btn-plan-outline'}" onclick="scrollToSection('#contact')">
        ${p.featured?'🔥 Get Started':'Choose Plan'}
      </button>
    </div>
  `).join('');
  observeReveal();
  attachCursorHooks();
}

// ===== INTERACTIVE UI ELEMENTS =====
function toggleExpand(btn){
  const content=btn.nextElementSibling;
  content.classList.toggle('open');
  if(content.classList.contains('open')){
    btn.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/></svg> HIDE FEATURES`;
  } else {
    btn.innerHTML=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg> VIEW FEATURES`;
  }
}

function submitForm(){
  const name=document.getElementById('fName').value;
  const discord=document.getElementById('fDiscord').value;
  const service=document.getElementById('fService').value;
  const details=document.getElementById('fDetails').value;
  if(!name||!discord||!service||!details){
    alert('Please fill in all required fields!');return;
  }
  document.getElementById('formArea').style.display='none';
  document.getElementById('formSuccess').classList.add('show');
}

// ===== SMART CURSOR CONTROLLER =====
const cursor=document.getElementById('cursor');
const trail=document.getElementById('cursor-trail');
let mx=0,my=0,tx=0,ty=0;

document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cursor.style.left=mx+'px';cursor.style.top=my+'px';
});

function animateTrail(){
  tx+=(mx-tx)*.12;ty+=(my-ty)*.12;
  trail.style.left=tx+'px';trail.style.top=ty+'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

function attachCursorHooks(){
  document.querySelectorAll('a, button, .btn-expand, select, input, textarea').forEach(el=>{
    el.addEventListener('mouseenter',()=>{
      cursor.style.transform='translate(-50%,-50%) scale(2.5)';
      trail.style.borderColor='var(--cyan)';
    });
    el.addEventListener('mouseleave',()=>{
      cursor.style.transform='translate(-50%,-50%) scale(1)';
      trail.style.borderColor='rgba(123,47,255,0.5)';
    });
  });
}

// ===== AMBIENT CANVAS PARTICLES =====
const canvas=document.getElementById('bg-canvas');
const ctx=canvas.getContext('2d');
let particles=[];
function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight}
resizeCanvas();window.addEventListener('resize',resizeCanvas);

class Particle{
  constructor(){this.reset()}
  reset(){
    this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;
    this.size=Math.random()*2+.5;
    this.speedX=(Math.random()-.5)*.5;this.speedY=(Math.random()-.5)*.5;
    this.opacity=Math.random()*.5+.1;this.hue=Math.random()>0.5?270:190;
  }
  update(){
    this.x+=this.speedX;this.y+=this.speedY;
    if(this.x<0||this.x>canvas.width||this.y<0||this.y>canvas.height)this.reset();
  }
  draw(){
    ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle=`hsla(${this.hue},100%,65%,${this.opacity})`;ctx.fill();
  }
}
for(let i=0;i<120;i++)particles.push(new Particle());

function connectParticles(){
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){
        ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);
        ctx.strokeStyle=`rgba(123,47,255,${.12*(1-dist/120)})`;ctx.lineWidth=.6;ctx.stroke();
      }
    }
  }
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{p.update();p.draw()});
  connectParticles();requestAnimationFrame(animate);
}
animate();

// ===== SCROLL REVEAL =====
function observeReveal(){
  document.querySelectorAll('.reveal:not(.visible)').forEach(el=>{
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}});
    },{threshold:.1});
    obs.observe(el);
  });
}

// ===== SCROLL METERS =====
window.addEventListener('scroll',()=>{
  const p=document.getElementById('progress-bar');
  const sc=window.scrollY,docH=document.documentElement.scrollHeight-window.innerHeight;
  p.style.width=((sc/docH)*100)+'%';
  
  const nav=document.querySelector('nav');
  nav.style.background=window.scrollY>50?'rgba(5,5,16,0.95)':'rgba(5,5,16,0.7)';
});

// ===== RESPONSIVE WINDOW CONTROL =====
function toggleMenu(){
  const h=document.getElementById('hamburger'),m=document.getElementById('mobileMenu');
  h.classList.toggle('active');m.classList.toggle('open');
  document.body.style.overflow=m.classList.contains('open')?'hidden':'';
}
function closeMobile(){
  document.getElementById('hamburger').classList.remove('active');
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow='';
}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}
  });
});
function scrollToSection(id){document.querySelector(id)?.scrollIntoView({behavior:'smooth'})}

// INITIALIZER RUNS
loadData();
renderAll();
attachCursorHooks();
