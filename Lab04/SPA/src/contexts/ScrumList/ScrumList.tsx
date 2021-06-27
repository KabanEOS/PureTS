import React, { createContext, useContext, useEffect, useState } from 'react';

import { ScrumFromDB, ScrumSubmitData } from 'models/scrum/scrum.model';

import { deleteScrumsFromDBbyId, getScrumsFromDB, postScrumsToDB } from './scrum.handler';

interface props {
  children?: React.ReactNode;
}
interface ScrumListContextValue {
  scrums: ScrumFromDB[];
  handleSubmit: (scrum: ScrumSubmitData) => Promise<void> | (()=>void);
  handleDelete: (id: string) => Promise<void> | (()=>void);
}

const ScrumListContext = createContext<ScrumListContextValue>({
  scrums: [],
  handleSubmit: () => () => {},
  handleDelete: () => () => {}
});

const ScrumListProvider = ({ children }:props): JSX.Element => {

  const [scrums, setScrums] = useState<ScrumFromDB[]>([]);

  useEffect(() => {
    const downloadScrums = async () => {
      const data = await getScrumsFromDB();
      setScrums(data);
    };
    downloadScrums();
  }, []);

  const handleSubmit = async (scrum: ScrumSubmitData): Promise<void> => {
    const data = await postScrumsToDB(scrum);
    setScrums(currentScrums => [
      ...currentScrums,
      data
    ]);
  };

  const handleDelete = async (id: string): Promise<void> => {
    deleteScrumsFromDBbyId(id)
      .then((res) => {
        setScrums(scrums.filter(scrum => scrum.id !== id));
      })
      .catch((err) => {
        //TODO Think of an error handling strategy
      });
  };

  return (
    <ScrumListContext.Provider value={{ scrums, handleSubmit, handleDelete }}>
      {children}
    </ScrumListContext.Provider>
  );
};

export default ScrumListProvider;

export const useScrumList = (): ScrumListContextValue => {
  const context = useContext(ScrumListContext);
  if (!context) throw new Error('Context must be used within <ScrumListProvider/>');
  return context;
};