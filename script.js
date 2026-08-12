const inputNumbers = document.getElementById('input-numbers');
const fileInput = document.getElementById('file-input');
const loadBtn = document.getElementById('load-btn');
const remainingList = document.getElementById('remaining-list');
const copiedList = document.getElementById('copied-list');
const toast = document.getElementById('toast');

let numbersArray = [];

// টেক্সট ফাইল রিড করা
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        inputNumbers.value = e.target.result;
    };
    reader.readAsText(file);
});

// Load Numbers এ ক্লিক করলে প্রসেস হবে এবং ওপরের বক্স ক্লিয়ার হয়ে যাবে
loadBtn.onclick = () => {
    let text = inputNumbers.value.trim();
    if (!text) return;

    let lines = text.split(/\r?\n/);
    numbersArray = [];

    lines.forEach(line => {
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

    // লোড হওয়ার পর ওপরের বক্স ও ফাইল ইনপুট ক্লিয়ার করে দেওয়া
    inputNumbers.value = '';
    fileInput.value = '';
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

    toast.innerText = "Copied: " + num;
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 1500);

    // মূল লিস্ট থেকে রিমুভ করা
    numbersArray.splice(index, 1);
    renderRemaining();

    // নিচের লিস্টে লাল রঙের স্টাইল সহ যোগ করা
    let copiedDiv = document.createElement('div');
    copiedDiv.className = 'number-item copied-item';
    copiedDiv.innerText = num;
    copiedList.appendChild(copiedDiv);
}
