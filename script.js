// Constants
const LOCAL_STORAGE_PRODUCTION_SHEETS_KEY = 'productionSheets';
const LOCAL_STORAGE_RECIPES_KEY = 'savedRecipes';

// Predefined recipes with their ingredients
const recipeIngredients = {
  "Almôndegas c/ molho de tomate": [
    { name: "Almôndegas", quantity: 0.5, unit: "quilos" },
    { name: "Cebolas", quantity: 0.1, unit: "quilos" },
    { name: "Tomates", quantity: 0.2, unit: "quilos" },
    { name: "Alho francês", quantity: 0.05, unit: "quilos" },
    { name: "Polpa de tomate", quantity: 0.1, unit: "quilos" },
    { name: "Sal", quantity: 0.01, unit: "quilos" },
    { name: "Azeite", quantity: 0.05, unit: "litros" }
  ],
  "Arroz Branco": [
    { name: "Arroz", quantity: 0.3, unit: "quilos" },
    { name: "Cebola", quantity: 0.1, unit: "quilos" },
    { name: "Alhos", quantity: 0.02, unit: "quilos" },
    { name: "Louro", quantity: 0.01, unit: "quilos" },
    { name: "Sal", quantity: 0.01, unit: "quilos" },
    { name: "Azeite", quantity: 0.05, unit: "litros" }
  ],
  "Arroz de cenoura": [
    { name: "Arroz", quantity: 0.3, unit: "quilos" },
    { name: "Cebolas", quantity: 0.1, unit: "quilos" },
    { name: "Alhos", quantity: 0.02, unit: "quilos" },
    { name: "Cenoura", quantity: 0.2, unit: "quilos" },
    { name: "Louro", quantity: 0.01, unit: "quilos" },
    { name: "Sal", quantity: 0.01, unit: "quilos" },
    { name: "Azeite", quantity: 0.05, unit: "litros" }
  ],
  "Arroz Doce": [
    { name: "Arroz carolino", quantity: 0.3, unit: "quilos" },
    { name: "Leite", quantity: 1, unit: "litros" },
    { name: "Açúcar", quantity: 0.2, unit: "quilos" },
    { name: "Ovos gemas", quantity: 0.1, unit: "quilos" },
    { name: "Manteiga", quantity: 0.05, unit: "quilos" },
    { name: "Limão raspa", quantity: 0.02, unit: "quilos" },
    { name: "Água rede", quantity: 0.1, unit: "litros" }
  ],
  "Batata á padeiro": [
    { name: "Batata", quantity: 0.5, unit: "quilos" },
    { name: "Cebolas", quantity: 0.1, unit: "quilos" },
    { name: "Sal", quantity: 0.01, unit: "quilos" },
    { name: "Pimenta", quantity: 0.005, unit: "quilos" },
    { name: "Óleo", quantity: 0.05, unit: "litros" },
    { name: "Óleo alto rendimento", quantity: 0.05, unit: "litros" }
  ],
  "Carne de porco á alentejana": [
    { name: "Porco fresco", quantity: 0.5, unit: "quilos" },
    { name: "Alhos", quantity: 0.02, unit: "quilos" },
    { name: "Colorau", quantity: 0.01, unit: "quilos" },
    { name: "Louro", quantity: 0.01, unit: "quilos" },
    { name: "Sal", quantity: 0.01, unit: "quilos" },
    { name: "Óleo", quantity: 0.05, unit: "litros" },
    { name: "Vinho branco", quantity: 0.1, unit: "litros" },
    { name: "Demi glace", quantity: 0.05, unit: "litros" },
    { name: "Salsa", quantity: 0.02, unit: "quilos" },
    { name: "Ameijoa", quantity: 0.2, unit: "quilos" }
  ],
  "Esparguete": [
    { name: "Esparguete", quantity: 0.3, unit: "quilos" },
    { name: "Óleo", quantity: 0.05, unit: "litros" },
    { name: "Sal", quantity: 0.01, unit: "quilos" }
  ],
  "Filete de pescada com molho de marisco": [
    { name: "Filete de pescada", quantity: 0.5, unit: "quilos" },
    { name: "Cebolas", quantity: 0.1, unit: "quilos" },
    { name: "Tomate", quantity: 0.2, unit: "quilos" },
    { name: "Cenoura", quantity: 0.1, unit: "quilos" },
    { name: "Alho francês", quantity: 0.05, unit: "quilos" },
    { name: "Polpa de tomate", quantity: 0.1, unit: "quilos" },
    { name: "Creme de marisco", quantity: 0.1, unit: "litros" },
    { name: "Sal", quantity: 0.01, unit: "quilos" },
    { name: "Azeite", quantity: 0.05, unit: "litros" },
    { name: "Salsa", quantity: 0.02, unit: "quilos" }
  ],
  "Filetes de pescada fritos": [
    { name: "Filetes de pescada", quantity: 0.5, unit: "quilos" },
    { name: "Sal", quantity: 0.01, unit: "quilos" },
    { name: "Limão sumo", quantity: 0.05, unit: "litros" },
    { name: "Farinha", quantity: 0.1, unit: "quilos" },
    { name: "Ovos", quantity: 0.1, unit: "quilos" },
    { name: "Óleo", quantity: 0.1, unit: "litros" }
  ],
  "Filetes de tilápia": [
    { name: "Filetes de tilápia", quantity: 0.5, unit: "quilos" },
    { name: "Limão sumo", quantity: 0.05, unit: "litros" },
    { name: "Sal", quantity: 0.01, unit: "quilos" },
    { name: "Manteiga", quantity: 0.05, unit: "quilos" },
    { name: "Funcho", quantity: 0.02, unit: "quilos" },
    { name: "Óleo", quantity: 0.05, unit: "litros" }
  ],
  "Frango grelhado": [
    { name: "Frango grelhado", quantity: 0.5, unit: "quilos" },
    { name: "Sal", quantity: 0.01, unit: "quilos" },
    { name: "Alhos", quantity: 0.02, unit: "quilos" },
    { name: "Louro", quantity: 0.01, unit: "quilos" },
    { name: "Limão", quantity: 0.05, unit: "quilos" },
    { name: "Óleo", quantity: 0.05, unit: "litros" }
  ],
  "Lombo de porco assado no forno": [
    { name: "Lombo de porco", quantity: 0.5, unit: "quilos" },
    { name: "Cebolas", quantity: 0.1, unit: "quilos" },
    { name: "Alho francês", quantity: 0.05, unit: "quilos" },
    { name: "Cenoura", quantity: 0.1, unit: "quilos" },
    { name: "Aipo", quantity: 0.05, unit: "quilos" },
    { name: "Pau de canela", quantity: 0.01, unit: "quilos" },
    { name: "Colorau", quantity: 0.01, unit: "quilos" },
    { name: "Vinho branco", quantity: 0.1, unit: "litros" },
    { name: "Demi glace", quantity: 0.05, unit: "litros" }
  ],
  "Molotof": [
    { name: "Ovos claras", quantity: 0.2, unit: "quilos" },
    { name: "Açúcar", quantity: 0.2, unit: "quilos" },
    { name: "Limão gotas", quantity: 0.02, unit: "quilos" },
    { name: "Sal", quantity: 0.005, unit: "quilos" }
  ],
  "Mousse de chocolate": [
    { name: "Chocolate barra", quantity: 0.2, unit: "quilos" },
    { name: "Ovos", quantity: 0.1, unit: "quilos" },
    { name: "Manteiga", quantity: 0.05, unit: "quilos" },
    { name: "Açúcar", quantity: 0.1, unit: "quilos" }
  ],
  "Muffins de chocolate": [
    { name: "Farinha", quantity: 0.2, unit: "quilos" },
    { name: "Açúcar", quantity: 0.1, unit: "quilos" },
    { name: "Óleo", quantity: 0.05, unit: "litros" },
    { name: "Leite", quantity: 0.1, unit: "litros" },
    { name: "Ovos", quantity: 0.1, unit: "quilos" },
    { name: "Cacau pó", quantity: 0.02, unit: "quilos" },
    { name: "Fermento", quantity: 0.01, unit: "quilos" },
    { name: "Aroma de menta", quantity: 0.005, unit: "quilos" }
  ],
  "Muffins de iogurte": [
    { name: "Iogurtes", quantity: 0.2, unit: "quilos" },
    { name: "Açúcar", quantity: 0.1, unit: "quilos" },
    { name: "Farinha", quantity: 0.2, unit: "quilos" },
    { name: "Óleo", quantity: 0.05, unit: "litros" },
    { name: "Fermento", quantity: 0.01, unit: "quilos" },
    { name: "Ovos", quantity: 0.1, unit: "quilos" }
  ],
  "Peixe espada grelhado": [
    { name: "Peixe espada", quantity: 0.5, unit: "quilos" },
    { name: "Sal", quantity: 0.01, unit: "quilos" },
    { name: "Limão sumo", quantity: 0.05, unit: "litros" },
    { name: "Manteiga", quantity: 0.05, unit: "quilos" }
  ],
  "Porco á portuguesa": [
    { name: "Perna de porco fresca", quantity: 0.5, unit: "quilos" },
    { name: "Alhos", quantity: 0.02, unit: "quilos" },
    { name: "Colorau", quantity: 0.01, unit: "quilos" },
    { name: "Louro", quantity: 0.01, unit: "quilos" },
    { name: "Sal", quantity: 0.01, unit: "quilos" },
    { name: "Vinho branco", quantity: 0.1, unit: "litros" },
    { name: "Óleo", quantity: 0.05, unit: "litros" },
    { name: "Demi glace", quantity: 0.05, unit: "litros" },
    { name: "Azeitonas", quantity: 0.05, unit: "quilos" },
    { name: "Salsa", quantity: 0.02, unit: "quilos" }
  ],
  "Pudins de ovos": [
    { name: "Ovos", quantity: 0.2, unit: "quilos" },
    { name: "Leite", quantity: 0.3, unit: "litros" },
    { name: "Açúcar", quantity: 0.2, unit: "quilos" },
    { name: "Limão raspa", quantity: 0.02, unit: "quilos" }
  ],
  "Solha frita": [
    { name: "Solha posta", quantity: 0.5, unit: "quilos" },
    { name: "Sal", quantity: 0.01, unit: "quilos" },
    { name: "Farinha", quantity: 0.1, unit: "quilos" },
    { name: "Óleo", quantity: 0.1, unit: "litros" }
  ],
  "Sopa de alface": [
    { name: "Alface", quantity: 0.2, unit: "quilos" },
    { name: "Batata", quantity: 0.2, unit: "quilos" },
    { name: "Cenoura", quantity: 0.1, unit: "quilos" },
    { name: "Cebolas", quantity: 0.1, unit: "quilos" },
    { name: "Alho francês", quantity: 0.05, unit: "quilos" },
    { name: "Sal", quantity: 0.01, unit: "quilos" },
    { name: "Azeite", quantity: 0.05, unit: "litros" },
    { name: "Caldo de galinha", quantity: 0.05, unit: "litros" }
  ],
  "Sopa de feijão verde": [
    { name: "Feijão verde", quantity: 0.2, unit: "quilos" },
    { name: "Batatas", quantity: 0.2, unit: "quilos" },
    { name: "Cenouras", quantity: 0.1, unit: "quilos" },
    { name: "Cebolas", quantity: 0.1, unit: "quilos" },
    { name: "Alho francês", quantity: 0.05, unit: "quilos" },
    { name: "Sal", quantity: 0.01, unit: "quilos" },
    { name: "Caldo galinha", quantity: 0.05, unit: "litros" },
    { name: "Azeite", quantity: 0.05, unit: "litros" }
  ],
  "Sopa de grão": [
    { name: "Batata", quantity: 0.2, unit: "quilos" },
    { name: "Grão lata", quantity: 0.2, unit: "quilos" },
    { name: "Cenoura", quantity: 0.1, unit: "quilos" },
    { name: "Cebola", quantity: 0.1, unit: "quilos" },
    { name: "Alho francês", quantity: 0.05, unit: "quilos" },
    { name: "Sal", quantity: 0.01, unit: "quilos" },
    { name: "Azeite", quantity: 0.05, unit: "litros" }
  ]
};

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

// PDF Export Function
function exportToPDF() {
  try {
    // Try to get jsPDF from the global scope
    if (typeof jspdf === 'undefined' && typeof window.jspdf === 'undefined' && typeof window.jsPDF === 'undefined') {
      console.error('jsPDF library not found');
      alert('A biblioteca PDF não está disponível. Verifique se o script está carregado corretamente.');
      return;
    }
    
    // Determine which jsPDF library to use
    const jsPDF = jspdf?.jsPDF || window.jspdf?.jsPDF || window.jsPDF;
    
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

// DOM Ready Event
document.addEventListener('DOMContentLoaded', () => {
  // DOM Element Selections
  const productNameInput = document.getElementById('product-name');
  const rawMaterialsBody = document.getElementById('raw-materials-body');
  const addRowBtn = document.getElementById('add-row-btn');
  const saveBtn = document.getElementById('save-btn');
  const exportBtn = document.getElementById('export-btn');
  const initialCheckbox = document.getElementById('validity-toggle-initial');
  const initialDateInput = initialCheckbox.closest('.validity-input-container').querySelector('input[name="raw-material-validity"]');

  // Update dropdown with all recipe names
  const foodSuggestions = document.getElementById('food-suggestions');
  Object.keys(recipeIngredients).sort().forEach(recipeName => {
    const option = document.createElement('option');
    option.value = recipeName;
    foodSuggestions.appendChild(option);
  });

  // Initial Row Validity Toggle
  initialCheckbox.addEventListener('change', () => {
    if (initialCheckbox.checked) {
      initialDateInput.style.display = 'none';
      initialDateInput.type = 'month';
    } else {
      initialDateInput.style.display = 'block';
      initialDateInput.type = 'date';
    }
  });

  // Row Management Function
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
      <td><input type="text" name="responsible" value="Sónia Rosa" readonly></td>
      <td><button type="button" class="remove-row">Remover</button></td>
    `;
    
    // Remove row functionality
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
        validityDateInput.type = 'month';
      } else {
        validityDateInput.style.display = 'block';
        validityDateInput.type = 'date';
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

  // Auto-fill event listeners
  productNameInput.addEventListener('input', autoFillIngredients);
  productNameInput.addEventListener('change', autoFillIngredients);

  // Add row button
  addRowBtn.addEventListener('click', () => addTableRow());

  // Save Production Sheet
  saveBtn.addEventListener('click', () => {
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
      
      const validityCheckbox = row.querySelector('.validity-checkbox');
      const validityInput = row.querySelector('input[name="raw-material-validity"]');
      const rawMaterial = {
        name: materialName,
        unit: row.querySelector('select[name="raw-material-unit"]').value,
        lot: row.querySelector('input[name="raw-material-lot"]').value,
        hasValidity: !validityCheckbox.checked,
        validity: !validityCheckbox.checked ? validityInput.value : null,
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
    const savedSheets = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PRODUCTION_SHEETS_KEY) || '[]');
    savedSheets.push(productionSheet);
    localStorage.setItem(LOCAL_STORAGE_PRODUCTION_SHEETS_KEY, JSON.stringify(savedSheets));

    alert('Ficha de Produção guardada com sucesso!');
  });

  // Export button event listener
  exportBtn.addEventListener('click', exportToPDF);
  
  // Initial row when page loads
  addTableRow();
});