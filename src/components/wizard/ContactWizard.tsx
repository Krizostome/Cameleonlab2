'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import {
  Globe,
  Smartphone,
  Cloud,
  Palette,
  ShoppingCart,
  RefreshCw,
  Layers,
  Check,
  ArrowRight,
  ArrowLeft,
  Send,
  Zap,
  FileText,
  Lock,
  LayoutDashboard,
  Server,
  Search,
  CreditCard,
  MessageCircle,
  Languages,
  BarChart3,
  HelpCircle,
  Calendar,
  Clock,
  Timer,
  Hourglass,
  Infinity,
  ChevronRight,
  Sparkles,
  AlertCircle,
} from 'lucide-react'


type ProjectType = 'website' | 'mobile' | 'saas' | 'branding' | 'ecommerce' | 'redesign' | 'other'
type BudgetRange = 'under5k' | '5k-15k' | '15k-50k' | '50kplus' | 'custom'
type TimelineOption = 'asap' | '1-2months' | '3-6months' | '6plus' | 'flexible'

interface FormData {
  projectType: ProjectType | null
  projectName: string
  company: string
  email: string
  description: string
  features: string[]
  budget: BudgetRange | null
  timeline: TimelineOption | null
}

const PROJECT_TYPES: { id: ProjectType; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'website', label: 'Site Web', icon: <Globe className="w-6 h-6" />, desc: 'Vitrine, corporate, landing page' },
  { id: 'mobile', label: 'Application Mobile', icon: <Smartphone className="w-6 h-6" />, desc: 'iOS, Android, cross-platform' },
  { id: 'saas', label: 'SaaS', icon: <Cloud className="w-6 h-6" />, desc: 'Plateforme web, dashboard, outil' },
  { id: 'ecommerce', label: 'E-commerce', icon: <ShoppingCart className="w-6 h-6" />, desc: 'Boutique en ligne, marketplace' },
  { id: 'branding', label: 'Branding & Design', icon: <Palette className="w-6 h-6" />, desc: 'Identité visuelle, UI/UX' },
  { id: 'redesign', label: 'Refonte', icon: <RefreshCw className="w-6 h-6" />, desc: 'Modernisation, amélioration UX' },
  { id: 'other', label: 'Autre', icon: <Layers className="w-6 h-6" />, desc: 'Projet sur mesure' },
]

const FEATURES: { id: string; label: string; icon: React.ReactNode }[] = [
  { id: 'landing', label: 'Landing page', icon: <FileText className="w-5 h-5" /> },
  { id: 'blog', label: 'Blog / CMS', icon: <FileText className="w-5 h-5" /> },
  { id: 'ecommerce', label: 'E-commerce', icon: <ShoppingCart className="w-5 h-5" /> },
  { id: 'auth', label: 'Authentification', icon: <Lock className="w-5 h-5" /> },
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'api', label: 'API / Backend', icon: <Server className="w-5 h-5" /> },
  { id: 'seo', label: 'SEO optimisé', icon: <Search className="w-5 h-5" /> },
  { id: 'payments', label: 'Paiements', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'chat', label: 'Chat / Messagerie', icon: <MessageCircle className="w-5 h-5" /> },
  { id: 'multilang', label: 'Multi-langue', icon: <Languages className="w-5 h-5" /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  { id: 'other_feature', label: 'Autre', icon: <HelpCircle className="w-5 h-5" /> },
]

const BUDGETS: { id: BudgetRange; label: string; desc: string }[] = [
  { id: 'under5k', label: '< 5 000 €', desc: 'Projet simple et rapide' },
  { id: '5k-15k', label: '5 000 € — 15 000 €', desc: 'Projet standard' },
  { id: '15k-50k', label: '15 000 € — 50 000 €', desc: 'Projet ambitieux' },
  { id: '50kplus', label: '50 000 € +', desc: 'Projet d\'envergure' },
  { id: 'custom', label: 'Sur mesure', desc: 'À discuter ensemble' },
]

const TIMELINES: { id: TimelineOption; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'asap', label: 'Dès que possible', icon: <Zap className="w-5 h-5" />, desc: 'Lancement rapide prioritaire' },
  { id: '1-2months', label: '1 à 2 mois', icon: <Calendar className="w-5 h-5" />, desc: 'Délai court mais réaliste' },
  { id: '3-6months', label: '3 à 6 mois', icon: <Clock className="w-5 h-5" />, desc: 'Projet bien structuré' },
  { id: '6plus', label: '6 mois +', icon: <Hourglass className="w-5 h-5" />, desc: 'Projet complexe sur le long terme' },
  { id: 'flexible', label: 'Flexible', icon: <Infinity className="w-5 h-5" />, desc: 'Pas de contrainte de temps' },
]

const STEPS = [
  { num: 1, label: 'Type de projet' },
  { num: 2, label: 'Votre projet' },
  { num: 3, label: 'Fonctionnalités' },
  { num: 4, label: 'Budget' },
  { num: 5, label: 'Timeline' },
  { num: 6, label: 'Récapitulatif' },
]

/* ═══════════════════════════════════════════════════════════════════ */
/*  Validation helpers                                                 */
/* ═══════════════════════════════════════════════════════════════════ */

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validateStep(step: number, data: FormData): string | null {
  switch (step) {
    case 1:
      if (!data.projectType) return 'Veuillez sélectionner un type de projet'
      return null
    case 2:
      if (!data.projectName.trim()) return 'Le nom du projet est requis'
      if (!data.email.trim()) return 'L\'email est requis'
      if (!isValidEmail(data.email)) return 'Veuillez entrer un email valide'
      if (!data.description.trim()) return 'La description est requise'
      if (data.description.trim().length < 20) return 'La description doit faire au moins 20 caractères'
      return null
    case 3:
      if (data.features.length === 0) return 'Veuillez sélectionner au moins une fonctionnalité'
      return null
    case 4:
      if (!data.budget) return 'Veuillez sélectionner un budget'
      return null
    case 5:
      if (!data.timeline) return 'Veuillez sélectionner une timeline'
      return null
    default:
      return null
  }
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Progress Bar Component                                             */
/* ═══════════════════════════════════════════════════════════════════ */

function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="w-full mb-8 md:mb-10">
      {/* Desktop: full steps */}
      <div className="hidden md:flex items-center justify-between mb-4">
        {STEPS.map((s) => {
          const isActive = s.num === currentStep
          const isCompleted = s.num < currentStep
          return (
            <div key={s.num} className="flex flex-col items-center gap-2 flex-1 relative">
              {/* Connector line */}
              {s.num < totalSteps && (
                <div
                  className="absolute top-3 left-[50%] w-full h-[2px] -z-10"
                  style={{
                    background:
                      s.num < currentStep
                        ? 'linear-gradient(90deg, #00E87A, #00C060)'
                        : 'rgba(0, 232, 122, 0.15)',
                  }}
                />
              )}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                  isActive
                    ? 'bg-[#00E87A] text-[#071510] shadow-[0_0_20px_rgba(0,232,122,0.5)] scale-110'
                    : isCompleted
                    ? 'bg-[#00E87A]/20 text-[#00E87A] border border-[#00E87A]/40'
                    : 'bg-[#071510]/5 dark:bg-[#F0FAF4]/5 text-[#071510]/40 dark:text-[#F0FAF4]/40 border border-[#071510]/10 dark:border-[#F0FAF4]/10'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.num}
              </div>
              <span
                className={`text-[10px] uppercase tracking-wider font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-[#00E87A]'
                    : isCompleted
                    ? 'text-[#00E87A]/70'
                    : 'text-[#071510]/30 dark:text-[#F0FAF4]/30'
                }`}
              >
                {s.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Mobile: compact */}
      <div className="md:hidden flex items-center gap-3 mb-4">
        <span className="font-['Satoshi'] text-sm font-bold text-[#00E87A]">
          Étape {currentStep}/{totalSteps}
        </span>
        <span className="text-xs text-[#071510]/80 dark:text-[#F0FAF4]/80 font-['Satoshi']">
          {STEPS[currentStep - 1]?.label}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-[#071510]/5 dark:bg-[#F0FAF4]/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #00E87A, #00C060)',
            boxShadow: '0 0 12px rgba(0,232,122,0.4)',
          }}
        />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Step 1 — Project Type                                              */
/* ═══════════════════════════════════════════════════════════════════ */

function StepProjectType({
  value,
  onChange,
  error,
}: {
  value: ProjectType | null
  onChange: (v: ProjectType) => void
  error?: string | null
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="font-['Outfit'] text-2xl md:text-3xl font-bold text-[#071510] dark:text-[#F0FAF4] mb-2">
          Quel type de projet ?
        </h3>
        <p className="font-['Satoshi'] text-sm text-[#374151] dark:text-[#9CA3AF]">
          Sélectionnez la catégorie qui correspond le mieux à votre besoin
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {PROJECT_TYPES.map((type) => {
          const isSelected = value === type.id
          return (
            <button
              key={type.id}
              onClick={() => onChange(type.id)}
              className={`relative group flex items-start gap-4 p-4 md:p-5 rounded-2xl border text-left transition-all duration-300 ${
                isSelected
                  ? 'border-[#00E87A]/60 bg-[#00E87A]/5 shadow-[0_0_30px_rgba(0,232,122,0.12)]'
                  : 'border-[#071510]/8 dark:border-[#F0FAF4]/8 bg-[#071510]/[0.02] dark:bg-[#F0FAF4]/[0.02] hover:border-[#00E87A]/30 hover:bg-[#00E87A]/[0.03]'
              }`}
            >
              <div
                className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#00E87A] text-[#071510] shadow-[0_0_16px_rgba(0,232,122,0.35)]'
                    : 'bg-[#071510]/5 dark:bg-[#F0FAF4]/5 text-[#071510]/80 dark:text-[#F0FAF4]/80 group-hover:text-[#00E87A]'
                }`}
              >
                {type.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-['Satoshi'] font-semibold text-[#071510] dark:text-[#F0FAF4] text-sm md:text-base mb-0.5">
                  {type.label}
                </div>
                <div className="font-['Satoshi'] text-xs text-[#374151] dark:text-[#9CA3AF]">
                  {type.desc}
                </div>
              </div>
              {isSelected && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00E87A] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-[#071510]" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {error && (
        <p className="text-center text-xs text-red-400 font-['Satoshi'] flex items-center justify-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Step 2 — Project Info                                              */
/* ═══════════════════════════════════════════════════════════════════ */

function StepProjectInfo({
  data,
  onChange,
  errors,
}: {
  data: Pick<FormData, 'projectName' | 'company' | 'email' | 'description'>
  onChange: (field: string, value: string) => void
  errors: Record<string, string>
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="font-['Outfit'] text-2xl md:text-3xl font-bold text-[#071510] dark:text-[#F0FAF4] mb-2">
          Parlez-nous de votre projet
        </h3>
        <p className="font-['Satoshi'] text-sm text-[#374151] dark:text-[#9CA3AF]">
          Ces informations nous aident à mieux comprendre votre vision
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-['Satoshi'] text-xs font-medium text-[#071510]/80 dark:text-[#F0FAF4]/80 mb-2 uppercase tracking-wider">
              Nom du projet *
            </label>
            <input
              type="text"
              value={data.projectName}
              onChange={(e) => onChange('projectName', e.target.value)}
              placeholder="Mon super projet"
              className={`w-full px-4 py-3 rounded-xl bg-[#071510]/[0.03] dark:bg-[#F0FAF4]/[0.03] border font-['Satoshi'] text-sm text-[#071510] dark:text-[#F0FAF4] placeholder:text-[#071510]/30 dark:placeholder:text-[#F0FAF4]/30 outline-none transition-all duration-300 focus:border-[#00E87A]/50 focus:shadow-[0_0_20px_rgba(0,232,122,0.08)] ${
                errors.projectName ? 'border-red-400/50' : 'border-[#071510]/8 dark:border-[#F0FAF4]/8'
              }`}
            />
            {errors.projectName && (
              <p className="mt-1.5 text-xs text-red-400 font-['Satoshi'] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.projectName}
              </p>
            )}
          </div>
          <div>
            <label className="block font-['Satoshi'] text-xs font-medium text-[#071510]/80 dark:text-[#F0FAF4]/80 mb-2 uppercase tracking-wider">
              Entreprise
            </label>
            <input
              type="text"
              value={data.company}
              onChange={(e) => onChange('company', e.target.value)}
              placeholder="Nom de votre entreprise"
              className="w-full px-4 py-3 rounded-xl bg-[#071510]/[0.03] dark:bg-[#F0FAF4]/[0.03] border border-[#071510]/8 dark:border-[#F0FAF4]/8 font-['Satoshi'] text-sm text-[#071510] dark:text-[#F0FAF4] placeholder:text-[#071510]/30 dark:placeholder:text-[#F0FAF4]/30 outline-none transition-all duration-300 focus:border-[#00E87A]/50 focus:shadow-[0_0_20px_rgba(0,232,122,0.08)]"
            />
          </div>
        </div>

        <div>
          <label className="block font-['Satoshi'] text-xs font-medium text-[#071510]/80 dark:text-[#F0FAF4]/80 mb-2 uppercase tracking-wider">
            Email *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="vous@entreprise.com"
            className={`w-full px-4 py-3 rounded-xl bg-[#071510]/[0.03] dark:bg-[#F0FAF4]/[0.03] border font-['Satoshi'] text-sm text-[#071510] dark:text-[#F0FAF4] placeholder:text-[#071510]/30 dark:placeholder:text-[#F0FAF4]/30 outline-none transition-all duration-300 focus:border-[#00E87A]/50 focus:shadow-[0_0_20px_rgba(0,232,122,0.08)] ${
              errors.email ? 'border-red-400/50' : 'border-[#071510]/8 dark:border-[#F0FAF4]/8'
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-400 font-['Satoshi'] flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block font-['Satoshi'] text-xs font-medium text-[#071510]/80 dark:text-[#F0FAF4]/80 mb-2 uppercase tracking-wider">
            Description du projet *
          </label>
          <textarea
            value={data.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Décrivez votre projet, vos objectifs, votre cible... (min. 20 caractères)"
            rows={5}
            className={`w-full px-4 py-3 rounded-xl bg-[#071510]/[0.03] dark:bg-[#F0FAF4]/[0.03] border font-['Satoshi'] text-sm text-[#071510] dark:text-[#F0FAF4] placeholder:text-[#071510]/30 dark:placeholder:text-[#F0FAF4]/30 outline-none transition-all duration-300 focus:border-[#00E87A]/50 focus:shadow-[0_0_20px_rgba(0,232,122,0.08)] resize-none ${
              errors.description ? 'border-red-400/50' : 'border-[#071510]/8 dark:border-[#F0FAF4]/8'
            }`}
          />
          <div className="flex items-center justify-between mt-1.5">
            {errors.description ? (
              <p className="text-xs text-red-400 font-['Satoshi'] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.description}
              </p>
            ) : (
              <span />
            )}
            <span className="text-[10px] text-[#071510]/30 dark:text-[#F0FAF4]/30 font-['Satoshi']">
              {data.description.length} caractères
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Step 3 — Features                                                  */
/* ═══════════════════════════════════════════════════════════════════ */

function StepFeatures({
  selected,
  onToggle,
  error,
}: {
  selected: string[]
  onToggle: (id: string) => void
  error: string | null
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="font-['Outfit'] text-2xl md:text-3xl font-bold text-[#071510] dark:text-[#F0FAF4] mb-2">
          Fonctionnalités souhaitées
        </h3>
        <p className="font-['Satoshi'] text-sm text-[#374151] dark:text-[#9CA3AF]">
          Sélectionnez tout ce dont vous avez besoin
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {FEATURES.map((feature) => {
          const isSelected = selected.includes(feature.id)
          return (
            <button
              key={feature.id}
              onClick={() => onToggle(feature.id)}
              className={`relative group flex flex-col items-center gap-2 p-4 md:p-5 rounded-2xl border text-center transition-all duration-300 ${
                isSelected
                  ? 'border-[#00E87A]/60 bg-[#00E87A]/5 shadow-[0_0_24px_rgba(0,232,122,0.1)]'
                  : 'border-[#071510]/8 dark:border-[#F0FAF4]/8 bg-[#071510]/[0.02] dark:bg-[#F0FAF4]/[0.02] hover:border-[#00E87A]/25 hover:bg-[#00E87A]/[0.02]'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#00E87A] text-[#071510] shadow-[0_0_12px_rgba(0,232,122,0.35)]'
                    : 'bg-[#071510]/5 dark:bg-[#F0FAF4]/5 text-[#071510]/40 dark:text-[#F0FAF4]/40 group-hover:text-[#00E87A]/70'
                }`}
              >
                {feature.icon}
              </div>
              <span
                className={`font-['Satoshi'] text-xs font-medium transition-colors ${
                  isSelected ? 'text-[#00E87A]' : 'text-[#071510]/80 dark:text-[#F0FAF4]/80'
                }`}
              >
                {feature.label}
              </span>
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#00E87A] flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-[#071510]" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {error && (
        <p className="text-center text-xs text-red-400 font-['Satoshi'] flex items-center justify-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Step 4 — Budget                                                    */
/* ═══════════════════════════════════════════════════════════════════ */

function StepBudget({
  value,
  onChange,
  error,
}: {
  value: BudgetRange | null
  onChange: (v: BudgetRange) => void
  error: string | null
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="font-['Outfit'] text-2xl md:text-3xl font-bold text-[#071510] dark:text-[#F0FAF4] mb-2">
          Quel est votre budget ?
        </h3>
        <p className="font-['Satoshi'] text-sm text-[#374151] dark:text-[#9CA3AF]">
          Cela nous aide à orienter nos recommandations
        </p>
      </div>

      <div className="space-y-3">
        {BUDGETS.map((budget) => {
          const isSelected = value === budget.id
          return (
            <button
              key={budget.id}
              onClick={() => onChange(budget.id)}
              className={`w-full group flex items-center gap-4 p-4 md:p-5 rounded-2xl border text-left transition-all duration-300 ${
                isSelected
                  ? 'border-[#00E87A]/60 bg-[#00E87A]/5 shadow-[0_0_24px_rgba(0,232,122,0.1)]'
                  : 'border-[#071510]/8 dark:border-[#F0FAF4]/8 bg-[#071510]/[0.02] dark:bg-[#F0FAF4]/[0.02] hover:border-[#00E87A]/25 hover:bg-[#00E87A]/[0.02]'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                  isSelected
                    ? 'border-[#00E87A] bg-[#00E87A] shadow-[0_0_12px_rgba(0,232,122,0.4)]'
                    : 'border-[#071510]/20 dark:border-[#F0FAF4]/20 group-hover:border-[#00E87A]/40'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-[#071510]" />}
              </div>
              <div className="flex-1">
                <div className="font-['Satoshi'] font-semibold text-[#071510] dark:text-[#F0FAF4] text-sm md:text-base">
                  {budget.label}
                </div>
                <div className="font-['Satoshi'] text-xs text-[#374151] dark:text-[#9CA3AF]">
                  {budget.desc}
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 transition-all duration-300 ${
                  isSelected ? 'text-[#00E87A] translate-x-0 opacity-100' : 'text-[#071510]/20 dark:text-[#F0FAF4]/20 -translate-x-2 opacity-0'
                }`}
              />
            </button>
          )
        })}
      </div>

      {error && (
        <p className="text-center text-xs text-red-400 font-['Satoshi'] flex items-center justify-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Step 5 — Timeline                                                  */
/* ═══════════════════════════════════════════════════════════════════ */

function StepTimeline({
  value,
  onChange,
  error,
}: {
  value: TimelineOption | null
  onChange: (v: TimelineOption) => void
  error: string | null
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="font-['Outfit'] text-2xl md:text-3xl font-bold text-[#071510] dark:text-[#F0FAF4] mb-2">
          Timeline souhaitée
        </h3>
        <p className="font-['Satoshi'] text-sm text-[#374151] dark:text-[#9CA3AF]">
          Quand aimeriez-vous voir votre projet voir le jour ?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {TIMELINES.map((timeline) => {
          const isSelected = value === timeline.id
          return (
            <button
              key={timeline.id}
              onClick={() => onChange(timeline.id)}
              className={`group flex items-center gap-4 p-4 md:p-5 rounded-2xl border text-left transition-all duration-300 ${
                isSelected
                  ? 'border-[#00E87A]/60 bg-[#00E87A]/5 shadow-[0_0_24px_rgba(0,232,122,0.1)]'
                  : 'border-[#071510]/8 dark:border-[#F0FAF4]/8 bg-[#071510]/[0.02] dark:bg-[#F0FAF4]/[0.02] hover:border-[#00E87A]/25 hover:bg-[#00E87A]/[0.02]'
              }`}
            >
              <div
                className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#00E87A] text-[#071510] shadow-[0_0_16px_rgba(0,232,122,0.35)]'
                    : 'bg-[#071510]/5 dark:bg-[#F0FAF4]/5 text-[#071510]/40 dark:text-[#F0FAF4]/40 group-hover:text-[#00E87A]/70'
                }`}
              >
                {timeline.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-['Satoshi'] font-semibold text-[#071510] dark:text-[#F0FAF4] text-sm md:text-base">
                  {timeline.label}
                </div>
                <div className="font-['Satoshi'] text-xs text-[#374151] dark:text-[#9CA3AF]">
                  {timeline.desc}
                </div>
              </div>
              {isSelected && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00E87A] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-[#071510]" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {error && (
        <p className="text-center text-xs text-red-400 font-['Satoshi'] flex items-center justify-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Step 6 — Summary                                                   */
/* ═══════════════════════════════════════════════════════════════════ */

function StepSummary({ data }: { data: FormData }) {
  const projectTypeLabel = PROJECT_TYPES.find((t) => t.id === data.projectType)?.label
  const budgetLabel = BUDGETS.find((b) => b.id === data.budget)?.label
  const timelineLabel = TIMELINES.find((t) => t.id === data.timeline)?.label
  const selectedFeatures = FEATURES.filter((f) => data.features.includes(f.id))

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00E87A]/10 border border-[#00E87A]/20 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#00E87A]" />
          <span className="font-['Satoshi'] text-xs font-medium text-[#00E87A]">Presque terminé</span>
        </div>
        <h3 className="font-['Outfit'] text-2xl md:text-3xl font-bold text-[#071510] dark:text-[#F0FAF4] mb-2">
          Récapitulatif
        </h3>
        <p className="font-['Satoshi'] text-sm text-[#374151] dark:text-[#9CA3AF]">
          Vérifiez vos informations avant d'envoyer
        </p>
      </div>

      <div className="space-y-3">
        <SummaryItem label="Type de projet" value={projectTypeLabel || '-'} />
        <SummaryItem label="Nom du projet" value={data.projectName || '-'} />
        {data.company && <SummaryItem label="Entreprise" value={data.company} />}
        <SummaryItem label="Email" value={data.email || '-'} />
        <SummaryItem
          label="Description"
          value={data.description || '-'}
          multiline
        />
        <SummaryItem
          label="Fonctionnalités"
          value={selectedFeatures.map((f) => f.label).join(', ') || '-'}
        />
        <SummaryItem label="Budget" value={budgetLabel || '-'} />
        <SummaryItem label="Timeline" value={timelineLabel || '-'} />
      </div>
    </div>
  )
}

function SummaryItem({
  label,
  value,
  multiline,
}: {
  label: string
  value: string
  multiline?: boolean
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 p-3 md:p-4 rounded-xl bg-[#071510]/[0.02] dark:bg-[#F0FAF4]/[0.02] border border-[#071510]/5 dark:border-[#F0FAF4]/5">
      <span className="font-['Satoshi'] text-[11px] uppercase tracking-wider text-[#071510]/40 dark:text-[#F0FAF4]/40 font-medium sm:w-32 flex-shrink-0">
        {label}
      </span>
      <span
        className={`font-['Satoshi'] text-sm text-[#071510] dark:text-[#F0FAF4] ${
          multiline ? 'leading-relaxed' : ''
        }`}
      >
        {value}
      </span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Success Screen                                                     */
/* ═══════════════════════════════════════════════════════════════════ */

function SuccessScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-[#00E87A]/10 border border-[#00E87A]/20 flex items-center justify-center mb-6 animate-pulse">
        <Check className="w-10 h-10 text-[#00E87A]" />
      </div>
      <h3 className="font-['Outfit'] text-2xl md:text-3xl font-bold text-[#071510] dark:text-[#F0FAF4] mb-3">
        Message envoyé avec succès !
      </h3>
      <p className="font-['Satoshi'] text-sm text-[#374151] dark:text-[#9CA3AF] max-w-md mx-auto mb-8">
        Nous avons bien reçu votre demande. Notre équipe vous contactera sous 24h pour discuter de votre projet.
      </p>
      <div className="flex items-center gap-2 text-xs text-[#00E87A] font-['Satoshi']">
        <Timer className="w-3.5 h-3.5" />
        <span>Réponse sous 24h</span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Main Wizard Component                                              */
/* ═══════════════════════════════════════════════════════════════════ */

export default function ContactWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [shakeError, setShakeError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    projectType: null,
    projectName: '',
    company: '',
    email: '',
    description: '',
    features: [],
    budget: null,
    timeline: null,
  })

  const stepContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const totalSteps = 6

  const canGoNext = useMemo(() => {
    if (currentStep >= totalSteps) return false
    return validateStep(currentStep, formData) === null
  }, [currentStep, formData])

  const canGoPrev = currentStep > 1

  /* ── GSAP transition between steps ── */
  useEffect(() => {
    if (!contentRef.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: direction === 'next' ? 30 : -20,
          scale: 0.98,
          filter: 'blur(4px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: 'power3.out',
        }
      )

      // Stagger children
      const children = contentRef.current?.querySelectorAll('.stagger-item')
      if (children) {
        gsap.fromTo(
          children,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out', delay: 0.1 }
        )
      }
    })

    return () => ctx.revert()
  }, [currentStep, direction])

  /* ── Scroll to top of wizard on step change ── */
  useEffect(() => {
    if (!stepContainerRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    stepContainerRef.current.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [currentStep])

  /* ── Shake animation on error ── */
  useEffect(() => {
    if (!shakeError || !stepContainerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setShakeError(false),
      })
      tl.to(stepContainerRef.current, { x: -8, duration: 0.05, ease: 'power2.out' })
        .to(stepContainerRef.current, { x: 8, duration: 0.05, ease: 'power2.out' })
        .to(stepContainerRef.current, { x: -6, duration: 0.05, ease: 'power2.out' })
        .to(stepContainerRef.current, { x: 6, duration: 0.05, ease: 'power2.out' })
        .to(stepContainerRef.current, { x: -3, duration: 0.05, ease: 'power2.out' })
        .to(stepContainerRef.current, { x: 3, duration: 0.05, ease: 'power2.out' })
        .to(stepContainerRef.current, { x: 0, duration: 0.05, ease: 'power2.out' })
    })

    return () => ctx.revert()
  }, [shakeError])

  const handleNext = useCallback(() => {
    const validationError = validateStep(currentStep, formData)
    if (validationError) {
      const fieldErrors: Record<string, string> = {}
      switch (currentStep) {
        case 1:
          fieldErrors.projectType = validationError
          break
        case 2:
          if (!formData.projectName.trim()) fieldErrors.projectName = 'Le nom du projet est requis'
          if (!formData.email.trim()) fieldErrors.email = 'L\'email est requis'
          else if (!isValidEmail(formData.email)) fieldErrors.email = 'Email invalide'
          if (!formData.description.trim()) fieldErrors.description = 'La description est requise'
          else if (formData.description.trim().length < 20)
            fieldErrors.description = 'Minimum 20 caractères'
          break
        case 3:
          fieldErrors.features = validationError
          break
        case 4:
          fieldErrors.budget = validationError
          break
        case 5:
          fieldErrors.timeline = validationError
          break
      }
      setErrors(fieldErrors)
      setShakeError(true)
      return
    }

    setErrors({})
    if (currentStep < totalSteps) {
      setDirection('next')
      setCurrentStep((s) => s + 1)
    }
  }, [currentStep, formData])

  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      setErrors({})
      setDirection('prev')
      setCurrentStep((s) => s - 1)
    }
  }, [currentStep])

  const handleSubmit = useCallback(() => {
    const validationError = validateStep(currentStep, formData)
    if (validationError) {
      setShakeError(true)
      return
    }
    // Simulate submission
    setSubmitted(true)
  }, [currentStep, formData])

  const updateField = useCallback((field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field as string]
      return next
    })
  }, [])

  const toggleFeature = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((f) => f !== id)
        : [...prev.features, id],
    }))
  }, [])

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <SuccessScreen />
      </div>
    )
  }

  return (
    <div ref={stepContainerRef} className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {/* Step Content */}
      <div
        ref={contentRef}
        className="min-h-[400px] md:min-h-[450px]"
        style={{ willChange: 'transform, opacity, filter' }}
      >
        {currentStep === 1 && (
          <div className="stagger-item">
            <StepProjectType
              value={formData.projectType}
              onChange={(v) => updateField('projectType', v)}
              error={errors.projectType || null}
            />
          </div>
        )}
        {currentStep === 2 && (
          <div className="stagger-item">
            <StepProjectInfo
              data={{
                projectName: formData.projectName,
                company: formData.company,
                email: formData.email,
                description: formData.description,
              }}
              onChange={(field, value) => updateField(field as keyof FormData, value)}
              errors={errors}
            />
          </div>
        )}
        {currentStep === 3 && (
          <div className="stagger-item">
            <StepFeatures
              selected={formData.features}
              onToggle={toggleFeature}
              error={errors.features || null}
            />
          </div>
        )}
        {currentStep === 4 && (
          <div className="stagger-item">
            <StepBudget
              value={formData.budget}
              onChange={(v) => updateField('budget', v)}
              error={errors.budget || null}
            />
          </div>
        )}
        {currentStep === 5 && (
          <div className="stagger-item">
            <StepTimeline
              value={formData.timeline}
              onChange={(v) => updateField('timeline', v)}
              error={errors.timeline || null}
            />
          </div>
        )}
        {currentStep === 6 && (
          <div className="stagger-item">
            <StepSummary data={formData} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 md:mt-10 flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={!canGoPrev}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-['Satoshi'] text-sm font-semibold transition-all duration-300 ${
            canGoPrev
              ? 'text-[#071510]/80 dark:text-[#F0FAF4]/80 hover:text-[#00E87A] hover:bg-[#00E87A]/5'
              : 'text-[#071510]/20 dark:text-[#F0FAF4]/20 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>

        {currentStep < totalSteps ? (
          <button
            onClick={handleNext}
            className={`group relative flex items-center gap-2 px-7 py-3 rounded-full font-['Satoshi'] text-sm font-bold transition-all duration-300 overflow-hidden ${
              canGoNext
                ? 'bg-[#00E87A] text-[#071510] hover:shadow-[0_0_30px_rgba(0,232,122,0.35)] hover:scale-[1.02]'
                : 'bg-[#071510]/10 dark:bg-[#F0FAF4]/10 text-[#071510]/30 dark:text-[#F0FAF4]/30'
            }`}
          >
            <span className="relative z-10">Continuer</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5" />
            {canGoNext && (
              <span
                className="absolute inset-0 pointer-events-none animate-shimmer"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
                  width: '40%',
                }}
              />
            )}
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="group relative flex items-center gap-2 px-7 py-3 rounded-full font-['Satoshi'] text-sm font-bold bg-[#00E87A] text-[#071510] hover:shadow-[0_0_30px_rgba(0,232,122,0.35)] hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Envoyer</span>
            <Send className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5" />
            <span
              className="absolute inset-0 pointer-events-none animate-shimmer"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
                width: '40%',
              }}
            />
          </button>
        )}
      </div>
    </div>
  )
}
