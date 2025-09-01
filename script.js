// Gestion du champ "Autre produit"
const productTypeSelect = document.getElementById('productType');
const otherProductContainer = document.getElementById('otherProductContainer');
const otherProductInput = document.getElementById('otherProduct');
const finalProductType = document.getElementById('finalProductType');

const form = document.getElementById('producerForm');
const successMessage = document.getElementById('successMessage');
const resultsDiv = document.getElementById('results');
const resultsContent = document.getElementById('resultsContent');

// Gestion du select "Autre"
productTypeSelect.addEventListener('change', function() {
    if (this.value === 'autre') {
        otherProductContainer.classList.add('show');
    } else {
        otherProductContainer.classList.remove('show');
        finalProductType.value = this.value;
    }
});

otherProductInput.addEventListener('input', function() {
    finalProductType.value = this.value;
});

productTypeSelect.addEventListener('change', function() {
    if (this.value !== 'autre') {
        finalProductType.value = this.value;
    }
});

// Soumission du formulaire
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche le rechargement

    // Récupérer les valeurs
    const producerName = document.getElementById('producerName').value;
    const companyName = document.getElementById('companyName').value;
    const location = "Antsiranana";
    const address = document.getElementById('address').value;
    const productType = document.getElementById('productType').value;
    const otherProduct = document.getElementById('otherProduct').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Déterminer le type final
    let finalProductTypeValue = productType;
    if (productType === 'autre' && otherProduct) {
        finalProductTypeValue = otherProduct;
    } else if (productType === 'autre') {
        finalProductTypeValue = 'Non précisé';
    }

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
            <span class="result-value">${finalProductTypeValue}</span>
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

    // Afficher la section résultats
    resultsDiv.style.display = 'block';

    // Réinitialiser le formulaire après 2 secondes
    setTimeout(() => {
        form.reset();
        otherProductContainer.classList.remove('show');
        successMessage.style.display = 'none';
    }, 2000);

    // Envoyer les données à Formspree
    const formData = new FormData(form);
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            console.log("Données envoyées à Formspree");
        } else {
            console.error("Erreur Formspree");
        }
    }).catch(error => {
        console.error("Erreur réseau", error);
    });
});