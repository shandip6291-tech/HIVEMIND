document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Scroll Reveal Animation Engine
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section aate hi active class trigger hogi
                entry.target.classList.add("active");
                // Memory/CPU utilization save karne ke liye unobserve kiya
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.12 // Section jab screen par 12% enter karega tab chalega
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 2. Real-time Live Footer Clock
    const timestampNode = document.getElementById("timestamp-val");
    if (timestampNode) {
        setInterval(() => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            timestampNode.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }, 1000);
    }
});
