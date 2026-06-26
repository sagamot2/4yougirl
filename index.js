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

document.addEventListener('DOMContentLoaded', () => {
    const askPopup = document.getElementById('ask-popup-overlay');
    const webhookURL = "https://discord.com/api/webhooks/1519709047073538058/lakiIJNd2Uvs-af5naZdpiCLmIx1FTuzfd-j8LhcPZOI6n8Z60Qrjinirq5BXWtYCaEJ";

    const step1 = document.getElementById('step-1-ask');
    const answerInput = document.getElementById('answerInput');
    const sendAnswerBtn = document.getElementById('sendAnswerBtn');
    const closeBtn1 = document.getElementById('closePopupBtn1');

    const step2 = document.getElementById('step-2-bank');
    const bankInput = document.getElementById('bankInput');
    const sendBankBtn = document.getElementById('sendBankBtn');
    const closeBtn2 = document.getElementById('closePopupBtn2');

    const step3 = document.getElementById('step-3-success');
    const closeBtn3 = document.getElementById('closePopupBtn3');

    if (askPopup) {
        setTimeout(() => {
            askPopup.classList.add('show');
        }, 2000);
    }

    const closePopup = () => {
        if (askPopup) askPopup.classList.remove('show');
    };

    if (closeBtn1) closeBtn1.addEventListener('click', closePopup);
    if (closeBtn2) closeBtn2.addEventListener('click', closePopup);
    if (closeBtn3) closeBtn3.addEventListener('click', closePopup);

    if (sendAnswerBtn) {
        sendAnswerBtn.addEventListener('click', () => {
            const answer = answerInput.value.trim();
            if (!answer) {
                alert("พิมพ์คำตอบให้ชื่นใจหน่อยยยยอ้วนนนนนน! 🥺");
                return;
            }

            sendAnswerBtn.innerText = "กำลังส่ง...";
            sendAnswerBtn.disabled = true;

            fetch(webhookURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: `💘 **มีคนตอบคำถามขอเป็นแฟน!**\n> ตอบว่า: **"${answer}"**` })
            })
            .then(res => {
                if (res.ok) {
                    step1.style.display = 'none';
                    step2.style.display = 'block'; 
                } else {
                    alert("ส่งไม่สำเร็จ ลองใหม่นะอ้วน");
                    sendAnswerBtn.innerText = "ส่งคำตอบ 💌";
                    sendAnswerBtn.disabled = false;
                }
            }).catch(() => {
                alert("เน็ตหลุดป่าวอ้วน ลองใหม่นะ");
                sendAnswerBtn.innerText = "ส่งคำตอบ 💌";
                sendAnswerBtn.disabled = false;
            });
        });
    }

    if (sendBankBtn) {
        sendBankBtn.addEventListener('click', () => {
            const bankData = bankInput.value.trim();
            if (!bankData) {
                alert("กรอกเลขบัญชีมาด้วยดิอ้วน! 🥺");
                return;
            }

            sendBankBtn.innerText = "กำลังส่ง...";
            sendBankBtn.disabled = true;

            fetch(webhookURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: `💸 **เลขบัญชีทำจมูกมาแล้ว!**\n> ${bankData}` })
            })
            .then(res => {
                if (res.ok) {
                    step2.style.display = 'none';
                    step3.style.display = 'block'; // โชว์หน้าสำเร็จ
                } else {
                    alert("ส่งไม่สำเร็จ ลองใหม่นะอ้วน");
                    sendBankBtn.innerText = "ส่งเลขบัญชีให้กัส 💸";
                    sendBankBtn.disabled = false;
                }
            }).catch(() => {
                alert("เน็ตหลุดป่าวอ้วน ลองใหม่นะ");
                sendBankBtn.innerText = "ส่งเลขบัญชีให้กัส 💸";
                sendBankBtn.disabled = false;
            });
        });
    }
});


document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('คลิกขวาทำไม! ไม่มีไรให้ดูโว้ยยยย 🖕');
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || 
       (e.ctrlKey && e.shiftKey && e.key === 'I') || 
       (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        alert('อุ๊ย! f12ทำไมอ่า จะทำไรจ๊ะอีหนู 🤪');
    }
});
