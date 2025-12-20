document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('pwd');
    const CORRECT_ANSWER = '20140715';

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const val = input.value.trim();
            if (val === CORRECT_ANSWER) {
                // Success
                document.body.innerHTML = '<h1 style="color:green; font-family: monospace;">ACCESS GRANTED. REDIRECTING...</h1>';
                setTimeout(() => {
                    window.location.href = 'log_view.html';
                }, 1000);
            } else {
                // Failure - Creepy response
                alert("别在这时候喊名字！");
                input.value = "";
                input.style.borderColor = "red";
            }
        }
    });
});
