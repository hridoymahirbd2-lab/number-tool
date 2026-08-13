const inputNumbers = document.getElementById('input-numbers');
const fileInput = document.getElementById('file-input');
const loadBtn = document.getElementById('load-btn');
const remainingList = document.getElementById('remaining-list');
const copiedList = document.getElementById('copied-list');
const toast = document.getElementById('toast');
const logoTitle = document.getElementById('logo-title');

let numbersArray = [];

// বিভিন্ন সুন্দর কালারের অ্যারে
const colors = ['#00ffcc', '#ff0055', '#ffcc00', '#0099ff', '#ff5500', '#cc00ff', '#33ff33'];

// অটোমেটিক লোগোর কালার পরিবর্তন
setInterval(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    logoTitle.style.color = randomColor;
    logoTitle.style.textShadow = `0 0 12px ${randomColor}`;
}, 1000);

// HRIDOY নামের ওপর ক্লিক করলে সাইট রিসেট হবে
logoTitle.onclick = () => {
    numbersArray = [];
    remainingList.innerHTML = '';
    copiedList.innerHTML = '';
    inputNumbers.value = '';
    fileInput.value = '';
    
    toast.innerText = "Reset Successfully!";
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 1500);
};

// টেক্সট ফাইল রিড করার ফাংশন
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        inputNumbers.value = e.target.result;
    };
    reader.readAsText(file);
});

// Load Numbers বাটনে ক্লিক করলে নম্বর লোড হবে
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

    numbersArray.splice(index, 1);
    renderRemaining();

    let copiedDiv = document.createElement('div');
    copiedDiv.className = 'number-item copied-item';
    copiedDiv.innerText = num;
    copiedList.appendChild(copiedDiv);
}
