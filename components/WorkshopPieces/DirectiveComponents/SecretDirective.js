import SecretComponent from '../SecretComponent';

export default function SecretDirective({ children, title }) {
  return <SecretComponent text={children} title={title} />;
}
