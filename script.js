const inputNumbers = document.getElementById('input-numbers');
const fileInput = document.getElementById('file-input');
const prefixInput = document.getElementById('prefix-input');
const loadBtn = document.getElementById('load-btn');
const remainingList = document.getElementById('remaining-list');
const otherList = document.getElementById('other-list');
const copiedList = document.getElementById('copied-list');
const toast = document.getElementById('toast');
const logoTitle = document.getElementById('logo-title');

let matchedArray = [];
let otherArray = [];

const colors = ['#00ffcc', '#ff0055', '#ffcc00', '#0099ff', '#ff5500', '#cc00ff', '#33ff33'];

setInterval(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    logoTitle.style.color = randomColor;
    logoTitle.style.textShadow = `0 0 12px ${randomColor}`;
}, 1000);

logoTitle.onclick = () => {
    matchedArray = [];
    otherArray = [];
    remainingList.innerHTML = '';
    otherList.innerHTML = '';
    copiedList.innerHTML = '';
    inputNumbers.value = '';
    fileInput.value = '';
    prefixInput.value = '';
    
    toast.innerText = "Reset Successfully!";
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 1500);
};

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        inputNumbers.value = e.target.result;
    };
    reader.readAsText(file);
});

loadBtn.onclick = () => {
    let text = inputNumbers.value.trim();
    if (!text) return;

    let prefix = prefixInput.value.trim();
    let lines = text.split(/\r?\n/);
    
    matchedArray = [];
    otherArray = [];

    lines.forEach(line => {
        let cleanNum = line.trim();
        if (cleanNum) {
            if (!cleanNum.startsWith('+')) {
                cleanNum = '+' + cleanNum;
            }

            // প্রিফিক্স মিলে গেলেMatched লিস্টে যাবে, না মিললে Other লিস্টে যাবে
            if (prefix && cleanNum.startsWith(prefix)) {
                matchedArray.push(cleanNum);
            } else if (!prefix) {
                matchedArray.push(cleanNum);
            } else {
                otherArray.push(cleanNum);
            }
        }
    });

    copiedList.innerHTML = '';
    renderLists();

    inputNumbers.value = '';
    fileInput.value = '';
};

function renderLists() {
    remainingList.innerHTML = '';
    matchedArray.forEach((num, index) => {
        let div = document.createElement('div');
        div.className = 'number-item';
        div.innerText = num;
        div.onclick = () => copyAndMoveMatched(num, index);
        remainingList.appendChild(div);
    });

    otherList.innerHTML = '';
    otherArray.forEach((num, index) => {
        let div = document.createElement('div');
        div.className = 'number-item';
        div.innerText = num;
        div.onclick = () => copyAndMoveOther(num, index);
        otherList.appendChild(div);
    });
}

function copyAndMoveMatched(num, index) {
    navigator.clipboard.writeText(num);
    showToast(num);

    matchedArray.splice(index, 1);
    renderLists();
    addToCopied(num);
}

function copyAndMoveOther(num, index) {
    navigator.clipboard.writeText(num);
    showToast(num);

    otherArray.splice(index, 1);
    renderLists();
    addToCopied(num);
}

function addToCopied(num) {
    let copiedDiv = document.createElement('div');
    copiedDiv.className = 'number-item copied-item';
    copiedDiv.innerText = num;
    copiedList.appendChild(copiedDiv);
}

function showToast(num) {
    toast.innerText = "Copied: " + num;
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 1500);
}
