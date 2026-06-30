const menuBtn=document.getElementById('menuBtn');
const mainNav=document.getElementById('mainNav');
const langToggle=document.getElementById('langToggle');

function applyLanguage(lang, persist=false){
  const isEnglish=lang==='en';
  document.body.classList.toggle('lang-en',isEnglish);
  document.body.classList.toggle('lang-ar',!isEnglish);
  document.documentElement.lang=isEnglish?'en':'ar';
  document.documentElement.dir=isEnglish?'ltr':'rtl';
  document.title=isEnglish?'Gotta Plumbing & Electrical Services | Riyadh':'جوتا لخدمات السباكة والكهرباء | الرياض';
  if(persist){localStorage.setItem('gottaLang',lang);}
}

function detectInitialLanguage(){
  const saved=localStorage.getItem('gottaLang');
  if(saved==='ar'||saved==='en') return saved;
  const deviceLang=(navigator.language||navigator.userLanguage||'ar').toLowerCase();
  return deviceLang.startsWith('ar')?'ar':'en';
}

applyLanguage(detectInitialLanguage(),false);

if(langToggle){
  langToggle.addEventListener('click',()=>{
    const next=document.body.classList.contains('lang-en')?'ar':'en';
    applyLanguage(next,true);
    mainNav?.classList.remove('active');
  });
}

if(menuBtn&&mainNav){menuBtn.addEventListener('click',()=>mainNav.classList.toggle('active'));}
document.querySelectorAll('.main-nav a,.bottom-nav a').forEach(link=>link.addEventListener('click',()=>mainNav?.classList.remove('active')));

const revealItems=document.querySelectorAll('.reveal,.service-card,.trust-grid div,.areas-grid span,details,.contact-card,.contact-visual,.map-card');
revealItems.forEach(el=>el.classList.add('reveal'));
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver((entries,obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -44px 0px'});
  revealItems.forEach(el=>observer.observe(el));
}else{
  revealItems.forEach(el=>el.classList.add('is-visible'));
}
