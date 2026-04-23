import { useState, useEffect } from "react";

const NAVY = "#0d1f5c";
const ORANGE = "#f7931a";
const LIGHT = "#fff7ee";
const GRAY = "#f4f6fb";
const GREEN = "#10b981";

// ─── DATA ───────────────────────────────────────────────────────────
const CATEGORIES = [
  { id:"all", label:"All Products", icon:"🛍" },
  { id:"Fashion", label:"Fashion", icon:"👗" },
  { id:"Electronics", label:"Electronics", icon:"📱" },
  { id:"Kitchen", label:"Kitchen", icon:"🍳" },
  { id:"Beauty", label:"Beauty", icon:"💄" },
  { id:"Sports", label:"Sports", icon:"⚽" },
];

const PRODUCTS = [
  { id:1, name:"Premium Hijab Set", category:"Fashion", price:15.99, oldPrice:22.00, cost:4.50, stock:120, rating:4.8, reviews:124, badge:"Best Seller", isNew:false,
    description:"A breathable, elegant hijab set available in 12 beautiful colors — perfect for daily wear in any weather.",
    image:"https://images.unsplash.com/photo-1557744813-13da6e91f41f?w=600&q=80" },
  { id:2, name:"Solar Power Bank 20000mAh", category:"Electronics", price:45.00, oldPrice:60.00, cost:12.00, stock:85, rating:4.6, reviews:89, badge:"Popular", isNew:false,
    description:"High-capacity 20000mAh power bank with dual USB ports — charge your devices anywhere, anytime.",
    image:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80" },
  { id:3, name:"Insulated Thermos Flask", category:"Kitchen", price:18.50, oldPrice:null, cost:5.00, stock:200, rating:4.7, reviews:203, badge:"", isNew:false,
    description:"Premium vacuum-insulated flask that keeps beverages hot or cold for 24 hours.",
    image:"https://images.unsplash.com/photo-1536939459926-301728717817?w=600&q=80" },
  { id:4, name:"Wireless Earbuds Pro", category:"Electronics", price:32.00, oldPrice:45.00, cost:9.00, stock:150, rating:4.5, reviews:67, badge:"New", isNew:true,
    description:"Compact wireless earbuds with crystal-clear sound and 6-hour battery life.",
    image:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80" },
  { id:5, name:"Abaya Modest Dress", category:"Fashion", price:28.00, oldPrice:38.00, cost:8.00, stock:90, rating:4.9, reviews:156, badge:"Top Rated", isNew:false,
    description:"Elegant full-length abaya in premium lightweight fabric — designed for comfort and modesty.",
    image:"https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&q=80" },
  { id:6, name:"Stainless Steel Cookware Set", category:"Kitchen", price:55.00, oldPrice:75.00, cost:18.00, stock:60, rating:4.6, reviews:44, badge:"", isNew:false,
    description:"Durable 5-piece stainless steel cookware set — compatible with all stove types.",
    image:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" },
  { id:7, name:"Portable Blender", category:"Kitchen", price:24.00, oldPrice:32.00, cost:7.00, stock:110, rating:4.4, reviews:38, badge:"New", isNew:true,
    description:"Compact USB-rechargeable blender — perfect for smoothies, juices and shakes on the go.",
    image:"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80" },
  { id:8, name:"Smartwatch Fitness Band", category:"Electronics", price:38.00, oldPrice:52.00, cost:11.00, stock:75, rating:4.3, reviews:92, badge:"Popular", isNew:false,
    description:"Track steps, heart rate and sleep with this sleek waterproof smartwatch.",
    image:"https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80" },
];

const CITIES = ["Mogadishu","Baidoa","Hargeisa","Kismayo","Garowe","Bosaso","Beledweyne","Other"];
const PAYMENTS = ["EVC Plus","Zaad","E-Dahab","Cash on Delivery"];

const MOCK_ORDERS = [
  { id:"FRX-A1B2C3", name:"Amina Hassan", city:"Mogadishu", items:"Premium Hijab Set × 2", total:"$31.98", payment:"EVC Plus", status:"Processing", date:"2026-04-23" },
  { id:"FRX-D4E5F6", name:"Mohamed Ali", city:"Baidoa", items:"Solar Power Bank × 1", total:"$45.00", payment:"Zaad", status:"Shipped", date:"2026-04-22" },
  { id:"FRX-G7H8I9", name:"Faadumo Omar", city:"Hargeisa", items:"Abaya Modest Dress × 1", total:"$28.00", payment:"Cash on Delivery", status:"Delivered", date:"2026-04-20" },
];

const NAV_ITEMS = [
  { id:"storefront", label:"Storefront", icon:"🏪" },
  { id:"dashboard", label:"Dashboard", icon:"⊞" },
  { id:"sourcing", label:"Source Products", icon:"🔎" },
  { id:"catalog", label:"Catalog", icon:"📦" },
  { id:"pricing", label:"Pricing", icon:"💲" },
  { id:"orders", label:"Orders", icon:"📋" },
  { id:"support", label:"Support", icon:"💬" },
];

const SUGGESTIONS = ["Women's Clothing","Solar Products","School Supplies","Electronics","Home Appliances","Beauty Products","Sports Gear"];

async function ask(messages, system) {
  try {
    const r = await fetch('/api/claude', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:1000, system, messages })
    });
    const d = await r.json();
    return d.content?.[0]?.text || '';
  } catch { return ''; }
}

// ─── COMPONENTS ─────────────────────────────────────────────────────
const Logo = ({ size=20 }) => (
  <div style={{ background:"white", padding:"5px 14px", borderRadius:30, boxShadow:"0 2px 8px rgba(0,0,0,0.15)", display:"inline-flex", alignItems:"center" }}>
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
    {[1,2,3,4,5].map(i => <span key={i} style={{ color:i<=Math.round(rating)?"#f59e0b":"#ddd", fontSize:12 }}>★</span>)}
    {count !== undefined && <span style={{ fontSize:11, color:"#94a3b8", marginLeft:2 }}>({count})</span>}
  </div>
);

const Toast = ({ msg, color }) => (
  <div style={{ position:"fixed", top:22, right:22, zIndex:999, background:color||GREEN, color:"white", padding:"12px 22px", borderRadius:12, fontWeight:700, fontSize:14, boxShadow:"0 4px 24px rgba(0,0,0,0.18)", fontFamily:"inherit" }}>
    {msg}
  </div>
);

const Pill = ({ children, active, onClick }) => (
  <button onClick={onClick} style={{ padding:"7px 18px", borderRadius:25, border:`1.5px solid ${active?NAVY:"#dde1ee"}`, background:active?NAVY:"transparent", color:active?"white":"#5a6280", cursor:"pointer", fontWeight:active?700:500, fontSize:13, fontFamily:"inherit" }}>{children}</button>
);

const Card = ({ children, style={} }) => (
  <div style={{ background:"white", borderRadius:14, boxShadow:"0 2px 12px rgba(13,31,92,0.07)", ...style }}>{children}</div>
);

const StatusBadge = ({ status }) => {
  const colors = { Delivered:GREEN, Shipped:ORANGE, Processing:"#3b82f6", Cancelled:"#ef4444" };
  return <span style={{ fontSize:11.5, background:`${colors[status]}18`, color:colors[status], padding:"3px 10px", borderRadius:20, fontWeight:700 }}>{status}</span>;
};

// ─── MAIN APP ────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("storefront");
  const [products, setProducts] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(null);
  const [orderDone, setOrderDone] = useState(null);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [form, setForm] = useState({ name:"", phone:"", city:"Mogadishu", address:"", payment:"EVC Plus" });
  const [catFilter, setCatFilter] = useState("all");
  const [searchQ, setSearchQ] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const [toast, setToast] = useState(null);
  const [newsletter, setNewsletter] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [countdown, setCountdown] = useState({ h:5, m:32, s:47 });

  // Sourcing
  const [srcQ, setSrcQ] = useState(""); const [srcRes, setSrcRes] = useState(null); const [srcLoad, setSrcLoad] = useState(false);
  // Catalog
  const [descLoad, setDescLoad] = useState(false);
  // Pricing
  const [pName, setPName] = useState(""); const [pCost, setPCost] = useState(""); const [priceRes, setPriceRes] = useState(null); const [priceLoad, setPriceLoad] = useState(false);
  // Chat
  const [msgs, setMsgs] = useState([{ role:"assistant", content:"Salaam! 👋 Welcome to FrexSOM. I'm here to help with orders, delivery, payments and any questions. How can I help you today?" }]);
  const [chatIn, setChatIn] = useState(""); const [chatLoad, setChatLoad] = useState(false);

  // Countdown timer
  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(prev => {
        let { h, m, s } = prev;
        s--; if(s<0){ s=59; m--; } if(m<0){ m=59; h--; } if(h<0){ h=23; m=59; s=59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const showToast = (msg, color=GREEN) => { setToast({ msg, color }); setTimeout(()=>setToast(null), 2500); };
  const cartCount = cart.reduce((a,i)=>a+i.qty,0);
  const cartTotal = cart.reduce((a,i)=>a+i.price*i.qty,0).toFixed(2);

  const addToCart = (p) => {
    setCart(prev=>{ const ex=prev.find(i=>i.id===p.id); return ex?prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...prev,{...p,qty:1}]; });
    showToast(`Added to cart! 🛒`);
  };
  const qtyChange = (id,d) => setCart(prev=>prev.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const removeItem = (id) => setCart(prev=>prev.filter(i=>i.id!==id));
  const toggleWish = (id) => { const had=wishlist.includes(id); setWishlist(prev=>had?prev.filter(i=>i!==id):[...prev,id]); showToast(had?"Removed from wishlist":"Saved to wishlist ❤️",ORANGE); };

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
    const txt = await ask([{role:"user",content:`Find 4 Chinese supplier products for: "${srcQ}" for Somalia.`}],
      `You are a China-Somalia sourcing expert. Return ONLY a JSON array of 4 objects: name, supplier, moq (number), unitCost (number), estimatedShipping (number), category, whySomalia (1 sentence). No markdown.`);
    try { setSrcRes(JSON.parse(txt.replace(/```json|```/g,"").trim())); } catch { setSrcRes([]); }
    setSrcLoad(false);
  };

  const importP = (p) => {
    setProducts(prev=>[...prev,{ id:Date.now(), name:p.name, category:p.category, price:parseFloat(((p.unitCost+p.estimatedShipping)*2.5).toFixed(2)), oldPrice:null, cost:parseFloat((p.unitCost+p.estimatedShipping).toFixed(2)), stock:p.moq, rating:4.5, reviews:0, badge:"New", isNew:true, description:p.whySomalia, image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" }]);
    showToast("Product imported! 📦"); setPage("catalog");
  };

  const rewriteDesc = async (product) => {
    setDescLoad(product.id);
    const txt = await ask([{role:"user",content:`2-sentence product description for: ${product.name}, $${product.price}, for online shoppers.`}],`Write concise, compelling e-commerce product descriptions. No location references. Return only the description.`);
    if(txt) setProducts(prev=>prev.map(p=>p.id===product.id?{...p,description:txt}:p));
    setDescLoad(false);
  };

  const doPrice = async () => {
    if(!pName||!pCost) return;
    setPriceLoad(true); setPriceRes(null);
    const txt = await ask([{role:"user",content:`Product: ${pName}. Landed cost from China: $${pCost}. Somalia market pricing.`}],
      `Pricing expert for Somali e-commerce. Return ONLY JSON: {"budget":number,"standard":number,"premium":number,"recommendedPrice":number,"margin":"string","demandForecast":"string","tip":"string"}. No markdown.`);
    try { setPriceRes(JSON.parse(txt.replace(/```json|```/g,"").trim())); } catch {}
    setPriceLoad(false);
  };

  const doChat = async () => {
    if(!chatIn.trim()||chatLoad) return;
    const um={role:"user",content:chatIn}; const nm=[...msgs,um];
    setMsgs(nm); setChatIn(""); setChatLoad(true);
    const txt = await ask(nm,`Customer support agent for FrexSOM Market — online store in Somalia sourcing from China. Help with shipping (15–30 days), payments (EVC Plus, Zaad, E-Dahab, cash), returns, and products. Contact: info@frexsom.com | (+252) 611 013 604. Warm, professional, 2–3 sentences.`);
    setMsgs(prev=>[...prev,{role:"assistant",content:txt||"Sorry, please try again."}]);
    setChatLoad(false);
  };

  const pad = n => String(n).padStart(2,'0');
  const filteredProducts = products.filter(p=>(catFilter==="all"||p.category===catFilter)&&p.name.toLowerCase().includes(searchQ.toLowerCase()));
  const flashDeals = products.filter(p=>p.oldPrice).slice(0,4);
  const newArrivals = products.filter(p=>p.isNew||p.badge==="New");
  const bestSellers = products.filter(p=>p.badge==="Best Seller"||p.badge==="Top Rated"||p.badge==="Popular");

  // ── Product Card ──
  const ProductCard = ({ p, size="normal" }) => {
    const inCart = cart.find(i=>i.id===p.id);
    const wished = wishlist.includes(p.id);
    const discount = p.oldPrice ? Math.round((1-p.price/p.oldPrice)*100) : null;
    const compact = size==="compact";
    return (
      <div style={{ background:"white", borderRadius:14, overflow:"hidden", boxShadow:"0 2px 12px rgba(13,31,92,0.07)", position:"relative", transition:"box-shadow 0.2s", display:"flex", flexDirection:"column" }}
        onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 32px rgba(13,31,92,0.14)"}
        onMouseLeave={e=>e.currentTarget.style.boxShadow="0 2px 12px rgba(13,31,92,0.07)"}>
        {p.badge&&<div style={{ position:"absolute",top:10,left:10,zIndex:2,background:p.badge==="Best Seller"?ORANGE:p.badge==="Top Rated"?GREEN:p.badge==="New"?"#8b5cf6":NAVY,color:"white",padding:"3px 10px",borderRadius:20,fontSize:10.5,fontWeight:800 }}>{p.badge}</div>}
        {discount&&<div style={{ position:"absolute",top:p.badge?34:10,left:10,zIndex:2,background:"#ef4444",color:"white",padding:"3px 10px",borderRadius:20,fontSize:10.5,fontWeight:800 }}>-{discount}%</div>}
        <button onClick={()=>toggleWish(p.id)} style={{ position:"absolute",top:8,right:8,zIndex:2,background:"white",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:16,boxShadow:"0 2px 8px rgba(0,0,0,0.12)",display:"flex",alignItems:"center",justifyContent:"center" }}>{wished?"❤️":"🤍"}</button>
        <div style={{ height:compact?150:200,overflow:"hidden",cursor:"pointer",position:"relative" }} onClick={()=>setQuickView(p)}>
          <img src={p.image} alt={p.name} style={{ width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.3s" }}
            onMouseEnter={e=>e.target.style.transform="scale(1.06)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
          <div style={{ position:"absolute",bottom:8,left:"50%",transform:"translateX(-50%)",background:"rgba(13,31,92,0.8)",color:"white",padding:"4px 14px",borderRadius:20,fontSize:12,fontWeight:600,whiteSpace:"nowrap",pointerEvents:"none",opacity:0,transition:"opacity 0.2s" }} className="qv-label">Quick View 👁️</div>
        </div>
        <div style={{ padding:compact?"10px 12px 14px":"13px 14px 16px", display:"flex", flexDirection:"column", flex:1 }}>
          <div style={{ fontSize:10.5,color:ORANGE,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,marginBottom:3 }}>{p.category}</div>
          <div style={{ fontSize:compact?13:14.5,fontWeight:700,color:NAVY,lineHeight:1.3,marginBottom:5,flex:1 }}>{p.name}</div>
          <Stars rating={p.rating} count={p.reviews}/>
          <div style={{ display:"flex",alignItems:"center",gap:8,margin:"8px 0 10px" }}>
            <span style={{ fontSize:compact?17:20,fontWeight:900,color:NAVY }}>${p.price}</span>
            {p.oldPrice&&<span style={{ fontSize:12.5,color:"#94a3b8",textDecoration:"line-through" }}>${p.oldPrice}</span>}
          </div>
          <div style={{ fontSize:11,color:p.stock<50?"#ef4444":GREEN,fontWeight:600,background:p.stock<50?"#fef2f2":"#f0fdf4",padding:"2px 8px",borderRadius:20,marginBottom:10,display:"inline-block",width:"fit-content" }}>
            {p.stock<50?`⚠️ Only ${p.stock} left`:`✅ In stock`}
          </div>
          {inCart
            ? <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",background:`${ORANGE}12`,borderRadius:9,padding:"6px 10px" }}>
                <button onClick={()=>qtyChange(p.id,-1)} style={{ background:ORANGE,color:"white",border:"none",borderRadius:7,width:26,height:26,cursor:"pointer",fontSize:17,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit" }}>−</button>
                <span style={{ fontWeight:800,color:ORANGE,fontSize:13 }}>{inCart.qty} in cart</span>
                <button onClick={()=>qtyChange(p.id,1)} style={{ background:ORANGE,color:"white",border:"none",borderRadius:7,width:26,height:26,cursor:"pointer",fontSize:17,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit" }}>+</button>
              </div>
            : <button onClick={()=>addToCart(p)} style={{ width:"100%",background:NAVY,color:"white",border:"none",padding:"10px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:13.5,fontFamily:"inherit" }}>Add to Cart</button>
          }
        </div>
      </div>
    );
  };

  const SectionTitle = ({ title, sub, action, onAction }) => (
    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:18 }}>
      <div>
        <div style={{ fontSize:20,fontWeight:800,color:NAVY }}>{title}</div>
        {sub&&<div style={{ fontSize:13,color:"#7a86a0",marginTop:2 }}>{sub}</div>}
      </div>
      {action&&<button onClick={onAction} style={{ background:"none",border:`1.5px solid ${NAVY}`,color:NAVY,padding:"6px 16px",borderRadius:25,cursor:"pointer",fontWeight:600,fontSize:13,fontFamily:"inherit" }}>{action} →</button>}
    </div>
  );

  return (
    <div style={{ display:"flex",height:"100vh",fontFamily:"'Segoe UI',system-ui,sans-serif",background:GRAY,overflow:"hidden" }}>

      {toast&&<Toast msg={toast.msg} color={toast.color}/>}

      {/* Quick View Modal */}
      {quickView&&(
        <div style={{ position:"fixed",inset:0,zIndex:80,background:"rgba(13,31,92,0.65)",display:"flex",alignItems:"center",justifyContent:"center" }} onClick={()=>setQuickView(null)}>
          <div style={{ background:"white",borderRadius:18,width:600,overflow:"hidden",boxShadow:"0 24px 64px rgba(0,0,0,0.25)" }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr" }}>
              <img src={quickView.image} alt={quickView.name} style={{ width:"100%",height:340,objectFit:"cover" }}/>
              <div style={{ padding:26,display:"flex",flexDirection:"column" }}>
                <div style={{ fontSize:11,color:ORANGE,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:5 }}>{quickView.category}</div>
                <div style={{ fontSize:19,fontWeight:800,color:NAVY,marginBottom:8,lineHeight:1.3,flex:1 }}>{quickView.name}</div>
                <Stars rating={quickView.rating} count={quickView.reviews}/>
                <div style={{ display:"flex",alignItems:"center",gap:10,margin:"12px 0" }}>
                  <span style={{ fontSize:28,fontWeight:900,color:NAVY }}>${quickView.price}</span>
                  {quickView.oldPrice&&<span style={{ fontSize:15,color:"#94a3b8",textDecoration:"line-through" }}>${quickView.oldPrice}</span>}
                </div>
                <div style={{ fontSize:13,color:"#64748b",lineHeight:1.6,marginBottom:18 }}>{quickView.description}</div>
                <div style={{ display:"flex",gap:8 }}>
                  <button onClick={()=>{addToCart(quickView);setQuickView(null);}} style={{ flex:1,background:NAVY,color:"white",border:"none",padding:"11px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit" }}>🛒 Add to Cart</button>
                  <button onClick={()=>{toggleWish(quickView.id);}} style={{ background:wishlist.includes(quickView.id)?"#fef2f2":"#f0f2f8",border:"none",padding:"11px 14px",borderRadius:9,cursor:"pointer",fontSize:17,fontFamily:"inherit" }}>{wishlist.includes(quickView.id)?"❤️":"🤍"}</button>
                  <button onClick={()=>setQuickView(null)} style={{ background:"#f0f2f8",border:"none",padding:"11px 14px",borderRadius:9,cursor:"pointer",fontSize:16,fontFamily:"inherit" }}>✕</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SIDEBAR (Admin) ── */}
      <div style={{ width:220,background:NAVY,display:"flex",flexDirection:"column",flexShrink:0,boxShadow:"2px 0 16px rgba(0,0,0,0.18)" }}>
        <div style={{ padding:"20px 16px 14px",borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <Logo size={17}/>
          <div style={{ fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:7,letterSpacing:0.8 }}>ADMIN PANEL</div>
        </div>
        <nav style={{ padding:"12px 10px",flex:1,overflowY:"auto" }}>
          {NAV_ITEMS.map(n=>(
            <button key={n.id} onClick={()=>setPage(n.id)} style={{ display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 13px",background:page===n.id?`${ORANGE}22`:"transparent",border:page===n.id?`1px solid ${ORANGE}55`:"1px solid transparent",borderRadius:9,color:page===n.id?ORANGE:"rgba(255,255,255,0.65)",cursor:"pointer",fontSize:13.5,fontWeight:page===n.id?700:400,marginBottom:3,textAlign:"left",fontFamily:"inherit" }}>
              <span style={{ fontSize:15,width:20,textAlign:"center" }}>{n.icon}</span>{n.label}
              {n.id==="storefront"&&cartCount>0&&<span style={{ marginLeft:"auto",background:ORANGE,color:"white",borderRadius:"50%",width:19,height:19,fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center" }}>{cartCount}</span>}
              {n.id==="orders"&&<span style={{ marginLeft:"auto",background:"#ef4444",color:"white",borderRadius:"50%",width:19,height:19,fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center" }}>{orders.filter(o=>o.status==="Processing").length}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,0.07)" }}>
          <a href="mailto:info@frexsom.com" style={{ display:"block",fontSize:11,color:"rgba(255,255,255,0.35)",textDecoration:"none",marginBottom:3 }}>✉️ info@frexsom.com</a>
          <a href="tel:+252611013604" style={{ display:"block",fontSize:11,color:"rgba(255,255,255,0.35)",textDecoration:"none" }}>📞 (+252) 611 013 604</a>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex:1,overflowY:"auto",background:GRAY }}>

        {/* ════════════════════════════════════════
            STOREFRONT — Jumia/Amazon style
        ════════════════════════════════════════ */}
        {page==="storefront"&&(
          <div style={{ minHeight:"100%",background:"#f8fafc" }}>

            {/* 1. Top announcement bar */}
            <div style={{ background:ORANGE,color:"white",textAlign:"center",padding:"8px 16px",fontSize:12.5,fontWeight:600 }}>
              🎁 Free delivery on orders over $50 &nbsp;·&nbsp; 📦 New arrivals every week &nbsp;·&nbsp; 📞 (+252) 611 013 604
            </div>

            {/* 2. Main navbar */}
            <div style={{ background:NAVY,padding:"0 24px",position:"sticky",top:0,zIndex:20,boxShadow:"0 2px 16px rgba(0,0,0,0.2)" }}>
              <div style={{ display:"flex",alignItems:"center",gap:14,height:66 }}>
                <Logo size={16}/>
                {/* Search bar */}
                <div style={{ flex:1,maxWidth:520,position:"relative" }}>
                  <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search products, brands and categories…"
                    style={{ width:"100%",padding:"10px 20px 10px 42px",borderRadius:25,border:"none",fontSize:13.5,boxSizing:"border-box",outline:"none",background:"white",fontFamily:"inherit" }}/>
                  <span style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#94a3b8",fontSize:15 }}>🔍</span>
                </div>
                <div style={{ display:"flex",gap:8,alignItems:"center",marginLeft:"auto" }}>
                  <button onClick={()=>setPage("support")} style={{ background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:"white",padding:"8px 14px",borderRadius:25,cursor:"pointer",fontWeight:600,fontSize:12.5,fontFamily:"inherit" }}>💬 Help</button>
                  <button onClick={()=>setPage("orders")} style={{ background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:"white",padding:"8px 14px",borderRadius:25,cursor:"pointer",fontWeight:600,fontSize:12.5,fontFamily:"inherit" }}>📋 Orders</button>
                  <button onClick={()=>setCartOpen(true)} style={{ background:cartCount>0?ORANGE:"rgba(255,255,255,0.12)",border:`1.5px solid ${cartCount>0?ORANGE:"rgba(255,255,255,0.2)"}`,color:"white",padding:"8px 18px",borderRadius:25,cursor:"pointer",fontWeight:700,fontSize:13.5,display:"flex",alignItems:"center",gap:8,fontFamily:"inherit" }}>
                    🛒 Cart {cartCount>0&&<span style={{ background:"white",color:ORANGE,borderRadius:"50%",width:20,height:20,fontSize:12,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center" }}>{cartCount}</span>}
                  </button>
                </div>
              </div>
              {/* Category nav bar */}
              <div style={{ display:"flex",gap:4,paddingBottom:10,overflowX:"auto" }}>
                {CATEGORIES.map(c=>(
                  <button key={c.id} onClick={()=>setCatFilter(c.id)} style={{ background:catFilter===c.id?ORANGE:"rgba(255,255,255,0.1)",border:`1px solid ${catFilter===c.id?ORANGE:"rgba(255,255,255,0.15)"}`,color:"white",padding:"5px 16px",borderRadius:20,cursor:"pointer",fontWeight:catFilter===c.id?700:400,fontSize:12.5,whiteSpace:"nowrap",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5 }}>
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Hero Banner */}
            <div style={{ background:`linear-gradient(130deg,${NAVY} 0%,#1a3580 50%,${ORANGE}aa 100%)`,padding:"50px 40px",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <div style={{ maxWidth:560 }}>
                <div style={{ display:"inline-block",background:ORANGE,color:"white",padding:"4px 14px",borderRadius:20,fontSize:12,fontWeight:700,marginBottom:12,letterSpacing:0.5 }}>🇸🇴 Somalia's #1 Online Store</div>
                <div style={{ fontSize:36,fontWeight:900,lineHeight:1.15,marginBottom:14 }}>
                  Shop Smarter.<br/>
                  <span style={{ color:ORANGE }}>Save More.</span>
                </div>
                <div style={{ fontSize:14,opacity:0.85,marginBottom:20,lineHeight:1.6 }}>Quality products sourced directly from China — delivered to your door across Somalia. Pay with EVC Plus, Zaad or cash.</div>
                <div style={{ display:"flex",gap:12 }}>
                  <button onClick={()=>document.getElementById('all-products')?.scrollIntoView({behavior:'smooth'})} style={{ background:ORANGE,color:"white",border:"none",padding:"13px 28px",borderRadius:25,cursor:"pointer",fontWeight:800,fontSize:15,fontFamily:"inherit" }}>Shop Now →</button>
                  <a href="mailto:info@frexsom.com" style={{ background:"rgba(255,255,255,0.12)",color:"white",border:"1px solid rgba(255,255,255,0.25)",padding:"13px 20px",borderRadius:25,cursor:"pointer",fontWeight:600,fontSize:14,textDecoration:"none",display:"inline-flex",alignItems:"center" }}>✉️ Contact Us</a>
                </div>
              </div>
              <div style={{ fontSize:120,filter:"drop-shadow(0 16px 40px rgba(0,0,0,0.3))",flexShrink:0 }}>🛍️</div>
            </div>

            {/* 4. Trust badges */}
            <div style={{ background:"white",borderBottom:"1px solid #eaecf4",padding:"14px 32px" }}>
              <div style={{ display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:12 }}>
                {[["🚢","Fast Delivery","15–30 days nationwide"],["💳","Mobile Payments","EVC Plus, Zaad & E-Dahab"],["🔄","Easy Returns","30-day return policy"],["🎧","24/7 Support","Always here to help"],["🔒","Secure Orders","Safe & trusted checkout"]].map(([ic,t,s])=>(
                  <div key={t} style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <span style={{ fontSize:26 }}>{ic}</span>
                    <div><div style={{ fontWeight:700,color:NAVY,fontSize:13 }}>{t}</div><div style={{ fontSize:11.5,color:"#94a3b8" }}>{s}</div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Category Cards */}
            <div style={{ padding:"28px 28px 0" }}>
              <SectionTitle title="Shop by Category"/>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:32 }}>
                {CATEGORIES.filter(c=>c.id!=="all").map(c=>(
                  <button key={c.id} onClick={()=>setCatFilter(c.id)} style={{ background:catFilter===c.id?NAVY:"white",border:`2px solid ${catFilter===c.id?NAVY:"#e8edf4"}`,borderRadius:14,padding:"20px 12px",cursor:"pointer",textAlign:"center",fontFamily:"inherit",transition:"all 0.2s" }}>
                    <div style={{ fontSize:36,marginBottom:8 }}>{c.icon}</div>
                    <div style={{ fontSize:13.5,fontWeight:700,color:catFilter===c.id?"white":NAVY }}>{c.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Flash Deals with countdown */}
            {flashDeals.length>0&&(
              <div style={{ padding:"0 28px 32px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:16 }}>
                    <div style={{ fontSize:20,fontWeight:800,color:NAVY }}>⚡ Flash Deals</div>
                    <div style={{ display:"flex",alignItems:"center",gap:6,background:NAVY,color:"white",padding:"5px 14px",borderRadius:25,fontSize:13,fontWeight:700 }}>
                      Ends in: {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}
                    </div>
                  </div>
                  <button onClick={()=>{setCatFilter("all");document.getElementById('all-products')?.scrollIntoView({behavior:'smooth'});}} style={{ background:"none",border:`1.5px solid ${NAVY}`,color:NAVY,padding:"6px 16px",borderRadius:25,cursor:"pointer",fontWeight:600,fontSize:13,fontFamily:"inherit" }}>See All →</button>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16 }}>
                  {flashDeals.map(p=><ProductCard key={p.id} p={p}/>)}
                </div>
              </div>
            )}

            {/* 7. Best Sellers */}
            {bestSellers.length>0&&(
              <div style={{ padding:"0 28px 32px" }}>
                <SectionTitle title="🏆 Best Sellers" sub="Our most loved products" action="View All" onAction={()=>setCatFilter("all")}/>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16 }}>
                  {bestSellers.map(p=><ProductCard key={p.id} p={p}/>)}
                </div>
              </div>
            )}

            {/* 8. Promo banner */}
            <div style={{ margin:"0 28px 32px",borderRadius:16,overflow:"hidden",background:`linear-gradient(135deg,${ORANGE},#e67e00)`,padding:"28px 36px",display:"flex",justifyContent:"space-between",alignItems:"center",color:"white" }}>
              <div>
                <div style={{ fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,opacity:0.85 }}>Limited Time Offer</div>
                <div style={{ fontSize:26,fontWeight:900,marginBottom:8 }}>Free Delivery on First Order!</div>
                <div style={{ fontSize:14,opacity:0.9,marginBottom:16 }}>Use code <strong>FREXSOM</strong> at checkout · New customers only</div>
                <button onClick={()=>document.getElementById('all-products')?.scrollIntoView({behavior:'smooth'})} style={{ background:"white",color:ORANGE,border:"none",padding:"11px 26px",borderRadius:25,cursor:"pointer",fontWeight:800,fontSize:14,fontFamily:"inherit" }}>Claim Offer →</button>
              </div>
              <div style={{ fontSize:90,opacity:0.7,flexShrink:0 }}>🎁</div>
            </div>

            {/* 9. New Arrivals */}
            {newArrivals.length>0&&(
              <div style={{ padding:"0 28px 32px" }}>
                <SectionTitle title="🆕 New Arrivals" sub="Fresh stock just in" action="View All" onAction={()=>setCatFilter("all")}/>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16 }}>
                  {newArrivals.map(p=><ProductCard key={p.id} p={p}/>)}
                </div>
              </div>
            )}

            {/* 10. All Products */}
            <div id="all-products" style={{ padding:"0 28px 32px" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:10 }}>
                <div style={{ fontSize:20,fontWeight:800,color:NAVY }}>
                  {catFilter==="all"?"All Products":CATEGORIES.find(c=>c.id===catFilter)?.label}
                  <span style={{ color:"#94a3b8",fontWeight:400,fontSize:14,marginLeft:8 }}>({filteredProducts.length} items)</span>
                </div>
                <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                  {CATEGORIES.map(c=><Pill key={c.id} active={catFilter===c.id} onClick={()=>setCatFilter(c.id)}>{c.icon} {c.label}</Pill>)}
                </div>
              </div>
              {filteredProducts.length===0
                ? <div style={{ textAlign:"center",padding:60,color:"#94a3b8" }}><div style={{ fontSize:52 }}>🔍</div><div style={{ marginTop:10,fontWeight:600,fontSize:16 }}>No products found</div></div>
                : <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:18 }}>
                    {filteredProducts.map(p=><ProductCard key={p.id} p={p}/>)}
                  </div>
              }
            </div>

            {/* 11. Newsletter */}
            <div style={{ margin:"0 28px 32px",background:NAVY,borderRadius:16,padding:"36px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,flexWrap:"wrap" }}>
              <div>
                <div style={{ fontSize:22,fontWeight:800,color:"white",marginBottom:6 }}>📧 Stay in the Loop</div>
                <div style={{ fontSize:14,color:"rgba(255,255,255,0.6)" }}>Subscribe for exclusive deals, new arrivals and updates.</div>
              </div>
              {newsletterDone
                ? <div style={{ color:GREEN,fontWeight:700,fontSize:15 }}>✅ Subscribed! Thank you.</div>
                : <div style={{ display:"flex",gap:10 }}>
                    <input value={newsletter} onChange={e=>setNewsletter(e.target.value)} placeholder="Your email address" style={{ padding:"11px 18px",borderRadius:25,border:"none",fontSize:14,outline:"none",width:260,fontFamily:"inherit" }}/>
                    <button onClick={()=>{ if(newsletter.includes("@")){ setNewsletterDone(true); showToast("Subscribed! 🎉"); }}} style={{ background:ORANGE,color:"white",border:"none",padding:"11px 22px",borderRadius:25,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit" }}>Subscribe</button>
                  </div>
              }
            </div>

            {/* 12. Footer */}
            <div style={{ background:NAVY,color:"rgba(255,255,255,0.55)",padding:"44px 36px 24px" }}>
              <div style={{ display:"grid",gridTemplateColumns:"1.6fr 1fr 1fr 1fr",gap:30,marginBottom:32 }}>
                <div>
                  <Logo size={16}/>
                  <div style={{ fontSize:13,marginTop:14,lineHeight:1.8,maxWidth:240 }}>Somalia's trusted online store — quality products sourced from China, delivered to your door.</div>
                  <div style={{ marginTop:14,display:"flex",flexDirection:"column",gap:7 }}>
                    <a href="tel:+252611013604" style={{ color:ORANGE,textDecoration:"none",fontSize:13,fontWeight:600 }}>📞 (+252) 611 013 604</a>
                    <a href="mailto:info@frexsom.com" style={{ color:ORANGE,textDecoration:"none",fontSize:13,fontWeight:600 }}>✉️ info@frexsom.com</a>
                    <a href="https://frexsom.com" target="_blank" rel="noreferrer" style={{ color:ORANGE,textDecoration:"none",fontSize:13,fontWeight:600 }}>🌐 frexsom.com</a>
                  </div>
                </div>
                {[
                  { title:"Quick Links", items:[["Shop All",()=>setCatFilter("all")],["Fashion",()=>setCatFilter("Fashion")],["Electronics",()=>setCatFilter("Electronics")],["Kitchen",()=>setCatFilter("Kitchen")],["Track My Order",()=>setPage("orders")],["Customer Support",()=>setPage("support")]] },
                  { title:"Payment Methods", items:[["💳 EVC Plus",null],["💳 Zaad",null],["💳 E-Dahab",null],["💵 Cash on Delivery",null]] },
                  { title:"Delivery Cities", items:[["Mogadishu",null],["Hargeisa",null],["Baidoa",null],["Kismayo",null],["Garowe",null],["Bosaso",null],["+ more cities",null]] },
                ].map(col=>(
                  <div key={col.title}>
                    <div style={{ fontWeight:700,color:"white",marginBottom:14,fontSize:14 }}>{col.title}</div>
                    {col.items.map(([lbl,fn])=>(
                      <div key={lbl} style={{ fontSize:12.5,marginBottom:8 }}>
                        {fn?<button onClick={fn} style={{ background:"none",border:"none",color:"rgba(255,255,255,0.55)",cursor:"pointer",fontSize:12.5,padding:0,fontFamily:"inherit",textAlign:"left" }}>{lbl}</button>:<span>{lbl}</span>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:18,display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,flexWrap:"wrap",gap:10 }}>
                <span>© 2026 FrexSOM Market · frexsom.com · Made with ❤️ for Somalia 🇸🇴</span>
                <div style={{ display:"flex",gap:18 }}>
                  {["Privacy Policy","Terms of Service","Return Policy"].map(lbl=>(
                    <a key={lbl} href="#" style={{ color:"rgba(255,255,255,0.4)",textDecoration:"none",fontSize:12 }}>{lbl}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CART DRAWER */}
        {cartOpen&&(
          <div style={{ position:"fixed",inset:0,zIndex:50,display:"flex" }}>
            <div onClick={()=>setCartOpen(false)} style={{ flex:1,background:"rgba(13,31,92,0.45)" }}/>
            <div style={{ width:400,background:"white",display:"flex",flexDirection:"column",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)" }}>
              <div style={{ padding:"18px 22px",borderBottom:"1px solid #f0f2f8",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <div style={{ fontWeight:800,fontSize:17,color:NAVY }}>Your Cart ({cartCount})</div>
                <button onClick={()=>setCartOpen(false)} style={{ background:"#f0f2f8",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:17,color:"#94a3b8",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit" }}>✕</button>
              </div>
              {cart.length===0
                ? <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#94a3b8" }}>
                    <div style={{ fontSize:56 }}>🛒</div>
                    <div style={{ fontWeight:700,marginTop:12,color:NAVY,fontSize:16 }}>Your cart is empty</div>
                    <button onClick={()=>setCartOpen(false)} style={{ marginTop:18,background:NAVY,color:"white",border:"none",padding:"10px 24px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"inherit" }}>Browse Products</button>
                  </div>
                : <>
                    <div style={{ flex:1,overflowY:"auto",padding:"14px 22px" }}>
                      {cart.map(item=>(
                        <div key={item.id} style={{ display:"flex",alignItems:"center",gap:12,padding:"13px 0",borderBottom:"1px solid #f4f6fb" }}>
                          <img src={item.image} alt={item.name} style={{ width:54,height:54,borderRadius:10,objectFit:"cover",flexShrink:0 }}/>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:13.5,fontWeight:700,color:NAVY,lineHeight:1.2 }}>{item.name}</div>
                            <div style={{ fontSize:13,color:ORANGE,fontWeight:700,marginTop:3 }}>${(item.price*item.qty).toFixed(2)}</div>
                          </div>
                          <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                            <button onClick={()=>qtyChange(item.id,-1)} style={{ background:"#f0f2f8",border:"none",borderRadius:6,width:26,height:26,cursor:"pointer",fontWeight:700,fontFamily:"inherit" }}>−</button>
                            <span style={{ fontWeight:700,fontSize:13,minWidth:18,textAlign:"center" }}>{item.qty}</span>
                            <button onClick={()=>qtyChange(item.id,1)} style={{ background:"#f0f2f8",border:"none",borderRadius:6,width:26,height:26,cursor:"pointer",fontWeight:700,fontFamily:"inherit" }}>+</button>
                          </div>
                          <button onClick={()=>removeItem(item.id)} style={{ background:"none",border:"none",color:"#c0c9dd",cursor:"pointer",fontSize:18,fontFamily:"inherit" }}>✕</button>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding:"18px 22px",borderTop:"2px solid #f0f2f8" }}>
                      <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}><span style={{ color:"#7a86a0",fontSize:13 }}>Subtotal</span><span style={{ fontWeight:700,color:NAVY }}>${cartTotal}</span></div>
                      <div style={{ display:"flex",justifyContent:"space-between",marginBottom:18 }}><span style={{ color:"#7a86a0",fontSize:13 }}>Shipping</span><span style={{ fontSize:13,color:GREEN,fontWeight:600 }}>Calculated at checkout</span></div>
                      <button onClick={()=>{setCartOpen(false);setCheckoutStep("form");}} style={{ width:"100%",background:ORANGE,color:"white",border:"none",padding:"14px",borderRadius:10,cursor:"pointer",fontWeight:800,fontSize:15,fontFamily:"inherit" }}>Proceed to Checkout →</button>
                    </div>
                  </>
              }
            </div>
          </div>
        )}

        {/* CHECKOUT */}
        {checkoutStep==="form"&&(
          <div style={{ position:"fixed",inset:0,zIndex:60,background:"rgba(13,31,92,0.55)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <div style={{ background:"white",borderRadius:18,width:490,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 24px 64px rgba(0,0,0,0.22)" }}>
              <div style={{ padding:"26px 28px 0" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22 }}>
                  <div><div style={{ fontSize:20,fontWeight:800,color:NAVY }}>Checkout</div><div style={{ fontSize:13,color:"#7a86a0",marginTop:2 }}>Delivering across Somalia 🇸🇴</div></div>
                  <button onClick={()=>setCheckoutStep(null)} style={{ background:"#f0f2f8",border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",fontSize:17,color:"#94a3b8",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit" }}>✕</button>
                </div>
                {[["Full Name","text","name","e.g. Amina Hassan"],["Phone Number","tel","phone","e.g. (+252) 611 000 000"],["Street Address","text","address","Street, district, neighbourhood"]].map(([lbl,type,key,ph])=>(
                  <div key={key} style={{ marginBottom:15 }}>
                    <label style={{ fontSize:12.5,fontWeight:600,color:"#374151",display:"block",marginBottom:6 }}>{lbl} <span style={{ color:"#ef4444" }}>*</span></label>
                    <input value={form[key]} onChange={e=>setForm(p=>({...p,[key]:e.target.value}))} type={type} placeholder={ph}
                      style={{ width:"100%",padding:"11px 14px",borderRadius:9,border:`1.5px solid ${form[key]?GREEN:"#dde1ee"}`,fontSize:13.5,boxSizing:"border-box",outline:"none",fontFamily:"inherit" }}/>
                  </div>
                ))}
                <div style={{ marginBottom:15 }}>
                  <label style={{ fontSize:12.5,fontWeight:600,color:"#374151",display:"block",marginBottom:6 }}>City</label>
                  <select value={form.city} onChange={e=>setForm(p=>({...p,city:e.target.value}))} style={{ width:"100%",padding:"11px 14px",borderRadius:9,border:`1.5px solid ${GREEN}`,fontSize:13.5,outline:"none",fontFamily:"inherit",background:"white" }}>
                    {CITIES.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ fontWeight:700,color:NAVY,fontSize:13.5,marginBottom:12,marginTop:22 }}>Payment Method</div>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:9,marginBottom:22 }}>
                  {PAYMENTS.map(pm=>(
                    <button key={pm} onClick={()=>setForm(p=>({...p,payment:pm}))} style={{ padding:"12px",borderRadius:9,border:`2px solid ${form.payment===pm?ORANGE:"#dde1ee"}`,background:form.payment===pm?LIGHT:"white",color:form.payment===pm?NAVY:"#64748b",cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"inherit" }}>{pm}</button>
                  ))}
                </div>
                <div style={{ background:"#f8fafc",borderRadius:10,padding:"14px 16px",marginBottom:22 }}>
                  <div style={{ fontWeight:700,color:NAVY,fontSize:13,marginBottom:10 }}>Order Summary</div>
                  {cart.map(item=>(
                    <div key={item.id} style={{ display:"flex",justifyContent:"space-between",fontSize:13,color:"#475569",marginBottom:6 }}>
                      <span>{item.name} × {item.qty}</span><span style={{ fontWeight:600 }}>${(item.price*item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ borderTop:"1px solid #e5e8f0",marginTop:10,paddingTop:10,display:"flex",justifyContent:"space-between",fontWeight:800,fontSize:16,color:NAVY }}>
                    <span>Total</span><span style={{ color:ORANGE }}>${cartTotal}</span>
                  </div>
                </div>
              </div>
              <div style={{ padding:"0 28px 26px",display:"flex",gap:10 }}>
                <button onClick={()=>setCheckoutStep(null)} style={{ flex:1,background:"#f0f2f8",color:"#64748b",border:"none",padding:"13px",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit" }}>← Back</button>
                <button onClick={placeOrder} disabled={!form.name||!form.phone} style={{ flex:2,background:(!form.name||!form.phone)?"#c0c9dd":ORANGE,color:"white",border:"none",padding:"13px",borderRadius:10,cursor:(!form.name||!form.phone)?"not-allowed":"pointer",fontWeight:800,fontSize:15,fontFamily:"inherit" }}>✓ Place Order</button>
              </div>
            </div>
          </div>
        )}

        {/* ORDER SUCCESS */}
        {checkoutStep==="done"&&orderDone&&(
          <div style={{ position:"fixed",inset:0,zIndex:60,background:"rgba(13,31,92,0.55)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <div style={{ background:"white",borderRadius:18,width:450,padding:36,textAlign:"center",boxShadow:"0 24px 64px rgba(0,0,0,0.22)" }}>
              <div style={{ fontSize:68,marginBottom:14 }}>🎉</div>
              <div style={{ fontSize:22,fontWeight:800,color:NAVY,marginBottom:4 }}>Order Confirmed!</div>
              <div style={{ fontSize:14,color:"#7a86a0",marginBottom:22 }}>Shukran! Your order has been placed successfully.</div>
              <div style={{ background:LIGHT,border:`1.5px solid ${ORANGE}44`,borderRadius:12,padding:"16px 20px",marginBottom:16,textAlign:"left" }}>
                <div style={{ fontWeight:800,color:ORANGE,fontSize:16,marginBottom:10 }}>Order #{orderDone.id}</div>
                {[["👤",orderDone.name],["📞",orderDone.phone],["📍",`${orderDone.address}, ${orderDone.city}`],["💳",orderDone.payment],["💰",`$${orderDone.total} total`]].map(([ic,v])=>(
                  <div key={v} style={{ display:"flex",gap:9,fontSize:13.5,color:"#374151",marginBottom:6 }}><span>{ic}</span><span>{v}</span></div>
                ))}
              </div>
              <div style={{ background:"#f0fdf4",border:"1px solid #86efac",borderRadius:9,padding:"11px 16px",fontSize:13,color:"#166534",marginBottom:16 }}>
                🚚 Estimated delivery: <strong>15–30 days</strong> to {orderDone.city}
              </div>
              <div style={{ fontSize:13,color:"#7a86a0",marginBottom:20 }}>
                Questions? <a href="mailto:info@frexsom.com" style={{ color:ORANGE,fontWeight:600,textDecoration:"none" }}>info@frexsom.com</a> · <a href="tel:+252611013604" style={{ color:ORANGE,fontWeight:600,textDecoration:"none" }}>(+252) 611 013 604</a>
              </div>
              <button onClick={()=>{setCheckoutStep(null);setOrderDone(null);}} style={{ width:"100%",background:NAVY,color:"white",border:"none",padding:"14px",borderRadius:10,cursor:"pointer",fontWeight:800,fontSize:15,fontFamily:"inherit" }}>Continue Shopping</button>
            </div>
          </div>
        )}

        {/* ════ DASHBOARD ════ */}
        {page==="dashboard"&&(
          <div style={{ padding:30 }}>
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:24,fontWeight:800,color:NAVY }}>Good day! Welcome back 👋</div>
              <div style={{ color:"#7a86a0",fontSize:14,marginTop:3 }}>Your FrexSOM store at a glance.</div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24 }}>
              {[["📦",products.length,"Products",NAVY,"+2 this week"],["🛒",orders.length,"Total Orders",GREEN,"↑ Growing"],["💰","~57%","Avg Margin",ORANGE,"Healthy"],["❤️",wishlist.length,"Wishlisted",`#8b5cf6`,"By customers"]].map(([ic,v,l,c,s])=>(
                <Card key={l} style={{ padding:"18px 20px" }}>
                  <div style={{ fontSize:26,marginBottom:6 }}>{ic}</div>
                  <div style={{ fontSize:22,fontWeight:800,color:c }}>{v}</div>
                  <div style={{ fontSize:12,color:"#7a86a0",marginTop:2 }}>{l}</div>
                  <div style={{ fontSize:11,color:GREEN,marginTop:4,fontWeight:600 }}>{s}</div>
                </Card>
              ))}
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr",gap:18 }}>
              <Card style={{ padding:22 }}>
                <div style={{ fontWeight:700,color:NAVY,fontSize:15,marginBottom:16 }}>📋 Recent Orders</div>
                {orders.slice(0,4).map((o,i)=>(
                  <div key={i} style={{ display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:i<3?"1px solid #f0f2f8":"none" }}>
                    <div style={{ width:38,height:38,borderRadius:10,background:`${NAVY}10`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0 }}>🧾</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700,color:NAVY,fontSize:13 }}>{o.name} — {o.city}</div>
                      <div style={{ fontSize:11.5,color:"#94a3b8",marginTop:1 }}>{o.items.substring(0,35)}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontWeight:800,color:ORANGE,fontSize:13,marginBottom:3 }}>{o.total}</div>
                      <StatusBadge status={o.status}/>
                    </div>
                  </div>
                ))}
              </Card>
              <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                <Card style={{ background:`linear-gradient(135deg,${NAVY},#1a3580)`,padding:22 }}>
                  <div style={{ color:"rgba(255,255,255,0.55)",fontSize:12,fontWeight:600,marginBottom:10,letterSpacing:0.5 }}>QUICK ACTIONS</div>
                  {[["🏪 Visit Storefront","storefront"],["🔎 Source Products","sourcing"],["💲 Price a Product","pricing"],["📋 Manage Orders","orders"]].map(([lbl,pg])=>(
                    <button key={pg} onClick={()=>setPage(pg)} style={{ display:"block",width:"100%",textAlign:"left",padding:"9px 12px",marginBottom:7,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,color:"white",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"inherit" }}>{lbl}</button>
                  ))}
                </Card>
                <Card style={{ borderLeft:`4px solid ${ORANGE}`,padding:"16px 18px" }}>
                  <div style={{ fontWeight:700,color:NAVY,fontSize:13,marginBottom:4 }}>🌐 Live Domain</div>
                  <a href="https://frexsom.com" target="_blank" rel="noreferrer" style={{ fontWeight:800,color:ORANGE,fontSize:15,textDecoration:"none" }}>frexsom.com ↗</a>
                  <div style={{ fontSize:11.5,color:GREEN,marginTop:4,fontWeight:600 }}>● Deployment ready</div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* ════ ORDERS ════ */}
        {page==="orders"&&(
          <div style={{ padding:30 }}>
            <div style={{ marginBottom:22 }}>
              <div style={{ fontSize:22,fontWeight:800,color:NAVY }}>Orders</div>
              <div style={{ color:"#7a86a0",fontSize:14,marginTop:3 }}>{orders.length} total · {orders.filter(o=>o.status==="Processing").length} processing</div>
            </div>
            <Card style={{ padding:0,overflow:"hidden" }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1.5fr 1.5fr 0.7fr 1fr 1fr",background:GRAY,padding:"12px 20px",fontSize:12,fontWeight:700,color:"#7a86a0",textTransform:"uppercase",letterSpacing:0.5 }}>
                {["Order ID","Customer","Items","Total","Payment","Status"].map(h=><div key={h}>{h}</div>)}
              </div>
              {orders.map((o,i)=>(
                <div key={i} style={{ display:"grid",gridTemplateColumns:"1fr 1.5fr 1.5fr 0.7fr 1fr 1fr",padding:"14px 20px",borderBottom:i<orders.length-1?"1px solid #f0f2f8":"none",alignItems:"center" }}>
                  <div style={{ fontWeight:700,color:NAVY,fontSize:12.5 }}>{o.id}</div>
                  <div><div style={{ fontWeight:600,color:NAVY,fontSize:13 }}>{o.name}</div><div style={{ fontSize:11.5,color:"#94a3b8" }}>{o.city} · {o.date}</div></div>
                  <div style={{ fontSize:12,color:"#64748b" }}>{o.items.substring(0,28)}…</div>
                  <div style={{ fontWeight:800,color:ORANGE,fontSize:13 }}>{o.total}</div>
                  <div style={{ fontSize:12,color:"#64748b" }}>{o.payment}</div>
                  <select value={o.status} onChange={e=>{const s=e.target.value;setOrders(prev=>prev.map((ord,j)=>j===i?{...ord,status:s}:ord));showToast(`Order updated to ${s}`);}}
                    style={{ padding:"5px 8px",borderRadius:8,border:`1.5px solid`,borderColor:o.status==="Delivered"?GREEN:o.status==="Shipped"?ORANGE:o.status==="Processing"?"#3b82f6":"#ef4444",background:"transparent",color:o.status==="Delivered"?GREEN:o.status==="Shipped"?ORANGE:o.status==="Processing"?"#3b82f6":"#ef4444",fontSize:12,fontWeight:700,cursor:"pointer",outline:"none",fontFamily:"inherit" }}>
                    {["Processing","Shipped","Delivered","Cancelled"].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* ════ SOURCE PRODUCTS ════ */}
        {page==="sourcing"&&(
          <div style={{ padding:30 }}>
            <div style={{ marginBottom:22 }}><div style={{ fontSize:22,fontWeight:800,color:NAVY }}>Source Products</div><div style={{ color:"#7a86a0",fontSize:14,marginTop:3 }}>Find products from Chinese suppliers for your store.</div></div>
            <Card style={{ marginBottom:20,padding:22 }}>
              <div style={{ display:"flex",gap:10,marginBottom:12 }}>
                <input value={srcQ} onChange={e=>setSrcQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSource()} placeholder='e.g. "women fashion", "solar products", "school supplies"'
                  style={{ flex:1,padding:"11px 16px",borderRadius:9,border:"1.5px solid #dde1ee",fontSize:14,outline:"none",fontFamily:"inherit" }}/>
                <button onClick={doSource} disabled={srcLoad} style={{ background:NAVY,color:"white",border:"none",padding:"11px 24px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit",opacity:srcLoad?0.7:1 }}>{srcLoad?"Searching…":"🔎 Find"}</button>
              </div>
              <div style={{ display:"flex",gap:7,flexWrap:"wrap" }}>
                {SUGGESTIONS.map(s=><button key={s} onClick={()=>setSrcQ(s)} style={{ background:`${NAVY}08`,border:`1px solid ${NAVY}18`,padding:"5px 13px",borderRadius:20,cursor:"pointer",fontSize:12,color:NAVY,fontFamily:"inherit" }}>{s}</button>)}
              </div>
            </Card>
            {srcLoad&&<div style={{ textAlign:"center",padding:50 }}><div style={{ fontSize:42,marginBottom:12 }}>🔎</div><div style={{ fontWeight:700,color:NAVY }}>Searching suppliers in China…</div></div>}
            {srcRes&&srcRes.length===0&&<Card style={{ padding:22 }}><div style={{ color:"#ef4444",textAlign:"center" }}>No results. Try a different term.</div></Card>}
            {srcRes&&srcRes.length>0&&(
              <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16 }}>
                {srcRes.map((p,i)=>(
                  <Card key={i} style={{ padding:20 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
                      <div><div style={{ fontSize:15.5,fontWeight:700,color:NAVY,lineHeight:1.2,marginBottom:3 }}>{p.name}</div><div style={{ fontSize:12,color:"#7a86a0" }}>{p.supplier}</div></div>
                      <span style={{ background:`${ORANGE}15`,color:ORANGE,padding:"3px 10px",borderRadius:20,fontSize:11.5,fontWeight:700 }}>{p.category}</span>
                    </div>
                    <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12 }}>
                      {[["Unit Cost",`$${p.unitCost}`],["Shipping",`$${p.estimatedShipping}`],["Min Order",`${p.moq} pcs`]].map(([l,v])=>(
                        <div key={l} style={{ background:GRAY,borderRadius:8,padding:"9px 8px",textAlign:"center" }}><div style={{ fontSize:10.5,color:"#94a3b8",marginBottom:2 }}>{l}</div><div style={{ fontSize:14,fontWeight:800,color:NAVY }}>{v}</div></div>
                      ))}
                    </div>
                    <div style={{ background:LIGHT,border:`1px solid ${ORANGE}33`,borderRadius:8,padding:"8px 12px",marginBottom:13,fontSize:12.5,color:"#7a4000" }}>🇸🇴 {p.whySomalia}</div>
                    <button onClick={()=>importP(p)} style={{ width:"100%",background:NAVY,color:"white",border:"none",padding:"10px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"inherit" }}>+ Import to Catalog</button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ════ CATALOG ════ */}
        {page==="catalog"&&(
          <div style={{ padding:30 }}>
            <div style={{ marginBottom:22 }}><div style={{ fontSize:22,fontWeight:800,color:NAVY }}>Product Catalog</div><div style={{ color:"#7a86a0",fontSize:14,marginTop:3 }}>{products.length} products · Manage your listings</div></div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16 }}>
              {products.map(p=>{
                const margin=Math.round(((p.price-p.cost)/p.price)*100);
                return (
                  <Card key={p.id} style={{ display:"flex",flexDirection:"column",padding:0,overflow:"hidden" }}>
                    <img src={p.image} alt={p.name} style={{ width:"100%",height:165,objectFit:"cover" }}/>
                    <div style={{ padding:"14px 16px 16px",display:"flex",flexDirection:"column",flex:1 }}>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6 }}>
                        <div style={{ fontSize:15,fontWeight:700,color:NAVY,lineHeight:1.2,flex:1,marginRight:8 }}>{p.name}</div>
                        <span style={{ background:`${ORANGE}15`,color:ORANGE,padding:"3px 10px",borderRadius:20,fontSize:11.5,fontWeight:700,flexShrink:0 }}>{p.category}</span>
                      </div>
                      <div style={{ fontSize:12,color:"#64748b",lineHeight:1.55,flex:1,marginBottom:10 }}>{p.description}</div>
                      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:12 }}>
                        {[["Price",`$${p.price}`,ORANGE],["Cost",`$${p.cost}`,"#7a86a0"],["Margin",`${margin}%`,margin>50?GREEN:ORANGE]].map(([l,v,c])=>(
                          <div key={l} style={{ background:GRAY,borderRadius:7,padding:"7px",textAlign:"center" }}><div style={{ fontSize:10,color:"#94a3b8" }}>{l}</div><div style={{ fontSize:13.5,fontWeight:800,color:c }}>{v}</div></div>
                        ))}
                      </div>
                      <button onClick={()=>rewriteDesc(p)} disabled={descLoad===p.id} style={{ width:"100%",background:descLoad===p.id?"#94a3b8":ORANGE,color:"white",border:"none",padding:"9px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:12,fontFamily:"inherit" }}>
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
          <div style={{ padding:30 }}>
            <div style={{ marginBottom:22 }}><div style={{ fontSize:22,fontWeight:800,color:NAVY }}>Smart Pricing</div><div style={{ color:"#7a86a0",fontSize:14,marginTop:3 }}>Get the optimal selling price for the Somali market.</div></div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,alignItems:"start" }}>
              <Card style={{ padding:24 }}>
                {[["Product Name","text",pName,setPName,"e.g. Solar Power Bank 20000mAh"],["Total Cost from China (USD)","number",pCost,setPCost,"e.g. 12.50"]].map(([lbl,type,val,set,ph])=>(
                  <div key={lbl} style={{ marginBottom:16 }}>
                    <label style={{ fontSize:12.5,fontWeight:600,color:"#374151",display:"block",marginBottom:6 }}>{lbl}</label>
                    <input value={val} onChange={e=>set(e.target.value)} type={type} placeholder={ph} style={{ width:"100%",padding:"11px 14px",borderRadius:9,border:"1.5px solid #dde1ee",fontSize:14,boxSizing:"border-box",outline:"none",fontFamily:"inherit" }}/>
                  </div>
                ))}
                <button onClick={doPrice} disabled={priceLoad} style={{ width:"100%",background:NAVY,color:"white",border:"none",padding:"12px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit",opacity:priceLoad?0.7:1 }}>{priceLoad?"Calculating…":"⚡ Get Pricing Strategy"}</button>
                <div style={{ marginTop:16,padding:"12px 14px",background:`${ORANGE}0e`,borderRadius:9,fontSize:12.5,color:"#7a4000",lineHeight:1.5 }}>💡 Landed cost = product price + shipping from China.</div>
              </Card>
              {priceRes&&(
                <div>
                  <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12 }}>
                    {[{l:"Budget",v:`$${priceRes.budget}`,c:"#3b82f6",s:"High volume"},{l:"✦ Recommended",v:`$${priceRes.recommendedPrice}`,c:ORANGE,s:"Best balance"},{l:"Premium",v:`$${priceRes.premium}`,c:"#8b5cf6",s:"Quality signal"}].map(x=>(
                      <div key={x.l} style={{ background:"white",borderRadius:12,padding:"16px 12px",textAlign:"center",boxShadow:"0 2px 10px rgba(13,31,92,0.07)",border:x.l.includes("✦")?`2px solid ${x.c}`:"2px solid transparent" }}>
                        <div style={{ fontSize:11.5,color:"#7a86a0",marginBottom:4 }}>{x.l}</div>
                        <div style={{ fontSize:22,fontWeight:900,color:x.c }}>{x.v}</div>
                        <div style={{ fontSize:11,color:"#94a3b8",marginTop:2 }}>{x.s}</div>
                      </div>
                    ))}
                  </div>
                  <Card style={{ padding:18 }}>
                    <div style={{ display:"flex",gap:10,marginBottom:12 }}>
                      <div style={{ flex:1,background:GRAY,borderRadius:9,padding:"12px 14px" }}><div style={{ fontSize:11.5,color:"#7a86a0" }}>Gross Margin</div><div style={{ fontWeight:800,color:GREEN,fontSize:16,marginTop:2 }}>{priceRes.margin}</div></div>
                      <div style={{ flex:2,background:GRAY,borderRadius:9,padding:"12px 14px" }}><div style={{ fontSize:11.5,color:"#7a86a0" }}>Demand Forecast</div><div style={{ fontWeight:600,color:NAVY,fontSize:13,marginTop:2,lineHeight:1.4 }}>{priceRes.demandForecast}</div></div>
                    </div>
                    <div style={{ background:LIGHT,border:`1px solid ${ORANGE}33`,borderRadius:9,padding:"11px 14px",fontSize:13,color:"#7a4000",lineHeight:1.5 }}>💡 <strong>Expert tip:</strong> {priceRes.tip}</div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════ SUPPORT ════ */}
        {page==="support"&&(
          <div style={{ padding:30,display:"flex",flexDirection:"column",height:"calc(100vh - 60px)" }}>
            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:22,fontWeight:800,color:NAVY }}>Customer Support</div>
              <div style={{ color:"#7a86a0",fontSize:14,marginTop:3 }}>
                24/7 help · <a href="mailto:info@frexsom.com" style={{ color:ORANGE,textDecoration:"none",fontWeight:600 }}>info@frexsom.com</a> · <a href="tel:+252611013604" style={{ color:ORANGE,textDecoration:"none",fontWeight:600 }}>(+252) 611 013 604</a>
              </div>
            </div>
            <Card style={{ flex:1,display:"flex",flexDirection:"column",overflow:"hidden",padding:0 }}>
              <div style={{ padding:"14px 20px",borderBottom:"1px solid #f0f2f8",display:"flex",alignItems:"center",gap:12,background:`linear-gradient(135deg,${NAVY},#1a3580)` }}>
                <div style={{ width:40,height:40,borderRadius:"50%",background:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>💬</div>
                <div><div style={{ fontWeight:700,color:"white",fontSize:14 }}>FrexSOM Support</div><div style={{ fontSize:11.5,color:"#86efac",fontWeight:600 }}>● Online — replies instantly</div></div>
              </div>
              <div style={{ flex:1,overflowY:"auto",padding:"20px 22px" }}>
                {msgs.map((m,i)=>(
                  <div key={i} style={{ display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:13 }}>
                    {m.role==="assistant"&&<div style={{ width:34,height:34,borderRadius:"50%",background:NAVY,display:"flex",alignItems:"center",justifyContent:"center",marginRight:9,fontSize:15,flexShrink:0 }}>💬</div>}
                    <div style={{ maxWidth:"72%",padding:"11px 15px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?NAVY:"#f4f6fb",color:m.role==="user"?"white":"#1e293b",fontSize:13.5,lineHeight:1.6 }}>{m.content}</div>
                  </div>
                ))}
                {chatLoad&&<div style={{ display:"flex",marginBottom:13 }}><div style={{ width:34,height:34,borderRadius:"50%",background:NAVY,display:"flex",alignItems:"center",justifyContent:"center",marginRight:9 }}>💬</div><div style={{ background:"#f4f6fb",padding:"11px 15px",borderRadius:"18px 18px 18px 4px",color:"#94a3b8",fontSize:13 }}>Typing…</div></div>}
              </div>
              <div style={{ padding:"13px 20px",borderTop:"1px solid #f0f2f8" }}>
                <div style={{ display:"flex",gap:7,marginBottom:10,flexWrap:"wrap" }}>
                  {["Shipping time?","Payment options?","Return policy?","Delivery to Baidoa?","How to track order?"].map(q=>(
                    <button key={q} onClick={()=>setChatIn(q)} style={{ background:"#f4f6fb",border:"1px solid #dde1ee",padding:"5px 12px",borderRadius:20,cursor:"pointer",fontSize:12,color:NAVY,fontFamily:"inherit" }}>{q}</button>
                  ))}
                </div>
                <div style={{ display:"flex",gap:10 }}>
                  <input value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doChat()} placeholder="Type your message…" style={{ flex:1,padding:"12px 18px",borderRadius:25,border:"1.5px solid #dde1ee",fontSize:13.5,outline:"none",fontFamily:"inherit" }}/>
                  <button onClick={doChat} disabled={chatLoad} style={{ background:NAVY,color:"white",border:"none",padding:"12px 22px",borderRadius:25,cursor:"pointer",fontWeight:700,fontSize:13.5,fontFamily:"inherit",opacity:chatLoad?0.7:1 }}>Send</button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}