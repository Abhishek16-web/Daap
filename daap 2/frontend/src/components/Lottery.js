import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../utils/load-contract";

const Lottery = () => {
  const navigate = useNavigate();
  const [participant, setParticipant] = useState({})


  const callLotteryPage = async () => {
    try {
      const res = await fetch('/lottery', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      setParticipant(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (error) {
      console.log(error);
      navigate('/participantsLogin');
    }
  }
  useEffect(() => {
    callLotteryPage();

  })

  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null
  });
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [length, setLength] = useState("no participants");
  const [manager, setManager] = useState(null)
  const [reload, shouldReload] = useState(false);

  const reloadEffect = () => shouldReload(!reload);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Lottery", provider);
      if (provider) {
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract
        });
      }
      else {
        console.error("Please install MetaMask!");
      }
    };
    loadProvider();
  }, [])

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  useEffect(() => {
    const loadBalance = async () => {
      const { contract, web3 } = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, "ether"));
    };
    web3Api.contract && loadBalance();
  }, [web3Api],reload);

  const transferFund = async () => {
    const { web3, contract } = web3Api;
    await contract.Transfer({
      from: account,
      value: web3.utils.toWei("2", "ether"),
    });
    reloadEffect();
  };

  const withdrawFund = async () => {
    const { contract} = web3Api;
    const currentAccount = await web3Api.web3.eth.getAccounts();
    const cAccount = currentAccount[0];
    const leng = await contract.Length.call();
    const length = leng.toString();
    // console.log(leng.toString());
    const managerAccount = await contract.manager.call();
    // console.log(managerAccount);
    // console.log(cAccount);
    if(length < 3){
      var hlol = document.getElementById('check');
      hlol.innerHTML = "Not matched the participants criteria";
      hlol.style.cssText = "color:red; font-size:30px; font-weight:bold";  
    }
    else if(managerAccount === cAccount){
      await contract.Withdraw({
        from: account,
      });

    }
    else{
      var lol = document.getElementById('check');
      lol.innerHTML = "You are not a manager !!!";
      lol.style.cssText = "color:red; font-size:30px; font-weight:bold";
      
    }
  };

  useEffect(() => {
    const getLength = async () =>{
      const { contract} = web3Api;
      const leng = await contract.Length.call();
      // console.log(leng.toString());
      setLength(leng.toString());
    }
    web3Api.contract && getLength();
  
  }, [web3Api],reload);

  useEffect(() => {
    const setmanager = async () =>{
      const { contract} = web3Api;
      const leng = await contract.manager.call();
      // console.log(leng.toString());
      setManager(leng.toString());
    }
    web3Api.contract && setmanager();
  
  }, [web3Api]);

  return (
    <>
      <div> hey{participant.name}</div>

      <div class="card text-center">
        <div class="card-header">Funding</div>
        <div class="card-body">
          <h5 class="card-title">Total Pot: {balance} ETH </h5>
          <p class="card-text">
            Your Account : {account ? account : "not connected"}
          </p>
          <p class="card-text">
            Manager account : {manager}

          </p>
          <h5>Number of Participants:- {length}</h5>

          &nbsp;
          <div className="enter">
            <button type="button" class="btn btn-success " onClick={transferFund}>
              Pay Now
            </button>
            <h6>Transfer 2 Ether to enter in lottery</h6>
          </div>

          &nbsp;

          <div className="winner">
            <button type="button" class="btn btn-primary " onClick={withdrawFund}>
              Select Winner
            </button>
            <div id="check">Only manager can select the winner</div>
          </div>
        </div>
      </div>

    </>




  )
}

export default Lottery