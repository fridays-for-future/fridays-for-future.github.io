function copyIBAN() {
        var iban = document.getElementById('iban').innerText.replace(/\s+/g, '');
        var textarea = document.createElement('textarea');
        textarea.value = iban;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        var button = document.getElementById('copy-button');
        button.textContent = 'kopiert!';
        button.style.color = '#1DA64A';
        button.disabled = true;

        setTimeout(function() {
            button.textContent = 'kopieren';
            button.style.color = 'gray';
            button.disabled = false;
        }, 1500);
      }
