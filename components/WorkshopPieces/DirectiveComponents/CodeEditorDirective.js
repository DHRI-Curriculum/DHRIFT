import CodeRunBox from '../../Editor/CodeRunBox';

// Extract raw text from React children tree
function extractText(node) {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node?.props?.children) return extractText(node.props.children);
  return '';
}

export default function CodeEditorDirective({ children, language, setCode, setEditorOpen, setAskToRun }) {
  const codeText = extractText(children);

  return (
    <CodeRunBox
      defaultCode={codeText}
      language={language}
      setCode={setCode}
      setEditorOpen={setEditorOpen}
      setAskToRun={setAskToRun}
    />
  );
}
