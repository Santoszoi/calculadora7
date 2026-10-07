const display=document.querySelector('#display');let expression='';
const allowed=/^[0-9+\-*/.()\s]+$/;
function render(value=expression||'0'){display.textContent=value.replaceAll('*','×').replaceAll('/','÷');}
function append(value){if(value==='.'&&/(^|[+\-*/])\d*\.$/.test(expression))return;expression+=value;render();}
function clear(){expression='';render();}
function backspace(){expression=expression.slice(0,-1);render();}
function calculate(){if(!expression.trim()||!allowed.test(expression))return;try{const result=Function('"use strict";return ('+expression+')')();if(!Number.isFinite(result))throw new Error();expression=String(Math.round((result+Number.EPSILON)*1e10)/1e10);render();}catch{expression='';render('Erro');}}
document.querySelector('.keys').addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;if(button.dataset.value)append(button.dataset.value);if(button.dataset.action==='clear')clear();if(button.dataset.action==='backspace')backspace();if(button.dataset.action==='calculate')calculate();});
addEventListener('keydown',e=>{if(/[0-9.+\-*/]/.test(e.key)&&e.key.length===1)append(e.key);else if(e.key==='Enter'||e.key==='=')calculate();else if(e.key==='Backspace')backspace();else if(e.key==='Escape')clear();});render();