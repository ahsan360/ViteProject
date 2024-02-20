export 


  let stringArray2: Array<string> = [];
  const textInput = document.getElementById('textInput') as HTMLInputElement;
  const submitButton = document.getElementById('submitButton');
  const inputP = document.querySelector<HTMLParagraphElement>('.inputP');

function updateOutput() {
    let outputText = '';
    for (let i: number = 0; i < stringArray2.length; i++) {
        outputText += `${i + 1} : ${stringArray2[i]} <button class="deleteButton" data-index="${i}">Delete</button><br> `;
    }
    inputP!.innerHTML = outputText;
    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const indexToRemove = parseInt((event.currentTarget as HTMLButtonElement).getAttribute('data-index') || '0', 10);
            if (!isNaN(indexToRemove) && indexToRemove >= 0 && indexToRemove < stringArray2.length) {
                stringArray2.splice(indexToRemove, 1);
                updateOutput();
            }
        });
    });
}

if (submitButton) {
    submitButton.addEventListener('click', () => {
        const inputValue = textInput.value.trim();
        if (inputValue !== '') {
            stringArray2.push(inputValue);
            updateOutput();
            textInput.value = '';
        }
    });
}
