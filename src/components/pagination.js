import React from 'react'
import classNames from 'classnames'

import {
	HiChevronLeft as ChevronLeft,
	HiChevronRight as ChevronRight,
} from 'react-icons/hi'

import { Link } from './link'

function Pagination({
	className,
	pageSize,
	totalCount,
	currentPage,
	base,
	showPageNumbers = false,
	showPreviousNext = true,
	showPreviousLabel = false,
	showNextLabel = false,
}) {
	const totalPages = Math.ceil(totalCount / pageSize)
	const prevPage = currentPage - 1
	const nextPage = currentPage + 1

	const hasPrevPage = prevPage >= 1
	const hasNextPage = nextPage <= totalPages

	const LINK_CSS =
		'flex-grow flex relative items-center justify-center py-2 text-sm font-medium bg-white hover:text-red-600'
	const PREV_NEXT_CSS = 'px-2 text-gray-500'
	const DISABLED_CSS = 'pointer-events-none'
	const NUMBERS_CSS = classNames(
		'px-4 text-gray-700',
		!showPreviousNext && 'first:rounded-l last:rounded-r',
		totalPages > 5 && 'hidden sm:flex'
	)

	return (
		<>
			{totalCount > pageSize && (
				<nav
					className={classNames(
						'relative z-0 inline-flex shadow-sm -space-x-px',
						className
					)}
					aria-label="Pagination"
				>
					{showPreviousNext && (
						<Link
							to={`${base}/${prevPage}`}
							disabled={!hasPrevPage}
							className={classNames(
								'rounded-l',
								LINK_CSS,
								PREV_NEXT_CSS,
								!hasPrevPage && DISABLED_CSS
							)}
						>
							<span>
								<ChevronLeft />
							</span>
							<span
								className={classNames(showPreviousLabel ? 'pr-1' : 'sr-only')}
							>
								Prev
							</span>
						</Link>
					)}

					{showPageNumbers &&
						Array.from({ length: totalPages }).map((_, i) => (
							<Link
								key={`page-${i || 0}`}
								to={`${base}/${i > 0 ? i + 1 : ''}`}
								activeClassName="text-red-600"
								className={classNames(LINK_CSS, NUMBERS_CSS)}
							>
								{i + 1}
							</Link>
						))}

					{showPreviousNext && (
						<Link
							to={`${base}/${nextPage || ''}`}
							className={classNames(
								'rounded-r',
								LINK_CSS,
								PREV_NEXT_CSS,
								!hasNextPage && DISABLED_CSS
							)}
						>
							<span className={classNames(showNextLabel ? 'pl-1' : 'sr-only')}>
								Next
							</span>
							<ChevronRight />
						</Link>
					)}
				</nav>
			)}
		</>
	)
}

export { Pagination }
