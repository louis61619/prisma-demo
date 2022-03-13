import Head from 'next/head'
import { AwesomeLink } from '../components/Link'
import { gql, useQuery } from '@apollo/client'

const AllLinksQuery = gql`
  query Links($first: Int, $after: String) {
    links(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
          url
          description
          imageUrl
          category
        }
      }
    }
  }
`

export default function Home() {
  const { data, loading, error, fetchMore } = useQuery(AllLinksQuery, {
    variables: { first: 2 },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Oops, something went wrong {error.message}</p>

  const { endCursor, hasNextPage } = data.links.pageInfo

  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto my-20 max-w-5xl">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data?.links.edges.map(({ node: link }: any) => (
            <AwesomeLink
              key={link.id}
              url={link.url}
              id={link.id}
              category={link.category}
              title={link.title}
              description={link.description}
              imageUrl={link.imageUrl}
            />
          ))}
        </div>
        {hasNextPage ? (
          <button
            className="my-10 rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => {
              fetchMore({
                variables: { after: endCursor },
                updateQuery: (prevResult: any, { fetchMoreResult }: any) => {
                  fetchMoreResult.links.edges = [
                    ...prevResult.links.edges,
                    ...fetchMoreResult.links.edges,
                  ]
                  return fetchMoreResult
                },
              })
            }}
          >
            more
          </button>
        ) : (
          <p className="my-10 text-center font-medium">You've reached the end! </p>
        )}
      </div>
    </div>
  )
}
