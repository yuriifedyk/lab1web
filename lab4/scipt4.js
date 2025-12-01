document.addEventListener('DOMContentLoaded', () => {
    // === DOM Елементи (під нові ID з попереднього кроку) ===
    const dom = {
        menu: document.getElementById('menu-view'),
        game: document.getElementById('play-view'),
        startBtn: document.getElementById('btn-play'),
        
        difficulty: document.getElementById('lvl-select'),
        theme: document.getElementById('theme-select'),
        
        scoreVal: document.getElementById('current-score'),
        timerVal: document.getElementById('time-remaining'),
        
        playground: document.getElementById('playground'),
        target: document.getElementById('active-target'),
    };

    // === Конфігурація гри ===
    const GAME_SETTINGS = {
        easy: 3,
        medium: 2, // 'normal' перейменували в 'medium' в HTML
        hard: 1,
        respawnDelay: 200
    };

    // === Стан гри ===
    let gameState = {
        score: 0,
        timeLeft: 0,
        limit: 0,
        timerId: null
    };

    // === Логіка ===

    const initGame = () => {
        const difficulty = dom.difficulty.value;
        const color = dom.theme.value;

        // Валідація кольору
        if (!color) {
            alert('Будь ласка, оберіть колір цілі!');
            return;
        }

        // Налаштування
        gameState.limit = GAME_SETTINGS[difficulty];
        dom.target.style.backgroundColor = color;

        // Перемикання екранів
        dom.menu.classList.remove('active');
        dom.menu.classList.add('hidden');
        dom.game.classList.remove('hidden');

        // Скидання статистики
        gameState.score = 0;
        updateScoreUI();
        
        spawnNewTarget();
    };

    const stopGame = () => {
        clearInterval(gameState.timerId);
        dom.target.style.display = 'none'; // Ховаємо ціль

        // Невелика затримка перед алертом, щоб UI встиг оновитися
        setTimeout(() => {
            alert(`Гру закінчено! Твій рахунок: ${gameState.score}`);
            resetToMenu();
        }, 10);
    };

    const resetToMenu = () => {
        dom.game.classList.add('hidden');
        dom.menu.classList.remove('hidden');
        dom.menu.classList.add('active');
    };

    const updateScoreUI = () => {
        dom.scoreVal.textContent = gameState.score;
    };

    const updateTimerUI = (val) => {
        dom.timerVal.textContent = val;
    };

    const getRandomPosition = (max, size) => {
        return Math.floor(Math.random() * (max - size));
    };

    const spawnNewTarget = () => {
        // Очищаємо попередній таймер
        clearInterval(gameState.timerId);

        // Скидаємо час для поточного кліку
        gameState.timeLeft = gameState.limit;
        updateTimerUI(gameState.timeLeft);

        // Розрахунок координат
        const containerRect = dom.playground.getBoundingClientRect();
        // Оскільки target прихований (display: none), беремо розміри безпосередньо або хардкодимо, 
        // але краще зробити display: block перед розрахунками, щоб отримати offsetWidth
        dom.target.style.display = 'block'; 
        
        const maxX = containerRect.width;
        const maxY = containerRect.height;
        const size = dom.target.offsetWidth;

        const posX = getRandomPosition(maxX, size);
        const posY = getRandomPosition(maxY, size);

        dom.target.style.left = `${posX}px`;
        dom.target.style.top = `${posY}px`;

        // Запуск таймера зворотного відліку
        gameState.timerId = setInterval(() => {
            gameState.timeLeft--;
            updateTimerUI(gameState.timeLeft);

            if (gameState.timeLeft <= 0) {
                stopGame();
            }
        }, 1000);
    };

    // === Обробники подій ===

    dom.startBtn.addEventListener('click', initGame);

    dom.target.addEventListener('click', (e) => {
        // Зупиняємо таймер, щоб не сталося Game Over під час кліку
        clearInterval(gameState.timerId);
        
        // Запобігаємо проклікуванню (якщо потрібно)
        e.stopPropagation();

        // Оновлюємо рахунок
        gameState.score++;
        updateScoreUI();

        // Ефект зникнення
        dom.target.style.display = 'none';

        // Спавн нової цілі із затримкою
        setTimeout(spawnNewTarget, GAME_SETTINGS.respawnDelay);
    });
});
