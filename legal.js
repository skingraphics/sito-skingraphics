// Pagine legali (Privacy / Cookie): testo dal pannello (sezione "legal"), con copia di riserva in seed.js
(function(){
const doc=document.body.dataset.doc,CFG=window.SITO_CONFIG||{},esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const inl=s=>esc(s).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(m,t,u)=>`<a href="${u}"${/^https?:/.test(u)?' target="_blank" rel="noopener"':''}>${t}</a>`).replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
function md(src){const L=String(src||'').replace(/\r/g,'').split('\n');let h='',i=0;
 while(i<L.length){const l=L[i];
  if(!l.trim()){i++;continue}
  let m=l.match(/^(#{1,4})\s+(.*)/);if(m){const n=Math.min(4,m[1].length+0);h+=`<h${n}>${inl(m[2])}</h${n}>`;i++;continue}
  if(/^\s*\|/.test(l)){const rows=[];while(i<L.length&&/^\s*\|/.test(L[i])){rows.push(L[i]);i++}
   const cells=r=>r.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim());const body=rows.filter(r=>!/^\s*\|[\s:|-]+\|\s*$/.test(r));
   h+='<div class="tw"><table><thead><tr>'+cells(body[0]).map(c=>`<th>${inl(c)}</th>`).join('')+'</tr></thead><tbody>'+body.slice(1).map(r=>'<tr>'+cells(r).map(c=>`<td>${inl(c)}</td>`).join('')+'</tr>').join('')+'</tbody></table></div>';continue}
  if(/^\s*[-*]\s+/.test(l)){h+='<ul>';while(i<L.length&&/^\s*[-*]\s+/.test(L[i])){h+=`<li>${inl(L[i].replace(/^\s*[-*]\s+/,''))}</li>`;i++}h+='</ul>';continue}
  if(/^\s*\d+\.\s+/.test(l)){h+='<ol>';while(i<L.length&&/^\s*\d+\.\s+/.test(L[i])){h+=`<li>${inl(L[i].replace(/^\s*\d+\.\s+/,''))}</li>`;i++}h+='</ol>';continue}
  let p=[];while(i<L.length&&L[i].trim()&&!/^(#{1,4}\s|\s*\||\s*[-*]\s|\s*\d+\.\s)/.test(L[i])){p.push(L[i]);i++}h+=`<p>${inl(p.join(' '))}</p>`}
 return h}
function show(data){const d=data||{};const txt=doc==='cookie'?d.cookie:d.privacy;const upd=d.updated?`<p class="upd">Ultimo aggiornamento: ${esc(d.updated)}</p>`:'';
 document.getElementById('legal').innerHTML=(txt?md(txt):'<p>Testo non ancora disponibile.</p>')+upd;
 const t=(document.querySelector('#legal h2')||{}).textContent;if(t)document.title=t+' — Skingraphics'}
const seed=()=>((window.SITO_SEED||[]).find(r=>r.key==='legal')||{}).data;
let pv=null;if(new URLSearchParams(location.search).get('preview'))try{pv=JSON.parse(localStorage.getItem('sito_preview')||'null')}catch(e){}
if(pv&&Array.isArray(pv)&&pv.find(r=>r.key==='legal')){show(pv.find(r=>r.key==='legal').data);return}
fetch(`${CFG.supabaseUrl}/rest/v1/sito_content?select=data&key=eq.legal`,{headers:{apikey:CFG.supabaseKey,Authorization:`Bearer ${CFG.supabaseKey}`}})
 .then(r=>r.ok?r.json():Promise.reject()).then(j=>show(j&&j[0]?j[0].data:seed())).catch(()=>show(seed()));
})();
