const STORAGE_KEY="badamoa_reports_v1";
const REMOVED_DEMO_IDS=new Set(["sample1","sample2","sample3"]);
const reportStore={
  get(seed=[]){try{const raw=localStorage.getItem(STORAGE_KEY);if(!raw){this.save(seed);return seed}const items=JSON.parse(raw).filter(item=>!REMOVED_DEMO_IDS.has(item.id));this.save(items);return items}catch{return seed}},
  save(items){localStorage.setItem(STORAGE_KEY,JSON.stringify(items))},
  add(item){const items=this.get();items.unshift(item);this.save(items);return items},
  remove(id){
    const items=this.get();
    const index=items.findIndex(item=>String(item.id)===String(id));
    if(index!==-1)items.splice(index,1);
    this.save(items);
    return items;
  },
  updateStatus(id,status){const items=this.get();const target=items.find(x=>x.id===id);if(target)target.status=status;this.save(items);return items}
};
// Firebase/Supabase 교체 지점: 위 get/save/add/remove/updateStatus와 같은 인터페이스의
// 원격 저장소 어댑터를 만든 뒤 app.js의 reportStore import만 바꾸면 됩니다.
