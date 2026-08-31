
const toggle=document.querySelector('.nav-toggle'),nav=document.querySelector('.nav');
toggle?.addEventListener('click',()=>{nav.classList.toggle('open')});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelectorAll('.more-btn').forEach(btn=>btn.addEventListener('click',()=>{const t=document.getElementById(btn.dataset.target);const open=t.classList.toggle('open');btn.textContent=open?btn.dataset.less:btn.dataset.more;}));
document.querySelectorAll('.year-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.year-btn').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.pub-year').forEach(y=>y.classList.remove('active'));btn.classList.add('active');document.getElementById('pub-'+btn.dataset.year)?.classList.add('active');}));
document.getElementById('year').textContent=new Date().getFullYear();
