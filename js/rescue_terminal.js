document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('contact-us-trigger');
    const terminal = document.getElementById('terminal-container');
    
    let clickCount = 0;
    
    if (trigger && terminal) {
        trigger.addEventListener('click', () => {
            clickCount++;
            
            // Toggle visibility for better UX if they want to hide it back
            if (terminal.style.display === 'none') {
                 terminal.style.display = 'block';
                 // Scroll to terminal
                 terminal.scrollIntoView({ behavior: 'smooth' });
                 document.getElementById('rescue-input').focus();
            } else {
                terminal.style.display = 'none';
            }
        });
    }
    
    // PDF File Size Fetcher
    fetchFileSize();
});

function fetchFileSize() {
    const url = "assets/崇南省山地灾害应急救援总队 · 案件结案报告.pdf";
    fetch(url, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                const size = response.headers.get("content-length");
                if (size) {
                    const sizeInMB = (size / (1024 * 1024)).toFixed(2);
                    const sizeLabel = document.getElementById('file-size');
                    if(sizeLabel) sizeLabel.innerText = `(${sizeInMB} MB)`;
                }
            }
        })
        .catch(err => console.log("File size fetch failed:", err));
}

function downloadPDF() {
    const fileName = "崇南省山地灾害应急救援总队 · 案件结案报告.pdf";
    const url = "assets/" + fileName;
    
    if (confirm(`即将下载文件：\n${fileName}\n\n确认下载？`)) {
        const progressContainer = document.getElementById('dl-progress');
        const progressBar = document.getElementById('dl-bar');
        
        if(progressContainer) progressContainer.style.display = 'block';
        
        // Simulate progress since we can't easily hook into native download progress for simple anchor clicks
        // But for UX, we can use XHR/Fetch to blob then save
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;
            if (progressBar) progressBar.style.width = progress + "%";
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    // Trigger real download
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    
                    // Reset
                    if(progressContainer) progressContainer.style.display = 'none';
                    if(progressBar) progressBar.style.width = "0%";
                }, 500);
            }
        }, 100);
    }
}

function checkCoordinates() {
    const input = document.getElementById('rescue-input').value;
    const resultDiv = document.getElementById('rescue-result');
    
    // Normalize input
    const text = input.replace(/\s+/g, ' ').toUpperCase();
    
    // Check for keywords
    // P1: 34.2140, 108.5500
    // P2: 34.2158, 108.5521
    // Dist: 200
    
    const hasP1Lat = text.includes('34.2140');
    const hasP1Lon = text.includes('108.5500');
    const hasP2Lat = text.includes('34.2158');
    const hasP2Lon = text.includes('108.5521');
    const hasDist = text.includes('200');
    
    // Check if at least P1 and P2 are present, or P1/P2 and distance logic
    // The script says: FROM [34.2140, 108.5500] TO [34.2158, 108.5521] DISTANCE 200m
    
    // Also check for the Calculated Final Coordinates directly
    // Result: 34.2153N, 108.5515E
    const hasFinalLat = text.includes('34.2153');
    const hasFinalLon = text.includes('108.5515');

    if ((hasP1Lat && hasP1Lon && hasP2Lat && hasP2Lon && hasDist) || (hasFinalLat && hasFinalLon)) {
        resultDiv.innerHTML = `
            <div style="color: green; font-weight: bold;">
                > CALCULATION SUCCESS<br>
                > TARGET COORDINATES: 34.2153N, 108.5515E<br>
                > DEVIATION: 0.0000<br>
                > STATUS: CONFIRMED<br>
                > UNLOCKING ARCHIVE...
            </div>
        `;
        
        // Reveal the PDF section
        setTimeout(() => {
            const archiveSection = document.getElementById('case-archive-section');
            if (archiveSection) {
                archiveSection.style.display = 'block';
                archiveSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1500);
    } else if (hasP1Lat || hasP2Lat) {
         resultDiv.innerHTML = `<p style="color: red; font-family: monospace;">> ERROR: INSUFFICIENT DATA. NEED VECTOR (P1 -> P2) AND DISTANCE (R).</p>`;
    } else {
        resultDiv.innerHTML = `<p style="color: red; font-family: monospace;">> ERROR: INVALID SYNTAX. EXPECTED FORMAT: FROM [P1] TO [P2] DISTANCE [R]</p>`;
    }
}
