interface ErrorFallbackProps {
  error: Error;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  return (
    <div>
      <p>Something went wrong</p>
      <span>{error.message}</span>
    </div>
  );
};

export default ErrorFallback;
