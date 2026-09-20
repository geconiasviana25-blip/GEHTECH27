import { useState, useEffect } from 'react';
import { templates } from './templates';

function App() {
  const [countdown, setCountdown] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [templateCategory, setTemplateCategory] = useState('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  // Painel Admin
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminLogged, setAdminLogged] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>(() => {
    const saved = localStorage.getItem('gehTech27_posts');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Formulário de novo post
  const [newPost, setNewPost] = useState({
    titulo: '',
    resumo: '',
    emoji: '📝',
    categoria: 'GERAL',
    leitura: '5 min',
    cor: 'from-purple-500 to-pink-500',
    conteudo: [{ tipo: 'p', texto: '' }]
  });

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredTemplates = templateCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === templateCategory);

  // Funções do Admin
  const ADMIN_PASSWORD = 'gehtech27';
  
  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setAdminLogged(true);
      setAdminPassword('');
    } else {
      alert('Senha incorreta! A senha padrão é: gehtech27');
    }
  };

  const handleCreatePost = () => {
    if (!newPost.titulo || !newPost.resumo) {
      alert('Preencha pelo menos o título e o resumo!');
      return;
    }
    
    const post = {
      ...newPost,
      id: Date.now(),
      data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      autor: 'GEH TECH 27',
      conteudo: newPost.conteudo.filter(c => c.texto && c.texto.trim() !== '')
    };
    
    const updatedPosts = [post, ...userPosts];
    setUserPosts(updatedPosts);
    localStorage.setItem('gehTech27_posts', JSON.stringify(updatedPosts));
    
    // Reset form
    setNewPost({
      titulo: '',
      resumo: '',
      emoji: '📝',
      categoria: 'GERAL',
      leitura: '5 min',
      cor: 'from-purple-500 to-pink-500',
      conteudo: [{ tipo: 'p', texto: '' }]
    });
    setShowCreatePost(false);
    alert('✅ Artigo publicado com sucesso!');
  };

  const handleDeletePost = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este artigo?')) {
      const updatedPosts = userPosts.filter(p => p.id !== id);
      setUserPosts(updatedPosts);
      localStorage.setItem('gehTech27_posts', JSON.stringify(updatedPosts));
    }
  };

  const addContentBlock = (tipo: string) => {
    setNewPost({
      ...newPost,
      conteudo: [...newPost.conteudo, { tipo, texto: '' }]
    });
  };

  const updateContentBlock = (index: number, texto: string) => {
    const updated = [...newPost.conteudo];
    updated[index] = { ...updated[index], texto };
    setNewPost({ ...newPost, conteudo: updated });
  };

  const removeContentBlock = (index: number) => {
    const updated = newPost.conteudo.filter((_, i) => i !== index);
    setNewPost({ ...newPost, conteudo: updated });
  };

  // allBlogPosts será definido depois de blogPosts (já definido)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const cursos = [
    {
      titulo: "Marketing Digital Avançado",
      descricao: "Aprenda as estratégias que realmente funcionam para vender online e criar um negócio digital lucrativo.",
      emoji: "🚀",
      tag: "MAIS VENDIDO",
      cor: "from-purple-500 to-pink-500",
      artigos: [
        "Como Ganhar R$ 5.000/mês Como Afiliado em 2025",
        "Tráfego Pago Para Iniciantes: Guia Completo 2025",
        "Mindset de Sucesso: Como Pensar Como Um Empreendedor Digital"
      ],
      artigoIndex: 0
    },
    {
      titulo: "Dropshipping do Zero",
      descricao: "Monte sua loja virtual sem estoque e comece a faturar em dólar com produtos internacionais.",
      emoji: "💰",
      tag: "NOVO",
      cor: "from-cyan-500 to-blue-500",
      artigos: [
        "Dropshipping em 2025: Ainda Vale a Pena?",
        "5 Formas de Renda Extra Usando Seu Celular",
        "Como Ganhar R$ 5.000/mês Como Afiliado em 2025"
      ],
      artigoIndex: 4
    },
    {
      titulo: "Programação com IA",
      descricao: "Domine programação usando inteligência artificial e crie apps, sites e automações em tempo recorde.",
      emoji: "🤖",
      tag: "HOT 🔥",
      cor: "from-green-500 to-emerald-500",
      artigos: [
        "ChatGPT Para Afiliados: 10 Prompts Que Vendem",
        "5 Formas de Renda Extra Usando Seu Celular",
        "Mindset de Sucesso: Como Pensar Como Um Empreendedor Digital"
      ],
      artigoIndex: 1
    },
    {
      titulo: "Edição de Vídeos Viral",
      descricao: "Crie vídeos que viralizam no TikTok, Reels e YouTube. Edição profissional sem complicação.",
      emoji: "🎬",
      tag: "TENDÊNCIA",
      cor: "from-orange-500 to-red-500",
      artigos: [
        "5 Formas de Renda Extra Usando Seu Celular",
        "ChatGPT Para Afiliados: 10 Prompts Que Vendem",
        "Como Ganhar R$ 5.000/mês Como Afiliado em 2025"
      ],
      artigoIndex: 3
    },
    {
      titulo: "Renda Extra com Afiliados",
      descricao: "Ganhe comissões vendendo produtos digitais. Método comprovado para iniciantes.",
      emoji: "💎",
      tag: "INICIANTE",
      cor: "from-violet-500 to-purple-500",
      artigos: [
        "Como Ganhar R$ 5.000/mês Como Afiliado em 2025",
        "ChatGPT Para Afiliados: 10 Prompts Que Vendem",
        "Tráfego Pago Para Iniciantes: Guia Completo 2025"
      ],
      artigoIndex: 0
    },
    {
      titulo: "Automação & ChatGPT",
      descricao: "Use IA para automatizar tarefas, criar conteúdo e multiplicar sua produtividade por 10x.",
      emoji: "⚡",
      tag: "EXCLUSIVO",
      cor: "from-yellow-500 to-orange-500",
      artigos: [
        "ChatGPT Para Afiliados: 10 Prompts Que Vendem",
        "Tráfego Pago Para Iniciantes: Guia Completo 2025",
        "Mindset de Sucesso: Como Pensar Como Um Empreendedor Digital"
      ],
      artigoIndex: 1
    }
  ];

  const depoimentos = [
    { nome: "Lucas M.", texto: "Comprei o curso de Marketing Digital e em 30 dias já tinha recuperado o investimento. Incrível!", estrelas: 5, valor: "R$ 4.200/mês" },
    { nome: "Ana C.", texto: "O curso de Dropshipping mudou minha vida. Hoje trabalho de casa e viajo quando quero.", estrelas: 5, valor: "R$ 8.500/mês" },
    { nome: "Pedro S.", texto: "Achei que era golpe, mas resolvi testar. Resultado: primeira venda em 48 horas!", estrelas: 5, valor: "R$ 2.800/mês" },
    { nome: "Juliana R.", texto: "GEH TECH 27 é sensacional! Os conteúdos são diretos ao ponto e funcionam de verdade.", estrelas: 5, valor: "R$ 6.100/mês" },
  ];

  const ferramentas = [
    { nome: "Templates Prontos", icon: "📋", desc: "+500 templates editáveis" },
    { nome: "Comunidade VIP", icon: "👥", desc: "Networking exclusivo" },
    { nome: "Suporte 24/7", icon: "💬", desc: "Tire dúvidas a qualquer hora" },
    { nome: "Atualizações", icon: "🔄", desc: "Conteúdo sempre atualizado" },
    { nome: "Certificado", icon: "🏆", desc: "Válido em todo Brasil" },
    { nome: "Garantia 7 dias", icon: "🛡️", desc: "Satisfação ou dinheiro de volta" },
  ];

  const blogPosts = [
    {
      titulo: "Como Ganhar R$ 5.000/mês Como Afiliado em 2025",
      resumo: "Descubra o passo a passo completo para começar a vender como afiliado e construir uma renda extra sólida trabalhando de casa.",
      emoji: "💰",
      categoria: "AFILIADOS",
      data: "15 Jan 2025",
      leitura: "8 min",
      autor: "GEH TECH 27",
      cor: "from-purple-500 to-pink-500",
      conteudo: [
        { tipo: "p", texto: "O mercado de afiliados no Brasil cresceu mais de 300% nos últimos 2 anos. Milhares de pessoas estão conquistando sua liberdade financeira vendendo produtos digitais sem precisar criar nada." },
        { tipo: "h3", texto: "🎯 O Que é Ser Afiliado?" },
        { tipo: "p", texto: "Ser afiliado significa vender produtos de terceiros e ganhar comissões por cada venda realizada. Você não precisa ter estoque, não precisa dar suporte e não precisa criar o produto." },
        { tipo: "h3", texto: "📋 Passo a Passo Para Começar" },
        { tipo: "ul", items: [
          "Escolha um nicho lucrativo (emagrecimento, renda extra, relacionamento)",
          "Cadastre-se em plataformas como Kiwify, Hotmart ou Eduzz",
          "Selecione produtos com boa comissão (40-60%)",
          "Crie conteúdo nas redes sociais (Instagram, TikTok, YouTube)",
          "Use links de afiliado estratégicos",
          "Escale com tráfego pago quando estiver validado"
        ]},
        { tipo: "h3", texto: "💡 Estratégias Que Funcionam" },
        { tipo: "p", texto: "A chave para ganhar R$ 5.000/mês como afiliado é consistência e estratégia. Comece com tráfego orgânico (Instagram Reels, TikTok) e quando estiver faturando bem, invista em tráfego pago." },
        { tipo: "destaque", texto: "💎 DICA DE OURO: Foque em 1 produto e 1 estratégia. Não tente fazer tudo ao mesmo tempo. Domine uma plataforma antes de expandir." },
        { tipo: "p", texto: "Com dedicação e as estratégias certas, é totalmente possível alcançar R$ 5.000/mês em 3-6 meses. O segredo é tratar como um negócio sério e não como renda extra casual." }
      ]
    },
    {
      titulo: "ChatGPT Para Afiliados: 10 Prompts Que Vendem",
      resumo: "Aprenda a usar inteligência artificial para criar copies irresistíveis, posts virais e estratégias de vendas automatizadas.",
      emoji: "🤖",
      categoria: "INTELIGÊNCIA ARTIFICIAL",
      data: "12 Jan 2025",
      leitura: "10 min",
      autor: "GEH TECH 27",
      cor: "from-cyan-500 to-blue-500",
      conteudo: [
        { tipo: "p", texto: "A inteligência artificial revolucionou o marketing digital. Com o ChatGPT, afiliados podem criar conteúdo de alta qualidade em minutos, economizando horas de trabalho." },
        { tipo: "h3", texto: "🚀 Por Que Usar IA Como Afiliado?" },
        { tipo: "p", texto: "A IA permite que você produza 10x mais conteúdo, com melhor qualidade e em menos tempo. Enquanto seus concorrentes passam horas criando um post, você cria 10 em minutos." },
        { tipo: "h3", texto: "📝 10 Prompts Poderosos Para Afiliados" },
        { tipo: "ul", items: [
          "Crie 5 headlines persuasivas para vender [produto] no Instagram",
          "Escreva um post viral sobre [tema] com gatilhos mentais",
          "Crie uma sequência de 7 stories vendendo [produto]",
          "Faça um roteiro de vídeo de 60 segundos sobre [tema]",
          "Escreva 3 variações de copy para anúncio no Facebook",
          "Crie um email de vendas seguindo a fórmula AIDA para [produto]",
          "Gere 10 ideias de conteúdo para Reels sobre [nicho]",
          "Escreva uma bio magnética para Instagram de afiliado",
          "Crie um funil de vendas com 5 emails para [produto]",
          "Faça uma análise do perfil do comprador ideal de [produto]"
        ]},
        { tipo: "h3", texto: "⚡ Como Aplicar na Prática" },
        { tipo: "p", texto: "Use os prompts como base e personalize com informações do seu produto e público. A IA é uma ferramenta — o toque humano é o que faz a diferença." },
        { tipo: "destaque", texto: "🔥 PRO TIP: Crie um banco de prompts personalizados para seu nicho. Quanto mais específico o prompt, melhor o resultado." },
        { tipo: "p", texto: "Com esses prompts, você vai produzir conteúdo profissional todos os dias sem sofrimento. A consistência é a chave para vender como afiliado!" }
      ]
    },
    {
      titulo: "Tráfego Pago Para Iniciantes: Guia Completo 2025",
      resumo: "Aprenda a investir em anúncios no Facebook e Google de forma inteligente, gastando pouco e tendo resultados reais.",
      emoji: "📈",
      categoria: "TRÁFEGO PAGO",
      data: "10 Jan 2025",
      leitura: "12 min",
      autor: "GEH TECH 27",
      cor: "from-green-500 to-emerald-500",
      conteudo: [
        { tipo: "p", texto: "Tráfego pago é a forma mais rápida de escalar suas vendas como afiliado. Mas muitos iniciantes perdem dinheiro por falta de conhecimento. Neste guia, você vai aprender o caminho certo." },
        { tipo: "h3", texto: "💡 O Que é Tráfego Pago?" },
        { tipo: "p", texto: "Tráfego pago é quando você investe dinheiro em plataformas de anúncios (Facebook Ads, Google Ads, TikTok Ads) para levar pessoas interessadas até sua oferta." },
        { tipo: "h3", texto: "🎯 Por Onde Começar" },
        { tipo: "ul", items: [
          "Comece com pouco: R$ 10-20/dia é suficiente para testar",
          "Escolha UMA plataforma primeiro (Facebook Ads é ótimo para iniciantes)",
          "Estude o público-alvo do produto que vai vender",
          "Crie criativos simples e diretos (imagem + texto persuasivo)",
          "Teste diferentes públicos e criativos",
          "Escale o que funciona, corte o que não funciona"
        ]},
        { tipo: "h3", texto: "📊 Métricas Importantes" },
        { tipo: "p", texto: "Foque nestas métricas: CTR (taxa de cliques), CPC (custo por clique), ROAS (retorno sobre investimento). Se o ROAS for positivo, escale!" },
        { tipo: "destaque", texto: "⚠️ ERRO COMUM: Não pule a fase de testes. Invista pelo menos R$ 100-200 em testes antes de escalar. Aprender com pouco é mais barato que aprender com muito." },
        { tipo: "p", texto: "Com paciência e estudo, tráfego pago pode ser sua maior fonte de renda como afiliado. Muitos dos nossos alunos faturam R$ 10.000+/mês apenas com anúncios." }
      ]
    },
    {
      titulo: "5 Formas de Renda Extra Usando Seu Celular",
      resumo: "Ganhe dinheiro usando apenas seu smartphone. Métodos simples e comprovados para começar hoje mesmo.",
      emoji: "📱",
      categoria: "RENDA EXTRA",
      data: "08 Jan 2025",
      leitura: "6 min",
      autor: "GEH TECH 27",
      cor: "from-orange-500 to-red-500",
      conteudo: [
        { tipo: "p", texto: "Você não precisa de um computador caro para ganhar dinheiro online. Seu celular pode ser sua ferramenta de trabalho. Veja 5 formas comprovadas de gerar renda extra usando apenas seu smartphone." },
        { tipo: "h3", texto: "1. 📸 Venda Como Afiliado no Instagram" },
        { tipo: "p", texto: "Crie um perfil de nicho, poste conteúdo relevante e venda produtos como afiliado. Tudo pode ser feito pelo celular usando apps como Canva para criar artes." },
        { tipo: "h3", texto: "2. 🎬 Crie Vídeos Curtos (Reels/TikTok)" },
        { tipo: "p", texto: "Vídeos curtos são a maior tendência. Grave com seu celular, edite com apps gratuitos e monetize com afiliados ou programa de criadores." },
        { tipo: "h3", texto: "3. 💬 Responda Pesquisas e Micro-tarefas" },
        { tipo: "p", texto: "Sites como Swagbucks, Toluna e ySense pagam para você responder pesquisas. Não vai te deixar rico, mas é uma renda extra real." },
        { tipo: "h3", texto: "4. 🛍️ Revenda Produtos (Brechó Online)" },
        { tipo: "p", texto: "Use apps como Enjoei e OLX para vender coisas paradas em casa. Depois escale comprando barato e revendendo com lucro." },
        { tipo: "h3", texto: "5. ✍️ Freelance de Redação/Design" },
        { tipo: "p", texto: "Sites como Workana e 99Freelas têm projetos que você pode fazer pelo celular. Redação, design básico no Canva, edição de vídeos curtos." },
        { tipo: "destaque", texto: "💡 DICA: Comece com o que você já sabe fazer. Não tente aprender 5 coisas ao mesmo tempo. Foque em UMA estratégia e domine ela." },
        { tipo: "p", texto: "A renda extra pode se tornar sua renda principal se você levar a sério. Muitos dos nossos alunos começaram com o celular e hoje faturam milhares por mês!" }
      ]
    },
    {
      titulo: "Dropshipping em 2025: Ainda Vale a Pena?",
      resumo: "Análise completa do mercado de dropshipping: prós, contras, estratégias atualizadas e quanto dá para ganhar de verdade.",
      emoji: "📦",
      categoria: "DROPSHIPPING",
      data: "05 Jan 2025",
      leitura: "9 min",
      autor: "GEH TECH 27",
      cor: "from-violet-500 to-purple-500",
      conteudo: [
        { tipo: "p", texto: "Dropshipping continua sendo um dos modelos de negócio online mais populares. Mas será que ainda funciona em 2025? A resposta é: SIM, mas com estratégias atualizadas." },
        { tipo: "h3", texto: "📊 O Mercado Atual" },
        { tipo: "p", texto: "O e-commerce brasileiro cresceu 25% em 2024. O dropshipping representa uma fatia significativa desse crescimento, especialmente com fornecedores nacionais." },
        { tipo: "h3", texto: "✅ Vantagens do Dropshipping" },
        { tipo: "ul", items: [
          "Sem estoque físico — zero risco de produto encalhado",
          "Investimento inicial baixo (R$ 500-2000 para começar)",
          "Pode trabalhar de qualquer lugar do mundo",
          "Escalável — sem limite de vendas",
          "Variedade enorme de produtos para vender"
        ]},
        { tipo: "h3", texto: "⚠️ Desafios Reais" },
        { tipo: "p", texto: "Concorrência aumentou, margens apertaram e clientes estão mais exigentes. Mas quem se profissionaliza e usa IA para automatizar processos sai na frente." },
        { tipo: "h3", texto: "🚀 Estratégias Para 2025" },
        { tipo: "ul", items: [
          "Use fornecedores nacionais para entrega rápida",
          "Crie marca própria (branding) na sua loja",
          "Use IA para criar descrições e anúncios",
          "Foque em nichos específicos (não tente vender tudo)",
          "Invista em vídeo marketing (TikTok Shop, Reels)"
        ]},
        { tipo: "destaque", texto: "🎯 RESULTADO REAL: Nossos alunos de dropshipping faturam em média R$ 8.000-15.000/mês após 3-6 meses de dedicação. Alguns superam R$ 50.000/mês!" },
        { tipo: "p", texto: "Dropshipping não é dinheiro fácil, mas com as estratégias certas e dedicação, é totalmente possível construir um negócio lucrativo e escalável." }
      ]
    },
    {
      titulo: "Mindset de Sucesso: Como Pensar Como Um Empreendedor Digital",
      resumo: "As mentalidades e hábitos que separam quem fatura alto de quem desiste no caminho. Transforme sua mente para transformar seus resultados.",
      emoji: "🧠",
      categoria: "MINDSET",
      data: "02 Jan 2025",
      leitura: "7 min",
      autor: "GEH TECH 27",
      cor: "from-yellow-500 to-orange-500",
      conteudo: [
        { tipo: "p", texto: "O maior diferencial entre quem tem sucesso no digital e quem fracassa não é técnica — é mindset. A forma como você pensa determina seus resultados." },
        { tipo: "h3", texto: "🎯 5 Mentalidades Dos Top Afiliados" },
        { tipo: "ul", items: [
          "Pensamento de longo prazo — resultados vêm com consistência",
          "Mentalidade de aprendizado — cada 'erro' é uma lição",
          "Foco em soluções — não em problemas",
          "Disciplina sobre motivação — faça mesmo sem vontade",
          "Abundância — o mercado é infinito, tem espaço para todos"
        ]},
        { tipo: "h3", texto: "🚫 Erros Mentais Que Te Impedem" },
        { tipo: "p", texto: "Muitas pessoas desistem por causa de crenças limitantes: 'não sou bom o suficiente', 'já tem muita gente fazendo', 'não vai funcionar pra mim'. Essas vozes são o maior inimigo do seu sucesso." },
        { tipo: "h3", texto: "✅ Hábitos Diários Dos Empreendedores Digitais" },
        { tipo: "ul", items: [
          "Acordar cedo e ter uma rotina matinal produtiva",
          "Estudar pelo menos 30 minutos por dia",
          "Executar antes de perfectionar — feito é melhor que perfeito",
          "Fazer networking com pessoas que já estão onde você quer chegar",
          "Revisar métricas e ajustar estratégia semanalmente"
        ]},
        { tipo: "destaque", texto: "💎 VERDADE IMPopular: Sucesso no digital é 80% mentalidade e 20% técnica. Aprenda as técnicas, mas primeiro transforme sua mente." },
        { tipo: "p", texto: "Se você está lendo este artigo, já deu o primeiro passo. Agora é hora de agir com consistência e determinação. Os resultados virão!" }
      ]
    }
  ];

  // Combina posts do usuário com posts padrão
  const allBlogPosts = [...userPosts, ...blogPosts];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-sm">
              GT
            </div>
            <span className="font-bold text-lg">GEH TECH <span className="text-purple-400">27</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#cursos" className="text-gray-300 hover:text-white transition">Cursos</a>
            <a href="#blog" className="text-gray-300 hover:text-white transition">Blog</a>
            <a href="#ferramentas" className="text-gray-300 hover:text-white transition">Ferramentas</a>
            <a href="#depoimentos" className="text-gray-300 hover:text-white transition">Depoimentos</a>
            <a href="#contato" className="text-gray-300 hover:text-white transition">Contato</a>
            <button onClick={() => setShowAdmin(true)} className="text-purple-400 hover:text-purple-300 transition font-semibold">
              ✍️ Admin
            </button>
          </div>

          <div className="hidden md:block">
            <a href="https://pay.kiwify.com.br/coFUVr7" target="_blank" rel="noopener noreferrer" className="btn-viral px-6 py-2 rounded-full font-semibold text-sm">
              Começar Agora
            </a>
          </div>

          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden glass-card px-4 py-4 flex flex-col gap-4">
            <a href="#cursos" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Cursos</a>
            <a href="#blog" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Blog</a>
            <a href="#ferramentas" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Ferramentas</a>
            <a href="#depoimentos" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Depoimentos</a>
            <a href="#contato" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Contato</a>
            <button onClick={() => { setShowAdmin(true); setMenuOpen(false); }} className="text-purple-400 hover:text-purple-300 transition font-semibold text-left">
              ✍️ Admin
            </button>
            <a href="https://pay.kiwify.com.br/coFUVr7" target="_blank" rel="noopener noreferrer" className="btn-viral px-6 py-2 rounded-full font-semibold text-sm text-center" onClick={() => setMenuOpen(false)}>
              Começar Agora
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-slide-up">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-300">+12.000 alunos transformados</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-gradient">GEH TECH 27</span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Sua Renda Digital Começa <span className="text-purple-400">AQUI</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Cursos, ferramentas e estratégias comprovadas para você conquistar sua 
            <span className="text-cyan-400 font-semibold"> liberdade financeira</span> trabalhando de casa com internet.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <a href="https://pay.kiwify.com.br/coFUVr7" target="_blank" rel="noopener noreferrer" className="btn-viral px-8 py-4 rounded-full font-bold text-lg animate-pulse-glow">
              🔥 QUERO DO ZERO AO MILHÃO
            </a>
            <a href="#depoimentos" className="px-8 py-4 rounded-full font-bold text-lg border border-purple-500/50 hover:bg-purple-500/10 transition">
              💬 VER DEPOIMENTOS
            </a>
          </div>

          {/* Countdown */}
          <div className="glass-card rounded-2xl p-6 max-w-lg mx-auto animate-slide-up animate-count-pulse" style={{ animationDelay: '0.5s' }}>
            <p className="text-sm text-red-400 font-semibold mb-3">⚡ OFERTA POR TEMPO LIMITADO ⚡</p>
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white bg-purple-500/20 rounded-lg px-4 py-2">{String(countdown.hours).padStart(2, '0')}</div>
                <span className="text-xs text-gray-400 mt-1">Horas</span>
              </div>
              <div className="text-3xl font-bold text-purple-400 self-start mt-2">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white bg-purple-500/20 rounded-lg px-4 py-2">{String(countdown.minutes).padStart(2, '0')}</div>
                <span className="text-xs text-gray-400 mt-1">Min</span>
              </div>
              <div className="text-3xl font-bold text-purple-400 self-start mt-2">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white bg-purple-500/20 rounded-lg px-4 py-2">{String(countdown.seconds).padStart(2, '0')}</div>
                <span className="text-xs text-gray-400 mt-1">Seg</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LANÇAMENTO - Banner Principal */}
      <section className="py-10 px-4 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-cyan-900/20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Badge de Lançamento */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm animate-pulse">
              🔴 LANÇAMENTO EXCLUSIVO — VAGAS LIMITADAS 🔴
            </span>
          </div>

          {/* Card Principal do Produto */}
          <div className="glass-card rounded-3xl overflow-hidden border-2 border-purple-500/30 animate-pulse-glow">
            {/* Header do Card */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 animate-gradient p-8 md:p-12 text-center relative">
              <div className="absolute top-4 right-4 bg-yellow-400 text-black font-black text-xs px-3 py-1 rounded-full rotate-3">
                ⚡ 94% OFF
              </div>
              <div className="text-6xl md:text-8xl mb-4 animate-float">💰🤖</div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-3 leading-tight">
                Do Zero ao Milhão
              </h2>
              <div className="text-xl md:text-3xl font-bold text-yellow-300 mb-2">
                Comissões + IA
              </div>
              <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto">
                O método definitivo para gerar comissões altas usando Inteligência Artificial — mesmo que você nunca tenha vendido nada na internet.
              </p>
            </div>

            {/* Body do Card */}
            <div className="p-6 md:p-10">
              {/* O que você vai aprender */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm">Funis de Venda com IA</p>
                    <p className="text-gray-400 text-xs">Automatize vendas 24h por dia</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm">ChatGPT para Afiliados</p>
                    <p className="text-gray-400 text-xs">Copys que vendem no automático</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm">Tráfego Pago Inteligente</p>
                    <p className="text-gray-400 text-xs">Anúncios que se pagam em 24h</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm">Estratégia do Milhão</p>
                    <p className="text-gray-400 text-xs">Escala de R$0 a R$100K/mês</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm">+50 Templates de IA</p>
                    <p className="text-gray-400 text-xs">Prompts prontos para vender mais</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm">Comunidade VIP Vitalícia</p>
                    <p className="text-gray-400 text-xs">Networking com quem fatura alto</p>
                  </div>
                </div>
              </div>

              {/* Preço */}
              <div className="text-center mb-8">
                <p className="text-gray-500 text-sm mb-1">De <span className="line-through">R$ 5.000,00</span> por apenas:</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-5xl md:text-6xl font-black text-gradient">R$ 299</span>
                  <span className="text-gray-400 text-lg">,00</span>
                </div>
                <p className="text-green-400 text-sm mt-2 font-semibold">ou 12x de R$ 29,90 no cartão</p>
                <p className="text-gray-500 text-xs mt-1">🔒 Pagamento 100% seguro • Acesso imediato</p>
              </div>

              {/* Botão CTA */}
              <div className="text-center">
                <a 
                  href="https://pay.kiwify.com.br/coFUVr7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full md:w-auto btn-viral px-12 py-5 rounded-2xl font-black text-lg md:text-xl animate-pulse-glow inline-block text-center"
                >
                  🚀 QUERO COMEÇAR AGORA — GARANTIR MINHA VAGA
                </a>
                <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-400">
                  <span>🛡️ Garantia 7 dias</span>
                  <span>⚡ Acesso imediato</span>
                  <span>📱 Suporte no WhatsApp</span>
                  <span>🏆 Certificado incluso</span>
                </div>
              </div>

              {/* Urgência */}
              <div className="mt-8 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
                <p className="text-red-400 font-bold text-sm">
                  ⚠️ ATENÇÃO: Apenas <span className="text-white font-black">47 vagas</span> restantes com esse preço. 
                  Depois volta para R$ 5.000,00!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEGUNDO PRODUTO - Oferta Especial */}
      <section className="py-10 px-4 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-green-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Badge */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 text-white font-bold text-sm animate-pulse">
              🔥 OFERTA ESPECIAL — COMBO COMPLEMENTAR 🔥
            </span>
          </div>

          {/* Card do Produto */}
          <div className="glass-card rounded-3xl overflow-hidden border-2 border-cyan-500/30 card-hover">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 via-green-600 to-emerald-600 animate-gradient p-8 md:p-10 text-center relative">
              <div className="absolute top-4 right-4 bg-red-500 text-white font-black text-xs px-3 py-1 rounded-full rotate-3 animate-pulse">
                ⚡ 95% OFF
              </div>
              <div className="text-6xl md:text-7xl mb-4 animate-float">🎯💸</div>
              <h2 className="text-3xl md:text-5xl font-black mb-3 leading-tight">
                Método Comissões Automáticas
              </h2>
              <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
                Sistema completo para gerar vendas no automático todos os dias usando estratégias validadas e ferramentas de IA.
              </p>
            </div>

            {/* Body */}
            <div className="p-6 md:p-10">
              {/* Benefícios */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm">Máquina de Vendas 24h</p>
                    <p className="text-gray-400 text-xs">Venda enquanto dorme</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm">Funis Prontos para Usar</p>
                    <p className="text-gray-400 text-xs">Copie e cole estratégias que funcionam</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm">Tráfego Orgânico + Pago</p>
                    <p className="text-gray-400 text-xs">Atraia clientes sem gastar fortuna</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm">Suporte + Mentoria em Grupo</p>
                    <p className="text-gray-400 text-xs">Acompanhamento semanal ao vivo</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm">+100 Prompts de IA</p>
                    <p className="text-gray-400 text-xs">Crie conteúdo que vende no automático</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm">Acesso Vitalício</p>
                    <p className="text-gray-400 text-xs">Pague uma vez, use para sempre</p>
                  </div>
                </div>
              </div>

              {/* Preço */}
              <div className="text-center mb-8">
                <p className="text-gray-500 text-sm mb-1">De <span className="line-through">R$ 1.900,00</span> por apenas:</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-5xl md:text-6xl font-black text-gradient">R$ 97</span>
                  <span className="text-gray-400 text-lg">,00</span>
                </div>
                <p className="text-green-400 text-sm mt-2 font-semibold">ou 12x de R$ 9,70 no cartão</p>
                <p className="text-gray-500 text-xs mt-1">🔒 Pagamento 100% seguro • Acesso imediato</p>
              </div>

              {/* Botão CTA */}
              <div className="text-center">
                <a 
                  href="https://pay.kiwify.com.br/HzoHThM" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full md:w-auto inline-block btn-viral px-12 py-5 rounded-2xl font-black text-lg md:text-xl animate-pulse-glow"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #10b981)' }}
                >
                  🎯 QUERO ESTE MÉTODO AGORA
                </a>
                <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-400">
                  <span>🛡️ Garantia 7 dias</span>
                  <span>⚡ Acesso imediato</span>
                  <span>📱 Suporte no WhatsApp</span>
                  <span>🏆 Certificado incluso</span>
                </div>
              </div>

              {/* Urgência */}
              <div className="mt-8 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 text-center">
                <p className="text-cyan-300 font-bold text-sm">
                  ⚡ OFERTA RELÂMPAGO: Preço promocional por tempo limitado! Aproveite antes que acabe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "12K+", label: "Alunos", icon: "👨‍🎓" },
            { num: "97%", label: "Aprovação", icon: "⭐" },
            { num: "50+", label: "Cursos", icon: "📚" },
            { num: "R$2M+", label: "Faturados", icon: "💰" },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 text-center card-hover">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.num}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cursos Section */}
      <section id="cursos" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Nossos Cursos</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
              Transforme Seu <span className="text-gradient">Futuro</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Cursos práticos e direto ao ponto para você começar a ganhar dinheiro online HOJE.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursos.map((curso, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden card-hover group">
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${curso.cor} p-6 relative`}>
                  <span className="absolute top-3 right-3 bg-black/30 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {curso.tag}
                  </span>
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{curso.emoji}</div>
                  <h3 className="text-xl font-bold">{curso.titulo}</h3>
                </div>
                
                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-400 text-sm mb-4">{curso.descricao}</p>
                  
                  {/* Badge Gratuito */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full">
                      📚 ARTIGOS GRATUITOS
                    </span>
                  </div>

                  {/* Lista de Artigos */}
                  <div className="space-y-2 mb-4">
                    {curso.artigos.map((artigo, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm">
                        <span className="text-purple-400 mt-0.5">📖</span>
                        <span className="text-gray-300 text-xs leading-relaxed">{artigo}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                    <span>✅ 100% Gratuito</span>
                    <span>✅ Acesso imediato</span>
                  </div>

                  <button 
                    onClick={() => setSelectedPost(blogPosts[curso.artigoIndex])}
                    className="w-full btn-viral py-3 rounded-xl font-bold text-sm"
                  >
                    📖 LER ARTIGOS GRATUITOS →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ferramentas Section */}
      <section id="ferramentas" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Ferramentas Exclusivas</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
              Tudo Que Você <span className="text-gradient">Precisa</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Além dos cursos, você tem acesso a ferramentas e bônus exclusivos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ferramentas.map((ferramenta, i) => (
              <div 
                key={i} 
                className={`glass-card rounded-2xl p-6 card-hover flex items-start gap-4 ${ferramenta.nome === 'Templates Prontos' ? 'cursor-pointer border-2 border-purple-500/50 hover:border-purple-500' : ''}`}
                onClick={ferramenta.nome === 'Templates Prontos' ? () => setShowTemplates(true) : undefined}
              >
                <div className="text-4xl">{ferramenta.icon}</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{ferramenta.nome}</h3>
                  <p className="text-gray-400 text-sm">{ferramenta.desc}</p>
                  {ferramenta.nome === 'Templates Prontos' && (
                    <span className="text-purple-400 text-xs font-semibold mt-2 inline-block">Clique para ver →</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-pink-400 font-semibold text-sm uppercase tracking-wider">Blog GEH TECH 27</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
              Conteúdo <span className="text-gradient">Gratuito</span> Para Você
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Artigos, dicas e estratégias para você começar a ganhar dinheiro online hoje mesmo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBlogPosts.map((post, i) => (
              <article 
                key={i} 
                className={`glass-card rounded-2xl overflow-hidden card-hover cursor-pointer group ${post.id ? 'border-2 border-green-500/30' : ''}`}
                onClick={() => setSelectedPost(post)}
              >
                {post.id && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    ✨ SEU ARTIGO
                  </div>
                )}
                {/* Imagem/Emoji do Post */}
                <div className={`bg-gradient-to-r ${post.cor} p-8 text-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="relative z-10">
                    <div className="text-6xl mb-2 group-hover:scale-110 transition-transform">{post.emoji}</div>
                    <span className="inline-block bg-black/30 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {post.categoria}
                    </span>
                  </div>
                </div>
                
                {/* Conteúdo */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <span>📅 {post.data}</span>
                    <span>•</span>
                    <span>⏱️ {post.leitura}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                    {post.titulo}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.resumo}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                      Ler mais →
                    </span>
                    <span className="text-xs text-gray-500">{post.autor}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA do Blog */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Quer aprender mais? Nossos cursos têm conteúdo completo e prático!</p>
            <a href="https://pay.kiwify.com.br/coFUVr7" target="_blank" rel="noopener noreferrer" className="btn-viral px-8 py-3 rounded-full font-bold inline-block">
              📚 ACESSAR CURSOS COMPLETOS
            </a>
          </div>
        </div>
      </section>

      {/* Modal do Post */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedPost(null)}>
          <div className="glass-card rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header do Modal */}
            <div className={`bg-gradient-to-r ${selectedPost.cor} p-8 relative`}>
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition"
              >
                ✕
              </button>
              <div className="text-6xl mb-4">{selectedPost.emoji}</div>
              <span className="inline-block bg-black/30 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                {selectedPost.categoria}
              </span>
              <h2 className="text-2xl md:text-3xl font-black">{selectedPost.titulo}</h2>
              <div className="flex items-center gap-3 mt-4 text-sm text-white/80">
                <span>📅 {selectedPost.data}</span>
                <span>•</span>
                <span>⏱️ {selectedPost.leitura}</span>
                <span>•</span>
                <span>✍️ {selectedPost.autor}</span>
              </div>
            </div>

            {/* Conteúdo do Post */}
            <div className="p-8">
              <div className="prose prose-invert max-w-none">
                {selectedPost.conteudo.map((paragrafo: any, i: number) => (
                  <div key={i} className="mb-6">
                    {paragrafo.tipo === 'h3' && (
                      <h3 className="text-xl font-bold text-purple-400 mb-3">{paragrafo.texto}</h3>
                    )}
                    {paragrafo.tipo === 'p' && (
                      <p className="text-gray-300 leading-relaxed">{paragrafo.texto}</p>
                    )}
                    {paragrafo.tipo === 'ul' && (
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        {paragrafo.items?.map((item: string, j: number) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {paragrafo.tipo === 'destaque' && (
                      <div className="bg-purple-500/10 border-l-4 border-purple-500 p-4 rounded-r-lg">
                        <p className="text-purple-300 font-semibold">{paragrafo.texto}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA no final do post */}
              <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl p-6 text-center border border-purple-500/30">
                <h3 className="text-xl font-bold mb-3">🚀 Quer Aprender Mais na Prática?</h3>
                <p className="text-gray-400 mb-4">Nossos cursos têm passo a passo completo para você aplicar tudo isso e começar a faturar!</p>
                <a 
                  href="https://pay.kiwify.com.br/coFUVr7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-viral px-8 py-3 rounded-full font-bold inline-block"
                >
                  QUERO O CURSO COMPLETO →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Admin */}
      {showAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => { setShowAdmin(false); setAdminLogged(false); }}>
          <div className="glass-card rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 animate-gradient p-6 relative">
              <button 
                onClick={() => { setShowAdmin(false); setAdminLogged(false); }}
                className="absolute top-4 right-4 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition text-white text-xl"
              >
                ✕
              </button>
              <div className="text-5xl mb-3">✍️</div>
              <h2 className="text-3xl font-black mb-2">Painel de Administração</h2>
              <p className="text-white/90">Crie e gerencie seus artigos diretamente no site</p>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto flex-1 p-6">
              {!adminLogged ? (
                // Tela de Login
                <div className="max-w-md mx-auto text-center">
                  <div className="text-6xl mb-4">🔐</div>
                  <h3 className="text-2xl font-bold mb-4">Acesso Restrito</h3>
                  <p className="text-gray-400 mb-6">Digite a senha para acessar o painel</p>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                    placeholder="Digite a senha..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 mb-4"
                  />
                  <button
                    onClick={handleAdminLogin}
                    className="w-full btn-viral py-3 rounded-xl font-bold"
                  >
                    🚀 ENTRAR NO PAINEL
                  </button>
                  <p className="text-gray-500 text-xs mt-4">Senha padrão: gehtech27</p>
                </div>
              ) : showCreatePost ? (
                // Formulário de Criação
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">📝 Criar Novo Artigo</h3>
                    <button
                      onClick={() => setShowCreatePost(false)}
                      className="text-gray-400 hover:text-white transition"
                    >
                      ← Voltar
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Título */}
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Título do Artigo *</label>
                      <input
                        type="text"
                        value={newPost.titulo}
                        onChange={(e) => setNewPost({ ...newPost, titulo: e.target.value })}
                        placeholder="Ex: Como Ganhar Dinheiro Online em 2025"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    {/* Resumo */}
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Resumo (aparece no card) *</label>
                      <textarea
                        value={newPost.resumo}
                        onChange={(e) => setNewPost({ ...newPost, resumo: e.target.value })}
                        placeholder="Um resumo curto de 2-3 linhas sobre o artigo..."
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                      />
                    </div>

                    {/* Emoji e Categoria */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-300">Emoji</label>
                        <input
                          type="text"
                          value={newPost.emoji}
                          onChange={(e) => setNewPost({ ...newPost, emoji: e.target.value })}
                          placeholder="🚀"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-300">Categoria</label>
                        <input
                          type="text"
                          value={newPost.categoria}
                          onChange={(e) => setNewPost({ ...newPost, categoria: e.target.value })}
                          placeholder="MARKETING"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    {/* Tempo de Leitura */}
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Tempo de Leitura</label>
                      <input
                        type="text"
                        value={newPost.leitura}
                        onChange={(e) => setNewPost({ ...newPost, leitura: e.target.value })}
                        placeholder="5 min"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    {/* Cor */}
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Cor do Header</label>
                      <select
                        value={newPost.cor}
                        onChange={(e) => setNewPost({ ...newPost, cor: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="from-purple-500 to-pink-500" className="bg-gray-900">🟣 Roxo/Rosa</option>
                        <option value="from-cyan-500 to-blue-500" className="bg-gray-900">🔵 Ciano/Azul</option>
                        <option value="from-green-500 to-emerald-500" className="bg-gray-900">🟢 Verde</option>
                        <option value="from-orange-500 to-red-500" className="bg-gray-900">🟠 Laranja/Vermelho</option>
                        <option value="from-violet-500 to-purple-500" className="bg-gray-900">🟪 Violeta/Roxo</option>
                        <option value="from-yellow-500 to-orange-500" className="bg-gray-900">🟡 Amarelo/Laranja</option>
                      </select>
                    </div>

                    {/* Conteúdo */}
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">Conteúdo do Artigo</label>
                      <div className="space-y-3">
                        {newPost.conteudo.map((block, i) => (
                          <div key={i} className="flex gap-2">
                            <select
                              value={block.tipo}
                              onChange={(e) => {
                                const updated = [...newPost.conteudo];
                                updated[i] = { ...updated[i], tipo: e.target.value };
                                setNewPost({ ...newPost, conteudo: updated });
                              }}
                              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 w-32"
                            >
                              <option value="p" className="bg-gray-900">Parágrafo</option>
                              <option value="h3" className="bg-gray-900">Subtítulo</option>
                              <option value="ul" className="bg-gray-900">Lista</option>
                              <option value="destaque" className="bg-gray-900">Destaque</option>
                            </select>
                            <input
                              type="text"
                              value={block.texto}
                              onChange={(e) => updateContentBlock(i, e.target.value)}
                              placeholder={block.tipo === 'ul' ? 'Item 1, Item 2, Item 3 (separados por vírgula)' : 'Digite o conteúdo...'}
                              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500"
                            />
                            <button
                              onClick={() => removeContentBlock(i)}
                              className="bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-lg px-3 py-2 transition"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      {/* Botões para adicionar blocos */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        <button
                          onClick={() => addContentBlock('p')}
                          className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/40 rounded-lg px-3 py-2 text-sm transition"
                        >
                          + Parágrafo
                        </button>
                        <button
                          onClick={() => addContentBlock('h3')}
                          className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/40 rounded-lg px-3 py-2 text-sm transition"
                        >
                          + Subtítulo
                        </button>
                        <button
                          onClick={() => addContentBlock('ul')}
                          className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/40 rounded-lg px-3 py-2 text-sm transition"
                        >
                          + Lista
                        </button>
                        <button
                          onClick={() => addContentBlock('destaque')}
                          className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/40 rounded-lg px-3 py-2 text-sm transition"
                        >
                          + Destaque
                        </button>
                      </div>
                    </div>

                    {/* Botão Publicar */}
                    <button
                      onClick={handleCreatePost}
                      className="w-full btn-viral py-4 rounded-xl font-bold text-lg mt-6"
                    >
                      🚀 PUBLICAR ARTIGO
                    </button>
                  </div>
                </div>
              ) : (
                // Lista de Artigos
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">📚 Meus Artigos ({userPosts.length})</h3>
                    <button
                      onClick={() => setShowCreatePost(true)}
                      className="btn-viral px-6 py-2 rounded-xl font-bold"
                    >
                      + Novo Artigo
                    </button>
                  </div>

                  {userPosts.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📝</div>
                      <p className="text-gray-400 mb-4">Você ainda não publicou nenhum artigo</p>
                      <button
                        onClick={() => setShowCreatePost(true)}
                        className="btn-viral px-6 py-3 rounded-xl font-bold"
                      >
                        ✨ Criar Primeiro Artigo
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {userPosts.map((post) => (
                        <div key={post.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-3xl">{post.emoji}</div>
                            <div>
                              <h4 className="font-bold text-sm">{post.titulo}</h4>
                              <p className="text-gray-400 text-xs">{post.data} • {post.categoria}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-lg px-3 py-2 text-sm transition"
                          >
                            🗑️ Excluir
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Templates */}
      {showTemplates && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setShowTemplates(false)}>
          <div className="glass-card rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Header do Modal */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 animate-gradient p-6 md:p-8 relative">
              <button 
                onClick={() => setShowTemplates(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition text-white text-xl"
              >
                ✕
              </button>
              <div className="text-5xl mb-3">📋</div>
              <h2 className="text-3xl md:text-4xl font-black mb-2">500 Templates & Prompts</h2>
              <p className="text-white/90">Prompts prontos para usar com ChatGPT, IA e marketing digital</p>
              <div className="flex gap-2 mt-4 flex-wrap">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">✅ Copie e use</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">✅ Editável</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">✅ 5 Categorias</span>
              </div>
            </div>

            {/* Filtros */}
            <div className="p-4 border-b border-white/10 flex gap-2 flex-wrap">
              <button 
                onClick={() => setTemplateCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${templateCategory === 'all' ? 'bg-purple-500 text-white' : 'glass-card text-gray-300 hover:text-white'}`}
              >
                Todos ({templates.length})
              </button>
              <button 
                onClick={() => setTemplateCategory('marketing')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${templateCategory === 'marketing' ? 'bg-purple-500 text-white' : 'glass-card text-gray-300 hover:text-white'}`}
              >
                📈 Marketing (100)
              </button>
              <button 
                onClick={() => setTemplateCategory('copywriting')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${templateCategory === 'copywriting' ? 'bg-purple-500 text-white' : 'glass-card text-gray-300 hover:text-white'}`}
              >
                ✍️ Copywriting (100)
              </button>
              <button 
                onClick={() => setTemplateCategory('instagram')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${templateCategory === 'instagram' ? 'bg-purple-500 text-white' : 'glass-card text-gray-300 hover:text-white'}`}
              >
                📸 Social Media (100)
              </button>
              <button 
                onClick={() => setTemplateCategory('vendas')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${templateCategory === 'vendas' ? 'bg-purple-500 text-white' : 'glass-card text-gray-300 hover:text-white'}`}
              >
                💰 Vendas (100)
              </button>
              <button 
                onClick={() => setTemplateCategory('ia')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${templateCategory === 'ia' ? 'bg-purple-500 text-white' : 'glass-card text-gray-300 hover:text-white'}`}
              >
                🤖 IA/ChatGPT (100)
              </button>
            </div>

            {/* Lista de Templates */}
            <div className="overflow-y-auto flex-1 p-4 md:p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {filteredTemplates.map((template, i) => (
                  <div key={template.id} className="glass-card rounded-xl p-4 hover:border-purple-500/50 transition group">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold text-sm text-purple-300">#{template.id} - {template.title}</h3>
                      <button 
                        onClick={() => copyToClipboard(template.prompt, i)}
                        className={`shrink-0 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                          copiedIndex === i 
                            ? 'bg-green-500 text-white' 
                            : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/40'
                        }`}
                      >
                        {copiedIndex === i ? '✓ Copiado!' : '📋 Copiar'}
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{template.prompt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="p-4 border-t border-white/10 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 text-center">
              <p className="text-gray-300 text-sm mb-3">
                💡 <strong>Dica:</strong> Substitua os campos entre [colchetes] pelas suas informações!
              </p>
              <a 
                href="https://pay.kiwify.com.br/coFUVr7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-viral px-8 py-3 rounded-full font-bold inline-block text-sm"
              >
                🚀 QUER PROMPTS AINDA MAIS AVANÇADOS? ACESSE O CURSO COMPLETO
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Depoimentos Section */}
      <section id="depoimentos" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">Depoimentos Reais</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
              Quem Já <span className="text-gradient">Transformou</span> a Vida
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Veja o que nossos alunos estão dizendo sobre os resultados que alcançaram.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {depoimentos.map((dep, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 card-hover">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: dep.estrelas }).map((_, j) => (
                    <span key={j} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{dep.texto}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-sm">
                      {dep.nome[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{dep.nome}</p>
                      <p className="text-xs text-gray-500">Aluno verificado ✓</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold text-sm">{dep.valor}</p>
                    <p className="text-xs text-gray-500">faturamento/mês</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="glass-card rounded-3xl p-10 md:p-16">
            <div className="text-6xl mb-6 animate-float">🚀</div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Pronto Para <span className="text-gradient">Mudar</span> de Vida?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Não perca mais tempo. Milhares de pessoas já estão faturando com internet. 
              Sua vez é AGORA. Garanta seu acesso com desconto exclusivo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="https://pay.kiwify.com.br/coFUVr7" target="_blank" rel="noopener noreferrer" className="btn-viral px-10 py-4 rounded-full font-bold text-lg animate-pulse-glow">
                🔥 GARANTIR MINHA VAGA
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span>✅ Garantia 7 dias</span>
              <span>✅ Acesso imediato</span>
              <span>✅ Suporte dedicado</span>
              <span>✅ Pagamento seguro</span>
            </div>
          </div>
        </div>
      </section>

      {/* Botões Flutuantes */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {/* Botão Suporte 24h */}
        <a 
          href="https://wa.me/62994890654?text=Olá! Preciso de suporte 24h" 
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-14 h-14 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all animate-pulse-glow"
          style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' }}
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          {/* Badge 24h */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full animate-pulse">24h</span>
          {/* Tooltip */}
          <span className="absolute right-full mr-3 bg-black/90 text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Suporte 24h
          </span>
        </a>

        {/* Botão WhatsApp */}
        <a 
          href="https://wa.me/62994890654?text=Olá! Quero saber mais sobre os cursos GEH TECH 27" 
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all animate-pulse-glow"
          style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)' }}
        >
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {/* Tooltip */}
          <span className="absolute right-full mr-3 bg-black/90 text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            WhatsApp
          </span>
        </a>
      </div>

      {/* Footer */}
      <footer id="contato" className="border-t border-white/10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-sm">
                  GT
                </div>
                <span className="font-bold text-lg">GEH TECH <span className="text-purple-400">27</span></span>
              </div>
              <p className="text-gray-400 text-sm">
                Transformando vidas através da educação digital. Cursos práticos para quem quer resultados reais.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Links Rápidos</h3>
              <div className="flex flex-col gap-2">
                <a href="#cursos" className="text-gray-400 hover:text-white transition text-sm">Cursos</a>
                <a href="#blog" className="text-gray-400 hover:text-white transition text-sm">Blog</a>
                <a href="#ferramentas" className="text-gray-400 hover:text-white transition text-sm">Ferramentas</a>
                <a href="#depoimentos" className="text-gray-400 hover:text-white transition text-sm">Depoimentos</a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Redes Sociais</h3>
              <div className="flex gap-3">
                {/* Facebook */}
                <a href="https://www.facebook.com/Gehtech27/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass-card rounded-xl flex items-center justify-center hover:bg-blue-500/20 transition group">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/geconiasviana" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass-card rounded-xl flex items-center justify-center hover:bg-pink-500/20 transition group">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-pink-500 transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a href="#" className="w-12 h-12 glass-card rounded-xl flex items-center justify-center hover:bg-purple-500/20 transition group">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:bg-purple-500/20 transition">
                  <span className="text-lg">💬</span>
                </a>
              </div>
              <p className="text-gray-500 text-xs mt-4">
                contato@gehtech27.com
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 GEH TECH 27. Todos os direitos reservados.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Este site não faz parte do Facebook ou Google. Os resultados podem variar de pessoa para pessoa.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
