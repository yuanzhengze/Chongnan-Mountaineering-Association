document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to CMU Mountaineering Club.");
    console.log("<!-- DO NOT TRUST THE HEADER. -->");

    const teamPhoto = document.getElementById('teamPhoto');
    const teamPhotoGlitch = document.getElementById('teamPhotoGlitch');
    const photoContainer = document.getElementById('photoContainer');
    
    // ARG Mechanism: Glitch Effect after 30 seconds
    setTimeout(() => {
        triggerGlitch();
    }, 30000);

    // Speed up for debugging if 'debug' is in URL
    if (window.location.search.includes('debug')) {
        setTimeout(() => {
            triggerGlitch();
        }, 2000);
    }

    // ARG Loop State
    if (window.location.search.includes('loop=true')) {
        // 1. Black out faces (For image, we can just use CSS filter to make it dark or inverted, or swap to a scary version)
        // Since we switched to PNG, we can't select circles. Let's invert the image.
        teamPhoto.style.filter = 'brightness(0.2) contrast(1.5)';
        
        // 2. Change Notice
        const notice = document.querySelector('.notice');
        if (notice) {
            notice.innerHTML = "欢迎加入崇南大学登山社。<br><br>我们永远在这里等你。";
            notice.style.borderColor = "black";
            notice.style.color = "black";
            notice.style.backgroundColor = "#ccc";
        }
    }

    function triggerGlitch() {
        // Visual Glitch
        teamPhoto.classList.add('glitch-active');
        
        // Flicker the hidden face image
        if (Math.random() > 0.5) {
            teamPhotoGlitch.style.opacity = Math.random();
        }

        // Console Creepiness
        console.warn("Connection unstable...");
        console.error("DATA CORRUPTION DETECTED AT SECTOR 0x7E4");
        
        // Randomly stop the glitch to make it feel intermittent
        setTimeout(() => {
            teamPhoto.classList.remove('glitch-active');
            teamPhotoGlitch.style.opacity = 0;
            
            // Re-trigger randomly
            setTimeout(triggerGlitch, Math.random() * 5000 + 2000);
        }, 200);
    }

    // Counter Simulation
    const counter = document.getElementById('counter');
    let count = 1024;
    setInterval(() => {
        if (Math.random() > 0.9) {
            count++;
            counter.innerText = count;
        }
    }, 5000);
});
