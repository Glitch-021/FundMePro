// StateContextProvider (index.jsx)
import React, { createContext, useContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { abi } from "../constants/index";
import { formatEther } from "ethers/lib/utils";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xcd6a1E77AAEF4ACb5cE20A64F00c76A8F7425A72",
    abi
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.image,
          form.target,
          new Date(form.deadline).getTime(),
        ],
      });
      console.log("Contract call success! 🍾", data);
      return data;
    } catch (error) {
      console.log("Contract call failed! ☠️", error);
      throw error;
    }
  };

  let cachedCampaigns = null;
  const getCampagins = async () => {
    const campagins = await contract.call("getCampaigns");

    if (!cachedCampaigns) {
      cachedCampaigns = campagins.map((campagin, i) => ({
        owner: campagin.owner,
        title: campagin.title,
        description: campagin.description,
        target: ethers.utils.formatEther(campagin.target.toString()),
        deadline: campagin.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campagin.amountCollected.toString()
        ),
        image: campagin.image,
        pId: i,
      }));
    }

    return cachedCampaigns;
  };

  const getUserCampaign = async () => {
    const allCampaigns = await getCampagins();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampagins,
        getUserCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
