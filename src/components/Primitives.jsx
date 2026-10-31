import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const reveal = {initial:{opacity:0,y:24},whileInView:{opacity:1,y:0},viewport:{once:true,amount:.14},transition:{duration:.65,ease:[.22,1,.36,1]}};
export function Wrap({children,className=''}) {return <div className={`site-wrap ${className}`}>{children}</div>;}
export function Eyebrow({children,light=false}) {return <div className={`eyebrow ${light?'eyebrow-light':''}`}><span className="eyebrow-dot"/>{children}</div>;}
export function Heading({eyebrow,title,copy,light=false,center=false}) {return <motion.div {...reveal} className={`section-heading ${center?'text-center mx-auto':''} ${light?'text-white':''}`}><Eyebrow light={light}>{eyebrow}</Eyebrow><h2 className="display-title">{title}</h2>{copy&&<p className="section-copy">{copy}</p>}</motion.div>;}
export function LinkButton({href,children,variant='solid',icon=true,onClick,className=''}) {return <a className={`btn btn-${variant} ${className}`} href={href} onClick={onClick}>{children}{icon&&<ArrowUpRight size={17} strokeWidth={1.8}/>}</a>;}
export function ActionButton({children,onClick,variant='solid',type='button',disabled=false,className='',icon=true}) {return <button className={`btn btn-${variant} ${className}`} type={type} disabled={disabled} onClick={onClick}>{children}{icon&&<ArrowRight size={17} strokeWidth={1.8}/>}</button>;}
export function Photo({src,alt,className='',loading='lazy',position='center'}) {
  const [error,setError]=useState(false);
  return error?<div role="img" aria-label={`${alt} (photograph unavailable)`} className={`image-fallback ${className}`}><span className="fallback-symbol">✳</span><span>Care, reimagined.</span></div>:<img src={src} loading={loading} decoding="async" alt={alt} className={className} style={{objectPosition:position}} onError={()=>setError(true)}/>;
}
