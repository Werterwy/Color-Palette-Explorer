// Генерация случайного цвета в формате RGB
/*function randomColor() {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},
   ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}*/
/*FFB71C1C
FFF44336*/
/*const predefinedColors = [
    "FFB71C1C", "FFE91E63", "FF9C27B0", "FF673AB7",
    "FF3F51B5", "FF2196F3", "FF03A9F4", "FF00BCD4",
    "FF009688", "FF4CAF50", "FF8BC34A", "FFCDDC39",
    "FFFFEB3B", "FFFFC107", "FFFF9800", "FFFF5722"
];
*/
const predefinedColorsHSL = [
    "hsl(5, 100%, 57%)", "hsl(342, 82%, 64%)", "hsl(307, 71%, 48%)", "hsl(261, 57%, 53%)",
    "hsl(248, 69%, 49%)", "hsl(207, 91%, 64%)", "hsl(196, 100%, 50%)", "hsl(187, 100%, 80%)",
    "hsl(169, 100%, 30%)", "hsl(123, 100%, 40%)", "hsl(109, 61%, 49%)", "hsl(54, 100%, 54%)",
    "hsl(48, 100%, 58%)", "hsl(45, 100%, 58%)", "hsl(38, 100%, 56%)", "hsl(9, 100%, 57%)"
];

// Создание палитры выбора цветов
function createColorPalette() {
  const colorPicker = document.getElementById('color-picker');
  colorPicker.innerHTML = '';
  for (let i = 0; i < 16; i++) {
      const colorDiv = document.createElement('div');
      const color = predefinedColorsHSL[i];
      colorDiv.style.backgroundColor = color;
      colorDiv.classList.add('color');
      colorDiv.setAttribute('data-color', color);
      colorDiv.addEventListener('click', () => selectColor(color));
      colorPicker.appendChild(colorDiv);
``}
}


// Функция выбора цвета с учетом настроек оттенка, насыщенности и светлоты
function selectColor(color) {
  /*  const selectedColors = document.getElementById('selected-colors');
    const selectedColorDiv = document.createElement('div');
    const hslValues = color.match(/\d+/g); // Извлекаем числовые значения из строки HSL

    selectedColorDiv.style.backgroundColor = color;
    selectedColorDiv.classList.add('selected-color');
*//*    selectedColorDiv.textContent = `hsl(${hslValues[0]}, ${hslValues[1]}%, ${hslValues[2]}%)`;*//*
    selectedColors.appendChild(selectedColorDiv);*/
    const selectedColorDiv = document.querySelector('.selected-color');
    const hslValues = color.match(/\d+/g); // Извлекаем числовые значения из строки HSL

    selectedColorDiv.style.backgroundColor = color;

    // Обновляем значения input[type="range"] внутри .color-controls
    document.getElementById('hue').value = hslValues[0];
    document.getElementById('saturation').value = hslValues[1];
    document.getElementById('lightness').value = hslValues[2];
}

/*// Функция выбора цвета с учетом настроек оттенка, насыщенности и светлоты
function selectColor(color) {
  const selectedColors = document.getElementById('selected-colors');
  const selectedColorDiv = document.createElement('div');
  const hue = document.getElementById('hue').value;
  const saturation = document.getElementById('saturation').value;

  const lightness = document.getElementById('lightness').value;

  selectedColorDiv.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  selectedColorDiv.classList.add('selected-color');
  selectedColorDiv.textContent = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  selectedColors.appendChild(selectedColorDiv);
}*/

// Функция создания аналогичной палитры
function generateAnalogousPalette() {
  const selectedColor = document.querySelector('.selected-color:last-child');
  const hue = parseInt(selectedColor.style.backgroundColor.split(',')[0].split('(')[1]);
  const newColors = [hue - 30, hue, hue + 30]; // изменение на 30 градусов для создания аналогичной палитры
  createColorPaletteFromHues(newColors);
}

// Функция создания дополнительной палитры
function generateComplementaryPalette() {
  const selectedColor = document.querySelector('.selected-color:last-child');
  const hue = parseInt(selectedColor.style.backgroundColor.split(',')[0].split('(')[1]);
  const newColors = [(hue + 180) % 360]; // дополнительный цвет сдвигается на 180 градусов для создания дополнительной палитры
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


// Функция сохранения палитры
function savePalette() {
  const selectedColors = document.querySelectorAll('.selected-color');
  const palette = [];
  selectedColors.forEach(color => {
    palette.push(color.textContent);
  });
  // Здесь вы можете отправить палитру на сервер или сохранить ее локально, в зависимости от ваших потребностей
  alert('Палитра сохранена: ' + palette.join(', '));
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

/*// Обработчик события изменения значения input[type="range"]
document.querySelectorAll('input[type="range"]').forEach(input => {
    input.addEventListener('input', function () {
        const output = document.getElementById(`${this.id}-value`);
        output.textContent = this.value;

        // Получаем текущие значения оттенка, насыщенности и светлоты
        const hue = document.getElementById('hue').value;
        const saturation = document.getElementById('saturation').value;
        const lightness = document.getElementById('lightness').value;

        // Обновляем цвет выбранного элемента палитры
        const selectedColorDiv = document.querySelector('.selected-color');
        if (selectedColorDiv) {
            selectedColorDiv.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
           // selectedColorDiv.textContent = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        }
    });
});*/


// Обработчики событий для кнопок
document.getElementById('generate-analogous').addEventListener('click', generateAnalogousPalette);
document.getElementById('generate-complementary').addEventListener('click', generateComplementaryPalette);
document.getElementById('save-palette').addEventListener('click', savePalette);


// Создание начальной палитры
createColorPalette();
createSelectColor();
