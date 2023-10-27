'use client';
import styles from './career.module.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { axiosGetMain } from '@/api/baseGet';
import axios from 'axios';

import Button from '@mui/material/Button';
import { useState, useEffect, forwardRef } from 'react';
import React from 'react';
 
export default function Test() {  
  const one = async () => {
    const response = await axios.get('http://138.2.119.188:4000/guestBook');
      console.log(response.data); // 서버로부터 받은 데이터 출력
  }
  const two = async () => {
    const response = await axios.get('http://localhost:4000/guestBook');
      console.log(response.data); // 서버로부터 받은 데이터 출력
  }
  const three = async () => {
    const response = await axios.get('http://127.0.0.1:4000/guestBook');
      console.log(response.data); // 서버로부터 받은 데이터 출력
  } 
  return (
    <>
       <Button type='button'  onClick={one}>dddd</Button>
                  <Button type='button' onClick={two}>dddd</Button>
                  <Button type='button' onClick={three}>dddd</Button> 
 
    </>
  );
}
