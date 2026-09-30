import { Relationship } from './types';

export const relationships: Relationship[] = [
  // 1. Why Privacy Matters
  {
    id: 'rel-context-info',
    sourceId: 'contextual-integrity',
    targetId: 'informational-privacy',
    type: 'governs',
    label: 'governs appropriate flow of',
    shortNote: 'Privacy norms govern context-specific flows of information, not a blanket ban on sharing. Sharing a diagnosis with a treating physician differs from selling it to an advertiser.',
  },
  {
    id: 'rel-info-spatial',
    sourceId: 'informational-privacy',
    targetId: 'spatial-privacy',
    type: 'supports',
    label: 'interacts with',
    shortNote: 'A camera in the home invades spatial privacy and creates data; a prediction about reproductive health may affect informational and decisional privacy.',
  },
  {
    id: 'rel-access-control',
    sourceId: 'access-account',
    targetId: 'control-account',
    type: 'can-conflict-with',
    label: 'competes conceptually with',
    shortNote: 'Access concerns actual observation or access; control concerns effective authority. Control without knowledge may be illusory, while authorizing disclosure still loses privacy in the access sense.',
  },
  {
    id: 'rel-chilling-decisional',
    sourceId: 'chilling-effect',
    targetId: 'decisional-privacy',
    type: 'can-distort',
    label: 'constrains',
    shortNote: 'People may refrain from lawful speech, experimentation, or behavior because they expect observation or consequences.',
  },
  {
    id: 'rel-asymmetry-control',
    sourceId: 'information-asymmetry',
    targetId: 'control-account',
    type: 'can-distort',
    label: 'undermines effective',
    shortNote: 'When one actor has significantly more relevant information, the other is less able to assess risks and choose freely; privacy notices alone rarely remove unequal power.',
  },

  // 2. Data Protection Law and Practice
  {
    id: 'rel-anonymity-personal',
    sourceId: 'anonymity-vs-pseudonymity',
    targetId: 'personal-data',
    type: 'differs-from',
    label: 'distinguishes scope of',
    shortNote: 'Pseudonymized data normally remain personal data; genuinely anonymous information falls outside the GDPR. "It is public" or "we removed names" does not automatically make data anonymous.',
  },
  {
    id: 'rel-principles-personal',
    sourceId: 'gdpr-baseline-principles',
    targetId: 'personal-data',
    type: 'governs',
    label: 'regulates processing of',
    shortNote: 'Article 5 requires lawfulness, fairness and transparency; purpose limitation; data minimization; accuracy; storage limitation; integrity and confidentiality; and accountability.',
  },
  {
    id: 'rel-bases-principles',
    sourceId: 'legal-bases-article-6-9',
    targetId: 'gdpr-baseline-principles',
    type: 'supports',
    label: 'satisfies lawfulness for',
    shortNote: 'Article 6 requires an applicable legal basis: consent is one possible basis, not the default or universal requirement. Special-category data additionally needs an Article 9 condition.',
  },
  {
    id: 'rel-notice-transparency',
    sourceId: 'informing-people-articles-12-14',
    targetId: 'transparency',
    type: 'supports',
    label: 'statutorily mandates',
    shortNote: 'Article 12 requires information and communications about processing to be concise, transparent, intelligible and easily accessible, using clear, plain language.',
  },
  {
    id: 'rel-auto-dun',
    sourceId: 'automated-decisions-article-22',
    targetId: 'cjeu-dun-and-bradstreet',
    type: 'supports',
    label: 'has access duties clarified by',
    shortNote: 'The CJEU’s 2025 Dun & Bradstreet decision clarified the Article 15(1)(h) access duty for covered automated decision-making: explain the procedure and principles actually applied, including which personal data were used and how.',
  },
  {
    id: 'rel-dpia-principles',
    sourceId: 'engineering-governance-dpia',
    targetId: 'gdpr-baseline-principles',
    type: 'supports',
    label: 'operationalizes accountability in',
    shortNote: 'Before processing: define purpose and legal basis, map data, minimize collection, decide retention, set access controls, and assess whether a DPIA is required under Article 35.',
  },
  {
    id: 'rel-law-enforcement-auto',
    sourceId: 'law-enforcement-caveat',
    targetId: 'automated-decisions-article-22',
    type: 'differs-from',
    label: 'separates regime from',
    shortNote: 'The EU Law Enforcement Directive and national law govern criminal processing, not the ordinary GDPR regime. Do not mechanically apply GDPR Article 22 to every policing example.',
  },

  // 3. Differential Privacy
  {
    id: 'rel-dp-rawsec',
    sourceId: 'differential-privacy',
    targetId: 'raw-data-security',
    type: 'does-not-guarantee',
    label: 'does not replace',
    shortNote: 'A properly calibrated DP release limits what a published output reveals, but does not protect raw trip logs or database records if they are leaked.',
  },
  {
    id: 'rel-dp-personal',
    sourceId: 'differential-privacy',
    targetId: 'personal-data',
    type: 'limits-disclosure-from',
    label: 'limits disclosure from',
    shortNote: 'DP bounds the incremental effect of one person’s participation on the distribution of a release.',
  },
  {
    id: 'rel-dp-limits',
    sourceId: 'differential-privacy',
    targetId: 'dp-limits-and-interpretation',
    type: 'complicates',
    label: 'has limits described in',
    shortNote: 'DP bounds the additional influence of participation on a release. It does not rule out all real-world harms or conclusions about a group.',
  },
  {
    id: 'rel-eps-dp',
    sourceId: 'epsilon-and-delta',
    targetId: 'differential-privacy',
    type: 'governs',
    label: 'sets the parameters for',
    shortNote: 'Smaller epsilon provides stronger privacy usually at cost to accuracy; delta is an additional relaxation needing explicit justification.',
  },
  {
    id: 'rel-comp-dp',
    sourceId: 'composition-and-sensitivity',
    targetId: 'differential-privacy',
    type: 'governs',
    label: 'governs cumulative release of',
    shortNote: 'Multiple releases consume a combined privacy budget; sensitivity limits how much a protected person’s data can change a query.',
  },
  {
    id: 'rel-arch-dp',
    sourceId: 'central-vs-local-dp',
    targetId: 'differential-privacy',
    type: 'supports',
    label: 'compares trust models for',
    shortNote: 'Central DP protects released outputs from a trusted data holder; local DP randomizes before the holder sees the data, with different utility trade-offs.',
  },
  {
    id: 'rel-dp-fairness',
    sourceId: 'differential-privacy',
    targetId: 'group-and-individual-fairness',
    type: 'can-conflict-with',
    label: 'can add disparate error to',
    shortNote: 'DP can reduce individual disclosure risk but can add statistical error that affects small groups differently.',
  },

  // 4. Explanation, Transparency and Accountability
  {
    id: 'rel-transp-just',
    sourceId: 'transparency',
    targetId: 'justifiability',
    type: 'does-not-guarantee',
    label: 'does not guarantee',
    shortNote: 'Transparency does not automatically imply fairness or justifiability; explaining an unjustified decision does not justify it.',
  },
  {
    id: 'rel-explain-interp',
    sourceId: 'explainability',
    targetId: 'interpretability',
    type: 'is-often-confused-with',
    label: 'is often confused with',
    shortNote: 'Interpretability is the degree to which people can understand a model’s behavior; explainability is the ability to provide understandable, faithful reasons for an output.',
  },
  {
    id: 'rel-explain-epistemic',
    sourceId: 'explainability',
    targetId: 'epistemic-accessibility',
    type: 'supports',
    label: 'supports',
    shortNote: 'Understandable, faithful reasons or evidence enable affected persons to understand what was decided and what can be challenged.',
  },
  {
    id: 'rel-acronyms-confidentiality',
    sourceId: 'fat-fact-fast-acronyms',
    targetId: 'informational-privacy',
    type: 'differs-from',
    label: 'distinguishes confidentiality from',
    shortNote: 'Distinguish confidentiality (restricting unauthorized access) from privacy (appropriate treatment of people and their data).',
  },

  // 5. Responsibility, Foreseeability and Dual Use
  {
    id: 'rel-active-forward',
    sourceId: 'active-vs-passive-responsibility',
    targetId: 'forward-looking-responsibility',
    type: 'supports',
    label: 'manifests in',
    shortNote: 'Active responsibility is taking and exercising a role in securing an outcome; a person can also proactively investigate and repair past harm.',
  },
  {
    id: 'rel-blame-backward',
    sourceId: 'conditions-for-moral-blame',
    targetId: 'backward-looking-responsibility',
    type: 'depends-on',
    label: 'evaluates conditions for',
    shortNote: 'Knowledge/foreseeability and control are important to moral blame. Institutional responsibility to investigate and remedy harm can persist even where no individual blame is established.',
  },
  {
    id: 'rel-dual-forward',
    sourceId: 'dual-use-technology',
    targetId: 'forward-looking-responsibility',
    type: 'complicates',
    label: 'complicates',
    shortNote: 'A tool has dual-use potential if it can be used for beneficial and harmful purposes; "dual use = unintended use" is too narrow. Reasonable foreseeability matters.',
  },
  {
    id: 'rel-colling-forward',
    sourceId: 'precaution-and-dilemma-of-control',
    targetId: 'forward-looking-responsibility',
    type: 'complicates',
    label: 'constrains timing of',
    shortNote: 'Early in technology life, changes are easier but effects harder to predict; later, evidence improves but entrenched deployments are harder to change.',
  },
  {
    id: 'rel-many-backward',
    sourceId: 'problem-of-many-hands',
    targetId: 'backward-looking-responsibility',
    type: 'complicates',
    label: 'diffuses attribution in',
    shortNote: 'A harmful outcome can emerge from interactions among collectors, labelers, developers, managers, vendors, and deployers. Lack of a single culprit does not imply nobody has duties.',
  },

  // 6. Bias, Fairness and Justice
  {
    id: 'rel-stat-social',
    sourceId: 'statistical-vs-social-bias',
    targetId: 'algorithmic-optimization-bias',
    type: 'supports',
    label: 'helps distinguish sources of',
    shortNote: 'A statistically accurate estimate can still reproduce social disadvantage. The choice of target, loss function, or threshold needs separate scrutiny.',
  },
  {
    id: 'rel-label-policing',
    sourceId: 'label-measurement-bias',
    targetId: 'predictive-policing',
    type: 'can-distort',
    label: 'can distort',
    shortNote: 'The measured outcome differs from the outcome of interest: recorded arrests are not the same thing as all crimes committed; policing practices affect who is recorded.',
  },
  {
    id: 'rel-sampling-fairness',
    sourceId: 'sampling-selection-bias',
    targetId: 'group-and-individual-fairness',
    type: 'can-distort',
    label: 'distorts evaluation of',
    shortNote: 'A dataset may differ systematically from the target population because inclusion is uneven. Merely having different group counts is not automatically proof of unfairness.',
  },
  {
    id: 'rel-algo-opt-impossibility',
    sourceId: 'algorithmic-optimization-bias',
    targetId: 'group-and-individual-fairness',
    type: 'can-distort',
    label: 'can undermine',
    shortNote: 'Choices of target, loss, and threshold can create or amplify inequity even with an apparently balanced dataset.',
  },
  {
    id: 'rel-feedback-asymmetry',
    sourceId: 'interaction-bias-and-feedback-loops',
    targetId: 'predictive-policing',
    type: 'can-distort',
    label: 'can reinforce bias in',
    shortNote: 'A prediction can direct more patrols to one place, generating more records there and reinforcing later predictions.',
  },
  {
    id: 'rel-norm-rawls',
    sourceId: 'normative-ideals',
    targetId: 'rawls-justice-as-fairness',
    type: 'supports',
    label: 'can be examined through',
    shortNote: 'Rawls’s first principle concerns equal basic liberties; second requires fair equality of opportunity and difference principle (benefit least advantaged).',
  },
  {
    id: 'rel-group-impossibility',
    sourceId: 'group-and-individual-fairness',
    targetId: 'fairness-impossibility',
    type: 'can-conflict-with',
    label: 'governed by incompatibility in',
    shortNote: 'When underlying outcome rates differ across groups, an imperfect predictor generally cannot satisfy calibration and equalized odds at once.',
  },
  {
    id: 'rel-traps-fairness',
    sourceId: 'five-sociotechnical-traps',
    targetId: 'group-and-individual-fairness',
    type: 'can-distort',
    label: 'diagnoses formalism in',
    shortNote: 'Formalism trap mistakes a mathematical fairness definition for the full procedural, contextual and contested social concept.',
  },
  {
    id: 'rel-traps-policing',
    sourceId: 'five-sociotechnical-traps',
    targetId: 'predictive-policing',
    type: 'can-distort',
    label: 'diagnoses solutionism in',
    shortNote: 'Solutionism trap presumes a technical tool is needed when the best intervention may be policy, staffing, service design or not deploying.',
  },

  // 7. High-Stakes Applications
  {
    id: 'rel-med-bioethics',
    sourceId: 'precision-and-predictive-medicine',
    targetId: 'biomedical-ethics-principles',
    type: 'depends-on',
    label: 'evaluated against',
    shortNote: 'Assessment needs external validation, calibration, clinical utility, and the four principles: autonomy, beneficence, non-maleficence, justice.',
  },
  {
    id: 'rel-trust-explain',
    sourceId: 'clinical-trust-and-explainability',
    targetId: 'explainability',
    type: 'depends-on',
    label: 'requires actionable rationales from',
    shortNote: 'A confidence score alone is not a clinical explanation. A clinician’s nominal final authority is insufficient if they cannot understand, question, override or safely ignore a tool.',
  },
  {
    id: 'rel-policing-just',
    sourceId: 'predictive-policing',
    targetId: 'justifiability',
    type: 'depends-on',
    label: 'requires scrutiny of',
    shortNote: 'Risks include feedback loops in recorded crime, discriminatory surveillance, false accusations, and diffusion of responsibility.',
  },
  {
    id: 'rel-ai-act-policing',
    sourceId: 'policing-oversight-and-ai-act',
    targetId: 'predictive-policing',
    type: 'governs',
    label: 'sets limits on',
    shortNote: 'The EU AI Act prohibits certain individual criminal-offence risk assessments based solely on profiling or personality traits.',
  },
  {
    id: 'rel-gdpr-informational', sourceId: 'gdpr-baseline-principles', targetId: 'informational-privacy',
    type: 'supports', label: 'sets safeguards for',
    shortNote: 'Purpose limitation, data minimization, and retention limits address how personal data are collected and used.',
  },
  {
    id: 'rel-auto-explanation', sourceId: 'automated-decisions-article-22', targetId: 'explainability',
    type: 'governs', label: 'creates specified duties for',
    shortNote: 'For covered automated decisions, people need meaningful information about the logic and consequences, alongside applicable safeguards.',
  },
  {
    id: 'rel-transparency-knowledge', sourceId: 'transparency', targetId: 'epistemic-accessibility',
    type: 'supports', label: 'can improve',
    shortNote: 'Relevant information needs to be available in a form its audience can understand and use.',
  },
  {
    id: 'rel-explanation-justification', sourceId: 'explainability', targetId: 'justifiability',
    type: 'does-not-guarantee', label: 'does not establish',
    shortNote: 'Knowing why a decision was made does not settle whether its purpose, procedure, or outcome is acceptable.',
  },
  {
    id: 'rel-dual-precaution', sourceId: 'dual-use-technology', targetId: 'precaution-and-dilemma-of-control',
    type: 'supports', label: 'calls for',
    shortNote: 'Plausible harmful uses are reasons to assess uncertainty, use proportionate safeguards, and retain the ability to change course.',
  },
  {
    id: 'rel-many-governance', sourceId: 'problem-of-many-hands', targetId: 'engineering-governance-dpia',
    type: 'supports', label: 'shows the need for',
    shortNote: 'Clear roles and records help establish who can stop deployment, investigate problems, and arrange remedies.',
  },
  {
    id: 'rel-ethics-explanation', sourceId: 'biomedical-ethics-principles', targetId: 'explainability',
    type: 'supports', label: 'gives reasons for',
    shortNote: 'Respecting patient autonomy requires usable information for accepting or refusing care.',
  },
  {
    id: 'rel-clinical-many', sourceId: 'clinical-trust-and-explainability', targetId: 'problem-of-many-hands',
    type: 'is-an-example-of', label: 'illustrates',
    shortNote: 'A clinician, hospital, vendor, and developer can share responsibility. The person clicking accept is not automatically responsible for everything.',
  },

  // ======================================================================
  // NEW RELATIONSHIPS — connecting new concepts
  // ======================================================================

  // Ethical frameworks inter-relationships
  {
    id: 'rel-conseq-deont', sourceId: 'consequentialism', targetId: 'deontological-ethics',
    type: 'can-conflict-with', label: 'can conflict with',
    shortNote: 'Consequentialism may permit an action for its outcomes that deontology forbids based on duties or rights.',
  },
  {
    id: 'rel-conseq-util', sourceId: 'utilitarianism-and-impartiality', targetId: 'consequentialism',
    type: 'is-a-type-of', label: 'is a type of',
    shortNote: 'Utilitarianism is a family of consequentialist theories focused specifically on overall welfare.',
  },
  {
    id: 'rel-virtue-conseq', sourceId: 'virtue-ethics', targetId: 'consequentialism',
    type: 'differs-from', label: 'differs from',
    shortNote: 'Virtue ethics centres on character and practical wisdom rather than calculating best consequences.',
  },
  {
    id: 'rel-virtue-deont', sourceId: 'virtue-ethics', targetId: 'deontological-ethics',
    type: 'differs-from', label: 'differs from',
    shortNote: 'Virtue ethics gives virtues the foundational role rather than duties, though it does not ignore them.',
  },
  {
    id: 'rel-kant-deont', sourceId: 'categorical-imperative', targetId: 'deontological-ethics',
    type: 'supports', label: 'is a principle within',
    shortNote: 'The categorical imperative is Kant\'s foundational principle within deontological ethics.',
  },
  {
    id: 'rel-veil-rawls', sourceId: 'veil-of-ignorance', targetId: 'rawls-justice-as-fairness',
    type: 'supports', label: 'is the method for',
    shortNote: 'The veil of ignorance is the hypothetical setting Rawls uses to derive his principles of justice.',
  },
  {
    id: 'rel-social-contract-veil', sourceId: 'social-contract-theories', targetId: 'veil-of-ignorance',
    type: 'supports', label: 'includes Rawls’s use of',
    shortNote: 'Rawls uses the veil of ignorance as a hypothetical device for choosing fair principles in his social contract approach.',
  },

  // Ethical reasoning connections
  {
    id: 'rel-facts-reasoning', sourceId: 'facts-and-ethical-judgments', targetId: 'reasoning-and-reasons',
    type: 'supports', label: 'guides',
    shortNote: 'Empirical reasons inform what to believe about a system; moral reasons help decide what ought to be done about it.',
  },
  {
    id: 'rel-intuitions-dilemmas', sourceId: 'moral-intuitions-and-reflective-equilibrium', targetId: 'ethical-dilemmas',
    type: 'supports', label: 'helps examine',
    shortNote: 'Reflective equilibrium tests conflicting intuitions and principles; an initial clash does not by itself establish a genuine dilemma.',
  },
  {
    id: 'rel-ethics-law-gdpr', sourceId: 'ethics-morality-law', targetId: 'gdpr-baseline-principles',
    type: 'differs-from', label: 'asks questions beyond',
    shortNote: 'Meeting GDPR duties matters, but legal compliance alone does not settle whether a particular data use is ethically justified.',
  },

  // Decision-making connections
  {
    id: 'rel-bounded-heuristics', sourceId: 'bounded-rationality-and-satisficing', targetId: 'heuristics-and-biases',
    type: 'supports', label: 'helps explain the use of',
    shortNote: 'Bounded rationality explains why people rely on heuristics — cognitive limits make exhaustive analysis impractical.',
  },
  {
    id: 'rel-dualprocess-heuristics', sourceId: 'dual-process-judgment', targetId: 'heuristics-and-biases',
    type: 'supports', label: 'helps examine',
    shortNote: 'Fast judgments can use heuristics; whether they lead to systematic error depends on the task and context.',
  },
  {
    id: 'rel-heuristics-statbias', sourceId: 'heuristics-and-biases', targetId: 'statistical-vs-social-bias',
    type: 'can-distort', label: 'can contribute to',
    shortNote: 'Human cognitive biases are one source of the biases that end up encoded in data and algorithmic systems.',
  },
  {
    id: 'rel-bounded-selfmgmt', sourceId: 'bounded-rationality-and-satisficing', targetId: 'privacy-self-management',
    type: 'complicates', label: 'undermines',
    shortNote: 'Bounded rationality explains why privacy self-management fails: users lack time and capacity to evaluate complex data terms.',
  },

  // Influence and nudging connections
  {
    id: 'rel-nudge-hyper', sourceId: 'choice-architecture-and-nudging', targetId: 'hypernudging',
    type: 'supports', label: 'is adapted in',
    shortNote: 'Hypernudging extends basic nudging with continuous, data-driven, personalised adaptation.',
  },
  {
    id: 'rel-hyper-autonomy', sourceId: 'hypernudging', targetId: 'situated-autonomy',
    type: 'complicates', label: 'can constrain',
    shortNote: 'Continually adapting what a person sees can change the conditions under which they choose, even when an opt-out remains available.',
  },
  {
    id: 'rel-nudge-critiques', sourceId: 'nudging-critiques', targetId: 'choice-architecture-and-nudging',
    type: 'complicates', label: 'questions the legitimacy of',
    shortNote: 'Ask whose goal a nudge serves, how it influences people, and whether the influence can be understood and challenged.',
  },
  {
    id: 'rel-selfmgmt-control', sourceId: 'privacy-self-management', targetId: 'control-account',
    type: 'supports', label: 'tries to put into practice',
    shortNote: 'Individual notices and settings are one way to exercise control, but limited time and bargaining power can make that control ineffective.',
  },
  {
    id: 'rel-gerrymander-hyper', sourceId: 'digital-gerrymandering', targetId: 'hypernudging',
    type: 'supports', label: 'can use',
    shortNote: 'Political information exposure can be adapted to observed behavior, but digital gerrymandering need not always be an adaptive hypernudge.',
  },
  {
    id: 'rel-situated-decisional', sourceId: 'situated-autonomy', targetId: 'decisional-privacy',
    type: 'supports', label: 'enriches',
    shortNote: 'Situated autonomy deepens the analysis of decisional privacy by examining whether choice conditions are actually met.',
  },
  {
    id: 'rel-guidance-art22', sourceId: 'automated-decision-and-guidance-systems', targetId: 'automated-decisions-article-22',
    type: 'is-often-confused-with', label: 'is often confused with',
    shortNote: 'Not every decision-guidance system falls under Article 22; the article specifically covers solely automated decisions with legal or significant effects.',
  },
  {
    id: 'rel-nudge-chilling', sourceId: 'hypernudging', targetId: 'chilling-effect',
    type: 'can-create', label: 'can contribute to',
    shortNote: 'Awareness of continuous behavioural monitoring and adaptation can produce chilling effects on expression and exploration.',
  },

  // Threat modeling connections
  {
    id: 'rel-stride-linddun', sourceId: 'stride', targetId: 'linddun',
    type: 'differs-from', label: 'differs from',
    shortNote: 'STRIDE addresses security threats (unauthorized access); LINDDUN addresses privacy threats (including authorised but inappropriate use).',
  },
  {
    id: 'rel-security-privacy', sourceId: 'security-vs-privacy', targetId: 'data-protection-vs-privacy',
    type: 'supports', label: 'parallels',
    shortNote: 'Both distinctions make the same core point: protecting data from intruders is necessary but not sufficient for privacy.',
  },
  {
    id: 'rel-pets-dp', sourceId: 'privacy-enhancing-technologies', targetId: 'differential-privacy',
    type: 'supports', label: 'includes',
    shortNote: 'Differential privacy is one of several PETs; it addresses statistical disclosure risk, while others address different threat types.',
  },
  {
    id: 'rel-linddun-dpia', sourceId: 'linddun', targetId: 'engineering-governance-dpia',
    type: 'supports', label: 'informs',
    shortNote: 'A LINDDUN threat model can be a key input to a Data Protection Impact Assessment.',
  },
  {
    id: 'rel-hardsoft-anon', sourceId: 'hard-and-soft-privacy', targetId: 'anonymity-vs-pseudonymity',
    type: 'supports', label: 'offers design options alongside',
    shortNote: 'Avoiding disclosure and governing disclosed data are different design approaches; neither maps one-to-one onto anonymity or pseudonymity.',
  },
  {
    id: 'rel-unlinkability-anon', sourceId: 'unlinkability-and-anonymity-sets', targetId: 'anonymity-vs-pseudonymity',
    type: 'supports', label: 'refines',
    shortNote: 'Anonymity sets and unlinkability provide precise technical criteria for evaluating pseudonymisation and anonymisation claims.',
  },
  {
    id: 'rel-threatmodel-governance', sourceId: 'threat-modeling-process', targetId: 'engineering-governance-dpia',
    type: 'supports', label: 'feeds into',
    shortNote: 'Threat modeling identifies the risks that a DPIA then assesses for necessity, proportionality and mitigations.',
  },
  {
    id: 'rel-repudiation-stride-linddun', sourceId: 'repudiation-and-non-repudiation', targetId: 'linddun',
    type: 'can-conflict-with', label: 'creates tension with',
    shortNote: 'STRIDE wants non-repudiation for security; LINDDUN warns it can become a privacy threat when deniability is needed.',
  },
  {
    id: 'rel-accountability-manyh', sourceId: 'accountability-for-data-systems', targetId: 'problem-of-many-hands',
    type: 'supports', label: 'addresses',
    shortNote: 'Structured accountability review answers the question of who is responsible that the problem of many hands makes difficult.',
  },
];
