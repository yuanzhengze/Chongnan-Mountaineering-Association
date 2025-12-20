function handleClubClick(event) {
    event.preventDefault();
    // Simulate 404
    document.body.innerHTML = `
        <div style="font-family: 'Courier New', monospace; text-align: left; padding: 20px; color: #000; background: #fff;">
            <h1>Not Found</h1>
            <p>The requested URL /student_clubs was not found on this server.</p>
            <hr>
            <address>Apache/2.2.15 (CentOS) Server at www.chongnan.edu.cn Port 80</address>
        </div>
    `;
    document.title = "404 Not Found";
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}
