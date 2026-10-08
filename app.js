// Sample data. Replace with a fetch() to your API for live offers.
const OFFERS=[
 {gpu:"H100 SXM",vram:80,perf:100,loc:"Texas, US",rel:99.4,price:1.89},
 {gpu:"H100 SXM",vram:80,perf:98,loc:"Frankfurt, DE",rel:98.1,price:1.74},
 {gpu:"A100 80GB",vram:80,perf:70,loc:"Iowa, US",rel:99.1,price:0.89},
 {gpu:"A100 80GB",vram:80,perf:68,loc:"Tokyo, JP",rel:96.5,price:0.78},
 {gpu:"A100 40GB",vram:40,perf:60,loc:"Amsterdam, NL",rel:97.8,price:0.62},
 {gpu:"L40S",vram:48,perf:58,loc:"Virginia, US",rel:98.7,price:0.55},
 {gpu:"RTX 4090",vram:24,perf:52,loc:"Warsaw, PL",rel:97.2,price:0.34},
 {gpu:"RTX 4090",vram:24,perf:52,loc:"California, US",rel:99.0,price:0.41},
 {gpu:"RTX 3090",vram:24,perf:36,loc:"Helsinki, FI",rel:95.3,price:0.19},
 {gpu:"RTX 3060",vram:12,perf:18,loc:"Seoul, KR",rel:94.0,price:0.16}
];
const $=id=>document.getElementById(id);
const models=[...new Set(OFFERS.map(o=>o.gpu))];
models.forEach(m=>$("fModel").add(new Option(m,m)));

function render(){
  const m=$("fModel").value, v=+$("fVram").value, s=$("fSort").value;
  const rows=OFFERS.filter(o=>(!m||o.gpu===m)&&o.vram>=v).sort((a,b)=>
    s==="price"?a.price-b.price:s==="perf"?b.perf-a.perf:b.rel-a.rel);
  $("offers").innerHTML=rows.length?rows.map(o=>`<tr>
    <td class="gpu">${o.gpu}</td><td>${o.vram} GB</td><td>${o.loc}</td>
    <td><span class="rel"><i class="${o.rel<96?'mid':''}"></i>${o.rel}%</span></td>
    <td class="price">$${o.price.toFixed(2)}</td>
    <td><a class="btn rent" href="#">Rent</a></td></tr>`).join("")
    :`<tr><td colspan="6">No GPUs match these filters. Try a lower VRAM minimum.</td></tr>`;
}
["fModel","fVram","fSort"].forEach(id=>$(id).addEventListener("change",render));
render();

const PRICES=[["HostGPU",1.49,1],["RunPod Community",1.99,0],["RunPod Secure",2.89,0],["Lambda",3.99,0]];
const max=Math.max(...PRICES.map(p=>p[1]));
$("bars").innerHTML=PRICES.map(([n,p,us])=>`<div class="bar${us?' us':''}"><span>${n}</span><div><b style="width:${p/max*100}%"></b></div><em>$${p.toFixed(2)}</em></div>`).join("");

$("hostForm").addEventListener("submit",e=>{
  e.preventDefault();
  // TODO: POST new FormData(e.target) to your backend or form service.
  $("formMsg").textContent="Thanks, you're on the list. We'll email you soon.";
  e.target.reset();
});
document.querySelectorAll("#menu a").forEach(a=>a.addEventListener("click",()=>document.body.classList.remove("open")));
