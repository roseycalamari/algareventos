// Predefined recipes with their ingredients
const recipeIngredients = {
    "Arroz Doce": [
        { name: "Arroz", quantity: 0.3 },
        { name: "Leite", quantity: 1 },
        { name: "Açúcar", quantity: 0.2 },
        { name: "Canela em Pó", quantity: 0.01 },
        { name: "Casca de Limão", quantity: 0.02 }
    ],
    "Bacalhau à Brás": [
        { name: "Bacalhau Desfiado", quantity: 0.5 },
        { name: "Batata Palha", quantity: 0.3 },
        { name: "Ovos", quantity: 0.2 },
        { name: "Cebola", quantity: 0.1 },
        { name: "Salsa Picada", quantity: 0.02 },
        { name: "Azeite", quantity: 0.05 }
    ],
    "Caldo Verde": [
        { name: "Batata", quantity: 0.3 },
        { name: "Couve", quantity: 0.2 },
        { name: "Chouriço", quantity: 0.1 },
        { name: "Cebola", quantity: 0.1 },
        { name: "Alho", quantity: 0.02 },
        { name: "Azeite", quantity: 0.05 }
    ],
    "Pastel de Nata": [
        { name: "Massa Folhada", quantity: 0.3 },
        { name: "Leite", quantity: 0.2 },
        { name: "Ovos", quantity: 0.1 },
        { name: "Açúcar", quantity: 0.15 },
        { name: "Canela", quantity: 0.01 }
    ],
    "Sardinha Assada": [
        { name: "Sardinhas", quantity: 0.6 },
        { name: "Azeite", quantity: 0.05 },
        { name: "Pão", quantity: 0.2 },
        { name: "Salsa", quantity: 0.02 }
    ],
    "Francesinha": [
        { name: "Pão", quantity: 0.2 },
        { name: "Linguiça", quantity: 0.1 },
        { name: "Fiambre", quantity: 0.1 },
        { name: "Queijo", quantity: 0.1 },
        { name: "Molho de Tomate", quantity: 0.1 },
        { name: "Cerveja", quantity: 0.05 }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // DOM Element Selections
    const productNameInput = document.getElementById('product-name');
    const rawMaterialsBody = document.getElementById('raw-materials-body');
    const addRowBtn = document.getElementById('add-row-btn');
    const saveBtn = document.getElementById('save-btn');
    const exportBtn = document.getElementById('export-btn');
    const clearBtn = document.getElementById('clear-btn');
    const form = document.getElementById('production-sheet-form');

    // Utility Functions
    function generateLotNumber() {
        const year = new Date().getFullYear();
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `LOTE-${year}-${randomNum}`;
    }

    function generateValidityDate() {
        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + 6);
        return futureDate.toISOString().split('T')[0];
    }

    // Row Management
    function addTableRow(material = {}) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" name="raw-material" value="${material.name || ''}"></td>
            <td><input type="text" name="raw-material-lot" value="${generateLotNumber()}"></td>
            <td><input type="date" name="raw-material-validity" value="${generateValidityDate()}"></td>
            <td><input type="number" name="raw-material-quantity" step="0.01" value="${material.quantity || ''}"></td>
            <td><input type="text" name="responsible" value="Equipa de Produção"></td>
            <td><button type="button" class="remove-row">Remover</button></td>
        `;
        
        // Remove row functionality
        const removeBtn = newRow.querySelector('.remove-row');
        removeBtn.addEventListener('click', () => {
            if (rawMaterialsBody.children.length > 1) {
                rawMaterialsBody.removeChild(newRow);
            } else {
                alert('Deve haver pelo menos uma linha de matéria-prima.');
            }
        });
        
        rawMaterialsBody.appendChild(newRow);
        return newRow;
    }

    // Auto-fill Ingredients
    function autoFillIngredients() {
        const productName = productNameInput.value.trim();
        
        // Clear existing rows
        rawMaterialsBody.innerHTML = '';
        
        // Check if the product exists in our recipe database
        if (recipeIngredients[productName]) {
            // Add rows for each ingredient in the recipe
            recipeIngredients[productName].forEach(ingredient => {
                addTableRow(ingredient);
            });
        } else if (productName) {
            // If a name is entered but not in predefined recipes, add a single empty row
            addTableRow();
        }
    }

    // Event Listeners
    // Auto-fill when product name changes or is selected
    productNameInput.addEventListener('input', autoFillIngredients);
    productNameInput.addEventListener('change', autoFillIngredients);

    // Add row button
    addRowBtn.addEventListener('click', () => {
        addTableRow();
    });

    // Save functionality
    saveBtn.addEventListener('click', () => {
        // Collect main form data
        const productName = document.getElementById('product-name').value;
        const productionDate = document.getElementById('production-date').value;
        const quantityProduced = document.getElementById('quantity-produced').value;
        const lotNumber = document.getElementById('lot-number').value;

        // Validate main form fields
        if (!productName || !productionDate || !quantityProduced || !lotNumber) {
            alert('Por favor, preencha todos os campos principais.');
            return;
        }

        // Collect raw materials data
        const rawMaterials = [];
        const rows = rawMaterialsBody.querySelectorAll('tr');
        
        // Validate raw materials
        let isValidMaterials = true;
        rows.forEach(row => {
            const materialName = row.querySelector('input[name="raw-material"]').value.trim();
            const materialQuantity = row.querySelector('input[name="raw-material-quantity"]').value;
            
            if (!materialName || !materialQuantity) {
                isValidMaterials = false;
            }
            
            const rawMaterial = {
                name: materialName,
                lot: row.querySelector('input[name="raw-material-lot"]').value,
                validity: row.querySelector('input[name="raw-material-validity"]').value,
                quantity: materialQuantity,
                responsible: row.querySelector('input[name="responsible"]').value
            };
            rawMaterials.push(rawMaterial);
        });

        // Check raw materials validation
        if (!isValidMaterials) {
            alert('Por favor, preencha todos os campos de matérias-primas.');
            return;
        }

        // Create production sheet object
        const productionSheet = {
            productName,
            productionDate,
            quantityProduced,
            lotNumber,
            rawMaterials,
            timestamp: new Date().toISOString()
        };

        // Save to local storage
        const savedSheets = JSON.parse(localStorage.getItem('productionSheets') || '[]');
        savedSheets.push(productionSheet);
        localStorage.setItem('productionSheets', JSON.stringify(savedSheets));
        
        alert('Ficha de Produção guardada com sucesso!');
    });

    // Export functionality
    exportBtn.addEventListener('click', () => {
        const savedSheets = localStorage.getItem('productionSheets');
        
        if (savedSheets && JSON.parse(savedSheets).length > 0) {
            const blob = new Blob([savedSheets], {type: 'application/json'});
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Fichas_Producao_${new Date().toISOString().split('T')[0]}.json`;
            link.click();
        } else {
            alert('Não existem fichas guardadas para exportar.');
        }
    });

    // Clear form functionality
    clearBtn.addEventListener('click', () => {
        // Reset the form
        form.reset();
        
        // Clear raw materials rows except the first one
        while (rawMaterialsBody.children.length > 1) {
            rawMaterialsBody.removeChild(rawMaterialsBody.lastChild);
        }
        
        // Reset the first row's inputs
        const firstRow = rawMaterialsBody.querySelector('tr');
        firstRow.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
    });

    // Load last saved production sheet on page load
    const savedSheets = JSON.parse(localStorage.getItem('productionSheets') || '[]');
    if (savedSheets.length > 0) {
        const lastSheet = savedSheets[savedSheets.length - 1];
        
        // Populate main form fields
        document.getElementById('product-name').value = lastSheet.productName || '';
        document.getElementById('production-date').value = lastSheet.productionDate || '';
        document.getElementById('quantity-produced').value = lastSheet.quantityProduced || '';
        document.getElementById('lot-number').value = lastSheet.lotNumber || '';

        // Clear existing rows
        rawMaterialsBody.innerHTML = ''; 

        // Populate raw materials
        lastSheet.rawMaterials.forEach(material => {
            const newRow = addTableRow({
                name: material.name || '',
                quantity: material.quantity || ''
            });
            
            // Populate additional fields
            newRow.querySelector('input[name="raw-material-lot"]').value = material.lot || generateLotNumber();
            newRow.querySelector('input[name="raw-material-validity"]').value = material.validity || generateValidityDate();
            newRow.querySelector('input[name="responsible"]').value = material.responsible || 'Equipa de Produção';
        });
    }
});