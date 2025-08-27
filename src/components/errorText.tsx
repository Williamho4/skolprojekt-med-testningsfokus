type ErrorTextProps = {
  error: string
}

function ErrorText({ error }: ErrorTextProps) {
  return <p>{error}</p>
}
export default ErrorText
