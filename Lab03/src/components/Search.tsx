import React, { FC, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocationList } from '../contexts/location/LocationList';

import { setAlert } from '../store/actions/alertActions';
import { addLocation } from '../store/actions/locationActions';
import { getWeather, setLoading } from '../store/actions/weatherAction';
import { locationReducer } from './../store/reducers/locationsReducer';
import { LocationState } from './../store/types'



interface SearchProps {
  title: string;
}


const Search: FC<SearchProps> = ({ title }) => {
  const { locations, handleSubmit } = useLocationList()

  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  //const locations = useSelector<LocationState, LocationState["locations"]>((state) => state.locations)

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  }

  // 
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addEachLocation(city)

    if (city.trim() === '') {
      return dispatch(setAlert('City is required!'));
    }

    dispatch(setLoading());

    dispatch(getWeather(city));
    handleSubmit(city);
    setCity('');

  }
  const addEachLocation = (note: string) => {
    console.log("add Location z search")
    dispatch(addLocation(city));
  }

  return (
    <div className="hero is-light has-text-centered" style={{ height: "260px" }}>
      <div className="hero-body">
        <div className="container" >
          <h1 className="title">{title}</h1>
          <form className="py-5" onSubmit={submitHandler}>
            <input
              type="text"
              className="input has-text-centered mb-2"
              placeholder="Enter city name"
              style={{ maxWidth: 300 }}
              value={city}
              onChange={changeHandler}
            />
            <button className="button is-primary is-fullwidth" style={{ maxWidth: 300, margin: '0 auto' }}>Search</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Search;