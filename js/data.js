// 해수욕장 이름과 지도 배치를 제외한 운영 정보는 실제 API 연결 전까지
// 임의 값으로 채우지 않습니다. null은 화면에서 "연동 대기"로 표시됩니다.
const beaches=[
 {id:"haeundae",name:"해운대 해수욕장",x:78,y:25,status:"unknown",statusText:"연동 대기",temp:null,water:null,wave:null,wind:null,uv:null,rain:null,crowd:null,swim:null,jelly:null,desc:"공공데이터 API 연결 후 현재 상태가 표시됩니다."},
 {id:"gwangalli",name:"광안리 해수욕장",x:61,y:40,status:"unknown",statusText:"연동 대기",temp:null,water:null,wave:null,wind:null,uv:null,rain:null,crowd:null,swim:null,jelly:null,desc:"공공데이터 API 연결 후 현재 상태가 표시됩니다."},
 {id:"songjeong",name:"송정 해수욕장",x:89,y:17,status:"unknown",statusText:"연동 대기",temp:null,water:null,wave:null,wind:null,uv:null,rain:null,crowd:null,swim:null,jelly:null,desc:"공공데이터 API 연결 후 현재 상태가 표시됩니다."},
 {id:"ilgwang",name:"일광 해수욕장",x:95,y:8,status:"unknown",statusText:"연동 대기",temp:null,water:null,wave:null,wind:null,uv:null,rain:null,crowd:null,swim:null,jelly:null,desc:"공공데이터 API 연결 후 현재 상태가 표시됩니다."},
 {id:"songdo",name:"송도 해수욕장",x:37,y:63,status:"unknown",statusText:"연동 대기",temp:null,water:null,wave:null,wind:null,uv:null,rain:null,crowd:null,swim:null,jelly:null,desc:"공공데이터 API 연결 후 현재 상태가 표시됩니다."},
 {id:"dadaepo",name:"다대포 해수욕장",x:16,y:78,status:"unknown",statusText:"연동 대기",temp:null,water:null,wave:null,wind:null,uv:null,rain:null,crowd:null,swim:null,jelly:null,desc:"공공데이터 API 연결 후 현재 상태가 표시됩니다."}
];

// 실제 부산시 편의시설 API 연결 전에는 시설을 표시하지 않습니다.
const facilities=[];

// 신고 목록은 사용자 본인이 이 브라우저에서 등록한 항목만 표시합니다.
const sampleReports=[];
