
const colorsHSL = [
    "hsl(5, 100%, 57%)", "hsl(342, 82%, 64%)", "hsl(307, 71%, 48%)", "hsl(261, 57%, 53%)",
    "hsl(248, 69%, 49%)", "hsl(207, 91%, 64%)", "hsl(196, 100%, 50%)", "hsl(187, 100%, 80%)",
    "hsl(169, 100%, 30%)", "hsl(123, 100%, 40%)", "hsl(109, 61%, 49%)", "hsl(54, 100%, 54%)",
    "hsl(48, 100%, 58%)", "hsl(45, 100%, 58%)", "hsl(38, 100%, 56%)", "hsl(9, 100%, 57%)"
];

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

function selectColor(color) {
    const selectedColorDiv = document.querySelector('.selected-color');
    const hslValues = color.match(/\d+/g); 
    
    selectedColorDiv.style.backgroundColor = color;
    const hexCode = rgbToHex(selectedColorDiv.style.backgroundColor);
    document.getElementById('hue').value = hslValues[0];
    updateHueOutput(hslValues[0]);
    document.getElementById('saturation').value = hslValues[1];
    updateSaturationOutput(hslValues[1]);
    document.getElementById('lightness').value = hslValues[2];
    updateLightnessOutput(hslValues[2]);

    updateHexCode(hexCode);
}

function updateHexCode(hexCode) {
    const hexCodeElement = document.querySelector('.HEX-code');
    hexCodeElement.textContent = hexCode.substring(1);

    hexCodeElement.addEventListener('mouseenter', function () {
        this.style.fontWeight = 'bold';
        this.style.fontSize = '30px';
    });

    hexCodeElement.addEventListener('mouseleave', function () {
        this.style.fontWeight = 'normal';
        this.style.fontSize = '25px';
    });

    hexCodeElement.addEventListener('click', function () {
        copyToClipboard('#' + hexCodeElement.textContent);
    });
}

function rgbToHex(rgb) {
    const values = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    const hex = '#' + ((1 << 24) + (parseInt(values[1]) << 16) + (parseInt(values[2]) << 8) + parseInt(values[3])).toString(16).slice(1);

    return hex;
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    alert('HEX-код скопирован в буфер обмена: ' + text);
}

function AnalogousPalette() {
    const hue = parseInt(document.getElementById('hue').value);
    const lowerBorder = hue - 20 < 0 ? 0 : hue - 20;
    const upperBorder = hue + 20 > 360 ? 360 : hue + 20;

    const randomHue = Math.floor(Math.random() * (upperBorder - lowerBorder + 1)) + lowerBorder;

    createPaletteColor(randomHue);
}

function createPaletteColor(randomHue) {
    
    const saturation = document.getElementById('saturation').value;
    const lightness = document.getElementById('lightness').value;

    const selectedColorDiv = document.querySelector('.selected-color');

    selectedColorDiv.style.backgroundColor = `hsl(${randomHue}, ${saturation}%, ${lightness}%)`;

    document.getElementById('hue').value = randomHue;
    updateHueOutput(randomHue);
    document.getElementById('saturation').value = saturation;
    updateSaturationOutput(saturation);
    document.getElementById('lightness').value = lightness;
    updateLightnessOutput(lightness);

    const hexCode = rgbToHex(selectedColorDiv.style.backgroundColor);
    updateHexCode(hexCode);
}

function createPalette() {

    const hue = document.getElementById('hue').value;
    const saturation = document.getElementById('saturation').value;
    const lightness = document.getElementById('lightness').value;

    const newColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    colorsHSL.push(newColor); 
    createColorPalette(); 
}


function savePalette() {

    const selectedColor = document.querySelector('.selected-color');
    const hexCode = rgbToHex(selectedColor.style.backgroundColor);

    const hexCodeElement = document.querySelector('.HEX-code');
    hexCodeElement.textContent = hexCode.substring(1);

    copyToClipboard('#' + hexCodeElement.textContent);

    const palette = [];

    selectedColor.forEach(color => {
        const colorValue = color.style.backgroundColor;
        palette.push(colorValue);
    });

    localStorage.setItem('customPalette', JSON.stringify(palette));

    //alert('Палитра сохранена на вашем компьютере.');
}

document.querySelectorAll('input[type="range"]').forEach(input => {
    input.addEventListener('input', function () {
        const output = document.getElementById(`${this.id}-value`);
        output.textContent = this.value;

        const hue = document.getElementById('hue').value;
        const saturation = document.getElementById('saturation').value;
        const lightness = document.getElementById('lightness').value;

        let selectedColorDiv = document.querySelector('.selected-color');
        if (!selectedColorDiv) {
            selectedColorDiv = document.createElement('div');
            selectedColorDiv.classList.add('selected-color');
            selectedColorDiv.addEventListener('click', () => selectColorLog(hue, saturation, lightness));
            document.getElementById('selected-colors').appendChild(selectedColorDiv);
        }

        selectedColorDiv.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        const hexCode = rgbToHex(selectedColorDiv.style.backgroundColor);
        updateHexCode(hexCode);
    });
});

function selectColorLog(hue, saturation, lightness) {
    console.log(`Выбран цвет hsl(${hue}, ${saturation}%, ${lightness}%)`);
}

function createSelectColor() {
    const hue = document.getElementById('hue').value;
    const saturation = document.getElementById('saturation').value;
    const lightness = document.getElementById('lightness').value;

    let selectedColorDiv = document.querySelector('.selected-color');
    if (!selectedColorDiv) {
        selectedColorDiv = document.createElement('div');
        selectedColorDiv.classList.add('selected-color');
        document.getElementById('selected-colors').appendChild(selectedColorDiv);
    }
    selectedColorDiv.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    const hexCode = rgbToHex(selectedColorDiv.style.backgroundColor);

    updateHexCode(hexCode);
}

function updateHueOutput(value) {
    document.getElementById('hue-value').textContent = value;
}

function updateSaturationOutput(value) {
    document.getElementById('saturation-value').textContent = value;
}

function updateLightnessOutput(value) {
    document.getElementById('lightness-value').textContent = value;
}

document.getElementById('generate-analogous').addEventListener('click', AnalogousPalette);
document.getElementById('generate-complementary').addEventListener('click', createPalette);
document.getElementById('save-palette').addEventListener('click', savePalette);


createColorPalette();
createSelectColor();
