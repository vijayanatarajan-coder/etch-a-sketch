const container = document.getElementById('container');
const newGridBtn = document.getElementById('newGridBtn');

function createGrid(size) {
    // Clear existing grid
    container.innerHTML = '';

    // Calculate new square size
    const squareSize = 960 / size;

    // Create new grid squares
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.dataset.interactions = '0';

        // Add mouseover event listener to change color
        square.addEventListener('mouseover', changeColor);
        /*square.addEventListener('mouseout', () => {
            square.style.backgroundColor = '';
        });*/

        container.appendChild(square);
    }
}

function changeColor(e) {
    const square = e.target;
    let interactions = parseInt(square.dataset.interactions);

    if (interactions === 0) {
        // Generate random RGB values for the first interaction
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else {
        // Darken the existing color
        const currentColor = window.getComputedStyle(square).backgroundColor;
        const rgb = currentColor.match(/\d+/g).map(Number);
        const darkenedColor = rgb.map(value => Math.max(0, value - 25.5)).join(', ');
        square.style.backgroundColor = `rgb(${darkenedColor})`;
    }

    // Increment interaction count
    interactions++;
    square.dataset.interactions = interactions;

    // If 10 interactions, set to black
    if (interactions >= 10) {
        square.style.backgroundColor = 'rgb(0, 0, 0)';
    }
}

function promptForNewGrid() {
    let size = prompt('Enter the number of squares per side for the new grid (max 100):');
    size = parseInt(size);

    if (isNaN(size) || size < 1) {
        alert('Please enter a valid number.');
        return;
    }

    if (size > 100) {
        alert('Maximum size is 100. Setting size to 100.');
        size = 100;
    }

    createGrid(size);
}

// Initial grid creation
createGrid(16);

// Event listener for the new grid button
newGridBtn.addEventListener('click', promptForNewGrid);