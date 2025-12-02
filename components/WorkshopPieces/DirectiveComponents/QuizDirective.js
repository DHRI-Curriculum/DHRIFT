import QuizComponent from '../NewQuiz';

export default function QuizDirective({ children }) {
  return (
    <div>
      <QuizComponent>{children}</QuizComponent>
    </div>
  );
}
