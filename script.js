const inputSection = document.getElementById('input-section');
const inputNumbers = document.getElementById('input-numbers');
const fileInput = document.getElementById('file-input');
const prefixInput = document.getElementById('prefix-input');
const loadBtn = document.getElementById('load-btn');
const remainingList = document.getElementById('remaining-list');
const otherList = document.getElementById('other-list');
const copiedList = document.getElementById('copied-list');

const matchedCount = document.getElementById('matched-count');
const otherCount = document.getElementById('other-count');
const copiedCount = document.getElementById('copied-count');

const toast = document.getElementById('toast');
const logoTitle = document.getElementById('logo-title');

let matchedArray = [];
let otherArray = [];
let copiedArrayCount = 0;

const colors = ['#00ffcc', '#ff0055', '#ffcc00', '#0099ff', '#ff5500', '#cc00ff', '#33ff33'];

// লোগোর রঙ পরিবর্তন
setInterval(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    logoTitle.style.color = randomColor;
    logoTitle.style.textShadow = `0 0 12px ${randomColor}`;
}, 1000);

// লোগোতে ক্লিক করলে রিসেট হবে
logoTitle.onclick = () => {
    matchedArray = [];
    otherArray = [];
    copiedArrayCount = 0;
    
    remainingList.innerHTML = '';
    otherList.innerHTML = '';
    copiedList.innerHTML = '';
    
    inputNumbers.value = '';
    fileInput.value = '';
    prefixInput.value = '';
    
    updateCounts();
    inputSection.style.display = 'block';

    toast.innerText = "Reset Successfully!";
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 1500);
};

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

// নম্বর লোড এবং ফিল্টার করা
loadBtn.onclick = () => {
    let text = inputNumbers.value.trim();
    if (!text) return;

    let prefix = prefixInput.value.trim();
    let lines = text.split(/\r?\n/);
    
    matchedArray = [];
    otherArray = [];
    copiedArrayCount = 0;

    lines.forEach(line => {
        let rawLine = line.trim();
        if (rawLine) {
            // নম্বরের আগের সব উল্টোপাল্টা অংশ মুছে শুধুমাত্র '+' ও নম্বর রাখা
            let cleanNum = rawLine.replace(/^[^\+]+/, '');
            
            if (!cleanNum.startsWith('+')) {
                cleanNum = '+' + cleanNum;
            }

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
    updateCounts();

    inputSection.style.display = 'none';
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

    updateCounts();
}

function updateCounts() {
    matchedCount.innerText = matchedArray.length;
    otherCount.innerText = otherArray.length;
    copiedCount.innerText = copiedArrayCount;
}

function copyAndMoveMatched(num, index) {
    navigator.clipboard.writeText(num);
    showToast(num);

    matchedArray.splice(index, 1);
    copiedArrayCount++;
    renderLists();
    addToCopied(num);
}

function copyAndMoveOther(num, index) {
    navigator.clipboard.writeText(num);
    showToast(num);

    otherArray.splice(index, 1);
    copiedArrayCount++;
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
