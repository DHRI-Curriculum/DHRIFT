export function createRunRequest(previousRequest, { code, language, editorTab }) {
  const previousId =
    previousRequest && typeof previousRequest === 'object' && typeof previousRequest.id === 'number'
      ? previousRequest.id
      : 0;

  return {
    id: previousId + 1,
    code,
    language,
    editorTab,
  };
}

export function isRunRequest(value) {
  return value && typeof value === 'object' && typeof value.id === 'number';
}

export function isRunRequestForEditor(request, editorNames) {
  if (!isRunRequest(request)) return false;

  const allowedEditors = (Array.isArray(editorNames) ? editorNames : [editorNames])
    .filter(Boolean)
    .map((editorName) => editorName.toLowerCase());
  const requestedEditor = (request.editorTab || request.language || '').toLowerCase();

  return allowedEditors.includes(requestedEditor);
}

export function getRunRequestCode(request, fallbackCode = '') {
  if (!isRunRequest(request)) return fallbackCode;
  return request.code ?? fallbackCode;
}
