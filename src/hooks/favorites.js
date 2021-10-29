import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { useAsync } from 'hooks/async'

const userFavoriteTalksQuery = graphql`
  query {
    allAirtableTalk {
      nodes {
        data {
          title
        }
      }
    }
  }
`

const Favorites = React.createContext()
Favorites.displayName = 'Favorites'

function FavoritesProvider(props) {
  const { data, error, isLoading } = useAsync()

  const value = React.useMemo(() => ({ data, error, isLoading }), [data, error, isLoading])

  return <Favorites.Provider value={value} {...props} />
}

function useStaticFavorites() {
  const { data } = useStaticQuery(userFavoriteTalksQuery)

  const favorites = data.edges.reduce((acc, edge) => {
    const { node } = edge
    return [...acc, {}]
  }, [])

  return favorites
}

function useFavorites() {
  const context = React.useContext(Favorites)
  // const favorites = useStaticFavorites()

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }

  return context
}

export { FavoritesProvider, useFavorites }
