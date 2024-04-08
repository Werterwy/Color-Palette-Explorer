// Генерация случайного цвета в формате RGB
function randomColor() {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},
   ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

// Создание палитры выбора цветов
function createColorPalette(numColors) {
  const colorPicker = document.getElementById('color-picker');
  colorPicker.innerHTML = '';
  for (let j = 0; j < 5; j++) {
    for (let i = 0; i < numColors + 1; i++) {
      const colorDiv = document.createElement('div');
      const color = randomColor();
      colorDiv.style.backgroundColor = color;
      colorDiv.classList.add('color');
      colorDiv.setAttribute('data-color', color);
      colorDiv.addEventListener('click', () => selectColor(color));
      colorPicker.appendChild(colorDiv);
    }
``}
}


// Функция выбора цвета с учетом настроек оттенка, насыщенности и светлоты
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
}

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

// Обработчики событий для кнопок
document.getElementById('generate-analogous').addEventListener('click', generateAnalogousPalette);
document.getElementById('generate-complementary').addEventListener('click', generateComplementaryPalette);
document.getElementById('save-palette').addEventListener('click', savePalette);


// Создание начальной палитры
createColorPalette(6);
