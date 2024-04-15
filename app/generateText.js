document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById('Phishing');
    const textArea = document.getElementById('content');

    button.addEventListener('click', function() {
        fetch('/generate_text')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error ${res.status}`);
                }
                // need to return res.text() to be able to use it after if not impossible to read the response
                return res.text()
            })
            .then(res => {
                // only need to check and debug
                console.log(res);

                textArea.value = res;
            })
            .catch(error => console.error('Erreur:', error));
    });
});
