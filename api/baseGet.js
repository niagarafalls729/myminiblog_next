import qs from "qs";
import axios from "axios";

export async function axiosGet(restUrl, payload = {}) {
  const params = new URLSearchParams(qs.stringify(payload));
  const cleaned = String(params);
  const url =
    "http://localhost:4000/" + restUrl + "?" + encodeURIComponent(cleaned);

  try {
    const response = await axios.get(url);
    console.log("re", JSON.stringify(response.data));
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
