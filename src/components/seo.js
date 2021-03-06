import React from 'react'
import PropTypes from 'prop-types' // eslint-disable-line
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SEO({ description, lang, meta, keywords, title }) {
  return (
    <StaticQuery
      query={detailsQuery} // eslint-disable-line no-use-before-define
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta)}
          >
            <link
              href="https://fonts.googleapis.com/css?family=Montserrat:900&display=swap&subset=latin-ext"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Merriweather:900&display=swap&subset=latin-ext"
              rel="stylesheet"
            />
          </Helmet>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  description: '',
  keywords: [],
  lang: `pl`,
  meta: [],
}

const { string } = PropTypes
SEO.propTypes = {
  description: string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({ property: string, content: string }),
      PropTypes.shape({ name: string, content: string }),
    ])
  ),
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
