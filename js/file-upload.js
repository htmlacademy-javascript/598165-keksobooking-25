const FILE_PREVIEW_DEFAULT_SRC = 'img/muffin-grey.svg';

const fileTypes = /\.(gif|jp?g|png)$/i;

const addFilePreview = (fileInput, filePreviewContainer ) => {

  const {files} = fileInput;
  filePreviewContainer.innerHTML = '';
  filePreviewContainer.style.padding = '0';

  [...files].forEach((file) => {
    const isFileTypeCorrect = fileTypes.test(file.name);

    if (isFileTypeCorrect) {
      const filePreview = document.createElement('img');
      filePreview.src = URL.createObjectURL(file);
      filePreview.style.width = '70px';
      filePreview.style.height = '70px';
      filePreview.style.objectFit = 'cover';
      filePreviewContainer.append(filePreview);
    }
  });
};

const resetFilePreview = (filePreviewContainer, src = FILE_PREVIEW_DEFAULT_SRC) => {
  filePreviewContainer.innerHTML = '';
  filePreviewContainer.removeAttribute('style');

  if (src) {
    const defaultPreview = document.createElement('img');
    defaultPreview.src = src;
    defaultPreview.width = 40;
    defaultPreview.height = 40;
    filePreviewContainer.append(defaultPreview);
  }
} ;

export {addFilePreview, resetFilePreview};
