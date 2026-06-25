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

    const sendBtn = document.getElementById('sendBtn');
    const answerInput = document.getElementById('answerInput');
    const webhookURL = "https://discord.com/api/webhooks/1519709047073538058/lakiIJNd2Uvs-af5naZdpiCLmIx1FTuzfd-j8LhcPZOI6n8Z60Qrjinirq5BXWtYCaEJ"; 

    if (sendBtn && answerInput) {
        sendBtn.addEventListener('click', () => {
            const answer = answerInput.value.trim();

            if (!answer) {
                alert("พิมพ์คำตอบก่อนสิครับอ้วนนน!");
                return;
            }

            const payload = {
                content: `💖 **คำตอบใหม่มาแล้วค้าบบ! (จากหน้าความลับ)** \n> "${answer}"`
            };

            const originalText = sendBtn.innerText;
            sendBtn.innerText = "กำลังส่ง...";
            sendBtn.disabled = true;

            fetch(webhookURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (response.ok) {
                    alert("ส่งคำตอบไปหาเค้าแล้วนะค้าบบบบบบบ 🤭 รออ่านได้เลย!");
                    answerInput.value = "";
                } else {
                    alert("อ้าวววววววว! มีปัญหาในการส่ง (เช็คสถานะ Webhook อีกทีนะ)");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("ส่งไม่สำเร็จ ลองเช็คอินเทอร์เน็ตดูนะครับ");
            })
            .finally(() => {
                sendBtn.innerText = originalText;
                sendBtn.disabled = false;
            });
        });
    }
});