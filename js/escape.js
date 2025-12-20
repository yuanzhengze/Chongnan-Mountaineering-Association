document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal
    const rules = document.querySelectorAll('.rule');
    
    window.addEventListener('scroll', () => {
        rules.forEach(rule => {
            const rect = rule.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                rule.classList.add('visible');
            }
        });
    });

    // 2. Fake Camera Permission
    setTimeout(() => {
        // Just a simple confirm to simulate the browser prompt
        // Using confirm/alert is blocking, so maybe a custom overlay is better, 
        // but 'confirm' feels very "browser native" which is scary.
        if (confirm("www.chongnan-climb.edu 想要访问您的摄像头。\n\n[允许] [拒绝]")) {
            alert("无法连接到摄像头。检测到外部遮挡。");
        } else {
            alert("拒绝无效。");
        }
    }, 5000);

    // 3. Mouse Tracking (Cosmetic)
    document.addEventListener('mousemove', (e) => {
        // Occasionally freeze the cursor or something? 
        // Actually, let's just log coordinates to make the user feel watched if they open console
        if (Math.random() > 0.95) {
            console.log(`Tracking subject gaze at: ${e.clientX}, ${e.clientY}`);
        }
    });
});
