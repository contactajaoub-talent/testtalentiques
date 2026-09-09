'use client';
import React, { useRef, useState } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { crmFields } from '@/lib/crm-fields';
import { submitTalentiquesForm, type TalentiquesFormType, type TalentiquesResult } from '@/lib/talentiques-crm';

type Props = { source?: string; type: TalentiquesFormType; offerId?: 'OPT-PRO'|'OPT-ETU'; resourceId?: string; title: string; onClose?: () => void; onSuccess?: (result: TalentiquesResult) => void; };
type Field = {id:string;key:string;label:string;type:string;required:boolean;options:readonly string[]};
const inputStyle='w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/10';
export function CRMForm({type,offerId,resourceId,title,onClose,onSuccess,source}:Props) {
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[result,setResult]=useState<TalentiquesResult|null>(null);
 const eventId=useRef<string|null>(null);
 const fields:readonly Field[] = type==='service'?crmFields.SERVICE:type==='accompagnement'?crmFields.ACCOMPAGNEMENT:crmFields.COURT;
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();if(busy)return;setBusy(true);setError('');
  try{if(!eventId.current)eventId.current=crypto.randomUUID();const r=await submitTalentiquesForm(e.currentTarget,{type,offerId,resourceId,eventId:eventId.current,source:source||'Site Talentiques'});setResult(r);onSuccess?.(r);}
  catch(e){setError(e instanceof Error?e.message:'Une erreur est survenue.');}finally{setBusy(false);}
 }
 function field(f:Field){if(f.type==='checkbox')return null;
  const props={id:f.id,name:f.key,required:f.required,className:inputStyle};
  return <div key={f.id} className={f.type==='textarea'?'sm:col-span-2':''}><label htmlFor={f.id} className="mb-2 block text-sm font-semibold text-slate-700">{f.label}{f.required&&<span className="text-brand-600"> *</span>}</label>
   {f.type==='select'?<select {...props} defaultValue=""><option value="" disabled>Sélectionnez une option</option>{f.options.map(o=><option key={o} value={o}>{o}</option>)}</select>:
    f.type==='textarea'?<textarea {...props} rows={3} maxLength={5000}/>:
    f.type==='file'?<input {...props} type="file" name="cv" accept=".pdf,.doc,.docx"/>:
    <input {...props} type={f.type==='tel'?'tel':f.type==='email'?'email':f.type==='url'?'url':'text'} maxLength={f.type==='email'?254:5000} autoComplete={f.type==='email'?'email':f.key==='full_name'?'name':f.key==='phone'?'tel':undefined}/>}
  </div>;
 }
 return <div className="rounded-3xl bg-white p-6 md:p-9 shadow-xl border border-slate-100">
  <div className="flex justify-between items-start gap-4 mb-6"><div><p className="text-xs font-bold tracking-widest uppercase text-brand-600 mb-2">TalentiQues</p><h2 className="text-2xl font-bold text-slate-900 font-heading">{title}</h2><p className="text-sm text-slate-500 mt-2">Vos informations sont traitées pour répondre à votre demande.</p></div>{onClose&&<button type="button" onClick={onClose} aria-label="Fermer" className="p-2 rounded-full hover:bg-slate-100"><X size={22}/></button>}</div>
  {result?<div role="status" className="rounded-2xl bg-brand-50 p-6 text-slate-800"><CheckCircle2 className="text-brand-600 mb-3" size={32}/><h3 className="text-xl font-bold">Demande enregistrée</h3><p className="mt-2 text-sm">Référence : {result.request_id}</p><p className="mt-3 text-sm">Nous reviendrons vers vous pour la suite. Aucun paiement n’est considéré comme confirmé à ce stade.</p>{result.payment_url&&<a href={result.payment_url} target="_blank" rel="noopener noreferrer" className="inline-flex mt-5 rounded-xl bg-brand-600 px-6 py-3 font-bold text-white">Continuer vers PayPal <ArrowRight className="ml-2" size={18}/></a>}{result.resource_url&&<a href={result.resource_url} target="_blank" rel="noopener noreferrer" className="inline-flex mt-5 rounded-xl bg-brand-600 px-6 py-3 font-bold text-white">Accéder à la ressource</a>}</div>:
  <form onSubmit={submit} className="space-y-6">
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{fields.filter(f=>f.type!=='radio'&&f.type!=='checkbox').map(field)}
   {type==='accompagnement'&&<fieldset className="sm:col-span-2"><legend className="mb-3 text-sm font-semibold text-slate-700">Budget d’investissement *</legend><div className="space-y-2">{crmFields.ACCOMPAGNEMENT.find(f=>f.key==='budget')?.options.map((o,i)=><label key={o} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm"><input type="radio" name="budget" value={o} required/>{o}</label>)}</div></fieldset>}
   </div>
   {type==='service'&&<p className="text-xs text-slate-500">Le CV est facultatif. Formats PDF, DOC ou DOCX, 5 Mo maximum. Vos documents seront conservés dans un espace privé, non dans un dossier public.</p>}
   <div className="border-t border-slate-100 pt-5"><label className="flex items-start gap-3 text-sm text-slate-600"><input type="checkbox" name="marketing_consent" value="true" className="mt-1"/>J’accepte de recevoir par email des conseils et offres Talentiques. Facultatif, désinscription possible à tout moment.</label><p className="mt-3 text-xs text-slate-500">Les données nécessaires sont utilisées pour traiter votre demande. Consultez notre <a href="/politique-de-confidentialite" target="_blank" className="underline text-brand-700">politique de confidentialité</a>.</p></div>
   <input type="text" name="_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true"/>
   {error&&<p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error} Si le problème persiste, contactez-nous par email.</p>}
   <button disabled={busy} type="submit" className="w-full rounded-xl bg-brand-600 px-6 py-4 font-bold text-white hover:bg-brand-700 disabled:opacity-60">{busy?'Enregistrement…':type==='service'?'Enregistrer et continuer vers le paiement':type==='accompagnement'?'Envoyer ma demande':type==='diagnostic'?'Enregistrer ma demande':type==='contact'?'Envoyer mon message':'Recevoir ma ressource'} <ArrowRight className="inline ml-2" size={18}/></button>
   <p className="text-xs text-slate-500 text-center">Une confirmation s’affichera uniquement après l’enregistrement de votre demande.</p>
  </form>}
 </div>;
}
