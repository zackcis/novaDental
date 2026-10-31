import React,{useEffect,useState} from 'react';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import { AnimatePresence,motion } from 'framer-motion';
import {Wrap} from './Primitives.jsx';
const links=[['Services','#services'],['Our approach','#approach'],['The team','#team'],['FAQ','#faq']];
export default function Header(){
 const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false);
 useEffect(()=>{const fn=()=>setScrolled(window.scrollY>25); window.addEventListener('scroll',fn,{passive:true});fn();return()=>window.removeEventListener('scroll',fn)},[]);
 useEffect(()=>{document.body.classList.toggle('menu-open',open);return()=>document.body.classList.remove('menu-open')},[open]);
 return <><div className="topline"><Wrap className="flex justify-center gap-2 items-center text-center"><Sparkles size={12}/><span>Thoughtfully made, beautifully imagined.</span><span className="topline-sep">/</span><span>Innovatechs portfolio concept</span></Wrap></div>
 <header className={`site-header ${scrolled?'is-scrolled':''}`}><Wrap className="nav-main"><a href="#home" className="logo" onClick={()=>setOpen(false)} aria-label="NOVA Dental home"><span className="logo-sign" aria-hidden="true"><span>✳</span></span><span>NOVA<span className="logo-sup">DENTAL</span></span></a><nav aria-label="Main navigation" className="desktop-links">{links.map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav><div className="nav-actions"><a href="#reception" className="reception-link">Demo desk <ArrowUpRight size={13}/></a><a className="nav-cta" href="#appointment">Request a visit <ArrowUpRight size={16}/></a><button type="button" className="menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(x=>!x)}>{open?<X/>:<Menu/>}</button></div></Wrap></header>
 <AnimatePresence>{open&&<motion.div className="mobile-panel" initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}><nav aria-label="Mobile navigation">{links.map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}<ArrowUpRight size={18}/></a>)}<a href="#appointment" onClick={()=>setOpen(false)}>Request a visit<ArrowUpRight size={18}/></a><a href="#reception" onClick={()=>setOpen(false)}>Demo receptionist desk<ArrowUpRight size={18}/></a></nav></motion.div>}</AnimatePresence></>;
}
