export const JUPYTER_LITE_LAB_URL = 'https://dhri-curriculum.github.io/jupyterlite/lab/index.html';

export const buildJupyterLiteUrl = (notebookUrl) => {
  const url = new URL(JUPYTER_LITE_LAB_URL);

  if (notebookUrl) {
    url.searchParams.set('fromURL', notebookUrl);
  }

  return url.toString();
};
