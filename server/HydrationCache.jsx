import React, { useContext } from 'react';
import { Serialze } from './Serialize';
import { useData } from '../data/DataProvider';

export default function HydrationCache() {
  const { id, data } = useData();

  return <Serialze id={id} data={data} />;
}
