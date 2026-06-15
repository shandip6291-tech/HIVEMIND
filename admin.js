// ===== ADMIN CONTROL INFRASTRUCTURE =====
let adminLoggedIn=false;
const ADMIN_PASS='hivemind2026';

function openAdmin(e){
  e.preventDefault();
  document.getElementById('admin-overlay').classList.add('open');
  renderAdmin();
}
function closeAdmin(){
  document.getElementById('admin-overlay').classList.remove('open');
}
document.getElementById('admin-overlay').addEventListener('click',function(e){
  if(e.target===this)closeAdmin();
});

function renderAdmin(){
  const body=document.getElementById('adminBody');
  if(!adminLoggedIn){
    body.innerHTML=`
      <div class="admin-login">
        <div style="font-size:2.5rem">🔐</div>
        <h2>Admin Login</h2>
        <p>Enter your password to access the website editor</p>
        <input type="password" id="adminPass" placeholder="Password" onkeydown="if(event.key==='Enter')adminLogin()" style="text-align:center">
        <button class="admin-save-btn" onclick="adminLogin()" style="width:100%">Login</button>
        <p style="font-size:.75rem;color:var(--muted);margin-top:.5rem">Default: hivemind2026</p>
        <div class="admin-msg" id="loginMsg"></div>
      </div>
    `;
    return;
  }
  body.innerHTML=`
    <!-- OWNER SECTION -->
    <div class="admin-section">
      <h3>👤 Owner Info</h3>
      <div class="form-row" style="margin-bottom:0">
        <div class="form-group"><label>Owner Name</label><input id="aOwnerName" value="${siteData.owner.name}" placeholder="Your name"></div>
        <div class="form-group"><label>Role/Title</label><input id="aOwnerRole" value="${siteData.owner.role}" placeholder="e.g. Founder"></div>
      </div>
      <div class="form-group"><label>Bio</label><textarea id="aOwnerBio" rows="2">${siteData.owner.bio}</textarea></div>
      <div class="form-row" style="margin-bottom:0">
        <div class="form-group"><label>Email</label><input id="aOwnerEmail" value="${siteData.owner.email}" placeholder="email@example.com"></div>
        <div class="form-group"><label>Phone</label><input id="aOwnerPhone" value="${siteData.owner.phone}" placeholder="+91..."></div>
      </div>
      <div class="form-group">
        <label>Avatar URL (paste image link or base64)</label>
        <input id="aOwnerAvatar" value="${siteData.owner.avatar}" placeholder="https://... or leave empty for emoji">
      </div>
      <button class="admin-save-btn" onclick="saveOwner()">💾 Save Owner Info</button>
      <div class="admin-msg" id="ownerMsg"></div>
    </div>

    <!-- SERVICES SECTION -->
    <div class="admin-section">
      <h3>🌐 Services</h3>
      <div id="adminServicesList"></div>
      <button class="admin-add-btn" onclick="addService()">+ Add Service</button>
      <div style="margin-top:1rem"><button class="admin-save-btn" onclick="saveServices()">💾 Save Services</button></div>
      <div class="admin-msg" id="servicesMsg"></div>
    </div>

    <!-- PRICING SECTION -->
    <div class="admin-section">
      <h3>💰 Pricing Plans</h3>
      <div id="adminPricingList"></div>
      <button class="admin-add-btn" onclick="addPricing()">+ Add Plan</button>
      <div style="margin-top:1rem"><button class="admin-save-btn" onclick="savePricing()">💾 Save Pricing</button></div>
      <div class="admin-msg" id="pricingMsg"></div>
    </div>

    <!-- PROJECTS SECTION -->
    <div class="admin-section">
      <h3>🚀 Projects</h3>
      <div id="adminProjectsList"></div>
      <button class="admin-add-btn" onclick="addProject()">+ Add Project</button>
      <div style="margin-top:1rem"><button class="admin-save-btn" onclick="saveProjects()">💾 Save Projects</button></div>
      <div class="admin-msg" id="projectsMsg"></div>
    </div>

    <!-- CHANGE PASSWORD -->
    <div class="admin-section">
      <h3>🔑 Change Password</h3>
      <div class="form-row">
        <div class="form-group"><label>New Password</label><input type="password" id="aNewPass" placeholder="New password"></div>
        <div class="form-group"><label>Confirm</label><input type="password" id="aConfPass" placeholder="Confirm password"></div>
      </div>
      <button class="admin-save-btn" onclick="changePass()">🔑 Update Password</button>
      <div class="admin-msg" id="passMsg"></div>
    </div>

    <div style="text-align:center;margin-top:1rem">
      <button onclick="adminLogout()" style="background:rgba(255,50,80,0.1);border:1px solid rgba(255,50,80,0.3);color:#FF3250;padding:.6rem 1.5rem;border-radius:8px;cursor:pointer;font-family:'Space Grotesk',sans-serif;font-size:.85rem">
        Logout
      </button>
    </div>
  `;
  renderAdminServices();
  renderAdminPricing();
  renderAdminProjects();
}

function renderAdminServices(){
  const c=document.getElementById('adminServicesList');
  if(!c)return;
  c.innerHTML=siteData.services.map((s,i)=>`
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:1rem;margin-bottom:.75rem">
      <div class="form-row" style="margin-bottom:.5rem">
        <div class="form-group" style="margin-bottom:0"><label>Icon (emoji)</label><input data-si="${i}" data-field="icon" value="${s.icon}" maxlength="4" style="font-size:1.2rem"></div>
        <div class="form-group" style="margin-bottom:0"><label>Service Name</label><input data-si="${i}" data-field="title" value="${s.title}"></div>
      </div>
      <div class="form-group" style="margin-bottom:.5rem"><label>Description</label><input data-si="${i}" data-field="desc" value="${s.desc}"></div>
      <div class="form-group" style="margin-bottom:.5rem"><label>Features (comma-separated)</label><input data-si="${i}" data-field="features" value="${s.features.join(', ')}"></div>
      <button class="admin-price-item remove-btn" onclick="removeService(${i})">Remove</button>
    </div>
  `).join('');
  c.querySelectorAll('input').forEach(inp=>{
    inp.addEventListener('input',function(){
      const i=this.dataset.si,f=this.dataset.field;
      if(f==='features')siteData.services[i][f]=this.value.split(',').map(x=>x.trim()).filter(Boolean);
      else siteData.services[i][f]=this.value;
    });
  });
}

function addService(){
  siteData.services.push({icon:'⭐',title:'New Service',desc:'Service description.',features:['Feature 1']});
  renderAdminServices();
}
function removeService(i){siteData.services.splice(i,1);renderAdminServices()}
function saveServices(){saveData();renderServices();showMsg('servicesMsg','✓ Services saved!','success')}

function renderAdminPricing(){
  const c=document.getElementById('adminPricingList');
  if(!c)return;
  c.innerHTML=siteData.pricing.map((p,i)=>`
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:1rem;margin-bottom:.75rem">
      <div class="form-row" style="margin-bottom:.5rem">
        <div class="form-group" style="margin-bottom:0"><label>Plan Name</label><input data-pi="${i}" data-pf="name" value="${p.name}"></div>
        <div class="form-group" style="margin-bottom:0"><label>Price</label><input data-pi="${i}" data-pf="price" value="${p.price}"></div>
      </div>
      <div class="form-row" style="margin-bottom:.5rem">
        <div class="form-group" style="margin-bottom:0"><label>Currency</label><input data-pi="${i}" data-pf="currency" value="${p.currency}" maxlength="3"></div>
        <div class="form-group" style="margin-bottom:0"><label>Period</label><input data-pi="${i}" data-pf="period" value="${p.period}"></div>
      </div>
      <div class="form-group" style="margin-bottom:.5rem">
        <label>Features (format: text|true or text|false, semicolon-separated)</label>
        <textarea data-pi="${i}" data-pf="features" rows="3">${p.features.map(f=>f.text+'|'+f.active).join('; ')}</textarea>
      </div>
      <div class="form-group" style="margin-bottom:.5rem">
        <label><input type="checkbox" data-pi="${i}" data-pf="featured" ${p.featured?'checked':''} style="width:auto;margin-right:.4rem"> Mark as Featured</label>
      </div>
      <button class="admin-price-item remove-btn" onclick="removePricing(${i})">Remove</button>
    </div>
  `).join('');
  c.querySelectorAll('input,textarea').forEach(inp=>{
    inp.addEventListener('change',function(){
      const i=this.dataset.pi,f=this.dataset.pf;
      if(f==='features'){
        siteData.pricing[i][f]=this.value.split(';').map(x=>{
          const [text,active]=x.trim().split('|');return{text:text?.trim()||'',active:active?.trim()==='true'};
        }).filter(x=>x.text);
      } else if(f==='featured'){
        siteData.pricing[i][f]=this.checked;
      } else {
        siteData.pricing[i][f]=this.value;
      }
    });
  });
}

function addPricing(){
  siteData.pricing.push({name:'Custom',price:'999',currency:'₹',period:'per project',featured:false,features:[{text:'Custom Feature',active:true}]});
  renderAdminPricing();
}
/* Structural Utilities */
function removePricing(i){siteData.pricing.splice(i,1);renderAdminPricing()}
function savePricing(){saveData();renderPricing();showMsg('pricingMsg','✓ Pricing saved!','success')}

function renderAdminProjects(){
  const c=document.getElementById('adminProjectsList');
  if(!c)return;
  c.innerHTML=siteData.projects.map((p,i)=>`
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:1rem;margin-bottom:.75rem">
      <div class="form-row" style="margin-bottom:.5rem">
        <div class="form-group" style="margin-bottom:0"><label>Bot Name</label><input data-ri="${i}" data-rf="name" value="${p.name}"></div>
        <div class="form-group" style="margin-bottom:0"><label>Emoji</label><input data-ri="${i}" data-rf="emoji" value="${p.emoji}" maxlength="4"></div>
      </div>
      <div class="form-row" style="margin-bottom:.5rem">
        <div class="form-group" style="margin-bottom:0"><label>Badge</label><input data-ri="${i}" data-rf="badge" value="${p.badge}"></div>
        <div class="form-group" style="margin-bottom:0"><label>Tagline</label><input data-ri="${i}" data-rf="tagline" value="${p.tagline}"></div>
      </div>
      <div class="form-group" style="margin-bottom:.5rem"><label>Features (comma-separated)</label><textarea data-ri="${i}" data-rf="features" rows="2">${p.features.join(', ')}</textarea></div>
      <div class="form-group" style="margin-bottom:.5rem"><label>Tags (comma-separated)</label><input data-ri="${i}" data-rf="tags" value="${p.tags.join(', ')}"></div>
      <button class="admin-price-item remove-btn" onclick="removeProject(${i})">Remove</button>
    </div>
  `).join('');
  c.querySelectorAll('input,textarea').forEach(inp=>{
    inp.addEventListener('input',function(){
      const i=this.dataset.ri,f=this.dataset.rf;
      if(f==='features'||f==='tags')siteData.projects[i][f]=this.value.split(',').map(x=>x.trim()).filter(Boolean);
      else siteData.projects[i][f]=this.value;
    });
  });
}

function addProject(){
  siteData.projects.push({name:'New Bot',emoji:'🤖',color:'linear-gradient(135deg,#7B2FFF,#00F5FF)',tagline:'New bot description',badge:'Bot',features:['Feature 1'],tags:['Discord.js'],stats:[{num:'0',label:'Servers'}]});
  renderAdminProjects();
}
function removeProject(i){siteData.projects.splice(i,1);renderAdminProjects()}
function saveProjects(){saveData();renderProjects();showMsg('projectsMsg','✓ Projects saved!','success')}

function saveOwner(){
  siteData.owner.name=document.getElementById('aOwnerName').value;
  siteData.owner.role=document.getElementById('aOwnerRole').value;
  siteData.owner.bio=document.getElementById('aOwnerBio').value;
  siteData.owner.email=document.getElementById('aOwnerEmail').value;
  siteData.owner.phone=document.getElementById('aOwnerPhone').value;
  siteData.owner.avatar=document.getElementById('aOwnerAvatar').value;
  saveData();renderOwner();
  showMsg('ownerMsg','✓ Owner info saved!','success');
}

function adminLogin(){
  const pass=document.getElementById('adminPass').value;
  const storedPass=localStorage.getItem('hivemind_pass')||ADMIN_PASS;
  if(pass===storedPass){adminLoggedIn=true;renderAdmin()}
  else showMsg('loginMsg','❌ Wrong password','error');
}
function adminLogout(){adminLoggedIn=false;renderAdmin()}
function changePass(){
  const np=document.getElementById('aNewPass').value;
  const cp=document.getElementById('aConfPass').value;
  if(!np){showMsg('passMsg','❌ Enter a new password','error');return}
  if(np!==cp){showMsg('passMsg','❌ Passwords do not match','error');return}
  localStorage.setItem('hivemind_pass',np);
  showMsg('passMsg','✓ Password changed!','success');
}

function showMsg(id,text,type){
  const el=document.getElementById(id);
  if(!el)return;
  el.textContent=text;el.className='admin-msg '+type;
  setTimeout(()=>el.className='admin-msg',3000);
}
// --- DYNAMIC ADMIN THEME TOGGLE FUNCTION ---
function toggleAdminTheme() {
    const adminBox = document.getElementById('adminBox');
    const themeCheckbox = document.getElementById('adminThemeCheckbox');
    
    if (themeCheckbox.checked) {
        adminBox.classList.add('admin-neon-theme');
        localStorage.setItem('adminTheme', 'neon');
    } else {
        adminBox.classList.remove('admin-neon-theme');
        localStorage.setItem('adminTheme', 'default');
    }
}

// Admin panel kholte hi puraani saved theme check karne ke liye (Auto-Load)
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('adminTheme');
    const themeCheckbox = document.getElementById('adminThemeCheckbox');
    const adminBox = document.getElementById('adminBox');
    
    if (savedTheme === 'neon' && themeCheckbox && adminBox) {
        themeCheckbox.checked = true;
        adminBox.classList.add('admin-neon-theme');
    }
});
