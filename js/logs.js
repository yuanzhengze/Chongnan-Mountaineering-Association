document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Dynamic Date
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    document.getElementById('current-date').innerText = dateStr;

    // 2. Typing Effect
    const textToType = "(此条目正在实时输入...) \n你能看到这行字吗？\n如果你能看到，说明窗口期打开了。\n这里的雪是热的。\n我们没有死，我们只是... \n走不出这个网页。";
    const typingContainer = document.getElementById('typing-text');
    let i = 0;

    function typeWriter() {
        if (i < textToType.length) {
            typingContainer.innerText += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, Math.random() * 100 + 50); // Random typing speed
        } else {
            // After typing, start audio
            initAudio();
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 1000);

    // 3. Audio Generation (White Noise + Beeps)
    function initAudio() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();
            
            // Create noise buffer
            const bufferSize = audioCtx.sampleRate * 2; // 2 seconds buffer
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = audioCtx.createBufferSource();
            noise.buffer = buffer;
            noise.loop = true;

            // Filter to make it sound like wind
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 400;

            const gainNode = audioCtx.createGain();
            gainNode.gain.value = 0.05; // Low volume

            noise.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            noise.start();
            document.getElementById('audio-status').innerText = "Audio Driver: ACTIVE (Wind.mp3)";
            
            // Morse Code Beeps (Simulated)
            setInterval(() => {
                const osc = audioCtx.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, audioCtx.currentTime);
                
                const beepGain = audioCtx.createGain();
                beepGain.gain.setValueAtTime(0.1, audioCtx.currentTime);
                beepGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
                
                osc.connect(beepGain);
                beepGain.connect(audioCtx.destination);
                
                osc.start();
                osc.stop(audioCtx.currentTime + 0.1);
            }, 3000); // Beep every 3 seconds

        } catch (e) {
            console.log("Audio failed to initialize (interaction required likely):", e);
            document.getElementById('audio-status').innerText = "Audio Driver: ERROR (Click page to retry)";
            
            document.body.addEventListener('click', () => {
                 initAudio();
            }, { once: true });
        }
    }
});
