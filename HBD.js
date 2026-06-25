const canvas = document.getElementById('bg');
const card = document.querySelector('.card');

function resize() {
  canvas.width = card.offsetWidth || 340;
  canvas.height = card.scrollHeight || 700;
}
setTimeout(resize, 800);

const ctx = canvas.getContext('2d');

const particles = [];
for(let i = 0; i < 30; i++) {
  const isHeart = Math.random() > .5;
  particles.push({
    isHeart,
    x: Math.random() * 340, 
    y: Math.random() * 800,
    size: Math.random() * 6 + 3,
    alpha: Math.random() * .2 + .05,
    angle: Math.random() * Math.PI * 2,
    vx: (Math.random() - .5) * .3,
    vy: Math.random() * .4 + .15,
    va: (Math.random() - .5) * .012,
    color: ['#f4a0c0', '#e8608a', '#f9cfe0', '#d45080', '#fce0ec'][Math.floor(Math.random() * 5)]
  });
}

function drawHeart(x, y, s, col, a) {
  ctx.save(); 
  ctx.globalAlpha = a; 
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(x, y + s * .3);
  ctx.bezierCurveTo(x, y, x - s, y, x - s, y + s * .3);
  ctx.bezierCurveTo(x - s, y + s * .65, x, y + s * .9, x, y + s * 1.1);
  ctx.bezierCurveTo(x, y + s * .9, x + s, y + s * .65, x + s, y + s * .3);
  ctx.bezierCurveTo(x + s, y, x, y, x, y + s * .3);
  ctx.fill(); 
  ctx.restore();
}

function drawPetal(x, y, r, ang, col, a) {
  ctx.save(); 
  ctx.globalAlpha = a; 
  ctx.fillStyle = col;
  ctx.translate(x, y); 
  ctx.rotate(ang);
  ctx.beginPath(); 
  ctx.ellipse(0, 0, r * .4, r, 0, 0, Math.PI * 2);
  ctx.fill(); 
  ctx.restore();
}

function frame() {
  const W = canvas.width, H = canvas.height || 800;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#fff5f8'; 
  ctx.fillRect(0, 0, W, H);
  
  [[0, 0], [W, 0], [0, H], [W, H], [W / 2, H * .35]].forEach(([gx, gy]) => {
    const gr = ctx.createRadialGradient(gx, gy, 0, gx, gy, 150);
    gr.addColorStop(0, 'rgba(255,200,220,.15)');
    gr.addColorStop(1, 'rgba(255,245,248,0)');
    ctx.fillStyle = gr; 
    ctx.fillRect(0, 0, W, H);
  });
  
  for(const p of particles) {
    if(p.isHeart) drawHeart(p.x, p.y, p.size, p.color, p.alpha);
    else drawPetal(p.x, p.y, p.size, p.angle, p.color, p.alpha);
    
    p.x += p.vx; 
    p.y += p.vy; 
    p.angle += p.va;
    
    if(p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
    if(p.x < -20) p.x = W + 20;
    if(p.x > W + 20) p.x = -20;
  }
  requestAnimationFrame(frame);
}

frame();
setInterval(() => { canvas.height = card.scrollHeight || canvas.height; }, 1500);