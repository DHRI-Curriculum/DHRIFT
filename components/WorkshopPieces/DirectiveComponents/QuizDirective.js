import QuizComponent from '../NewQuiz';
import { Children, isValidElement } from 'react';

export default function QuizDirective({ children }) {
  // Find the ul element in children (may be nested)
  let ulElement = null;

  const findUl = (node) => {
    if (!node) return;
    if (isValidElement(node)) {
      if (node.type === 'ul') {
        ulElement = node;
        return;
      }
      if (node.props && node.props.children) {
        Children.forEach(node.props.children, findUl);
      }
    }
  };

  Children.forEach(children, findUl);

  if (!ulElement) {
    // Fallback: render children directly without quiz styling
    return <div className="quiz-fallback">{children}</div>;
  }

  return (
    <div>
      <QuizComponent>{ulElement}</QuizComponent>
    </div>
  );
}
