import React from 'react'
import classnames from 'classnames'

import {
	HiChevronLeft as ChevronLeft,
	HiChevronRight as ChevronRight,
} from 'react-icons/hi'

import Link from './link'

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

	const LinkCSS =
		'flex-grow flex relative items-center justify-center py-2 text-sm font-medium bg-white hover:text-red-600'
	const PrevNextCSS = 'px-2 text-gray-500 disabled:opacity-60'
	const NumbersCSS = classnames(
		'px-4 text-gray-700',
		!showPreviousNext && 'first:rounded-l last:rounded-r',
		totalPages > 5 && 'hidden sm:flex'
	)

	return (
		<>
			{totalCount > pageSize && (
				<nav
					className={classnames(
						'relative z-0 inline-flex shadow-sm -space-x-px',
						className
					)}
					aria-label="Pagination"
				>
					{showPreviousNext && (
						<Link
							to={`${base}/${prevPage}`}
							disabled={!hasPrevPage}
							className={classnames('rounded-l', LinkCSS, PrevNextCSS)}
						>
							<span>
								<ChevronLeft />
							</span>
							<span
								className={classnames(showPreviousLabel ? 'pr-1' : 'sr-only')}
							>
								Prev
							</span>
						</Link>
					)}

					{showPageNumbers &&
						Array.from({ length: totalPages }).map((_, i) => (
							<Link
								to={`${base}/${i > 0 ? i + 1 : ''}`}
								activeClassName="text-red-600"
								className={classnames(LinkCSS, NumbersCSS)}
							>
								{i + 1}
							</Link>
						))}

					{showPreviousNext && (
						<Link
							to={`${base}/${nextPage}`}
							disabled={!hasNextPage}
							className={classnames('rounded-r', LinkCSS, PrevNextCSS)}
						>
							<span className={classnames(showNextLabel ? 'pl-1' : 'sr-only')}>
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

export default Pagination
