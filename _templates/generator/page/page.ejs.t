---
to: src/pages/<%= name %>.tsx
---
<% classified = h.inflection.classify(name) -%>
import { <% if(dataFetching === 'SSR'){ -%>GetServerSideProps, <% } -%><% if(dataFetching === 'Static'){ -%>GetStaticPaths, GetStaticProps, <% } -%>NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'

interface PageProps {}

<% if(componentType === 'Functional'){ -%>
const Page: NextPage<PageProps> = (props) => {
  return (
    <>
      <NextSeo title="Page title" description="Page description" />
      <div><%= name %></div>
    </>
  )
}

<% } -%>
<% if(componentType === 'Class'){ -%>
class Page extends React.Component<PageProps> {

  render() {
    return (
      <>
        <NextSeo title="Page title" description="Page description" />
        <div><%= name %></div>
      </>
    )
  }
}
<% } -%>

<% if(dataFetching === 'SSR'){ -%>
/**
* https://nextjs.org/docs/basic-features/data-fetching
*/
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {}, // will be passed to the page component as props
  }
}
<% } -%>

<% if(dataFetching === 'Static'){ -%>
/**
* https://nextjs.org/docs/basic-features/data-fetching
*/
export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 1 } }],
    fallback: false,
  }
}
<% } -%>


export default Page


