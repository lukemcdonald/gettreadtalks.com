import classNames from 'classnames'
import React from 'react'

function TextCarousel({ className, fontSize = '16vw', text }) {
  const string = text.split(' ')

  return (
    <div className="absolute inset-0 z-0 hidden md:flex md:flex-col">
      <ul
        className={classNames(
          'css-slideshow sticky transform overflow-hidden px-12 font-black uppercase leading-none tracking-tighter text-gray-200',
          className,
        )}
        style={{ fontSize }}
      >
        {string.map((word, index) => (
          <li key={`${word}-${index}`} className="text-right">
            {word}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { TextCarousel }
