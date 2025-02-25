import React, { useMemo } from 'react';
import { ICat } from '../entities';
import { CatCard } from '.';

interface CatCardsListProps {
  cats: ICat[];
}

const CatCardsList: React.FC<CatCardsListProps> = ({ cats }) => {
  const memoizedCatCards = useMemo(
    () => cats.map((cat) => <CatCard key={cat.id} cat={cat} />),
    [cats]
  );

  return (
    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {memoizedCatCards}
    </div>
  );
};

export default CatCardsList;