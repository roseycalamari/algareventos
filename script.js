// Predefined recipes with their ingredients
const recipeIngredients = {
    "Arroz Doce": [
        { name: "Arroz", quantity: 0.3, unit: "quilos" },
        { name: "Leite", quantity: 1, unit: "litros" },
        { name: "Açúcar", quantity: 0.2, unit: "quilos" },
        { name: "Canela em Pó", quantity: 0.01, unit: "quilos" },
        { name: "Casca de Limão", quantity: 0.02, unit: "quilos" }
    ],
    "Bacalhau à Brás": [
        { name: "Bacalhau Desfiado", quantity: 0.5, unit: "quilos" },
        { name: "Batata Palha", quantity: 0.3, unit: "quilos" },
        { name: "Ovos", quantity: 6, unit: "unidades" },
        { name: "Cebola", quantity: 0.1, unit: "quilos" },
        { name: "Salsa Picada", quantity: 0.02, unit: "quilos" },
        { name: "Azeite", quantity: 0.05, unit: "litros" }
    ],
    "Caldo Verde": [
        { name: "Batata", quantity: 0.3, unit: "quilos" },
        { name: "Couve", quantity: 0.2, unit: "quilos" },
        { name: "Chouriço", quantity: 0.1, unit: "quilos" },
        { name: "Cebola", quantity: 0.1, unit: "quilos" },
        { name: "Alho", quantity: 0.02, unit: "quilos" },
        { name: "Azeite", quantity: 0.05, unit: "litros" }
    ],
    "Pastel de Nata": [
        { name: "Massa Folhada", quantity: 0.3, unit: "quilos" },
        { name: "Leite", quantity: 0.2, unit: "litros" },
        { name: "Ovos", quantity: 3, unit: "unidades" },
        { name: "Açúcar", quantity: 0.15, unit: "quilos" },
        { name: "Canela", quantity: 0.01, unit: "quilos" }
    ],
    "Sardinha Assada": [
        { name: "Sardinhas", quantity: 12, unit: "unidades" },
        { name: "Azeite", quantity: 0.05, unit: "litros" },
        { name: "Pão", quantity: 0.2, unit: "quilos" },
        { name: "Salsa", quantity: 0.02, unit: "quilos" }
    ],
    "Francesinha": [
        { name: "Pão", quantity: 0.2, unit: "quilos" },
        { name: "Linguiça", quantity: 0.1, unit: "quilos" },
        { name: "Fiambre", quantity: 0.1, unit: "quilos" },
        { name: "Queijo", quantity: 0.1, unit: "quilos" },
        { name: "Molho de Tomate", quantity: 0.1, unit: "litros" },
        { name: "Cerveja", quantity: 0.05, unit: "litros" }
    ]
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Setup toggle for the initial row
    const initialCheckbox = document.getElementById('validity-toggle-initial');
    const initialDateInput = initialCheckbox.closest('.validity-input-container').querySelector('input[name="raw-material-validity"]');
    
    initialCheckbox.addEventListener('change', () => {
        if (initialCheckbox.checked) {
            initialDateInput.style.display = 'none';
        } else {
            initialDateInput.style.display = 'block';
        }
    });
    
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
        const uniqueId = `validity-toggle-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        newRow.innerHTML = `
            <td><input type="text" name="raw-material" value="${material.name || ''}"></td>
            <td><input type="text" name="raw-material-lot" value="${generateLotNumber()}"></td>
            <td>
                <div class="validity-input-container">
                    <div class="validity-toggle">
                        <input type="checkbox" id="${uniqueId}" class="validity-checkbox" ${material.hasValidity === false ? 'checked' : ''}>
                        <label for="${uniqueId}" class="validity-label">Sem data de validade</label>
                    </div>
                    <input type="date" name="raw-material-validity" value="${generateValidityDate()}" ${material.hasValidity === false ? 'style="display:none;"' : ''}>
                </div>
            </td>
            <td>
                <div class="quantity-input-container">
                    <input type="number" name="raw-material-quantity" step="0.01" value="${material.quantity || ''}">
                    <select name="raw-material-unit">
                        <option value="quilos" ${material.unit === 'quilos' ? 'selected' : ''}>quilos</option>
                        <option value="litros" ${material.unit === 'litros' ? 'selected' : ''}>litros</option>
                        <option value="unidades" ${material.unit === 'unidades' ? 'selected' : ''}>unidades</option>
                    </select>
                </div>
            </td>
            <td><input type="text" name="responsible" value="Equipa de Produção"></td>
            <td><button type="button" class="remove-row">Remover</button></td>
        `;
        
        // Remove row functionality - always allow removal
        const removeBtn = newRow.querySelector('.remove-row');
        removeBtn.addEventListener('click', () => {
            rawMaterialsBody.removeChild(newRow);
            
            // If there are no rows left, add an empty one
            if (rawMaterialsBody.children.length === 0) {
                addTableRow();
            }
        });
        
        // Validity toggle functionality
        const validityCheckbox = newRow.querySelector('.validity-checkbox');
        const validityDateInput = newRow.querySelector('input[name="raw-material-validity"]');
        
        validityCheckbox.addEventListener('change', () => {
            if (validityCheckbox.checked) {
                validityDateInput.style.display = 'none';
            } else {
                validityDateInput.style.display = 'block';
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

    // PDF Export Function
    function exportToPDF() {
        try {
            // Try to get jsPDF from the global scope
            if (typeof jspdf !== 'undefined') {
                var jsPDF = jspdf.jsPDF;
            } else if (typeof window.jspdf !== 'undefined') {
                var jsPDF = window.jspdf.jsPDF;
            } else if (typeof window.jsPDF !== 'undefined') {
                var jsPDF = window.jsPDF;
            } else {
                console.error('jsPDF library not found');
                alert('A biblioteca PDF não está disponível. Verifique se o script está carregado corretamente.');
                return;
            }
            
            // Get form data
            const productName = document.getElementById('product-name').value;
            const productionDate = document.getElementById('production-date').value;
            const quantityProduced = document.getElementById('quantity-produced').value;
            const quantityUnit = document.getElementById('quantity-produced-unit').value;
            const lotNumber = document.getElementById('lot-number').value;
            
            // Validate main form fields
            if (!productName || !productionDate || !quantityProduced || !lotNumber) {
                alert('Por favor, preencha todos os campos principais antes de exportar.');
                return;
            }
            
            // Create PDF document (A4 size)
            const doc = new jsPDF('p', 'mm', 'a4');
            
            // Add header
            doc.setFontSize(18);
            doc.setTextColor(77, 166, 255);
            doc.text('Ficha de Produção - Refeições', 105, 20, { align: 'center' });
            doc.setFontSize(14);
            doc.text('Algareventos', 105, 30, { align: 'center' });
            
            // Add main info
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            
            const startY = 45;
            doc.text(`Designação do produto: ${productName}`, 20, startY);
            doc.text(`Data de fabrico: ${productionDate}`, 20, startY + 10);
            doc.text(`Quantidade produzida: ${quantityProduced} ${quantityUnit}`, 20, startY + 20);
            doc.text(`Lote: ${lotNumber}`, 20, startY + 30);
            
            // Collect raw materials data
            const rawMaterials = [];
            const rows = document.querySelectorAll('#raw-materials-body tr');
            
            rows.forEach(row => {
                const validityCheckbox = row.querySelector('.validity-checkbox');
                const hasValidity = validityCheckbox ? !validityCheckbox.checked : true;
                
                const material = {
                    name: row.querySelector('input[name="raw-material"]').value,
                    unit: row.querySelector('select[name="raw-material-unit"]').value,
                    lot: row.querySelector('input[name="raw-material-lot"]').value,
                    validity: hasValidity ? row.querySelector('input[name="raw-material-validity"]').value : null,
                    hasValidity: hasValidity,
                    quantity: row.querySelector('input[name="raw-material-quantity"]').value,
                    responsible: row.querySelector('input[name="responsible"]').value
                };
                
                if (material.name) {
                    rawMaterials.push(material);
                }
            });
            
            // Create table for raw materials
            const tableColumn = ['Matéria Prima', 'Lote', 'Validade', 'Quantidade', 'Responsável'];
            const tableRows = [];
            
            rawMaterials.forEach(material => {
                const dateFormatted = material.hasValidity ? new Date(material.validity).toLocaleDateString('pt-PT') : 'Sem data de validade';
                const matRow = [
                    material.name, 
                    material.lot, 
                    dateFormatted, 
                    `${material.quantity} ${material.unit}`, 
                    material.responsible
                ];
                tableRows.push(matRow);
            });
            
            // Add table to PDF - start right after the main info
            doc.autoTable({
                startY: startY + 45,
                head: [tableColumn],
                body: tableRows,
                theme: 'grid',
                headStyles: {
                    fillColor: [77, 166, 255],
                    textColor: [255, 255, 255],
                    fontSize: 10
                },
                styles: {
                    fontSize: 9,
                    cellPadding: 3
                }
            });
            
            // Add footer
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.text('Algareventos - Ficha de Produção', 105, 287, { align: 'center' });
                doc.text(`Página ${i} de ${pageCount}`, 20, 287, { align: 'left' });
                doc.text('HISA - MOD. AUT. HACCP - 34/1', 195, 287, { align: 'right' });
            }
            
            // Save the PDF
            const today = new Date().toLocaleDateString('pt-PT').replace(/\//g, '-');
            doc.save(`Ficha_Producao_${productName}_${today}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Ocorreu um erro ao gerar o PDF: ' + error.message);
        }
    }

    // Event Listeners
    // Auto-fill when product name changes or is selected
    productNameInput.addEventListener('input', autoFillIngredients);
    productNameInput.addEventListener('change', autoFillIngredients);

    // Add row button - add as many rows as needed
    addRowBtn.addEventListener('click', () => {
        addTableRow();
    });

    // Save functionality
    saveBtn.addEventListener('click', () => {
        // Collect main form data
        const productName = document.getElementById('product-name').value;
        const productionDate = document.getElementById('production-date').value;
        const quantityProduced = document.getElementById('quantity-produced').value;
        const quantityUnit = document.getElementById('quantity-produced-unit').value;
        const lotNumber = document.getElementById('lot-number').value;

        // Validate main form fields
        if (!productName || !productionDate || !quantityProduced || !lotNumber) {
            alert('Por favor, preencha todos os campos principais.');
            return;
        }

        // Collect raw materials data
        const rawMaterials = [];
        const rows = rawMaterialsBody.querySelectorAll('tr');
        
        // Skip validation if no rows
        if (rows.length === 0) {
            alert('Por favor, adicione pelo menos uma matéria-prima.');
            return;
        }
        
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
                unit: row.querySelector('select[name="raw-material-unit"]').value,
                lot: row.querySelector('input[name="raw-material-lot"]').value,
                hasValidity: !row.querySelector('.validity-checkbox').checked,
                validity: !row.querySelector('.validity-checkbox').checked ? row.querySelector('input[name="raw-material-validity"]').value : null,
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
            quantityUnit,
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

    // Export button event listener - Now exports to PDF instead of JSON
    exportBtn.addEventListener('click', exportToPDF);

    // Clear form functionality
    clearBtn.addEventListener('click', () => {
        // Reset the form
        form.reset();
        
        // Clear all rows
        rawMaterialsBody.innerHTML = '';
        
        // Add a single empty row
        addTableRow();
    });

    // Load last saved production sheet on page load
    const savedSheets = JSON.parse(localStorage.getItem('productionSheets') || '[]');
    if (savedSheets.length > 0) {
        const lastSheet = savedSheets[savedSheets.length - 1];
        
        // Populate main form fields
        document.getElementById('product-name').value = lastSheet.productName || '';
        document.getElementById('production-date').value = lastSheet.productionDate || '';
        document.getElementById('quantity-produced').value = lastSheet.quantityProduced || '';
        
        // Set quantity unit if available
        if (lastSheet.quantityUnit) {
            document.getElementById('quantity-produced-unit').value = lastSheet.quantityUnit;
        }
        
        document.getElementById('lot-number').value = lastSheet.lotNumber || '';

        // Clear existing rows
        rawMaterialsBody.innerHTML = ''; 

        // Populate raw materials
        if (lastSheet.rawMaterials && lastSheet.rawMaterials.length > 0) {
            lastSheet.rawMaterials.forEach(material => {
                const newRow = addTableRow({
                    name: material.name || '',
                    unit: material.unit || 'quilos',
                    quantity: material.quantity || '',
                    hasValidity: material.hasValidity
                });
                
                // Populate additional fields
                newRow.querySelector('input[name="raw-material-lot"]').value = material.lot || generateLotNumber();
                if (material.validity) {
                    newRow.querySelector('input[name="raw-material-validity"]').value = material.validity;
                }
                newRow.querySelector('input[name="responsible"]').value = material.responsible || 'Equipa de Produção';
            });
        } else {
            // Add an empty row if no materials
            addTableRow();
        }
    } else {
        // Add an empty row if no saved sheets
        addTableRow();
    }
});