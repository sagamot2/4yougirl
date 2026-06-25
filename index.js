const root = document.documentElement;
const modeIcon = document.getElementById('modeIcon');

function applyMode(mode) {
  root.setAttribute('data-mode', mode);
  if (modeIcon) modeIcon.textContent = mode === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('gus-mode', mode);
}

function toggleMode() {
  const current = root.getAttribute('data-mode');
  applyMode(current === 'dark' ? 'light' : 'dark');
}

applyMode(localStorage.getItem('gus-mode') || 'dark');

const drawer = document.getElementById('drawer');

function toggleDrawer() {
  if (drawer) drawer.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.ham-btn') && !e.target.closest('.drawer')) {
    if (drawer) drawer.classList.remove('open');
  }
});

const bar = document.getElementById('progressBar');
if (bar) {
  window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = pct + '%';
  });
}

function tick() {
  const el = document.getElementById('liveClock');
  if (!el) return;
  const now  = new Date();
  el.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map(v => String(v).padStart(2, '0'))
    .join(':');
}
setInterval(tick, 1000);
tick();

const askPopup     = document.getElementById('ask-popup-overlay');
const closePopupBtn = document.getElementById('closePopupBtn');
const sendBtn       = document.getElementById('sendBtn');
const answerInput   = document.getElementById('answerInput');
const discordWebhookURL = "https://discord.com/api/webhooks/1519709047073538058/lakiIJNd2Uvs-af5naZdpiCLmIx1FTuzfd-j8LhcPZOI6n8Z60Qrjinirq5BXWtYCaEJ";

if (askPopup && !localStorage.getItem('alreadyAnswered')) {
  setTimeout(() => askPopup.classList.add('show'), 2000);
}

if (closePopupBtn) {
  closePopupBtn.addEventListener('click', () => askPopup.classList.remove('show'));
}

if (sendBtn && answerInput) {
  sendBtn.addEventListener('click', () => {
    const answer = answerInput.value.trim();
    if (!answer) {
      alert("พิมพ์คำตอบให้ชื่นใจหน่อยยยยอ้วนนนนนน! 🥺");
      return;
    }

    const payload = {
      content: `💘 **มีคนตอบ "เป็นแฟนกันมั้ย"!**\n> ตอบมาว่า: **"${answer}"**`
    };

    const originalText = sendBtn.innerText;
    sendBtn.innerText  = "กำลังส่ง...";
    sendBtn.disabled   = true;

    fetch(discordWebhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if (res.ok) {
        alert("เค้าได้คำตอบแล้ว เดี๋ยวเค้าจะรีบติดต่อไปเลยยย 🥰");
        localStorage.setItem('alreadyAnswered', 'true');
        askPopup.classList.remove('show');
      } else {
        alert("อ้าว มีปัญหาในการส่ง ลองใหม่อีกทีนะ");
      }
    })
    .catch(() => alert("เน็ตหลุดป่าวอ้วน ลองกดส่งใหม่ดูนะ"))
    .finally(() => {
      sendBtn.innerText = originalText;
      sendBtn.disabled  = false;
    });
  });
}
setTimeout(() => {
    // แอบไปดึง IP ของคนที่เปิดเว็บนี้มา
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userIP = data.ip;
            console.log("%c⚠️ ระบบตรวจพบผู้บุกรุก!!!", "color: red; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 0 #000;");
            console.log(`%cเห้ย! ไอ้ขี้เสือก กูรู้ละนะว่ามึงมาส่องโค้ดกู`, 'color: orange; font-size: 20px;');
            console.log(`%c🚨 ตอนนี้ระบบได้บันทึก IP ของมึงไว้แล้ว: [ ${userIP} ] 🚨`, 'color: yellow; font-size: 22px; background: red; padding: 10px; border-radius: 5px;');
            console.log(`%cปิดหน้าต่างนี้ไปซะ ก่อนที่กูจะส่ง IP มึงไปป่วนเล่นๆ ไอ้สัส 🖕`, 'color: white; font-size: 16px;');
        })
        .catch(err => {
            console.log("%cปิดคอนโซลแล้วไปไกลๆ ตีนกูเลย ไอ้ขี้เสือก 🖕", "color: red; font-size: 30px;");
        });
}, 2000);
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('คลิกขวาหาพ่อง! ไม่มีไรให้ดูโว้ยยยย 🖕');
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || 
       (e.ctrlKey && e.shiftKey && e.key === 'I') || 
       (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        alert('อุ๊ย! กดคีย์ลัดทำไมอ่า จะขโมยโค้ดหรอจ๊ะอีหนู 🤪');
    }
});
