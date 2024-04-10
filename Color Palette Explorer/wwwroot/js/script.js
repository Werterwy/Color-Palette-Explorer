
const colorsHSL = [
    "hsl(5, 100%, 57%)", "hsl(342, 82%, 64%)", "hsl(307, 71%, 48%)", "hsl(261, 57%, 53%)",
    "hsl(248, 69%, 49%)", "hsl(207, 91%, 64%)", "hsl(196, 100%, 50%)", "hsl(187, 100%, 80%)",
    "hsl(169, 100%, 30%)", "hsl(123, 100%, 40%)", "hsl(109, 61%, 49%)", "hsl(54, 100%, 54%)",
    "hsl(48, 100%, 58%)", "hsl(45, 100%, 58%)", "hsl(38, 100%, 56%)", "hsl(9, 100%, 57%)"
];

// Создание палитры выбора цветов
function createColorPalette() {
    const colorPicker = document.getElementById('color-picker');
    colorPicker.innerHTML = '';
    for (let i = 0; i < colorsHSL.length; i++) {
        const colorDiv = document.createElement('div');
        const color = colorsHSL[i];
        colorDiv.style.backgroundColor = color;
        colorDiv.classList.add('color');
        colorDiv.setAttribute('data-color', color);
        colorDiv.addEventListener('click', () => selectColor(color));
        colorPicker.appendChild(colorDiv);
    }
}

// Функция выбора цвета с учетом настроек оттенка, насыщенности и светлоты
function selectColor(color) {
    const selectedColorDiv = document.querySelector('.selected-color');
    const hslValues = color.match(/\d+/g); 

    selectedColorDiv.style.backgroundColor = color;

    // Обновляем значения input[type="range"] внутри .color-controls
    document.getElementById('hue').value = hslValues[0];
    document.getElementById('saturation').value = hslValues[1];
    document.getElementById('lightness').value = hslValues[2];
}

// Функция создания аналогичной палитры
function generateAnalogousPalette() {
    const selectedColor = document.querySelector('.selected-color:last-child');
    const hue = parseInt(selectedColor.style.backgroundColor.split(',')[0].split('(')[1]);
    const newColors = [hue - 15, hue, hue + 15]; // изменение на 15 градусов для создания аналогичной палитры
    createColorPaletteFromHues(newColors);
}

// Функция создания палитры цветов из массива оттенков
function createColorPaletteFromHues(hues) {

    const colorPicker = document.getElementById('color-picker');
    colorPicker.innerHTML = '';
    hues.forEach(hue => {
        const colorDiv = document.createElement('div');
        colorDiv.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        colorDiv.classList.add('color');
        colorDiv.setAttribute('data-color', `hsl(${hue}, 100%, 50%)`);
        colorDiv.addEventListener('click', () => selectColor(colorDiv.getAttribute('data-color')));
        colorPicker.appendChild(colorDiv);
    });
}

// Функция создания дополнительной палитры
function createPalette() {
    const hue = document.getElementById('hue').value;
    const saturation = document.getElementById('saturation').value;
    const lightness = document.getElementById('lightness').value;

    const newColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    colorsHSL.push(newColor); // Добавляем дополнительный цвет в массив
    createColorPalette(); // Пересоздаем палитру с учетом новых цветов
}


// Функция сохранения палитры на компьютер пользователя
function savePalette() {
    const selectedColors = document.querySelectorAll('.selected-color');
    const palette = [];

    // Проход по каждому выбранному цвету
    selectedColors.forEach(color => {
        // Получение цвета из стиля backgroundColor
        const colorValue = color.style.backgroundColor;
        palette.push(colorValue);
    });

    // Сохранение палитры в локальном хранилище
    localStorage.setItem('customPalette', JSON.stringify(palette));

    // Оповещение пользователя о сохранении палитры
    alert('Палитра сохранена на вашем компьютере.');
}

// Обработчик события изменения значения input[type="range"]
document.querySelectorAll('input[type="range"]').forEach(input => {
    input.addEventListener('input', function () {
        const output = document.getElementById(`${this.id}-value`);
        output.textContent = this.value;

        // Получаем текущие значения оттенка, насыщенности и светлоты
        const hue = document.getElementById('hue').value;
        const saturation = document.getElementById('saturation').value;
        const lightness = document.getElementById('lightness').value;

        // Получаем или создаем элемент .selected-color
        let selectedColorDiv = document.querySelector('.selected-color');
        if (!selectedColorDiv) {
            selectedColorDiv = document.createElement('div');
            selectedColorDiv.classList.add('selected-color');
            selectedColorDiv.addEventListener('click', () => selectColorLog(hue, saturation, lightness));
            document.getElementById('selected-colors').appendChild(selectedColorDiv);
        }

        // Обновляем выбранный цвет
        selectedColorDiv.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    });
});

// Функция выбора цвета
function selectColorLog(hue, saturation, lightness) {
    // Ваша логика обработки выбранного цвета...
    console.log(`Выбран цвет hsl(${hue}, ${saturation}%, ${lightness}%)`);
}

function createSelectColor() {
    // Получаем текущие значения оттенка, насыщенности и светлоты
    const hue = document.getElementById('hue').value;
    const saturation = document.getElementById('saturation').value;
    const lightness = document.getElementById('lightness').value;

    // Получаем или создаем элемент .selected-color
    let selectedColorDiv = document.querySelector('.selected-color');
    if (!selectedColorDiv) {
        selectedColorDiv = document.createElement('div');
        selectedColorDiv.classList.add('selected-color');
        document.getElementById('selected-colors').appendChild(selectedColorDiv);
    }
    selectedColorDiv.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}



// Обработчики событий для кнопок
document.getElementById('generate-analogous').addEventListener('click', generateAnalogousPalette);
document.getElementById('generate-complementary').addEventListener('click', createPalette);
document.getElementById('save-palette').addEventListener('click', savePalette);


// Создание начальной палитры
createColorPalette();
createSelectColor();
