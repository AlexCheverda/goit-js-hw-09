!function(){var e=document.querySelector("body"),t=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]");t.addEventListener("click",(function(){t.disabled=!0,a.disabled=!1,n=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));e.style.background=t}),1e3)})),a.addEventListener("click",(function(){t.disabled=!1,a.disabled=!0,clearInterval(n)}));var n=null}();
//# sourceMappingURL=01-color-switcher.bd7e1049.js.map
