function sayHello() {
    alert("hello");
  }
  
document.getElementById('color-btn').onclick = function() {
    const colors = ['#f0f8ff', '#ffe4e1', '#e6ee9c', '#b2dfdb', '#ffecb3', '#d1c4e9', '#f8bbd0'];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}
  
// --- Mood Board Interactivity ---

// Albums
const albumGrid = document.getElementById('album-grid');
let albums = [
  'John Lennon - Imagine',
  'Norah Jones - Come Away With Me',
  'Pink Floyd - Wish You Were Here',
  'Enya - Watermark'
];

// --- FIREBASE PERSISTENCE ---
// These functions assume you have 'db' and 'auth' available from the module script.

async function saveMoodBoard() {
  if (window.firebaseAuthUser) {
    const userId = window.firebaseAuthUser.uid;
    await window.firebaseSaveDoc(userId, {
      albums,
      colors,
      quotes
    });
  }
}

// Helper to save to Firestore from the module script
window.firebaseSaveDoc = async (userId, data) => {
  const { setDoc, doc } = await import('https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js');
  await setDoc(doc(window.db, 'users', userId), data);
};

// Helper to load from Firestore from the module script
window.firebaseLoadDoc = async (userId) => {
  const { getDoc, doc } = await import('https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js');
  const snap = await getDoc(doc(window.db, 'users', userId));
  return snap.exists() ? snap.data() : null;
};

// Listen for auth state from the module script
window.addEventListener('firebase-auth', async (e) => {
  const user = e.detail;
  window.firebaseAuthUser = user;
  if (user) {
    // Load data from Firestore
    const data = await window.firebaseLoadDoc(user.uid);
    if (data) {
      albums = data.albums || albums;
      colors = data.colors || colors;
      quotes = data.quotes || quotes;
      renderAlbums();
      renderColors();
      renderQuotes();
    }
  }
});

function renderAlbums() {
  albumGrid.innerHTML = '';
  albums.forEach((album, idx) => {
    const div = document.createElement('div');
    div.className = 'album-name';
    div.textContent = album;
    div.tabIndex = 0;
    div.onclick = function() {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = album;
      input.className = 'album-edit-input';
      input.onblur = save;
      input.onkeydown = function(e) {
        if (e.key === 'Enter') input.blur();
      };
      div.replaceWith(input);
      input.focus();
      function save() {
        albums[idx] = input.value.trim() || album;
        renderAlbums();
        saveMoodBoard();
      }
    };
    albumGrid.appendChild(div);
  });
  saveMoodBoard();
}
document.getElementById('shuffle-albums').onclick = function() {
  albums = albums.sort(() => Math.random() - 0.5);
  renderAlbums();
  saveMoodBoard();
};
document.getElementById('add-album-form').onsubmit = function(e) {
  e.preventDefault();
  const alt = document.getElementById('album-alt').value;
  albums.push(alt);
  renderAlbums();
  this.reset();
  saveMoodBoard();
};

// Colors
const colorSwatches = document.getElementById('color-swatches');
let colors = ['#006a4e', '#7b112c', '#3d1e6d', '#191970', '#232b2b'];
function renderColors() {
  colorSwatches.innerHTML = '';
  colors.forEach(color => {
    const div = document.createElement('div');
    div.className = 'swatch';
    div.style.background = color;
    colorSwatches.appendChild(div);
  });
  saveMoodBoard();
}
document.getElementById('shuffle-colors').onclick = function() {
  colors = colors.sort(() => Math.random() - 0.5);
  renderColors();
  saveMoodBoard();
};
document.getElementById('add-color-form').onsubmit = function(e) {
  e.preventDefault();
  const color = document.getElementById('color-picker').value;
  colors.push(color);
  renderColors();
  this.reset();
  saveMoodBoard();
};

// Quotes
const quotesList = document.getElementById('quotes-list');
let quotes = [
  '"Music can change the world because it can change people." – Bono',
  '"Where words fail, music speaks." – Hans Christian Andersen',
  '"One good thing about music, when it hits you, you feel no pain." – Bob Marley'
];
function renderQuotes() {
  quotesList.innerHTML = '';
  quotes.forEach(q => {
    const li = document.createElement('li');
    li.textContent = q;
    quotesList.appendChild(li);
  });
  saveMoodBoard();
}
document.getElementById('shuffle-quotes').onclick = function() {
  quotes = quotes.sort(() => Math.random() - 0.5);
  renderQuotes();
  saveMoodBoard();
};
document.getElementById('add-quote-form').onsubmit = function(e) {
  e.preventDefault();
  const quote = document.getElementById('quote-text').value;
  quotes.push(quote);
  renderQuotes();
  this.reset();
  saveMoodBoard();
};
  