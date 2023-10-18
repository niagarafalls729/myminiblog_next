"use client";
import Button from "@mui/material/Button";
import { axiosGet } from "@/api/main";
import axios from "axios";
export default function page() {
  // const inputData = [
  //     {"company":"MDS테크","company_from_to":"05/16/2022~재직중","project":null,"project_from_to":"01/01/1970~진행중","desc":null,"stack":null,"work":null},
  //     {"company":"한국비즈넷","company_from_to":"09/16/2019~11/15/2022","project":"a","project_from_to":"01/01/1970~진행중","desc":"a","stack":"a","work":"a"},
  //     {"company":"한국비즈넷","company_from_to":"09/16/2019~11/15/2022","project":"b","project_from_to":"01/01/1970~진행중","desc":null,"stack":null,"work":null}
  //   ];

  //   // 그룹화된 결과를 저장할 빈 배열
  //   const groupedData = [];

  //   // 회사별로 그룹화
  //   const groups = {};
  //   for (const item of inputData) {
  //     if (!groups[item.company]) {
  //       groups[item.company] = {
  //         company: item.company,
  //         company_from_to: item.company_from_to,
  //         projects: []
  //       };
  //     }

  //     // 프로젝트 정보 추가 (프로젝트가 null이 아닐 때만)
  //     if (item.project !== null) {
  //       groups[item.company].projects.push({
  //         project: item.project,
  //         project_from_to: item.project_from_to,
  //         desc: item.desc,
  //         stack: item.stack,
  //         work: item.work
  //       });
  //     }
  //   }

  //   // 그룹화된 데이터를 배열로 변환
  //   for (const groupName in groups) {
  //     groupedData.push(groups[groupName]);
  //   }

  //   console.log(groupedData);

  const getJSON = () => {
    const rs = axiosGet("main");
    console.log("rs", rs);
  };
  const getAxsios = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/main",
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>myGdddddit</h1>
      <Button variant="contained" onClick={getJSON}>
        Contained
      </Button>
      <Button variant="contained" onClick={getAxsios}>
        Contained
      </Button>
    </>
  );
}
