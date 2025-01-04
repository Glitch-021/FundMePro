import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import DisplayCampaigns from "../components/DisplayCampaigns";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampagins] = useState([]);

  const { address, contract, getCampagins } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampagins();
    setCampagins(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
