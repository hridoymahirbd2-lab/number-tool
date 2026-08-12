const inputNumbers = document.getElementById('input-numbers');
const fileInput = document.getElementById('file-input');
const loadBtn = document.getElementById('load-btn');
const remainingList = document.getElementById('remaining-list');
const copiedList = document.getElementById('copied-list');
const toast = document.getElementById('toast');

let numbersArray = [];

// ফাইল রিড করা
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        inputNumbers.value = e.target.result;
    };
    reader.readAsText(file);
});

// নম্বর প্রসেস করা
loadBtn.onclick = () => {
    let text = inputNumbers.value.trim();
    if (!text) return;

    let lines = text.split(/\r?\n/);
    numbersArray = [];

    lines.forEach(line => {
        let cleanNum = line.trim();
        if (cleanNum) {
            // সামনে '+' যুক্ত করা
            if (!cleanNum.startsWith('+')) {
                cleanNum = '+' + cleanNum;
            }
            numbersArray.push(cleanNum);
        }
    });

    copiedList.innerHTML = '';
    renderRemaining();
};

function renderRemaining() {
    remainingList.innerHTML = '';
    numbersArray.forEach((num, index) => {
        let div = document.createElement('div');
        div.className = 'number-item';
        div.innerText = num;
        div.onclick = () => copyAndMove(num, index);
        remainingList.appendChild(div);
    });
}

function copyAndMove(num, index) {
    navigator.clipboard.writeText(num);

    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 1500);

    numbersArray.splice(index, 1);
    renderRemaining();

    let copiedDiv = document.createElement('div');
    copiedDiv.className = 'number-item';
    copiedDiv.innerText = num;
    copiedList.appendChild(copiedDiv);
}
