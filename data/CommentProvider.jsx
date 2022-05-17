import React from 'react';
import {createContext, useContext} from 'react';
import {useSuspendableData} from './suspendable';

export const CommentContext = createContext(null);

export function CommentProvider({children, data, fallback}) {
  const { id, data: comments } = useSuspendableData({ data, fallback });

  return (
    <CommentContext.Provider value={{ id, comments }}>
      {children}
    </CommentContext.Provider>
  );
}

export function useComments() {
  const { id, comments } = useContext(CommentContext);

  return {
    id,
    comments: comments?.suspended
  };
}
