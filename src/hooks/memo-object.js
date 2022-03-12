import { useMemo } from 'react'

/**
 * Memoizes a passed object using its values so that the same object
 * is always returned as long as all of its properties are unchanged.
 * This is useful for objects passed as component props, so that
 * child components will not re-render because a parent component
 * rendered and produced a new object. Most notably, this is needed
 * to prevent context providers from triggering downstream updates
 * every time they render.
 *
 * @function useMemoObject
 * @param {Object} object - The object to memoize.
 * @returns {Object} The firest instance of the object.
 */

export function useMemoObject(object) {
	const dependencies = Array.isArray(object) ? object : Object.values(object)
	return useMemo(() => object, dependencies)
}
