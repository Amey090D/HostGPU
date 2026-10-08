// EDIT HERE: your rate card. Prices are USD per GPU per hour.
const CONFIG={
  storagePerGBMonth:0.10, outPerGB:0.01, minTopUp:5, platformFeePct:0,
  gpus:[
    {n:"RTX 3090",v:24,od:0.22,in:0.12,re:0.18,use:"Fine-tuning small models, rendering"},
    {n:"RTX 4090",v:24,od:0.34,in:0.18,re:0.28,use:"7B–30B inference, Stable Diffusion"},
    {n:"RTX 5090",v:32,od:0.69,in:0.40,re:0.55,use:"Fast inference, LoRA training"},
    {n:"L40S",v:48,od:0.60,in:0.35,re:0.48,use:"LLM inference, video generation"},
    {n:"A100 80GB",v:80,od:0.67,in:0.38,re:0.54,use:"70B inference, most fine-tuning"},
    {n:"H100 80GB",v:80,od:1.49,in:0.85,re:1.19,use:"Large-scale training, low-latency serving"},
    {n:"H200 141GB",v:141,od:2.29,in:1.35,re:1.83,use:"Very large models, long context"}
  ]};
const $=id=>document.getElementById(id), usd=x=>"$"+x.toFixed(2);
const NOTES={od:"On-demand: fixed price until you stop the instance.",in:"Interruptible: discounted spare capacity that may pause when outbid.",re:"Reserved: one-month commitment, billed up front."};
let tab="od";
function rates(){
  $("rates").innerHTML=CONFIG.gpus.map(g=>`<tr><td class="gpu">${g.n}</td><td>${g.v} GB</td><td class="price">${usd(g[tab])}</td><td style="white-space:normal">${g.use}</td><td><a class="btn rent" href="#">Rent</a></td></tr>`).join("");
  $("tabNote").textContent=NOTES[tab]+" Starting prices; live host prices may be higher.";
}
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{
  tab=b.dataset.t;document.querySelectorAll(".tabs button").forEach(x=>x.setAttribute("aria-pressed",x===b));rates();
});
CONFIG.gpus.forEach((g,i)=>$("cGpu").add(new Option(g.n,i,false,g.n==="RTX 4090")));
function calc(){
  const g=CONFIG.gpus[+$("cGpu").value],n=Math.max(1,+$("cN").value||1),h=Math.max(1,+$("cH").value||1),s=Math.max(0,+$("cS").value||0),t=$("cT").value;
  const compute=g[t]*n*h, stor=s*CONFIG.storagePerGBMonth, fee=(compute+stor)*CONFIG.platformFeePct/100, tot=compute+stor+fee;
  $("total").innerHTML=`${usd(tot)}<small>${usd(compute)} compute + ${usd(stor)} storage (1 month)</small>`;
}
["cGpu","cN","cH","cT","cS"].forEach(id=>$(id).addEventListener("input",calc));
$("fStor").textContent=usd(CONFIG.storagePerGBMonth)+" per GB per month";
$("fOut").textContent=CONFIG.outPerGB?"From "+usd(CONFIG.outPerGB)+" per GB (host-dependent)":"Free";
$("fMin").textContent="$"+CONFIG.minTopUp;
$("fFee").textContent=CONFIG.platformFeePct?CONFIG.platformFeePct+"% on top of usage":"None. Hosts set prices; you pay what's listed.";
rates();calc();
