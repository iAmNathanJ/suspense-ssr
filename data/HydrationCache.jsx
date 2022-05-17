import React from 'react';
import { Serialze } from './Serialize';
import { useComments } from './CommentProvider';

export default function HydrationCache() {
  const { id, comments } = useComments();

  return <Serialze id={id} data={comments} />;
}
