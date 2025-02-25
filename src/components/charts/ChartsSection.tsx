import React from 'react';
import { ICat } from '../../entities';

import AdaptabilityChart from "./AdaptabilityChart"
import AffectionChart from "./AffectionChart"
import OriginChart from "./OriginChart"
import IndoorOutdoorChart from "./IndoorOutdoorChart"
import LapCatChart from "./LapCatChart"
import LifeSpanChart from "./LifeSpanChart"

import { useChartData } from '../../hooks/useChartData';

interface ChartsSectionProps {
  cats: ICat[];
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ cats }) => {
  const {
    adaptabilityData,
    affectionData,
    originData,
    indoorData,
    lapData,
    lifeSpanData,
  } = useChartData(cats);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <AdaptabilityChart data={adaptabilityData} />
      <AffectionChart data={affectionData} />
      <OriginChart data={originData} />
      <IndoorOutdoorChart data={indoorData} />
      <LapCatChart data={lapData} />
      <LifeSpanChart data={lifeSpanData} />
    </div>
  );
};

export default ChartsSection;