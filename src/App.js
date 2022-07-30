import { useState } from 'react';
import Web3 from 'web3';
import abi from "./constant/abi.json";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import './App.css';
import 'react-notifications/lib/notifications.css';

function App() {

  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async() => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        setWalletAddress(accounts[0]);
      } catch(err) {
        console.log(err);
      }
    }
  }

  const disconnectWallet = () => {
    setWalletAddress('');
  }

  const mint = async() => {
    try {
      if (!walletAddress) {
        return;
      }

      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi, "0x5F3fAc14Afd982d69005D749Dbb6209a893f4890");
      await contract.methods.mint().send({
        from : walletAddress
      });
      NotificationManager.success('Success');
    } catch(err) {

    }
  }

  return (
    <div className="App">
      <NotificationContainer/>
      <div className='container d-flex flex-column h-screen'>
        <header className='pt-3 text-end'>
          <button className='btn btn-primary' onClick={walletAddress ? disconnectWallet : connectWallet }>
            <img src='/metamask-icon.svg' className='wallet-icon' alt=""/>
            <span className='ms-2'>{walletAddress ? "Connected(" + (walletAddress.slice(0, 4) + '...' + walletAddress.slice(-4) + ')') : "Connect Wallet" }</span>
          </button>
        </header>
        <div className='row h-100 align-items-center'>
          <div className='col-md-6 text-center'>
            <img src='/coin.png' className='coin-icon' alt=''/>
          </div>
          <div className='col-md-6 text-center'>
            <h1 className='text-white'>NFT MINT</h1>
            <button className='btn btn-success mint-btn mt-3' onClick={mint}> MINT </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
