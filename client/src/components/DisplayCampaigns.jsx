import React from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import FundCard from "./FundCard";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-detials/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-hubot font-semibold text-xl text-white text-left">
        {title} ({campaigns?.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && <Loader />}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-sour-gummy text font-semibold text-[14px] leading-7 text-[#818183] text-lg">
            You have not created any campaigns yet bruhhh.
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign, i) => (
            <FundCard
              key={i}
              campaignId={campaign.id}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
