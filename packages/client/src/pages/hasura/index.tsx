import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import { NextPage } from 'next';
import React from 'react';

import { Loader } from 'src/components/atoms/Loader';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

const SAMPLE_QUERY = gql`
  query {
    sample_test_profile_table(order_by: { created_at: asc }) {
      id
      name
      created_at
    }
  }
`;

const Hasura: NextPage = () => {
  const { loading, error, data } = useQuery(SAMPLE_QUERY);

  if (loading) return <Loader />;

  return (
    <React.Fragment>
      <HeadTemplate pageTitle='Next.js + Hasura' />
      <CommonTemplate>Next.js + Apollo + Hasura</CommonTemplate>
    </React.Fragment>
  );
};

const createApolloClient = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
});

createApolloClient
  .query({
    query: gql`
      query {
        sample_test_profile_table(order_by: { created_at: asc }) {
          id
          name
          created_at
        }
      }
    `,
  })
  .then((result) => console.table(result));

export default Hasura;
