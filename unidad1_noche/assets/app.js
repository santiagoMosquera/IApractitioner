(() => {
  document.querySelectorAll('.question[data-quiz="revisable"]').forEach(q => {
    const opts=Array.from(q.querySelectorAll('.opt'));
    const review=q.querySelector('.review-answer');
    const retry=q.querySelector('.retry-answer');
    const feedback=q.querySelector('.feedback');
    const correct=Number(q.dataset.correct);
    let chosen=-1;
    const reset=()=>{
      chosen=-1;
      opts.forEach(b=>{b.disabled=false;b.classList.remove('selected','correct','wrong');b.setAttribute('aria-pressed','false')});
      review.disabled=true;
      feedback?.classList.remove('show');
      const heading=feedback?.querySelector('strong');if(heading)heading.textContent='';
    };
    opts.forEach((b,i)=>b.addEventListener('click',()=>{
      if(b.disabled)return;
      chosen=i;
      opts.forEach((x,j)=>{x.classList.toggle('selected',j===i);x.classList.remove('correct','wrong');x.setAttribute('aria-pressed',String(j===i))});
      review.disabled=false;feedback?.classList.remove('show');
    }));
    review.addEventListener('click',()=>{
      if(chosen<0)return;
      opts.forEach((b,i)=>{b.disabled=chosen===correct;b.classList.remove('selected');b.classList.toggle('correct',chosen===correct&&i===correct);b.classList.toggle('wrong',i===chosen&&i!==correct)});
      const heading=feedback?.querySelector('strong');
      if(heading)heading.textContent=chosen===correct?'¡Correcto!':'Esta opción no corresponde al caso. Vuelve a intentarlo.';
      const explanation=feedback?.querySelector('.answer-explanation');
      if(explanation)explanation.textContent=chosen===correct?(q.dataset.rightExplanation||'Bien razonado.'):(JSON.parse(q.dataset.wrongExplanations||'[]')[chosen]||'Revisa qué resuelve el concepto que seleccionaste.');
      const clue=feedback?.querySelector('.answer-clue');if(clue)clue.style.display=chosen===correct?'':'none';
      feedback?.classList.add('show');review.disabled=true;
    });
    retry.addEventListener('click',reset);
  });
  document.addEventListener('keydown',e=>{
    if(e.target.closest('button,input,textarea,select,a'))return;
    if(e.key==='ArrowRight'){const a=document.getElementById('next');if(a)location.href=a.href;}
    if(e.key==='ArrowLeft'){const a=document.getElementById('prev');if(a)location.href=a.href;}
  });
})();
