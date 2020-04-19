---
to: src/pages/<%= name %>.tsx
sh: prettier --write src/pages/<%= name %>.tsx && eslint --fix src/pages/<%= name %>.tsx
---
<% classified = h.inflection.classify(name) -%>
import { <% if(dataFetching === 'SSR'){ -%>GetServerSideProps, <% } -%><% if(dataFetching === 'Static'){ -%>GetStaticPaths, GetStaticProps, <% } -%>NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'

interface PageProps {}

const Page: NextPage<PageProps> = (props) => {
  return (
    <>
      <NextSeo title="Page title" description="Page description" />
      <div>Hello World</div>
    </>
  )
}

<% if(dataFetching === 'SSR'){ -%>
/**
* https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
*/
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {}, // will be passed to the page component as props
  }
}
<% } -%>

<% if(dataFetching === 'Static'){ -%>
/**
* https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
*/
export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {}, // will be passed to the page component as props
  }
}

/**
* https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
*/
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: 'parameter' } }],
    fallback: false,
  }
}
<% } -%>

export default Page


