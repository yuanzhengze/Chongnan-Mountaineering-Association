document.addEventListener('DOMContentLoaded', () => {
    // Audio Generation (White Noise + Beeps)
    // Only run if audio-status element exists
    const audioStatus = document.getElementById('audio-status');
    if (!audioStatus) return;

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
            audioStatus.innerText = "Audio Driver: ACTIVE (Wind.mp3)";
            
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
            audioStatus.innerText = "Audio Driver: ERROR (Click page to retry)";
            
            document.body.addEventListener('click', () => {
                 initAudio();
            }, { once: true });
        }
    }

    // Auto-init audio after delay
    setTimeout(initAudio, 2000);
});
