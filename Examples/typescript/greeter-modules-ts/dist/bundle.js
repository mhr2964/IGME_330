(()=>{"use strict";var e=function(e,t,c){var n=t||"Mr. X",r="".concat(e," ").concat(n);return c?"".concat(r.toUpperCase(),"!"):r},t=document.querySelector("#input-firstname"),c=document.querySelector("#output"),n=document.querySelector("#cb-forcefully"),r=document.querySelector("#btn-hello"),o=document.querySelector("#btn-goodbye"),u=n.checked;n.onchange=function(e){return u=e.target.checked},r.onclick=function(){return c.innerHTML=e("Hello",t.value.trim(),u)},o.onclick=function(){return c.innerHTML=e("Goodbye",t.value.trim(),u)}})();
//# sourceMappingURL=bundle.js.map