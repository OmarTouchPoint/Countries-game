const countrysAndCapitals = [
    { country: 'España', capital: 'Madrid' },
    { country: 'Francia', capital: 'París' },
    { country: 'Japón', capital: 'Tokio' },
    { country: 'Alemania', capital: 'Berlín' }
];

let selectedCountry = null;
let selectedCapital = null;
let correctPairs = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.country-button').forEach(button => {
        button.addEventListener('click', event => {
            handleClick(event.target, 'country');
        });
    });

    document.querySelectorAll('.capital-button').forEach(button => {
        button.addEventListener('click', event => {
            handleClick(event.target, 'capital');
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

    if (selectedCountry && selectedCapital) {
        resetSelections();
    }

    if (type === 'country') {
        selectedCountry = element;
    } else if (type === 'capital') {
        selectedCapital = element;
    }

    element.classList.add('selected');

    if (selectedCountry && selectedCapital) {
        checkMatch();
    }
}

function resetSelections() {
    document.querySelectorAll('.selected').forEach(el => {
        el.classList.remove('selected');
    });
}

function checkMatch() {
    const country = selectedCountry.id;
    const capital = selectedCapital.id;
    const countryObj = countrysAndCapitals.find(item => item.country === country);

    if (countryObj.capital === capital) {
        selectedCountry.classList.remove('selected');
        selectedCapital.classList.remove('selected');
        selectedCountry.classList.add('correct');
        selectedCapital.classList.add('correct');
        selectedCountry.style.pointerEvents = 'none';
        selectedCapital.style.pointerEvents = 'none';
        correctPairs++;

        if (correctPairs === countrysAndCapitals.length) {
            showModal();
        }
    } else {
        selectedCountry.classList.add('incorrect');
        selectedCapital.classList.add('incorrect');
        setTimeout(() => {
            selectedCountry.classList.remove('incorrect');
            selectedCapital.classList.remove('incorrect');
            resetSelections();
        }, 1000);
    }

    selectedCountry = null;
    selectedCapital = null;
}

function showModal() {
    const modal = document.getElementById('congratulationsModal');
    modal.style.display = 'block';
}
