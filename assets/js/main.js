
const toggle=document.querySelector('.nav-toggle'),nav=document.querySelector('.nav');
toggle?.addEventListener('click',()=>{nav.classList.toggle('open')});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelectorAll('.more-btn').forEach(btn=>btn.addEventListener('click',()=>{const t=document.getElementById(btn.dataset.target);const open=t.classList.toggle('open');btn.textContent=open?btn.dataset.less:btn.dataset.more;}));
document.querySelectorAll('.year-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.year-btn').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.pub-year').forEach(y=>y.classList.remove('active'));btn.classList.add('active');document.getElementById('pub-'+btn.dataset.year)?.classList.add('active');}));
document.getElementById('year').textContent=new Date().getFullYear();

// Version 7 activity year filter
(function(){
  const buttons=[...document.querySelectorAll('.activity-year-btn')];
  const panels=[...document.querySelectorAll('.activity-year')];
  if(!buttons.length || !panels.length) return;

  const showYear=(year)=>{
    buttons.forEach(b=>b.classList.toggle('active', b.getAttribute('data-activity-year')===year));
    panels.forEach(p=>{
      const isTarget=p.id==='activity-'+year;
      p.classList.toggle('active', isTarget);
      p.style.display=isTarget?'block':'none';
    });
  };

  buttons.forEach(btn=>btn.addEventListener('click',()=>showYear(btn.getAttribute('data-activity-year'))));
  showYear(buttons.find(b=>b.classList.contains('active'))?.getAttribute('data-activity-year') || buttons[0].getAttribute('data-activity-year'));
})();