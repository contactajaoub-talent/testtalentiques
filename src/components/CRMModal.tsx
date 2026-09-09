'use client';
import React, {useEffect} from 'react';
import {CRMForm} from './CRMForm';
import type {TalentiquesFormType, TalentiquesResult} from '@/lib/talentiques-crm';
export type CRMModalState={type:TalentiquesFormType;title:string;offerId?:'OPT-PRO'|'OPT-ETU';resourceId?:string};
export function CRMModal({config,onClose,onSuccess}:{config:CRMModalState|null;onClose:()=>void;onSuccess?:(r:TalentiquesResult)=>void}){
 useEffect(()=>{if(!config)return;function key(e:KeyboardEvent){if(e.key==='Escape')onClose();}document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key);},[config,onClose]);
 if(!config)return null;
 return <div className="fixed inset-0 z-[2000] overflow-y-auto bg-slate-950/60 backdrop-blur-sm p-4 md:p-8" role="dialog" aria-modal="true" aria-label={config.title}><div className="max-w-3xl mx-auto my-4"><CRMForm key={config.type+'-'+(config.offerId||config.resourceId||'')} {...config} onClose={onClose} onSuccess={onSuccess}/></div></div>;
}
