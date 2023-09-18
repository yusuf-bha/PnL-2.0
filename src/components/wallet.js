"use client"
import React from 'react'
import { useState, useEffect, useRef } from 'react'

function Wallet() {
  // get list of wallets from database with useeffect
  const [wallets, setWallets] = useState(['wallet1', 'wallet2', 'wallet3']);
  const [currWallet, setCurrWallet] = useState(wallets[0]);
  const [addBox, setAddBox] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const newWalletRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newWallet = newWalletRef.current.value;
    setWallets([...wallets, newWallet]);
    // call function to add wallet to database 
  }
  const deleteWallet = (addy) => {
    const newWallets = wallets.filter((wallet) => wallet != addy);
    setWallets(newWallets);
    // call function to remove wallet from database
  }
  return (
    <>
      <div>
        <button onClick={() => setShowWallets(!showWallets)}>Wallet: {currWallet}</button>
        {showWallets && (
          <div>
            {wallets.map((addy, index) => (
              <div key={index + "1"}>
                <button onClick={() => setCurrWallet(addy)} key={index + '2'}>{addy}</button>
                <button onClick={() => deleteWallet(addy)} key={index}>X</button>
              </div>  
            ))}
            <button onClick={() => setAddBox(!addBox)}>Add Wallet</button>
            {addBox && (
              <div>
                <form onSubmit={handleSubmit}>
                  <input type='text' placeholder='Wallet' ref={newWalletRef}/>
                  <button type='submit'>Add</button>
                </form>
              </div>
            )}
          </div>  
        )}
      </div>
    </>
  )
}

export default Wallet;