const mainContent = document.getElementById('main-content');

function loadCatalog() {
    mainContent.innerHTML = '<div class="text-center">Завантаження каталогу...</div>';

    fetch('data/categories.json')
        .then(response => {
            if (!response.ok) throw new Error("Помилка мережі або файл не знайдено");
            return response.json();
        })
        .then(categories => {
            let html = '<h2 class="mb-4">Категорії меню</h2><div class="list-group">';

            categories.forEach(cat => {
                html += `
                    <a href="#" class="list-group-item list-group-item-action" 
                       onclick="loadCategoryItems('${cat.shortname}'); return false;">
                        <h5 class="mb-1">${cat.name}</h5>
                        <p class="mb-1">${cat.notes}</p>
                    </a>
                `;
            });

            html += '</div>';

            html += `
                <div class="mt-4 text-center">
                    <button class="btn btn-warning btn-lg" onclick="loadSpecials()">
                        ★ Specials (Випадкова категорія) ★
                    </button>
                </div>
            `;

            mainContent.innerHTML = html;
        })
        .catch(error => {
            console.error('Error:', error);
            mainContent.innerHTML = '<p class="text-danger">Не вдалося завантажити каталог. Перевірте, чи запущено локальний сервер.</p>';
        });
}

function loadCategoryItems(shortname) {
    mainContent.innerHTML = '<div class="text-center">Завантаження страв...</div>';

    fetch(`data/${shortname}.json`)
        .then(response => {
            if (!response.ok) throw new Error("Помилка завантаження категорії");
            return response.json();
        })
        .then(data => {
            let html = `
                <button class="btn btn-secondary mb-3" onclick="loadCatalog()">← Назад до каталогу</button>
                <h2 class="text-primary">${data.category.name}</h2>
                <p class="text-muted">${data.category.notes || ''}</p>
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            `;

            data.items.forEach(item => {
                html += `
                    <div class="col">
                        <div class="card h-100">
                            <img src="https://placehold.co/200x200?text=${item.shortname}" class="card-img-top" alt="${item.name}">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text small">${item.description}</p>
                            </div>
                            <div class="card-footer">
                                <strong class="text-success">${item.price}</strong>
                            </div>
                        </div>
                    </div>
                `;
            });

            html += '</div>';
            mainContent.innerHTML = html;
        })
        .catch(error => {
            console.error('Error:', error);
            mainContent.innerHTML = `<p class="text-danger">Помилка: Дані для категорії '${shortname}' не знайдені.</p> <button class="btn btn-secondary" onclick="loadCatalog()">Назад</button>`;
        });
}

function loadSpecials() {
    fetch('data/categories.json')
        .then(response => response.json())
        .then(categories => {
            const randomIndex = Math.floor(Math.random() * categories.length);
            const randomCategory = categories[randomIndex];
            loadCategoryItems(randomCategory.shortname);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}