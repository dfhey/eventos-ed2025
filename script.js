document.addEventListener('DOMContentLoaded', () => {
    const filters = {
        formato: new Set(),
        categoria: new Set(),
        tipo: new Set()
    };

    // Create filter buttons and options
    const filterData = {
        formato: ['Presencial', 'Híbrido', 'Online'],
        categoria: ['Nacional', 'Internacional'],
        tipo: ['Feira de Tecnologia', 'Congresso', 'Feira e Congresso', 'Educação a Distância', 'Simpósio', 'Evento Corporativo']
    };

    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filters';

    // Add "Ver todos" button
    const resetButton = document.createElement('button');
    resetButton.className = 'reset-button';
    resetButton.textContent = 'Ver todos';
    resetButton.addEventListener('click', () => {
        // Clear all filters
        Object.keys(filters).forEach(key => {
            filters[key].clear();
        });

        // Remove selected class from all options
        document.querySelectorAll('.filter-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Remove active class from all filter buttons
        document.querySelectorAll('.filter-button').forEach(button => {
            button.classList.remove('active');
        });

        // Show all rows
        filterTable();
    });
    filtersContainer.appendChild(resetButton);

    Object.entries(filterData).forEach(([filterName, options]) => {
        const button = document.createElement('button');
        button.className = 'filter-button';
        button.textContent = filterName.charAt(0).toUpperCase() + filterName.slice(1);
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'filter-options';
        
        options.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'filter-option';
            optionDiv.textContent = option;
            optionDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                optionDiv.classList.toggle('selected');
                
                if (optionDiv.classList.contains('selected')) {
                    filters[filterName].add(option);
                } else {
                    filters[filterName].delete(option);
                }
                
                filterTable();
                updateButtonState(button, filters[filterName].size);
            });
            
            optionsDiv.appendChild(optionDiv);
        });
        
        button.appendChild(optionsDiv);
        button.addEventListener('click', () => {
            const allOptions = document.querySelectorAll('.filter-options');
            allOptions.forEach(opt => {
                if (opt !== optionsDiv) opt.classList.remove('show');
            });
            optionsDiv.classList.toggle('show');
        });
        
        filtersContainer.appendChild(button);
    });

    // Insert filters before table
    const tableContainer = document.querySelector('.table-container');
    tableContainer.parentNode.insertBefore(filtersContainer, tableContainer);

    // Close filters when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-button')) {
            document.querySelectorAll('.filter-options').forEach(opt => {
                opt.classList.remove('show');
            });
        }
    });

    function updateButtonState(button, activeFiltersCount) {
        button.classList.toggle('active', activeFiltersCount > 0);
    }

    function filterTable() {
        const rows = document.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const formato = row.children[4].textContent;
            const categoria = row.children[5].textContent;
            const tipo = row.children[6].textContent;
            
            const formatoMatch = filters.formato.size === 0 || filters.formato.has(formato);
            const categoriaMatch = filters.categoria.size === 0 || filters.categoria.has(categoria);
            const tipoMatch = filters.tipo.size === 0 || filters.tipo.has(tipo);
            
            row.style.display = formatoMatch && categoriaMatch && tipoMatch ? '' : 'none';
        });
    }
});