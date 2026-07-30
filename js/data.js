// 실시간 운영 정보는 임의 값으로 채우지 않습니다.
// null 값은 화면에서 "정보 없음" 또는 "현장 확인 필요"로 표시됩니다.
const beaches=[
 {id:"haeundae",name:"해운대 해수욕장",x:78,y:25,status:"unknown",statusText:"정보 없음",temp:null,water:null,wave:null,wind:null,uv:null,rain:null,crowd:null,swim:null,jelly:null,desc:"안전요원과 현장 안내판에서 현재 상태를 확인하세요."},
 {id:"gwangalli",name:"광안리 해수욕장",x:61,y:40,status:"unknown",statusText:"정보 없음",temp:null,water:null,wave:null,wind:null,uv:null,rain:null,crowd:null,swim:null,jelly:null,desc:"안전요원과 현장 안내판에서 현재 상태를 확인하세요."},
 {id:"songjeong",name:"송정 해수욕장",x:89,y:17,status:"unknown",statusText:"정보 없음",temp:null,water:null,wave:null,wind:null,uv:null,rain:null,crowd:null,swim:null,jelly:null,desc:"안전요원과 현장 안내판에서 현재 상태를 확인하세요."},
 {id:"ilgwang",name:"일광 해수욕장",x:95,y:8,status:"unknown",statusText:"정보 없음",temp:null,water:null,wave:null,wind:null,uv:null,rain:null,crowd:null,swim:null,jelly:null,desc:"안전요원과 현장 안내판에서 현재 상태를 확인하세요."},
 {id:"songdo",name:"송도 해수욕장",x:37,y:63,status:"unknown",statusText:"정보 없음",temp:null,water:null,wave:null,wind:null,uv:null,rain:null,crowd:null,swim:null,jelly:null,desc:"안전요원과 현장 안내판에서 현재 상태를 확인하세요."},
 {id:"dadaepo",name:"다대포 해수욕장",x:16,y:78,status:"unknown",statusText:"정보 없음",temp:null,water:null,wave:null,wind:null,uv:null,rain:null,crowd:null,swim:null,jelly:null,desc:"안전요원과 현장 안내판에서 현재 상태를 확인하세요."}
];

// 편의시설은 이 파일에 직접 등록하며, 운영 정보는 방문 전 현장에서 확인해야 합니다.
const facilities=[];

// 신고 목록은 사용자 본인이 이 브라우저에서 등록한 항목만 표시합니다.
const sampleReports=[];
