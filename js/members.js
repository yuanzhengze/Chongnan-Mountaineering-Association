document.addEventListener('DOMContentLoaded', () => {
    // Select all member images with the class 'member-img'
    const memberImages = document.querySelectorAll('.member-img');

    memberImages.forEach(img => {
        const normalSrc = img.getAttribute('data-normal');
        const hoverSrc = img.getAttribute('data-hover');
        // Store the initial filter value to restore it later
        const originalFilter = img.style.filter; 

        if (normalSrc && hoverSrc) {
            img.addEventListener('mouseenter', () => {
                img.src = hoverSrc;
                img.style.filter = "contrast(150%) brightness(0.8)";
            });

            img.addEventListener('mouseleave', () => {
                img.src = normalSrc;
                img.style.filter = originalFilter; // Restore original filter
            });
        }
    });

    // Console Logs
    let logCount = 0;
    setInterval(() => {
        if (logCount < 5) {
            console.error("Error: Member ID_05 does not exist.");
            logCount++;
        } else if (logCount === 5) {
            console.warn("Do not trust the count.");
            console.log("%c Log: Backup entry moved to /admin_login.html ", "background: #222; color: #bada55");
            logCount++;
        }
    }, 2000);
});
