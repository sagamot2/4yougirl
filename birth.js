document.addEventListener('DOMContentLoaded', () => {
    // --- โลจิกสลับโหมด มืด/สว่าง ---
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

    const statusText = document.getElementById('current-status');
    const statusInput = document.getElementById('status-input');
    const updateBtn = document.getElementById('update-status-btn');

    const savedStatus = localStorage.getItem('myStatus');
    if (savedStatus) {
        statusText.innerText = savedStatus;
    }

    if (updateBtn) {
        updateBtn.addEventListener('click', () => {
            const newStatus = statusInput.value.trim(); 
            
            if (newStatus !== "") {
                statusText.innerText = newStatus; 
                localStorage.setItem('myStatus', newStatus); 
                statusInput.value = ""; 
                
                if(newStatus === "แฟน") {
                    alert("เย้! ยอมเปลี่ยนสถานะเป็นแฟนแล้ว น่ารักที่สุด 🥰💖");
                }
            }
        });
    }

    setInterval(() => {

        const current = localStorage.getItem('myStatus') || "";
        
        if (current !== "แฟน") {
            alert("แวะมาทวงสถานะ... เมื่อไหร่จะยอมพิมพ์เปลี่ยนสถานะเป็น 'แฟน' ค้าบบบ 👀✨");
        }
    }, 60000); 
});