import { randomUUID } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const OFFERS = ['OPT-PRO','OPT-ETU'];
const MAX_FILE = 5 * 1024 * 1024;
const MAX_REQUEST = 8 * 1024 * 1024;
const ALIASES: Record<string, string> = {
  'sf-nom':'full_name','sf-email':'email','sf-phone':'phone','sf-country':'country',
  'sf-statut':'professional_status','sf-objectif':'objective','sf-difficulte':'difficulty',
  'sf-linkedin':'linkedin','sf-infos':'notes',
  'accomp-nom':'full_name','accomp-email':'email','accomp-phone':'phone',
  'accomp-linkedin':'linkedin','accomp-statut':'professional_status',
  'accomp-experience':'experience','accomp-secteur':'sector','accomp-marche':'target_market',
  'accomp-poste':'target_role','accomp-objectif':'objective','accomp-duree':'duration',
  'accomp-blocage':'blockage','accomp-infos':'notes',
  'diag-nom':'full_name','diag-email':'email','diag-phone':'phone','diag-country':'country',
  'diag-statut':'professional_status','diag-objectif':'objective','diag-difficulte':'difficulty',
  'diag-linkedin':'linkedin','diag-infos':'notes',
  nom_complet:'full_name',telephone:'phone',pays_residence:'country',country_code:'country',
  last_name:'full_name',statut_professionnel:'professional_status',experience:'experience',
  secteur:'sector',poste_cible:'target_role',marche_cible:'target_market',objectif:'objective',
  difficulte:'difficulty',duree_souhaitee:'duration',frein_principal:'blockage',
  informations_complementaires:'notes',consent_marketing:'marketing_consent',
  type_demande:'request_type',offre_id:'offer_id',ressource_id:'resource_id',
};
const KEYS = new Set([
  'event_id','request_type','offer_id','resource_id','full_name','email','phone','country',
  'professional_status','experience','sector','target_role','target_market','linkedin','objective',
  'difficulty','budget','duration','blockage','notes','source','page_url','utm_source','utm_medium',
  'utm_campaign','marketing_consent','consent_version',
]);
function error(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}
function allowedOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  const allowed = (process.env.TALENTIQUES_SITE_ORIGINS || new URL(request.url).origin)
    .split(',').map(s => s.trim()).filter(Boolean);
  return !!origin && allowed.includes(origin);
}
function fileType(name: string, bytes: Buffer) {
  const ext = name.toLowerCase().split('.').pop();
  if (ext === 'pdf' && bytes.subarray(0,5).toString('ascii') === '%PDF-') return 'application/pdf';
  if (ext === 'docx' && bytes.subarray(0,4).equals(Buffer.from([0x50,0x4b,0x03,0x04])))
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  if (ext === 'doc' && bytes.subarray(0,8).equals(Buffer.from([0xd0,0xcf,0x11,0xe0,0xa1,0xb1,0x1a,0xe1])))
    return 'application/msword';
  return null;
}
export async function POST(request: NextRequest) {
  if (!allowedOrigin(request)) return error('Origine non autorisée.', 403);
  const length = Number(request.headers.get('content-length') || 0);
  if (length > MAX_REQUEST) return error('Fichier ou formulaire trop volumineux.', 413);
  const endpoint = process.env.CRM_WEBHOOK_URL;
  const secret = process.env.CRM_API_SECRET;
  if (!endpoint || !secret || !/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(endpoint))
    return error('Service temporairement indisponible.', 503);
  try {
    const form = await request.formData();
    const total = Array.from(form.values()).reduce((n,v) => n + (typeof v === 'string' ? Buffer.byteLength(v) : v.size),0);
    if(total > MAX_REQUEST) return error('Formulaire trop volumineux.',413);
    if (String(form.get('_website') || '').trim()) return NextResponse.json({ok:true});
    const payload: Record<string, unknown> = {};
    for (const [key, value] of form.entries()) {
      if (typeof value !== 'string') continue;
      const field = ALIASES[key] || key;
      if (KEYS.has(field)) payload[field] = value.slice(0, 5000);
    }
    payload.event_id = String(payload.event_id || randomUUID()).slice(0,150);
    if (payload.request_type === 'service' && !OFFERS.includes(String(payload.offer_id))) return error('Offre inconnue.',400);
    if (payload.request_type === 'accompagnement') payload.offer_id = 'ACCOMP';
    payload.source = payload.request_type === 'contact' ? 'Contact Talentiques' : 'Site Talentiques';
    if (!String(payload.full_name||'').trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(payload.email||'')) || !String(payload.country||'').trim()) return error('Nom, email et pays obligatoires.',400);
    if (payload.request_type === 'service' && (!payload.professional_status || !payload.objective)) return error('Situation et objectif obligatoires.',400);
    if (payload.request_type === 'accompagnement' && ['phone','professional_status','sector','target_market','target_role','objective','budget'].some(k => !String(payload[k]||'').trim())) return error('Veuillez compléter les champs obligatoires.',400);
    const uploaded = form.get('cv');
    let file: {name:string;mime:string;base64:string}|undefined;
    if (uploaded instanceof File && uploaded.size) {
      if (payload.request_type !== 'service') return error('Téléversement non autorisé.',400);
      if (uploaded.size > MAX_FILE) return error('CV trop volumineux (5 Mo maximum).',413);
      const bytes = Buffer.from(await uploaded.arrayBuffer());
      const mime = fileType(uploaded.name, bytes);
      if (!mime) return error('Veuillez fournir un CV PDF, DOC ou DOCX valide.',400);
      file = { name: uploaded.name.replace(/[\\/\x00-\x1f]/g,'_').slice(0,150), mime, base64: bytes.toString('base64') };
    }
    if (!['service','accompagnement','diagnostic','ressource_gratuite','ressource_payante','contact'].includes(String(payload.request_type)))
      return error('Type de demande invalide.',400);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(),25000);
    let response: Response;
    try {
      response = await fetch(endpoint, {method:'POST',redirect:'follow',cache:'no-store',
        headers:{'Content-Type':'application/json'},body:JSON.stringify({secret,action:'submission',payload,file}),signal:controller.signal});
    } finally {clearTimeout(timer);}
    if (!response.ok) return error('La demande n’a pas pu être enregistrée. Réessayez.',502);
    const result: unknown = await response.json();
    if (!result || typeof result !== 'object' || !('ok' in result) || result.ok !== true) {
      const message = result && typeof result === 'object' && 'error' in result ? String(result.error) : '';
      return error(/^(Offre non disponible|Ressource non disponible|Champ obligatoire|Nom, email et pays obligatoires|Trop de demandes récentes|Lien LinkedIn invalide|CV trop volumineux|Format CV)/.test(message)?message:'La demande n’a pas pu être enregistrée. Vérifiez les informations et réessayez.',502);
    }
    const r = result as Record<string,unknown>;
    const paymentUrl = String(r.payment_url || (r.duplicate && payload.request_type === 'service' ? (payload.offer_id === 'OPT-PRO' ? 'https://www.paypal.com/ncp/payment/X28ZHEKETU8FA' : payload.offer_id === 'OPT-ETU' ? 'https://www.paypal.com/ncp/payment/268NRKMDVVJB2' : '') : ''));
    let safePayment = '';
    try {const u = new URL(paymentUrl);if(u.protocol==='https:' && ['paypal.com','www.paypal.com'].includes(u.hostname))safePayment=u.href;}catch{}
    let safeResource = '';try {const u=new URL(String(r.resource_url||''));if(u.protocol==='https:')safeResource=u.href;}catch{}
    return NextResponse.json({ok:true,duplicate:!!r.duplicate,contact_id:r.contact_id,request_id:r.request_id,order_id:r.order_id,payment_url:safePayment,resource_url:safeResource,message:r.message},{headers:{'Cache-Control':'no-store'}});
  } catch {
    return error('Impossible de traiter la demande. Réessayez ou contactez Talentiques.',502);
  }
}
