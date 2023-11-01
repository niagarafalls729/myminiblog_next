import qs from 'qs';
import axios from 'axios';

const BASE_API_URL = `${process.env.NEXT_PUBLIC_API_KEY}`;

export async function axiosGetMain(restUrl, payload = {}) {
  const params = new URLSearchParams(qs.stringify(payload));
  const cleaned = String(params);
  const url = BASE_API_URL + restUrl + '?' + encodeURIComponent(cleaned);
  console.log('url', url);
  try {
    const response = await axios.get(url);
    // console.log('re', JSON.stringify(response.data));
    const inputData = response.data;

    // 그룹화된 결과를 저장할 빈 배열
    const groupedData = [];

    // 회사별로 그룹화
    const groups = {};
    for (const item of inputData) {
      if (!groups[item.company]) {
        groups[item.company] = {
          company: item.company,
          company_from_to: item.company_from_to,
          projects: [],
        };
      }

      // 프로젝트 정보 추가 (프로젝트가 null이 아닐 때만)
      if (item.project !== null) {
        groups[item.company].projects.push({
          project: item.project,
          project_from_to: item.project_from_to,
          desc: item.desc,
          stack: item.stack,
          work: item.work,
        });
      }
    }

    // 그룹화된 데이터를 배열로 변환
    for (const groupName in groups) {
      groupedData.push(groups[groupName]);
    }

    console.log(groupedData);

    return groupedData;
  } catch (error) {
    throw error;
  }
}
export async function axiosGet(restUrl, payload = {}) {
  console.log('payload', payload);
  const params = new URLSearchParams(qs.stringify(payload));
  [...params.entries()].forEach(([key, value]) => {
    if (!value) {
      params.delete(key);
    }
  });
 

  const cleaned = String(params);
  const url = BASE_API_URL + restUrl + '?' + params.toString();

  try {
    console.log('url', url);
    const response = await axios.get(url);
    // console.log('re', JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function savePost(restUrl, payload = {}) {
  if(restUrl.indexOf('/')=== 0){
    restUrl= restUrl.substr(1)
  }
  const url = BASE_API_URL + restUrl;

  try {
    const response = await axios.post(url, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw new Error('Failed to make the API request');
  }
}
export async function getPost(restUrl, payload = {}) {
  const url = BASE_API_URL + restUrl;

  try {
    const response = await axios.post(url, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('Response data:', JSON.stringify(response.data));
    return response.data[0];
  } catch (error) {
    console.error('API Request Error:', error);
    throw new Error('Failed to make the API request');
  }
}

export async function saveBlob(restUrl, formData) {
  const url = BASE_API_URL + restUrl;

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 이미지 업로드를 위한 Content-Type
      },
    });

    console.log('Response data:', JSON.stringify(response.data));
    return response.data; // 이미지 업로드 후 서버에서 받은 데이터를 반환
  } catch (error) {
    console.error('API Request Error:', error);
    throw new Error('Failed to make the API request');
  }
}
