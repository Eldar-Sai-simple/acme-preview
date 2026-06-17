import React, { useEffect, useMemo, useRef, useState } from "../assets/vendor/react.js";
import { createRoot } from "../assets/vendor/react-dom-client.js";
import { motion } from "../assets/vendor/motion-react.js";

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

const enContent = {
  languageName: "English",
  nav: {
    brandSubtitle: "Shandong Acme Bio-engineering",
    market: "Market",
    engineering: "Engineering",
    products: "Products",
    contact: "Contact",
  },
  hero: {
    eyebrow: "Deep grain processing / biotech engineering",
    title: "Biotechnology for the next era of grain processing",
    copy:
      "ACME combines mature industrialization with modern biotechnology: from raw material strategy and industrial strains to fermentation plants, purification, automation and commissioning.",
    primary: "Explore capabilities",
    secondary: "Product map",
    imageAlt: "Bright biotechnology laboratory and sustainable biofactory",
    proof: [
      ["100+", "proprietary industrial strains"],
      ["6", "turnkey project stages"],
      ["500B+", "RMB China fermentation industry scale"],
    ],
    rail: ["Turnkey engineering", "Technology route", "Product universe", "Project assessment"],
  },
  storyCards,
  concepts,
  processSteps,
  technologyBlocks,
  turnkeySteps,
  contact: {
    label: "05 / Partnership",
    title: "Launch deep grain processing without a long trial-and-error cycle.",
    copy:
      "ACME proposes customized turnkey solutions: technology, equipment, production process, training, service and adaptation to local raw materials.",
    name: "Name",
    namePlaceholder: "Your name",
    projectType: "Project type",
    options: [
      "Integrated deep grain processing complex",
      "Organic acid plant",
      "Amino acid plant",
      "Starch sugars / polyols",
      "Automation or modernization",
    ],
    message: "Message",
    messagePlaceholder: "Raw material, target product, capacity and timeline",
    submit: "Send inquiry",
  },
  process: {
    label: "Technology route",
    title: "A complete route from raw grain to high-margin biotechnology products.",
    copy:
      "The site now reflects ACME's real presentation: grain preparation, strain cultivation, fermentation, purification, by-product utilization and automated quality control.",
  },
  technology: {
    label: "ACME technical portfolio",
    title: "Patented and applied technologies behind the engineering offer.",
  },
  turnkey: {
    label: "Turnkey engineering",
    title: "From project idea to a running bio-based production line.",
    copy:
      "For industrial buyers, ACME is strongest when the technology is framed as a delivery system: assessment, process package, equipment, automation, commissioning and lifecycle service.",
    kpis: [
      ["6", "project stages"],
      ["100+", "strain library"],
      ["360", "service model"],
    ],
    tabLabel: "Turnkey project stages",
    stagePrefix: "Stage",
    cta: "Request project assessment",
  },
  productFamilies,
  productAtlas: {
    label: "Product universe",
    title: "The product map expands far beyond one plant or one molecule.",
    copy:
      "From wheat and corn streams, ACME's roadmap reaches starch, glucose, acids, amino acids, vitamins, microbial polysaccharides, enzymes, feed products and pharmaceutical intermediates.",
    tabLabel: "Product families",
    flowLabels: ["Feedstock", "Processing route", "Products", "By-product value"],
    selected: "Selected route",
  },
};

const zhContent = {
  languageName: "中文",
  nav: {
    brandSubtitle: "山东艾克姆生物工程",
    market: "市场",
    engineering: "工程能力",
    products: "产品体系",
    contact: "联系",
  },
  hero: {
    eyebrow: "粮食深加工 / 生物工程",
    title: "面向粮食深加工新时代的生物技术",
    copy:
      "ACME 将成熟的工业化经验与现代生物技术结合，从原料路线、工业菌种，到发酵工厂、分离纯化、自动化控制和投产调试，提供完整工程方案。",
    primary: "了解核心能力",
    secondary: "查看产品图谱",
    imageAlt: "明亮的生物技术实验室与可持续生物工厂",
    proof: [
      ["100+", "自有工业菌种"],
      ["6", "交钥匙项目阶段"],
      ["500B+", "中国发酵产业规模"],
    ],
    rail: ["交钥匙工程", "技术路线", "产品体系", "项目评估"],
  },
  storyCards: [
    {
      id: "solutions",
      side: "left",
      step: 0.12,
      label: "01 / 市场",
      title: "将粮食资源转化为高附加值生物技术产品。",
      copy:
        "ACME 将粮食深加工视为产业升级路径：小麦、玉米和大麦可延伸为有机酸、氨基酸、淀粉糖、维生素、酶制剂、饲料蛋白和先进生物基原料。",
      chips: ["1.249亿吨粮食", "8240万吨小麦", "1325万吨玉米", "15-20%深加工"],
    },
    {
      id: "process",
      side: "right",
      step: 0.32,
      label: "02 / 工程",
      title: "从工业菌种到投产运行的完整生产线。",
      copy:
        "公司将定向育种、发酵转化、副产物利用、分离纯化、自动化控制和质量管理整合为一个可落地的工程系统。",
      metrics: [
        ["菌种", "100+自有工业菌种"],
        ["工艺", "发酵、萃取、分离、纯化"],
        ["交付", "设备、开车、培训、服务"],
      ],
    },
    {
      side: "left compact",
      step: 0.52,
      label: "03 / 产品",
      title: "产品体系不止有机酸和氨基酸。",
      copy:
        "产品路线从淀粉和葡萄糖继续延伸到糖醇、维生素、微生物多糖、酶制剂、饲料产品、健康原料和医药中间体。",
    },
    {
      id: "impact",
      side: "right",
      step: 0.72,
      label: "04 / 合作",
      title: "降低新建深加工项目试错成本。",
      copy:
        "ACME 将自身定位为交钥匙合作伙伴：以中国成熟工业经验为基础，适配当地粮食品种，覆盖技术、设备、投产和售后服务全链条。",
      stats: [
        ["500B+", "中国发酵产业规模"],
        ["2000+", "产业链大型企业"],
        ["360", "全流程工艺与服务覆盖"],
      ],
    },
  ],
  concepts: [
    ["left", "concept-organic", 0.18, "01", "有机酸", "柠檬酸、乳酸、衣康酸、丁二酸、苹果酸、葡萄糖酸"],
    ["right", "concept-amino", 0.34, "02", "氨基酸", "赖氨酸、苏氨酸、色氨酸、缬氨酸、异亮氨酸"],
    ["left", "concept-starch", 0.52, "03", "淀粉糖", "葡萄糖、果葡糖浆、海藻糖和糖醇"],
    ["right", "concept-automation", 0.69, "04", "自动化", "发酵罐、分离纯化、过程监测和实验室控制"],
    ["top", "concept-green", 0.86, "05", "绿色工厂", "节能、热回收和低排放深加工"],
  ].map(([side, className, step, index, title, copy]) => ({ side, className, step, index, title, copy })),
  processSteps: [
    ["原料", "小麦、玉米、大麦、糖蜜、木薯、甜高粱、秸秆"],
    ["预处理", "清理、粉碎、A/B淀粉分离、谷朊粉和副产物组分"],
    ["发酵", "黑曲霉、棒状杆菌、大肠杆菌及专用工业菌种"],
    ["纯化", "分离、萃取、结晶和质量控制"],
    ["产品", "有机酸、氨基酸、糖类、维生素、酶制剂、饲料和医药中间体"],
  ],
  technologyBlocks: [
    ["菌种库", "100多个自有高性能工业菌种，可适配不同原料和不同目标产品。"],
    ["淀粉发酵", "小麦A淀粉、A+B淀粉及B淀粉路线，可用于柠檬酸、黄原胶、酵母和结晶葡萄糖。"],
    ["连续工艺", "连续黑曲霉培养和连续乳酸发酵技术，提升运行稳定性和产能效率。"],
    ["非粮原料", "甜菜、糖蜜、甘蔗、木薯、甜高粱、秸秆等多种碳源路线。"],
    ["节能减排", "热回收、消泡控制、低碳玉米糖技术和低排放生产流程。"],
    ["柔性产线", "一条产线可适配多产品生产，并强化副产物综合利用和价值提升。"],
  ],
  turnkeySteps: [
    {
      title: "项目评估",
      label: "01",
      output: "形成清晰的技术与商业基础。",
      detail: "在确定工艺路线前，评估原料条件、目标产品、场地限制、公用工程、市场需求和投资逻辑。",
      tags: ["原料", "产能", "市场匹配"],
    },
    {
      title: "工艺包",
      label: "02",
      output: "匹配选定原料的技术路线。",
      detail: "ACME 定义菌种策略、发酵逻辑、转化步骤、纯化流程、副产物处理和能量回收方案。",
      tags: ["菌种", "发酵", "纯化"],
    },
    {
      title: "设备与布局",
      label: "03",
      output: "可进入采购和建设阶段的工厂配置。",
      detail: "围绕产能、卫生和维护要求配置发酵罐、分离系统、结晶、干燥、公用工程、仓储和生产区域。",
      tags: ["设备", "布局", "公用工程"],
    },
    {
      title: "自动化与质控",
      label: "04",
      output: "稳定生产、参数可控、过程可追溯。",
      detail: "整合仪表、过程控制、在线监测、实验室质控和操作配方，保持收率和产品质量稳定。",
      tags: ["控制", "监测", "质量"],
    },
    {
      title: "投产调试",
      label: "05",
      output: "完成运行验证并培训操作团队。",
      detail: "通过安装指导、冷态与热态调试、试生产、问题排查和操作培训，将产线推进到稳定生产。",
      tags: ["开车", "培训", "性能验证"],
    },
    {
      title: "生命周期服务",
      label: "06",
      output: "投产后的长期优化。",
      detail: "售后支持、工艺升级、能耗优化、产品扩展和多产品产线调整，帮助资产保持竞争力。",
      tags: ["服务", "升级", "优化"],
    },
  ],
  contact: {
    label: "05 / 合作",
    title: "减少漫长试错周期，启动粮食深加工项目。",
    copy: "ACME 提供定制化交钥匙方案：技术、设备、生产工艺、培训、服务，以及对当地原料的适配。",
    name: "姓名",
    namePlaceholder: "请输入姓名",
    projectType: "项目类型",
    options: ["综合粮食深加工园区", "有机酸工厂", "氨基酸工厂", "淀粉糖 / 糖醇", "自动化或技改"],
    message: "项目说明",
    messagePlaceholder: "原料、目标产品、产能和时间计划",
    submit: "发送咨询",
  },
  process: {
    label: "技术路线",
    title: "从原粮到高附加值生物技术产品的完整路径。",
    copy:
      "页面呈现 ACME 真实业务能力：粮食预处理、菌种培养、发酵、纯化、副产物利用和自动化质量控制。",
  },
  technology: {
    label: "ACME 技术组合",
    title: "支撑工程交付的专利与应用技术。",
  },
  turnkey: {
    label: "交钥匙工程",
    title: "从项目想法到投产运行的生物基生产线。",
    copy: "面向工业客户，ACME 的优势在于将技术转化为交付体系：评估、工艺包、设备、自动化、调试和全生命周期服务。",
    kpis: [
      ["6", "项目阶段"],
      ["100+", "菌种库"],
      ["360", "服务模式"],
    ],
    tabLabel: "交钥匙项目阶段",
    stagePrefix: "阶段",
    cta: "申请项目评估",
  },
  productFamilies: [
    {
      key: "starch",
      title: "淀粉与变性淀粉",
      feedstock: ["小麦", "玉米"],
      route: ["清理", "粉碎", "A/B淀粉分离", "改性"],
      value: "服务食品、造纸、发酵和下游转化的基础平台。",
      byproducts: ["麸皮", "谷朊粉", "玉米胚芽", "纤维浆"],
      items: ["A/B淀粉", "糊精", "氧化淀粉", "交联淀粉", "多孔淀粉", "抗性淀粉"],
    },
    {
      key: "sugars",
      title: "淀粉糖与糖醇",
      feedstock: ["小麦淀粉", "玉米淀粉"],
      route: ["淀粉乳", "糖化", "葡萄糖", "氢化 / 异构化"],
      value: "面向发酵、甜味剂和糖醇产品的柔性糖平台。",
      byproducts: ["蛋白粉", "玉米油", "胚芽粕"],
      items: ["葡萄糖", "果葡糖浆", "海藻糖", "山梨醇", "甘露醇", "麦芽糖醇", "赤藓糖醇", "木糖醇"],
    },
    {
      key: "amino",
      title: "氨基酸",
      feedstock: ["葡萄糖", "玉米浆"],
      route: ["菌种培养", "发酵", "分离", "结晶"],
      value: "以葡萄糖发酵为基础，生产饲料级和食品级氨基酸。",
      byproducts: ["饲料酵母", "蛋白饲料", "发酵残渣"],
      items: ["L-赖氨酸", "苏氨酸", "色氨酸", "谷氨酸", "精氨酸", "缬氨酸", "亮氨酸", "异亮氨酸"],
    },
    {
      key: "acids",
      title: "有机酸",
      feedstock: ["葡萄糖", "A/B淀粉", "糖蜜"],
      route: ["菌种库", "好氧发酵", "萃取", "纯化"],
      value: "适用于大宗有机酸和特色生物基分子的工业化路线。",
      byproducts: ["减石膏路线", "热回收", "工艺冷凝水回用"],
      items: ["乳酸", "柠檬酸", "衣康酸", "丁二酸", "苹果酸", "葡萄糖酸"],
    },
    {
      key: "bioactives",
      title: "维生素与活性成分",
      feedstock: ["葡萄糖", "专用碳源"],
      route: ["精准菌种", "受控发酵", "精制", "干燥"],
      value: "面向营养、健康产品和特色市场的高价值原料。",
      byproducts: ["菌体再利用", "母液回收"],
      items: ["维生素C", "B12", "B2", "烟酰胺", "GABA", "L-茶氨酸", "辅酶Q10", "β-葡聚糖"],
    },
    {
      key: "specialty",
      title: "多糖、酶制剂与原料药",
      feedstock: ["葡萄糖", "专用培养基"],
      route: ["生物转化", "酶生产", "膜分离", "高纯精制"],
      value: "用于胶体、酶制剂、医药中间体和原料药产品的特色路线。",
      byproducts: ["细胞生物质", "盐分回收", "水回用物流"],
      items: ["黄原胶", "普鲁兰多糖", "结冷胶", "透明质酸", "淀粉酶", "糖化酶", "硫辛酸", "左旋多巴"],
    },
  ],
  productAtlas: {
    label: "产品体系",
    title: "产品图谱远不止一座工厂或一种分子。",
    copy:
      "从小麦和玉米组分出发，ACME 的路线可延伸至淀粉、葡萄糖、有机酸、氨基酸、维生素、微生物多糖、酶制剂、饲料产品和医药中间体。",
    tabLabel: "产品族",
    flowLabels: ["原料", "工艺路线", "产品", "副产物价值"],
    selected: "当前路线",
  },
};

const languages = { en: enContent, zh: zhContent };
const getInitialLanguage = () => {
  try {
    return localStorage.getItem("acme-language") === "zh" ? "zh" : "en";
  } catch {
    return "en";
  }
};

function Header({ content, language, onLanguageChange }) {
  return h(
    "header",
    { className: "site-header", "aria-label": "Main navigation" },
    h(
      "a",
      { className: "brand", href: "#top", "aria-label": "ACME Bio Engineering home" },
      h("img", { className: "brand-logo", src: "assets/acme-logo-mark.png", alt: "" }),
      h("span", null, h("strong", null, "ACME"), h("small", null, content.nav.brandSubtitle)),
    ),
    h(
      "nav",
      null,
      h("a", { href: "#solutions" }, content.nav.market),
      h("a", { href: "#process" }, content.nav.engineering),
      h("a", { href: "#products" }, content.nav.products),
      h("a", { className: "nav-cta", href: "#contact" }, content.nav.contact),
      h(
        "div",
        { className: "language-switch", role: "group", "aria-label": "Language selector" },
        h(
          "button",
          {
            type: "button",
            className: language === "en" ? "is-active" : "",
            onClick: () => onLanguageChange("en"),
            "aria-pressed": language === "en",
          },
          "EN",
        ),
        h(
          "button",
          {
            type: "button",
            className: language === "zh" ? "is-active" : "",
            onClick: () => onLanguageChange("zh"),
            "aria-pressed": language === "zh",
          },
          "中文",
        ),
      ),
    ),
  );
}

function Hero({ content }) {
  return h(
    "section",
    { className: "hero", "aria-label": "ACME Bio Engineering introduction" },
    h("img", {
      className: "hero-image",
      src: "assets/biofactory-hero.png",
      alt: content.hero.imageAlt,
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
      h("p", { className: "eyebrow" }, content.hero.eyebrow),
      h("h1", null, content.hero.title),
      h("p", { className: "hero-copy" }, content.hero.copy),
      h(
        "div",
        { className: "hero-actions" },
        h("a", { className: "primary-action", href: "#growth" }, content.hero.primary),
        h("a", { className: "secondary-action", href: "#products" }, content.hero.secondary),
      ),
      h(
        motion.div,
        {
          className: "hero-proof",
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.25, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        },
        content.hero.proof.map(([value, label]) =>
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
      h("a", { href: "#turnkey" }, content.hero.rail[0]),
      h("a", { href: "#technologies" }, content.hero.rail[1]),
      h("a", { href: "#products" }, content.hero.rail[2]),
      h("a", { href: "#contact" }, content.hero.rail[3]),
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

function ConceptLeaves({ progress, concepts }) {
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

function ContactPanel({ progress, content }) {
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
      h("span", { className: "node-label" }, content.contact.label),
      h("h2", null, content.contact.title),
      h("p", null, content.contact.copy),
    ),
    h(
      "form",
      null,
      h("label", null, content.contact.name, h("input", { type: "text", placeholder: content.contact.namePlaceholder })),
      h(
        "label",
        null,
        content.contact.projectType,
        h(
          "select",
          null,
          content.contact.options.map((option) => h("option", { key: option }, option)),
        ),
      ),
      h("label", null, content.contact.message, h("textarea", { placeholder: content.contact.messagePlaceholder })),
      h("button", { type: "button" }, content.contact.submit),
    ),
  );
}

function GrowthStage({ content }) {
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
    h(ConceptLeaves, { progress, concepts: content.concepts }),
    content.storyCards.map((card) => h(StoryCard, { key: card.label, card, progress })),
    h(ContactPanel, { progress, content }),
  );
}

function ProcessMap({ content }) {
  return h(
    "section",
    { className: "process-map", id: "technologies" },
    h(
      "div",
      { className: "section-heading" },
      h("span", { className: "node-label" }, content.process.label),
      h("h2", null, content.process.title),
      h("p", null, content.process.copy),
    ),
    h(
      "div",
      { className: "route-line" },
      content.processSteps.map(([title, copy], index) =>
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

function TechnologyPortfolio({ content }) {
  return h(
    "section",
    { className: "technology-portfolio" },
    h(
      "div",
      { className: "section-heading narrow" },
      h("span", { className: "node-label" }, content.technology.label),
      h("h2", null, content.technology.title),
    ),
    h(
      "div",
      { className: "technology-grid" },
      content.technologyBlocks.map(([title, copy], index) =>
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

function TurnkeyEngineering({ content }) {
  const [activeIndex, setActiveIndex] = useState(1);
  const active = content.turnkeySteps[activeIndex] || content.turnkeySteps[0];

  return h(
    "section",
    { className: "turnkey-engineering", id: "turnkey" },
    h(
      "div",
      { className: "turnkey-shell" },
      h(
        "div",
        { className: "turnkey-intro" },
        h("span", { className: "node-label" }, content.turnkey.label),
        h("h2", null, content.turnkey.title),
        h("p", null, content.turnkey.copy),
        h(
          "div",
          { className: "turnkey-kpis" },
          content.turnkey.kpis.map(([value, label]) => h("span", { key: label }, h("strong", null, value), ` ${label}`)),
        ),
      ),
      h(
        "div",
        { className: "turnkey-board" },
        h(
          "div",
          { className: "turnkey-timeline", role: "tablist", "aria-label": content.turnkey.tabLabel },
          content.turnkeySteps.map((step, index) =>
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
          h("span", { className: "node-label" }, `${content.turnkey.stagePrefix} ${active.label}`),
          h("h3", null, active.title),
          h("p", null, active.detail),
          h("div", { className: "turnkey-tags" }, active.tags.map((tag) => h("span", { key: tag }, tag))),
          h("a", { className: "turnkey-cta", href: "#contact" }, content.turnkey.cta),
        ),
      ),
    ),
  );
}

function ProductAtlas({ content }) {
  const [activeKey, setActiveKey] = useState(content.productFamilies[1].key);
  useEffect(() => {
    setActiveKey((key) => (content.productFamilies.some((family) => family.key === key) ? key : content.productFamilies[1].key));
  }, [content]);
  const active = content.productFamilies.find((family) => family.key === activeKey) || content.productFamilies[0];
  const flowColumns = [
    [content.productAtlas.flowLabels[0], active.feedstock],
    [content.productAtlas.flowLabels[1], active.route],
    [content.productAtlas.flowLabels[2], active.items.slice(0, 6)],
    [content.productAtlas.flowLabels[3], active.byproducts],
  ];

  return h(
    "section",
    { className: "product-atlas", id: "products" },
    h(
      "div",
      { className: "section-heading" },
      h("span", { className: "node-label" }, content.productAtlas.label),
      h("h2", null, content.productAtlas.title),
      h("p", null, content.productAtlas.copy),
    ),
    h(
      "div",
      { className: "product-map-shell" },
      h(
        "div",
        { className: "product-tabs", role: "tablist", "aria-label": content.productAtlas.tabLabel },
        content.productFamilies.map((family, index) =>
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
          h("span", { className: "node-label" }, content.productAtlas.selected),
          h("h3", null, active.title),
          h("p", null, active.value),
          h("div", { className: "atlas-tags" }, active.items.map((item) => h("span", { key: item }, item))),
        ),
      ),
    ),
    h(
      "div",
      { className: "atlas-grid compact-atlas" },
      content.productFamilies.map((family, index) =>
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
  const [language, setLanguage] = useState(getInitialLanguage);
  const content = languages[language];

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    try {
      localStorage.setItem("acme-language", language);
    } catch {
      // Ignore storage failures in privacy-restricted browsers.
    }
  }, [language]);

  return h(
    React.Fragment,
    null,
    h(Header, { content, language, onLanguageChange: setLanguage }),
    h(
      "main",
      { id: "top" },
      h(Hero, { content }),
      h(GrowthStage, { content }),
      h(ProcessMap, { content }),
      h(TechnologyPortfolio, { content }),
      h(TurnkeyEngineering, { content }),
      h(ProductAtlas, { content }),
    ),
  );
}

createRoot(document.getElementById("root")).render(h(App));
