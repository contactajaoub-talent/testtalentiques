'use client';
import {CRMModal} from './CRMModal';
export function WebToLeadForm({isOpen,onClose}:{isOpen:boolean;onClose:()=>void}){
 return <CRMModal config={isOpen?{type:'diagnostic',title:'Diagnostic gratuit de votre candidature'}:null} onClose={onClose}/>;
}
