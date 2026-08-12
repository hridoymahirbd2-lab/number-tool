const inputNumbers = document.getElementById('input-numbers');
const loadBtn = document.getElementById('load-btn');
const remainingList = document.getElementById('remaining-list');
const copiedList = document.getElementById('copied-list');
const toast = document.getElementById('toast');

let numbersArray = [];

loadBtn.onclick = () => {
    let text = inputNumbers.value.trim();
    if (!text) return;

    let lines = text.split('\n');
    numbersArray = [];

    lines.log = lines.forEach(line => {
        let cleanNum = line.trim();
        if (cleanNum) {
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

function, copyAndMove(num, index) {
    // ফাংশন ঠিক করা হলো
}

// সঠিকভাবে কপি এবং মুভ করার মূল ফাংশন
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