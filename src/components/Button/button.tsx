import clsx from 'clsx'

type ButtonProps = {
  variant: 'Primary' | 'Secondary'
  size: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

function Button({ variant, size, children }: ButtonProps) {
  const baseStyles =
    'rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variantStyles = {
    Primary: 'bg-blue-500',
    Secondary: 'bg-red-500',
  }

  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size])}
    >
      {children}
    </button>
  )
}
export default Button
