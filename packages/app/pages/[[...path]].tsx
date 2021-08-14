import React from 'react'
import styled from 'styled-components';
import StatsPane from '../components/stats-pane';
import AsksList from '../components/asks-list';
import DetailPane from '../components/detail-pane';

const StyledPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  height: 100vh;
  @media (max-width: 468px) {
    flex-wrap: wrap;
    flex-direction: column;
  }
`;

function Page() {
  return (
      <StyledPage>
        <StatsPane />
        <AsksList />
        <DetailPane />
      </StyledPage>
  )
}

export default Page;