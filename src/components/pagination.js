import React from 'react';
import classnames from 'classnames';

import Link from './link';

import ChevronLeftIcon from '../assets/svgs/icon-chevron-left.svg';
import ChevronRightIcon from '../assets/svgs/icon-chevron-right.svg';

const LinkCSS =
	'flex-grow flex relative items-center justify-center py-2 text-sm font-medium bg-white border border-gray-300 hover:text-red-600';
const PrevNextCSS = 'px-2 text-gray-500 disabled:opacity-60';
const NumbersCSS = 'px-4 text-gray-700';

export default function Pagination({
	className,
	pageSize,
	totalCount,
	currentPage,
	base,
	showPageNumbers = false,
	showPrevious = false,
	showNext = false,
}) {
	const totalPages = Math.ceil(totalCount / pageSize);
	const prevPage = currentPage - 1;
	const nextPage = currentPage + 1;

	const hasPrevPage = prevPage >= 1;
	const hasNextPage = nextPage <= totalPages;

	return (
		<nav
			className={classnames(
				'relative z-0 inline-flex shadow-sm -space-x-px',
				className
			)}
			aria-label="Pagination"
		>
			<Link
				to={`${base}/${prevPage}`}
				disabled={!hasPrevPage}
				className={classnames('rounded-l', LinkCSS, PrevNextCSS)}
			>
				<span>
					<ChevronLeftIcon />
				</span>
				<span className={classnames(showPrevious ? 'pr-1' : 'sr-only')}>
					Prev
				</span>
			</Link>
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
			<Link
				to={`${base}/${nextPage}`}
				disabled={!hasNextPage}
				className={classnames('rounded-r', LinkCSS, PrevNextCSS)}
			>
				<span className={classnames(showNext ? 'pl-1' : 'sr-only')}>Next</span>
				<ChevronRightIcon />
			</Link>
		</nav>
	);
}
