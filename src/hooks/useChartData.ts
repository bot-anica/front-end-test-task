import { useMemo } from 'react';
import { ICat } from '../entities';

export const useChartData = (cats: ICat[]) => {
  const adaptabilityData = useMemo(
    () =>
      cats.map((cat) => ({
        name: cat.name,
        value: cat.adaptability,
      })),
    [cats]
  );

  const affectionData = useMemo(
    () =>
      cats.map((cat) => ({
        name: cat.name,
        value: cat.affection_level,
      })),
    [cats]
  );

  const originData = useMemo(() => {
    const originCounts = cats.reduce(
      (acc: { [key: string]: number }, cat) => {
        const origin = cat.origin || 'Unknown';
        acc[origin] = (acc[origin] || 0) + 1;
        return acc;
      },
      {}
    );

    return Object.entries(originCounts).map(([origin, count]) => ({
      name: origin,
      value: count,
    }));
  }, [cats]);

  const indoorData = useMemo(() => {
    const counts = cats.reduce(
      (acc: { indoor: number; outdoor: number }, cat) => {
        if (cat.indoor === 1) {
          acc.indoor += 1;
        } else {
          acc.outdoor += 1;
        }
        return acc;
      },
      { indoor: 0, outdoor: 0 }
    );

    return [
      { name: 'Indoor', value: counts.indoor },
      { name: 'Outdoor', value: counts.outdoor },
    ];
  }, [cats]);

  const lapData = useMemo(() => {
    const counts = cats.reduce(
      (acc: { lap: number; nonLap: number }, cat) => {
        if (cat.lap === 1) {
          acc.lap += 1;
        } else {
          acc.nonLap += 1;
        }
        return acc;
      },
      { lap: 0, nonLap: 0 }
    );

    return [
      { name: 'Lap Cat', value: counts.lap },
      { name: 'Not Lap Cat', value: counts.nonLap },
    ];
  }, [cats]);

  const lifeSpanData = useMemo(
    () =>
      cats.map((cat) => {
        const [minAge, maxAge] = cat.life_span.split('-').map(Number);
        return {
          name: cat.name,
          years: (minAge + maxAge) / 2,
        };
      }),
    [cats]
  );

  return {
    adaptabilityData,
    affectionData,
    originData,
    indoorData,
    lapData,
    lifeSpanData,
  };
};