'use client';
import { useState, useEffect } from 'react';
import { axiosGet } from '@/api/baseGet';
import { Router } from 'next/router';
import Image from 'next/image';

export default function detail() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({});
  console.log(Router.prototype);
  useEffect(() => {
    setMounted(true);
    myAPI();
  }, []);

  const myAPI = async () => {
    try {
      const res = await axiosGet('guestBook', { index: '1' });
      // API 호출에서 데이터를 가져온 후 rows 배열에 추가
      setForm(res[0]);
      console.log(res);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <>
      {form.id},{form.title},
      <div width={300} height={300}>
        {form.contents}
        <div dangerouslySetInnerHTML={{ __html: form.contents }} />
      </div>
    </>
  );
}
