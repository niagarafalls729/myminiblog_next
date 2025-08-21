'use client';

import { useEffect, useState } from 'react';
import { getPost } from '@/api/baseGet';
import dayjs from 'dayjs';
import { setWeather } from '@/redux/features/weatherSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function Weather() {
  const dispatch = useAppDispatch();
  const [isWeather, setIsWeather] = useState('');
  const [isCity, setIsCity] = useState('');

  const reduxCity = useAppSelector(state => state.weather.city);
  const reduxWeather = useAppSelector(state => state.weather.weather);
  const reduxDate = useAppSelector(state => state.weather.date);
  const formattedDate = dayjs().format('M월 D일');
  useEffect(() => {
    console.log(
      'Weather useEffect - reduxDate:',
      reduxDate,
      'formattedDate:',
      formattedDate
    );
    const missingCity = !reduxCity || reduxCity === '';
    const missingWeather =
      !reduxWeather ||
      (typeof reduxWeather === 'string' && reduxWeather === '') ||
      (typeof reduxWeather === 'object' && !reduxWeather.description);

    if (reduxDate !== formattedDate || missingCity || missingWeather) {
      console.log('getWeather');
      getWeather();
    } else {
      console.log('noGetWeather, Reuse existing values');
      setIsWeather(reduxWeather || '');
      setIsCity(reduxCity || '');
    }
  }, [reduxDate, reduxCity, reduxWeather, formattedDate]);

  // 스토어 값이 나중에 리하이드레이션되거나 갱신될 때도 로컬 상태 동기화
  useEffect(() => {
    setIsWeather(reduxWeather || '');
    setIsCity(reduxCity || '');
  }, [reduxWeather, reduxCity]);
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
    } catch (error) {
      console.error('getWeather error:', error);
    }
  };
  return (
    <>
      <>
        지금 방문하신 {isCity}
        <br />
        {formattedDate} 날씨는 {isWeather?.description} !
        <br />
        좋은 하루 되세요!
      </>
    </>
  );
}
