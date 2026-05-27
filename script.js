// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const d = e.target.dataset.delay || 0;
      setTimeout(()=>e.target.classList.add('in'), d);
      io.unobserve(e.target);
    }
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Parallax hero + about art
const heroBg = document.querySelector('.hero-bg');
const parallaxEls = document.querySelectorAll('.parallax');
let ticking = false;
function onScroll(){
  if(ticking) return;
  ticking = true;
  requestAnimationFrame(()=>{
    const y = window.scrollY;
    if(heroBg) heroBg.style.transform = `translate3d(0, ${y*0.35}px, 0) scale(1.08)`;
    parallaxEls.forEach(el=>{
      const speed = parseFloat(el.dataset.speed||0.1);
      const rect = el.getBoundingClientRect();
      const offset = (rect.top - window.innerHeight/2) * speed;
      el.style.transform = `translate3d(0, ${-offset}px, 0)`;
    });
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

// Nav active state
const nav = document.querySelector('.nav');
window.addEventListener('scroll',()=>{
  nav.style.background = window.scrollY > 60 ? 'rgba(15,11,8,.85)' : 'rgba(15,11,8,.55)';
});
