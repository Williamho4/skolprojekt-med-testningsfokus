type ErrorTextProps = {
  error: string
}

function ErrorText({ error }: ErrorTextProps) {
  return <p data-id="error-text">{error}</p>
}
export default ErrorText
