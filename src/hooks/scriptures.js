import { graphql, useStaticQuery } from 'gatsby'

const scripturesQuery = graphql`
  query {
    scriptures: allAirtableScripture {
      nodes {
        id
        data {
          verse
          content
        }
      }
    }
  }
`

function useScriptures() {
  const data = useStaticQuery(scripturesQuery)

  const scriptures = data.scriptures.nodes.map(({ id, data }) => ({
    id,
    ...data,
  }))

  const randomScripture = scriptures[Math.floor(Math.random() * scriptures.length)]

  return { scriptures, randomScripture }
}

export { useScriptures }
