import React from 'react'
import WalletComponents from '../components/wallet';
import NewAsk from '../components/form/new-ask';

function Page() {
  return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <div><WalletComponents /></div>
        <div>
          <p>Content</p>
          <p>Content</p>
          <p>Content</p>
        </div>
        <div>
          <NewAsk />
        </div>
      </div>
  )
}


export default Page;