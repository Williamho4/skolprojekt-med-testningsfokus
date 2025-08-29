import clsx from 'clsx'

type InputProps = {
  placeholder: string
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  classname?: string
} & React.InputHTMLAttributes<HTMLInputElement>

function Input({
  placeholder,
  type = 'text',
  classname,
  ...props
}: InputProps) {
  const baseStyles =
    'px-4 py-3 text-base rounded-[8px] border border-gray-300 w-full box-border outline-none'

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={clsx(baseStyles, classname)}
      {...props}
    />
  )
}
export default Input
