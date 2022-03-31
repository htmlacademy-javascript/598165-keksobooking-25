const DEFAULT_PREVIEW_SRC = 'img/muffin-grey.svg';

const imageTypes = /\.(gif|jp?g|png)$/i;

const addFilePreview = (input, container) => {

  const file = input.files[0];

  container.innerHTML = '';
  container.style.padding = '0';

  const isTypeCorrect = imageTypes.test(file.name);

  if (isTypeCorrect) {
    const preview = document.createElement('img');
    preview.src = URL.createObjectURL(file);
    preview.style.width = '70px';
    preview.style.height = '70px';
    preview.style.objectFit = 'cover';
    container.append(preview);
  }
};

const resetFilePreview = (container, defaultSrc = DEFAULT_PREVIEW_SRC) => {
  container.innerHTML = '';
  container.removeAttribute('style');

  if (defaultSrc) {
    const defaultPreview = document.createElement('img');
    defaultPreview.src = defaultSrc;
    defaultPreview.width = 40;
    defaultPreview.height = 40;
    container.append(defaultPreview);
  }
};

export {addFilePreview, resetFilePreview};
