
let deferredPrompt;
window.addEventListener('beforeinstallprompt',(e)=>{e.preventDefault();deferredPrompt=e;
const b=document.createElement('div');b.innerHTML='<div style="position:fixed;bottom:10px;left:10px;right:10px;background:#111;color:#fff;padding:15px;border-radius:18px;z-index:9999">📲 Install TASHINI HOTEL <button id=i style="float:right;background:#d4af37;border:none;padding:8px 12px;border-radius:8px">Install</button></div>';document.body.appendChild(b);document.getElementById('i').onclick=async()=>{deferredPrompt.prompt();};
});
if('serviceWorker' in navigator){navigator.serviceWorker.register('./service-worker.js')}
