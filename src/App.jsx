import { useState, useEffect, useRef } from "react";

const NAVY = "#0d1f5c";
const ORANGE = "#f7931a";
const LIGHT = "#fff7ee";
const GRAY = "#f4f6fb";
const GREEN = "#10b981";
const ADMIN_PIN = "1604";

// ─── CATEGORIES with icons ───────────────────────────────────────────
const CATS = [
  { id:"all",    label:"All Products",  icon:"🛍️",  sub:[] },
  { id:"Fashion",label:"Fashion",       icon:"👗",  sub:["Hijab & Scarves","Abayas & Modest Wear","Men's Clothing","Kids Fashion","Shoes & Bags","Accessories"] },
  { id:"Electronics",label:"Electronics",icon:"📱", sub:["Phones & Tablets","Power Banks","Earbuds & Audio","Smartwatches","Cameras","Accessories"] },
  { id:"Kitchen",label:"Kitchen",       icon:"🍳",  sub:["Cookware Sets","Blenders & Juicers","Storage & Containers","Thermoses & Flasks","Kitchen Gadgets"] },
  { id:"Beauty", label:"Beauty",        icon:"💄",  sub:["Skincare","Fragrances & Perfumes","Hair Care","Makeup","Personal Care"] },
  { id:"Sports", label:"Sports",        icon:"⚽",  sub:["Football & Soccer","Fitness Equipment","Outdoor & Camping","Sportswear"] },
  { id:"Home",   label:"Home & Living", icon:"🏠",  sub:["Furniture","Bedding & Pillows","Lighting","Home Decor","Cleaning"] },
  { id:"Kids",   label:"Baby & Kids",   icon:"🧸",  sub:["Toys & Games","Baby Clothing","Baby Care","School Supplies"] },
];

// ─── PRODUCTS ───────────────────────────────────────────────────────
const INITIAL_PRODUCTS = [
  { id:1,  name:"Premium Hijab Set (12 Colors)", category:"Fashion", price:15.99, oldPrice:22.00, cost:4.50, stock:120, rating:4.8, reviews:124, badge:"Best Seller", isNew:false, description:"Breathable, elegant hijab set in 12 vibrant colors — crafted for comfort and daily style.", image:"https://images.unsplash.com/photo-1557744813-13da6e91f41f?w=600&q=80" },
  { id:2,  name:"Solar Power Bank 20000mAh",    category:"Electronics", price:45.00, oldPrice:60.00, cost:12.00, stock:85, rating:4.6, reviews:89, badge:"Popular", isNew:false, description:"Dual-USB solar charging power bank — keeps your devices running anywhere, anytime.", image:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80" },
  { id:3,  name:"Insulated Thermos Flask 1L",   category:"Kitchen", price:18.50, oldPrice:null, cost:5.00, stock:200, rating:4.7, reviews:203, badge:"", isNew:false, description:"24-hour vacuum insulated flask — keeps drinks perfectly hot or ice cold all day.", image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80" },
  { id:4,  name:"Wireless Earbuds Pro",          category:"Electronics", price:32.00, oldPrice:45.00, cost:9.00, stock:150, rating:4.5, reviews:67, badge:"New", isNew:true, description:"Crystal-clear sound, 6-hour battery, comfortable fit — perfect for music and calls.", image:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80" },
  { id:5,  name:"Elegant Abaya Modest Dress",   category:"Fashion", price:28.00, oldPrice:38.00, cost:8.00, stock:90, rating:4.9, reviews:156, badge:"Top Rated", isNew:false, description:"Full-length premium abaya in lightweight breathable fabric — modest, stylish and comfortable.", image:"https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&q=80" },
  { id:6,  name:"5-Piece Cookware Set",          category:"Kitchen", price:55.00, oldPrice:75.00, cost:18.00, stock:60, rating:4.6, reviews:44, badge:"", isNew:false, description:"Durable stainless steel cookware set — compatible with all stove types, easy to clean.", image:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" },
  { id:7,  name:"USB Portable Blender",         category:"Kitchen", price:24.00, oldPrice:32.00, cost:7.00, stock:110, rating:4.4, reviews:38, badge:"New", isNew:true, description:"Rechargeable mini blender — make fresh smoothies and juices anywhere in seconds.", image:"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80" },
  { id:8,  name:"Smartwatch Fitness Tracker",   category:"Electronics", price:38.00, oldPrice:52.00, cost:11.00, stock:75, rating:4.3, reviews:92, badge:"Popular", isNew:false, description:"Waterproof smartwatch with step tracking, heart rate monitor and sleep analysis.", image:"https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80" },
  { id:9,  name:"Premium Prayer Mat",           category:"Fashion", price:22.00, oldPrice:30.00, cost:6.00, stock:180, rating:4.9, reviews:210, badge:"Best Seller", isNew:false, description:"Thick, soft prayer mat with beautiful geometric design — ideal for daily prayers.", image:"https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80" },
  { id:10, name:"Luxury Perfume Gift Set",      category:"Beauty", price:35.00, oldPrice:48.00, cost:10.00, stock:95, rating:4.7, reviews:88, badge:"Popular", isNew:false, description:"Three long-lasting oriental fragrances in an elegant gift box — perfect for any occasion.", image:"https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80" },
  { id:11, name:"Daily Skin Care Set",          category:"Beauty", price:42.00, oldPrice:58.00, cost:12.00, stock:70, rating:4.5, reviews:64, badge:"New", isNew:true, description:"Complete skincare routine — gentle cleanser, balancing toner and hydrating moisturizer.", image:"https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80" },
  { id:12, name:"Football & Training Kit",      category:"Sports", price:28.00, oldPrice:38.00, cost:8.00, stock:130, rating:4.4, reviews:45, badge:"", isNew:false, description:"Complete sports kit with football, pump and training cones — for players of all ages.", image:"https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&q=80" },
  { id:13, name:"Kids Educational Toy Set",     category:"Kids", price:19.00, oldPrice:26.00, cost:5.50, stock:160, rating:4.6, reviews:72, badge:"New", isNew:true, description:"Fun and educational building blocks set — develops creativity and problem-solving skills.", image:"https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80" },
  { id:14, name:"Home Decor Candle Set",        category:"Home", price:16.00, oldPrice:22.00, cost:4.00, stock:200, rating:4.5, reviews:55, badge:"", isNew:false, description:"Set of 3 elegant scented candles — creates a warm, relaxing atmosphere in any room.", image:"https://images.unsplash.com/photo-1602874801006-6b0a84a59b6b?w=600&q=80" },
  { id:15, name:"Men's Casual Sneakers",        category:"Fashion", price:32.00, oldPrice:45.00, cost:9.00, stock:80, rating:4.4, reviews:63, badge:"Popular", isNew:false, description:"Lightweight, breathable casual sneakers — stylish comfort for everyday wear.", image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:16, name:"Wireless Charging Pad",        category:"Electronics", price:18.00, oldPrice:25.00, cost:5.00, stock:140, rating:4.3, reviews:41, badge:"New", isNew:true, description:"Universal Qi wireless charger — compatible with all modern smartphones, fast and safe.", image:"https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?w=600&q=80" },
];

const CITIES = ["Mogadishu","Baidoa","Hargeisa","Kismayo","Garowe","Bosaso","Beledweyne","Afgooye","Marka","Other"];
const PAYMENTS = ["EVC Plus","Zaad","E-Dahab","Cash on Delivery"];
const MOCK_ORDERS = [
  { id:"FRX-A1B2C3", name:"Amina Hassan", city:"Mogadishu", items:"Premium Hijab Set × 2", total:"$31.98", payment:"EVC Plus", status:"Processing", date:"2026-04-23" },
  { id:"FRX-D4E5F6", name:"Mohamed Ali",  city:"Baidoa",    items:"Solar Power Bank × 1",  total:"$45.00", payment:"Zaad",     status:"Shipped",    date:"2026-04-22" },
  { id:"FRX-G7H8I9", name:"Faadumo Omar", city:"Hargeisa",  items:"Abaya Modest Dress × 1", total:"$28.00", payment:"Cash on Delivery", status:"Delivered", date:"2026-04-20" },
];

async function ask(messages, system) {
  try {
    const r = await fetch('/api/claude', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1500,system,messages}) });
    const d = await r.json();
    return d.content?.[0]?.text||'';
  } catch { return ''; }
}

// ─── COMPONENTS ──────────────────────────────────────────────────────
const Stars = ({rating,count}) => (
  <div style={{display:"flex",alignItems:"center",gap:3}}>
    {[1,2,3,4,5].map(i=><span key={i} style={{color:i<=Math.round(rating)?"#f59e0b":"#ddd",fontSize:13}}>★</span>)}
    {count!==undefined&&<span style={{fontSize:12,color:"#94a3b8",marginLeft:3}}>({count})</span>}
  </div>
);

const Card = ({children,style={}}) => (
  <div style={{background:"white",borderRadius:12,boxShadow:"0 1px 8px rgba(13,31,92,0.08)",...style}}>{children}</div>
);

const Logo = ({size=20}) => (
  <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"white",padding:"5px 14px",borderRadius:30,boxShadow:"0 2px 8px rgba(0,0,0,0.12)"}}>
    <img src="/logo.png" alt="FrexSOM" style={{height:size*1.6,width:"auto"}}
      onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}}/>
    <div style={{display:"none",alignItems:"center",gap:5}}>
      <svg width={size} height={size} viewBox="0 0 52 52"><path d="M8,44 C8,44 6,22 22,12 C14,20 16,34 24,36 C18,30 20,18 30,14 C22,20 24,36 38,34 C28,36 16,42 8,44Z" fill={ORANGE}/></svg>
      <span style={{fontSize:size,fontWeight:900}}><span style={{color:NAVY}}>Frex</span><span style={{color:ORANGE}}>SOM</span></span>
    </div>
  </div>
);

// ─── MAIN APP ────────────────────────────────────────────────────────
export default function App() {
  const [isAdmin,setIsAdmin] = useState(false);
  const [adminPage,setAdminPage] = useState("dashboard");
  const [showAdminLogin,setShowAdminLogin] = useState(false);
  const [adminPin,setAdminPin] = useState("");
  const [logoClicks,setLogoClicks] = useState(0);
  const logoTimer = useRef(null);

  const [products,setProducts] = useState(INITIAL_PRODUCTS);
  const [cart,setCart] = useState([]);
  const [cartOpen,setCartOpen] = useState(false);
  const [checkoutStep,setCheckoutStep] = useState(null);
  const [orderDone,setOrderDone] = useState(null);
  const [orders,setOrders] = useState(MOCK_ORDERS);
  const [form,setForm] = useState({name:"",phone:"",city:"Mogadishu",address:"",payment:"EVC Plus"});
  const [catFilter,setCatFilter] = useState("all");
  const [subFilter,setSubFilter] = useState("");
  const [searchInput,setSearchInput] = useState("");
  const [searchQ,setSearchQ] = useState("");
  const [wishlist,setWishlist] = useState([]);
  const [quickView,setQuickView] = useState(null);
  const [toast,setToast] = useState(null);
  const [newsletter,setNewsletter] = useState("");
  const [newsletterDone,setNewsletterDone] = useState(false);
  const [countdown,setCountdown] = useState({h:5,m:32,s:47});
  const [sortBy,setSortBy] = useState("default");
  const [showMyOrders,setShowMyOrders] = useState(false);
  const [expandedCat,setExpandedCat] = useState("all");

  // Admin tools
  const [srcQ,setSrcQ] = useState(""); const [srcRes,setSrcRes] = useState(null); const [srcLoad,setSrcLoad] = useState(false);
  const [descLoad,setDescLoad] = useState(false);
  const [pName,setPName] = useState(""); const [pCost,setPCost] = useState(""); const [priceRes,setPriceRes] = useState(null); const [priceLoad,setPriceLoad] = useState(false);
  const [msgs,setMsgs] = useState([{role:"assistant",content:"Salaam! 👋 Welcome to FrexSOM Market. How can I help you today?"}]);
  const [chatIn,setChatIn] = useState(""); const [chatLoad,setChatLoad] = useState(false);
  const productsRef = useRef(null);

  useEffect(()=>{
    const t=setInterval(()=>setCountdown(p=>{ let{h,m,s}=p; s--; if(s<0){s=59;m--;} if(m<0){m=59;h--;} if(h<0)h=23; return{h,m,s}; }),1000);
    return()=>clearInterval(t);
  },[]);

  const showToast=(msg,color=GREEN)=>{ setToast({msg,color}); setTimeout(()=>setToast(null),2800); };
  const pad=n=>String(n).padStart(2,'0');
  const cartCount=cart.reduce((a,i)=>a+i.qty,0);
  const cartTotal=cart.reduce((a,i)=>a+i.price*i.qty,0).toFixed(2);

  const handleLogoClick=()=>{
    const n=logoClicks+1; setLogoClicks(n);
    clearTimeout(logoTimer.current);
    if(n>=5){setShowAdminLogin(true);setLogoClicks(0);return;}
    logoTimer.current=setTimeout(()=>setLogoClicks(0),3000);
  };

  const tryLogin=()=>{
    if(adminPin===ADMIN_PIN){setIsAdmin(true);setShowAdminLogin(false);setAdminPin("");showToast("Welcome Admin! 👋");}
    else{showToast("Wrong PIN ❌","#ef4444");setAdminPin("");}
  };

  const addToCart=p=>{ setCart(prev=>{ const ex=prev.find(i=>i.id===p.id); return ex?prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...prev,{...p,qty:1}]; }); showToast(`${p.name} added! 🛒`); };
  const qtyChange=(id,d)=>setCart(prev=>prev.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const removeItem=id=>setCart(prev=>prev.filter(i=>i.id!==id));
  const toggleWish=id=>{ const had=wishlist.includes(id); setWishlist(prev=>had?prev.filter(i=>i!==id):[...prev,id]); showToast(had?"Removed from wishlist":"Added to wishlist ❤️",ORANGE); };

  const handleSearch=()=>{ if(!searchInput.trim())return; setSearchQ(searchInput); setCatFilter("all"); setSubFilter(""); setTimeout(()=>productsRef.current?.scrollIntoView({behavior:'smooth'}),100); };
  const clearSearch=()=>{ setSearchQ(""); setSearchInput(""); };

  const placeOrder = async () => {
    if(!form.name||!form.phone)return;
    const id="FRX-"+Math.random().toString(36).substring(2,8).toUpperCase();
    const newOrder={id,...form,items:cart.map(i=>`${i.name} × ${i.qty}`).join(", "),total:cartTotal,status:"Processing",date:new Date().toISOString().split("T")[0]};
    setOrders(prev=>[newOrder,...prev]);
    setOrderDone({id,...form,items:[...cart],total:cartTotal});

    // Send email notification
    try {
      await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'send_order_email',
          order: {
            id,
            name: form.name,
            phone: form.phone,
            city: form.city,
            address: form.address,
            payment: form.payment,
            items: cart.map(i=>`${i.name} × ${i.qty}`).join(", "),
            total: cartTotal
          }
        })
      });
    } catch(e) { console.log('Email error:', e); }

    setCart([]); setCheckoutStep("done");
  };

  const doSource=async()=>{ if(!srcQ.trim())return; setSrcLoad(true); setSrcRes(null);
    const txt=await ask([{role:"user",content:`Find 4 products to source and sell for: "${srcQ}".`}],`Global product sourcing expert. Return ONLY JSON array of 4 items: name, supplier, moq (number), unitCost (number), estimatedShipping (number), category, whyItSells (1 sentence), profitMargin (string). No markdown.`);
    try{setSrcRes(JSON.parse(txt.replace(/```json|```/g,"").trim()));}catch{setSrcRes([]);} setSrcLoad(false);
  };

  const importP=p=>{ setProducts(prev=>[...prev,{id:Date.now(),name:p.name,category:p.category,price:parseFloat(((p.unitCost+p.estimatedShipping)*2.5).toFixed(2)),oldPrice:null,cost:parseFloat((p.unitCost+p.estimatedShipping).toFixed(2)),stock:p.moq,rating:4.5,reviews:0,badge:"New",isNew:true,description:p.whyItSells,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"}]); showToast(`${p.name} imported! 📦`); setAdminPage("catalog"); };

  const rewriteDesc=async product=>{ setDescLoad(product.id);
    const txt=await ask([{role:"user",content:`2-sentence product description for: ${product.name} ($${product.price}).`}],`Write short persuasive e-commerce descriptions. Return only the description.`);
    if(txt)setProducts(prev=>prev.map(p=>p.id===product.id?{...p,description:txt}:p)); setDescLoad(false);
  };

  const doPrice=async()=>{ if(!pName||!pCost)return; setPriceLoad(true); setPriceRes(null);
    const txt=await ask([{role:"user",content:`Product: ${pName}. Cost: $${pCost}. Pricing for Somali e-commerce.`}],`Pricing strategist. Return ONLY JSON: {"budget":number,"standard":number,"premium":number,"recommendedPrice":number,"margin":"string","demandForecast":"string","tip":"string"}. No markdown.`);
    try{setPriceRes(JSON.parse(txt.replace(/```json|```/g,"").trim()));}catch{} setPriceLoad(false);
  };

  const doChat=async()=>{ if(!chatIn.trim()||chatLoad)return;
    const um={role:"user",content:chatIn}; const nm=[...msgs,um];
    setMsgs(nm); setChatIn(""); setChatLoad(true);
    const txt=await ask(nm,`Customer support for FrexSOM Market — online store in Somalia. Help with: shipping (15–30 days), payments (EVC Plus, Zaad, E-Dahab, cash), returns (30 days), products. Contact: info@frexsom.com | (+252) 611 013 604. Warm and concise — 2–3 sentences.`);
    setMsgs(prev=>[...prev,{role:"assistant",content:txt||"Please call (+252) 611 013 604 for help."}]); setChatLoad(false);
  };

  // Filtering & sorting
  let filtered = products.filter(p=>{
    if(searchQ) return p.name.toLowerCase().includes(searchQ.toLowerCase())||p.category.toLowerCase().includes(searchQ.toLowerCase());
    if(catFilter!=="all"&&p.category!==catFilter) return false;
    if(subFilter&&!p.name.toLowerCase().includes(subFilter.toLowerCase())) return false;
    return true;
  });
  if(sortBy==="price-asc") filtered=[...filtered].sort((a,b)=>a.price-b.price);
  if(sortBy==="price-desc") filtered=[...filtered].sort((a,b)=>b.price-a.price);
  if(sortBy==="rating") filtered=[...filtered].sort((a,b)=>b.rating-a.rating);
  if(sortBy==="new") filtered=[...filtered].sort((a,b)=>(b.isNew?1:0)-(a.isNew?1:0));

  const flashDeals=products.filter(p=>p.oldPrice).slice(0,4);
  const bestSellers=products.filter(p=>["Best Seller","Top Rated","Popular"].includes(p.badge));
  const newArrivals=products.filter(p=>p.isNew||p.badge==="New");
  const statusColor=s=>s==="Delivered"?GREEN:s==="Shipped"?ORANGE:s==="Processing"?"#3b82f6":"#ef4444";

  // ── Product Card ──
  const ProductCard=({p,compact=false})=>{
    const inCart=cart.find(i=>i.id===p.id);
    const wished=wishlist.includes(p.id);
    const discount=p.oldPrice?Math.round((1-p.price/p.oldPrice)*100):null;
    return (
      <div style={{background:"white",borderRadius:12,overflow:"hidden",boxShadow:"0 1px 8px rgba(13,31,92,0.08)",position:"relative",display:"flex",flexDirection:"column",transition:"box-shadow 0.2s,transform 0.2s"}}
        onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 28px rgba(13,31,92,0.16)";e.currentTarget.style.transform="translateY(-2px)";}}
        onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 8px rgba(13,31,92,0.08)";e.currentTarget.style.transform="translateY(0)";}}>
        {p.badge&&<div style={{position:"absolute",top:8,left:8,zIndex:2,background:p.badge==="Best Seller"?ORANGE:p.badge==="Top Rated"?GREEN:p.badge==="New"?"#8b5cf6":NAVY,color:"white",padding:"3px 9px",borderRadius:20,fontSize:10,fontWeight:800,letterSpacing:0.3}}>{p.badge}</div>}
        {discount&&<div style={{position:"absolute",top:p.badge?30:8,left:8,zIndex:2,background:"#ef4444",color:"white",padding:"3px 9px",borderRadius:20,fontSize:10,fontWeight:800}}>-{discount}%</div>}
        <button onClick={()=>toggleWish(p.id)} style={{position:"absolute",top:8,right:8,zIndex:2,background:"white",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:16,boxShadow:"0 2px 8px rgba(0,0,0,0.12)",display:"flex",alignItems:"center",justifyContent:"center"}}>{wished?"❤️":"🤍"}</button>
        <div style={{height:compact?160:195,overflow:"hidden",cursor:"pointer",position:"relative"}} onClick={()=>setQuickView(p)}>
          <img src={p.image} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.4s"}}
            onMouseEnter={e=>e.target.style.transform="scale(1.07)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}
            onError={e=>{e.target.src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80";}}/>
          <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(13,31,92,0.6))",padding:"20px 12px 10px",opacity:0,transition:"opacity 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=0}>
            <span style={{color:"white",fontSize:12,fontWeight:600}}>👁️ Quick View</span>
          </div>
        </div>
        <div style={{padding:"12px 14px 16px",display:"flex",flexDirection:"column",flex:1}}>
          <div style={{fontSize:10.5,color:ORANGE,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,marginBottom:4}}>{p.category}</div>
          <div style={{fontSize:compact?13.5:15,fontWeight:700,color:NAVY,marginBottom:5,lineHeight:1.3,flex:1}}>{p.name}</div>
          <Stars rating={p.rating} count={p.reviews}/>
          <div style={{display:"flex",alignItems:"center",gap:8,margin:"8px 0 5px"}}>
            <span style={{fontSize:compact?18:21,fontWeight:900,color:NAVY}}>${p.price}</span>
            {p.oldPrice&&<span style={{fontSize:12,color:"#94a3b8",textDecoration:"line-through"}}>${p.oldPrice}</span>}
          </div>
          <div style={{fontSize:11,color:p.stock<50?"#ef4444":GREEN,fontWeight:700,background:p.stock<50?"#fef2f2":"#f0fdf4",padding:"2px 8px",borderRadius:20,marginBottom:10,display:"inline-block",width:"fit-content"}}>
            {p.stock<50?`⚠️ Only ${p.stock} left`:"✅ In Stock"}
          </div>
          {inCart
            ?<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:`${ORANGE}12`,borderRadius:8,padding:"5px 10px"}}>
              <button onClick={()=>qtyChange(p.id,-1)} style={{background:ORANGE,color:"white",border:"none",borderRadius:6,width:26,height:26,cursor:"pointer",fontSize:17,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"}}>−</button>
              <span style={{fontWeight:800,color:ORANGE,fontSize:13}}>{inCart.qty}</span>
              <button onClick={()=>qtyChange(p.id,1)} style={{background:ORANGE,color:"white",border:"none",borderRadius:6,width:26,height:26,cursor:"pointer",fontSize:17,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"}}>+</button>
            </div>
            :<button onClick={()=>addToCart(p)} style={{width:"100%",background:NAVY,color:"white",border:`2px solid ${NAVY}`,padding:"9px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"inherit",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.target.background=ORANGE;e.target.style.background=ORANGE;e.target.style.borderColor=ORANGE;}}
              onMouseLeave={e=>{e.target.style.background=NAVY;e.target.style.borderColor=NAVY;}}>Add to Cart</button>
          }
        </div>
      </div>
    );
  };

  const SectionHead=({title,action,onAction})=>(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
      <div style={{fontSize:22,fontWeight:800,color:NAVY,borderLeft:`4px solid ${ORANGE}`,paddingLeft:12}}>{title}</div>
      {action&&<button onClick={onAction} style={{background:"none",border:`1.5px solid ${NAVY}`,color:NAVY,padding:"6px 18px",borderRadius:25,cursor:"pointer",fontWeight:600,fontSize:13,fontFamily:"inherit"}}>View All →</button>}
    </div>
  );

  // ════════════════════════════════════════════════════
  // ADMIN PANEL
  // ════════════════════════════════════════════════════
  if(isAdmin) return (
    <div style={{display:"flex",height:"100vh",fontFamily:"'Segoe UI',system-ui,sans-serif",background:GRAY,overflow:"hidden"}}>
      {toast&&<div style={{position:"fixed",top:22,right:22,zIndex:1000,background:toast.color,color:"white",padding:"12px 22px",borderRadius:12,fontWeight:700,fontSize:14,boxShadow:"0 4px 24px rgba(0,0,0,0.18)"}}>{toast.msg}</div>}
      <div style={{width:230,background:NAVY,display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"20px 16px",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
          <Logo size={17}/>
          <div style={{fontSize:10,color:ORANGE,marginTop:8,fontWeight:700,letterSpacing:1}}>⚙️ ADMIN PANEL</div>
        </div>
        <nav style={{padding:"12px 10px",flex:1}}>
          {[["⊞","Dashboard","dashboard"],["📋","Orders","orders"],["📦","Catalog","catalog"],["🔎","Source Products","sourcing"],["💲","Pricing","pricing"],["💬","Support","support"]].map(([ic,lbl,pg])=>(
            <button key={pg} onClick={()=>setAdminPage(pg)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"11px 13px",background:adminPage===pg?`${ORANGE}22`:"transparent",border:adminPage===pg?`1px solid ${ORANGE}55`:"1px solid transparent",borderRadius:9,color:adminPage===pg?ORANGE:"rgba(255,255,255,0.65)",cursor:"pointer",fontSize:14,fontWeight:adminPage===pg?700:400,marginBottom:4,textAlign:"left",fontFamily:"inherit"}}>
              <span style={{fontSize:16,width:20,textAlign:"center"}}>{ic}</span>{lbl}
              {pg==="orders"&&orders.filter(o=>o.status==="Processing").length>0&&<span style={{marginLeft:"auto",background:"#ef4444",color:"white",borderRadius:"50%",width:20,height:20,fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{orders.filter(o=>o.status==="Processing").length}</span>}
            </button>
          ))}
        </nav>
        <div style={{padding:"12px 14px",borderTop:"1px solid rgba(255,255,255,0.08)"}}>
          <a href="https://frexsom.com" target="_blank" rel="noreferrer" style={{display:"block",color:GREEN,fontSize:12,fontWeight:600,textDecoration:"none",marginBottom:8}}>🌐 frexsom.com ↗</a>
          <button onClick={()=>{setIsAdmin(false);showToast("Returned to store");}} style={{width:"100%",background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",color:"#ef4444",padding:"10px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"inherit"}}>🚪 Exit to Store</button>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:28}}>
        {adminPage==="dashboard"&&(
          <div>
            <div style={{marginBottom:24}}><div style={{fontSize:26,fontWeight:800,color:NAVY}}>Admin Dashboard</div><div style={{color:"#7a86a0",fontSize:15,marginTop:3}}>FrexSOM Market overview</div></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:28}}>
              {[["📦",products.length,"Total Products",NAVY,"↑ Growing"],["🛒",orders.length,"Total Orders",GREEN,"This week"],["💰","~57%","Avg Profit Margin",ORANGE,"Healthy"],["❤️",wishlist.length,"Customer Wishlists","#8b5cf6","Items saved"]].map(([ic,v,l,c,s])=>(
                <Card key={l} style={{padding:"20px 22px"}}><div style={{fontSize:28,marginBottom:8}}>{ic}</div><div style={{fontSize:24,fontWeight:800,color:c}}>{v}</div><div style={{fontSize:13,color:"#7a86a0",marginTop:3}}>{l}</div><div style={{fontSize:12,color:GREEN,marginTop:5,fontWeight:600}}>{s}</div></Card>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:20}}>
              <Card style={{padding:24}}>
                <div style={{fontWeight:700,color:NAVY,fontSize:17,marginBottom:18}}>📋 Recent Orders</div>
                {orders.slice(0,5).map((o,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 0",borderBottom:i<4?"1px solid #f0f2f8":"none"}}>
                    <div style={{flex:1}}><div style={{fontWeight:700,color:NAVY,fontSize:14}}>{o.name} — {o.city}</div><div style={{fontSize:12,color:"#94a3b8",marginTop:2}}>{o.items.substring(0,45)} · {o.date}</div></div>
                    <div style={{textAlign:"right"}}><div style={{fontWeight:800,color:ORANGE,fontSize:14,marginBottom:4}}>{o.total}</div><span style={{fontSize:11.5,background:`${statusColor(o.status)}18`,color:statusColor(o.status),padding:"3px 9px",borderRadius:20,fontWeight:700}}>{o.status}</span></div>
                  </div>
                ))}
              </Card>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <Card style={{background:`linear-gradient(135deg,${NAVY},#1a3580)`,padding:22}}>
                  <div style={{color:"rgba(255,255,255,0.55)",fontSize:12,fontWeight:700,marginBottom:12,letterSpacing:0.5}}>QUICK ACTIONS</div>
                  {[["🔎 Source Products","sourcing"],["💲 Price Analyzer","pricing"],["📋 Manage Orders","orders"],["📦 Product Catalog","catalog"]].map(([lbl,pg])=>(
                    <button key={pg} onClick={()=>setAdminPage(pg)} style={{display:"block",width:"100%",textAlign:"left",padding:"10px 13px",marginBottom:8,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,color:"white",cursor:"pointer",fontSize:13.5,fontWeight:600,fontFamily:"inherit"}}>{lbl}</button>
                  ))}
                </Card>
                <Card style={{borderLeft:`4px solid ${ORANGE}`,padding:"18px 20px"}}>
                  <div style={{fontWeight:700,color:NAVY,fontSize:14,marginBottom:5}}>🌐 Live Website</div>
                  <a href="https://frexsom.com" target="_blank" rel="noreferrer" style={{fontWeight:800,color:ORANGE,fontSize:16,textDecoration:"none"}}>frexsom.com ↗</a>
                  <div style={{fontSize:12,color:GREEN,marginTop:5,fontWeight:600}}>● Live & Active</div>
                  <div style={{fontSize:12,color:"#94a3b8",marginTop:3}}>{products.length} products · {orders.length} orders</div>
                </Card>
              </div>
            </div>
          </div>
        )}
        {adminPage==="orders"&&(
          <div>
            <div style={{marginBottom:22}}><div style={{fontSize:24,fontWeight:800,color:NAVY}}>Orders</div><div style={{color:"#7a86a0",fontSize:15}}>{orders.length} total · {orders.filter(o=>o.status==="Processing").length} processing</div></div>
            <Card style={{padding:0,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"1.2fr 1.5fr 1.5fr 0.8fr 1fr 1.2fr",background:GRAY,padding:"13px 20px",fontSize:12,fontWeight:700,color:"#7a86a0",textTransform:"uppercase",letterSpacing:0.5}}>
                {["Order ID","Customer","Items","Total","Payment","Status"].map(h=><div key={h}>{h}</div>)}
              </div>
              {orders.map((o,i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"1.2fr 1.5fr 1.5fr 0.8fr 1fr 1.2fr",padding:"14px 20px",borderBottom:i<orders.length-1?"1px solid #f0f2f8":"none",alignItems:"center"}}>
                  <div style={{fontWeight:700,color:NAVY,fontSize:13}}>{o.id}</div>
                  <div><div style={{fontWeight:600,color:NAVY,fontSize:13}}>{o.name}</div><div style={{fontSize:12,color:"#94a3b8"}}>{o.city} · {o.date}</div></div>
                  <div style={{fontSize:12,color:"#64748b"}}>{o.items.substring(0,30)}…</div>
                  <div style={{fontWeight:800,color:ORANGE,fontSize:13}}>{o.total}</div>
                  <div style={{fontSize:12,color:"#64748b"}}>{o.payment}</div>
                  <select value={o.status} onChange={e=>{const s=e.target.value;setOrders(prev=>prev.map((ord,j)=>j===i?{...ord,status:s}:ord));showToast(`Updated to ${s}`);}} style={{padding:"5px 8px",borderRadius:8,border:`1.5px solid ${statusColor(o.status)}`,background:`${statusColor(o.status)}12`,color:statusColor(o.status),fontSize:12,fontWeight:700,cursor:"pointer",outline:"none",fontFamily:"inherit"}}>
                    {["Processing","Shipped","Delivered","Cancelled"].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
              ))}
            </Card>
          </div>
        )}
        {adminPage==="catalog"&&(
          <div>
            <div style={{marginBottom:22}}><div style={{fontSize:24,fontWeight:800,color:NAVY}}>Product Catalog</div><div style={{color:"#7a86a0",fontSize:15}}>{products.length} products</div></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
              {products.map(p=>{
                const margin=Math.round(((p.price-p.cost)/p.price)*100);
                return (
                  <Card key={p.id} style={{display:"flex",flexDirection:"column",padding:0,overflow:"hidden"}}>
                    <img src={p.image} alt={p.name} style={{width:"100%",height:160,objectFit:"cover"}} onError={e=>{e.target.src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80";}}/>
                    <div style={{padding:"14px 16px 16px",display:"flex",flexDirection:"column",flex:1}}>
                      <div style={{fontSize:15,fontWeight:700,color:NAVY,marginBottom:5}}>{p.name}</div>
                      <div style={{fontSize:12,color:"#64748b",lineHeight:1.5,flex:1,marginBottom:10}}>{p.description}</div>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:12}}>
                        {[["Price",`$${p.price}`,ORANGE],["Cost",`$${p.cost}`,"#7a86a0"],["Margin",`${margin}%`,margin>50?GREEN:ORANGE]].map(([l,v,c])=>(
                          <div key={l} style={{background:GRAY,borderRadius:7,padding:"7px",textAlign:"center"}}><div style={{fontSize:10,color:"#94a3b8"}}>{l}</div><div style={{fontSize:13.5,fontWeight:800,color:c}}>{v}</div></div>
                        ))}
                      </div>
                      <button onClick={()=>rewriteDesc(p)} disabled={descLoad===p.id} style={{width:"100%",background:descLoad===p.id?"#94a3b8":ORANGE,color:"white",border:"none",padding:"9px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:12,fontFamily:"inherit"}}>{descLoad===p.id?"Rewriting…":"✏️ Refresh Description"}</button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
        {adminPage==="sourcing"&&(
          <div>
            <div style={{marginBottom:22}}><div style={{fontSize:24,fontWeight:800,color:NAVY}}>🔎 Source Products</div><div style={{color:"#7a86a0",fontSize:15}}>Find the best products to sell in your store.</div></div>
            <Card style={{marginBottom:20,padding:24}}>
              <div style={{display:"flex",gap:10,marginBottom:14}}>
                <input value={srcQ} onChange={e=>setSrcQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSource()} placeholder='e.g. "women fashion", "home appliances", "electronics"' style={{flex:1,padding:"13px 18px",borderRadius:9,border:"1.5px solid #dde1ee",fontSize:14,outline:"none",fontFamily:"inherit"}}/>
                <button onClick={doSource} disabled={srcLoad} style={{background:NAVY,color:"white",border:"none",padding:"13px 28px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit",opacity:srcLoad?0.7:1}}>{srcLoad?"Searching…":"🔎 Find"}</button>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {["Women's Fashion","Electronics","Home Appliances","Beauty","Children's Toys","Sports","Kitchen Essentials","Mobile Accessories"].map(s=>(
                  <button key={s} onClick={()=>setSrcQ(s)} style={{background:`${NAVY}08`,border:`1px solid ${NAVY}18`,padding:"6px 14px",borderRadius:20,cursor:"pointer",fontSize:12.5,color:NAVY,fontFamily:"inherit"}}>{s}</button>
                ))}
              </div>
            </Card>
            {srcLoad&&<Card style={{padding:50,textAlign:"center"}}><div style={{fontSize:40,marginBottom:14}}>🔍</div><div style={{fontWeight:700,color:NAVY,fontSize:16}}>Analyzing market demand…</div></Card>}
            {srcRes&&srcRes.length===0&&<Card style={{padding:30,textAlign:"center"}}><div style={{color:"#ef4444"}}>No results. Try a different search.</div></Card>}
            {srcRes&&srcRes.length>0&&(
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:18}}>
                {srcRes.map((p,i)=>(
                  <Card key={i} style={{padding:22}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><div><div style={{fontSize:16,fontWeight:800,color:NAVY}}>{p.name}</div><div style={{fontSize:12,color:"#7a86a0"}}>{p.supplier}</div></div><span style={{background:`${ORANGE}15`,color:ORANGE,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:700,flexShrink:0}}>{p.category}</span></div>
                    <div style={{background:GRAY,borderRadius:10,padding:"14px",marginBottom:14}}>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:10}}>
                        {[["Unit Cost",`$${p.unitCost}`,"#3b82f6"],["Shipping",`$${p.estimatedShipping}`,"#7a86a0"],["Margin",p.profitMargin||"~60%",GREEN]].map(([l,v,c])=>(
                          <div key={l} style={{background:"white",borderRadius:8,padding:"9px",textAlign:"center"}}><div style={{fontSize:10.5,color:"#94a3b8",marginBottom:2}}>{l}</div><div style={{fontSize:15,fontWeight:800,color:c}}>{v}</div></div>
                        ))}
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:13}}><span style={{color:"#7a86a0"}}>Min Order:</span><span style={{fontWeight:700,color:NAVY}}>{p.moq} units</span></div>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:4}}><span style={{color:"#7a86a0"}}>Suggested Price:</span><span style={{fontWeight:800,color:ORANGE}}>${((p.unitCost+p.estimatedShipping)*2.5).toFixed(2)}</span></div>
                    </div>
                    <div style={{background:LIGHT,border:`1px solid ${ORANGE}33`,borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:13,color:"#7a4000"}}>📈 {p.whyItSells}</div>
                    <button onClick={()=>importP(p)} style={{width:"100%",background:NAVY,color:"white",border:"none",padding:"12px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit"}}>+ Import to Catalog</button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
        {adminPage==="pricing"&&(
          <div>
            <div style={{marginBottom:22}}><div style={{fontSize:24,fontWeight:800,color:NAVY}}>Smart Pricing</div><div style={{color:"#7a86a0",fontSize:15}}>Get optimal pricing strategy for any product.</div></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22,alignItems:"start"}}>
              <Card style={{padding:26}}>
                {[["Product Name","text",pName,setPName,"e.g. Solar Power Bank 20000mAh"],["Total Cost USD (product + shipping)","number",pCost,setPCost,"e.g. 12.50"]].map(([lbl,type,val,set,ph])=>(
                  <div key={lbl} style={{marginBottom:18}}><label style={{fontSize:13,fontWeight:600,color:"#374151",display:"block",marginBottom:7}}>{lbl}</label><input value={val} onChange={e=>set(e.target.value)} type={type} placeholder={ph} style={{width:"100%",padding:"12px 14px",borderRadius:9,border:"1.5px solid #dde1ee",fontSize:14,boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/></div>
                ))}
                <button onClick={doPrice} disabled={priceLoad} style={{width:"100%",background:NAVY,color:"white",border:"none",padding:"13px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:15,fontFamily:"inherit",opacity:priceLoad?0.7:1}}>{priceLoad?"Calculating…":"⚡ Get Pricing Strategy"}</button>
                <div style={{marginTop:14,padding:"12px 14px",background:`${ORANGE}0d`,borderRadius:9,fontSize:13,color:"#7a4000"}}>💡 Total cost = product price + shipping to Somalia.</div>
              </Card>
              {priceRes&&(
                <div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:14}}>
                    {[{l:"Budget",v:`$${priceRes.budget}`,c:"#3b82f6",s:"High volume"},{l:"✦ Best Choice",v:`$${priceRes.recommendedPrice}`,c:ORANGE,s:"Recommended"},{l:"Premium",v:`$${priceRes.premium}`,c:"#8b5cf6",s:"Quality signal"}].map(x=>(
                      <div key={x.l} style={{background:"white",borderRadius:12,padding:"18px 12px",textAlign:"center",boxShadow:"0 2px 10px rgba(13,31,92,0.07)",border:x.l.includes("✦")?`2px solid ${x.c}`:"2px solid transparent"}}>
                        <div style={{fontSize:12,color:"#7a86a0",marginBottom:4}}>{x.l}</div>
                        <div style={{fontSize:24,fontWeight:900,color:x.c}}>{x.v}</div>
                        <div style={{fontSize:11,color:"#94a3b8",marginTop:3}}>{x.s}</div>
                      </div>
                    ))}
                  </div>
                  <Card style={{padding:20}}>
                    <div style={{display:"flex",gap:10,marginBottom:12}}>
                      <div style={{flex:1,background:GRAY,borderRadius:9,padding:"12px 14px"}}><div style={{fontSize:12,color:"#7a86a0"}}>Gross Margin</div><div style={{fontWeight:800,color:GREEN,fontSize:18,marginTop:3}}>{priceRes.margin}</div></div>
                      <div style={{flex:2,background:GRAY,borderRadius:9,padding:"12px 14px"}}><div style={{fontSize:12,color:"#7a86a0"}}>Demand Forecast</div><div style={{fontWeight:600,color:NAVY,fontSize:13,marginTop:3,lineHeight:1.5}}>{priceRes.demandForecast}</div></div>
                    </div>
                    <div style={{background:LIGHT,border:`1px solid ${ORANGE}33`,borderRadius:9,padding:"12px 14px",fontSize:13,color:"#7a4000",lineHeight:1.5}}>💡 <strong>Expert tip:</strong> {priceRes.tip}</div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}
        {adminPage==="support"&&(
          <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 120px)"}}>
            <div style={{marginBottom:18}}><div style={{fontSize:24,fontWeight:800,color:NAVY}}>Support Chat</div><div style={{color:"#7a86a0",fontSize:15}}>Monitor and test customer support responses.</div></div>
            <Card style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",padding:0}}>
              <div style={{flex:1,overflowY:"auto",padding:"20px 22px"}}>
                {msgs.map((m,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:14}}>
                    {m.role==="assistant"&&<div style={{width:36,height:36,borderRadius:"50%",background:NAVY,display:"flex",alignItems:"center",justifyContent:"center",marginRight:10,fontSize:16,flexShrink:0}}>💬</div>}
                    <div style={{maxWidth:"72%",padding:"12px 16px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?NAVY:"#f4f6fb",color:m.role==="user"?"white":"#1e293b",fontSize:14,lineHeight:1.6}}>{m.content}</div>
                  </div>
                ))}
                {chatLoad&&<div style={{display:"flex"}}><div style={{width:36,height:36,borderRadius:"50%",background:NAVY,display:"flex",alignItems:"center",justifyContent:"center",marginRight:10}}>💬</div><div style={{background:"#f4f6fb",padding:"12px 16px",borderRadius:"18px 18px 18px 4px",color:"#94a3b8"}}>Typing…</div></div>}
              </div>
              <div style={{padding:"14px 20px",borderTop:"1px solid #f0f2f8",display:"flex",gap:10}}>
                <input value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doChat()} placeholder="Test a customer question…" style={{flex:1,padding:"12px 18px",borderRadius:25,border:"1.5px solid #dde1ee",fontSize:14,outline:"none",fontFamily:"inherit"}}/>
                <button onClick={doChat} disabled={chatLoad} style={{background:NAVY,color:"white",border:"none",padding:"12px 24px",borderRadius:25,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit"}}>Send</button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════
  // CUSTOMER STOREFRONT — Full Jumia-style layout
  // ════════════════════════════════════════════════════
  return (
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",background:"#f0f2f5",minHeight:"100vh"}}>
      {toast&&<div style={{position:"fixed",top:22,right:22,zIndex:1000,background:toast.color,color:"white",padding:"13px 24px",borderRadius:12,fontWeight:700,fontSize:14,boxShadow:"0 4px 24px rgba(0,0,0,0.2)"}}>{toast.msg}</div>}

      {/* Admin Login Modal */}
      {showAdminLogin&&(
        <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(13,31,92,0.75)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"white",borderRadius:18,width:360,padding:36,textAlign:"center",boxShadow:"0 24px 64px rgba(0,0,0,0.3)"}}>
            <div style={{fontSize:52,marginBottom:14}}>🔐</div>
            <div style={{fontSize:20,fontWeight:800,color:NAVY,marginBottom:4}}>Admin Access</div>
            <div style={{fontSize:14,color:"#7a86a0",marginBottom:22}}>Enter your secret PIN</div>
            <input type="password" value={adminPin} onChange={e=>setAdminPin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&tryLogin()} placeholder="• • • •" maxLength={6}
              style={{width:"100%",padding:"14px",borderRadius:12,border:"2px solid #dde1ee",fontSize:28,textAlign:"center",letterSpacing:12,boxSizing:"border-box",outline:"none",fontFamily:"inherit",marginBottom:16}}/>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>{setShowAdminLogin(false);setAdminPin("");}} style={{flex:1,background:"#f0f2f8",color:"#64748b",border:"none",padding:"13px",borderRadius:10,cursor:"pointer",fontWeight:700,fontFamily:"inherit"}}>Cancel</button>
              <button onClick={tryLogin} style={{flex:1,background:NAVY,color:"white",border:"none",padding:"13px",borderRadius:10,cursor:"pointer",fontWeight:700,fontFamily:"inherit"}}>Enter →</button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickView&&(
        <div style={{position:"fixed",inset:0,zIndex:80,background:"rgba(13,31,92,0.65)",display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setQuickView(null)}>
          <div style={{background:"white",borderRadius:18,width:640,overflow:"hidden",boxShadow:"0 24px 64px rgba(0,0,0,0.25)"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
              <img src={quickView.image} alt={quickView.name} style={{width:"100%",height:360,objectFit:"cover"}} onError={e=>{e.target.src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80";}}/>
              <div style={{padding:28,display:"flex",flexDirection:"column"}}>
                <div style={{fontSize:12,color:ORANGE,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{quickView.category}</div>
                <div style={{fontSize:20,fontWeight:800,color:NAVY,marginBottom:10,lineHeight:1.3,flex:1}}>{quickView.name}</div>
                <Stars rating={quickView.rating} count={quickView.reviews}/>
                <div style={{display:"flex",alignItems:"center",gap:12,margin:"14px 0"}}>
                  <span style={{fontSize:30,fontWeight:900,color:NAVY}}>${quickView.price}</span>
                  {quickView.oldPrice&&<><span style={{fontSize:16,color:"#94a3b8",textDecoration:"line-through"}}>${quickView.oldPrice}</span><span style={{background:"#ef4444",color:"white",padding:"2px 8px",borderRadius:20,fontSize:12,fontWeight:700}}>-{Math.round((1-quickView.price/quickView.oldPrice)*100)}%</span></>}
                </div>
                <div style={{fontSize:13.5,color:"#64748b",lineHeight:1.7,marginBottom:20}}>{quickView.description}</div>
                <div style={{background:"#f0fdf4",borderRadius:8,padding:"8px 12px",marginBottom:16,fontSize:13,color:GREEN,fontWeight:600}}>✅ In Stock · Ships 15–30 days</div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>{addToCart(quickView);setQuickView(null);}} style={{flex:1,background:ORANGE,color:"white",border:"none",padding:"13px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:15,fontFamily:"inherit"}}>🛒 Add to Cart</button>
                  <button onClick={()=>toggleWish(quickView.id)} style={{background:wishlist.includes(quickView.id)?"#fef2f2":"#f0f2f8",border:"none",padding:"13px 16px",borderRadius:9,cursor:"pointer",fontSize:19}}>{wishlist.includes(quickView.id)?"❤️":"🤍"}</button>
                  <button onClick={()=>setQuickView(null)} style={{background:"#f0f2f8",border:"none",padding:"13px 16px",borderRadius:9,cursor:"pointer",fontSize:17}}>✕</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TOP ANNOUNCEMENT BAR ── */}
      <div style={{background:NAVY,color:"rgba(255,255,255,0.85)",textAlign:"center",padding:"7px 16px",fontSize:12.5,fontWeight:500}}>
        <span style={{color:ORANGE,fontWeight:700}}>🎁 FREXSOM DEALS:</span> Free delivery on orders over $50 &nbsp;·&nbsp; Pay with EVC Plus, Zaad, E-Dahab or Cash &nbsp;·&nbsp; 📞 <a href="tel:+252611013604" style={{color:ORANGE,textDecoration:"none",fontWeight:700}}>(+252) 611 013 604</a>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <div style={{background:ORANGE,padding:"0 28px",boxShadow:"0 2px 12px rgba(0,0,0,0.15)"}}>
        <div style={{display:"flex",alignItems:"center",gap:16,height:72}}>
          {/* Logo */}
          <div onClick={handleLogoClick} style={{cursor:"pointer",flexShrink:0}}>
            <Logo size={18}/>
          </div>

          {/* Search bar */}
          <div style={{flex:1,maxWidth:580,display:"flex",borderRadius:8,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}}>
            <input value={searchInput} onChange={e=>setSearchInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSearch()} placeholder="Search products, brands and categories…"
              style={{flex:1,padding:"13px 18px",border:"none",fontSize:14,outline:"none",fontFamily:"inherit"}}/>
            <button onClick={handleSearch} style={{background:NAVY,color:"white",border:"none",padding:"13px 22px",cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit",flexShrink:0}}>🔍 Search</button>
          </div>

          {/* Nav actions */}
          <div style={{display:"flex",gap:4,alignItems:"center",marginLeft:"auto"}}>
            {[
              {label:"My Account",icon:"👤",onClick:()=>{}},
              {label:"My Orders",icon:"📋",onClick:()=>setShowMyOrders(!showMyOrders)},
              {label:"Wishlist",icon:"❤️",onClick:()=>{},badge:wishlist.length>0?wishlist.length:null},
            ].map(({label,icon,onClick,badge})=>(
              <button key={label} onClick={onClick} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",color:"white",padding:"8px 14px",borderRadius:8,cursor:"pointer",fontWeight:600,fontSize:12.5,fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",gap:1,position:"relative"}}>
                <span style={{fontSize:18}}>{icon}</span>
                <span style={{fontSize:10.5}}>{label}</span>
                {badge&&<span style={{position:"absolute",top:-4,right:-4,background:"white",color:ORANGE,borderRadius:"50%",width:18,height:18,fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{badge}</span>}
              </button>
            ))}
            <button onClick={()=>setCartOpen(true)} style={{background:"white",color:ORANGE,border:"none",padding:"8px 18px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:14,display:"flex",alignItems:"center",gap:8,fontFamily:"inherit",flexShrink:0}}>
              🛒 Cart {cartCount>0&&<span style={{background:ORANGE,color:"white",borderRadius:"50%",width:22,height:22,fontSize:12,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Category tabs - Jumia style */}
        <div style={{display:"flex",gap:0,overflowX:"auto",borderTop:"1px solid rgba(255,255,255,0.2)"}}>
          {CATS.map(c=>(
            <button key={c.id} onClick={()=>{setCatFilter(c.id);setSubFilter("");setSearchQ("");setSearchInput("");setTimeout(()=>productsRef.current?.scrollIntoView({behavior:'smooth'}),100);}} style={{background:catFilter===c.id?"rgba(255,255,255,0.2)":"transparent",border:"none",borderBottom:catFilter===c.id?"3px solid white":"3px solid transparent",color:"white",padding:"10px 16px",cursor:"pointer",fontWeight:catFilter===c.id?700:500,fontSize:13,whiteSpace:"nowrap",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>
              <span>{c.icon}</span>{c.label}
            </button>
          ))}
        </div>
      </div>

      {/* My Orders Dropdown */}
      {showMyOrders&&(
        <div style={{background:"white",borderBottom:"2px solid #eaecf4",padding:"20px 28px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontSize:17,fontWeight:800,color:NAVY}}>📋 My Recent Orders</div>
            <button onClick={()=>setShowMyOrders(false)} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:"#94a3b8"}}>✕</button>
          </div>
          {orders.length===0
            ?<div style={{color:"#94a3b8",textAlign:"center",padding:"20px 0",fontSize:14}}>No orders yet. Start shopping!</div>
            :orders.slice(0,3).map((o,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:i<2?"1px solid #f0f2f8":"none"}}>
                <div><div style={{fontWeight:700,color:NAVY,fontSize:14}}>{o.id} — {o.city}</div><div style={{fontSize:12.5,color:"#94a3b8",marginTop:2}}>{o.items.substring(0,50)}</div></div>
                <div style={{textAlign:"right"}}><div style={{fontWeight:700,color:ORANGE,fontSize:14}}>{o.total}</div><span style={{fontSize:12,background:`${statusColor(o.status)}18`,color:statusColor(o.status),padding:"2px 9px",borderRadius:20,fontWeight:700}}>{o.status}</span></div>
              </div>
            ))
          }
        </div>
      )}

      {/* Search results bar */}
      {searchQ&&(
        <div style={{background:"white",borderBottom:"2px solid #eaecf4",padding:"12px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:15,color:NAVY,fontWeight:600}}>🔍 "<strong>{searchQ}</strong>" — {filtered.length} result{filtered.length!==1?"s":""}</div>
          <button onClick={clearSearch} style={{background:NAVY,color:"white",border:"none",padding:"7px 18px",borderRadius:20,cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"inherit"}}>✕ Clear Search</button>
        </div>
      )}

      {/* ── MAIN LAYOUT: Left sidebar + Content ── */}
      <div style={{display:"flex",maxWidth:1400,margin:"0 auto",padding:"16px 16px",gap:16,alignItems:"flex-start"}}>

        {/* ── LEFT SIDEBAR — Jumia style ── */}
        <div style={{width:220,flexShrink:0,position:"sticky",top:16}}>
          {/* Categories */}
          <Card style={{padding:0,overflow:"hidden",marginBottom:16}}>
            <div style={{background:NAVY,padding:"14px 16px"}}>
              <div style={{fontSize:15,fontWeight:700,color:"white"}}>📁 Categories</div>
            </div>
            {CATS.map(c=>(
              <div key={c.id}>
                <button onClick={()=>{setCatFilter(c.id);setSubFilter("");setSearchQ("");setSearchInput("");setExpandedCat(expandedCat===c.id?"":c.id);setTimeout(()=>productsRef.current?.scrollIntoView({behavior:'smooth'}),100);}}
                  style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"11px 16px",background:catFilter===c.id?`${ORANGE}10`:"transparent",border:"none",borderLeft:catFilter===c.id?`3px solid ${ORANGE}`:"3px solid transparent",cursor:"pointer",fontFamily:"inherit",borderBottom:"1px solid #f0f2f8"}}>
                  <div style={{display:"flex",alignItems:"center",gap:9}}>
                    <span style={{fontSize:16}}>{c.icon}</span>
                    <span style={{fontSize:13.5,fontWeight:catFilter===c.id?700:500,color:catFilter===c.id?ORANGE:NAVY}}>{c.label}</span>
                  </div>
                  {c.sub.length>0&&<span style={{fontSize:11,color:"#94a3b8"}}>{expandedCat===c.id?"▲":"▼"}</span>}
                </button>
                {expandedCat===c.id&&c.sub.length>0&&c.sub.map(s=>(
                  <button key={s} onClick={()=>{setSubFilter(s);setCatFilter(c.id);setSearchQ("");setSearchInput("");setTimeout(()=>productsRef.current?.scrollIntoView({behavior:'smooth'}),100);}}
                    style={{display:"block",width:"100%",padding:"8px 16px 8px 44px",background:subFilter===s?`${ORANGE}08`:"transparent",border:"none",borderBottom:"1px solid #f8f8f8",cursor:"pointer",fontFamily:"inherit",textAlign:"left",fontSize:12.5,color:subFilter===s?ORANGE:"#64748b",fontWeight:subFilter===s?600:400}}>
                    {s}
                  </button>
                ))}
              </div>
            ))}
          </Card>

          {/* Filter by Price */}
          <Card style={{padding:16,marginBottom:16}}>
            <div style={{fontSize:14,fontWeight:700,color:NAVY,marginBottom:12}}>💰 Sort By</div>
            {[["default","Default"],["price-asc","Price: Low to High"],["price-desc","Price: High to Low"],["rating","Highest Rated"],["new","New Arrivals"]].map(([val,lbl])=>(
              <button key={val} onClick={()=>setSortBy(val)} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"8px 0",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",marginBottom:4}}>
                <div style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${sortBy===val?ORANGE:"#dde1ee"}`,background:sortBy===val?ORANGE:"transparent",flexShrink:0}}/>
                <span style={{fontSize:13,color:sortBy===val?ORANGE:NAVY,fontWeight:sortBy===val?600:400}}>{lbl}</span>
              </button>
            ))}
          </Card>

          {/* Help card */}
          <Card style={{padding:16,background:`linear-gradient(135deg,${NAVY},#1a3580)`}}>
            <div style={{fontSize:14,fontWeight:700,color:"white",marginBottom:10}}>Need Help? 💬</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",marginBottom:12,lineHeight:1.6}}>Our team is available 24/7 to assist you.</div>
            <a href="tel:+252611013604" style={{display:"block",background:ORANGE,color:"white",textDecoration:"none",padding:"9px 12px",borderRadius:8,fontWeight:700,fontSize:13,textAlign:"center",marginBottom:8}}>📞 Call Us</a>
            <a href="mailto:info@frexsom.com" style={{display:"block",background:"rgba(255,255,255,0.1)",color:"white",textDecoration:"none",padding:"9px 12px",borderRadius:8,fontWeight:600,fontSize:13,textAlign:"center"}}>✉️ Email Us</a>
          </Card>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{flex:1,minWidth:0}}>

          {/* Hero Banner */}
          {!searchQ&&catFilter==="all"&&(
            <div style={{borderRadius:16,overflow:"hidden",background:`linear-gradient(130deg,${NAVY} 0%,#1a3580 50%,${ORANGE}99 100%)`,padding:"44px 40px",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div>
                <div style={{display:"inline-block",background:ORANGE,padding:"4px 14px",borderRadius:20,fontSize:12,fontWeight:700,marginBottom:12,letterSpacing:0.5}}>🇸🇴 Somalia's #1 Online Store</div>
                <div style={{fontSize:34,fontWeight:900,lineHeight:1.15,marginBottom:12}}>Shop Smarter.<br/><span style={{color:ORANGE}}>Save More.</span></div>
                <div style={{fontSize:14,opacity:0.85,marginBottom:20,lineHeight:1.7,maxWidth:400}}>Quality products delivered to your door. Pay with EVC Plus, Zaad or cash on delivery.</div>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>{setCatFilter("all");setTimeout(()=>productsRef.current?.scrollIntoView({behavior:'smooth'}),100);}} style={{background:ORANGE,color:"white",border:"none",padding:"12px 26px",borderRadius:25,cursor:"pointer",fontWeight:800,fontSize:15,fontFamily:"inherit"}}>Shop Now →</button>
                  <a href="mailto:info@frexsom.com" style={{background:"rgba(255,255,255,0.15)",color:"white",border:"1px solid rgba(255,255,255,0.3)",padding:"12px 20px",borderRadius:25,fontWeight:600,fontSize:14,textDecoration:"none",display:"inline-flex",alignItems:"center"}}>✉️ Contact</a>
                </div>
              </div>
              <div style={{fontSize:100,opacity:0.85,flexShrink:0,filter:"drop-shadow(0 16px 32px rgba(0,0,0,0.3))"}}>🛍️</div>
            </div>
          )}

          {/* Trust badges */}
          {!searchQ&&catFilter==="all"&&(
            <Card style={{padding:"14px 20px",marginBottom:20}}>
              <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:8}}>
                {[["🚢","15–30 Day Delivery"],["💳","EVC Plus & Zaad"],["🔄","30-Day Returns"],["🎧","24/7 Support"],["🔒","Secure Checkout"]].map(([ic,t])=>(
                  <div key={t} style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:20}}>{ic}</span>
                    <span style={{fontSize:13,fontWeight:600,color:NAVY}}>{t}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Flash Deals */}
          {!searchQ&&catFilter==="all"&&flashDeals.length>0&&(
            <div style={{marginBottom:24}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:14}}>
                  <div style={{fontSize:22,fontWeight:800,color:NAVY,borderLeft:`4px solid ${ORANGE}`,paddingLeft:12}}>⚡ Flash Deals</div>
                  <div style={{background:NAVY,color:"white",padding:"6px 16px",borderRadius:25,fontSize:13,fontWeight:700}}>Ends: {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}</div>
                </div>
                <button onClick={()=>{setCatFilter("all");setTimeout(()=>productsRef.current?.scrollIntoView({behavior:'smooth'}),100);}} style={{background:"none",border:`1.5px solid ${NAVY}`,color:NAVY,padding:"7px 18px",borderRadius:25,cursor:"pointer",fontWeight:600,fontSize:13,fontFamily:"inherit"}}>See All →</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
                {flashDeals.map(p=><ProductCard key={p.id} p={p}/>)}
              </div>
            </div>
          )}

          {/* Best Sellers */}
          {!searchQ&&catFilter==="all"&&bestSellers.length>0&&(
            <div style={{marginBottom:24}}>
              <SectionHead title="🏆 Best Sellers" action="View All" onAction={()=>{setCatFilter("all");setTimeout(()=>productsRef.current?.scrollIntoView({behavior:'smooth'}),100);}}/>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
                {bestSellers.slice(0,4).map(p=><ProductCard key={p.id} p={p}/>)}
              </div>
            </div>
          )}

          {/* Promo Banner */}
          {!searchQ&&catFilter==="all"&&(
            <div style={{borderRadius:16,overflow:"hidden",background:`linear-gradient(135deg,${ORANGE},#e67e00)`,padding:"26px 32px",display:"flex",justifyContent:"space-between",alignItems:"center",color:"white",marginBottom:24}}>
              <div>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:6,opacity:0.85}}>Limited Time Offer</div>
                <div style={{fontSize:24,fontWeight:900,marginBottom:6}}>Free Delivery on First Order!</div>
                <div style={{fontSize:13.5,opacity:0.9,marginBottom:14}}>Use code <strong>FREXSOM</strong> at checkout · New customers only</div>
                <button onClick={()=>productsRef.current?.scrollIntoView({behavior:'smooth'})} style={{background:"white",color:ORANGE,border:"none",padding:"10px 24px",borderRadius:25,cursor:"pointer",fontWeight:800,fontSize:14,fontFamily:"inherit"}}>Claim Offer →</button>
              </div>
              <div style={{fontSize:85,opacity:0.7,flexShrink:0}}>🎁</div>
            </div>
          )}

          {/* New Arrivals */}
          {!searchQ&&catFilter==="all"&&newArrivals.length>0&&(
            <div style={{marginBottom:24}}>
              <SectionHead title="🆕 New Arrivals" action="View All" onAction={()=>{setCatFilter("all");setSortBy("new");}}/>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
                {newArrivals.slice(0,4).map(p=><ProductCard key={p.id} p={p}/>)}
              </div>
            </div>
          )}

          {/* All Products Grid */}
          <div ref={productsRef}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
              <div style={{fontSize:20,fontWeight:800,color:NAVY,borderLeft:`4px solid ${ORANGE}`,paddingLeft:12}}>
                {searchQ?`Results for "${searchQ}"`:CATS.find(c=>c.id===catFilter)?.label||"All Products"}
                <span style={{color:"#94a3b8",fontWeight:400,fontSize:14,marginLeft:8}}>({filtered.length} items)</span>
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:13,color:"#7a86a0"}}>Sort:</span>
                <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{padding:"7px 12px",borderRadius:8,border:"1.5px solid #dde1ee",fontSize:13,outline:"none",fontFamily:"inherit",cursor:"pointer"}}>
                  <option value="default">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="new">New Arrivals</option>
                </select>
              </div>
            </div>
            {filtered.length===0
              ?<Card style={{padding:60,textAlign:"center"}}><div style={{fontSize:52,marginBottom:14}}>🔍</div><div style={{fontWeight:700,fontSize:18,color:NAVY,marginBottom:8}}>No products found</div><button onClick={clearSearch} style={{background:NAVY,color:"white",border:"none",padding:"11px 26px",borderRadius:25,cursor:"pointer",fontWeight:700,fontFamily:"inherit",fontSize:14}}>Browse All</button></Card>
              :<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
                {filtered.map(p=><ProductCard key={p.id} p={p}/>)}
              </div>
            }
          </div>

          {/* Newsletter */}
          <div style={{background:NAVY,borderRadius:16,padding:"36px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,flexWrap:"wrap",marginTop:28}}>
            <div>
              <div style={{fontSize:22,fontWeight:800,color:"white",marginBottom:6}}>📧 Get Exclusive Deals</div>
              <div style={{fontSize:14,color:"rgba(255,255,255,0.6)"}}>Subscribe for flash sales, new arrivals and offers.</div>
            </div>
            {newsletterDone
              ?<div style={{color:GREEN,fontWeight:700,fontSize:16}}>✅ You're subscribed!</div>
              :<div style={{display:"flex",gap:10}}>
                <input value={newsletter} onChange={e=>setNewsletter(e.target.value)} placeholder="Your email address" style={{padding:"12px 20px",borderRadius:25,border:"none",fontSize:14,outline:"none",width:280,fontFamily:"inherit"}}/>
                <button onClick={()=>{if(newsletter.includes("@")){setNewsletterDone(true);showToast("Subscribed! 🎉");}}} style={{background:ORANGE,color:"white",border:"none",padding:"12px 24px",borderRadius:25,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit"}}>Subscribe</button>
              </div>
            }
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{background:NAVY,color:"rgba(255,255,255,0.6)",padding:"48px 40px 28px",marginTop:28}}>
        <div style={{display:"grid",gridTemplateColumns:"1.8fr 1fr 1fr 1fr 1fr",gap:28,marginBottom:32,maxWidth:1400,margin:"0 auto 32px"}}>
          <div>
            <Logo size={17}/>
            <div style={{fontSize:13.5,marginTop:14,lineHeight:1.9,maxWidth:260}}>Somalia's most trusted online store. Quality products delivered nationwide with multiple payment options.</div>
            <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:8}}>
              <a href="tel:+252611013604" style={{color:ORANGE,textDecoration:"none",fontSize:13.5,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>📞 (+252) 611 013 604</a>
              <a href="mailto:info@frexsom.com" style={{color:ORANGE,textDecoration:"none",fontSize:13.5,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>✉️ info@frexsom.com</a>
              <a href="https://frexsom.com" style={{color:ORANGE,textDecoration:"none",fontSize:13.5,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>🌐 frexsom.com</a>
            </div>
          </div>
          {[
            {title:"Shop",items:[["All Products",()=>setCatFilter("all")],["Fashion",()=>setCatFilter("Fashion")],["Electronics",()=>setCatFilter("Electronics")],["Kitchen",()=>setCatFilter("Kitchen")],["Beauty",()=>setCatFilter("Beauty")]]},
            {title:"Customer Service",items:[["My Orders",()=>setShowMyOrders(true)],["Contact Us",()=>window.location.href="mailto:info@frexsom.com"],["Return Policy",null],["FAQ",null],["Track Order",null]]},
            {title:"Payment Methods",items:[["💳 EVC Plus"],["💳 Zaad"],["💳 E-Dahab"],["💵 Cash on Delivery"],["🌐 Bank Transfer"]]},
            {title:"Delivery Cities",items:[["Mogadishu"],["Hargeisa"],["Baidoa"],["Kismayo"],["Garowe"],["Bosaso"],["+ more cities"]]},
          ].map(col=>(
            <div key={col.title}>
              <div style={{fontWeight:700,color:"white",marginBottom:16,fontSize:15}}>{col.title}</div>
              {col.items.map(([lbl,fn])=>(
                <div key={lbl} style={{marginBottom:10}}>
                  {fn?<button onClick={fn} style={{background:"none",border:"none",color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:13.5,padding:0,fontFamily:"inherit",textAlign:"left"}}>{lbl}</button>:<span style={{fontSize:13.5}}>{lbl}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12.5,flexWrap:"wrap",gap:10,maxWidth:1400,margin:"0 auto"}}>
          <span>© 2026 FrexSOM Market · frexsom.com · Made with ❤️ for Somalia 🇸🇴</span>
          <div style={{display:"flex",gap:20}}>
            {["Privacy Policy","Terms of Service","Return Policy","Cookie Policy"].map(lbl=>(
              <a key={lbl} href="#" style={{color:"rgba(255,255,255,0.4)",textDecoration:"none",fontSize:12.5}}>{lbl}</a>
            ))}
          </div>
        </div>
      </div>

      {/* ── CART DRAWER ── */}
      {cartOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:50,display:"flex"}}>
          <div onClick={()=>setCartOpen(false)} style={{flex:1,background:"rgba(13,31,92,0.45)"}}/>
          <div style={{width:420,background:"white",display:"flex",flexDirection:"column",boxShadow:"-4px 0 32px rgba(0,0,0,0.15)"}}>
            <div style={{padding:"20px 24px",borderBottom:"1px solid #f0f2f8",display:"flex",justifyContent:"space-between",alignItems:"center",background:NAVY}}>
              <div style={{fontWeight:800,fontSize:18,color:"white"}}>🛒 Your Cart ({cartCount})</div>
              <button onClick={()=>setCartOpen(false)} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",fontSize:18,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"}}>✕</button>
            </div>
            {cart.length===0
              ?<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#94a3b8"}}>
                <div style={{fontSize:60}}>🛒</div>
                <div style={{fontWeight:700,marginTop:14,color:NAVY,fontSize:17}}>Your cart is empty</div>
                <div style={{fontSize:13.5,marginTop:5,color:"#94a3b8"}}>Add products to get started</div>
                <button onClick={()=>setCartOpen(false)} style={{marginTop:20,background:ORANGE,color:"white",border:"none",padding:"12px 28px",borderRadius:25,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit"}}>Shop Now →</button>
              </div>
              :<>
                <div style={{flex:1,overflowY:"auto",padding:"16px 24px"}}>
                  {cart.map(item=>(
                    <div key={item.id} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:"1px solid #f4f6fb"}}>
                      <img src={item.image} alt={item.name} style={{width:60,height:60,borderRadius:10,objectFit:"cover",flexShrink:0}} onError={e=>{e.target.src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80";}}/>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,fontWeight:700,color:NAVY,lineHeight:1.3}}>{item.name}</div>
                        <div style={{fontSize:13.5,color:ORANGE,fontWeight:700,marginTop:4}}>${(item.price*item.qty).toFixed(2)}</div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <button onClick={()=>qtyChange(item.id,-1)} style={{background:GRAY,border:"none",borderRadius:6,width:28,height:28,cursor:"pointer",fontWeight:700,fontFamily:"inherit",fontSize:16}}>−</button>
                        <span style={{fontWeight:700,fontSize:14,minWidth:20,textAlign:"center"}}>{item.qty}</span>
                        <button onClick={()=>qtyChange(item.id,1)} style={{background:GRAY,border:"none",borderRadius:6,width:28,height:28,cursor:"pointer",fontWeight:700,fontFamily:"inherit",fontSize:16}}>+</button>
                      </div>
                      <button onClick={()=>removeItem(item.id)} style={{background:"none",border:"none",color:"#c0c9dd",cursor:"pointer",fontSize:19,fontFamily:"inherit"}}>✕</button>
                    </div>
                  ))}
                </div>
                <div style={{padding:"20px 24px",borderTop:"2px solid #f0f2f8"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{color:"#7a86a0",fontSize:14}}>Subtotal ({cartCount} items)</span><span style={{fontWeight:700,color:NAVY,fontSize:15}}>${cartTotal}</span></div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}><span style={{color:"#7a86a0",fontSize:14}}>Shipping</span><span style={{fontSize:14,color:GREEN,fontWeight:600}}>Calculated at checkout</span></div>
                  <button onClick={()=>{setCartOpen(false);setCheckoutStep("form");}} style={{width:"100%",background:ORANGE,color:"white",border:"none",padding:"15px",borderRadius:10,cursor:"pointer",fontWeight:800,fontSize:16,fontFamily:"inherit"}}>Proceed to Checkout →</button>
                  <button onClick={()=>setCartOpen(false)} style={{width:"100%",background:"transparent",color:NAVY,border:"none",padding:"11px",borderRadius:10,cursor:"pointer",fontWeight:600,fontSize:14,fontFamily:"inherit",marginTop:8}}>Continue Shopping</button>
                </div>
              </>
            }
          </div>
        </div>
      )}

      {/* ── CHECKOUT ── */}
      {checkoutStep==="form"&&(
        <div style={{position:"fixed",inset:0,zIndex:60,background:"rgba(13,31,92,0.55)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"white",borderRadius:18,width:500,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 24px 64px rgba(0,0,0,0.22)"}}>
            <div style={{background:NAVY,padding:"22px 28px",borderRadius:"18px 18px 0 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{fontSize:20,fontWeight:800,color:"white"}}>Checkout</div><div style={{fontSize:13,color:"rgba(255,255,255,0.65)",marginTop:2}}>Secure checkout — Somalia 🇸🇴</div></div>
              <button onClick={()=>setCheckoutStep(null)} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",fontSize:17,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit"}}>✕</button>
            </div>
            <div style={{padding:"24px 28px"}}>
              <div style={{fontSize:15,fontWeight:700,color:NAVY,marginBottom:16}}>📦 Delivery Details</div>
              {[["Full Name","text","name","e.g. Amina Hassan"],["Phone Number","tel","phone","e.g. (+252) 611 000 000"],["Street Address","text","address","Street, district, neighbourhood"]].map(([lbl,type,key,ph])=>(
                <div key={key} style={{marginBottom:16}}>
                  <label style={{fontSize:13,fontWeight:600,color:"#374151",display:"block",marginBottom:7}}>{lbl} <span style={{color:"#ef4444"}}>*</span></label>
                  <input value={form[key]} onChange={e=>setForm(p=>({...p,[key]:e.target.value}))} type={type} placeholder={ph} style={{width:"100%",padding:"12px 15px",borderRadius:9,border:`1.5px solid ${form[key]?GREEN:"#dde1ee"}`,fontSize:14,boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/>
                </div>
              ))}
              <div style={{marginBottom:16}}>
                <label style={{fontSize:13,fontWeight:600,color:"#374151",display:"block",marginBottom:7}}>City</label>
                <select value={form.city} onChange={e=>setForm(p=>({...p,city:e.target.value}))} style={{width:"100%",padding:"12px 15px",borderRadius:9,border:`1.5px solid ${GREEN}`,fontSize:14,outline:"none",fontFamily:"inherit",background:"white"}}>
                  {CITIES.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={{fontSize:15,fontWeight:700,color:NAVY,marginBottom:14,marginTop:22}}>💳 Payment Method</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:22}}>
                {PAYMENTS.map(pm=>(
                  <button key={pm} onClick={()=>setForm(p=>({...p,payment:pm}))} style={{padding:"13px",borderRadius:9,border:`2px solid ${form.payment===pm?ORANGE:"#dde1ee"}`,background:form.payment===pm?LIGHT:"white",color:form.payment===pm?NAVY:"#64748b",cursor:"pointer",fontWeight:700,fontSize:13.5,fontFamily:"inherit"}}>{pm}</button>
                ))}
              </div>
              <div style={{background:GRAY,borderRadius:10,padding:"16px 18px",marginBottom:22}}>
                <div style={{fontWeight:700,color:NAVY,fontSize:14,marginBottom:12}}>Order Summary</div>
                {cart.map(item=>(
                  <div key={item.id} style={{display:"flex",justifyContent:"space-between",fontSize:13.5,color:"#475569",marginBottom:7}}>
                    <span>{item.name} × {item.qty}</span><span style={{fontWeight:600}}>${(item.price*item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{borderTop:"1px solid #e5e8f0",marginTop:10,paddingTop:10,display:"flex",justifyContent:"space-between",fontWeight:800,fontSize:17,color:NAVY}}>
                  <span>Total</span><span style={{color:ORANGE}}>${cartTotal}</span>
                </div>
              </div>
              <div style={{display:"flex",gap:12}}>
                <button onClick={()=>setCheckoutStep(null)} style={{flex:1,background:"#f0f2f8",color:"#64748b",border:"none",padding:"14px",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit"}}>← Back</button>
                <button onClick={placeOrder} disabled={!form.name||!form.phone} style={{flex:2,background:(!form.name||!form.phone)?"#c0c9dd":ORANGE,color:"white",border:"none",padding:"14px",borderRadius:10,cursor:"pointer",fontWeight:800,fontSize:15,fontFamily:"inherit"}}>✓ Place Order</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ORDER SUCCESS ── */}
      {checkoutStep==="done"&&orderDone&&(
        <div style={{position:"fixed",inset:0,zIndex:60,background:"rgba(13,31,92,0.55)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"white",borderRadius:18,width:460,padding:36,textAlign:"center",boxShadow:"0 24px 64px rgba(0,0,0,0.22)"}}>
            <div style={{fontSize:70,marginBottom:16}}>🎉</div>
            <div style={{fontSize:24,fontWeight:800,color:NAVY,marginBottom:5}}>Order Confirmed!</div>
            <div style={{fontSize:14.5,color:"#7a86a0",marginBottom:24}}>Shukran! Your order has been placed successfully.</div>
            <div style={{background:LIGHT,border:`1.5px solid ${ORANGE}44`,borderRadius:12,padding:"18px 22px",marginBottom:18,textAlign:"left"}}>
              <div style={{fontWeight:800,color:ORANGE,fontSize:17,marginBottom:12}}>Order #{orderDone.id}</div>
              {[["👤",orderDone.name],["📞",orderDone.phone],["📍",`${orderDone.address}, ${orderDone.city}`],["💳",orderDone.payment],["💰",`$${orderDone.total} total`]].map(([ic,v])=>(
                <div key={v} style={{display:"flex",gap:10,fontSize:14,color:"#374151",marginBottom:7}}><span>{ic}</span><span>{v}</span></div>
              ))}
            </div>
            <div style={{background:"#f0fdf4",border:"1px solid #86efac",borderRadius:9,padding:"12px 16px",fontSize:13.5,color:"#166534",marginBottom:16}}>🚚 Estimated delivery: <strong>15–30 days</strong> to {orderDone.city}</div>
            <div style={{fontSize:13,color:"#7a86a0",marginBottom:22}}>Questions? <a href="mailto:info@frexsom.com" style={{color:ORANGE,fontWeight:600,textDecoration:"none"}}>info@frexsom.com</a> · <a href="tel:+252611013604" style={{color:ORANGE,fontWeight:600,textDecoration:"none"}}>(+252) 611 013 604</a></div>
            <button onClick={()=>{setCheckoutStep(null);setOrderDone(null);}} style={{width:"100%",background:NAVY,color:"white",border:"none",padding:"15px",borderRadius:10,cursor:"pointer",fontWeight:800,fontSize:15,fontFamily:"inherit"}}>Continue Shopping</button>
          </div>
        </div>
      )}
    </div>
  );
}