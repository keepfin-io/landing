import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from 'astro:i18n';

export const languages = {
  tr: { name: 'Türkçe', short: 'TR', flag: '/flags/tr.svg', locale: 'tr-TR', og: 'tr_TR' },
  en: { name: 'English', short: 'EN', flag: '/flags/gb.svg', locale: 'en-US', og: 'en_US' },
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'tr';

export const links = {
  github: 'https://github.com/keepfin-io/keepfin.io',
  quickStart: 'https://github.com/keepfin-io/keepfin.io#quick-start',
  config: 'https://github.com/keepfin-io/keepfin.io#configuration-and-deployment',
  authGuide: 'https://github.com/keepfin-io/keepfin.io/blob/main/auth/README.md',
  workers: 'https://github.com/keepfin-io/keepfin.io/blob/main/docs/background-workers.md',
  roadmap: 'https://github.com/keepfin-io/keepfin.io/blob/main/docs/wealth-implementation.md',
  issues: 'https://github.com/keepfin-io/keepfin.io/issues',
  license: 'https://github.com/keepfin-io/keepfin.io/blob/main/LICENSE',
} as const;

/*
  Every feature on this page is backed by the keepfin.io Go API (pkg/routes, app/controllers):
  ledger activities and transfers, CSV import with preview and duplicate detection, export, the
  portfolio report (returns, benchmark, income periods, historical FX, missing-data warnings),
  account exclusion from totals, market search. The roadmap's "in development" column lists the API
  areas still open in docs/wealth-implementation.md.
*/

/** A holding row in the hero's app window: tone picks the thumbnail colour and the change badge. */
interface HoldingRow {
  name: string;
  detail: string;
  qty: string;
  change: string;
  tone: 'up' | 'down' | 'flat';
}

/** A ledger row in the app-frame's list pane; st is 'open' (waits in preview) or 'done' (saved). */
interface LedgerRow {
  initials: string;
  tone: 1 | 2 | 3 | 4 | 5;
  asset: string;
  entry: string;
  st: 'open' | 'done';
  date: string;
}

const tr = {
  meta: {
    title: 'Keepfin: açık kaynak portföy ve finans takip uygulaması',
    description:
      'Keepfin, açık kaynak portföy ve finans takip uygulaması. Hisse, fon, kripto ve nakit hesaplarını tek yerde izle; getiriyi işlem defterinden hesapla.',
    appDescription: 'Go ile yazılmış, kendi sunucunda çalışan açık kaynak portföy takip uygulaması.',
    ogTitle: 'Açık kaynak portföy ve finans takibi',
    ogSubtitle: 'Hisse, fon, kripto ve nakit hesapların tek görünümde; getiri işlem defterinden.',
    ogAlt: 'Keepfin: açık kaynak portföy ve finans takibi',
  },
  skip: 'İçeriğe geç',
  nav: {
    label: 'Ana menü',
    app: 'Defter',
    features: 'Özellikler',
    roadmap: 'Yol haritası',
    faq: 'Sorular',
    menuToggle: 'Menü',
    langLabel: 'Dil',
  },
  cta: 'GitHub’da incele',
  hero: {
    h1: 'Tüm hesapların için portföy takibi',
    lead: 'Keepfin; aracı kurum, banka ve döviz hesaplarını tek görünümde toplayan açık kaynak bir portföy takip uygulaması. İşlemlerini gir ya da CSV ile aktar; getiri, gelir ve dağılım bu kayıtlardan hesaplanır.',
    secondary: 'Yol haritasını gör',
    artLabel: 'Keepfin varlık listesi: hisseler, bir ETF ve kripto; yanında bir CSV dosyasının içe aktarılması',
    win: {
      crumb: 'Keepfin · Portföy',
      side: ['Portföy', 'Varlıklar', 'İşlemler', 'Analiz', 'Raporlar'],
      sideLabel: 'Hesaplar',
      accounts: ['Yatırım', 'USD hesabı', 'Vadesiz TL'],
      title: 'Varlıklar',
      button: 'İşlem ekle',
      tabs: ['Tümü 14', 'Hisse 9', 'Fon 3'],
      rows: [
        { name: 'THYAO', detail: 'Yatırım · Borsa İstanbul', qty: '120', change: '+%8,4', tone: 'up' },
        { name: 'VOO', detail: 'USD hesabı · NYSE Arca', qty: '6', change: '+%12,1', tone: 'up' },
        { name: 'ASELS', detail: 'Yatırım · Borsa İstanbul', qty: '300', change: '−%2,3', tone: 'down' },
        { name: 'AAPL', detail: 'USD hesabı · NASDAQ', qty: '15', change: '+%5,7', tone: 'up' },
        { name: 'BTC', detail: 'Yatırım · kripto', qty: '0,04', change: '+%18,9', tone: 'up' },
        { name: 'Nakit TRY', detail: 'Vadesiz TL', qty: '—', change: '%0,0', tone: 'flat' },
      ] as HoldingRow[],
    },
    note: {
      file: 'hesap-ekstresi.csv',
      done: 'Aktarıldı',
      lines: [
        ['!', '<b>2 satır</b> zaten kayıtlı'],
        ['✓', '<b>46 işlem</b> önizlendi'],
        ['✓', 'Pozisyonlar <b>defterden</b> kuruldu'],
      ],
    },
  },
  app: {
    h2: 'Portföy işlemleri ve getirisi',
    p: 'Alımlar, satışlar, temettüler ve transferler soldaki defterde durur. Sağdaki getiri aynı kayıtlardan, işlem günündeki kurla raporlama para biriminde hesaplanır.',
    link: 'Özellikleri gör',
    label: 'Keepfin işlem defteri: önizlemedeki ve kaydedilmiş işlemler; yanında son 14 günün portföy getirisi',
    win: {
      open: 'Önizleme',
      work: 'Kaydediliyor',
      done: 'Kaydedildi',
      crumb: 'İşlemler',
      search: 'Ara',
      side: [
        ['Tümü', '46'],
        ['Alım', '18'],
        ['Satış', '7'],
        ['Temettü', '9'],
      ],
      sideLabel: 'Hesaplar',
      accounts: ['Yatırım', 'USD hesabı'],
      cols: ['Varlık', 'İşlem', 'Durum', 'Tarih'],
      rows: [
        { initials: 'TH', tone: 1, asset: 'THYAO', entry: 'Alım · 40 adet · ₺312,50', st: 'open', date: '14 Kas' },
        { initials: 'VO', tone: 3, asset: 'VOO', entry: 'Temettü · $9,84', st: 'open', date: '13 Kas' },
        { initials: 'TL', tone: 4, asset: 'Vadesiz TL', entry: 'Transfer · Yatırım hesabına ₺25.000', st: 'open', date: '12 Kas' },
        { initials: 'AS', tone: 2, asset: 'ASELS', entry: 'Satış · 50 adet · ₺91,20', st: 'done', date: '11 Kas' },
        { initials: 'AA', tone: 5, asset: 'AAPL', entry: 'Alım · 5 adet · $226,10', st: 'done', date: '8 Kas' },
        { initials: 'KO', tone: 3, asset: 'Komisyon', entry: 'Ücret · ₺18,40', st: 'done', date: '8 Kas' },
        { initials: 'BT', tone: 1, asset: 'BTC', entry: 'Alım · 0,01 · $68.400', st: 'done', date: '5 Kas' },
        { initials: 'VO', tone: 3, asset: 'VOO', entry: 'Alım · 2 adet · $512,30', st: 'done', date: '1 Kas' },
        { initials: 'TL', tone: 4, asset: 'Vadesiz TL', entry: 'Faiz · ₺1.240,00', st: 'done', date: '31 Eki' },
        { initials: 'TH', tone: 1, asset: 'THYAO', entry: 'Alım · 80 adet · ₺298,75', st: 'done', date: '28 Eki' },
      ] as LedgerRow[],
    },
    stat: {
      label: 'Portföy getirisi',
      range: 'Son 14 gün',
      num: '%12,4',
      delta: '1,8 puan',
      sub: 'önceki 14 güne göre',
      axis: ['31 Eki', '7 Kas', 'Bugün'],
    },
  },
  statement: {
    label: 'Defter',
    h2: 'Keepfin’de her rakamın bir kaydı var.',
    p: 'Bakiyeler, pozisyonlar ve getiri işlem defterinden yeniden hesaplanır. Eksik bir fiyat ya da kur sıfır sayılmaz, uyarı olarak görünür.',
    items: [
      ['İşlem türleri', 'Alım, satış, temettü, faiz, para yatırma ve çekme, ücret, bölünme ve hesaplar arası transfer.'],
      ['CSV ile aktarma', 'İçe aktarmadan önce önizle; zaten kayıtlı satırlar tekrar olarak işaretlenir. Dışa aktarma da var.'],
      ['Karşılaştırma ölçütü', 'Portföy getirisini seçtiğin bir ölçütle aynı grafikte karşılaştır.'],
    ] as [string, string][],
  },
  features: {
    h2: 'Portföy rakamları defterden.',
    h2Muted: 'Gelir, toplamlar, fiyatlar ve kurlar.',
    cards: {
      income: {
        title: 'Portföy gelirini dönemlere ayırır',
        body: 'Temettü, faiz ve ücretler her dönem için ayrı toplanır; net gelir tek satırda görünür.',
        notes: [
          ['Temettü kaydedildi', 'şimdi', 'VOO · USD hesabı · $9,84'],
          ['Faiz kaydedildi', '4 dk', 'Vadesiz TL · ₺1.240,00'],
          ['Ücret kaydedildi', '12 dk', 'Komisyon · ₺18,40'],
        ],
      },
      accounts: {
        title: 'Hesapları portföy toplamına katar',
        body: 'Hangi hesabın portföy toplamına gireceğini sen seçersin. Emeklilik hesabını ayrı izlemek için bir anahtar yeter.',
        head: 'Portföy toplamı',
        count: '3 / 4 hesap',
        rows: [
          ['Yatırım', 'Borsa İstanbul ve kripto', true],
          ['USD hesabı', 'NYSE Arca ve NASDAQ', true],
          ['Vadesiz TL', 'Nakit ve faiz', true],
          ['Emeklilik', 'Ayrı izleniyor', false],
        ] as [string, string, boolean][],
      },
      search: {
        title: 'Portföy varlıklarını adıyla bulur',
        body: 'Piyasa enstrümanlarını sembol ya da adla ara. Günlük kapanış fiyatları arka planda güncellenir, sayfa sağlayıcıyı beklemez.',
        q: 'apple',
        group: 'Hisseler',
        rows: [
          ['<b>Apple</b> Inc. · AAPL', 'NASDAQ'],
          ['<b>Apple</b> Hospitality REIT · APLE', 'NYSE'],
        ] as [string, string][],
        foot: ['gezin', 'seç'],
      },
      currency: {
        title: 'Portföyü geçmiş kurla değerler',
        body: 'Hesaplar işlem günündeki kurla raporlama para biriminde değerlenir. Eksik kur bir rakamla doldurulmaz, eksik olarak görünür.',
        head: 'Kurlar · TRY',
        count: '2 / 3 kur',
        rows: [
          ['USD → TRY · 14 Kas kuru', true],
          ['EUR → TRY · 14 Kas kuru', true],
          ['GBP → TRY · kur bekleniyor', false],
        ] as [string, boolean][],
      },
    },
  },
  roadmap: {
    h2: 'Keepfin yol haritası',
    p: 'Bugün çalışan akışlar ve API’de geliştirilmekte olan başlıklar.',
    link: 'Uygulama takibini oku',
    available: 'Kullanılabilir',
    inProgress: 'Geliştiriliyor',
    availableItems: [
      ['Hesaplar ve varlıklar', 'Açılış nakdi, pozisyonlar ve para birimleri'],
      ['İşlem defteri', 'Alım, satış, temettü, faiz, ücret ve transfer'],
      ['Portföy analizi', 'Getiri, gelir, dağılım ve karşılaştırma ölçütü'],
      ['Çoklu para birimi', 'İşlem günü kuruyla raporlama'],
      ['CSV içe ve dışa aktarma', 'Önizleme ve tekrar tespiti'],
      ['Varlık arama', 'Sembol ya da adla, filtre ve sıralama'],
    ] as [string, string][],
    inProgressItems: [
      'İzleme listeleri',
      'Manuel varlıklar ve değerlemeler',
      'Borçlar ve net değer',
      'Etiketler ve birleşik işlem listesi',
      'Risk kontrolleri',
      'FIRE projeksiyonu',
      'Süreli, salt okunur paylaşım',
      'Temettü ve JSON içe aktarma',
    ],
  },
  faq: {
    h2: 'Keepfin hakkında sorular',
    p: 'Cevabını bulamadığın soruyu GitHub’da sorabilirsin.',
    link: 'Issue aç',
    stack: 'Kullanılan teknolojiler',
    stackItems: [
      ['go', 'Go', 'API ve arka plan işleri'],
      ['vue', 'Vue', 'Web arayüzü'],
      ['postgres', 'PostgreSQL', 'Defter ve fiyat geçmişi'],
      ['typesense', 'Typesense', 'Varlık araması'],
      ['docker', 'Docker Compose', 'Kurulum ve çalıştırma'],
    ] as [string, string, string][],
    items: [
      [
        'Keepfin açık kaynak mı?',
        'Evet. Kaynak kodu MIT lisansıyla GitHub’da; API Go ile yazıldı ve veriler PostgreSQL’de tutulur.',
      ],
      [
        'Keepfin’i kendi sunucumda çalıştırabilir miyim?',
        'Evet. Depoyu klonlayıp make hot ile Docker Compose üzerinde başlatırsın; kayıtlar kendi PostgreSQL veritabanında kalır.',
      ],
      [
        'Keepfin hangi piyasa verilerini destekliyor?',
        'Marketstack (Borsa İstanbul dahil büyük borsalar) ve Tiingo (ABD hisseleri, ETF, fon, kripto ve döviz). Biri yeterli.',
      ],
      [
        'Keepfin’den hangi veriler dışarı gider?',
        'Kayıtlar senin veritabanında kalır. Piyasa verisi, varlık görselleri ve Google ile giriş için dış servislere istek gider.',
      ],
      [
        'Keepfin yatırım tavsiyesi verir mi?',
        'Hayır. Keepfin bir takip ve analiz aracıdır. Veriler gecikmeli ya da eksik olabilir; karar vermeden önce doğrula.',
      ],
    ] as [string, string][],
  },
  close: {
    h2: 'Keepfin’i GitHub’da incele',
    p: 'MIT lisanslı; sürümleri ve yol haritasını depodan izleyebilirsin.',
  },
  footer: {
    lede: 'Açık kaynak portföy takibi.',
    cols: [
      ['Kaynak kod', [['GitHub deposu', links.github], ['MIT lisansı', links.license]]],
      ['Kurulum', [['Hızlı başlangıç', links.quickStart], ['Yapılandırma', links.config]]],
      ['Belgeler', [['Kimlik doğrulama', links.authGuide], ['Arka plan işleri', links.workers]]],
      ['Topluluk', [['Sorun bildir', links.issues], ['Uygulama takibi', links.roadmap]]],
    ] as [string, [string, string][]][],
    notice:
      'Keepfin yatırım, finans, vergi veya hukuk tavsiyesi vermez. Piyasa verileri ve hesaplamalar gecikmeli, eksik veya hatalı olabilir.',
    trademarks: 'Ürün adları ve logolar sahiplerinin ticari markalarıdır.',
  },
};

export type Dictionary = typeof tr;

const en: Dictionary = {
  meta: {
    title: 'Keepfin: open-source portfolio and finance tracker',
    description:
      'Keepfin is an open-source portfolio and personal finance tracker. Follow stocks, funds, crypto and cash in one place, with returns from your ledger.',
    appDescription: 'An open-source, self-hosted portfolio tracker written in Go.',
    ogTitle: 'Open-source portfolio and finance tracking',
    ogSubtitle: 'Stocks, funds, crypto and cash accounts in one view, with returns from your ledger.',
    ogAlt: 'Keepfin: open-source portfolio and finance tracking',
  },
  skip: 'Skip to content',
  nav: {
    label: 'Main',
    app: 'Ledger',
    features: 'Features',
    roadmap: 'Roadmap',
    faq: 'Questions',
    menuToggle: 'Menu',
    langLabel: 'Language',
  },
  cta: 'View on GitHub',
  hero: {
    h1: 'Portfolio tracker for all your accounts',
    lead: 'Keepfin is an open-source portfolio tracker that brings brokerage, bank and currency accounts into one view. Enter transactions or import a CSV; returns, income and allocation come from those records.',
    secondary: 'See the roadmap',
    artLabel: 'Keepfin holdings list with stocks, an ETF and crypto, beside a CSV file being imported',
    win: {
      crumb: 'Keepfin · Portfolio',
      side: ['Portfolio', 'Holdings', 'Activity', 'Analysis', 'Reports'],
      sideLabel: 'Accounts',
      accounts: ['Brokerage', 'USD account', 'Checking'],
      title: 'Holdings',
      button: 'Add activity',
      tabs: ['All 14', 'Stocks 9', 'Funds 3'],
      rows: [
        { name: 'THYAO', detail: 'Brokerage · Borsa Istanbul', qty: '120', change: '+8.4%', tone: 'up' },
        { name: 'VOO', detail: 'USD account · NYSE Arca', qty: '6', change: '+12.1%', tone: 'up' },
        { name: 'ASELS', detail: 'Brokerage · Borsa Istanbul', qty: '300', change: '−2.3%', tone: 'down' },
        { name: 'AAPL', detail: 'USD account · NASDAQ', qty: '15', change: '+5.7%', tone: 'up' },
        { name: 'BTC', detail: 'Brokerage · crypto', qty: '0.04', change: '+18.9%', tone: 'up' },
        { name: 'Cash TRY', detail: 'Checking', qty: '—', change: '0.0%', tone: 'flat' },
      ],
    },
    note: {
      file: 'statement.csv',
      done: 'Imported',
      lines: [
        ['!', '<b>2 rows</b> already recorded'],
        ['✓', '<b>46 transactions</b> previewed'],
        ['✓', 'Positions rebuilt <b>from the ledger</b>'],
      ],
    },
  },
  app: {
    h2: 'Portfolio activity and returns',
    p: 'Purchases, sales, dividends and transfers sit in the ledger on the left. The return on the right is computed from the same records, at each transaction day’s rate, in your reporting currency.',
    link: 'See the features',
    label: 'Keepfin ledger with transactions in preview and saved, beside the portfolio return for the last 14 days',
    win: {
      open: 'Preview',
      work: 'Saving',
      done: 'Saved',
      crumb: 'Activity',
      search: 'Search',
      side: [
        ['All', '46'],
        ['Buys', '18'],
        ['Sells', '7'],
        ['Dividends', '9'],
      ],
      sideLabel: 'Accounts',
      accounts: ['Brokerage', 'USD account'],
      cols: ['Asset', 'Entry', 'Status', 'Date'],
      rows: [
        { initials: 'TH', tone: 1, asset: 'THYAO', entry: 'Buy · 40 shares · ₺312.50', st: 'open', date: 'Nov 14' },
        { initials: 'VO', tone: 3, asset: 'VOO', entry: 'Dividend · $9.84', st: 'open', date: 'Nov 13' },
        { initials: 'CH', tone: 4, asset: 'Checking', entry: 'Transfer · ₺25,000 to brokerage', st: 'open', date: 'Nov 12' },
        { initials: 'AS', tone: 2, asset: 'ASELS', entry: 'Sell · 50 shares · ₺91.20', st: 'done', date: 'Nov 11' },
        { initials: 'AA', tone: 5, asset: 'AAPL', entry: 'Buy · 5 shares · $226.10', st: 'done', date: 'Nov 8' },
        { initials: 'FE', tone: 3, asset: 'Commission', entry: 'Fee · ₺18.40', st: 'done', date: 'Nov 8' },
        { initials: 'BT', tone: 1, asset: 'BTC', entry: 'Buy · 0.01 · $68,400', st: 'done', date: 'Nov 5' },
        { initials: 'VO', tone: 3, asset: 'VOO', entry: 'Buy · 2 shares · $512.30', st: 'done', date: 'Nov 1' },
        { initials: 'CH', tone: 4, asset: 'Checking', entry: 'Interest · ₺1,240.00', st: 'done', date: 'Oct 31' },
        { initials: 'TH', tone: 1, asset: 'THYAO', entry: 'Buy · 80 shares · ₺298.75', st: 'done', date: 'Oct 28' },
      ],
    },
    stat: {
      label: 'Portfolio return',
      range: 'Last 14 days',
      num: '12.4%',
      delta: '1.8 pts',
      sub: 'vs. the 14 days before',
      axis: ['Oct 31', 'Nov 7', 'Today'],
    },
  },
  statement: {
    label: 'Ledger',
    h2: 'Every Keepfin number has a record.',
    p: 'Balances, positions and returns are rebuilt from the transaction ledger. A missing price or rate is never counted as zero; it shows as a warning.',
    items: [
      ['Transaction types', 'Buys, sells, dividends, interest, deposits and withdrawals, fees, splits and transfers between accounts.'],
      ['CSV import', 'Preview before you import; rows already recorded are marked as duplicates. Export works too.'],
      ['Benchmarks', 'Compare your portfolio return with a benchmark you pick, on the same chart.'],
    ],
  },
  features: {
    h2: 'Portfolio numbers from your ledger.',
    h2Muted: 'Income, totals, prices and rates.',
    cards: {
      income: {
        title: 'Splits portfolio income by period',
        body: 'Dividends, interest and fees are totalled for each period, with net income on one line.',
        notes: [
          ['Dividend recorded', 'now', 'VOO · USD account · $9.84'],
          ['Interest recorded', '4m', 'Checking · ₺1,240.00'],
          ['Fee recorded', '12m', 'Commission · ₺18.40'],
        ],
      },
      accounts: {
        title: 'Counts accounts in your portfolio total',
        body: 'You decide which accounts go into the portfolio total. One switch keeps a pension account tracked on its own.',
        head: 'Portfolio total',
        count: '3 of 4 accounts',
        rows: [
          ['Brokerage', 'Borsa Istanbul and crypto', true],
          ['USD account', 'NYSE Arca and NASDAQ', true],
          ['Checking', 'Cash and interest', true],
          ['Pension', 'Tracked on its own', false],
        ],
      },
      search: {
        title: 'Finds portfolio assets by name',
        body: 'Search market instruments by symbol or name. Daily closing prices update in the background, so pages never wait on the provider.',
        q: 'apple',
        group: 'Stocks',
        rows: [
          ['<b>Apple</b> Inc. · AAPL', 'NASDAQ'],
          ['<b>Apple</b> Hospitality REIT · APLE', 'NYSE'],
        ],
        foot: ['to move', 'to pick'],
      },
      currency: {
        title: 'Values your portfolio at historical rates',
        body: 'Accounts are valued in your reporting currency at the rate of each transaction day. A missing rate shows as missing, never as a made-up figure.',
        head: 'Rates · USD',
        count: '2 of 3 rates',
        rows: [
          ['TRY → USD · Nov 14 rate', true],
          ['EUR → USD · Nov 14 rate', true],
          ['GBP → USD · rate pending', false],
        ],
      },
    },
  },
  roadmap: {
    h2: 'Keepfin roadmap',
    p: 'The flows that work today, and the areas still in development in the API.',
    link: 'Read the implementation tracker',
    available: 'Available',
    inProgress: 'In development',
    availableItems: [
      ['Accounts and holdings', 'Opening cash, positions and currencies'],
      ['Transaction ledger', 'Buys, sells, dividends, interest, fees, transfers'],
      ['Portfolio analysis', 'Returns, income, allocation and benchmarks'],
      ['Multi-currency', 'Reporting at each transaction day’s rate'],
      ['CSV import and export', 'Preview and duplicate detection'],
      ['Asset search', 'By symbol or name, with filters and sorting'],
    ],
    inProgressItems: [
      'Watchlists',
      'Manual assets and valuations',
      'Liabilities and net worth',
      'Tags and a combined activity list',
      'Risk checks',
      'FIRE projection',
      'Expiring, read-only sharing',
      'Dividend and JSON import',
    ],
  },
  faq: {
    h2: 'Questions about Keepfin',
    p: 'Ask anything this page leaves open on GitHub.',
    link: 'Open an issue',
    stack: 'Built with',
    stackItems: [
      ['go', 'Go', 'API and background workers'],
      ['vue', 'Vue', 'Web interface'],
      ['postgres', 'PostgreSQL', 'Ledger and price history'],
      ['typesense', 'Typesense', 'Asset search'],
      ['docker', 'Docker Compose', 'Setup and running'],
    ],
    items: [
      [
        'Is Keepfin open source?',
        'Yes. The source is on GitHub under the MIT License; the API is written in Go and the data lives in PostgreSQL.',
      ],
      [
        'Can I run Keepfin on my own server?',
        'Yes. Clone the repository and run make hot to start it on Docker Compose; your records stay in your own PostgreSQL database.',
      ],
      [
        'Which market data does Keepfin support?',
        'Marketstack (major exchanges, Borsa Istanbul included) and Tiingo (US stocks, ETFs, funds, crypto and FX). One is enough.',
      ],
      [
        'What Keepfin data leaves my server?',
        'Your records stay in your database. Market data, asset images and Google sign-in send requests to outside services.',
      ],
      [
        'Does Keepfin give investment advice?',
        'No. Keepfin is a tracking and analysis tool. Data may be delayed or incomplete, so check it before you decide.',
      ],
    ],
  },
  close: {
    h2: 'View Keepfin on GitHub',
    p: 'MIT licensed; follow releases and the roadmap in the repository.',
  },
  footer: {
    lede: 'Open-source portfolio tracking.',
    cols: [
      ['Source', [['GitHub repository', links.github], ['MIT License', links.license]]],
      ['Setup', [['Quick start', links.quickStart], ['Configuration', links.config]]],
      ['Docs', [['Authentication', links.authGuide], ['Background workers', links.workers]]],
      ['Community', [['Report an issue', links.issues], ['Implementation tracker', links.roadmap]]],
    ],
    notice:
      'Keepfin does not provide investment, financial, tax or legal advice. Market data and calculations may be delayed, incomplete or inaccurate.',
    trademarks: 'Product names and logos are trademarks of their owners.',
  },
};

export const ui: Record<Lang, Dictionary> = { tr, en };

export function getDictionary(lang: Lang): Dictionary {
  return ui[lang];
}

/** Every language has its own page at `/<lang>/` (astro.config.mjs `i18n`); `/` picks one (see pages/index.astro). */
export function langPath(lang: Lang): string {
  return getRelativeLocaleUrl(lang);
}

/** The page's absolute URL, for canonical, hreflang and structured data. */
export function langUrl(lang: Lang): string {
  return getAbsoluteLocaleUrl(lang);
}

/** The language a browser gets at `/` when none of its languages is Turkish or English. */
export const fallbackLang: Lang = 'en';
