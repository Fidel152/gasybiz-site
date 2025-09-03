// Éléments du DOM
const categorySelect = document.getElementById('category');
const subCategoryContainer = document.getElementById('subCategoryContainer');
const subCategorySelect = document.getElementById('subCategory');
const otherProductContainer = document.getElementById('otherProductContainer');
const otherProductInput = document.getElementById('otherProduct');
const finalProductType = document.getElementById('finalProductType');

const form = document.getElementById('producerForm');
const successMessage = document.getElementById('successMessage');
const resultsDiv = document.getElementById('results');
const resultsContent = document.getElementById('resultsContent');

// Gestion du changement de catégorie
categorySelect.addEventListener('change', function () {
    const category = this.value;

    // Réinitialise
    subCategoryContainer.style.display = 'none';
    otherProductContainer.style.display = 'none';
    finalProductType.value = '';

    if (category === 'agriculture') {
        subCategoryContainer.style.display = 'block';
        finalProductType.value = subCategorySelect.value;
    } else if (category === 'autre') {
        otherProductContainer.style.display = 'block';
    } else {
        finalProductType.value = category;
    }
});

// Gestion du sous-menu agriculture
subCategorySelect.addEventListener('change', function () {
    finalProductType.value = this.value;
});

// Gestion du champ "Autre"
otherProductInput.addEventListener('input', function () {
    finalProductType.value = this.value;
});

// Soumission du formulaire
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Récupérer les valeurs
    const producerName = document.getElementById('producerName').value;
    const companyName = document.getElementById('companyName').value;
    const location = "Antsiranana";
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const productType = finalProductType.value;

    // Afficher les résultats
    resultsContent.innerHTML = `
        <div class="result-item">
            <span class="result-label">Nom du producteur:</span>
            <span class="result-value">${producerName}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Nom de l'entreprise:</span>
            <span class="result-value">${companyName}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Ville:</span>
            <span class="result-value">${location}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Quartier:</span>
            <span class="result-value">${address}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Type de produit:</span>
            <span class="result-value">${productType}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Email:</span>
            <span class="result-value">${email}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Téléphone:</span>
            <span class="result-value">${phone}</span>
        </div>
    `;

    // Afficher le message de succès
    successMessage.style.display = 'block';
    resultsDiv.style.display = 'block';

    // Réinitialiser après 2 secondes
    setTimeout(() => {
        form.reset();
        subCategoryContainer.style.display = 'none';
        otherProductContainer.style.display = 'none';
        successMessage.style.display = 'none';
    }, 2000);

    // Envoyer à Formspree
    const formData = new FormData(form);
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });
});
