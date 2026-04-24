import { useState, useEffect, useRef } from "react";

const NAVY = "#0d1f5c";
const ORANGE = "#f7931a";
const LIGHT = "#fff7ee";
const GRAY = "#f4f6fb";
const GREEN = "#10b981";
const ADMIN_PIN = "6098";

const CATEGORIES = [
  { id:"all", label:"All Products" },
  { id:"Fashion", label:"Fashion" },
  { id:"Electronics", label:"Electronics" },
  { id:"Kitchen", label:"Kitchen" },
  { id:"Beauty", label:"Beauty" },
  { id:"Sports", label:"Sports" },
];

const PRODUCTS = [
  { id:1, name:"Premium Hijab Set", category:"Fashion", price:15.99, oldPrice:22.00, cost:4.50, stock:120, rating:4.8, reviews:124, badge:"Best Seller", isNew:false, description:"A breathable, elegant hijab set available in 12 beautiful colors — perfect for daily wear in any weather.", image:"https://images.unsplash.com/photo-1557744813-13da6e91f41f?w=600&q=80" },
  { id:2, name:"Solar Power Bank 20000mAh", category:"Electronics", price:45.00, oldPrice:60.00, cost:12.00, stock:85, rating:4.6, reviews:89, badge:"Popular", isNew:false, description:"High-capacity 20000mAh power bank with dual USB ports — charge your devices anywhere, anytime.", image:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80" },
  { id:3, name:"Insulated Thermos Flask", category:"Kitchen", price:18.50, oldPrice:null, cost:5.00, stock:200, rating:4.7, reviews:203, badge:"", isNew:false, description:"Premium vacuum-insulated flask that keeps beverages hot or cold for 24 hours.", image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80" },
  { id:4, name:"Wireless Earbuds Pro", category:"Electronics", price:32.00, oldPrice:45.00, cost:9.00, stock:150, rating:4.5, reviews:67, badge:"New", isNew:true, description:"Compact wireless earbuds with crystal-clear sound and 6-hour battery life.", image:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80" },
  { id:5, name:"Abaya Modest Dress", category:"Fashion", price:28.00, oldPrice:38.00, cost:8.00, stock:90, rating:4.9, reviews:156, badge:"Top Rated", isNew:false, description:"Elegant full-length abaya in premium lightweight fabric — designed for comfort and modesty.", image:"https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&q=80" },
  { id:6, name:"Stainless Steel Cookware Set", category:"Kitchen", price:55.00, oldPrice:75.00, cost:18.00, stock:60, rating:4.6, reviews:44, badge:"", isNew:false, description:"Durable 5-piece stainless steel cookware set — compatible with all stove types.", image:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" },
  { id:7, name:"Portable Blender", category:"Kitchen", price:24.00, oldPrice:32.00, cost:7.00, stock:110, rating:4.4, reviews:38, badge:"New", isNew:true, description:"Compact USB-rechargeable blender — perfect for smoothies, juices and shakes on the go.", image:"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80" },
  { id:8, name:"Smartwatch Fitness Band", category:"Electronics", price:38.00, oldPrice:52.00, cost:11.00, stock:75, rating:4.3, reviews:92, badge:"Popular", isNew:false, description:"Track steps, heart rate and sleep with this sleek waterproof smartwatch.", image:"https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80" },
  { id:9, name:"Prayer Mat Premium", category:"Fashion", price:22.00, oldPrice:30.00, cost:6.00, stock:180, rating:4.9, reviews:210, badge:"Best Seller", isNew:false, description:"Soft, thick prayer mat with beautiful geometric pattern — ideal for daily prayers.", image:"https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80" },
  { id:10, name:"Perfume Gift Set", category:"Beauty", price:35.00, oldPrice:48.00, cost:10.00, stock:95, rating:4.7, reviews:88, badge:"Popular", isNew:false, description:"Luxurious fragrance gift set with three long-lasting scents — perfect for any occasion.", image:"https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80" },
  { id:11, name:"Skin Care Set", category:"Beauty", price:42.00, oldPrice:58.00, cost:12.00, stock:70, rating:4.5, reviews:64, badge:"New", isNew:true, description:"Complete daily skincare routine set — cleanser, toner and moisturizer for all skin types.", image:"https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80" },
  { id:12, name:"Football & Sports Kit", category:"Sports", price:28.00, oldPrice:38.00, cost:8.00, stock:130, rating:4.4, reviews:45, badge:"", isNew:false, description:"Complete sports kit with football, pump and training cones — suitable for all ages.", image:"https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&q=80" },
];

const CITIES = ["Mogadishu","Baidoa","Hargeisa","Kismayo","Garowe","Bosaso","Beledweyne","Other"];
const PAYMENTS = ["EVC Plus","Zaad","E-Dahab","Cash on Delivery"];
const MOCK_ORDERS = [
  { id:"FRX-A1B2C3", name:"Amina Hassan", city:"Mogadishu", items:"Premium Hijab Set × 2", total:"$31.98", payment:"EVC Plus", status:"Processing", date:"2026-04-23" },
  { id:"FRX-D4E5F6", name:"Mohamed Ali", city:"Baidoa", items:"Solar Power Bank × 1", total:"$45.00", payment:"Zaad", status:"Shipped", date:"2026-04-22" },
  { id:"FRX-G7H8I9", name:"Faadumo Omar", city:"Hargeisa", items:"Abaya Modest Dress × 1", total:"$28.00", payment:"Cash on Delivery", status:"Delivered", date:"2026-04-20" },
];
const NAV_ITEMS = [
  { id:"storefront", label:"Storefront", icon:"🏪", admin:false },
  { id:"dashboard", label:"Dashboard", icon:"⊞", admin:true },
  { id:"sourcing", label:"Source Products", icon:"🔎", admin:true },
  { id:"catalog", label:"Catalog", icon:"📦", admin:true },
  { id:"pricing", label:"Pricing", icon:"💲", admin:true },
  { id:"orders", label:"Orders", icon:"📋", admin:true },
  { id:"support", label:"Support", icon:"💬", admin:false },
];

async function ask(messages, system) {
  try {
    const r = await fetch('/api/claude', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:1500, system, messages })
    });
    const d = await r.json();
    return d.content?.[0]?.text || '';
  } catch { return ''; }
}

const Logo = ({ size=20 }) => (
  <div style={{ background:"white", padding:"5px 14px", borderRadius:30, boxShadow:"0 2px 8px rgba(0,0,0,0.15)", display:"inline-flex", alignItems:"center", gap:6 }}>
    <img src="/logo.png" alt="FrexSOM" style={{ height:size*1.6, width:"auto", display:"block" }}
      onError={e=>{ e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}/>
    <div style={{ display:"none", alignItems:"center", gap:5 }}>
      <svg width={size} height={size} viewBox="0 0 52 52"><path d="M8,44 C8,44 6,22 22,12 C14,20 16,34 24,36 C18,30 20,18 30,14 C22,20 24,36 38,34 C28,36 16,42 8,44Z" fill={ORANGE}/></svg>
      <span style={{ fontSize:size, fontWeight:900 }}><span style={{ color:NAVY }}>Frex</span><span style={{ color:ORANGE }}>SOM</span></span>
    </div>
  </div>
);

const Stars = ({ rating, count }) => (
  <div style={{ display:"flex", alignItems:"center", gap:3 }}>
    {[1,2,3,4,5].map(i=><span key={i} style={{ color:i<=Math.round(rating)?"#f59e0b":"#e2e8f0", fontSize:12 }}>★</span>)}
    {count!==undefined&&<span style={{ fontSize:11, color:"#94a3b8", marginLeft:2 }}>({count})</span>}
  </div>
);

const Card = ({ children, style={} }) => (
  <div style={{ background:"white", borderRadius:14, boxShadow:"0 2px 12px rgba(13,31,92,0.07)", ...style }}>{children}</div>
);

export default function App() {
  const [page, setPage] = useState("storefront");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const [products, setProducts] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(null);
  const [orderDone, setOrderDone] = useState(null);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [form, setForm] = useState({ name:"", phone:"", city:"Mogadishu", address:"", payment:"EVC Plus" });
  const [catFilter, setCatFilter] = useState("all");
  const [searchQ, setSearchQ] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const [toast, setToast] = useState(null);
  const [newsletter, setNewsletter] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [countdown, setCountdown] = useState({ h:5, m:32, s:47 });
  const [srcQ, setSrcQ] = useState("");
  const [srcRes, setSrcRes] = useState(null);
  const [srcLoad, setSrcLoad] = useState(false);
  const [descLoad, setDescLoad] = useState(false);
  const [pName, setPName] = useState("");
  const [pCost, setPCost] = useState("");
  const [priceRes, setPriceRes] = useState(null);
  const [priceLoad, setPriceLoad] = useState(false);
  const [msgs, setMsgs] = useState([{ role:"assistant", content:"Salaam! 👋 Welcome to FrexSOM Market. How can I help you today?" }]);
  const [chatIn, setChatIn] = useState("");
  const [chatLoad, setChatLoad] = useState(false);
  const productsRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(prev => {
        let { h, m, s } = prev;
        s--; if(s<0){s=59;m--;} if(m<0){m=59;h--;} if(h<0){h=23;}
        return {h,m,s};
      });
    }, 1000);
    return ()=>clearInterval(t);
  }, []);

  const showToast = (msg, color=GREEN) => { setToast({msg,color}); setTimeout(()=>setToast(null), 2500); };
  const cartCount = cart.reduce((a,i)=>a+i.qty,0);
  const cartTotal = cart.reduce((a,i)=>a+i.price*i.qty,0).toFixed(2);
  const pad = n => String(n).padStart(2,'0');

  const goTo = (pg) => {
    const n = NAV_ITEMS.find(i=>i.id===pg);
    if(n && n.admin && !isAdmin) { setShowAdminLogin(true); return; }
    setPage(pg);
  };

  const tryAdminLogin = () => {
    if(adminPin===ADMIN_PIN) { setIsAdmin(true); setShowAdminLogin(false); setPage("dashboard"); setAdminPin(""); showToast("Welcome back, Admin! 👋"); }
    else { showToast("Wrong PIN ❌","#ef4444"); setAdminPin(""); }
  };

  const addToCart = (p) => {
    setCart(prev=>{ const ex=prev.find(i=>i.id===p.id); return ex?prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...prev,{...p,qty:1}]; });
    showToast(`${p.name} added to cart! 🛒`);
  };
  const qtyChange = (id,d) => setCart(prev=>prev.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const removeItem = (id) => setCart(prev=>prev.filter(i=>i.id!==id));
  const toggleWish = (id) => { const had=wishlist.includes(id); setWishlist(prev=>had?prev.filter(i=>i!==id):[...prev,id]); showToast(had?"Removed from wishlist":"Saved ❤️",ORANGE); };

  const handleSearch = () => {
    if(!searchInput.trim()) return;
    setSearchQ(searchInput); setCatFilter("all");
    setTimeout(()=>productsRef.current?.scrollIntoView({behavior:'smooth'}),100);
  };
  const clearSearch = () => { setSearchQ(""); setSearchInput(""); };

  const placeOrder = () => {
    if(!form.name||!form.phone) return;
    const id="FRX-"+Math.random().toString(36).substring(2,8).toUpperCase();
    setOrders(prev=>[{id,...form,items:cart.map(i=>`${i.name} × ${i.qty}`).join(", "),total:`$${cartTotal}`,status:"Processing",date:new Date().toISOString().split("T")[0]},...prev]);
    setOrderDone({id,...form,items:[...cart],total:cartTotal});
    setCart([]); setCheckoutStep("done");
  };

  const doSource = async () => {
    if(!srcQ.trim()) return;
    setSrcLoad(true); setSrcRes(null);
    const txt = await ask([{role:"user",content:`I run an e-commerce store. Find me 4 products I can source and sell for: "${srcQ}". Focus on quality, demand and profitability.`}],
      `You are a global product sourcing expert. Return ONLY a valid JSON array of 4 products. Each object: name, supplier (type e.g. "Wholesale Manufacturer"), moq (number), unitCost (number USD), estimatedShipping (number USD), category, whyItSells (1 sentence), profitMargin (string e.g. "~60%"). No markdown.`);
    try { setSrcRes(JSON.parse(txt.replace(/```json|```/g,"").trim())); } catch { setSrcRes([]); }
    setSrcLoad(false);
  };

  const importP = (p) => {
    setProducts(prev=>[...prev,{ id:Date.now(), name:p.name, category:p.category, price:parseFloat(((p.unitCost+p.estimatedShipping)*2.5).toFixed(2)), oldPrice:null, cost:parseFloat((p.unitCost+p.estimatedShipping).toFixed(2)), stock:p.moq, rating:4.5, reviews:0, badge:"New", isNew:true, description:p.whyItSells, image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" }]);
    showToast(`${p.name} added to catalog! 📦`); setPage("catalog");
  };

  const rewriteDesc = async (product) => {
    setDescLoad(product.id);
    const txt = await ask([{role:"user",content:`Write a compelling 2-sentence product description for: ${product.name} (${product.category}), $${product.price}.`}],
      `You write short, persuasive e-commerce product descriptions. Focus on benefits and value. Return only the description text.`);
    if(txt) setProducts(prev=>prev.map(p=>p.id===product.id?{...p,description:txt}:p));
    setDescLoad(false);
  };

  const doPrice = async () => {
    if(!pName||!pCost) return;
    setPriceLoad(true); setPriceRes(null);
    const txt = await ask([{role:"user",content:`Product: ${pName}. Total landed cost: $${pCost}. Suggest pricing for a Somali e-commerce market.`}],
      `You are an e-commerce pricing strategist. Return ONLY valid JSON: {"budget":number,"standard":number,"premium":number,"recommendedPrice":number,"margin":"string","demandForecast":"string","tip":"string"}. No markdown.`);
    try { setPriceRes(JSON.parse(txt.replace(/```json|```/g,"").trim())); } catch {}
    setPriceLoad(false);
  };

  const doChat = async () => {
    if(!chatIn.trim()||chatLoad) return;
    const um={role:"user",content:chatIn}; const nm=[...msgs,um];
    setMsgs(nm); setChatIn(""); setChatLoad(true);
    const txt = await ask(nm,`You are a helpful customer support agent for FrexSOM Market — a leading online store in Somalia. Help with: shipping (15–30 days), payments (EVC Plus, Zaad, E-Dahab, cash), returns (30 days), and products. Contact: info@frexsom.com | (+252) 611 013 604. Be warm and concise — 2–3 sentences max.`);
    setMsgs(prev=>[...prev,{role:"assistant",content:txt||"Sorry, please try again or call (+252) 611 013 604."}]);
    setChatLoad(false);
  };

  const filtered = products.filter(p=>(catFilter==="all"||p.category===catFilter)&&(searchQ===""||p.name.toLowerCase().includes(searchQ.toLowerCase())||p.category.toLowerCase().includes(searchQ.toLowerCase())||p.description.toLowerCase().includes(searchQ.toLowerCase())));
  const flashDeals = products.filter(p=>p.oldPrice).slice(0,4);
  const newArrivals = products.filter(p=>p.isNew||p.badge==="New");
  const bestSellers = products.filter(p=>["Best Seller","Top Rated","Popular"].includes(p.badge));
  const statusColor = s=>s==="Delivered"?GREEN:s==="Shipped"?ORANGE:s==="Processing"?"#3b82f6":"#ef4444";

  const ProductCard = ({p}) => {
    const inCart = cart.find(i=>i.id===p.id);
    const wished = wishlist.includes(p.id);
    const discount = p.oldPrice?Math.round((1-p.price/p.oldPrice)*100):null;
    return (
      <div style={{background:"white",borderRadius:16,overflow:"hidden",boxShadow:"0 2px 14px rgba(13,31,92,0.07)",position:"relative",display:"flex",flexDirection:"column",transition:"box-shadow 0.2s"}}
        onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 32px rgba(13,31,92,0.14)"}
        onMouseLeave={e=>e.currentTarget.style.boxShadow="0 2px 14px rgba(13,31,92,0.07)"}>
        {p.badge&&<div style={{position:"absolute",top:10,left:10,zIndex:2,background:p.badge==="Best Seller"?ORANGE:p.badge==="Top Rated"?GREEN:p.badge==="New"?"#8b5cf6":NAVY,color:"white",padding:"3px 10px",borderRadius:20,fontSize:10.5,fontWeight:800}}>{p.badge}</div>}
        {discount&&<div style={{position:"absolute",top:p.badge?34:10,left:10,zIndex:2,background:"#ef4444",color:"white",padding:"3px 10px",borderRadius:20,fontSize:10.5,fontWeight:800}}>-{discount}%</div>}
        <button onClick={()=>toggleWish(p.id)} style={{position:"absolute",top:8,right:8,zIndex:2,background:"white",border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",fontSize:17,boxShadow:"0 2px 8px rgba(0,0,0,0.12)",display:"flex",alignItems:"center",justifyContent:"center"}}>{wished?"❤️":"🤍"}</button>
        <div style={{height:200,overflow:"hidden",cursor:"pointer"}} onClick={()=>setQuickView(p)}>
          <img src={p.image} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.35s"}}
            onMouseEnter={e=>e.target.style.transform="scale(1.06)"}
            onMouseLeave={e=>e.target.style.transform="scale(1)"}
            onError={e=>{e.target.src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80";}}/>
        </div>
        <div style={{padding:"14px 16px 18px",display:"flex",flexDirection:"column",flex:1}}>
          <div style={{fontSize:10.5,color:ORANGE,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,marginBottom:3}}>{p.category}</div>
          <div style={{fontSize:15,fontWeight:700,color:NAVY,marginBottom:6,lineHeight:1.3,flex:1}}>{p.name}</div>
          <Stars rating={p.rating} count={p.reviews}/>
          <div style={{display:"flex",alignItems:"center",gap:8,margin:"8px 0 6px"}}>
            <span style={{fontSize:21,fontWeight:900,color:NAVY}}>${p.price}</span>
            {p.oldPrice&&<span style={{fontSize:13,color:"#94a3b8",textDecoration:"line-through"}}>${p.oldPrice}</span>}
          </div>
          <div style={{fontSize:11.5,color:p.stock<50?"#ef4444":GREEN,fontWeight:600,background:p.stock<50?"#fef2f2":"#f0fdf4",padding:"3px 9px",borderRadius:20,marginBottom:12,display:"inline-block",width:"fit-content"}}>
            {p.stock<50?`⚠️ Only ${p.stock} left`:"✅ In Stock"}
          </div>
          {inCart
            ?<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:`${ORANGE}12`,borderRadius:9,padding:"6px 12px"}}>
              <button onClick={()=>qtyChange(p.id,-1)} style={{background:ORANGE,color:"white",border:"none",borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:18,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"}}>−</button>
              <span style={{fontWeight:800,color:ORANGE,fontSize:14}}>{inCart.qty} in cart</span>
              <button onClick={()=>qtyChange(p.id,1)} style={{background:ORANGE,color:"white",border:"none",borderRadius:7,width:28,height:28,cursor:"pointer",fontSize:18,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"}}>+</button>
            </div>
            :<button onClick={()=>addToCart(p)} style={{width:"100%",background:NAVY,color:"white",border:"none",padding:"11px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit"}}>Add to Cart</button>
          }
        </div>
      </div>
    );
  };

  return (
    <div style={{display:"flex",height:"100vh",fontFamily:"'Segoe UI',system-ui,sans-serif",background:GRAY,overflow:"hidden"}}>

      {/* ── Toast ── */}
      {toast&&<div style={{position:"fixed",top:22,right:22,zIndex:1000,background:toast.color,color:"white",padding:"12px 22px",borderRadius:12,fontWeight:700,fontSize:14,boxShadow:"0 4px 24px rgba(0,0,0,0.18)"}}>{toast.msg}</div>}

      {/* ── Admin Login Modal ── */}
      {showAdminLogin&&(
        <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(13,31,92,0.75)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"white",borderRadius:18,width:380,padding:36,textAlign:"center",boxShadow:"0 24px 64px rgba(0,0,0,0.3)"}}>
            <div style={{fontSize:52,marginBottom:14}}>🔐</div>
            <div style={{fontSize:20,fontWeight:800,color:NAVY,marginBottom:4}}>Admin Access</div>
            <div style={{fontSize:13,color:"#7a86a0",marginBottom:24}}>Enter your PIN to access the admin panel</div>
            <input type="password" value={adminPin} onChange={e=>setAdminPin(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&tryAdminLogin()}
              placeholder="• • • •" maxLength={6}
              style={{width:"100%",padding:"14px",borderRadius:12,border:"2px solid #dde1ee",fontSize:28,textAlign:"center",letterSpacing:12,boxSizing:"border-box",outline:"none",fontFamily:"inherit",marginBottom:16}}/>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>{setShowAdminLogin(false);setAdminPin("");}} style={{flex:1,background:"#f0f2f8",color:"#64748b",border:"none",padding:"13px",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit"}}>Cancel</button>
              <button onClick={tryAdminLogin} style={{flex:1,background:NAVY,color:"white",border:"none",padding:"13px",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit"}}>Enter →</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Quick View ── */}
      {quickView&&(
        <div style={{position:"fixed",inset:0,zIndex:80,background:"rgba(13,31,92,0.65)",display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setQuickView(null)}>
          <div style={{background:"white",borderRadius:18,width:600,overflow:"hidden",boxShadow:"0 24px 64px rgba(0,0,0,0.25)"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
              <img src={quickView.image} alt={quickView.name} style={{width:"100%",height:340,objectFit:"cover"}}
                onError={e=>{e.target.src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80";}}/>
              <div style={{padding:26,display:"flex",flexDirection:"column"}}>
                <div style={{fontSize:11,color:ORANGE,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>{quickView.category}</div>
                <div style={{fontSize:19,fontWeight:800,color:NAVY,marginBottom:8,lineHeight:1.3,flex:1}}>{quickView.name}</div>
                <Stars rating={quickView.rating} count={quickView.reviews}/>
                <div style={{display:"flex",alignItems:"center",gap:10,margin:"12px 0"}}>
                  <span style={{fontSize:28,fontWeight:900,color:NAVY}}>${quickView.price}</span>
                  {quickView.oldPrice&&<span style={{fontSize:15,color:"#94a3b8",textDecoration:"line-through"}}>${quickView.oldPrice}</span>}
                </div>
                <div style={{fontSize:13,color:"#64748b",lineHeight:1.6,marginBottom:18}}>{quickView.description}</div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>{addToCart(quickView);setQuickView(null);}} style={{flex:1,background:NAVY,color:"white",border:"none",padding:"11px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit"}}>🛒 Add to Cart</button>
                  <button onClick={()=>toggleWish(quickView.id)} style={{background:"#f0f2f8",border:"none",padding:"11px 14px",borderRadius:9,cursor:"pointer",fontSize:17}}>{wishlist.includes(quickView.id)?"❤️":"🤍"}</button>
                  <button onClick={()=>setQuickView(null)} style={{background:"#f0f2f8",border:"none",padding:"11px 14px",borderRadius:9,cursor:"pointer",fontSize:16}}>✕</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Sidebar ── */}
      <div style={{width:220,background:NAVY,display:"flex",flexDirection:"column",flexShrink:0,boxShadow:"2px 0 16px rgba(0,0,0,0.18)"}}>
        <div style={{padding:"20px 16px 14px",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
          <Logo size={17}/>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:7,letterSpacing:0.8}}>{isAdmin?"ADMIN PANEL ✅":"FREXSOM MARKET"}</div>
        </div>
        <nav style={{padding:"12px 10px",flex:1,overflowY:"auto"}}>
          {NAV_ITEMS.map(n=>(
            <button key={n.id} onClick={()=>goTo(n.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 13px",background:page===n.id?`${ORANGE}22`:"transparent",border:page===n.id?`1px solid ${ORANGE}55`:"1px solid transparent",borderRadius:9,color:page===n.id?ORANGE:"rgba(255,255,255,0.65)",cursor:"pointer",fontSize:13.5,fontWeight:page===n.id?700:400,marginBottom:3,textAlign:"left",fontFamily:"inherit"}}>
              <span style={{fontSize:15,width:20,textAlign:"center"}}>{n.icon}</span>
              {n.label}
              {n.id==="storefront"&&cartCount>0&&<span style={{marginLeft:"auto",background:ORANGE,color:"white",borderRadius:"50%",width:19,height:19,fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{cartCount}</span>}
              {n.id==="orders"&&isAdmin&&orders.filter(o=>o.status==="Processing").length>0&&<span style={{marginLeft:"auto",background:"#ef4444",color:"white",borderRadius:"50%",width:19,height:19,fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{orders.filter(o=>o.status==="Processing").length}</span>}
              {n.admin&&!isAdmin&&<span style={{marginLeft:"auto",fontSize:12,opacity:0.4}}>🔒</span>}
            </button>
          ))}
          {isAdmin&&(
            <button onClick={()=>{setIsAdmin(false);setPage("storefront");showToast("Logged out of admin","#64748b");}} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 13px",background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.25)",borderRadius:9,color:"#ef4444",cursor:"pointer",fontSize:13,fontWeight:600,marginTop:8,fontFamily:"inherit"}}>
              <span style={{fontSize:15}}>🚪</span> Exit Admin
            </button>
          )}
        </nav>
        <div style={{padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,0.07)"}}>
          <a href="mailto:info@frexsom.com" style={{display:"block",fontSize:11,color:"rgba(255,255,255,0.35)",textDecoration:"none",marginBottom:3}}>✉️ info@frexsom.com</a>
          <a href="tel:+252611013604" style={{display:"block",fontSize:11,color:"rgba(255,255,255,0.35)",textDecoration:"none"}}>📞 (+252) 611 013 604</a>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{flex:1,overflowY:"auto",background:GRAY}}>

        {/* ════ STOREFRONT ════ */}
        {page==="storefront"&&(
          <div style={{background:"#f8fafc",minHeight:"100%"}}>
            {/* Announcement */}
            <div style={{background:ORANGE,color:"white",textAlign:"center",padding:"8px 16px",fontSize:12.5,fontWeight:600}}>
              🎁 Free delivery on orders over $50 &nbsp;·&nbsp; 📦 New arrivals weekly &nbsp;·&nbsp; 📞 (+252) 611 013 604
            </div>
            {/* Navbar */}
            <div style={{background:NAVY,padding:"0 24px",position:"sticky",top:0,zIndex:20,boxShadow:"0 2px 16px rgba(0,0,0,0.2)"}}>
              <div style={{display:"flex",alignItems:"center",gap:14,height:66}}>
                <Logo size={16}/>
                <div style={{flex:1,maxWidth:520,position:"relative"}}>
                  <input value={searchInput} onChange={e=>setSearchInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSearch()} placeholder="Search products…"
                    style={{width:"100%",padding:"10px 50px 10px 42px",borderRadius:25,border:"none",fontSize:13.5,boxSizing:"border-box",outline:"none",background:"white",fontFamily:"inherit"}}/>
                  <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#94a3b8",fontSize:15}}>🔍</span>
                  {searchInput&&<button onClick={clearSearch} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:16}}>✕</button>}
                </div>
                <button onClick={handleSearch} style={{background:ORANGE,color:"white",border:"none",padding:"9px 18px",borderRadius:25,cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"inherit",flexShrink:0}}>Search</button>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <button onClick={()=>goTo("support")} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:"white",padding:"8px 14px",borderRadius:25,cursor:"pointer",fontWeight:600,fontSize:12.5,fontFamily:"inherit"}}>💬 Help</button>
                  <button onClick={()=>setCartOpen(true)} style={{background:cartCount>0?ORANGE:"rgba(255,255,255,0.12)",border:`1.5px solid ${cartCount>0?ORANGE:"rgba(255,255,255,0.2)"}`,color:"white",padding:"8px 18px",borderRadius:25,cursor:"pointer",fontWeight:700,fontSize:13.5,display:"flex",alignItems:"center",gap:8,fontFamily:"inherit"}}>
                    🛒 Cart {cartCount>0&&<span style={{background:"white",color:ORANGE,borderRadius:"50%",width:20,height:20,fontSize:12,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{cartCount}</span>}
                  </button>
                </div>
              </div>
              <div style={{display:"flex",gap:6,paddingBottom:10,overflowX:"auto"}}>
                {CATEGORIES.map(c=>(
                  <button key={c.id} onClick={()=>{setCatFilter(c.id);setSearchQ("");setSearchInput("");setTimeout(()=>productsRef.current?.scrollIntoView({behavior:'smooth'}),100);}} style={{background:catFilter===c.id&&!searchQ?ORANGE:"rgba(255,255,255,0.1)",border:`1px solid ${catFilter===c.id&&!searchQ?ORANGE:"rgba(255,255,255,0.15)"}`,color:"white",padding:"5px 18px",borderRadius:20,cursor:"pointer",fontWeight:catFilter===c.id&&!searchQ?700:400,fontSize:12.5,whiteSpace:"nowrap",fontFamily:"inherit"}}>{c.label}</button>
                ))}
              </div>
            </div>
            {/* Search banner */}
            {searchQ&&(
              <div style={{background:`${NAVY}08`,borderBottom:`2px solid ${NAVY}15`,padding:"12px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{fontSize:14,color:NAVY,fontWeight:600}}>🔍 Results for "<strong>{searchQ}</strong>" — {filtered.length} product{filtered.length!==1?"s":""} found</div>
                <button onClick={clearSearch} style={{background:NAVY,color:"white",border:"none",padding:"6px 16px",borderRadius:20,cursor:"pointer",fontSize:12.5,fontWeight:600,fontFamily:"inherit"}}>✕ Clear</button>
              </div>
            )}
            {/* Hero */}
            {!searchQ&&(
              <div style={{background:`linear-gradient(130deg,${NAVY} 0%,#1a3580 55%,${ORANGE}aa 100%)`,padding:"52px 40px",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{maxWidth:560}}>
                  <div style={{display:"inline-block",background:ORANGE,color:"white",padding:"4px 14px",borderRadius:20,fontSize:12,fontWeight:700,marginBottom:12}}>🇸🇴 Somalia's #1 Online Store</div>
                  <div style={{fontSize:38,fontWeight:900,lineHeight:1.15,marginBottom:14}}>Shop Smarter.<br/><span style={{color:ORANGE}}>Save More.</span></div>
                  <div style={{fontSize:14,opacity:0.85,marginBottom:20,lineHeight:1.6}}>Quality products delivered to your door across Somalia. Pay with EVC Plus, Zaad or cash on delivery.</div>
                  <div style={{display:"flex",gap:12}}>
                    <button onClick={()=>{setCatFilter("all");setTimeout(()=>productsRef.current?.scrollIntoView({behavior:'smooth'}),100);}} style={{background:ORANGE,color:"white",border:"none",padding:"13px 28px",borderRadius:25,cursor:"pointer",fontWeight:800,fontSize:15,fontFamily:"inherit"}}>Shop Now →</button>
                    <a href="mailto:info@frexsom.com" style={{background:"rgba(255,255,255,0.12)",color:"white",border:"1px solid rgba(255,255,255,0.25)",padding:"13px 20px",borderRadius:25,fontWeight:600,fontSize:14,textDecoration:"none",display:"inline-flex",alignItems:"center"}}>✉️ Contact Us</a>
                  </div>
                </div>
                <div style={{fontSize:110,filter:"drop-shadow(0 16px 40px rgba(0,0,0,0.3))",flexShrink:0}}>🛍️</div>
              </div>
            )}
            {/* Trust badges */}
            {!searchQ&&(
              <div style={{background:"white",borderBottom:"1px solid #eaecf4",padding:"14px 32px"}}>
                <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:12}}>
                  {[["🚢","Fast Delivery","15–30 days nationwide"],["💳","Mobile Payments","EVC Plus, Zaad & E-Dahab"],["🔄","Easy Returns","30-day return policy"],["🎧","24/7 Support","Always here to help"],["🔒","Secure Orders","Safe & trusted checkout"]].map(([ic,t,s])=>(
                    <div key={t} style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:24}}>{ic}</span>
                      <div><div style={{fontWeight:700,color:NAVY,fontSize:13}}>{t}</div><div style={{fontSize:11.5,color:"#94a3b8"}}>{s}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Flash Deals */}
            {!searchQ&&flashDeals.length>0&&(
              <div style={{padding:"28px 28px 0"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
                  <div style={{display:"flex",alignItems:"center",gap:14}}>
                    <div style={{fontSize:20,fontWeight:800,color:NAVY}}>⚡ Flash Deals</div>
                    <div style={{background:NAVY,color:"white",padding:"5px 14px",borderRadius:25,fontSize:13,fontWeight:700}}>Ends: {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}</div>
                  </div>
                  <button onClick={()=>productsRef.current?.scrollIntoView({behavior:'smooth'})} style={{background:"none",border:`1.5px solid ${NAVY}`,color:NAVY,padding:"6px 16px",borderRadius:25,cursor:"pointer",fontWeight:600,fontSize:13,fontFamily:"inherit"}}>See All →</button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:18,marginBottom:32}}>
                  {flashDeals.map(p=><ProductCard key={p.id} p={p}/>)}
                </div>
              </div>
            )}
            {/* Best Sellers */}
            {!searchQ&&bestSellers.length>0&&(
              <div style={{padding:"0 28px 32px"}}>
                <div style={{fontSize:20,fontWeight:800,color:NAVY,marginBottom:18}}>🏆 Best Sellers</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:18}}>
                  {bestSellers.slice(0,4).map(p=><ProductCard key={p.id} p={p}/>)}
                </div>
              </div>
            )}
            {/* Promo Banner */}
            {!searchQ&&(
              <div style={{margin:"0 28px 32px",borderRadius:16,overflow:"hidden",background:`linear-gradient(135deg,${ORANGE},#e67e00)`,padding:"28px 36px",display:"flex",justifyContent:"space-between",alignItems:"center",color:"white"}}>
                <div>
                  <div style={{fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,opacity:0.85}}>Limited Time Offer</div>
                  <div style={{fontSize:26,fontWeight:900,marginBottom:8}}>Free Delivery on First Order!</div>
                  <div style={{fontSize:14,opacity:0.9,marginBottom:16}}>Use code <strong>FREXSOM</strong> at checkout · New customers only</div>
                  <button onClick={()=>productsRef.current?.scrollIntoView({behavior:'smooth'})} style={{background:"white",color:ORANGE,border:"none",padding:"11px 26px",borderRadius:25,cursor:"pointer",fontWeight:800,fontSize:14,fontFamily:"inherit"}}>Claim Offer →</button>
                </div>
                <div style={{fontSize:90,opacity:0.7,flexShrink:0}}>🎁</div>
              </div>
            )}
            {/* New Arrivals */}
            {!searchQ&&newArrivals.length>0&&(
              <div style={{padding:"0 28px 32px"}}>
                <div style={{fontSize:20,fontWeight:800,color:NAVY,marginBottom:18}}>🆕 New Arrivals</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:18}}>
                  {newArrivals.map(p=><ProductCard key={p.id} p={p}/>)}
                </div>
              </div>
            )}
            {/* All Products */}
            <div ref={productsRef} style={{padding:"0 28px 32px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,flexWrap:"wrap",gap:10}}>
                <div style={{fontSize:20,fontWeight:800,color:NAVY}}>
                  {searchQ?`Results for "${searchQ}"`:catFilter==="all"?"All Products":CATEGORIES.find(c=>c.id===catFilter)?.label}
                  <span style={{color:"#94a3b8",fontWeight:400,fontSize:14,marginLeft:8}}>({filtered.length} items)</span>
                </div>
                <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                  {CATEGORIES.map(c=>(
                    <button key={c.id} onClick={()=>{setCatFilter(c.id);setSearchQ("");setSearchInput("");}} style={{padding:"6px 16px",borderRadius:25,border:`1.5px solid ${catFilter===c.id&&!searchQ?NAVY:"#dde1ee"}`,background:catFilter===c.id&&!searchQ?NAVY:"transparent",color:catFilter===c.id&&!searchQ?"white":"#5a6280",cursor:"pointer",fontWeight:catFilter===c.id&&!searchQ?700:500,fontSize:13,fontFamily:"inherit"}}>{c.label}</button>
                  ))}
                </div>
              </div>
              {filtered.length===0
                ?<div style={{textAlign:"center",padding:60,color:"#94a3b8"}}>
                  <div style={{fontSize:52,marginBottom:12}}>🔍</div>
                  <div style={{fontWeight:700,fontSize:16,color:NAVY,marginBottom:8}}>No products found for "{searchQ}"</div>
                  <button onClick={clearSearch} style={{background:NAVY,color:"white",border:"none",padding:"10px 24px",borderRadius:25,cursor:"pointer",fontWeight:700,fontFamily:"inherit"}}>Browse All</button>
                </div>
                :<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>
                  {filtered.map(p=><ProductCard key={p.id} p={p}/>)}
                </div>
              }
            </div>
            {/* Newsletter */}
            <div style={{margin:"0 28px 32px",background:NAVY,borderRadius:16,padding:"36px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,flexWrap:"wrap"}}>
              <div>
                <div style={{fontSize:22,fontWeight:800,color:"white",marginBottom:6}}>📧 Stay in the Loop</div>
                <div style={{fontSize:14,color:"rgba(255,255,255,0.6)"}}>Get exclusive deals and new arrivals in your inbox.</div>
              </div>
              {newsletterDone
                ?<div style={{color:GREEN,fontWeight:700,fontSize:15}}>✅ Subscribed! Thank you.</div>
                :<div style={{display:"flex",gap:10}}>
                  <input value={newsletter} onChange={e=>setNewsletter(e.target.value)} placeholder="Your email address" style={{padding:"11px 18px",borderRadius:25,border:"none",fontSize:14,outline:"none",width:260,fontFamily:"inherit"}}/>
                  <button onClick={()=>{if(newsletter.includes("@")){setNewsletterDone(true);showToast("Subscribed! 🎉");}}} style={{background:ORANGE,color:"white",border:"none",padding:"11px 22px",borderRadius:25,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit"}}>Subscribe</button>
                </div>
              }
            </div>
            {/* Footer */}
            <div style={{background:NAVY,color:"rgba(255,255,255,0.55)",padding:"44px 36px 24px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1.6fr 1fr 1fr 1fr",gap:30,marginBottom:32}}>
                <div>
                  <Logo size={16}/>
                  <div style={{fontSize:13,marginTop:14,lineHeight:1.8,maxWidth:240}}>Somalia's trusted online store — quality products delivered to your door nationwide.</div>
                  <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:7}}>
                    <a href="tel:+252611013604" style={{color:ORANGE,textDecoration:"none",fontSize:13,fontWeight:600}}>📞 (+252) 611 013 604</a>
                    <a href="mailto:info@frexsom.com" style={{color:ORANGE,textDecoration:"none",fontSize:13,fontWeight:600}}>✉️ info@frexsom.com</a>
                    <a href="https://frexsom.com" style={{color:ORANGE,textDecoration:"none",fontSize:13,fontWeight:600}}>🌐 frexsom.com</a>
                  </div>
                </div>
                {[
                  {title:"Quick Links",items:[["Shop All",()=>setCatFilter("all")],["Track Order",()=>goTo("orders")],["Customer Support",()=>goTo("support")]]},
                  {title:"Payment Methods",items:[["💳 EVC Plus"],["💳 Zaad"],["💳 E-Dahab"],["💵 Cash on Delivery"]]},
                  {title:"Delivery Cities",items:[["Mogadishu"],["Hargeisa"],["Baidoa"],["Kismayo"],["Garowe"],["+ more cities"]]},
                ].map(col=>(
                  <div key={col.title}>
                    <div style={{fontWeight:700,color:"white",marginBottom:14,fontSize:14}}>{col.title}</div>
                    {col.items.map(([lbl,fn])=>(
                      <div key={lbl} style={{fontSize:12.5,marginBottom:8}}>
                        {fn?<button onClick={fn} style={{background:"none",border:"none",color:"rgba(255,255,255,0.55)",cursor:"pointer",fontSize:12.5,padding:0,fontFamily:"inherit",textAlign:"left"}}>{lbl}</button>:<span>{lbl}</span>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:18,display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,flexWrap:"wrap",gap:10}}>
                <span>© 2026 FrexSOM Market · frexsom.com · Made with ❤️ for Somalia 🇸🇴</span>
                <div style={{display:"flex",gap:18}}>
                  {["Privacy Policy","Terms of Service","Return Policy"].map(lbl=>(
                    <a key={lbl} href="#" style={{color:"rgba(255,255,255,0.4)",textDecoration:"none",fontSize:12}}>{lbl}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Cart Drawer ── */}
        {cartOpen&&(
          <div style={{position:"fixed",inset:0,zIndex:50,display:"flex"}}>
            <div onClick={()=>setCartOpen(false)} style={{flex:1,background:"rgba(13,31,92,0.45)"}}/>
            <div style={{width:400,background:"white",display:"flex",flexDirection:"column",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)"}}>
              <div style={{padding:"18px 22px",borderBottom:"1px solid #f0f2f8",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontWeight:800,fontSize:17,color:NAVY}}>Your Cart ({cartCount})</div>
                <button onClick={()=>setCartOpen(false)} style={{background:"#f0f2f8",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:17,color:"#94a3b8",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"}}>✕</button>
              </div>
              {cart.length===0
                ?<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#94a3b8"}}>
                  <div style={{fontSize:56}}>🛒</div>
                  <div style={{fontWeight:700,marginTop:12,color:NAVY,fontSize:16}}>Your cart is empty</div>
                  <button onClick={()=>setCartOpen(false)} style={{marginTop:18,background:NAVY,color:"white",border:"none",padding:"10px 24px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"inherit"}}>Browse Products</button>
                </div>
                :<>
                  <div style={{flex:1,overflowY:"auto",padding:"14px 22px"}}>
                    {cart.map(item=>(
                      <div key={item.id} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 0",borderBottom:"1px solid #f4f6fb"}}>
                        <img src={item.image} alt={item.name} style={{width:54,height:54,borderRadius:10,objectFit:"cover",flexShrink:0}}
                          onError={e=>{e.target.src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80";}}/>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13.5,fontWeight:700,color:NAVY,lineHeight:1.2}}>{item.name}</div>
                          <div style={{fontSize:13,color:ORANGE,fontWeight:700,marginTop:3}}>${(item.price*item.qty).toFixed(2)}</div>
                        </div>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <button onClick={()=>qtyChange(item.id,-1)} style={{background:"#f0f2f8",border:"none",borderRadius:6,width:26,height:26,cursor:"pointer",fontWeight:700,fontFamily:"inherit"}}>−</button>
                          <span style={{fontWeight:700,fontSize:13,minWidth:18,textAlign:"center"}}>{item.qty}</span>
                          <button onClick={()=>qtyChange(item.id,1)} style={{background:"#f0f2f8",border:"none",borderRadius:6,width:26,height:26,cursor:"pointer",fontWeight:700,fontFamily:"inherit"}}>+</button>
                        </div>
                        <button onClick={()=>removeItem(item.id)} style={{background:"none",border:"none",color:"#c0c9dd",cursor:"pointer",fontSize:18,fontFamily:"inherit"}}>✕</button>
                      </div>
                    ))}
                  </div>
                  <div style={{padding:"18px 22px",borderTop:"2px solid #f0f2f8"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:"#7a86a0",fontSize:13}}>Subtotal</span><span style={{fontWeight:700,color:NAVY}}>${cartTotal}</span></div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:18}}><span style={{color:"#7a86a0",fontSize:13}}>Shipping</span><span style={{fontSize:13,color:GREEN,fontWeight:600}}>Calculated at checkout</span></div>
                    <button onClick={()=>{setCartOpen(false);setCheckoutStep("form");}} style={{width:"100%",background:ORANGE,color:"white",border:"none",padding:"14px",borderRadius:10,cursor:"pointer",fontWeight:800,fontSize:15,fontFamily:"inherit"}}>Proceed to Checkout →</button>
                  </div>
                </>
              }
            </div>
          </div>
        )}

        {/* ── Checkout ── */}
        {checkoutStep==="form"&&(
          <div style={{position:"fixed",inset:0,zIndex:60,background:"rgba(13,31,92,0.55)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{background:"white",borderRadius:18,width:490,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 24px 64px rgba(0,0,0,0.22)"}}>
              <div style={{padding:"26px 28px 0"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
                  <div><div style={{fontSize:20,fontWeight:800,color:NAVY}}>Checkout</div><div style={{fontSize:13,color:"#7a86a0",marginTop:2}}>Delivering across Somalia 🇸🇴</div></div>
                  <button onClick={()=>setCheckoutStep(null)} style={{background:"#f0f2f8",border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",fontSize:17,color:"#94a3b8",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"}}>✕</button>
                </div>
                {[["Full Name","text","name","e.g. Amina Hassan"],["Phone Number","tel","phone","e.g. (+252) 611 000 000"],["Street Address","text","address","Street, district, neighbourhood"]].map(([lbl,type,key,ph])=>(
                  <div key={key} style={{marginBottom:15}}>
                    <label style={{fontSize:12.5,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>{lbl} <span style={{color:"#ef4444"}}>*</span></label>
                    <input value={form[key]} onChange={e=>setForm(p=>({...p,[key]:e.target.value}))} type={type} placeholder={ph}
                      style={{width:"100%",padding:"11px 14px",borderRadius:9,border:`1.5px solid ${form[key]?GREEN:"#dde1ee"}`,fontSize:13.5,boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/>
                  </div>
                ))}
                <div style={{marginBottom:15}}>
                  <label style={{fontSize:12.5,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>City</label>
                  <select value={form.city} onChange={e=>setForm(p=>({...p,city:e.target.value}))} style={{width:"100%",padding:"11px 14px",borderRadius:9,border:`1.5px solid ${GREEN}`,fontSize:13.5,outline:"none",fontFamily:"inherit",background:"white"}}>
                    {CITIES.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{fontWeight:700,color:NAVY,fontSize:13.5,marginBottom:12,marginTop:22}}>Payment Method</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:9,marginBottom:22}}>
                  {PAYMENTS.map(pm=>(
                    <button key={pm} onClick={()=>setForm(p=>({...p,payment:pm}))} style={{padding:"12px",borderRadius:9,border:`2px solid ${form.payment===pm?ORANGE:"#dde1ee"}`,background:form.payment===pm?LIGHT:"white",color:form.payment===pm?NAVY:"#64748b",cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"inherit"}}>{pm}</button>
                  ))}
                </div>
                <div style={{background:"#f8fafc",borderRadius:10,padding:"14px 16px",marginBottom:22}}>
                  <div style={{fontWeight:700,color:NAVY,fontSize:13,marginBottom:10}}>Order Summary</div>
                  {cart.map(item=>(
                    <div key={item.id} style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#475569",marginBottom:6}}>
                      <span>{item.name} × {item.qty}</span><span style={{fontWeight:600}}>${(item.price*item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{borderTop:"1px solid #e5e8f0",marginTop:10,paddingTop:10,display:"flex",justifyContent:"space-between",fontWeight:800,fontSize:16,color:NAVY}}>
                    <span>Total</span><span style={{color:ORANGE}}>${cartTotal}</span>
                  </div>
                </div>
              </div>
              <div style={{padding:"0 28px 26px",display:"flex",gap:10}}>
                <button onClick={()=>setCheckoutStep(null)} style={{flex:1,background:"#f0f2f8",color:"#64748b",border:"none",padding:"13px",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit"}}>← Back</button>
                <button onClick={placeOrder} disabled={!form.name||!form.phone} style={{flex:2,background:(!form.name||!form.phone)?"#c0c9dd":ORANGE,color:"white",border:"none",padding:"13px",borderRadius:10,cursor:(!form.name||!form.phone)?"not-allowed":"pointer",fontWeight:800,fontSize:15,fontFamily:"inherit"}}>✓ Place Order</button>
              </div>
            </div>
          </div>
        )}

        {/* ── Order Success ── */}
        {checkoutStep==="done"&&orderDone&&(
          <div style={{position:"fixed",inset:0,zIndex:60,background:"rgba(13,31,92,0.55)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{background:"white",borderRadius:18,width:450,padding:36,textAlign:"center",boxShadow:"0 24px 64px rgba(0,0,0,0.22)"}}>
              <div style={{fontSize:68,marginBottom:14}}>🎉</div>
              <div style={{fontSize:22,fontWeight:800,color:NAVY,marginBottom:4}}>Order Confirmed!</div>
              <div style={{fontSize:14,color:"#7a86a0",marginBottom:22}}>Shukran! Your order has been placed successfully.</div>
              <div style={{background:LIGHT,border:`1.5px solid ${ORANGE}44`,borderRadius:12,padding:"16px 20px",marginBottom:16,textAlign:"left"}}>
                <div style={{fontWeight:800,color:ORANGE,fontSize:16,marginBottom:10}}>Order #{orderDone.id}</div>
                {[["👤",orderDone.name],["📞",orderDone.phone],["📍",`${orderDone.address}, ${orderDone.city}`],["💳",orderDone.payment],["💰",`$${orderDone.total} total`]].map(([ic,v])=>(
                  <div key={v} style={{display:"flex",gap:9,fontSize:13.5,color:"#374151",marginBottom:6}}><span>{ic}</span><span>{v}</span></div>
                ))}
              </div>
              <div style={{background:"#f0fdf4",border:"1px solid #86efac",borderRadius:9,padding:"11px 16px",fontSize:13,color:"#166534",marginBottom:16}}>🚚 Estimated delivery: <strong>15–30 days</strong> to {orderDone.city}</div>
              <div style={{fontSize:13,color:"#7a86a0",marginBottom:20}}>Questions? <a href="mailto:info@frexsom.com" style={{color:ORANGE,fontWeight:600,textDecoration:"none"}}>info@frexsom.com</a> · <a href="tel:+252611013604" style={{color:ORANGE,fontWeight:600,textDecoration:"none"}}>(+252) 611 013 604</a></div>
              <button onClick={()=>{setCheckoutStep(null);setOrderDone(null);}} style={{width:"100%",background:NAVY,color:"white",border:"none",padding:"14px",borderRadius:10,cursor:"pointer",fontWeight:800,fontSize:15,fontFamily:"inherit"}}>Continue Shopping</button>
            </div>
          </div>
        )}

        {/* ════ DASHBOARD ════ */}
        {page==="dashboard"&&(
          <div style={{padding:30}}>
            <div style={{marginBottom:24}}><div style={{fontSize:24,fontWeight:800,color:NAVY}}>Welcome back, Admin 👋</div><div style={{color:"#7a86a0",fontSize:14,marginTop:3}}>Your FrexSOM store overview.</div></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
              {[["📦",products.length,"Products",NAVY],["🛒",orders.length,"Orders",GREEN],["💰","~57%","Avg Margin",ORANGE],["❤️",wishlist.length,"Wishlisted","#8b5cf6"]].map(([ic,v,l,c])=>(
                <Card key={l} style={{padding:"18px 20px"}}>
                  <div style={{fontSize:26,marginBottom:6}}>{ic}</div>
                  <div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div>
                  <div style={{fontSize:12,color:"#7a86a0",marginTop:2}}>{l}</div>
                </Card>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:18}}>
              <Card style={{padding:22}}>
                <div style={{fontWeight:700,color:NAVY,fontSize:15,marginBottom:16}}>📋 Recent Orders</div>
                {orders.slice(0,4).map((o,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:i<3?"1px solid #f0f2f8":"none"}}>
                    <div style={{width:38,height:38,borderRadius:10,background:`${NAVY}10`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🧾</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,color:NAVY,fontSize:13}}>{o.name} — {o.city}</div>
                      <div style={{fontSize:11.5,color:"#94a3b8",marginTop:1}}>{o.items.substring(0,35)}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontWeight:800,color:ORANGE,fontSize:13,marginBottom:3}}>{o.total}</div>
                      <span style={{fontSize:11,background:`${statusColor(o.status)}18`,color:statusColor(o.status),padding:"2px 8px",borderRadius:20,fontWeight:700}}>{o.status}</span>
                    </div>
                  </div>
                ))}
              </Card>
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <Card style={{background:`linear-gradient(135deg,${NAVY},#1a3580)`,padding:22}}>
                  <div style={{color:"rgba(255,255,255,0.55)",fontSize:12,fontWeight:600,marginBottom:10}}>QUICK ACTIONS</div>
                  {[["🏪 Visit Storefront","storefront"],["🔎 Source Products","sourcing"],["💲 Price a Product","pricing"],["📋 Manage Orders","orders"]].map(([lbl,pg])=>(
                    <button key={pg} onClick={()=>goTo(pg)} style={{display:"block",width:"100%",textAlign:"left",padding:"9px 12px",marginBottom:7,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,color:"white",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"inherit"}}>{lbl}</button>
                  ))}
                </Card>
                <Card style={{borderLeft:`4px solid ${ORANGE}`,padding:"16px 18px"}}>
                  <div style={{fontWeight:700,color:NAVY,fontSize:13,marginBottom:4}}>🌐 Live Website</div>
                  <a href="https://frexsom.com" target="_blank" rel="noreferrer" style={{fontWeight:800,color:ORANGE,fontSize:15,textDecoration:"none"}}>frexsom.com ↗</a>
                  <div style={{fontSize:11.5,color:GREEN,marginTop:4,fontWeight:600}}>● Live & Active</div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* ════ ORDERS ════ */}
        {page==="orders"&&(
          <div style={{padding:30}}>
            <div style={{marginBottom:22}}><div style={{fontSize:22,fontWeight:800,color:NAVY}}>Orders</div><div style={{color:"#7a86a0",fontSize:14,marginTop:3}}>{orders.length} total · {orders.filter(o=>o.status==="Processing").length} processing</div></div>
            <Card style={{padding:0,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1.5fr 1.5fr 0.7fr 1fr 1fr",background:GRAY,padding:"12px 20px",fontSize:12,fontWeight:700,color:"#7a86a0",textTransform:"uppercase",letterSpacing:0.5}}>
                {["Order ID","Customer","Items","Total","Payment","Status"].map(h=><div key={h}>{h}</div>)}
              </div>
              {orders.map((o,i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1.5fr 1.5fr 0.7fr 1fr 1fr",padding:"14px 20px",borderBottom:i<orders.length-1?"1px solid #f0f2f8":"none",alignItems:"center"}}>
                  <div style={{fontWeight:700,color:NAVY,fontSize:12.5}}>{o.id}</div>
                  <div><div style={{fontWeight:600,color:NAVY,fontSize:13}}>{o.name}</div><div style={{fontSize:11.5,color:"#94a3b8"}}>{o.city} · {o.date}</div></div>
                  <div style={{fontSize:12,color:"#64748b"}}>{o.items.substring(0,28)}…</div>
                  <div style={{fontWeight:800,color:ORANGE,fontSize:13}}>{o.total}</div>
                  <div style={{fontSize:12,color:"#64748b"}}>{o.payment}</div>
                  <select value={o.status} onChange={e=>{const s=e.target.value;setOrders(prev=>prev.map((ord,j)=>j===i?{...ord,status:s}:ord));showToast(`Order updated to ${s}`);}}
                    style={{padding:"5px 8px",borderRadius:8,border:`1.5px solid ${statusColor(o.status)}`,background:`${statusColor(o.status)}12`,color:statusColor(o.status),fontSize:12,fontWeight:700,cursor:"pointer",outline:"none",fontFamily:"inherit"}}>
                    {["Processing","Shipped","Delivered","Cancelled"].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* ════ SOURCE PRODUCTS ════ */}
        {page==="sourcing"&&(
          <div style={{padding:30}}>
            <div style={{marginBottom:22}}><div style={{fontSize:22,fontWeight:800,color:NAVY}}>🔎 Source Products</div><div style={{color:"#7a86a0",fontSize:14,marginTop:3}}>Describe what you want to sell — our system finds the best products and supplier details for you.</div></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
              {[["1️⃣","Describe","Type what you want to sell"],["2️⃣","Analyze","System finds best products"],["3️⃣","Review","Check margins and details"],["4️⃣","Import","Add to catalog with one click"]].map(([num,title,desc])=>(
                <Card key={title} style={{padding:"16px 18px",textAlign:"center"}}>
                  <div style={{fontSize:28,marginBottom:8}}>{num}</div>
                  <div style={{fontWeight:700,color:NAVY,fontSize:14,marginBottom:4}}>{title}</div>
                  <div style={{fontSize:12,color:"#7a86a0",lineHeight:1.5}}>{desc}</div>
                </Card>
              ))}
            </div>
            <Card style={{marginBottom:20,padding:24}}>
              <div style={{fontSize:15,fontWeight:700,color:NAVY,marginBottom:12}}>What do you want to sell?</div>
              <div style={{display:"flex",gap:10,marginBottom:14}}>
                <input value={srcQ} onChange={e=>setSrcQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSource()} placeholder='e.g. "women fashion accessories", "home appliances"'
                  style={{flex:1,padding:"12px 18px",borderRadius:9,border:"1.5px solid #dde1ee",fontSize:14,outline:"none",fontFamily:"inherit"}}/>
                <button onClick={doSource} disabled={srcLoad} style={{background:NAVY,color:"white",border:"none",padding:"12px 26px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit",opacity:srcLoad?0.7:1,whiteSpace:"nowrap"}}>
                  {srcLoad?"Analyzing…":"🔎 Find Products"}
                </button>
              </div>
              <div style={{fontSize:13,color:"#7a86a0",marginBottom:10}}>Popular categories:</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {["Women's Fashion","Electronics & Gadgets","Home Appliances","Beauty & Skincare","Children's Toys","Sports Equipment","Kitchen Essentials","Mobile Accessories"].map(s=>(
                  <button key={s} onClick={()=>setSrcQ(s)} style={{background:`${NAVY}08`,border:`1px solid ${NAVY}18`,padding:"6px 14px",borderRadius:20,cursor:"pointer",fontSize:12.5,color:NAVY,fontFamily:"inherit"}}>{s}</button>
                ))}
              </div>
            </Card>
            {srcLoad&&<Card style={{padding:50,textAlign:"center"}}><div style={{fontSize:42,marginBottom:14}}>🔍</div><div style={{fontWeight:700,color:NAVY,fontSize:16,marginBottom:6}}>Finding the best products for you…</div></Card>}
            {srcRes&&srcRes.length===0&&<Card style={{padding:30,textAlign:"center"}}><div style={{color:"#ef4444",fontSize:15}}>No results. Please try a different search term.</div></Card>}
            {srcRes&&srcRes.length>0&&(
              <div>
                <div style={{fontSize:16,fontWeight:700,color:NAVY,marginBottom:16}}>✅ Found {srcRes.length} products for "{srcQ}"</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:18}}>
                  {srcRes.map((p,i)=>(
                    <Card key={i} style={{padding:22}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                        <div><div style={{fontSize:16,fontWeight:800,color:NAVY,marginBottom:3}}>{p.name}</div><div style={{fontSize:12.5,color:"#7a86a0"}}>Supplier: {p.supplier}</div></div>
                        <span style={{background:`${ORANGE}15`,color:ORANGE,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:700,flexShrink:0}}>{p.category}</span>
                      </div>
                      <div style={{background:GRAY,borderRadius:10,padding:"14px 16px",marginBottom:14}}>
                        <div style={{fontSize:12,fontWeight:700,color:NAVY,marginBottom:10,textTransform:"uppercase",letterSpacing:0.5}}>💰 Profit Analysis</div>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                          {[["Unit Cost",`$${p.unitCost}`,"#3b82f6"],["Est. Shipping",`$${p.estimatedShipping}`,"#7a86a0"],["Est. Margin",p.profitMargin||"~60%",GREEN]].map(([l,v,c])=>(
                            <div key={l} style={{background:"white",borderRadius:8,padding:"10px 8px",textAlign:"center"}}>
                              <div style={{fontSize:10.5,color:"#94a3b8",marginBottom:3}}>{l}</div>
                              <div style={{fontSize:15,fontWeight:800,color:c}}>{v}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{marginTop:10,display:"flex",justifyContent:"space-between",fontSize:12.5}}>
                          <span style={{color:"#7a86a0"}}>Min. Order:</span><span style={{fontWeight:700,color:NAVY}}>{p.moq} units</span>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:12.5,marginTop:4}}>
                          <span style={{color:"#7a86a0"}}>Suggested Price:</span><span style={{fontWeight:800,color:ORANGE}}>${((p.unitCost+p.estimatedShipping)*2.5).toFixed(2)}</span>
                        </div>
                      </div>
                      <div style={{background:LIGHT,border:`1px solid ${ORANGE}33`,borderRadius:8,padding:"10px 14px",marginBottom:16,fontSize:13,color:"#7a4000"}}>📈 <strong>Why it sells:</strong> {p.whyItSells}</div>
                      <button onClick={()=>importP(p)} style={{width:"100%",background:NAVY,color:"white",border:"none",padding:"12px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit"}}>+ Import to My Catalog</button>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════ CATALOG ════ */}
        {page==="catalog"&&(
          <div style={{padding:30}}>
            <div style={{marginBottom:22}}><div style={{fontSize:22,fontWeight:800,color:NAVY}}>Product Catalog</div><div style={{color:"#7a86a0",fontSize:14,marginTop:3}}>{products.length} products · Manage your listings</div></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
              {products.map(p=>{
                const margin=Math.round(((p.price-p.cost)/p.price)*100);
                return (
                  <Card key={p.id} style={{display:"flex",flexDirection:"column",padding:0,overflow:"hidden"}}>
                    <img src={p.image} alt={p.name} style={{width:"100%",height:165,objectFit:"cover"}}
                      onError={e=>{e.target.src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80";}}/>
                    <div style={{padding:"14px 16px 16px",display:"flex",flexDirection:"column",flex:1}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                        <div style={{fontSize:15,fontWeight:700,color:NAVY,lineHeight:1.2,flex:1,marginRight:8}}>{p.name}</div>
                        <span style={{background:`${ORANGE}15`,color:ORANGE,padding:"3px 10px",borderRadius:20,fontSize:11.5,fontWeight:700,flexShrink:0}}>{p.category}</span>
                      </div>
                      <div style={{fontSize:12,color:"#64748b",lineHeight:1.55,flex:1,marginBottom:10}}>{p.description}</div>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:12}}>
                        {[["Price",`$${p.price}`,ORANGE],["Cost",`$${p.cost}`,"#7a86a0"],["Margin",`${margin}%`,margin>50?GREEN:ORANGE]].map(([l,v,c])=>(
                          <div key={l} style={{background:GRAY,borderRadius:7,padding:"7px",textAlign:"center"}}><div style={{fontSize:10,color:"#94a3b8"}}>{l}</div><div style={{fontSize:13.5,fontWeight:800,color:c}}>{v}</div></div>
                        ))}
                      </div>
                      <button onClick={()=>rewriteDesc(p)} disabled={descLoad===p.id} style={{width:"100%",background:descLoad===p.id?"#94a3b8":ORANGE,color:"white",border:"none",padding:"9px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:12,fontFamily:"inherit"}}>
                        {descLoad===p.id?"Rewriting…":"✏️ Refresh Description"}
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ════ PRICING ════ */}
        {page==="pricing"&&(
          <div style={{padding:30}}>
            <div style={{marginBottom:22}}><div style={{fontSize:22,fontWeight:800,color:NAVY}}>Smart Pricing</div><div style={{color:"#7a86a0",fontSize:14,marginTop:3}}>Get the optimal selling price for any product.</div></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,alignItems:"start"}}>
              <Card style={{padding:24}}>
                {[["Product Name","text",pName,setPName,"e.g. Solar Power Bank 20000mAh"],["Total Cost in USD","number",pCost,setPCost,"e.g. 12.50"]].map(([lbl,type,val,set,ph])=>(
                  <div key={lbl} style={{marginBottom:16}}>
                    <label style={{fontSize:12.5,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>{lbl}</label>
                    <input value={val} onChange={e=>set(e.target.value)} type={type} placeholder={ph} style={{width:"100%",padding:"11px 14px",borderRadius:9,border:"1.5px solid #dde1ee",fontSize:14,boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/>
                  </div>
                ))}
                <button onClick={doPrice} disabled={priceLoad} style={{width:"100%",background:NAVY,color:"white",border:"none",padding:"12px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit",opacity:priceLoad?0.7:1}}>{priceLoad?"Calculating…":"⚡ Get Pricing Strategy"}</button>
                <div style={{marginTop:16,padding:"12px 14px",background:`${ORANGE}0e`,borderRadius:9,fontSize:12.5,color:"#7a4000",lineHeight:1.5}}>💡 Total cost = product price + shipping.</div>
              </Card>
              {priceRes&&(
                <div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12}}>
                    {[{l:"Budget",v:`$${priceRes.budget}`,c:"#3b82f6",s:"High volume"},{l:"✦ Recommended",v:`$${priceRes.recommendedPrice}`,c:ORANGE,s:"Best balance"},{l:"Premium",v:`$${priceRes.premium}`,c:"#8b5cf6",s:"Quality signal"}].map(x=>(
                      <div key={x.l} style={{background:"white",borderRadius:12,padding:"16px 12px",textAlign:"center",boxShadow:"0 2px 10px rgba(13,31,92,0.07)",border:x.l.includes("✦")?`2px solid ${x.c}`:"2px solid transparent"}}>
                        <div style={{fontSize:11.5,color:"#7a86a0",marginBottom:4}}>{x.l}</div>
                        <div style={{fontSize:22,fontWeight:900,color:x.c}}>{x.v}</div>
                        <div style={{fontSize:11,color:"#94a3b8",marginTop:2}}>{x.s}</div>
                      </div>
                    ))}
                  </div>
                  <Card style={{padding:18}}>
                    <div style={{display:"flex",gap:10,marginBottom:12}}>
                      <div style={{flex:1,background:GRAY,borderRadius:9,padding:"12px 14px"}}><div style={{fontSize:11.5,color:"#7a86a0"}}>Gross Margin</div><div style={{fontWeight:800,color:GREEN,fontSize:16,marginTop:2}}>{priceRes.margin}</div></div>
                      <div style={{flex:2,background:GRAY,borderRadius:9,padding:"12px 14px"}}><div style={{fontSize:11.5,color:"#7a86a0"}}>Demand Forecast</div><div style={{fontWeight:600,color:NAVY,fontSize:13,marginTop:2,lineHeight:1.4}}>{priceRes.demandForecast}</div></div>
                    </div>
                    <div style={{background:LIGHT,border:`1px solid ${ORANGE}33`,borderRadius:9,padding:"11px 14px",fontSize:13,color:"#7a4000",lineHeight:1.5}}>💡 <strong>Expert tip:</strong> {priceRes.tip}</div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════ SUPPORT ════ */}
        {page==="support"&&(
          <div style={{padding:30,display:"flex",flexDirection:"column",height:"calc(100vh - 60px)"}}>
            <div style={{marginBottom:18}}>
              <div style={{fontSize:22,fontWeight:800,color:NAVY}}>Customer Support</div>
              <div style={{color:"#7a86a0",fontSize:14,marginTop:3}}>24/7 help · <a href="mailto:info@frexsom.com" style={{color:ORANGE,textDecoration:"none",fontWeight:600}}>info@frexsom.com</a> · <a href="tel:+252611013604" style={{color:ORANGE,textDecoration:"none",fontWeight:600}}>(+252) 611 013 604</a></div>
            </div>
            <Card style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",padding:0}}>
              <div style={{padding:"14px 20px",borderBottom:"1px solid #f0f2f8",display:"flex",alignItems:"center",gap:12,background:`linear-gradient(135deg,${NAVY},#1a3580)`}}>
                <div style={{width:40,height:40,borderRadius:"50%",background:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>💬</div>
                <div><div style={{fontWeight:700,color:"white",fontSize:14}}>FrexSOM Support</div><div style={{fontSize:11.5,color:"#86efac",fontWeight:600}}>● Online — replies instantly</div></div>
              </div>
              <div style={{flex:1,overflowY:"auto",padding:"20px 22px"}}>
                {msgs.map((m,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:13}}>
                    {m.role==="assistant"&&<div style={{width:34,height:34,borderRadius:"50%",background:NAVY,display:"flex",alignItems:"center",justifyContent:"center",marginRight:9,fontSize:15,flexShrink:0}}>💬</div>}
                    <div style={{maxWidth:"72%",padding:"11px 15px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?NAVY:"#f4f6fb",color:m.role==="user"?"white":"#1e293b",fontSize:13.5,lineHeight:1.6}}>{m.content}</div>
                  </div>
                ))}
                {chatLoad&&<div style={{display:"flex",marginBottom:13}}><div style={{width:34,height:34,borderRadius:"50%",background:NAVY,display:"flex",alignItems:"center",justifyContent:"center",marginRight:9}}>💬</div><div style={{background:"#f4f6fb",padding:"11px 15px",borderRadius:"18px 18px 18px 4px",color:"#94a3b8",fontSize:13}}>Typing…</div></div>}
              </div>
              <div style={{padding:"13px 20px",borderTop:"1px solid #f0f2f8"}}>
                <div style={{display:"flex",gap:7,marginBottom:10,flexWrap:"wrap"}}>
                  {["Shipping time?","Payment options?","Return policy?","Delivery to Baidoa?"].map(q=>(
                    <button key={q} onClick={()=>setChatIn(q)} style={{background:"#f4f6fb",border:"1px solid #dde1ee",padding:"5px 12px",borderRadius:20,cursor:"pointer",fontSize:12,color:NAVY,fontFamily:"inherit"}}>{q}</button>
                  ))}
                </div>
                <div style={{display:"flex",gap:10}}>
                  <input value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doChat()} placeholder="Type your message…" style={{flex:1,padding:"12px 18px",borderRadius:25,border:"1.5px solid #dde1ee",fontSize:13.5,outline:"none",fontFamily:"inherit"}}/>
                  <button onClick={doChat} disabled={chatLoad} style={{background:NAVY,color:"white",border:"none",padding:"12px 22px",borderRadius:25,cursor:"pointer",fontWeight:700,fontSize:13.5,fontFamily:"inherit",opacity:chatLoad?0.7:1}}>Send</button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}