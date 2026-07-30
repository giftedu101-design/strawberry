const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let selected="haeundae",activeFilters=new Set(),reports=reportStore.get(sampleReports),photoData="",userLocation=null;
const apiPendingMode=new URLSearchParams(location.search).get("mode")==="api-pending";
const unavailableText=apiPendingMode?"연동 대기":"정보 없음";
const beachStatusText=b=>apiPendingMode?"연동 대기":b.statusText;
const beachCoordinates={haeundae:[35.1587,129.1604],gwangalli:[35.1532,129.1187],songjeong:[35.1786,129.1997],ilgwang:[35.2592,129.2333],songdo:[35.0755,129.0173],dadaepo:[35.0466,128.9657]};
const statusIcon={safe:"✓",caution:"!",danger:"×",unknown:"…"},statusLabel={received:"접수",checking:"확인 중",done:"처리 완료"};
const beachName=id=>beaches.find(b=>b.id===id)?.name||id;
function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2400)}
function distanceKm(a,b){const rad=n=>n*Math.PI/180,R=6371,dLat=rad(b[0]-a[0]),dLon=rad(b[1]-a[1]);const q=Math.sin(dLat/2)**2+Math.cos(rad(a[0]))*Math.cos(rad(b[0]))*Math.sin(dLon/2)**2;return 2*R*Math.asin(Math.sqrt(q))}
function getQuietRecommendation(){const origin=userLocation||beachCoordinates[selected];return beaches.filter(b=>b.id!==selected&&b.crowd!=="혼잡"&&b.swim!=="통제").map(b=>({...b,distance:distanceKm(origin,beachCoordinates[b.id])})).sort((a,b)=>a.distance-b.distance)[0]}
function renderRecommendation(b){
 const box=$("#aiRecommendation");
 if(b.crowd!=="혼잡"){box.classList.add("hidden");box.innerHTML="";return}
 const rec=getQuietRecommendation(),basis=userLocation?"현재 위치":"선택한 해변";
 box.classList.remove("hidden");
 box.innerHTML=`<div class="ai-mark">AI</div><div><p class="eyebrow">AI 맞춤 추천</p><h2>${rec.name}은 어떠세요?</h2><p>${basis} 기준 약 ${rec.distance.toFixed(1)}km · 혼잡도 <strong>${rec.crowd}</strong> · 입수 <strong>${rec.swim}</strong></p></div><div class="ai-actions"><button class="outline-btn" id="useMyLocation">⌖ 내 위치로 추천</button><button class="primary-btn" id="chooseRecommended">추천 해변 보기 →</button></div>`;
 $("#chooseRecommended").onclick=()=>{selected=rec.id;$("#beachSelect").value=selected;renderHome();renderFacilities();toast(`${rec.name} 정보를 표시합니다.`)};
 $("#useMyLocation").onclick=()=>getLocation(()=>{renderHome();toast("현재 위치를 기준으로 다시 추천했습니다.")});
}
function options(){const html=beaches.map(b=>`<option value="${b.id}">${b.name}</option>`).join("");$("#beachSelect").innerHTML=html;$("#reportBeach").innerHTML=html;$("#beachSelect").value=selected}
function marker(b,detail=false){return `<button class="marker ${b.status}" style="left:${b.x}%;top:${b.y}%" data-beach="${b.id}" aria-label="${b.name} ${beachStatusText(b)}"><span>${detail?"●":statusIcon[b.status]}</span></button>`}
function reportPins(){return reports.map((r,i)=>{const b=beaches.find(x=>x.id===r.beach);return `<button class="report-pin" style="left:${Math.min(94,b.x+(i%3)*3)}%;top:${Math.min(90,b.y+8+(i%2)*4)}%" data-report="${r.id}" aria-label="${beachName(r.beach)} ${r.type==="jellyfish"?"해파리":"쓰레기"} 신고">${r.type==="jellyfish"?"🪼":"♻"}</button>`}).join("")}
function renderHome(){
 const b=beaches.find(x=>x.id===selected);
 const description=apiPendingMode?"서비스 키 발급 후 실제 공공데이터가 표시됩니다.":b.desc;
 const subtext=apiPendingMode?"현재 공공데이터 API 연동 대기 중입니다.":"실시간 수치는 제공하지 않습니다. 현장 안내를 우선 확인하세요.";
 $("#statusHero").innerHTML=`<div class="status-icon">${statusIcon[b.status]}</div><div><p>${b.name} 종합 상태</p><h2>${description}</h2><p>${subtext}</p></div><span class="status-badge ${b.status}">${beachStatusText(b)}</span>`;
 const pending=unavailableText,metrics=[["🌤","기온",b.temp==null?pending:`${b.temp}°C`],["🌡","수온",b.water==null?pending:`${b.water}°C`],["🌊","파고",b.wave==null?pending:`${b.wave}m`],["🍃","풍속",b.wind==null?pending:`${b.wind}m/s`],["☀","자외선",b.uv==null?pending:String(b.uv)],["☂","강수",b.rain??pending],["♟","혼잡도",b.crowd??pending],["🏊","입수",b.swim??(apiPendingMode?pending:"현장 확인 필요")],["🪼","해파리",b.jelly??pending]];
 $("#metrics").innerHTML=metrics.map(m=>`<article class="metric"><span>${m[0]}</span><div><p>${m[1]}</p><strong>${m[2]}</strong></div></article>`).join("");
 renderRecommendation(b);
 $("#miniMap").innerHTML=beaches.map(b=>marker(b)).join("");
 $("#safetyTip").innerHTML=`<div class="tip-icon">♢</div><p class="eyebrow">SAFETY TIP</p><h2>기본 안전 수칙</h2><p>현장 안전요원의 안내와 입수 통제 표지를 가장 먼저 확인하세요.</p>`;
 bindMapButtons();
}
function renderMap(){
 $("#fullMap").innerHTML=beaches.map(b=>marker(b,true)).join("")+reportPins();
 renderMapDetail(selected);bindMapButtons();$$("[data-report]").forEach(el=>el.onclick=()=>showReport(el.dataset.report));
}
function renderMapDetail(id){const b=beaches.find(x=>x.id===id),count=reports.filter(r=>r.beach===id).length;$("#mapDetail").innerHTML=`<article class="detail-card"><div><h2>${b.name} <span class="status-badge ${b.status}">${beachStatusText(b)}</span></h2><p>${apiPendingMode?"공공데이터 API 연동 대기 중입니다.":b.desc}</p></div><div><strong>입수 ${b.swim??(apiPendingMode?unavailableText:"현장 확인 필요")}</strong><br><span>파고 ${b.wave==null?unavailableText:b.wave+"m"} · 사용자 신고 ${count}건</span></div></article>`}
function bindMapButtons(){$$("[data-beach]").forEach(el=>el.onclick=()=>{selected=el.dataset.beach;$("#beachSelect").value=selected;renderHome();renderMap();toast(`${beachName(selected)} 정보를 열었습니다.`)})}
const filters=["샤워장","탈의실","화장실","짐 보관소","음수대","온수","드라이기","대형 짐 보관","무료 이용","운영 중"];
function renderFacilities(){
 $("#facilityFilters").innerHTML=filters.map(f=>`<button class="${activeFilters.has(f)?"active":""}" data-filter="${f}">${f}</button>`).join("");
 let list=facilities.filter(f=>(f.beach===selected||selected==="haeundae")&&[...activeFilters].every(x=>f.filters.includes(x)));if(!list.length)list=facilities.filter(f=>[...activeFilters].every(x=>f.filters.includes(x)));
 $("#facilityCount").textContent=`조건에 맞는 시설 ${list.length}곳`;
 $("#facilityList").innerHTML=list.length?list.map(f=>`<article class="facility-card"><p>${f.type} · 내 위치 ${f.distance<1000?f.distance+"m":(f.distance/1000).toFixed(1)+"km"}</p><h3>${f.name}</h3><div>${f.filters.map(x=>`<span class="tag">${x}</span>`).join("")}</div><p><strong>${f.price}</strong> · ${f.hours}</p></article>`).join(""):"<p>조건에 맞는 등록 시설이 없습니다.</p>";
 $("#facilityMap").innerHTML=list.map((f,i)=>`<button class="marker safe" style="left:${f.x}%;top:${f.y}%" aria-label="${f.name}"><span>${i+1}</span></button>`).join("");
 $$("[data-filter]").forEach(el=>el.onclick=()=>{activeFilters.has(el.dataset.filter)?activeFilters.delete(el.dataset.filter):activeFilters.add(el.dataset.filter);renderFacilities()});
}
function renderReports(){
 const filter=$("#reportFilter").value,list=filter==="all"?reports:reports.filter(r=>r.type===filter);
 $("#reportList").innerHTML=list.length?list.map(r=>`<article class="report-card"><div class="report-card-head"><div><span>${r.type==="jellyfish"?"🪼 해파리":"♻ "+r.trashType}</span><h3>${beachName(r.beach)}</h3></div><span class="report-status ${r.status}">${statusLabel[r.status]}</span></div>${r.photo?`<img src="${r.photo}" alt="신고 현장 사진" style="width:100%;height:140px;object-fit:cover;border-radius:10px">`:""}<p>${new Date(r.time).toLocaleString("ko-KR")}</p><p>${r.memo}</p>${r.amount?`<span class="tag">${r.amount}</span>`:""}<div class="card-actions"><button data-show="${r.id}">⌖ 지도 보기</button><button data-status="${r.id}">↻ 상태 변경</button><button data-delete="${r.id}">🗑 삭제</button></div></article>`).join(""):"<p>등록된 신고가 없습니다.</p>";
 $$("[data-show]").forEach(x=>x.onclick=()=>showReport(x.dataset.show));$$("[data-status]").forEach(x=>x.onclick=()=>{const r=reports.find(v=>v.id===x.dataset.status),next={received:"checking",checking:"done",done:"received"}[r.status];reports=reportStore.updateStatus(r.id,next);renderReports();renderMap();toast(`상태를 '${statusLabel[next]}'로 변경했습니다.`)});$$("[data-delete]").forEach(x=>x.onclick=()=>{if(confirm("이 신고를 삭제할까요?")){reports=reportStore.remove(x.dataset.delete);renderReports();renderMap();toast("신고를 삭제했습니다.")}});
}
function showReport(id){const r=reports.find(x=>x.id===id);$("#modalContent").innerHTML=`<p class="eyebrow">REPORT DETAIL</p><h2 id="modalTitle">${r.type==="jellyfish"?"🪼 해파리":"♻ 쓰레기"} 신고</h2><p><strong>${beachName(r.beach)}</strong> · ${statusLabel[r.status]}</p><p>${new Date(r.time).toLocaleString("ko-KR")}</p><p>${r.memo}</p><p>좌표: ${r.coords||"해변 중심 위치"}</p>`;$("#modal").classList.add("open");$("#modal").setAttribute("aria-hidden","false");$("#modalClose").focus()}
function switchView(id){$$(".view").forEach(v=>v.classList.toggle("active",v.id===id));$$("[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===id));if(id==="map")renderMap();if(id==="facilities")renderFacilities();if(id==="report")renderReports();scrollTo({top:0,behavior:"smooth"})}
function setReportType(type){$("#reportType").value=type;$$("[data-report-tab]").forEach(b=>b.classList.toggle("active",b.dataset.reportTab===type));$("#trashTypeWrap").classList.toggle("hidden",type!=="trash");$("#amountWrap").classList.toggle("hidden",type!=="trash");$("#trashType").required=type==="trash";$("#amount").required=type==="trash";$("#memo").placeholder=type==="trash"?"쓰레기의 범위와 주변 상황을 자세히 알려주세요.":"해파리 크기, 색상, 마릿수를 알려주세요."}
function getLocation(onSuccess){if(!navigator.geolocation){toast("위치 기능을 지원하지 않아 선택한 해변을 기준으로 추천합니다.");return}navigator.geolocation.getCurrentPosition(p=>{userLocation=[p.coords.latitude,p.coords.longitude];onSuccess?.(p)},()=>{renderHome();toast("위치 권한이 없어 선택한 해변을 기준으로 추천합니다.")},{timeout:7000})}
function loadData(){renderHome()}
try{
 if(apiPendingMode)$("#serviceMode").innerHTML="<i></i> 공공데이터 API 연동 대기 중";
 options();renderHome();renderFacilities();renderMap();renderReports();loadData();
}catch(error){
 console.error("바다모아 초기화 오류:",error);
 const hero=document.querySelector("#statusHero");
 if(hero)hero.innerHTML=`<div class="load-error"><h2>바다 정보를 표시하지 못했어요.</h2><p>페이지를 새로고침해 주세요.</p><button class="outline-btn" onclick="location.reload()">↻ 다시 시도</button></div>`;
}
$$("[data-view]").forEach(b=>b.onclick=()=>switchView(b.dataset.view));$("#beachSelect").onchange=e=>{selected=e.target.value;renderHome();renderFacilities()};$("#retryBtn").onclick=()=>{loadData();toast("최신 정보로 갱신했습니다.")};$("#locateBtn").onclick=()=>getLocation(()=>{renderHome();toast("현재 위치를 AI 추천에 반영했습니다.")});$("#reportLocate").onclick=()=>getLocation(p=>{$("#coords").value=`${p.coords.latitude.toFixed(5)},${p.coords.longitude.toFixed(5)}`;toast("현재 위치를 입력했습니다.")});$$("[data-report-tab]").forEach(b=>b.onclick=()=>setReportType(b.dataset.reportTab));$("#reportFilter").onchange=renderReports;
$("#photo").onchange=e=>{const f=e.target.files[0];if(!f)return;if(f.size>2*1024*1024){toast("사진은 2MB 이하만 가능합니다.");e.target.value="";return}const rd=new FileReader();rd.onload=()=>{photoData=rd.result;$("#photoPreview").innerHTML=`<img src="${photoData}" alt="선택한 신고 사진 미리보기">`};rd.readAsDataURL(f)};
$("#reportForm").onsubmit=e=>{e.preventDefault();const type=$("#reportType").value,memo=$("#memo").value.trim(),time=$("#reportTime").value;if(!time||memo.length<5||(type==="trash"&&(!$("#trashType").value||!$("#amount").value))){$("#formError").textContent="필수 항목을 확인하고 설명을 5자 이상 입력해 주세요.";return}const uniqueId=globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2,10)}`;const item={id:uniqueId,type,beach:$("#reportBeach").value,time,memo,status:"received",coords:$("#coords").value,photo:photoData,trashType:$("#trashType").value,amount:$("#amount").value};reports=reportStore.add(item);e.target.reset();photoData="";$("#photoPreview").innerHTML="<span>📷</span><p>발견 현장 사진</p><small>JPG, PNG · 최대 2MB</small>";$("#formError").textContent="";setReportType(type);renderReports();renderMap();toast("신고가 접수되었습니다. 감사합니다!")};
$("#modalClose").onclick=()=>{$("#modal").classList.remove("open");$("#modal").setAttribute("aria-hidden","true")};$("#modal").onclick=e=>{if(e.target===$("#modal"))$("#modalClose").click()};document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$("#modal").classList.contains("open"))$("#modalClose").click()});
$("#reportTime").value=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,16);
