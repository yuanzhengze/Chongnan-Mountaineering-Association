document.addEventListener('DOMContentLoaded', () => {
    const captainPhoto = document.getElementById('captainPhoto');
    
    // Normal Photo SVG (Encoded) - Kept as backup/default state
    const normalSVG = `
        <svg id="captainNormal" width="100%" height="100%" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="40" r="25" fill="#ccc"/>
            <rect x="25" y="70" width="50" height="50" fill="#888"/>
            <text x="50" y="110" font-size="10" text-anchor="middle" fill="#fff">No Photo</text>
        </svg>
    `;

    // Creepy Photo Image
    const creepyImage = `<img src="assets/images/broken_face_male.png" style="width:100%; height:100%; object-fit:cover;">`;

    // Hover Effect
    captainPhoto.addEventListener('mouseenter', () => {
        captainPhoto.innerHTML = creepyImage;
        captainPhoto.style.filter = "contrast(150%) brightness(0.8)";
    });

    captainPhoto.addEventListener('mouseleave', () => {
        captainPhoto.innerHTML = normalSVG;
        captainPhoto.style.filter = "none";
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
