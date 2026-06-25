document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('modeToggle');
    const htmlElement = document.documentElement;
    
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) htmlElement.setAttribute('data-mode', currentTheme);

    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            let newMode = htmlElement.getAttribute('data-mode') === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-mode', newMode);
            localStorage.setItem('theme', newMode);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const formSubmitBtn = document.getElementById('formSubmit');
    
    if (formSubmitBtn) {
        const WEBHOOK_URL = "https://discord.com/api/webhooks/1519709047073538058/lakiIJNd2Uvs-af5naZdpiCLmIx1FTuzfd-j8LhcPZOI6n8Z60Qrjinirq5BXWtYCaEJ";

        formSubmitBtn.addEventListener('click', async () => {
            const nameInput = document.getElementById('formName');
            const msgInput = document.getElementById('formMsg');
            const statusText = document.getElementById('formStatus');
            
            const name = nameInput.value.trim();
            const msg = msgInput.value.trim();

            if (!name || !msg) {
                statusText.style.color = 'var(--acc)';
                statusText.textContent = '⚠️ กรอกชื่อและข้อความด้วยนะ!';
                return;
            }

            formSubmitBtn.disabled = true;
            formSubmitBtn.textContent = 'กำลังส่ง... ⏳';
            statusText.textContent = '';

            const payload = {
                content: `📬 **ข้อความจากหน้า Contact!**\n> **ชื่อ:** ${name}\n> **ข้อความ:** ${msg}`
            };

            try {
                const res = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    statusText.style.color = 'var(--acc)';
                    statusText.textContent = '✅ ส่งแล้ว! กัสจะรีบเข้ามาอ่านเลย 🥰';
                    nameInput.value = '';
                    msgInput.value = '';
                } else {
                    statusText.style.color = '#f87171';
                    statusText.textContent = '❌ ส่งไม่ได้ ลองใหม่นะ';
                }
            } catch (e) {
                statusText.style.color = '#f87171';
                statusText.textContent = '❌ เน็ตหลุดป่าว ลองใหม่อีกที';
            } finally {
                formSubmitBtn.disabled = false;
                formSubmitBtn.textContent = 'ส่งข้อความ 💖';
            }
        });
    }
});