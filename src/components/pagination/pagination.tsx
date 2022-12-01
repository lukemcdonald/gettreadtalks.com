import classNames from 'classnames'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

import { Link } from '~/components/link'

interface Props {
  base: string
  className?: string
  currentPage: number
  pageSize: number
  showNextLabel?: boolean
  showPageNumbers?: boolean
  showPreviousLabel?: boolean
  showPreviousNext?: boolean
  totalCount: number
}

function Pagination({
  base,
  className,
  currentPage,
  pageSize,
  showNextLabel = false,
  showPageNumbers = false,
  showPreviousLabel = false,
  showPreviousNext = true,
  totalCount,
}: Props) {
  const totalPages = Math.ceil(totalCount / pageSize)
  const prevPage = currentPage - 1
  const nextPage = currentPage + 1
  const hasPrevPage = prevPage >= 1
  const hasNextPage = nextPage <= totalPages

  const linkStyles = {
    base: 'flex-grow flex relative items-center justify-center py-2 text-sm font-medium bg-white hover:text-primary-600',
    prevNext: 'px-2 text-gray-500',
    disabled: 'pointer-events-none',
    numbers: classNames(
      'px-4 text-gray-700',
      !showPreviousNext && 'first:rounded-l last:rounded-r',
      totalPages > 5 && 'hidden sm:flex',
    ),
  }

  return (
    <>
      {totalCount > pageSize ? (
        <nav
          className={classNames('relative z-0 inline-flex -space-x-px shadow-sm', className)}
          aria-label="Pagination"
        >
          {showPreviousNext ? (
            <Link
              to={`${base}/${prevPage}`}
              disabled={!hasPrevPage}
              className={classNames(
                'rounded-l',
                linkStyles.base,
                linkStyles.prevNext,
                hasPrevPage ? '' : linkStyles.disabled,
              )}
            >
              <ChevronLeftIcon className="h-5 w-5" />
              <span className={classNames(showPreviousLabel ? 'pr-1' : 'sr-only')}>Prev</span>
            </Link>
          ) : null}

          {showPageNumbers
            ? Array.from({ length: totalPages }).map((_, i) => (
                <Link
                  key={`page-${i || 0}`}
                  to={`${base}/${i > 0 ? i + 1 : ''}`}
                  activeClassName="text-primary-600"
                  className={classNames(linkStyles.base, linkStyles.numbers)}
                >
                  {i + 1}
                </Link>
              ))
            : null}

          {showPreviousNext ? (
            <Link
              to={`${base}/${nextPage || ''}`}
              className={classNames(
                'rounded-r',
                linkStyles.base,
                linkStyles.prevNext,
                hasNextPage ? '' : linkStyles.disabled,
              )}
            >
              <span className={classNames(showNextLabel ? 'pl-1' : 'sr-only')}>Next</span>
              <ChevronRightIcon className="h-5 w-5" />
            </Link>
          ) : null}
        </nav>
      ) : null}
    </>
  )
}

export default Pagination
