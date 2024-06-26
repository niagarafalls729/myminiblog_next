'use client';

import { useEffect, useState } from 'react';
import { getPost } from '@/api/baseGet';
import dayjs from 'dayjs';
import { setWeather } from '@/redux/features/weatherSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function Weather() {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();
  const [isWeather, setIsWeather] = useState('');
  const [isCity, setIsCity] = useState('');

  const reduxCity = useAppSelector(state => state.weather.city);
  const reduxWeather = useAppSelector(state => state.weather.weather);
  const reduxDate = useAppSelector(state => state.weather.date);
  const formattedDate = dayjs().format('M월 D일');
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (isMounted) {
      if (
        reduxDate !== formattedDate ||
        (reduxWeather == '' && reduxCity == '')
      ) {
        console.log('getWeather');
        getWeather();
      } else {
        console.log('noGetWeather, Reuse existing values');

        setIsWeather(reduxWeather);
        setIsCity(reduxCity);
      }
    }
  }, [reduxDate, isMounted]);
  const getWeather = async () => {
    try {
      const token = { key: process.env.NEXT_PUBLIC_WEATHER };
      const res = await getPost('weather', token);
      setIsWeather(res.weather[0]);
      setIsCity(res.city);
      dispatch(
        setWeather({
          city: res.city,
          weather: res.weather[0],
          date: formattedDate,
        })
      );
    } catch (error) {}
  };
  return (
    <>
      {isMounted && (
        <>
          지금 방문하신 {isCity}
          <br />
          {formattedDate} 날씨는 {isWeather.description} !
          <br />
          좋은 하루 되세요!
        </>
      )}
    </>
  );
}
