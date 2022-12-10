import clsx from 'clsx'

interface Props {
  className?: string
  fontSize?: string
  text: string
}

function TextCarousel({ className, fontSize = '16vw', text }: Props) {
  const words = text.split(' ')

  return (
    <div className="absolute inset-0 z-0 hidden md:flex md:flex-col">
      <ul
        className={clsx(
          'css-slideshow sticky transform overflow-hidden px-12 font-black uppercase leading-none tracking-tighter text-gray-200',
          className,
        )}
        style={{ fontSize }}
      >
        {words.map((word, index) => (
          <li key={`${word}-${index}`} className="text-right">
            {word}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TextCarousel
