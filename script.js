// --- ANONYMOUS NOTES DATA ---
const anonymousNotes = [
  "I saw someone today who looked like they were waiting for someone.",
  "I wonder if they know I always sit at the table across from them.",
  "The rain outside feels softer when I have a hot cup of tea.",
  "I left a bookmark on page 42. I hope whoever reads it next enjoys the chapter.",
  "I brought two umbrellas today, just in case."
];

// --- DOM ELEMENTS ---
const cafe = document.querySelector('.cafe');
const candle = document.getElementById('candle');
const flame = document.getElementById('flame');
const coffeeCup = document.getElementById('coffeeCup');
const book = document.getElementById('book');
const plant = document.getElementById('plant');
const notesBox = document.getElementById('notesBox');
const cat = document.getElementById('cat');
const catBubble = document.getElementById('catBubble');

const btnTime = document.getElementById('btnTime');
const btnRain = document.getElementById('btnRain');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const btnCloseModal = document.getElementById('btnCloseModal');
const noteInputContainer = document.getElementById('noteInputContainer');
const noteInput = document.getElementById('noteInput');
const btnSubmitNote = document.getElementById('btnSubmitNote');

// --- MODAL HELPER ---
function showModal(title, text, showInput = false) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  noteInputContainer.classList.toggle('hidden', !showInput);
  modal.classList.remove('hidden');
}

btnCloseModal.addEventListener('click', () => modal.classList.add('hidden'));

// --- 🕯️ CANDLE FLICKER TOGGLE ---
candle.addEventListener('click', () => {
  flame.classList.toggle('off');
});

// --- ☕ COFFEE INTERACTION ---
coffeeCup.addEventListener('click', () => {
  showModal("Hot Coffee ☕", "A freshly brewed cup of hazelnut coffee. The warm steam rises gently.");
});

// --- 📖 BOOK INTERACTION ---
book.addEventListener('click', () => {
  showModal("Open Book 📖", '"It is better to be lonely in good company than to be lonely alone." — Chapter 3');
});

// --- 🪴 PLANT INTERACTION ---
plant.addEventListener('click', () => {
  showModal("Potted Plant ", "A healthy monstera plant. Its leaves rustle quietly in the soft café breeze.");
});

// --- 💌 ANONYMOUS NOTES BOX ---
notesBox.addEventListener('click', () => {
  const randomNote = anonymousNotes[Math.floor(Math.random() * anonymousNotes.length)];
  showModal("Someone left a note...", `"${randomNote}"`, true);
});

btnSubmitNote.addEventListener('click', () => {
  const userNote = noteInput.value.trim();
  if (userNote) {
    anonymousNotes.push(userNote);
    noteInput.value = '';
    showModal("Note Left 💌", "Your note was folded carefully and placed inside the box.");
  }
});

// --- 🐈 THE CAFÉ CAT ---
cat.addEventListener('click', () => {
  const catReactions = ["Purr... 🐾", "Meow!", "*Yawns*", "*Nuzzles your hand*"];
  const randomMsg = catReactions[Math.floor(Math.random() * catReactions.length)];
  catBubble.textContent = randomMsg;
  catBubble.classList.add('show');
  setTimeout(() => catBubble.classList.remove('show'), 2000);
});

// --- 🌅 DAY / EVENING / NIGHT CYCLE ---
const times = ['day', 'evening', 'night'];
let currentTimeIndex = 0;

btnTime.addEventListener('click', () => {
  cafe.classList.remove(times[currentTimeIndex]);
  currentTimeIndex = (currentTimeIndex + 1) % times.length;
  const newTime = times[currentTimeIndex];
  cafe.classList.add(newTime);
  
  const labels = { day: "🌅 Time: Day", evening: "🌆 Time: Evening", night: "🌙 Time: Night" };
  btnTime.textContent = labels[newTime];
});

// --- 🌧️ RAIN SYSTEM ---
let isRaining = false;
let rainInterval;

btnRain.addEventListener('click', () => {
  isRaining = !isRaining;
  const windowElem = document.getElementById('window');
  
  if (isRaining) {
    btnRain.textContent = "☀️ Clear Sky";
    rainInterval = setInterval(() => {
      const drop = document.createElement('div');
      drop.className = 'rain-drop';
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${0.4 + Math.random() * 0.4}s`;
      windowElem.appendChild(drop);
      
      setTimeout(() => drop.remove(), 1000);
    }, 50);
  } else {
    btnRain.textContent = "🌧️ Toggle Rain";
    clearInterval(rainInterval);
    document.querySelectorAll('.rain-drop').forEach(drop => drop.remove());
  }
});