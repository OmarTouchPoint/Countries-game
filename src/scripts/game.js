const concepts = [
    { concept1: 'España', concept2: 'Madrid' },
    { concept1: 'Francia', concept2: 'París' },
    { concept1: 'Japón', concept2: 'Tokio' },
    { concept1: 'Alemania', concept2: 'Berlín' }
];

let selectedConcept1 = null;
let selectedConcept2 = null;
let correctPairs = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.concept1-button').forEach(button => {
        button.addEventListener('click', event => {
            handleClick(event.target, 'concept1');
        });
    });

    document.querySelectorAll('.concept2-button').forEach(button => {
        button.addEventListener('click', event => {
            handleClick(event.target, 'concept2');
        });
    });

    const modal = document.getElementById('congratulationsModal');
    const span = document.getElementById('closeModal');

    span.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});

function handleClick(element, type) {
    if (element.classList.contains('incorrect')) {
        element.classList.remove('incorrect');
    }

    if (selectedConcept1 && selectedConcept2) {
        resetSelections();
    }

    if (type === 'concept1') {
        selectedConcept1 = element;
    } else if (type === 'concept2') {
        selectedConcept2 = element;
    }

    element.classList.add('selected');

    if (selectedConcept1 && selectedConcept2) {
        checkMatch();
    }
}

function resetSelections() {
    document.querySelectorAll('.selected').forEach(el => {
        el.classList.remove('selected');
    });
}

function checkMatch() {
    const concept1 = selectedConcept1.id;
    const concept2 = selectedConcept2.id;
    const countryObj = concepts.find(item => item.concept1 === concept1);

    if (countryObj.concept2 === concept2) {
        selectedConcept1.classList.remove('selected');
        selectedConcept2.classList.remove('selected');
        selectedConcept1.classList.add('correct');
        selectedConcept2.classList.add('correct');
        selectedConcept1.style.pointerEvents = 'none';
        selectedConcept2.style.pointerEvents = 'none';
        correctPairs++;

        if (correctPairs === concepts.length) {
            showModal();
        }
    } else {
        selectedConcept1.classList.add('incorrect');
        selectedConcept2.classList.add('incorrect');
        setTimeout(() => {
            selectedConcept1.classList.remove('incorrect');
            selectedConcept2.classList.remove('incorrect');
            resetSelections();
        }, 1000);
    }

    selectedConcept1 = null;
    selectedConcept2 = null;
}

function showModal() {
    const modal = document.getElementById('congratulationsModal');
    modal.style.display = 'block';
}
