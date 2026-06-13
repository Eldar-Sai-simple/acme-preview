import React, { useEffect, useMemo, useRef, useState } from "https://esm.sh/react@19.2.7";
import { createRoot } from "https://esm.sh/react-dom@19.2.7/client";
import { motion } from "https://esm.sh/motion@12.40.0/react";

const h = React.createElement;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const storyCards = [
  {
    id: "solutions",
    side: "left",
    step: 0.12,
    label: "01 / Market",
    title: "Turning grain volume into high-value biotechnology.",
    copy:
      "ACME frames deep grain processing as a strategic upgrade: wheat, corn and barley become organic acids, amino acids, starch sugars, vitamins, enzymes, feed proteins and advanced bio-based ingredients.",
    chips: ["124.9M tons grain", "82.4M tons wheat", "13.25M tons corn", "15-20% deep processing"],
  },
  {
    id: "process",
    side: "right",
    step: 0.32,
    label: "02 / Engineering",
    title: "From industrial strains to a commissioned production line.",
    copy:
      "The company covers targeted cultivation, fermentation, conversion, by-product utilization, purification, automation and quality control as one integrated engineering system.",
    metrics: [
      ["Strains", "100+ proprietary industrial strains"],
      ["Process", "fermentation, extraction, separation"],
      ["Delivery", "equipment, startup, training, service"],
    ],
  },
  {
    side: "left compact",
    step: 0.52,
    label: "03 / Portfolio",
    title: "The portfolio is much wider than acids and amino acids.",
    copy:
      "The product roadmap expands from starch and glucose into polyols, vitamins, microbial polysaccharides, enzymes, feed products, health ingredients and API intermediates.",
  },
  {
    id: "impact",
    side: "right",
    step: 0.72,
    label: "04 / Partnership",
    title: "A lower-risk path for new deep-processing projects.",
    copy:
      "ACME positions its offer as a turnkey partnership: proven Chinese industrial experience, adaptation to local grain varieties and a full chain from technology and equipment to after-sales support.",
    stats: [
      ["500B+", "RMB fermentation industry scale in China"],
      ["2000+", "large industrial enterprises in the chain"],
      ["360", "degree process and service coverage"],
    ],
  },
];

const concepts = [
  ["left", "concept-organic", 0.18, "01", "Organic Acids", "citric, lactic, itaconic, succinic, malic, gluconic"],
  ["right", "concept-amino", 0.34, "02", "Amino Acids", "lysine, threonine, tryptophan, valine, isoleucine"],
  ["left", "concept-starch", 0.52, "03", "Starch Sugars", "glucose, fructose syrup, trehalose and polyols"],
  ["right", "concept-automation", 0.69, "04", "Automation", "fermenters, purification, monitoring and lab control"],
  ["top", "concept-green", 0.86, "05", "Green Factory", "energy saving, heat recovery and low-emission processing"],
].map(([side, className, step, index, title, copy]) => ({ side, className, step, index, title, copy }));

const processSteps = [
  ["Raw materials", "wheat, corn, barley, molasses, cassava, sweet sorghum, straw"],
  ["Preparation", "cleaning, milling, starch A/B separation, gluten and by-product fractions"],
  ["Fermentation", "Aspergillus niger, Corynebacterium, E. coli and specialized strains"],
  ["Purification", "separation, extraction, crystallization and quality assurance"],
  ["Products", "acids, amino acids, sugars, vitamins, enzymes, feed and API intermediates"],
];

const technologyBlocks = [
  ["Strain library", "More than 100 proprietary high-performance industrial strains adapted to different raw materials."],
  ["Starch fermentation", "Wheat starch A, A+B and B routes for citric acid, xanthan gum, yeast and crystalline glucose."],
  ["Continuous processes", "Continuous Aspergillus niger cultivation and continuous lactic acid fermentation technologies."],
  ["Non-grain feedstocks", "Beet, molasses, sugarcane, cassava, sweet sorghum, straw and other carbon sources."],
  ["Energy and emissions", "Heat recovery, foam suppression, low-carbon corn sugar technology and low-emission processing."],
  ["Flexible lines", "Multi-product production on one line with stronger by-product utilization and added value."],
];

const turnkeySteps = [
  {
    title: "Project assessment",
    label: "01",
    output: "A clear technical and commercial basis for the project.",
    detail: "Feedstock profile, target products, site constraints, utilities, market demand and investment logic are evaluated before the process route is locked.",
    tags: ["feedstock", "capacity", "market fit"],
  },
  {
    title: "Process package",
    label: "02",
    output: "A technology route that fits the selected raw material.",
    detail: "ACME defines strain strategy, fermentation logic, conversion stages, purification flow, by-product handling and energy recovery options.",
    tags: ["strains", "fermentation", "purification"],
  },
  {
    title: "Equipment & layout",
    label: "03",
    output: "A plant configuration ready for procurement and construction.",
    detail: "Fermenters, separation systems, crystallization, drying, utilities, storage and process areas are arranged around output, hygiene and maintenance needs.",
    tags: ["equipment", "layout", "utilities"],
  },
  {
    title: "Automation & QA",
    label: "04",
    output: "Stable production with controlled parameters and traceability.",
    detail: "Instrumentation, process control, monitoring, lab quality control and operating recipes are integrated to keep yield and product quality consistent.",
    tags: ["control", "monitoring", "quality"],
  },
  {
    title: "Commissioning",
    label: "05",
    output: "A running line with trained operators and verified performance.",
    detail: "Installation supervision, cold and hot commissioning, trial production, troubleshooting and operator training move the plant into production.",
    tags: ["startup", "training", "performance"],
  },
  {
    title: "Lifecycle service",
    label: "06",
    output: "Long-term optimization after startup.",
    detail: "After-sales support, process upgrades, energy optimization, product expansion and multi-product line adjustments keep the asset competitive.",
    tags: ["service", "upgrade", "optimization"],
  },
];

const productFamilies = [
  {
    key: "starch",
    title: "Starch & Modified Starch",
    feedstock: ["Wheat", "Corn"],
    route: ["cleaning", "milling", "starch A/B separation", "modification"],
    value: "Base platform for food, paper, fermentation and downstream conversion.",
    byproducts: ["bran", "gluten", "corn germ", "fiber slurry"],
    items: ["starch A/B", "dextrins", "oxidized starch", "cross-linked starch", "porous starch", "resistant starch"],
  },
  {
    key: "sugars",
    title: "Starch Sugars & Polyols",
    feedstock: ["Wheat starch", "Corn starch"],
    route: ["starch slurry", "saccharification", "glucose", "hydrogenation / isomerization"],
    value: "A flexible sugar platform for fermentation, sweeteners and sugar alcohols.",
    byproducts: ["protein powder", "corn oil", "germ meal"],
    items: ["glucose", "fructose syrup", "trehalose", "sorbitol", "mannitol", "maltitol", "erythritol", "xylitol"],
  },
  {
    key: "amino",
    title: "Amino Acids",
    feedstock: ["Glucose", "Corn steep liquor"],
    route: ["strain cultivation", "fermentation", "separation", "crystallization"],
    value: "Feed and food-grade amino acid production from glucose-based fermentation.",
    byproducts: ["feed yeast", "protein feed", "fermentation residues"],
    items: ["L-lysine", "threonine", "tryptophan", "glutamic acid", "arginine", "valine", "leucine", "isoleucine"],
  },
  {
    key: "acids",
    title: "Organic Acids",
    feedstock: ["Glucose", "Starch A/B", "Molasses"],
    route: ["strain library", "aerobic fermentation", "extraction", "purification"],
    value: "Industrial routes for high-volume acids and specialty bio-based molecules.",
    byproducts: ["gypsum reduction route", "heat recovery", "process condensate reuse"],
    items: ["lactic acid", "citric acid", "itaconic acid", "succinic acid", "malic acid", "gluconic acid"],
  },
  {
    key: "bioactives",
    title: "Vitamins & Bioactives",
    feedstock: ["Glucose", "Specialized carbon sources"],
    route: ["precision strain", "controlled fermentation", "refining", "drying"],
    value: "Higher-margin ingredients for nutrition, health products and specialty markets.",
    byproducts: ["biomass reuse", "mother liquor recovery"],
    items: ["vitamin C", "B12", "B2", "niacinamide", "GABA", "L-theanine", "coenzyme Q10", "beta-glucan"],
  },
  {
    key: "specialty",
    title: "Polysaccharides, Enzymes & APIs",
    feedstock: ["Glucose", "Specialty media"],
    route: ["bioconversion", "enzyme production", "membrane separation", "high-purity finishing"],
    value: "Specialty routes for gums, enzymes, pharmaceutical intermediates and API products.",
    byproducts: ["cell biomass", "recovered salts", "water reuse streams"],
    items: ["xanthan gum", "pullulan", "gellan gum", "hyaluronic acid", "amylase", "glucoamylase", "lipoic acid", "levodopa"],
  },
];

function Header() {
  return h(
    "header",
    { className: "site-header", "aria-label": "Main navigation" },
    h(
      "a",
      { className: "brand", href: "#top", "aria-label": "ACME Bio Engineering home" },
      h("img", { className: "brand-logo", src: "assets/acme-logo-mark.png", alt: "" }),
      h("span", null, h("strong", null, "ACME"), h("small", null, "Shandong Acme Bio-engineering")),
    ),
    h(
      "nav",
      null,
      h("a", { href: "#solutions" }, "Market"),
      h("a", { href: "#process" }, "Engineering"),
      h("a", { href: "#products" }, "Products"),
      h("a", { className: "nav-cta", href: "#contact" }, "Contact"),
    ),
  );
}

function Hero() {
  return h(
    "section",
    { className: "hero", "aria-label": "ACME Bio Engineering introduction" },
    h("img", {
      className: "hero-image",
      src: "assets/biofactory-hero.png",
      alt: "Bright biotechnology laboratory and sustainable biofactory",
    }),
    h("div", { className: "hero-overlay" }),
    h(
      motion.div,
      {
        className: "hero-content",
        initial: { opacity: 0, y: 26 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      },
      h("p", { className: "eyebrow" }, "Deep grain processing / biotech engineering"),
      h("h1", null, "Biotechnology for the next era of grain processing"),
      h(
        "p",
        { className: "hero-copy" },
        "ACME combines mature industrialization with modern biotechnology: from raw material strategy and industrial strains to fermentation plants, purification, automation and commissioning.",
      ),
      h(
        "div",
        { className: "hero-actions" },
        h("a", { className: "primary-action", href: "#growth" }, "Explore capabilities"),
        h("a", { className: "secondary-action", href: "#products" }, "Product map"),
      ),
      h(
        motion.div,
        {
          className: "hero-proof",
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.25, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        },
        [
          ["100+", "proprietary industrial strains"],
          ["6", "turnkey project stages"],
          ["500B+", "RMB China fermentation industry scale"],
        ].map(([value, label]) =>
          h("span", { key: label }, h("strong", null, value), label),
        ),
      ),
    ),
    h(
      motion.div,
      {
        className: "hero-rail",
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.42, duration: 0.55 },
      },
      h("a", { href: "#turnkey" }, "Turnkey engineering"),
      h("a", { href: "#technologies" }, "Technology route"),
      h("a", { href: "#products" }, "Product universe"),
      h("a", { href: "#contact" }, "Project assessment"),
    ),
    h("div", { className: "scroll-hint", "aria-hidden": "true" }, h("span")),
  );
}

function LivingBackdrop() {
  return h(
    "div",
    { className: "living-backdrop", "aria-hidden": "true" },
    h("div", { className: "bio-orbit orbit-a" }, h("span"), h("span"), h("span")),
    h("div", { className: "bio-orbit orbit-b" }, h("span"), h("span"), h("span")),
    h("div", { className: "tank-ghost tank-left" }),
    h("div", { className: "tank-ghost tank-right" }),
    h("div", { className: "flow-line flow-a" }),
    h("div", { className: "flow-line flow-b" }),
  );
}

function Stem({ progress }) {
  return h(
    "div",
    { className: "stem-wrap", "aria-hidden": "true" },
    h(
      "svg",
      { className: "stem-svg", viewBox: "0 0 260 1780", role: "img" },
      h(
        "defs",
        null,
        h(
          "linearGradient",
          { id: "stemGradient", x1: "0", x2: "0", y1: "0", y2: "1" },
          h("stop", { offset: "0%", stopColor: "#1eaa71" }),
          h("stop", { offset: "45%", stopColor: "#00a8bf" }),
          h("stop", { offset: "100%", stopColor: "#174c3f" }),
        ),
        h(
          "filter",
          { id: "stemGlow", x: "-40%", y: "-10%", width: "180%", height: "120%" },
          h("feGaussianBlur", { stdDeviation: "5", result: "blur" }),
          h("feColorMatrix", {
            in: "blur",
            type: "matrix",
            values: "0 0 0 0 0.05 0 0 0 0 0.65 0 0 0 0 0.43 0 0 0 .5 0",
          }),
          h("feMerge", null, h("feMergeNode"), h("feMergeNode", { in: "SourceGraphic" })),
        ),
      ),
      h(motion.path, {
        className: "stem-path",
        pathLength: 1,
        initial: false,
        animate: { pathLength: progress },
        transition: { duration: 0.15, ease: "linear" },
        d: "M130 1760 C 106 1540, 168 1420, 126 1255 C 88 1107, 174 984, 132 827 C 92 676, 164 542, 130 384 C 102 253, 152 145, 130 28",
      }),
      [
        ["leaf leaf-1", "M127 1392 C 64 1358, 42 1288, 52 1230 C 112 1245, 157 1294, 127 1392Z"],
        ["leaf leaf-2", "M134 1120 C 205 1094, 231 1027, 222 968 C 160 981, 110 1029, 134 1120Z"],
        ["leaf leaf-3", "M126 845 C 58 812, 36 742, 49 681 C 112 697, 157 750, 126 845Z"],
        ["leaf leaf-4", "M135 560 C 203 528, 233 463, 225 404 C 162 414, 111 465, 135 560Z"],
      ].map(([className, d]) => h("g", { className, key: className }, h("path", { d }))),
      h("g", { className: "bloom" }, h("path", { d: "M130 37 C 100 69, 98 114, 130 146 C 162 114, 160 69, 130 37Z" })),
    ),
    h("div", { className: "progress-orb" }),
  );
}

function ConceptLeaves({ progress }) {
  return h(
    "div",
    { className: "concept-leaves", "aria-label": "ACME core capabilities" },
    concepts.map((concept) =>
      h(
        motion.div,
        {
          key: concept.title,
          className: `concept-leaf concept-${concept.side} ${concept.className}`,
          initial: false,
          animate:
            progress > concept.step
              ? { opacity: 1, scale: 1, y: 0, rotate: 0 }
              : { opacity: 0, scale: 0.62, y: 24, rotate: concept.side === "left" ? -15 : concept.side === "right" ? 15 : 0 },
          transition: { type: "spring", stiffness: 170, damping: 22 },
        },
        h("span", { className: "concept-index" }, concept.index),
        h("strong", null, concept.title),
        h("small", null, concept.copy),
      ),
    ),
  );
}

function StoryCard({ card, progress }) {
  return h(
    motion.article,
    {
      id: card.id,
      className: `story-card story-card-${card.side}`,
      initial: false,
      animate: progress > card.step ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 34, scale: 0.96 },
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
    h("span", { className: "node-label" }, card.label),
    h("h2", null, card.title),
    h("p", null, card.copy),
    card.chips && h("div", { className: "chip-grid" }, card.chips.map((chip) => h("span", { key: chip }, chip))),
    card.metrics &&
      h("ul", { className: "metric-list" }, card.metrics.map(([label, value]) => h("li", { key: label }, h("strong", null, label), h("span", null, value)))),
    card.stats && h("div", { className: "stat-row" }, card.stats.map(([value, label]) => h("span", { key: label }, h("strong", null, value), label))),
  );
}

function ContactPanel({ progress }) {
  return h(
    motion.article,
    {
      className: "contact-panel",
      id: "contact",
      initial: false,
      animate: progress > 0.9 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 34, scale: 0.96 },
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
    h(
      "div",
      null,
      h("span", { className: "node-label" }, "05 / Partnership"),
      h("h2", null, "Launch deep grain processing without a long trial-and-error cycle."),
      h("p", null, "ACME proposes customized turnkey solutions: technology, equipment, production process, training, service and adaptation to local raw materials."),
    ),
    h(
      "form",
      null,
      h("label", null, "Name", h("input", { type: "text", placeholder: "Your name" })),
      h(
        "label",
        null,
        "Project type",
        h(
          "select",
          null,
          h("option", null, "Integrated deep grain processing complex"),
          h("option", null, "Organic acid plant"),
          h("option", null, "Amino acid plant"),
          h("option", null, "Starch sugars / polyols"),
          h("option", null, "Automation or modernization"),
        ),
      ),
      h("label", null, "Message", h("textarea", { placeholder: "Raw material, target product, capacity and timeline" })),
      h("button", { type: "button" }, "Send inquiry"),
    ),
  );
}

function GrowthStage() {
  const stageRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const next = clamp((window.innerHeight * 0.42 - rect.top) / scrollable, 0, 1);
      setProgress(next);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const style = useMemo(
    () => ({
      "--growth": progress.toFixed(4),
      "--orb-y": Math.round(progress * Math.min(window.innerHeight * 0.72, 650)),
      "--bg-shift": progress.toFixed(4),
      "--bg-x": `${16 + progress * 28}%`,
      "--bg-y": `${28 + Math.sin(progress * Math.PI) * 22}%`,
    }),
    [progress],
  );

  return h(
    "section",
    {
      id: "growth",
      ref: stageRef,
      className: "growth-stage",
      "aria-label": "Scroll story",
      style,
      "data-leaf-1": progress > 0.16,
      "data-leaf-2": progress > 0.34,
      "data-leaf-3": progress > 0.52,
      "data-leaf-4": progress > 0.68,
      "data-bloom": progress > 0.88,
    },
    h(LivingBackdrop),
    h(Stem, { progress }),
    h(ConceptLeaves, { progress }),
    storyCards.map((card) => h(StoryCard, { key: card.label, card, progress })),
    h(ContactPanel, { progress }),
  );
}

function ProcessMap() {
  return h(
    "section",
    { className: "process-map", id: "technologies" },
    h(
      "div",
      { className: "section-heading" },
      h("span", { className: "node-label" }, "Technology route"),
      h("h2", null, "A complete route from raw grain to high-margin biotechnology products."),
      h("p", null, "The site now reflects ACME's real presentation: grain preparation, strain cultivation, fermentation, purification, by-product utilization and automated quality control."),
    ),
    h(
      "div",
      { className: "route-line" },
      processSteps.map(([title, copy], index) =>
        h(
          motion.div,
          {
            className: "route-node",
            key: title,
            initial: { opacity: 0, y: 26 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-80px" },
            transition: { delay: index * 0.08, duration: 0.45 },
          },
          h("span", null, `0${index + 1}`),
          h("strong", null, title),
          h("p", null, copy),
        ),
      ),
    ),
  );
}

function TechnologyPortfolio() {
  return h(
    "section",
    { className: "technology-portfolio" },
    h(
      "div",
      { className: "section-heading narrow" },
      h("span", { className: "node-label" }, "ACME technical portfolio"),
      h("h2", null, "Patented and applied technologies behind the engineering offer."),
    ),
    h(
      "div",
      { className: "technology-grid" },
      technologyBlocks.map(([title, copy], index) =>
        h(
          motion.article,
          {
            key: title,
            className: "technology-card",
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-70px" },
            transition: { delay: index * 0.05, duration: 0.42 },
          },
          h("span", null, String(index + 1).padStart(2, "0")),
          h("h3", null, title),
          h("p", null, copy),
        ),
      ),
    ),
  );
}

function TurnkeyEngineering() {
  const [activeIndex, setActiveIndex] = useState(1);
  const active = turnkeySteps[activeIndex];

  return h(
    "section",
    { className: "turnkey-engineering", id: "turnkey" },
    h(
      "div",
      { className: "turnkey-shell" },
      h(
        "div",
        { className: "turnkey-intro" },
        h("span", { className: "node-label" }, "Turnkey engineering"),
        h("h2", null, "From project idea to a running bio-based production line."),
        h(
          "p",
          null,
          "For industrial buyers, ACME is strongest when the technology is framed as a delivery system: assessment, process package, equipment, automation, commissioning and lifecycle service.",
        ),
        h(
          "div",
          { className: "turnkey-kpis" },
          h("span", null, h("strong", null, "6"), " project stages"),
          h("span", null, h("strong", null, "100+"), " strain library"),
          h("span", null, h("strong", null, "360"), " service model"),
        ),
      ),
      h(
        "div",
        { className: "turnkey-board" },
        h(
          "div",
          { className: "turnkey-timeline", role: "tablist", "aria-label": "Turnkey project stages" },
          turnkeySteps.map((step, index) =>
            h(
              "button",
              {
                key: step.title,
                type: "button",
                role: "tab",
                "aria-selected": index === activeIndex,
                className: index === activeIndex ? "turnkey-step is-active" : "turnkey-step",
                onClick: () => setActiveIndex(index),
                onMouseEnter: () => setActiveIndex(index),
              },
              h("span", null, step.label),
              h("strong", null, step.title),
              h("small", null, step.output),
            ),
          ),
        ),
        h(
          motion.aside,
          {
            key: active.title,
            className: "turnkey-detail",
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          },
          h("span", { className: "node-label" }, `Stage ${active.label}`),
          h("h3", null, active.title),
          h("p", null, active.detail),
          h("div", { className: "turnkey-tags" }, active.tags.map((tag) => h("span", { key: tag }, tag))),
          h("a", { className: "turnkey-cta", href: "#contact" }, "Request project assessment"),
        ),
      ),
    ),
  );
}

function ProductAtlas() {
  const [activeKey, setActiveKey] = useState(productFamilies[1].key);
  const active = productFamilies.find((family) => family.key === activeKey) || productFamilies[0];
  const flowColumns = [
    ["Feedstock", active.feedstock],
    ["Processing route", active.route],
    ["Products", active.items.slice(0, 6)],
    ["By-product value", active.byproducts],
  ];

  return h(
    "section",
    { className: "product-atlas", id: "products" },
    h(
      "div",
      { className: "section-heading" },
      h("span", { className: "node-label" }, "Product universe"),
      h("h2", null, "The product map expands far beyond one plant or one molecule."),
      h("p", null, "From wheat and corn streams, ACME's roadmap reaches starch, glucose, acids, amino acids, vitamins, microbial polysaccharides, enzymes, feed products and pharmaceutical intermediates."),
    ),
    h(
      "div",
      { className: "product-map-shell" },
      h(
        "div",
        { className: "product-tabs", role: "tablist", "aria-label": "Product families" },
        productFamilies.map((family, index) =>
          h(
            "button",
            {
              key: family.key,
              type: "button",
              role: "tab",
              "aria-selected": family.key === active.key,
              className: family.key === active.key ? "product-tab is-active" : "product-tab",
              onClick: () => setActiveKey(family.key),
              onMouseEnter: () => setActiveKey(family.key),
            },
            h("span", null, String(index + 1).padStart(2, "0")),
            family.title,
          ),
        ),
      ),
      h(
        motion.div,
        {
          key: active.key,
          className: "interactive-map",
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
        },
        h(
          "div",
          { className: "map-core" },
          flowColumns.map(([label, values], columnIndex) =>
            h(
              "div",
              { className: "map-column", key: label },
              h("span", { className: "map-column-label" }, label),
              h(
                "div",
                { className: "map-node-stack" },
                values.map((value, valueIndex) =>
                  h(
                    motion.span,
                    {
                      className: "map-node",
                      key: value,
                      initial: { opacity: 0, x: columnIndex === 0 ? -14 : 14 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: valueIndex * 0.035 + columnIndex * 0.08, duration: 0.3 },
                    },
                    value,
                  ),
                ),
              ),
            ),
          ),
          h(
            "svg",
            { className: "map-lines", viewBox: "0 0 1000 260", preserveAspectRatio: "none", "aria-hidden": "true" },
            h("path", { className: "map-line primary", d: "M90 130 C230 56 290 56 415 130 C540 204 610 204 720 130 C830 56 880 78 940 130" }),
            h("path", { className: "map-line secondary", d: "M90 178 C236 214 318 196 426 154 C540 110 614 82 724 118 C820 150 882 190 940 170" }),
          ),
        ),
        h(
          "aside",
          { className: "map-detail" },
          h("span", { className: "node-label" }, "Selected route"),
          h("h3", null, active.title),
          h("p", null, active.value),
          h("div", { className: "atlas-tags" }, active.items.map((item) => h("span", { key: item }, item))),
        ),
      ),
    ),
    h(
      "div",
      { className: "atlas-grid compact-atlas" },
      productFamilies.map((family, index) =>
        h(
          motion.article,
          {
            key: family.title,
            className: "atlas-card",
            initial: { opacity: 0, scale: 0.94 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true, margin: "-80px" },
            transition: { delay: index * 0.06, duration: 0.45 },
          },
          h("span", { className: "atlas-number" }, String(index + 1).padStart(2, "0")),
          h("h3", null, family.title),
          h("div", { className: "atlas-tags" }, family.items.map((item) => h("span", { key: item }, item))),
        ),
      ),
    ),
  );
}

function App() {
  return h(
    React.Fragment,
    null,
    h(Header),
    h("main", { id: "top" }, h(Hero), h(GrowthStage), h(ProcessMap), h(TechnologyPortfolio), h(TurnkeyEngineering), h(ProductAtlas)),
  );
}

createRoot(document.getElementById("root")).render(h(App));
