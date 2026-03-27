    const root = document.documentElement;
    const extractColorsBtn = document.getElementById('extractColorsBtn');
    const extractedColors = document.getElementById('extractedColors');
    const copyColorsBtn = document.getElementById('copyColorsBtn');

    const resultBg = document.getElementById('resultBg');
    const resultText = document.getElementById('resultText');
    const resultBox = document.getElementById('resultBox');

    const bgColor = document.getElementById('bgColor');
    const bgHex = document.getElementById('bgHex');
    const textColor = document.getElementById('textColor');
    const textHex = document.getElementById('textHex');
    const boxColor = document.getElementById('boxColor');
    const boxHex = document.getElementById('boxHex');

    const characterNameInput = document.getElementById('characterNameInput');
    const profileName = document.getElementById('profileName');
    const menuItems = document.getElementsByClassName('menu-item');
    const statusName = document.getElementById('statusName');
    const mainImageUrl = document.getElementById('mainImageUrl');
    const thumbImageUrl = document.getElementById('thumbImageUrl');
    const mainPreview = document.getElementById('mainPreview');
    const mainPlaceholder = document.getElementById('mainPlaceholder');

    const thumbTargets = ['thumb1', 'thumb2', 'thumb3', 'community1'].map(id => document.getElementById(id));

    function isValidHex(value) {
      return /^#([0-9A-Fa-f]{6})$/.test(value);
    }

    function syncColor(picker, input, cssVar) {
      picker.addEventListener('input', () => {
        input.value = picker.value;
        root.style.setProperty(cssVar, picker.value);
      });

      input.addEventListener('input', () => {
        if (isValidHex(input.value)) {
          picker.value = input.value;
          root.style.setProperty(cssVar, input.value);
        }
      });
    }

    syncColor(bgColor, bgHex, '--bg');
    syncColor(textColor, textHex, '--text');
    syncColor(boxColor, boxHex, '--box');

    document.getElementById('applyMainImage').addEventListener('click', () => {
      const url = mainImageUrl.value.trim();
      if (!url) return;

      mainPreview.src = url;
      mainPreview.onload = () => {
        mainPreview.style.display = 'block';
        mainPlaceholder.style.display = 'none';
      };
      mainPreview.onerror = () => {
        alert('Não foi possível carregar essa imagem. Verifique a URL.');
        mainPreview.style.display = 'none';
        mainPlaceholder.style.display = 'block';
      };
    });

    document.getElementById('applyThumbImage').addEventListener('click', () => {
      const url = thumbImageUrl.value.trim();
      if (!url) return;
      thumbTargets.forEach(img => {
        img.src = url;
      });
    });

    characterNameInput.addEventListener('input', () => {
      const value = characterNameInput.value.trim();
      const name = value || 'Nome Personagem';
      profileName.textContent = name;
      statusName.textContent = name;
    });

    document.querySelectorAll('[data-bg]').forEach(button => {
      button.addEventListener('click', () => {
        const bg = button.dataset.bg;
        const text = button.dataset.text;
        const box = button.dataset.box;

        root.style.setProperty('--bg', bg);
        root.style.setProperty('--text', text);
        root.style.setProperty('--box', box);

        bgColor.value = bg;
        bgHex.value = bg;
        textColor.value = text;
        textHex.value = text;
        boxColor.value = box;
        boxHex.value = box;
      });
    });
  
    const toggleBtn = document.getElementById('toggleControls');
    const controls = document.querySelector('.controls');

    toggleBtn.addEventListener('click', () => {
      controls.classList.toggle('hidden');

      if (controls.classList.contains('hidden')) {
        console.log("oi");
        toggleBtn.textContent = 'Mostrar controles';
      } else {
                console.log("oi2");
        toggleBtn.textContent = 'Ocultar controles';
      }
});

function updateExtractedColors() {
  resultBg.textContent = bgHex.value;
  resultText.textContent = textHex.value;
  resultBox.textContent = boxHex.value;
}

extractColorsBtn.addEventListener('click', () => {
  updateExtractedColors();

  const isHidden = extractedColors.style.display === 'none';

  extractedColors.style.display = isHidden ? 'flex' : 'none';
  extractColorsBtn.textContent = isHidden ? 'Ocultar cores' : 'Mostrar cores';
});

copyColorsBtn.addEventListener('click', () => {
  const text = `Background: ${bgHex.value}
Texto: ${textHex.value}
Boxes: ${boxHex.value}`;

  navigator.clipboard.writeText(text).then(() => {
    copyColorsBtn.textContent = 'Copiado!';
    setTimeout(() => {
      copyColorsBtn.textContent = 'Copiar';
    }, 1500);
  });
});