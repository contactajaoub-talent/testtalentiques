import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Globe, User, Briefcase, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WebToLeadFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export const WebToLeadForm = ({ isOpen, onClose }: WebToLeadFormProps) => {

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">

                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
                    >
                        {/* Decorative Top Bar */}
                        <div className="h-2 w-full bg-gradient-to-r from-brand-500 via-blue-500 to-brand-500" />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-20"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-slate-900 mb-2 font-heading">
                                    Diagnostic <span className="text-brand-600">Offert</span>
                                </h2>
                                <p className="text-slate-500 max-w-lg mx-auto">
                                    Remplissez ce formulaire pour recevoir une analyse personnalisée de votre profil et découvrir comment nous pouvons vous aider.
                                </p>
                            </div>

                            <form
                                action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DQH00000KIbYh"
                                method="POST"
                                className="space-y-8"
                            >
                                <input type="hidden" name="oid" value="00DQH00000KIbYh" />
                                <input type="hidden" name="retURL" value="https://www.talentiques.com/" />

                                {/* Section 1: Informations Personnelles */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-brand-600 uppercase tracking-wider flex items-center gap-2">
                                        <User size={16} /> Informations Personnelles
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700 ml-1">Prénom</label>
                                            <input required id="first_name" maxLength={40} name="first_name" size={20} type="text" placeholder="John" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700 ml-1">Nom</label>
                                            <input required id="last_name" maxLength={80} name="last_name" size={20} type="text" placeholder="Doe" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
                                            <input required id="email" maxLength={80} name="email" size={20} type="text" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700 ml-1">Téléphone</label>
                                            <input id="phone" maxLength={40} name="phone" size={20} type="text" placeholder="+33 6 12 34 56 78" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700 ml-1">Pays</label>
                                        <div className="relative">
                                            <select id="country_code" name="country_code" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all appearance-none cursor-pointer">
                                                <option value="">-- Sélectionner un pays --</option>
                                                <option value="FR">France</option>
                                                <option value="BE">Belgique</option>
                                                <option value="CH">Suisse</option>
                                                <option value="CA">Canada</option>
                                                <option value="MA">Maroc</option>
                                                <option value="DZ">Algérie</option>
                                                <option value="TN">Tunisie</option>
                                                <option value="SN">Sénégal</option>
                                                <option value="CI">Côte d'Ivoire</option>
                                                <option value="GB">Royaume-Uni</option>
                                                <option value="US">États-Unis</option>
                                                <option value="ES">Espagne</option>
                                                <option value="DE">Allemagne</option>
                                                {/* Add more common options or full list if needed, kept concise for UI */}
                                            </select>
                                            <Globe className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100" />

                                {/* Section 2: Profil Professionnel */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-brand-600 uppercase tracking-wider flex items-center gap-2">
                                        <Briefcase size={16} /> Profil Professionnel
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700 ml-1">Lien LinkedIn</label>
                                            <input id="00NQH00000NfIlJ" maxLength={255} name="00NQH00000NfIlJ" size={20} type="text" placeholder="https://linkedin.com/in/..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700 ml-1">Statut Actuel</label>
                                            <select id="00NQH00000NfKK5" name="00NQH00000NfKK5" title="Statut Professionnel Actuel" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all appearance-none cursor-pointer">
                                                <option value="">-- Sélectionner --</option>
                                                <option value="Étudiant">Étudiant</option>
                                                <option value="En poste">En poste</option>
                                                <option value="En recherche d’emploi">En recherche d’emploi</option>
                                                <option value="Alternance">Alternance</option>
                                                <option value="Freelance">Freelance</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700 ml-1">Objectif Visé</label>
                                            <input id="00NQH00000NfKgf" maxLength={255} name="00NQH00000NfKgf" size={20} type="text" placeholder="Ex: Chef de Projet, Data Analyst..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700 ml-1">Type d'objectif</label>
                                            <select id="00NQH00000NfKn7" name="00NQH00000NfKn7" title="Type d’objectif" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all appearance-none cursor-pointer">
                                                <option value="">-- Sélectionner --</option>
                                                <option value="Trouver un emploi">Trouver un emploi</option>
                                                <option value="Trouver une alternance">Trouver une alternance</option>
                                                <option value="Évolution professionnelle">Évolution professionnelle</option>
                                                <option value="Reconversion">Reconversion</option>
                                                <option value="Développer une activité freelance">Développer une activité freelance</option>
                                                <option value="Autre">Autre</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100" />

                                {/* Section 3: Diagnostic */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-brand-600 uppercase tracking-wider flex items-center gap-2">
                                        <AlertCircle size={16} /> Vos Besoins
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700 ml-1">Difficulté Principale</label>
                                            <select id="00NQH00000NfKrx" name="00NQH00000NfKrx" title="Difficultés &amp; blocages" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all appearance-none cursor-pointer">
                                                <option value="">-- Sélectionner --</option>
                                                <option value="Je postule sans réponses">Je postule sans réponses</option>
                                                <option value="Je débute et je suis perdu">Je débute et je suis perdu</option>
                                                <option value="CV / LinkedIn peu valorisant">CV / LinkedIn peu valorisant</option>
                                                <option value="Reconversion en cours">Reconversion en cours</option>
                                                <option value="Optimisation de positionnement">Optimisation de positionnement</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700 ml-1">Délai Souhaité</label>
                                            <select id="00NQH00000NfKwn" name="00NQH00000NfKwn" title="Délai pour atteindre votre objectif" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all appearance-none cursor-pointer">
                                                <option value="">-- Sélectionner --</option>
                                                <option value="Urgent (1–2 mois)">Urgent (1–2 mois)</option>
                                                <option value="Court terme (3–6 mois)">Court terme (3–6 mois)</option>
                                                <option value="Moyen terme (6–12 mois)">Moyen terme (6–12 mois)</option>
                                                <option value="Pas de délai précis">Pas de délai précis</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700 ml-1">Contexte & Informations Complémentaires</label>
                                        <textarea id="00NQH00000NfL01" name="00NQH00000NfL01" rows={3} placeholder="N'hésitez pas à nous donner plus de détails sur votre situation..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400 resize-none" wrap="soft"></textarea>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    name="submit"
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 to-blue-600 text-white font-bold text-lg shadow-lg shadow-brand-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    Envoyer ma demande
                                    <Check size={20} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
