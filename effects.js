const textarea = document.getElementById('ai-input');
const arcReactor = document.querySelector('.Arc-Reactor');
const outputContainer = document.getElementById('ai-output-container');
const ring = document.querySelector('.ring');
const centre = document.querySelector('.centre');
const sendBtn = document.querySelector('.send-btn');

// Add a transition for the textbox glow
textarea.style.transition = 'box-shadow 0.5s ease-in-out';

// EXPAND HEIGHT ON TEXT
function adjustHeight() {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}
textarea.addEventListener('input', adjustHeight);
adjustHeight();

// PLACEHOLDER OF TEXTBOX
function handlePlaceholder() {
    if (textarea.textContent.trim() === '') {
        textarea.classList.add('is-empty');
    } else {
        textarea.classList.remove('is-empty');
    }
}
textarea.addEventListener('input', handlePlaceholder);
handlePlaceholder();


textarea.addEventListener('blur', () => {
    textarea.style.boxShadow = 'none';
});

// FUNCTION TO DETECT AND SEND MSGS
function sendMessage() {
    const message = textarea.textContent.trim().toLowerCase();
    if (message !== '') {
        const box = document.createElement('div');
        box.className = 'ai-output';
        box.innerHTML = `<div>${message}</div><span class="close">&times;</span>`;
        outputContainer.appendChild(box);

        
        outputContainer.scrollTop = outputContainer.scrollHeight;

        textarea.innerHTML = '';
        handlePlaceholder();
        adjustHeight();

        let commandExecuted = false;
        if (message.includes('change color to blue')) {
            changeGlowColor('blue');
            arcReactor.classList.remove('hidden');
            commandExecuted = true;
        } else if (message.includes('change color to red')) {
            changeGlowColor('red');
            arcReactor.classList.remove('hidden');
            commandExecuted = true;
        } else if (message.includes('change color to purple')) {
            changeGlowColor('purple');
            arcReactor.classList.remove('hidden');
            commandExecuted = true;
        } else if (message.includes('change color to orange')) {
            changeGlowColor('orange');
            arcReactor.classList.remove('hidden');
            commandExecuted = true;
        } else if (message.includes('change color to pink')) {
            changeGlowColor('pink');
            arcReactor.classList.remove('hidden');
            commandExecuted = true;
        } else if (message.includes('turn off the lights')) {
            turnOffGlow();
            arcReactor.classList.remove('hidden');
            commandExecuted = true;
        }

        if (!commandExecuted) {
            arcReactor.classList.add('hidden');
        }

        box.querySelector('.close').addEventListener('click', () => {
            box.remove();
            if (outputContainer.children.length === 0) {
                arcReactor.classList.remove('hidden');
                const savedColor = localStorage.getItem('lastColor');
                if (savedColor === 'off') {
                    turnOffGlow();
                } else if (savedColor) {
                    changeGlowColor(savedColor);
                } else {
                    changeGlowColor('default');
                }
            }
        });
    }
}

//SEND FUNC BUTTONS
textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
sendBtn.addEventListener('click', sendMessage);

//TEXTBOX GLOW
function applyTextboxGlow(color) {
    let newBoxShadow;
    switch (color) {
        case 'blue':
            newBoxShadow = '0 0 15px rgba(0, 140, 255, 0.7)';
            break;
        case 'red':
            newBoxShadow = '0 0 15px rgba(255, 0, 0, 0.7)';
            break;
        case 'purple':
            newBoxShadow = '0 0 15px rgba(128, 0, 128, 0.7)';
            break;
        case 'orange':
            newBoxShadow = '0 0 15px rgba(255, 165, 0, 0.7)';
            break;
        case 'pink':
            newBoxShadow = '0 0 15px rgba(255, 105, 180, 0.7)';
            break;
    }
    textarea.style.boxShadow = newBoxShadow;
}

// CHANGE GLOW COLOR AND UPDATE TEXTBOX
function changeGlowColor(color) {
    let newFilter;
    switch (color) {
        case 'blue':
            newFilter = 'drop-shadow(0 0 0.5rem #008CFF) drop-shadow(0 0 2rem #008CFF) drop-shadow(0 0 4rem #008CFF)';
            break;
        case 'red':
            newFilter = 'drop-shadow(0 0 0.5rem #FF0000) drop-shadow(0 0 2rem #FF0000) drop-shadow(0 0 4rem #FF0000)';
            break;
        case 'purple':
            newFilter = 'drop-shadow(0 0 0.5rem #800080) drop-shadow(0 0 2rem #800080) drop-shadow(0 0 4rem #800080)';
            break;
        case 'orange':
            newFilter = 'drop-shadow(0 0 0.5rem #FFA500) drop-shadow(0 0 2rem #FFA500) drop-shadow(0 0 4rem #FFA500)';
            break;
        case 'pink':
            newFilter = 'drop-shadow(0 0 0.5rem #FF1493) drop-shadow(0 0 2rem #FF1493) drop-shadow(0 0 4rem #FF1493)';
            break;
        case 'default':
        default:
            newFilter = 'drop-shadow(0 0 0.5rem #000080) drop-shadow(0 0 2rem #000080) drop-shadow(0 0 4rem #000080)';
            break;
    }

    const combinedFilter = `${newFilter}`;

    // Apply glow to Arc Reactor
    ring.style.filter = combinedFilter;
    centre.style.filter = combinedFilter;

    //update textbox glow
    if (document.activeElement === textarea) {
        applyTextboxGlow(color);
    }

    // save the last state
    localStorage.setItem('lastColor', color);
}

//TURN OFF ARC
function turnOffGlow() {
    ring.style.filter = 'none';
    centre.style.filter = 'none';

    if (document.activeElement === textarea) {
        textarea.style.boxShadow = 'none';
    }

    localStorage.setItem('lastColor', 'off');
}

//LOAD LAST
window.addEventListener('load', () => {
    const savedColor = localStorage.getItem('lastColor');
    if (savedColor === 'off') {
        turnOffGlow();
    } else if (savedColor) {
        changeGlowColor(savedColor);
    } else {
        changeGlowColor('default');
    }
});
// load last of textbox also
textarea.addEventListener('focus', () => {
    const savedColor = localStorage.getItem('lastColor');
    if (savedColor && savedColor !== 'off') {
        applyTextboxGlow(savedColor);
    } else {
        applyTextboxGlow('default');
    }
});


//SIDEBAR APPEARS
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const sideBar = document.querySelector('.side-bar');

    if (!menuToggle || !sideBar) {
        console.error('menuToggle or sideBar not found');
        return;
    }

    menuToggle.addEventListener('click', () => {
        console.log('menu clicked'); // debug
        sideBar.classList.toggle('active');
    });
});