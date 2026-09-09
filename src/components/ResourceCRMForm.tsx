'use client';
import {CRMForm} from './CRMForm';
export function ResourceCRMForm({resourceId,paid=false,title}:{resourceId:string;paid?:boolean;title:string}){
 return <CRMForm type={paid?'ressource_payante':'ressource_gratuite'} resourceId={resourceId} title={title}/>;
}
