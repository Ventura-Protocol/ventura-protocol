import React from 'react'
import WalletComponents from '../components/wallet';
import AsksList from '../components/asks-list';
import DetailPane from '../components/detail-pane';

function Page() {
  return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <WalletComponents />
        <AsksList />
        <DetailPane />
      </div>
  )
}


export default Page;