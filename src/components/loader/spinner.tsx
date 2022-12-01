import classNames from 'classnames'

interface Props {
  className?: string
}

function Spinner({ className, ...props }: Props) {
  return (
    <div
      className={classNames(
        'my-24 mx-auto h-10 w-10 animate-pulse rounded-full bg-primary-600',
        className,
      )}
      {...props}
    />
  )
}

export default Spinner
