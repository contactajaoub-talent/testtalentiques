import {NextResponse} from 'next/server';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET(){
 const endpoint=process.env.CRM_WEBHOOK_URL,secret=process.env.CRM_API_SECRET;
 if(!endpoint||!secret||!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(endpoint))return NextResponse.json({ok:false,resources:[]},{status:503});
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),15000);
 try{const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret,action:'catalog'}),cache:'no-store',signal:controller.signal});if(!response.ok)throw Error('catalog');const data=await response.json();if(!data.ok||!Array.isArray(data.resources))throw Error('catalog');return NextResponse.json({ok:true,resources:data.resources},{headers:{'Cache-Control':'no-store'}});}catch{return NextResponse.json({ok:false,resources:[]},{status:503});}finally{clearTimeout(timer);}
}
