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
function renderAlbums() {
  albumGrid.innerHTML = '';
  albums.forEach(album => {
    const div = document.createElement('div');
    div.className = 'album-name';
    div.textContent = album;
    albumGrid.appendChild(div);
  });
}
document.getElementById('shuffle-albums').onclick = function() {
  albums = albums.sort(() => Math.random() - 0.5);
  renderAlbums();
};
document.getElementById('add-album-form').onsubmit = function(e) {
  e.preventDefault();
  const alt = document.getElementById('album-alt').value;
  albums.push(alt);
  renderAlbums();
  this.reset();
};
renderAlbums();

// Colors
const colorSwatches = document.getElementById('color-swatches');
let colors = ['#b3e5fc', '#ffe0b2', '#c8e6c9', '#f8bbd0', '#d1c4e9'];
function renderColors() {
  colorSwatches.innerHTML = '';
  colors.forEach(color => {
    const div = document.createElement('div');
    div.className = 'swatch';
    div.style.background = color;
    colorSwatches.appendChild(div);
  });
}
document.getElementById('shuffle-colors').onclick = function() {
  colors = colors.sort(() => Math.random() - 0.5);
  renderColors();
};
document.getElementById('add-color-form').onsubmit = function(e) {
  e.preventDefault();
  const color = document.getElementById('color-picker').value;
  colors.push(color);
  renderColors();
  this.reset();
};
renderColors();

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
}
document.getElementById('shuffle-quotes').onclick = function() {
  quotes = quotes.sort(() => Math.random() - 0.5);
  renderQuotes();
};
document.getElementById('add-quote-form').onsubmit = function(e) {
  e.preventDefault();
  const quote = document.getElementById('quote-text').value;
  quotes.push(quote);
  renderQuotes();
  this.reset();
};
renderQuotes();
  