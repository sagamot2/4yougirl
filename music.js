document.addEventListener('DOMContentLoaded', function() {
    const quotes = [
        "ฟังเพลงนี้แล้วนึกถึงใคร... นึกถึงเค้าแน่เลย อิอิ 🤭",
        "คนอะไรไม่รู้ ยิ่งดูยิ่งน่ารักกกก ✨",
        "ที่ใจสั่นเพราะกาแฟ หรือเพราะแกฟะ? ☕",
        "น่ารักกว่าแมวก็เธอตอนยิ้มนี่แหละ 🥰",
        "ไม่ได้เป็นคนเจ้าชู้ แค่อยากมีyouอยู่ข้างๆ ทุกวัน 🧸",
        "เธอไม่ต้องทำอะไรเลย แค่น่ารักไปวันๆ ก็พอแล้ว 🌈",
        "💖"
    ];

    const quoteElement = document.getElementById("random-quote");

    const randomIndex = Math.floor(Math.random() * quotes.length);
    
    if (quoteElement) {
        quoteElement.innerText = quotes[randomIndex];
    }
});