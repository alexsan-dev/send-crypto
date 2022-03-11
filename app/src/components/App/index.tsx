import React, { useContext, useState } from "react";
import { ExternalProvider } from "@ethersproject/providers";
import { walletContext } from "react-open-wallet";
import { ethers } from "ethers";
import { abi } from "../../../../transactions/artifacts/contracts/Transactions.sol/Transactions.json";

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    address: "",
    amount: 0,
    message: "",
    keyword: "",
  });
  const { account } = useContext(walletContext);

  // AGREGAR DATOS
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = ev.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // ENVIAR TRANSACCION
  const onSubmit = async (ev: React.FormEvent) => {
    // OBTENER CONTRATO
    ev.preventDefault();
    const provider = new ethers.providers.Web3Provider(
      window.ethereum as ExternalProvider
    );
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(
      "0x896145C17224Ed47712AD6dd4221eacA79cf42a6",
      abi,
      signer
    );

    // ENVIAR A ETH
    await signer.sendTransaction({
      from: account,
      to: formData.address,
      value: ethers.utils.parseEther(formData.amount.toString())._hex,
      gasPrice: "0x5208",
    });

    // EJECUTAR SMART CONTRACT
    await transactionContract.addToBlockchain(
      formData.address,
      formData.amount,
      formData.message,
      formData.keyword
    );
  };

  return (
    <main>
      <p>{account}</p>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        />
        <input
          type="text"
          name="keyword"
          id="keyword"
          value={formData.keyword}
          placeholder="Keyword"
          onChange={handleChange}
        />
        <button>Send crypto</button>
      </form>
    </main>
  );
};

declare global {
  interface window {
    ethereum: unknown;
  }
}

export default App;
