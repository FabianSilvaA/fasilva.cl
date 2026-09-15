
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

// Version 12 press coverage year filter
(function(){
  const buttons=[...document.querySelectorAll('.press-year-btn')];
  const panels=[...document.querySelectorAll('.press-year')];
  if(!buttons.length || !panels.length) return;

  const showYear=(year)=>{
    buttons.forEach(b=>b.classList.toggle('active', b.getAttribute('data-press-year')===year));
    panels.forEach(p=>{
      const isTarget=p.id==='press-'+year;
      p.classList.toggle('active', isTarget);
      p.style.display=isTarget?'block':'none';
    });
  };

  buttons.forEach(btn=>btn.addEventListener('click',()=>showYear(btn.getAttribute('data-press-year'))));
  showYear(buttons.find(b=>b.classList.contains('active'))?.getAttribute('data-press-year') || buttons[0].getAttribute('data-press-year'));
})();


// Version 16 month filters: only months supported by explicit dates are offered; undated items remain under "All".
(function(){
  const names={es:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],en:['January','February','March','April','May','June','July','August','September','October','November','December']};
  const lang=(document.documentElement.lang||'es').toLowerCase().startsWith('en')?'en':'es';
  const allLabel=lang==='en'?'All':'Todos';
  const scopes={
    pub:{toolbar:'.pub-month-toolbar',panel:'.pub-year.active',item:'.publication'},
    activity:{toolbar:'.activity-month-toolbar',panel:'.activity-year.active',item:'.activity-item'},
    press:{toolbar:'.press-month-toolbar',panel:'.press-year.active',item:'.media-card'}
  };
  function render(scope){
    const c=scopes[scope], bar=document.querySelector(c.toolbar), panel=document.querySelector(c.panel); if(!bar||!panel)return;
    const items=[...panel.querySelectorAll(c.item)], months=[...new Set(items.map(x=>x.dataset.month).filter(Boolean))].sort();
    bar.innerHTML=''; items.forEach(x=>x.style.display='');
    if(!months.length) return;
    const label=document.createElement('span'); label.className='month-label'; label.textContent=(bar.dataset.label||'Month')+':'; bar.appendChild(label);
    const vals=['all',...months]; vals.forEach(v=>{const b=document.createElement('button'); b.className='month-btn'+(v==='all'?' active':''); b.type='button'; b.dataset.month=v; b.textContent=v==='all'?allLabel:names[lang][parseInt(v,10)-1]; b.addEventListener('click',()=>{bar.querySelectorAll('.month-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');items.forEach(x=>x.style.display=(v==='all'||x.dataset.month===v)?'':'none');});bar.appendChild(b);});
  }
  ['pub','activity','press'].forEach(scope=>render(scope));
  document.querySelectorAll('.year-btn').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>render('pub'),0)));
  document.querySelectorAll('.activity-year-btn').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>render('activity'),0)));
  document.querySelectorAll('.press-year-btn').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>render('press'),0)));
})();
