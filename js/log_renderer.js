document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const logId = params.get('id');
    const container = document.querySelector('.log-container');

    if (logId && LOG_DATA[logId]) {
        renderSingleLog(container, LOG_DATA[logId]);
    } else if (logId) {
         container.innerHTML = `<div class="log-entry"><h1>Error 404</h1><p>Log ID ${logId} not found.</p></div>`;
    } else {
        renderLogList(container);
    }
});

function renderSingleLog(container, log) {
    container.innerHTML = '';
    
    if (log.isDraft) {
        document.body.style.fontFamily = "'Courier New', monospace";
        container.innerHTML = `
            <div class="log-entry draft-mode">
                <h1 style="color: red;">${log.title}</h1>
                <div class="log-meta">DATE: ${log.date} | STATUS: UNSENT</div>
                <hr>
                <div class="content" style="word-break: break-all; margin-top: 20px;">
                    ${log.content}
                </div>
                <div style="margin-top: 50px; border-top: 1px dotted #666; font-size: 10px; color: #666;">
                    DEBUG_INFO:<br>
                    User-Agent: NokiaE71/SymbianOS<br>
                    Connection: Timeout<br>
                    Retry-Count: 99
                </div>
            </div>
            <div style="margin-top: 20px;"><a href="log_view.html">Back to List</a></div>
        `;
    } else {
        container.innerHTML = `
            <div class="log-entry">
                <h1>Log #${log.id}: ${log.title}</h1>
                <div class="log-meta">Date: ${log.date} | Author: ${log.author}</div>
                <p>${log.content}</p>
                <div style="margin-top: 50px; border-top: 1px dotted #666; font-size: 10px; color: #666;">
                    DEBUG_INFO:<br>
                    User-Agent: NokiaE71/SymbianOS
                </div>
            </div>
            <div style="margin-top: 20px;"><a href="log_view.html">Back to List</a></div>
        `;
    }
}

function renderLogList(container) {
    container.innerHTML = '<h1>[INTERNAL LOGS - LEVEL 5]</h1><div id="audio-status" style="color: #444; font-size: 10px;">Audio Driver: Initializing...</div>';
    
    Object.values(LOG_DATA).forEach(log => {
        if (log.isDraft) return; 
        
        const div = document.createElement('div');
        div.className = 'log-entry';
        div.innerHTML = `
            <div class="log-meta">Entry #${log.id} [${log.date}]</div>
            <p><a href="?id=${log.id}">${log.title}</a></p>
        `;
        container.appendChild(div);
    });
    
    const footer = document.createElement('div');
    footer.style.marginTop = "100px";
    footer.style.fontSize = "10px";
    footer.innerHTML = '<a href="archive.html">Return to Index</a>';
    container.appendChild(footer);
}
