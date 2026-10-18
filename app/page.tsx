"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownUp, ArrowLeft, ArrowRight, BadgeCheck, Bell, Bookmark, Check,
  ChevronDown, ChevronRight, CircleHelp, Compass, Heart,
  Home, HousePlus, MapPin, MessageCircle, Search, ShieldCheck,
  SlidersHorizontal, Sparkles, Users, Wallet, X, Plus, UserRound,
  BedDouble, LockKeyhole, CheckCircle2
} from "lucide-react";

type Listing = {
  id: string; title: string; area: string; campus: string; category: "shared" | "self" | "flat" | "room";
  type: string; rent: number; distance: number; verified: boolean; owner: string; image: string;
  features: string[]; spaces?: number; gender?: string; occupants?: string;
};
type Person = { id: string; name: string; campus: string; course: string; budget: string; traits: string[]; bio: string; image: string };

const listings: Listing[] = [
  { id:"s1", title:"Bed space in a 3-bedroom flat", area:"Akoka, Yaba, Lagos", campus:"University of Lagos", category:"shared", type:"Bed space", rent:220000, distance:.7, verified:true, owner:"Mrs. Adebayo", image:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=85", features:["Prepaid meter","Borehole water","Shared kitchen","Wi-Fi ready"], spaces:2, gender:"Female only", occupants:"2 students already live here" },
  { id:"l1", title:"Bright self-contain near campus", area:"Akoka, Yaba, Lagos", campus:"University of Lagos", category:"self", type:"Self-contain", rent:450000, distance:.6, verified:true, owner:"Mrs. Adebayo", image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85", features:["Prepaid meter","Borehole water","Tiled floor","Gated compound"] },
  { id:"l2", title:"Modern mini flat in Yaba", area:"Herbert Macaulay Way, Yaba", campus:"University of Lagos", category:"flat", type:"Mini flat", rent:900000, distance:1.4, verified:true, owner:"Mr. Okafor", image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85", features:["Prepaid meter","Parking space","24h security","Water heater"] },
  { id:"s2", title:"Shared 2-bedroom in a calm compound", area:"Ajibode, Ibadan, Oyo", campus:"University of Ibadan", category:"shared", type:"Bed space", rent:160000, distance:.9, verified:true, owner:"Mr. Salami", image:"https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=85", features:["Prepaid meter","Tiled floor","Street lights"], spaces:1, gender:"Male only", occupants:"2 students already live here" },
  { id:"l3", title:"Room and parlour around Canaan Land", area:"Canaan Land, Ota, Ogun", campus:"Covenant University", category:"room", type:"Room & parlour", rent:380000, distance:1.1, verified:true, owner:"Mrs. Bello", image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85", features:["Prepaid meter","Fenced compound","Shared kitchen"] },
  { id:"s3", title:"Student bed space with study area", area:"Canaan Land, Ota, Ogun", campus:"Covenant University", category:"shared", type:"Bed space", rent:190000, distance:1, verified:true, owner:"Mrs. Bello", image:"https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1000&q=85", features:["Prepaid meter","Fenced compound","Study room"], spaces:3, gender:"Female only", occupants:"1 student already lives here" },
  { id:"l4", title:"Affordable self-contain in Ajibode", area:"Ajibode, Ibadan, Oyo", campus:"University of Ibadan", category:"self", type:"Self-contain", rent:350000, distance:.8, verified:true, owner:"Mr. Salami", image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85", features:["Tiled floor","Borehole water","Street lights"] },
  { id:"l5", title:"Spacious 2-bedroom flat", area:"Bodija, Ibadan, Oyo", campus:"University of Ibadan", category:"flat", type:"2-bedroom flat", rent:1400000, distance:4.2, verified:false, owner:"Chief Adeyemi", image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85", features:["Prepaid meter","Parking space","Large compound"] },
  { id:"l6", title:"Single room close to campus gate", area:"Ede Road, Ile-Ife, Osun", campus:"Obafemi Awolowo University", category:"room", type:"Single room", rent:180000, distance:.5, verified:true, owner:"Mrs. Ogunleye", image:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85", features:["Shared bathroom","Close to gate","Fenced compound"] },
  { id:"s4", title:"Room share near OAU", area:"Ede Road, Ile-Ife, Osun", campus:"Obafemi Awolowo University", category:"shared", type:"Bed space", rent:90000, distance:.4, verified:true, owner:"Mrs. Ogunleye", image:"https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=85", features:["Close to gate","Fenced compound"], spaces:1, gender:"Male only", occupants:"1 student already lives here" },
  { id:"l7", title:"Self-contain in Samaru", area:"Samaru, Zaria, Kaduna", campus:"Ahmadu Bello University", category:"self", type:"Self-contain", rent:280000, distance:.9, verified:true, owner:"Alhaji Musa", image:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1000&q=85", features:["Prepaid meter","Borehole water","Gated compound"] },
  { id:"l8", title:"Simple single room in Nsukka", area:"Odenigwe, Nsukka, Enugu", campus:"University of Nigeria, Nsukka", category:"room", type:"Single room", rent:150000, distance:.6, verified:true, owner:"Mr. Eze", image:"https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1000&q=85", features:["Prepaid meter","Fenced compound"] }
];

const people: Person[] = [
  { id:"p1", name:"Chidera O.", campus:"University of Lagos", course:"400L Mass Communication", budget:"₦200k–₦400k", traits:["Early bird","Very tidy","Quiet study"], bio:"Calm and clean. I cook on weekends and believe shared spaces should feel peaceful.", image:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=80" },
  { id:"p2", name:"Tolu A.", campus:"University of Lagos", course:"300L Accounting", budget:"₦200k–₦400k", traits:["Night owl","Very tidy","Social study"], bio:"Love group study and good music at low volume. Looking for a considerate roommate.", image:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=180&q=80" },
  { id:"p3", name:"Bisi K.", campus:"University of Lagos", course:"500L Medicine", budget:"₦400k–₦700k", traits:["Early bird","Very tidy","Quiet study"], bio:"Long lectures, so I need a quiet home where everyone respects quiet time.", image:"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=180&q=80 },
  { id:"p4", name:"Ngozi U.", campus:"University of Ibadan", course:"300L Nursing", budget:"Under ₦200k", traits:["Early bird","Very tidy","Quiet study"], bio:"Looking for a budget-friendly bed space near campus with a calm house culture.", image:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=180&q=80" }
];

const universities = [
  { state:"Abia", names:["Abia State University","Clifford University","Gregory University","Michael Okpara University of Agriculture","Rhema University","Spiritan University"] },
  { state:"Adamawa", names:["Adamawa State University","American University of Nigeria","Modibbo Adama University"] },
  { state:"Akwa Ibom", names:["Akwa Ibom State University","Federal University of Technology Ikot Abasi","Obong University","Ritman University","Topfaith University","University of Uyo"] },
  { state:"Anambra", names:["Chukwuemeka Odumegwu Ojukwu University","Legacy University","Madonna University","Nnamdi Azikiwe University","Paul University","Peter University","Tansian University"] },
  { state:"Bauchi", names:["Abubakar Tafawa Balewa University","Bauchi State University","Federal University of Health Sciences Azare"] },
  { state:"Bayelsa", names:["Bayelsa Medical University","Federal University Otuoke","Niger Delta University","University of Africa Toru-Orua"] },
  { state:"Benue", names:["Benue State University","Federal University of Health Sciences Otukpo","Joseph Sarwuan Tarka University","University of Mkar"] },
  { state:"Borno", names:["Borno State University","Nigerian Army University Biu","University of Maiduguri"] },
  { state:"Cross River", names:["Arthur Jarvis University","Cross River University of Technology","University of Calabar"] },
  { state:"Delta", names:["Admiralty University","Delta State University","Delta State University of Science and Technology","Dennis Osadebay University","Federal University of Petroleum Resources","Nigerian Maritime University","Novena University","Southern Delta University","University of Delta","Western Delta University"] },
  { state:"Ebonyi", names:["Alex Ekwueme Federal University","David Umahi Federal University of Health Sciences","Ebonyi State University","Evangel University"] },
  { state:"Edo", names:["Ambrose Alli University","Benson Idahosa University","Edo State University","Igbinedion University","Samuel Adegboyega University","University of Benin","Wellspring University"] },
  { state:"Ekiti", names:["Afe Babalola University","Bamidele Olumilua University of Education","Ekiti State University","Federal University Oye-Ekiti"] },
  { state:"Enugu", names:["Caritas University","Coal City University","Enugu State University of Science and Technology","Godfrey Okoye University","Renaissance University","University of Nigeria Nsukka"] },
  { state:"FCT Abuja", names:["African University of Science and Technology","Baze University","Cosmopolitan University","National Open University of Nigeria","Nile University of Nigeria","Philomath University","University of Abuja","Veritas University"] },
  { state:"Gombe", names:["Federal University Kashere","Gombe State University","Gombe State University of Science and Technology","Pen Resource University"] },
  { state:"Imo", names:["Alvan Ikoku Federal University of Education","Claretian University","Eastern Palm University","Federal University of Technology Owerri","Hezekiah University","Imo State University"] },
  { state:"Jigawa", names:["Federal University Dutse","Federal University of Technology Babura","Khadija University","Sule Lamido University"] },
  { state:"Kaduna", names:["Ahmadu Bello University","Federal University of Applied Sciences Kachia","Greenfield University","Kaduna State University","Nigerian Defence Academy"] },
  { state:"Kano", names:["Al-Istiqama University","Aliko Dangote University of Science and Technology","Bayero University Kano","Khalifa Isiyaku Rabiu University","Maryam Abacha American University of Nigeria","Sa'adatu Rimi University of Education","Skyline University","Yusuf Maitama Sule University"] },
  { state:"Katsina", names:["Al-Qalam University","Federal University Dutsin-Ma","Federal University of Transportation Daura","Umaru Musa Yar'adua University"] },
  { state:"Kebbi", names:["Federal University Birnin Kebbi","Kebbi State University of Science and Technology"] },
  { state:"Kogi", names:["Confluence University of Science and Technology","Federal University Lokoja","Prince Abubakar Audu University","Salem University"] },
  { state:"Kwara", names:["Ahman Pategi University","Al-Hikmah University","Kwara State University","Landmark University","Summit University","University of Ilorin"] },
  { state:"Lagos", names:["Anchor University","Augustine University","Caleb University","Eko University of Medicine and Health Sciences","Lagos State University","Lagos State University of Education","Lagos State University of Science and Technology","Pan-Atlantic University","University of Lagos"] },
  { state:"Nasarawa", names:["Bingham University","Federal University Lafia","Nasarawa State University"] },
  { state:"Niger", names:["Federal University of Technology Minna","Ibrahim Badamasi Babangida University","Newgate University"] },
  { state:"Ogun", names:["Babcock University","Bells University of Technology","Chrisland University","Christopher University","Covenant University","Crawford University","Crescent University","Federal University of Agriculture Abeokuta","Hallmark University","McPherson University","Moshood Abiola University of Science and Technology","Mountain Top University","Olabisi Onabanjo University","Southwestern University","Tai Solarin University of Education"] },
  { state:"Ondo", names:["Achievers University","Adekunle Ajasin University","Adeyemi Federal University of Education","Elizade University","Federal University of Technology Akure","Olusegun Agagu University of Science and Technology","Sam Maris University","University of Medical Sciences","Wesley University"] },
  { state:"Osun", names:["Adeleke University","Bowen University","Federal University of Agriculture and Development Studies","Federal University of Health Sciences Ila-Orangun","Fountain University","Joseph Ayo Babalola University","Kings University","Obafemi Awolowo University","Oduduwa University","Osun State University","Redeemer's University","Westland University"] },
  { state:"Oyo", names:["Ajayi Crowther University","Atiba University","Dominion University","Emmanuel Alayande University of Education","First Technical University","Kola Daisi University","Ladoke Akintola University of Technology","Lead City University","Precious Cornerstone University","University of Ibadan"] },
  { state:"Plateau", names:["Federal University of Education Pankshin","Plateau State University","University of Jos"] },
  { state:"Rivers", names:["Federal University of Environment and Technology Ogoni","Ignatius Ajuru University of Education","PAMO University of Medical Sciences","Rivers State University","University of Port Harcourt"] },
  { state:"Sokoto", names:["Shehu Shagari University of Education","Sokoto State University","Usmanu Danfodiyo University"] },
  { state:"Taraba", names:["Federal University Wukari","Kwararafa University","Taraba State University"] },
  { state:"Yobe", names:["Federal University Gashua","Yobe State University"] },
  { state:"Zamfara", names:["Federal University Gusau","Zamfara State University"] }
];

const formatMoney = (value:number) => "₦" + value.toLocaleString("en-NG");
const initials = (name:string) => name.split(" ").map(part=>part[0]).join("").slice(0,2).toUpperCase();

function Brand() {
  return <div className="brand-mark" aria-label="KitHomes"><span className="brand-icon"><Home size={19} strokeWidth={2.6}/><Check size={10} strokeWidth={4} /></span><span>Kit<span>Homes</span><small>by T3kit</small></span></div>;
}

function ListingCard({ item, saved, onSave, onOpen }: {item:Listing; saved:boolean; onSave:()=>void; onOpen:()=>void}) {
  return <article className="listing-card">
    <button className="listing-photo" style={{backgroundImage:`linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.22)),url("${item.image}")`}} onClick={onOpen} aria-label={`View ${item.title}`}>
      {item.verified ? <span className="photo-badge"><BadgeCheck size={14}/> Verified</span> : <span className="photo-badge pending">Not yet verified</span>}
      <span className="photo-kind">{item.category === "shared" ? "SHARED HOME" : item.type.toUpperCase()}</span>
    </button>
    <button className={`save-btn ${saved ? "is-saved" : ""}`} onClick={onSave} aria-label={saved ? "Remove saved home" : "Save home"}><Heart size={18} fill={saved ? "currentColor" : "none"}/></button>
    <button className="listing-content" onClick={onOpen}>
      <div className="price-line"><strong>{formatMoney(item.rent)}</strong><span>/ year</span></div>
      <h3>{item.title}</h3><p className="listing-location"><MapPin size={14}/>{item.area}</p>
      <div className="listing-foot"><span><MapPin size={13}/>{item.distance} km to campus</span><span>{item.category === "shared" ? <><Users size={14}/>{item.spaces} spaces left</> : <><ShieldCheck size={14}/>{item.verified ? "Owner checked" : "Check pending"}</>}</span></div>
    </button>
  </article>;
}

export default function HomePage() {
  const [tab,setTab] = useState("Explore");
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("All homes");
  const [campus,setCampus] = useState("All campuses");
  const [campusOpen,setCampusOpen] = useState(false);
  const [saved,setSaved] = useState<string[]>(["l2"]);
  const [selected,setSelected] = useState<Listing|null>(null);
  const [paymentPlan,setPaymentPlan] = useState(1);
  const [toast,setToast] = useState("");
  const [showFilters,setShowFilters] = useState(false);
  const [maxRent,setMaxRent] = useState("1500000");
  const [verifiedOnly,setVerifiedOnly] = useState(false);
  const [chat,setChat] = useState("");
  const [messages,setMessages] = useState<string[]>(["Hello! I’m interested in the property. Is it still available?"]);
  const [showPost,setShowPost] = useState(false);
  const [showNotifications,setShowNotifications] = useState(false);
  const [roommateGender,setRoommateGender] = useState("Same gender");
  const [roommateCampus,setRoommateCampus] = useState("University of Lagos");

  const notify = (message:string) => { setToast(message); window.setTimeout(()=>setToast(""),2600); };
  const filtered = useMemo(()=>listings.filter(item=>{
    const search = query.trim().toLowerCase();
    const matchesSearch = !search || [item.title,item.area,item.campus,item.type,item.owner].some(value=>value.toLowerCase().includes(search));
    const matchesCategory = category === "All homes" || (category === "Shared homes" ? item.category === "shared" : category === "Self-contain" ? item.category === "self" : category === "Flats" ? item.category === "flat" : item.category === "room");
    const matchesCampus = campus === "All campuses" || item.campus === campus;
    return matchesSearch && matchesCategory && matchesCampus && item.rent <= Number(maxRent || 0) && (!verifiedOnly || item.verified);
  }),[query,category,campus,maxRent,verifiedOnly]);
  const toggleSave = (id:string) => setSaved(old => old.includes(id) ? old.filter(item=>item!==id) : [...old,id]);
  const sendMessage = () => { if(!chat.trim()) return; setMessages(old=>[...old,chat.trim()]); setChat(""); notify("Message added to this demo chat"); };
  const nav = [
    {label:"Explore",icon:Compass},{label:"Roommates",icon:Users},{label:"Saved",icon:Bookmark},{label:"Inbox",icon:MessageCircle},{label:"Profile",icon:UserRound}
  ];
  const matchingPeople = people.filter(person=>person.campus===roommateCampus);
  const plans = [{months:1,label:"Pay in full",sub:"One payment",fee:0},{months:2,label:"2 payments",sub:"Every 6 months",fee:.03},{months:4,label:"4 payments",sub:"Every 3 months",fee:.05},{months:12,label:"12 payments",sub:"Every month",fee:.08}];

  return <div className="app-shell">
    <header className="topbar"><Brand/><div className="top-actions"><button className="icon-button notification-button" onClick={()=>setShowNotifications(!showNotifications)} aria-label="Notifications"><Bell size={19}/><i/></button><button className="profile-mini" onClick={()=>setTab("Profile")} aria-label="Open profile">N</button></div>
      {showNotifications && <div className="notification-pop"><div className="pop-heading">Notifications <span className="new-dot">2 new</span></div><div className="notice-item"><span className="notice-icon"><ShieldCheck size={17}/></span><div><b>Verification matters</b><p>Look for the verified badge before arranging a viewing.</p><small>Just now</small></div></div><div className="notice-item"><span className="notice-icon yellow"><Sparkles size={17}/></span><div><b>Welcome to KitHomes</b><p>Your next home starts with a safer search.</p><small>Today</small></div></div></div>}
    </header>
    <main className="main-content">
      {tab==="Explore" && <>
        <section className="welcome-row"><div><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h1>Find a place that<br/><em>feels like home.</em></h1><p className="welcome-copy">Verified homes. Clear prices. Less stress.</p></div><div className="welcome-illustration"><div className="sun"/><div className="mini-house"><span/><i/></div><div className="plant">✳</div></div></section>
        <div className="search-row"><label className="search-box"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Area, university, or property type"/></label><button className={`filter-button ${showFilters?"active":""}`} onClick={()=>setShowFilters(!showFilters)} aria-label="Filters"><SlidersHorizontal size={19}/><span>Filters</span></button></div>
        <button className="campus-select" onClick={()=>setCampusOpen(!campusOpen)}><span className="campus-symbol"><Compass size={18}/></span><span className="campus-text"><small>LOOKING NEAR</small><b>{campus}</b></span><ChevronDown size={18}/></button>
        {campusOpen && <div className="campus-panel"><div className="campus-panel-head"><b>Choose a university</b><button onClick={()=>setCampusOpen(false)} aria-label="Close university picker"><X size={18}/></button></div><button className={campus==="All campuses"?"campus-option selected": "campus-option"} onClick={()=>{setCampus("All campuses");setCampusOpen(false)}}>All campuses <span>All locations</span></button>{universities.map(group=><div key={group.state}><p className="state-label">{group.state} State</p>{group.names.map(name=><button key={name} className={campus===name?"campus-option selected":"campus-option"} onClick={()=>{setCampus(name);setCampusOpen(false)}}>{name}<ChevronRight size={15}/></button>)}</div>)}</div>}
        {showFilters && <section className="filter-panel"><div className="filter-title"><b>Refine your search</b><button onClick={()=>{setCategory("All homes");setCampus("All campuses");setMaxRent("1500000");setVerifiedOnly(false)}}>Reset</button></div><label>Maximum yearly rent <strong>{formatMoney(Number(maxRent))}</strong></label><input className="range-input" type="range" min="90000" max="1500000" step="10000" value={maxRent} onChange={e=>setMaxRent(e.target.value)}/><label className="toggle-line"><span><ShieldCheck size={17}/> Verified listings only</span><input type="checkbox" checked={verifiedOnly} onChange={e=>setVerifiedOnly(e.target.checked)}/></label></section>}
        <div className="section-heading"><div><p className="eyebrow">MADE FOR YOUR BUDGET</p><h2>Explore homes</h2></div><button className="sort-button" onClick={()=>{setCategory("All homes");setQuery("");setCampus("All campuses");notify("Showing all homes")}}><ArrowDownUp size={15}/> Clear</button></div>
        <div className="category-row">{["All homes","Shared homes","Self-contain","Flats","Rooms"].map(item=><button key={item} className={category===item?"category-chip active":"category-chip"} onClick={()=>setCategory(item)}>{item}</button>)}</div>
        <div className="results-line"><span>{filtered.length} homes to explore</span><span className="trusted-note"><ShieldCheck size={14}/> Trust comes first</span></div>
        {filtered.length ? <div className="listing-grid">{filtered.map(item=><ListingCard key={item.id} item={item} saved={saved.includes(item.id)} onSave={()=>toggleSave(item.id)} onOpen={()=>{setSelected(item);setPaymentPlan(1)}}/>)}</div> : <div className="empty-state"><span className="empty-icon"><Search size={24}/></span><h3>No homes match yet</h3><p>Try a different campus, location, or budget.</p><button className="primary-button" onClick={()=>{setQuery("");setCampus("All campuses");setCategory("All homes");setMaxRent("1500000");setVerifiedOnly(false)}}>Clear filters</button></div>}
        <section className="trust-banner"><div className="trust-icon"><ShieldCheck size={25}/></div><div><p className="eyebrow">RENT WITH MORE CONFIDENCE</p><h3>Don't just trust a listing.<br/>Check the badge.</h3><p>We want every renter to know what has—and hasn't—been verified.</p></div><ArrowRight size={20}/></section>
      </>}

      {tab==="Roommates" && <section className="page-section"><p className="eyebrow">SHARE THE SPACE, NOT THE STRESS</p><h1>Find your kind<br/><em>of roommate.</em></h1><p className="section-intro">Good housemates make a big difference. Match on budget, habits, and campus before you share a home.</p><div className="roommate-controls"><label>University<select value={roommateCampus} onChange={e=>setRoommateCampus(e.target.value)}>{universities.flatMap(g=>g.names).filter((n,i,a)=>a.indexOf(n)===i).map(name=><option key={name}>{name}</option>)}</select></label><label>Match preference<select value={roommateGender} onChange={e=>setRoommateGender(e.target.value)}><option>Same gender</option><option>Any gender</option></select></label></div><div className="match-tip"><Sparkles size={18}/><p><b>Compatibility matters.</b> Profiles show lifestyle preferences so you can decide what feels right. All profiles here are sample demo data.</p></div><div className="people-list">{matchingPeople.map(person=><article className="person-card" key={person.id}><img src={person.image} alt="" /><div className="person-main"><div className="person-name">{person.name}<span className="verified-tiny"><BadgeCheck size={13}/> Verified</span></div><p>{person.course}</p><p className="person-campus"><MapPin size={13}/>{person.campus}</p><div className="trait-row">{person.traits.map(trait=><span key={trait}>{trait}</span>)}</div><p className="person-bio">{person.bio}</p><div className="person-card-foot"><b>{person.budget} <small>/ person / year</small></b><button className="outline-button" onClick={()=>notify(`Demo connection request sent to ${person.name}`)}>Say hello <ArrowRight size={15}/></button></div></div></article>)}</div><p className="fine-print"><LockKeyhole size={13}/> Connect thoughtfully. Never send deposits outside a verified, protected process.</p></section>}

      {tab==="Saved" && <section className="page-section"><p className="eyebrow">YOUR SHORTLIST</p><h1>Homes you<br/><em>had in mind.</em></h1><p className="section-intro">Keep your favourites in one place while you compare your options.</p>{saved.length ? <div className="listing-grid">{listings.filter(item=>saved.includes(item.id)).map(item=><ListingCard key={item.id} item={item} saved onSave={()=>toggleSave(item.id)} onOpen={()=>setSelected(item)}/>)}</div> : <div className="empty-state"><span className="empty-icon"><Heart size={24}/></span><h3>No saved homes yet</h3><p>Tap the heart on a listing to keep it here.</p><button className="primary-button" onClick={()=>setTab("Explore")}>Explore homes</button></div>}</section>}

      {tab==="Inbox" && <section className="page-section"><p className="eyebrow">KEEP IT DIRECT</p><h1>Your conversations.</h1><p className="section-intro">Chat with landlords and potential roommates in one place.</p><div className="conversation-card" onClick={()=>setSelected(listings[0])}><div className="avatar-circle">MA</div><div className="conversation-info"><b>Mrs. Adebayo</b><p>Bed space in a 3-bedroom flat</p><small>Demo conversation · Tap to open listing</small></div><ChevronRight size={18}/></div><div className="safety-callout"><ShieldCheck size={20}/><p><b>Keep your money safe.</b><br/>Be cautious of requests to pay outside a trusted payment process.</p></div></section>}

      {tab==="Profile" && <section className="page-section"><p className="eyebrow">YOUR KIT HOMES ACCOUNT</p><h1>Make yourself<br/><em>at home.</em></h1><div className="profile-card"><div className="profile-avatar">N</div><div><h2>Nart's demo profile</h2><p>Renter · Nigeria</p><span className="badge-outline"><CheckCircle2 size={14}/> Profile preview</span></div><button className="outline-button" onClick={()=>notify("Profile editing will be connected in the account phase.")}>Edit</button></div><div className="profile-menu">{[{icon:UserRound,title:"Personal details",sub:"Your name and contact information"},{icon:ShieldCheck,title:"Verification",sub:"Understand landlord and property checks"},{icon:Wallet,title:"Payments",sub:"Payment plans and receipts"},{icon:CircleHelp,title:"Help and safety",sub:"Get help with renting safely"}].map(row=><button key={row.title} onClick={()=>notify(`${row.title} will be available when accounts are connected.`)}><span className="menu-icon"><row.icon size={19}/></span><span><b>{row.title}</b><small>{row.sub}</small></span><ChevronRight size={17}/></button>)}</div><div className="profile-foot"><Brand/><span>A T3kit product · Demo experience</span></div></section>}
    </main>
    <nav className="bottom-nav" aria-label="Main navigation">{nav.map(item=><button key={item.label} className={tab===item.label?"nav-item current":"nav-item"} onClick={()=>setTab(item.label)} aria-current={tab===item.label?"page":undefined}><item.icon size={21} strokeWidth={tab===item.label?2.5:1.8}/><span>{item.label}</span></button>)}<button className="nav-add" onClick={()=>setShowPost(true)} aria-label="Post a property"><Plus size={24}/></button></nav>
    <div className={toast?"toast visible":"toast"} role="status">{toast}</div>

    {selected && <div className="modal-backdrop" onClick={()=>setSelected(null)}><section className="detail-modal" onClick={e=>e.stopPropagation()}><div className="detail-photo" style={{backgroundImage:`linear-gradient(180deg,rgba(0,0,0,.03),rgba(0,0,0,.35)),url("${selected.image}")`}}><button className="detail-back" onClick={()=>setSelected(null)} aria-label="Close details"><ArrowLeft size={19}/></button><button className={saved.includes(selected.id)?"detail-heart is-saved":"detail-heart"} onClick={()=>toggleSave(selected.id)} aria-label="Save listing"><Heart size={19} fill={saved.includes(selected.id)?"currentColor":"none"}/></button><span className="photo-kind">{selected.category==="shared"?"SHARED HOME":selected.type.toUpperCase()}</span></div><div className="detail-body"><div className="detail-kicker">{selected.verified?<span className="verified-pill"><BadgeCheck size={15}/> Landlord & property marked verified</span>:<span className="pending-pill">Verification not complete</span>}<span><MapPin size={14}/>{selected.distance} km to campus</span></div><h2>{selected.title}</h2><p className="detail-location"><MapPin size={16}/>{selected.area}</p><div className="detail-price">{formatMoney(selected.rent)} <small>/ year</small></div><div className="owner-line"><div className="avatar-circle">{initials(selected.owner)}</div><div><b>{selected.owner}</b><p>Property owner · {selected.verified?"Verified listing":"Verification pending"}</p></div><button className="outline-button" onClick={()=>notify("Demo chat started. Messaging will be connected to an account in the backend phase.")}><MessageCircle size={15}/> Chat</button></div><h3>What this home offers</h3><div className="feature-grid">{selected.features.map(feature=><span key={feature}><CheckCircle2 size={15}/>{feature}</span>)}</div>{selected.category==="shared" && <div className="shared-info"><div><Users size={17}/><span><b>{selected.spaces} spaces available</b><small>{selected.occupants}</small></span></div><div><BedDouble size={17}/><span><b>{selected.gender}</b><small>House rules apply</small></span></div></div>}<h3>Choose a payment plan</h3><p className="muted-copy">Illustrative options only. Real payments are not enabled in this prototype.</p><div className="payment-options">{plans.map((plan,index)=>{const total=Math.round(selected.rent*(1+plan.fee));return <button key={plan.months} className={paymentPlan===index?"payment-option selected":"payment-option"} onClick={()=>setPaymentPlan(index)}><span className="radio-dot">{paymentPlan===index&&<i/>}</span><span className="plan-label"><b>{plan.label}</b><small>{plan.sub}{plan.fee>0?` · ${Math.round(plan.fee*100)}% service fee`:""}</small></span><strong>{formatMoney(Math.ceil(total/plan.months))}<small>{plan.months>1?"/ payment":""}</small></strong></button>})}</div><div className="payment-total"><span>Total under selected plan</span><b>{formatMoney(Math.round(selected.rent*(1+plans[paymentPlan].fee)))}</b></div><p className="disclaimer"><ShieldCheck size={15}/> Never pay a landlord before you have verified the property and agreed on the terms.</p><button className="primary-button full-width" onClick={()=>notify("Viewing request saved in this demo. No payment has been made.")}>Request a viewing <ArrowRight size={17}/></button></div></section></div>}

    {showPost && <div className="modal-backdrop" onClick={()=>setShowPost(false)}><section className="post-modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">FOR LANDLORDS</p><h2>List your property</h2></div><button className="icon-button" onClick={()=>setShowPost(false)} aria-label="Close"><X size={20}/></button></div><p className="section-intro">Reach renters who are looking for their next home. Basic listings are free in the KitHomes plan.</p><form onSubmit={e=>{e.preventDefault();setShowPost(false);notify("Draft saved locally for this demo. Listing submission is not connected yet.")}}><label>Property title<input required placeholder="e.g. Self-contain in Yaba"/></label><label>Location<input required placeholder="Area, city, state"/></label><label>Property type<select><option>Self-contain</option><option>Single room</option><option>Mini flat</option><option>2-bedroom flat</option><option>Shared bed space</option></select></label><label>Annual rent (₦)<input required type="number" min="1" placeholder="450000"/></label><label>Contact name<input required placeholder="Your name"/></label><div className="upload-placeholder"><HousePlus size={22}/><b>Property photos</b><span>Photo uploads will be connected with storage.</span></div><button className="primary-button full-width" type="submit">Save draft <ArrowRight size={17}/></button><p className="fine-print"><ShieldCheck size={13}/> Properties should be verified before they are promoted as verified.</p></form></section></div>}
  </div>;
}
