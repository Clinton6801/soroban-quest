/**
 * @file campaigns.ts
 * Campaign system — grouped mission chapters with lore, progression gates, hero images
 *
 * Language-neutral fields (id, heroImage, chapterNumber, missionIds, requiredLevel, color)
 * live at the top level. Localizable fields (title, description, lore) live under
 * `i18n[locale]`. Use `localizeCampaign(campaign, lang)` to get a flat, render-ready object.
 */

import type { Campaign, Language, MissionLocale } from '../types/game';

export const DEFAULT_CAMPAIGN_LANG: Language = 'en';

/**
 * Campaign with localized content
 */
export interface CampaignWithI18n extends Omit<Campaign, 'description'> {
  heroImage: string;
  chapterNumber: number;
  requiredLevel: number;
  color: string;
  i18n: Partial<Record<Language, Partial<MissionLocale> & { lore: string; description: string }>>;
}

export const campaigns: readonly CampaignWithI18n[] = [
  {
    id: 'chapter-1-awakening',
    i18n: {
      en: {
        title: 'Chapter 1: The Awakening',
        description: 'Master your first Soroban contracts. Forge your path as a Stellar Guardian.',
        story: `# 🌌 Chapter 1: The Awakening

You stand at the gates of the **Stellar Citadel**, orbiting the edge of known space. The ancient **Guardians of Soroban** have sensed your arrival.

*"Another seeker,"* whispers the Elder Guardian. *"The blockchain calls to those with the code to answer."*

## Your Destiny Awaits

Complete these foundational contracts to unlock **Chapter 2: Vault of Memory**.

**0/2 missions** • **Level 1 required**`,
        lore: `# 🌌 Chapter 1: The Awakening

You stand at the gates of the **Stellar Citadel**, orbiting the edge of known space. The ancient **Guardians of Soroban** have sensed your arrival.

*"Another seeker,"* whispers the Elder Guardian. *"The blockchain calls to those with the code to answer."*

## Your Destiny Awaits

Complete these foundational contracts to unlock **Chapter 2: Vault of Memory**.

**0/2 missions** • **Level 1 required**`,
      },
      es: {
        title: 'Capítulo 1: El Despertar',
        description: 'Domina tus primeros contratos de Soroban. Forja tu camino como Guardián Estelar.',
        story: `# 🌌 Capítulo 1: El Despertar

Te encuentras ante las puertas de la **Ciudadela Estelar**, orbitando el confín del espacio conocido. Los antiguos **Guardianes de Soroban** han percibido tu llegada.

*"Otro buscador,"* susurra el Guardián Anciano. *"La blockchain llama a quienes tienen el código para responder."*

## Tu Destino Aguarda

Completa estos contratos fundamentales para desbloquear el **Capítulo 2: Bóveda de la Memoria**.

**0/2 misiones** • **Nivel 1 requerido**`,
        lore: `# 🌌 Capítulo 1: El Despertar

Te encuentras ante las puertas de la **Ciudadela Estelar**, orbitando el confín del espacio conocido. Los antiguos **Guardianes de Soroban** han percibido tu llegada.

*"Otro buscador,"* susurra el Guardián Anciano. *"La blockchain llama a quienes tienen el código para responder."*

## Tu Destino Aguarda

Completa estos contratos fundamentales para desbloquear el **Capítulo 2: Bóveda de la Memoria**.

**0/2 misiones** • **Nivel 1 requerido**`,
      },
      fr: {
        title: 'Chapitre 1 : L\'Éveil',
        description: 'Maîtrisez vos premiers contrats Soroban. Forgez votre voie en tant que Gardien Stellaire.',
        story: `# 🌌 Chapitre 1 : L'Éveil

Vous vous tenez aux portes de la **Citadelle Stellaire**, en orbite à la lisière de l'espace connu. Les anciens **Gardiens de Soroban** ont perçu votre arrivée.

*"Encore un chercheur,"* murmure le Gardien Ancien. *"La blockchain appelle ceux qui possèdent le code pour répondre."*

## Votre Destinée Vous Attend

Complétez ces contrats fondamentaux pour débloquer le **Chapitre 2 : Chambre de la Mémoire**.

**0/2 missions** • **Niveau 1 requis**`,
        lore: `# 🌌 Chapitre 1 : L'Éveil

Vous vous tenez aux portes de la **Citadelle Stellaire**, en orbite à la lisière de l'espace connu. Les anciens **Gardiens de Soroban** ont perçu votre arrivée.

*"Encore un chercheur,"* murmure le Gardien Ancien. *"La blockchain appelle ceux qui possèdent le code pour répondre."*

## Votre Destinée Vous Attend

Complétez ces contrats fondamentaux pour débloquer le **Chapitre 2 : Chambre de la Mémoire**.

**0/2 missions** • **Niveau 1 requis**`,
      },
      ja: {
        title: 'チャプター1: 目覚めの刻',
        description: '最初のSoroban契約をマスター。Stellar Guardianとしてのあなたの道を鍛造してください。',
        story: `# 🌌 チャプター1: 目覚めの刻

**Stellar Citadel**の門に立っています。既知の宇宙の端の軌道を回っています。古代の**Sorobanの守護者**があなたの到着を感じました。

*"また別のシーカーか,"* エルダーガーディアンがささやきます。*"ブロックチェーンは応答するコードを持つ者を呼んでいます。"*

## あなたの運命が待っています

これらの基礎契約を完了して**チャプター2: 記憶の金庫**をアンロック。

**0/2 ミッション** • **レベル1 必須**`,
        lore: `# 🌌 チャプター1: 目覚めの刻

**Stellar Citadel**の門に立っています。既知の宇宙の端の軌道を回っています。古代の**Sorobanの守護者**があなたの到着を感じました。

*"また別のシーカーか,"* エルダーガーディアンがささやきます。*"ブロックチェーンは応答するコードを持つ者を呼んでいます。"*

## あなたの運命が待っています

これらの基礎契約を完了して**チャプター2: 記憶の金庫**をアンロック。

**0/2 ミッション** • **レベル1 必須**`,
      },
    },
    heroImage: 'linear-gradient(135deg, #06d6a0 0%, #8b5cf6 50%, #f59e0b 100%)',
    chapterNumber: 1,
    name: 'Chapter 1: The Awakening',
    missionIds: ['hello-soroban', 'greetings-protocol'],
    requiredLevel: 1,
    color: 'cyan',
  },
  {
    id: 'chapter-2-memory',
    i18n: {
      en: {
        title: 'Chapter 2: Vault of Memory',
        description: 'Unlock persistent storage and access control. Memory defines true power.',
        story: `# 🔐 Chapter 2: Vault of Memory

The **Signal Tower** fades behind you. You descend into the **Vault of Memory**, where ancient wisdom persists across eons.

*"A contract without memory is a fleeting thought,"* murmurs the Vault Keeper. *"To endure, you must store and protect."*

## The Second Trial

Master state management to access **Chapter 3: Token Forge**.

**0/2 missions** • **Level 3 required**`,
        lore: `# 🔐 Chapter 2: Vault of Memory

The **Signal Tower** fades behind you. You descend into the **Vault of Memory**, where ancient wisdom persists across eons.

*"A contract without memory is a fleeting thought,"* murmurs the Vault Keeper. *"To endure, you must store and protect."*

## The Second Trial

Master state management to access **Chapter 3: Token Forge**.

**0/2 missions** • **Level 3 required**`,
      },
      es: {
        title: 'Capítulo 2: Bóveda de la Memoria',
        description: 'Desbloquea el almacenamiento persistente y el control de acceso. La memoria define el verdadero poder.',
        story: `# 🔐 Capítulo 2: Bóveda de la Memoria

La **Torre de Señales** se desvanece tras de ti. Desciendes a la **Bóveda de la Memoria**, donde la sabiduría ancestral perdura a través de eones.

*"Un contrato sin memoria es un pensamiento fugaz,"* murmura el Guardián de la Bóveda. *"Para perdurar, debes almacenar y proteger."*

## La Segunda Prueba

Domina la gestión de estado para acceder al **Capítulo 3: Forja de Tokens**.

**0/2 misiones** • **Nivel 3 requerido**`,
        lore: `# 🔐 Capítulo 2: Bóveda de la Memoria

La **Torre de Señales** se desvanece tras de ti. Desciendes a la **Bóveda de la Memoria**, donde la sabiduría ancestral perdura a través de eones.

*"Un contrato sin memoria es un pensamiento fugaz,"* murmura el Guardián de la Bóveda. *"Para perdurar, debes almacenar y proteger."*

## La Segunda Prueba

Domina la gestión de estado para acceder al **Capítulo 3: Forja de Tokens**.

**0/2 misiones** • **Nivel 3 requerido**`,
      },
      fr: {
        title: 'Chapitre 2 : Chambre de la Mémoire',
        description: 'Débloquez le stockage persistant et le contrôle d\'accès. La mémoire définit le véritable pouvoir.',
        story: `# 🔐 Chapitre 2 : Chambre de la Mémoire

La **Tour des Signaux** s'estompe derrière vous. Vous descendez dans la **Chambre de la Mémoire**, où la sagesse ancestrale perdure à travers les éons.

*"Un contrat sans mémoire n'est qu'une pensée éphémère,"* murmure le Gardien de la Chambre. *"Pour perdurer, vous devez stocker et protéger."*

## La Deuxième Épreuve

Maîtrisez la gestion de l'état pour accéder au **Chapitre 3 : Forge de Jetons**.

**0/2 missions** • **Niveau 3 requis**`,
        lore: `# 🔐 Chapitre 2 : Chambre de la Mémoire

La **Tour des Signaux** s'estompe derrière vous. Vous descendez dans la **Chambre de la Mémoire**, où la sagesse ancestrale perdure à travers les éons.

*"Un contrat sans mémoire n'est qu'une pensée éphémère,"* murmure le Gardien de la Chambre. *"Pour perdurer, vous devez stocker et protéger."*

## La Deuxième Épreuve

Maîtrisez la gestion de l'état pour accéder au **Chapitre 3 : Forge de Jetons**.

**0/2 missions** • **Niveau 3 requis**`,
      },
      ja: {
        title: 'チャプター2: 記憶の金庫',
        description: '永続ストレージとアクセス制御をアンロック。記憶が本当の力を定義します。',
        story: `# 🔐 チャプター2: 記憶の金庫

**信号塔**があなたの後ろで消えています。**記憶の金庫**に下ります。ここは古代の知恵が永遠を通じて存続する場所です。

*"記憶のない契約は一瞬の考え,"* 金庫の番人がつぶやきます。*"存続するには、保存し保護する必要があります。"*

## 第二の試験

状態管理をマスターして**チャプター3: トークン鍛造所**にアクセス。

**0/2 ミッション** • **レベル3 必須**`,
        lore: `# 🔐 チャプター2: 記憶の金庫

**信号塔**があなたの後ろで消えています。**記憶の金庫**に下ります。ここは古代の知恵が永遠を通じて存続する場所です。

*"記憶のない契約は一瞬の考え,"* 金庫の番人がつぶやきます。*"存続するには、保存し保護する必要があります。"*

## 第二の試験

状態管理をマスターして**チャプター3: トークン鍛造所**にアクセス。

**0/2 ミッション** • **レベル3 必須**`,
      },
    },
    heroImage: 'linear-gradient(135deg, #8b5cf6 0%, #f59e0b 50%, #ef4444 100%)',
    chapterNumber: 2,
    name: 'Chapter 2: Vault of Memory',
    missionIds: ['counter-vault', 'guardian-ledger'],
    requiredLevel: 3,
    color: 'purple',
  },
];

/**
 * Returns a flat, render-ready campaign object for the given language.
 * Localizable fields resolve from `campaign.i18n[lang]`, falling back to English.
 */
export function localizeCampaign(campaign: CampaignWithI18n, lang: Language = DEFAULT_CAMPAIGN_LANG): Campaign & { title: string; description: string; lore: string } {
  if (!campaign) return campaign as Campaign & { title: string; description: string; lore: string };

  const locale = campaign.i18n?.[lang] || campaign.i18n?.[DEFAULT_CAMPAIGN_LANG] || {};
  const fallback = campaign.i18n?.[DEFAULT_CAMPAIGN_LANG] || {};

  const pick = (field: keyof typeof locale): string => {
    return (locale[field] ?? fallback[field] ?? campaign[field as keyof typeof campaign]) as string;
  };

  return {
    ...campaign,
    title: pick('title'),
    description: pick('description'),
    lore: pick('lore'),
  };
}

/**
 * Localizes an array of campaigns.
 */
export function localizeCampaigns(list: readonly CampaignWithI18n[], lang: Language = DEFAULT_CAMPAIGN_LANG) {
  return (list || []).map((c) => localizeCampaign(c, lang));
}

/**
 * Get campaign progress from completedMissions array
 */
export function getCampaignProgress(campaignId: string, completedMissions: string[]): { completed: number; total: number; percentage: number } {
  const campaign = campaigns.find((c) => c.id === campaignId);
  if (!campaign) {
    return { completed: 0, total: 0, percentage: 0 };
  }

  const completed = campaign.missionIds.filter((id) => completedMissions.includes(id)).length;
  return { completed, total: campaign.missionIds.length, percentage: (completed / campaign.missionIds.length) * 100 };
}
