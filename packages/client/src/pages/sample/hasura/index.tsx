import { useQuery, gql } from '@apollo/client';
import styled from '@emotion/styled';
import React from 'react';

import type { NextPage } from 'next';

import { Loader } from 'src/components/atoms/Loader';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { ErrorTemplate } from 'src/components/templates/ErrorTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

type HasuraProps = {
  origin: string;
};

/**
 * @概要 Hasura と GraphQL の連携を確認するためのページコンポーネント
 */
const Hasura: NextPage<HasuraProps> = ({ origin }) => {
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

  if (loading)
    return (
      <StCenterLoaderContainer>
        <Loader />
      </StCenterLoaderContainer>
    );

  if (error) {
    return <ErrorTemplate error={error} />;
  }

  return (
    <React.Fragment>
      <HeadTemplate
        pageOrigin={origin}
        pageCanonicalUrl='https://www.riot-ec-site.com/sample/hasura'
        pageTitle='Next.js + Hasura'
      />
      <CommonTemplate>
        <h1>Next.js + Apollo + Hasura</h1>
        {data.sample_test_profile_table.map(
          (cur: { id: string; name: string; created_at: string }) => (
            <div key={cur.id}>
              <h2>{cur.name}</h2>
              <h5>{cur.id}</h5>
              <h6>{cur.created_at}</h6>
            </div>
          ),
        )}
      </CommonTemplate>
    </React.Fragment>
  );
};

export default Hasura;

const StCenterLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
