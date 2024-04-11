
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
    const hexCode = rgbToHex(selectedColorDiv.style.backgroundColor);

    selectedColorDiv.style.backgroundColor = color;

    // Обновляем значения input[type="range"] и output
    document.getElementById('hue').value = hslValues[0];
    updateHueOutput(hslValues[0]);
    document.getElementById('saturation').value = hslValues[1];
    updateSaturationOutput(hslValues[1]);
    document.getElementById('lightness').value = hslValues[2];
    updateLightnessOutput(hslValues[2]);

    // Обновляем HEX-код цвета
    updateHexCode(hexCode);
}

// Функция обновления HEX-кода цвета
function updateHexCode(hexCode) {
    const hexCodeElement = document.querySelector('.HEX-code');
  //  hexCodeElement.textContent = hexCode;
    hexCodeElement.textContent = hexCode.substring(1);

    // Добавляем обработчик для копирования HEX-кода при наведении
    hexCodeElement.addEventListener('mouseenter', function () {
        this.style.fontWeight = 'bold';
        this.style.fontSize = '30px';
    });

    // Убираем форматирование при выходе мыши
    hexCodeElement.addEventListener('mouseleave', function () {
        this.style.fontWeight = 'normal';
        this.style.fontSize = '25px';
    });

    // Добавляем обработчик для копирования HEX-кода при клике
    hexCodeElement.addEventListener('click', function () {
        copyToClipboard('#' + hexCodeElement.textContent);
    });
}

// Функция преобразования RGB-цвета в HEX-код
function rgbToHex(rgb) {
    // Получаем значения красного, зеленого и синего цветов из строки RGB
    const values = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    // Преобразуем числовые значения в шестнадцатеричные и соединяем их в строку HEX
    const hex = '#' + ((1 << 24) + (parseInt(values[1]) << 16) + (parseInt(values[2]) << 8) + parseInt(values[3])).toString(16).slice(1);

    return hex;
}

// Функция для копирования текста в буфер обмена
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // сообщение об успешном копировании
    alert('HEX-код скопирован в буфер обмена: ' + text);
}
// Функция создания аналогичной палитры
function generateAnalogousPalette() {
    /*const selectedColor = document.querySelector('.selected-color');
    const hue = parseInt(selectedColor.style.backgroundColor.split(',')[0].split('(')[1]);
    const newColors = [hue - 30, hue, hue + 30]; // изменение на 15 градусов для создания аналогичной палитры
    const hue = document.getElementById('hue').value;

    createColorPaletteAnalog(newColors);*/

    // Получение текущего оттенка от пользователя
    const hue = parseInt(document.getElementById('hue').value);

    // Определение диапазона оттенков, который не должен выходить за границы
    const lowerBound = hue - 30 < 0 ? 0 : hue - 20;
    const upperBound = hue + 30 > 360 ? 360 : hue + 20;

    // Генерация случайного оттенка в указанном диапазоне
    const randomHue = Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;

    // Передача массива в функцию создания аналогичной палитры
    createColorPaletteAnalog(randomHue);
}

// Функция создания палитры цветов из массива оттенков
function createColorPaletteAnalog(randomHue) {

    // Получаем текущие значения оттенка, насыщенности и светлоты
    
    const saturation = document.getElementById('saturation').value;
    const lightness = document.getElementById('lightness').value;

    const selectedColorDiv = document.querySelector('.selected-color');

    selectedColorDiv.style.backgroundColor = `hsl(${randomHue}, ${saturation}%, ${lightness}%)`;

    // Обновляем значения input[type="range"] и output
    document.getElementById('hue').value = randomHue;
    updateHueOutput(randomHue);
    document.getElementById('saturation').value = saturation;
    updateSaturationOutput(saturation);
    document.getElementById('lightness').value = lightness;
    updateLightnessOutput(lightness);

    const hexCode = rgbToHex(selectedColorDiv.style.backgroundColor);
    // Обновляем HEX-код цвета
    updateHexCode(hexCode);
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

    const hexCode = rgbToHex(selectedColorDiv.style.backgroundColor);
    // Обновляем HEX-код цвета
    updateHexCode(hexCode);
}

// Функция обновления значений output для оттенка
function updateHueOutput(value) {
    document.getElementById('hue-value').textContent = value;
}

// Функция обновления значений output для насыщенности
function updateSaturationOutput(value) {
    document.getElementById('saturation-value').textContent = value;
}

// Функция обновления значений output для светлоты
function updateLightnessOutput(value) {
    document.getElementById('lightness-value').textContent = value;
}

// Функция для сохранения содержимого .selected-color в формате изображения
function saveSelectedColorAsImage() {
    const selectedColor = document.querySelector('.selected-color');

    // Создаем новый элемент canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Устанавливаем размеры canvas такие же, как у .selected-color
    canvas.width = selectedColor.offsetWidth;
    canvas.height = selectedColor.offsetHeight;

    // Рисуем содержимое .selected-color на canvas
    ctx.drawImage(selectedColor, 0, 0);

    // Получаем data URL изображения с холста
    const imageDataURL = canvas.toDataURL();

    // Создаем элемент ссылки для скачивания изображения
    const link = document.createElement('a');
    link.href = imageDataURL;
    link.download = 'selected_color.png'; // Имя файла для скачивания
    document.body.appendChild(link);

    // Кликаем по ссылке для скачивания изображения
    link.click();

    // Удаляем ссылку после скачивания
    document.body.removeChild(link);
}
// Обработчики событий для кнопок
document.getElementById('generate-analogous').addEventListener('click', generateAnalogousPalette);
document.getElementById('generate-complementary').addEventListener('click', createPalette);
document.getElementById('save-palette').addEventListener('click', saveSelectedColorAsImage);

/*// Находим кнопку "Сохранить палитру"
const savePaletteButton = document.getElementById('save-palette');

// Добавляем обработчик события клика на кнопку
savePaletteButton.addEventListener('click', function () {
    // Вызываем функцию сохранения палитры в формате изображения
    saveSelectedColorAsImage();
});*/

// Создание начальной палитры
createColorPalette();
createSelectColor();
