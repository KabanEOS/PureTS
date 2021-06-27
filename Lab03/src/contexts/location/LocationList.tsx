import React, { createContext, useContext, useState } from 'react';

import { WeatherData } from '../../store/types';

const REACT_APP_API_KEY: string = `53679c5a6a3c85f14ad084fca6a9425f`

interface props {
  children?: React.ReactNode;
}

interface LocationListContextValue {
  locations: WeatherData[];
  handleSubmit: (city: string) => Promise<void> | (() => void);
  handleDelete: (id: number) => Promise<void> | (() => void);
}

const LocationListContext = createContext<LocationListContextValue>({
  locations: [],
  handleSubmit: () => () => { },
  handleDelete: () => () => { },
});

const LocationListProvider = ({ children }: props): JSX.Element => {
  var [locations, setLocations] = useState<WeatherData[]>([]);

  const handleDelete = async (id: number): Promise<void> => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const handleSubmit = async (city: string) => {

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${REACT_APP_API_KEY}`);

    const resData: WeatherData = await res.json();

    setLocations(() => [
      ...locations,
      resData
    ]);
    localStorage.setItem('cachesLocations', JSON.stringify(locations));
  };

  return (
    <LocationListContext.Provider value={{
      locations,
      handleSubmit,
      handleDelete,
    }}>
      {children}
    </LocationListContext.Provider>
  );
};

export default LocationListProvider;

export const useLocationList = (): LocationListContextValue => {
  const context = useContext(LocationListContext);
  if (!context) throw new Error('Context must be used within <LocationListProvider/>');
  return context;
};


