/** Adaptateur des formulaires existants. Aucune clé secrète côté navigateur. */
export type TalentiquesFormType = 'service'|'accompagnement'|'diagnostic'|'ressource_gratuite'|'ressource_payante'|'contact';
export interface TalentiquesSubmission {
  type: TalentiquesFormType;
  offerId?: 'OPT-PRO'|'OPT-ETU';
  resourceId?: string;
  source?: string;
  eventId?: string;
}
export interface TalentiquesResult {
  ok: boolean; duplicate?: boolean; contact_id?: string; request_id?: string;
  order_id?: string; payment_url?: string; resource_url?: string; message?: string; error?: string;
}
const ids: Record<string,string> = {
  'sf-nom':'full_name','sf-email':'email','sf-phone':'phone','sf-country':'country',
  'sf-statut':'professional_status','sf-objectif':'objective','sf-difficulte':'difficulty',
  'sf-linkedin':'linkedin','sf-infos':'notes',
  'accomp-nom':'full_name','accomp-email':'email','accomp-phone':'phone',
  'accomp-linkedin':'linkedin','accomp-statut':'professional_status','accomp-experience':'experience',
  'accomp-secteur':'sector','accomp-marche':'target_market','accomp-poste':'target_role',
  'accomp-objectif':'objective','accomp-duree':'duration','accomp-blocage':'blockage','accomp-infos':'notes',
  'diag-nom':'full_name','diag-email':'email','diag-phone':'phone','diag-country':'country',
  'diag-statut':'professional_status','diag-objectif':'objective','diag-difficulte':'difficulty',
  'diag-linkedin':'linkedin','diag-infos':'notes',
  nom_complet:'full_name',pays_residence:'country',telephone:'phone',
  statut_professionnel:'professional_status',marche_cible:'target_market',objectif:'objective',
  consent_marketing:'marketing_consent',
};
const allowed = new Set(['full_name','email','phone','country','professional_status','experience','sector',
  'target_role','target_market','linkedin','objective','difficulty','budget','duration','blockage','notes',
  'marketing_consent']);
export async function submitTalentiquesForm(form: HTMLFormElement, options: TalentiquesSubmission): Promise<TalentiquesResult> {
  const data = new FormData();
  for(const element of Array.from(form.elements)) {
    if(!(element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement))continue;
    const key=ids[element.id] || ids[element.name] || element.name;
    if(!allowed.has(key))continue;
    if(element instanceof HTMLInputElement && (element.type==='checkbox'||element.type==='radio')&&!element.checked)continue;
    if(element instanceof HTMLInputElement && element.type==='file')continue;
    data.set(key,element.value);
  }
  const eventId=options.eventId || crypto.randomUUID();
  data.set('event_id',eventId);
  data.set('request_type',options.type);
  if(options.offerId)data.set('offer_id',options.offerId);
  if(options.resourceId)data.set('resource_id',options.resourceId);
  data.set('source',options.source||'Direct');
  data.set('page_url',location.origin+location.pathname);
  data.set('consent_version','v1-2026-09');
  const search=new URLSearchParams(location.search);
  for(const key of ['utm_source','utm_medium','utm_campaign'])if(search.has(key))data.set(key,search.get(key)||'');
  const consent=form.querySelector<HTMLInputElement>('[name="consent_marketing"], [name="marketing_consent"], #consent_marketing');
  if(consent)data.set('marketing_consent',consent.checked?'true':'false');
  const cv=form.querySelector<HTMLInputElement>('#sf-cv-upload, input[name="cv"]');
  if(options.type==='service'&&cv?.files?.[0])data.set('cv',cv.files[0]);
  const response=await fetch('/api/talentiques/lead',{method:'POST',body:data,credentials:'same-origin'});
  const result=await response.json() as TalentiquesResult;
  if(!response.ok||!result.ok)throw new Error(result.error||'La demande n’a pas pu être enregistrée.');
  return result;
}
