import { useQuery, gql } from '@apollo/client';
import { NextPage } from 'next';
import React from 'react';

import { Loader } from 'src/components/atoms/Loader';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

/**
 * @概要 Hasura と GraphQL の連携を確認するためのページコンポーネント
 */
const Hasura: NextPage = () => {
  const SAMPLE_QUERY = gql`
    query {
      sample_test_profile_table(order_by: { created_at: asc }) {
        id
        name
        created_at
      }
    }
  `;

  const { loading, error, data } = useQuery(SAMPLE_QUERY);

  if (loading) return <Loader />;

  if (error) return <p>{error.toString()}</p>;

  return (
    <React.Fragment>
      <HeadTemplate pageTitle='Next.js + Hasura' />
      <CommonTemplate>
        <h1>Next.js + Apollo + Hasura</h1>
        {data.sample_test_profile_table.map(
          (cur: { id: string; name: string; created_at: string }) => (
            <div key={cur.id}>
              <h4>{cur.id}</h4>
              <h5>{cur.name}</h5>
              <h6>{cur.created_at}</h6>
            </div>
          ),
        )}
      </CommonTemplate>
    </React.Fragment>
  );
};

export default Hasura;
