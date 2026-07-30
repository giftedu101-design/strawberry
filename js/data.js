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
const demoFacilities=[
 {id:"h1",beach:"haeundae",type:"샤워장",name:"해운대 중앙 샤워장 (시연용)",distance:180,price:"무료",hours:"09:00–20:00",x:42,y:38,filters:["샤워장","온수","드라이기","무료 이용","운영 중"]},
 {id:"h2",beach:"haeundae",type:"짐 보관소",name:"해운대 바다 보관소 (시연용)",distance:260,price:"3,000원부터",hours:"09:00–21:00",x:63,y:58,filters:["짐 보관소","대형 짐 보관","운영 중"]},
 {id:"g1",beach:"gwangalli",type:"화장실",name:"광안리 해변 화장실 (시연용)",distance:120,price:"무료",hours:"24시간",x:36,y:48,filters:["화장실","무료 이용","운영 중"]},
 {id:"g2",beach:"gwangalli",type:"음수대",name:"광안리 음수대 (시연용)",distance:310,price:"무료",hours:"06:00–22:00",x:69,y:34,filters:["음수대","무료 이용","운영 중"]},
 {id:"j1",beach:"songjeong",type:"샤워장",name:"송정 해변 샤워장 (시연용)",distance:210,price:"2,000원",hours:"09:00–19:00",x:48,y:36,filters:["샤워장","온수","드라이기","운영 중"]},
 {id:"j2",beach:"songjeong",type:"탈의실",name:"송정 공용 탈의실 (시연용)",distance:245,price:"무료",hours:"09:00–19:00",x:66,y:61,filters:["탈의실","무료 이용","운영 중"]},
 {id:"i1",beach:"ilgwang",type:"화장실",name:"일광 해변 화장실 (시연용)",distance:150,price:"무료",hours:"24시간",x:39,y:42,filters:["화장실","무료 이용","운영 중"]},
 {id:"i2",beach:"ilgwang",type:"샤워장",name:"일광 간이 샤워장 (시연용)",distance:290,price:"무료",hours:"09:00–18:00",x:68,y:56,filters:["샤워장","무료 이용","운영 중"]},
 {id:"s1",beach:"songdo",type:"짐 보관소",name:"송도 관광안내 보관소 (시연용)",distance:190,price:"2,000원부터",hours:"09:00–20:00",x:44,y:35,filters:["짐 보관소","대형 짐 보관","운영 중"]},
 {id:"s2",beach:"songdo",type:"음수대",name:"송도 해변 음수대 (시연용)",distance:230,price:"무료",hours:"06:00–22:00",x:65,y:62,filters:["음수대","무료 이용","운영 중"]},
 {id:"d1",beach:"dadaepo",type:"화장실",name:"다대포 공원 화장실 (시연용)",distance:170,price:"무료",hours:"24시간",x:38,y:51,filters:["화장실","무료 이용","운영 중"]},
 {id:"d2",beach:"dadaepo",type:"탈의실",name:"다대포 공용 탈의실 (시연용)",distance:330,price:"무료",hours:"09:00–19:00",x:70,y:39,filters:["탈의실","무료 이용","운영 중"]}
];

// 신고 목록은 사용자 본인이 이 브라우저에서 등록한 항목만 표시합니다.
const sampleReports=[];
