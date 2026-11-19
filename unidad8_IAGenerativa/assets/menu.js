(function(){
 const data=window.UNIDAD8||{};const body=document.body;const root=body.dataset.root||'./', b=body.dataset.block||'', p=body.dataset.page||'';
 const home=root+'index.html';const top=document.getElementById('nav-main');
 if(top) top.innerHTML=Object.keys(data).map(k=>`<a class="nav-link ${k===b?'active':''}" href="${root}bloque-${k}/index.html">Bloque ${Number(k)}</a>`).join('');
 const side=document.getElementById('sidebar');if(side){if(!b){side.innerHTML='<h2>Bloques</h2>'+Object.keys(data).map(k=>`<a class="side-link" href="${root}bloque-${k}/index.html">${Number(k)} · ${data[k].title}</a>`).join('');}
 else {side.innerHTML=`<h2>Bloque ${Number(b)}</h2><a class="side-link" href="${root}bloque-${b}/index.html">Índice del bloque</a>`+data[b].pages.map((q,i)=>`<a class="side-link ${q.slug===p?'active':''}" href="${root}bloque-${b}/paginas/${q.slug}.html">${i+1}. ${q.title}</a>`).join('')+`<hr style="border:0;border-top:1px solid #e9e1f4;margin:15px 0"><a class="side-link" href="${home}">← Menú de la unidad</a>`;}}
})();