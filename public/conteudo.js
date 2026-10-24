/* Vira Votos: perguntas, fatos com fonte e regras de montagem do roteiro.
   Fatos de Lula: plano registrado no TSE (proposta-pt, páginas impressas) e imprensa com data.
   Fatos de Flávio: plano registrado no TSE (proposta-pl, páginas do PDF) e declarações com data. */
(function () {
  'use strict';
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  var PL = 'https://www.tse.jus.br/eleicoes/eleicoes-2026-content/arquivos/proposta-pt/@@download/file';
  var PF = 'https://www.tse.jus.br/eleicoes/eleicoes-2026-content/arquivos/proposta-pl/@@display-file/file/proposta-pl.pdf';
  var F = {
    planoLula: ['Plano de Lula no TSE', PL],
    planoFlavio: ['Plano de Flávio no TSE', PF],
    ir: ['Lei 15.270/2025 (IR até R$ 5 mil)', 'https://documentacao.senior.com.br/exigenciaslegais/destaques/imposto-de-renda-2026'],
    minimo: ['Congresso em Foco: mínimo de R$ 1.621', 'https://www.congressoemfoco.com.br/noticia/115146/governo-oficializa-reajuste-do-salario-minimo-para-r-1-621-em-2026'],
    gas: ['SBT News: Gás do Povo', 'https://sbtnews.sbt.com.br/noticia/brasil/gas-do-povo-vale-recarga-e-liberado-para-4-5-milhoes-de-familias-nesta-segunda-23'],
    farmacia: ['Futuro da Saúde: Farmácia Popular gratuita', 'https://futurodasaude.com.br/farmacia-popular-gratuidade/'],
    comida: ['CNA: alimentos no IPCA de setembro', 'https://cnabrasil.org.br/storage/arquivos/files/Ed.18-CT-IPCA-IPCA-14.OUT.2026.pdf'],
    ipca: ['Money Times: IPCA de setembro', 'https://www.moneytimes.com.br/ipca-dispara-em-setembro-e-fica-acima-do-teto-da-meta/'],
    desemprego: ['IBGE via Acessa: desemprego de 5,3%', 'https://www.acessa.com/economia/2026/09/341214-taxa-de-desemprego-fica-em-53-no-trimestre-ate-agosto-revela-ibge.html'],
    fome: ['O Povo: Brasil sai do Mapa da Fome', 'https://www.opovo.com.br/noticias/brasil/2025/07/28/brasil-sai-do-mapa-da-fome-anuncia-onu.html'],
    seisx1: ['Band: Congresso promulga fim da 6x1', 'https://www.band.com.br/nacional/brasil/congresso-oficializa-pec-que-acaba-com-escala-6x1-202610160836'],
    seisx1Lula: ['Gazeta do Povo: promulgação com Lula', 'https://www.gazetadopovo.com.br/republica/congresso-promulga-fim-escala-6x1-ato-com-lula/'],
    flavio6x1: ['O Liberal: Flávio muda de ideia e vota a favor', 'https://www.oliberal.com/politica/apos-mudar-de-ideia-flavio-bolsonaro-vota-a-favor-da-pec-do-fim-da-escala-6x1-1.1182711'],
    flavio6x1b: ['Bahia Notícias: "liberdade para escolher a jornada"', 'https://www.bahianoticias.com.br/folha/noticia/406844-flavio-bolsonaro-evita-dizer-como-votara-sobre-6x1-e-diz-que-trabalhador-deve-ter-liberdade'],
    flavioGlobo: ['O Liberal: entrevista de Flávio à Globo, 16/10', 'https://www.oliberal.com/politica/flavio-diz-que-nao-vai-desvincular-reajuste-do-minimo-e-nem-alterar-pisos-de-saude-e-educacao-1.1183567'],
    bolsaPosts: ['A Gazeta/Estadão: Flávio apaga posts sobre o Bolsa Família', 'https://www.agazeta.com.br/brasil/flavio-bolsonaro-apaga-posts-com-criticas-ao-bolsa-familia-1026'],
    indulto: ['ISTOÉ: Flávio promete indulto ao pai', 'https://istoe.com.br/em-ato-na-paulista-flavio-promete-levar-bolsonaro-de-volta-ao-poder'],
    inss: ['Poder360: Lula demite presidente do INSS', 'https://www.poder360.com.br/poder-governo/lula-manda-demitir-presidente-do-inss-apos-operacao-da-pf/'],
    inssDev: ['SBT News: R$ 2,82 bi devolvidos', 'https://sbtnews.sbt.com.br/noticia/economia/ressarcimento-de-aposentados-e-pensionistas-por-fraude-no-inss-chega-a-r-2-82-bilhoes'],
    mortes: ['Congresso em Foco: mortes violentas no menor patamar em 14 anos', 'https://www.congressoemfoco.com.br/noticia/120720/mortes-violentas-chegam-ao-menor-patamar-em-14-anos-veja-mapa'],
    antifaccao: ['Poder360: Lula sanciona Lei Antifacção', 'https://www.poder360.com.br/brasil/lula-sanciona-pl-antifaccao-com-veto-e-sem-alcolumbre-no-planalto/'],
    saudeLula: ['Poder360: a saúde de Lula', 'https://www.poder360.com.br/poder-governo/saude-de-lula-sera-tema-recorrente-nos-calculos-para-2026/'],
    pesquisa: ['Exame: pesquisa CNT/MDA', 'https://exame.com/brasil/pesquisa-para-presidente-cnt-mda-flavio-bolsonaro-tem-507-e-lula-493-dos-votos-valdios/'],
    ondeVotar: ['TSE: onde votar', 'https://www.tse.jus.br/servicos-eleitorais/autoatendimento-eleitoral#/atendimento-eleitor/onde-votar'],
    res23751: ['Resolução TSE 23.751/2026', 'https://www.tse.jus.br/legislacao/compilada/res/2026/resolucao-no-23-751-de-26-de-fevereiro-de-2026'],
    justificar: ['TSE: prazos para justificar', 'https://www.tse.jus.br/comunicacao/noticias/2026/Outubro/manual-do-eleitor-veja-os-prazos-para-justificar-ausencia-nas-eleicoes-2026']
  };
  function a(f) { return '<a href="' + f[1] + '" target="_blank" rel="noopener noreferrer">' + f[0] + '</a>'; }

  /* ---------- Perguntas ---------- */
  var perguntas = [
    { id: 'nome', tipo: 'texto', opcional: true, titulo: 'Como você chama essa pessoa?', ajuda: 'Serve só para o roteiro sair com o nome certo. Fica guardado no seu aparelho.', placeholder: 'Ex.: tia Rosa' },
    { id: 'relacao', titulo: 'Quem é {nome} para você?', opcoes: [
      { v: 'familia', t: 'Família próxima', d: 'Mãe, pai, irmão, filho, cônjuge' },
      { v: 'parente', t: 'Outro parente', d: 'Tio, primo, sogro, cunhado' },
      { v: 'amigo', t: 'Amizade', d: 'Alguém que confia em você' },
      { v: 'trabalho', t: 'Colega de trabalho' },
      { v: 'conhecido', t: 'Vizinho ou conhecido' }
    ] },
    { id: 'voto1', titulo: 'Em quem {nome} votou no 1º turno?', ajuda: 'Se não tiver certeza, marque o que você acha mais provável.', duas: true, opcoes: [
      { v: 'flavio', t: 'Flávio Bolsonaro' },
      { v: 'terceira', t: 'Outro candidato', d: 'Cury, Renan Santos, Caiado, Zema ou outro' },
      { v: 'lula', t: 'Lula', d: 'E você quer garantir que vote de novo' },
      { v: 'branco', t: 'Branco ou nulo' },
      { v: 'naofoi', t: 'Não foi votar' },
      { v: 'naosei', t: 'Não sei' }
    ] },
    { id: 'firmeza', titulo: 'E para domingo, como {nome} está?', se: function (r) { return r.voto1 !== 'lula'; }, opcoes: [
      { v: 'flavio_firme', t: 'Fechado com o Flávio', d: 'Defende o voto com convicção' },
      { v: 'flavio_leve', t: 'Pende para o Flávio, mas escuta' },
      { v: 'duvida', t: 'Em dúvida entre os dois' },
      { v: 'nulo', t: 'Pensa em anular, votar em branco ou não ir' },
      { v: 'lula_leve', t: 'Pende para o Lula, mas pode não ir' },
      { v: 'naosei', t: 'Não sei dizer' }
    ] },
    { id: 'temas', tipo: 'multi', max: 2, titulo: 'O que mais preocupa {nome} hoje?', ajuda: 'Escolha até dois. O roteiro mostra o que cada candidato propõe sobre eles.', duas: true, opcoes: [
      { v: 'custo', t: 'Preço das coisas', d: 'Mercado, gás, contas' },
      { v: 'trabalho', t: 'Emprego e jornada', d: 'Salário, folga, escala 6x1' },
      { v: 'saude', t: 'Saúde', d: 'Fila, remédio, especialista' },
      { v: 'seguranca', t: 'Segurança', d: 'Crime, facção, medo na rua' },
      { v: 'educacao', t: 'Escola dos filhos', d: 'Creche, ensino, futuro' },
      { v: 'corrupcao', t: 'Corrupção' },
      { v: 'aposentadoria', t: 'Aposentadoria e INSS' },
      { v: 'impostos', t: 'Impostos e negócio próprio' },
      { v: 'familia', t: 'Família e valores' },
      { v: 'ambiente', t: 'Meio ambiente' }
    ] },
    { id: 'vida', tipo: 'multi', titulo: 'O que faz parte da vida de {nome}?', ajuda: 'Marque tudo que se aplica.', duas: true, opcoes: [
      { v: 'filhos', t: 'Tem filhos pequenos ou adolescentes' },
      { v: 'aposentado', t: 'É aposentado ou tem mais de 60' },
      { v: 'clt', t: 'Trabalha com carteira assinada' },
      { v: 'autonomo', t: 'Autônomo, MEI ou aplicativo' },
      { v: 'empresario', t: 'Tem empresa com funcionários' },
      { v: 'estudante', t: 'Estuda' },
      { v: 'desempregado', t: 'Está sem trabalho' },
      { v: 'rural', t: 'Vive ou trabalha no campo' },
      { v: 'nenhuma', t: 'Nenhuma dessas', sozinha: true }
    ] },
    { id: 'fe', titulo: 'Qual a relação de {nome} com a fé?', opcoes: [
      { v: 'evangelico', t: 'Evangélica', d: 'Frequenta igreja evangélica' },
      { v: 'catolico', t: 'Católica' },
      { v: 'outra', t: 'Outra religião' },
      { v: 'sem', t: 'Sem religião' },
      { v: 'naosei', t: 'Não sei' }
    ] },
    { id: 'valores', titulo: 'Quando {nome} fala do país, o que aparece mais?', ajuda: 'Pense no que a pessoa repete. Isso muda o jeito de apresentar os mesmos fatos.', opcoes: [
      { v: 'individual', t: 'Esforço e liberdade', d: 'Mérito, quem trabalha, governo que não atrapalha' },
      { v: 'coletivo', t: 'Justiça e cuidado', d: 'Quem precisa, desigualdade, ajudar os outros' },
      { v: 'ordem', t: 'Ordem, família e respeito', d: 'Segurança, tradição, autoridade' },
      { v: 'antipolitica', t: 'Desconfiança de todo mundo', d: 'Político é tudo igual, nada muda' }
    ] },
    { id: 'reacao', titulo: 'Quando o assunto é política, como {nome} reage?', opcoes: [
      { v: 'tranquila', t: 'Conversa numa boa' },
      { v: 'defensiva', t: 'Fica na defensiva' },
      { v: 'raiva', t: 'Se irrita e vira briga' },
      { v: 'evita', t: 'Muda de assunto' }
    ] },
    { id: 'canal', titulo: 'Como vai ser a conversa?', opcoes: [
      { v: 'pessoal', t: 'Pessoalmente', d: 'Almoço, visita, encontro' },
      { v: 'ligacao', t: 'Por telefone ou vídeo' },
      { v: 'whatsapp', t: 'Por mensagem' }
    ] }
  ];

  /* ---------- Temas: o que cada um propõe ---------- */
  var T = {
    custo: {
      titulo: 'Preço das coisas',
      fala: { padrao: 'Eu também sinto o mercado mais caro. O que me fez decidir foi ver o que já entrou no bolso: quem ganha até 5 mil parou de pagar Imposto de Renda este ano, e o gás e o remédio da Farmácia Popular saem de graça para quem precisa.',
        individual: 'Quem trabalha e ganha até 5 mil ficou com o salário inteiro este ano, sem Imposto de Renda. Para mim isso é deixar o dinheiro com quem ganhou.',
        ordem: 'Para a família, o que pesa é fechar o mês. Este ano quem ganha até 5 mil parou de pagar Imposto de Renda, e o botijão sai de graça para quem tem direito.' },
      porque: 'Concorde primeiro com o preço alto, que é verdade. Depois mostre um ganho concreto que a pessoa pode conferir no contracheque.',
      lula: 'Isenção do IR até R$ 5 mil em vigor desde janeiro de 2026, com desconto até R$ 7.350, pago por um imposto mínimo de quem ganha mais de R$ 600 mil por ano. Salário mínimo de R$ 1.621, com ganho acima da inflação, e a regra mantida no plano (p.74). Gás do Povo com botijão gratuito para quase 15 milhões de famílias. Farmácia Popular com 41 itens de graça (p.36). Ponto fraco real: a comida em casa subiu 4,21% em 12 meses.',
      flavio: 'O plano promete reduzir o IVA e os tributos sobre energia e combustíveis (pp.30-31 e 71-72). Não cita a isenção do IR até R$ 5 mil nem uma regra para o salário mínimo. Em entrevista à Globo em 16/10, disse que manterá o mínimo acima da inflação.',
      fontes: [F.ir, F.minimo, F.gas, F.farmacia, F.comida, F.planoFlavio, F.flavioGlobo]
    },
    trabalho: {
      titulo: 'Emprego e jornada',
      fala: { padrao: 'O fim da escala 6x1 virou lei este mês. A jornada cai para 40 horas sem cortar salário. Isso saiu no governo Lula, e o desemprego está no menor nível que eu já vi, 5,3%.',
        individual: 'Mais tempo livre é mais tempo para cuidar da vida e até fazer um extra. A 6x1 acabou este mês, sem cortar salário, e tem emprego sobrando: o desemprego está em 5,3%.',
        ordem: 'Pai e mãe que trabalham seis dias por semana não veem os filhos. A 6x1 acabou este mês, sem corte de salário.' },
      porque: 'Fale do domingo livre, do tempo com a família. A lei é recente e muita gente ainda não sabe que foi promulgada.',
      lula: 'A PEC do fim da 6x1 foi promulgada em 16/10/2026 com Lula presente: 40 horas semanais sem redução de salário, com transição. Estava no plano (p.75). Desemprego de 5,3% no trimestre até agosto, com recorde de pessoas ocupadas. O plano promete previdência para quem trabalha por aplicativo (p.77).',
      flavio: 'O plano não fala da 6x1. Defende "jornada flexível" e "o negociado sobre o legislado" (pp.44-45). Em agosto, Flávio evitou dizer como votaria e falou em "liberdade para o trabalhador escolher a sua jornada". Mudou de posição em 13/10 e votou a favor no dia 14. Na Globo, em 16/10, disse que vai manter o fim da 6x1.',
      fontes: [F.seisx1, F.seisx1Lula, F.desemprego, F.planoFlavio, F.flavio6x1b, F.flavio6x1]
    },
    saude: {
      titulo: 'Saúde',
      fala: { padrao: 'O que eu vejo é gente conseguindo cirurgia e exame que esperava fazia anos. O programa Agora Tem Especialistas fez 15 milhões de cirurgias no ano passado. E o remédio da Farmácia Popular é de graça.',
        individual: 'Quem paga plano sabe quanto custa. O SUS fez 15 milhões de cirurgias no ano passado com o Agora Tem Especialistas, e isso tira pressão de todo mundo.' },
      porque: 'Saúde é concreta. Pergunte se a pessoa conhece alguém que esperou na fila e use o caso dela.',
      lula: 'Agora Tem Especialistas: 15 milhões de cirurgias, 31,4 milhões de consultas e 45 milhões de exames em 2025 (p.37). Fila única digital por risco e rede de tratamento do câncer (p.38). Farmácia Popular gratuita, 41 itens, 27,3 milhões de pessoas atendidas (p.36).',
      flavio: 'O plano propõe prontuário eletrônico único ligado ao CPF (p.26), correção da tabela SUS, ampliação do Saúde da Família e compra de exames na rede privada em horário ocioso (p.37), além de telessaúde e remédio entregue em casa (p.38). Na Globo, disse que não vai mexer no piso da saúde.',
      fontes: [F.planoLula, F.farmacia, F.planoFlavio, F.flavioGlobo]
    },
    seguranca: {
      titulo: 'Segurança',
      fala: { padrao: 'Segurança me preocupa também. O que me convenceu foi ir atrás do dinheiro das facções: a Lei Antifacção está valendo desde março, e as mortes violentas em 2025 foram as menores desde 2012.',
        ordem: 'Bandido de facção tem que perder o dinheiro e o poder. A Lei Antifacção do Lula está valendo desde março, e as mortes violentas caíram para o menor nível em 14 anos.' },
      porque: 'Segurança é o tema mais forte do Flávio. Reconheça o medo da pessoa e mostre resultado medido, sem chamar a proposta dele de absurda.',
      lula: 'Lei Antifacção (Lei 15.358/2026) em vigor desde 25/03/2026. O plano cita R$ 35,8 bilhões de prejuízo causado ao crime organizado desde 2023 (p.27) e as forças integradas FICCOs (p.28). Mortes violentas em 2025: 19,1 por 100 mil, o menor patamar desde 2012.',
      flavio: 'O plano promete sancionar a redução da maioridade penal de 18 para 16 anos e punir a partir de 14 em crimes graves (p.13), castração química para estupradores condenados (p.14), cinco presídios "no modelo de El Salvador" (p.14), fim da progressão de regime em crimes hediondos e a Muralha Brasileira, com mais de 1 milhão de câmeras de reconhecimento facial (p.15).',
      fontes: [F.antifaccao, F.mortes, F.planoLula, F.planoFlavio]
    },
    educacao: {
      titulo: 'Escola dos filhos',
      fala: { padrao: 'Com filho em casa, o que pesa para mim é creche e escola. O governo apoiou mais de 3.500 creches, e o Pé-de-Meia paga para o jovem terminar o ensino médio.',
        individual: 'O Pé-de-Meia é dinheiro guardado para o jovem que vai à aula e termina o ensino médio. Prêmio por esforço, que ele saca no fim.',
        ordem: 'Criança em creche e jovem na escola até o fim é família mais tranquila. O Pé-de-Meia paga para o adolescente terminar o ensino médio.' },
      porque: 'Fale do filho ou do neto da pessoa pelo nome. O futuro da criança costuma pesar mais que qualquer número.',
      lula: 'Novo PAC apoiou 3.562 creches e o plano põe o tempo integral como prioridade (p.31). Pé-de-Meia para quem termina o ensino médio: o plano informa 7,3 milhões de jovens (p.32).',
      flavio: 'O plano propõe expandir escolas cívico-militares, ensino "livre de doutrinação", método fônico, repasses atrelados a metas e voucher onde faltar vaga (pp.35-37). O FIES seria trocado por um empréstimo pago conforme a renda futura (p.37). Promete voucher-creche na rede privada (p.21).',
      fontes: [F.planoLula, F.planoFlavio]
    },
    corrupcao: {
      titulo: 'Corrupção',
      fala: { padrao: 'A fraude do INSS foi revoltante. O que me fez confiar foi o que veio depois: a Polícia Federal investigou, o presidente do INSS caiu no mesmo dia e foi preso, e os aposentados receberam o dinheiro de volta com correção.',
        antipolitica: 'Eu não acho que político é santo. Eu olho o que acontece quando aparece roubo. Na fraude do INSS, a PF investigou, o presidente do INSS foi demitido no dia e preso depois, e o dinheiro voltou para os aposentados.' },
      porque: 'Não negue o escândalo. Admitir o problema dá credibilidade para o resto da conversa.',
      lula: 'A Operação Sem Desconto (PF e CGU) começou em 23/04/2025. Lula demitiu o presidente do INSS no mesmo dia, e ele foi preso em 13/11/2025. O governo devolveu os descontos com correção: R$ 2,82 bilhões para 4,14 milhões de pessoas até dezembro de 2025.',
      flavio: 'O plano propõe um pacote antifraude no INSS nos moldes da MP 871/2019 e dupla checagem no consignado (pp.72-73). Em 02/03/2026, Flávio prometeu indulto ao pai, condenado pelo STF a 27 anos e 3 meses por tentativa de golpe. O plano não menciona indulto nem anistia.',
      fontes: [F.inss, F.inssDev, F.planoFlavio, F.indulto]
    },
    aposentadoria: {
      titulo: 'Aposentadoria e INSS',
      fala: { padrao: 'Quem ganha um salário mínimo de aposentadoria teve aumento acima da inflação. E quem foi roubado no INSS recebeu o dinheiro de volta, corrigido. Você conhece alguém que recebeu?' },
      porque: 'Pergunte se a pessoa ou alguém próximo recebeu o ressarcimento. Um caso conhecido vale mais que o número total.',
      lula: 'Mínimo de R$ 1.621 com ganho real, e a regra mantida no plano (p.74): quem ganha o piso do INSS sobe junto. Ressarcimento da fraude com correção: R$ 2,82 bilhões para 4,14 milhões até dezembro de 2025. O plano prevê Centros-Dia para idosos (p.22) e aulas contra golpe digital (p.23). Farmácia Popular gratuita.',
      flavio: 'O plano propõe pacote antifraude e dupla checagem no consignado (pp.72-73) e não propõe reforma da previdência. Em 16/10, disse à Globo que não vai desvincular o reajuste do salário mínimo.',
      fontes: [F.minimo, F.inssDev, F.planoLula, F.planoFlavio, F.flavioGlobo]
    },
    impostos: {
      titulo: 'Impostos e negócio próprio',
      fala: { padrao: 'Quem ganha até 5 mil não paga mais Imposto de Renda. Quem paga a diferença é quem ganha mais de 50 mil por mês. Para mim, é justo.',
        individual: 'Quem trabalha e ganha até 5 mil ficou com o salário inteiro. E o plano do Lula promete crédito para o MEI e o autônomo crescerem.' },
      porque: 'Com empresário, reconheça que a agenda de corte de gasto do Flávio atrai. Leve a conversa para o cliente dele: quem ganha até 5 mil ficou com mais dinheiro para gastar.',
      lula: 'IR zero até R$ 5 mil desde janeiro de 2026 e imposto mínimo de até 10% para quem ganha mais de R$ 600 mil por ano (Lei 15.270/2025). O plano promete crédito para MEI e autônomos (p.76).',
      flavio: 'O plano promete um "Tesouraço", corte de pelo menos 10 ministérios (pp.68-69), revisão da reforma tributária com IVA menor (pp.71-72), fim gradual do IOF no câmbio (p.63) e redução do custo da folha (p.43). Não detalha a nova regra fiscal.',
      fontes: [F.ir, F.planoLula, F.planoFlavio]
    },
    familia: {
      titulo: 'Família e valores',
      fala: { padrao: 'Para mim, cuidar da família é ter comida na mesa e proteger quem é ameaçado dentro de casa. O Brasil saiu do Mapa da Fome, e a medida protetiva para mulher agredida agora sai em 3 dias, antes levava 16.',
        ordem: 'Proteger a família é coisa séria. A medida protetiva para mulher ameaçada agora sai em 3 dias, antes levava 16. E nenhuma criança deveria dormir com fome: o Brasil saiu do Mapa da Fome.' },
      porque: 'Use a palavra família no sentido que a pessoa usa. Fale de proteção e de cuidado, que são valores dela também.',
      lula: 'Pacto contra o Feminicídio: o prazo da medida protetiva caiu de 16 para 3 dias (p.21). O Brasil saiu do Mapa da Fome da ONU (FAO, julho de 2025). Gás do Povo e creches. O plano não tem capítulo sobre religião.',
      flavio: 'O plano propõe a Central da Mulher com assistente virtual, tornozeleira para agressor com medida protetiva (p.14), escritura da casa no nome da mulher e voucher-creche (pp.17-21). Promete manter os programas sociais existentes, "com correção de distorções e combate às fraudes" (pp.42-43).',
      fontes: [F.planoLula, F.fome, F.planoFlavio]
    },
    ambiente: {
      titulo: 'Meio ambiente',
      fala: { padrao: 'O plano do Lula promete zerar o desmatamento até 2030, contando o que é replantado. Calor e enchente já chegaram na nossa conta de luz e no preço da comida.' },
      porque: 'Ligue o clima a algo que a pessoa sente: calor, enchente, preço do alimento.',
      lula: 'Meta de desmatamento líquido zero até 2030 (p.70).',
      flavio: 'Meta de zerar o desmatamento ilegal até 2029 (p.57). Licença ambiental concedida se o órgão não decidir no prazo (pp.49-50). Permissão para explorar gás por fracking (p.52).',
      fontes: [F.planoLula, F.planoFlavio]
    },
    autonomo: {
      titulo: 'Quem trabalha por conta',
      fala: { padrao: 'Quem trabalha por aplicativo hoje não tem nada se ficar doente. O plano do Lula promete previdência para quem roda por app e crédito para o MEI.' },
      porque: 'Pergunte o que acontece hoje se a pessoa ficar uma semana sem poder trabalhar.',
      lula: 'Previdência para quem trabalha por aplicativo (p.77) e acesso a crédito para MEI e autônomos (p.76). IR zero até R$ 5 mil.',
      flavio: 'O plano propõe reduzir o custo do trabalho e contratos com folha mais barata para jovens de 18 a 24 anos e desempregados com mais de 50 (pp.43-44), além de jornada flexível (pp.44-45).',
      fontes: [F.planoLula, F.planoFlavio]
    },
    rural: {
      titulo: 'Campo',
      fala: { padrao: 'O Plano Safra da Agricultura Familiar é o dinheiro que o pequeno produtor pega para plantar. O plano do Lula mantém e amplia.' },
      porque: 'No campo, o Flávio fala bem com o grande produtor. Fale do pequeno: crédito, seguro, preço justo.',
      lula: 'Plano Safra da Agricultura Familiar (p.59). Desmatamento líquido zero até 2030 (p.70).',
      flavio: 'O plano propõe seguro rural, armazenagem, fertilizantes, renegociação de dívidas rurais e titulação de pequenas propriedades (pp.31 e 53-55).',
      fontes: [F.planoLula, F.planoFlavio]
    }
  };
  var vidaTema = { filhos: 'educacao', aposentado: 'aposentadoria', clt: 'trabalho', autonomo: 'autonomo', empresario: 'impostos', estudante: 'educacao', desempregado: 'trabalho', rural: 'rural' };

  /* ---------- Objeções ---------- */
  var O = {
    adianta: { diz: 'Meu voto não muda nada.', resposta: 'No 1º turno a diferença entre os dois foi de menos de 2 pontos. A última pesquisa CNT/MDA dá 50,7 a 49,3. Domingo, um voto pesa de verdade.', porque: 'Use o número da eleição. É fato público e mostra que a disputa está aberta.', fonte: F.pesquisa },
    ladrao: { diz: 'Político é tudo ladrão. O PT roubou.', resposta: 'Teve roubo, sim, e eu fiquei revoltado com a fraude do INSS. O que eu olho é o que acontece depois: a PF investigou, o presidente do INSS caiu no mesmo dia e foi preso, e o dinheiro voltou para os aposentados.', porque: 'Concordar com a parte verdadeira desarma. Discutir para salvar a honra do partido fecha a conversa.', fonte: F.inss },
    comida: { diz: 'Está tudo mais caro.', resposta: 'Está mesmo, o mercado pesa. A comida subiu 4,21% em um ano. Eu levo em conta que este ano quem ganha até 5 mil parou de pagar Imposto de Renda e o salário mínimo subiu acima da inflação. O outro lado não colocou nada disso no plano.', porque: 'Nunca diga que a pessoa está enganada sobre o preço que ela paga.', fonte: F.comida },
    idade: { diz: 'O Lula está velho demais.', resposta: 'É uma preocupação justa, ele faz 81 anos esta semana. Eu pesei isso também. Pesou mais para mim o que ele entregou e o que está escrito no plano dele.', porque: 'Concorde com o fato. Brigar contra a idade dele faz você perder credibilidade no resto.', fonte: F.saudeLula },
    bolsa: { diz: 'O Flávio vai manter o Bolsa Família.', resposta: 'Ele disse isso agora, em outubro. Mas o nome Bolsa Família não aparece no plano dele. E ele apagou posts antigos em que chamava o programa de "bolsa-farelo". Eu prefiro quem criou o programa.', porque: 'Mostre a fonte no celular. A pessoa confere sozinha e a conclusão fica sendo dela.', fonte: F.bolsaPosts },
    seisx1: { diz: 'O Flávio também votou pelo fim da 6x1.', resposta: 'Votou, depois de chamar a proposta de oportunista e mudar de ideia na véspera. O plano dele nem fala da 6x1 e defende o negociado acima da lei. A PEC estava no plano do Lula desde o começo.', porque: 'Reconheça o voto dele. A diferença está em quem propôs e em quem mudou na última hora.', fonte: F.flavio6x1 },
    bandido: { diz: 'O Lula passa a mão em bandido.', resposta: 'Eu também quero bandido preso. Foi o Lula que sancionou a Lei Antifacção, que está valendo desde março, e as mortes violentas em 2025 foram as menores em 14 anos.', porque: 'Comece concordando com o desejo de segurança, que é legítimo.', fonte: F.antifaccao },
    venezuela: { diz: 'Vai virar Venezuela, comunismo.', resposta: 'O que exatamente te preocupa? Ele já governou o Brasil três vezes, e a gente continua tendo eleição, imprensa e propriedade privada.', porque: 'Pergunte primeiro. Pedir para a pessoa explicar como isso aconteceria costuma reduzir a certeza dela (Fernbach e colegas, 2013).', fonte: null },
    anular: { diz: 'Vou anular, nenhum presta.', resposta: 'Eu entendo. Mesmo anulando, um dos dois vai ganhar, e vai ser por pouco. Prefiro ajudar a escolher quem vai decidir o preço do gás e a minha jornada.', porque: 'Não chame o nulo de irresponsável. Mostre que a escolha acontece de qualquer jeito.', fonte: F.pesquisa },
    costumes: { diz: 'Eu vi que o Lula vai mexer com a família e a fé.', resposta: 'Onde você viu isso? Vamos olhar juntos? O plano dele está publicado no site do TSE e dá para procurar qualquer palavra.', porque: 'Não discuta boato. Peça a fonte e abra o plano junto. Isso ensina a pessoa a checar e vale para os dois lados.', fonte: F.planoLula },
    pai: { diz: 'O Flávio não é o pai dele.', resposta: 'Eu queria acreditar nisso. Mas ele prometeu indulto ao pai, que foi condenado a 27 anos por tentativa de golpe. E o plano registrado dele não fala disso.', porque: 'Use só com quem já não gosta do Jair. Com bolsonarista convicto, essa resposta vira briga.', fonte: F.indulto },
    tantofaz: { diz: 'Tanto faz quem ganhar.', resposta: 'Para mim não fez. A minha jornada, o meu Imposto de Renda e o remédio da minha mãe mudaram por causa de lei. Os dois planos estão no site do TSE e são bem diferentes.', porque: 'Troque "minha mãe" pelo seu caso real. Um exemplo seu convence mais que um argumento.', fonte: F.planoFlavio }
  };

  var avisos = [
    '<strong>Fale hoje, sábado.</strong> No domingo, 25/10, pedir voto, fazer boca de urna e distribuir material é crime. No dia, só vale a manifestação silenciosa, como camiseta ou adesivo no peito.',
    '<strong>Só repasse o que tem fonte.</strong> Todos os fatos deste roteiro têm link. Se aparecer algo sem fonte, sobre qualquer lado, não encaminhe.',
    '<strong>Nada de vídeo, áudio ou foto falsa.</strong> Montagem com inteligência artificial de candidato é proibida e destrói sua credibilidade.',
    '<strong>Não ofereça nada em troca do voto.</strong> Dinheiro, presente, comida ou carona para eleitor de fora da sua família são proibidos por lei.'
  ];

  /* ---------- Base científica ---------- */
  var B = {
    deep: 'Conversa de troca de histórias, sem julgamento: Broockman e Kalla, <em>Science</em> (2016), e Kalla e Broockman, <em>American Political Science Review</em> (2020). Mudou opiniões por meses depois de uma conversa de 10 minutos.',
    minimo: 'Em eleição geral, contato de campanha quase não muda voto de quem já decidiu: Kalla e Broockman, <em>APSR</em> (2018). Por isso o roteiro mira quem está em dúvida e quem pode faltar.',
    reframe: 'Apresentar a proposta pelos valores do outro: Feinberg e Willer, <em>Personality and Social Psychology Bulletin</em> (2015) e <em>Social and Personality Psychology Compass</em> (2019).',
    plano: 'Plano de voto (a que horas, como chegar): Nickerson e Rogers, <em>Psychological Science</em> (2010). Fazer o plano em voz alta aumentou o comparecimento.',
    norma: 'Dizer que muita gente vota funciona melhor que dizer que pouca gente vota: Gerber e Rogers, <em>Journal of Politics</em> (2009).',
    mensageiro: 'Contato pessoal de alguém conhecido mobiliza mais que propaganda: Green e Gerber, <em>Get Out the Vote</em> (Brookings, 2019).',
    fatos: 'Corrigir com fato raramente provoca efeito contrário: Wood e Porter, <em>Political Behavior</em> (2019).',
    inocular: 'Avisar antes sobre a tática do boato ajuda a pessoa a resistir a ele: Roozenbeek e colegas, <em>Science Advances</em> (2022).',
    afirmar: 'Reconhecer um valor da pessoa antes do fato reduz a defesa: Cohen e Sherman, <em>Annual Review of Psychology</em> (2014).',
    explicar: 'Pedir para a pessoa explicar como uma proposta funcionaria reduz certezas extremas: Fernbach e colegas, <em>Psychological Science</em> (2013).',
    mi: 'Perguntas abertas e a régua de 0 a 10 vêm da entrevista motivacional: Miller e Rollnick, <em>Motivational Interviewing</em>.'
  };

  /* ---------- Montagem ---------- */
  function montar(r) {
    var nm = r.nome || '';
    var N = nm ? esc(nm) : 'a pessoa';
    var Nc = nm ? esc(nm) : 'A pessoa';
    var f = r.firmeza || '';
    var v = r.voto1;
    var temas = r.temas || [];
    var vida = r.vida || [];
    var val = r.valores || 'coletivo';
    var reac = r.reacao || 'tranquila';
    var canal = r.canal || 'pessoal';
    var perto = r.relacao === 'familia' || r.relacao === 'parente' || r.relacao === 'amigo';

    var g;
    if (v === 'lula' || f === 'lula_leve') g = 'mobilizar';
    else if (f === 'nulo') g = 'ir';
    else if (f === 'flavio_firme') g = 'ouvir';
    else if (f === 'flavio_leve') g = 'duvida';
    else g = 'persuadir';
    if ((v === 'branco' || v === 'naofoi') && f === 'naosei') g = 'ir';

    var out = { base: [] };
    var obj = {
      mobilizar: [Nc + ' já está do lado do Lula. O risco é ficar em casa no domingo. O objetivo é sair da conversa com hora, lugar e documento combinados.', 'Quem já concorda não precisa de argumento. Precisa de plano e de companhia.'],
      ir: ['Convencer ' + N + ' a ir votar e a dar uma chance ao 13.', 'Quem pensa em anular ou faltar costuma estar cansado de política, não convencido do outro lado. Ouça o cansaço antes de falar de candidato.'],
      persuadir: ['Ajudar ' + N + ' a decidir entre os dois com base no que pesa na vida dela.', 'Quem está em dúvida é quem mais muda numa conversa. Vale o seu esforço.'],
      duvida: ['Deixar uma dúvida honesta. Quem pende para o Flávio raramente muda numa conversa só. Se ' + N + ' sair pensando em um ponto, a conversa valeu.', 'Duas conversas curtas hoje, uma agora e outra à noite, rendem mais que uma discussão longa.'],
      ouvir: ['Ouvir e manter a relação. Com quem está fechado com o Flávio, a chance de virar o voto até domingo é baixa.', 'Pesquisa com dezenas de experimentos mostra que, em eleição geral, contato quase não muda voto já decidido. Se o seu tempo é curto, use-o com alguém em dúvida ou que pode faltar.']
    };
    out.objetivo = obj[g][0];
    out.objetivoNota = obj[g][1];
    if (g === 'ouvir' && reac === 'raiva') out.objetivoNota = 'Com quem já decidiu e se irrita, insistir costuma piorar a relação e fortalecer o voto. Pergunte, escute e encerre com carinho. Gaste a energia com quem está em dúvida.';
    if (g === 'ouvir' || g === 'duvida') out.base.push(B.minimo);

    /* Antes */
    var antes = [];
    if (perto) antes.push('Você é a pessoa certa para essa conversa. Quem conhece ' + N + ' tem mais crédito que qualquer propaganda.');
    else antes.push('Com ' + (r.relacao === 'trabalho' ? 'colega de trabalho' : 'vizinho ou conhecido') + ', vá devagar. Comece perguntando e só fale de voto se ' + N + ' abrir espaço.');
    if (canal === 'pessoal') antes.push('Escolha um momento a sós, sem plateia. Na frente da família toda ninguém muda de ideia, porque mudar vira perder a discussão.');
    if (canal === 'ligacao') antes.push('Ligue num horário tranquilo e pergunte se pode falar cinco minutos. Ligação ganha de mensagem porque dá para ouvir o tom.');
    if (canal === 'whatsapp') antes.push('Mande mensagem só sua, escrita para ' + N + '. Corrente e card de campanha são ignorados ou viram briga no grupo.');
    antes.push('Deixe aberto no celular o link de um fato só. Se ' + N + ' perguntar de onde você tirou, você mostra na hora.');
    if (reac === 'raiva') antes.push('Combine com você mesmo: se a voz subir, você para. Diga que gosta de ' + N + ' e que cada um vota no seu. A relação vale mais que um voto.');
    if (reac === 'evita') antes.push('Quem muda de assunto costuma ter medo de briga. Diga logo no começo que você não quer discutir, só entender.');
    if (r.fe === 'evangelico') antes.push('A fé é assunto sério para ' + N + '. Fale de família, trabalho e cuidado com o próximo. Pastor, igreja e religião ficam fora da conversa.');
    if (g === 'mobilizar') antes.push('Seu trabalho aqui é logística: dia, hora, seção, documento. Não gaste tempo convencendo quem já concorda.');
    out.antes = antes;

    /* Abrir */
    var abrir = [];
    if (canal === 'ligacao') abrir.push({ fala: 'Oi' + (nm ? ', ' + nm : '') + '! Tá podendo falar cinco minutinhos? Tô ligando por causa de domingo. Queria saber como você tá pensando.', porque: 'Pedir licença baixa a guarda. A pessoa sente que pode dizer não.' });
    else if (reac === 'raiva' || reac === 'defensiva') abrir.push({ fala: 'Sei que política às vezes dá briga entre a gente. Hoje eu não quero discutir. Queria só entender como você tá pensando para domingo.', porque: 'Nomear o risco de briga e prometer ouvir reduz a defesa logo de saída.' });
    else abrir.push({ fala: 'Posso te perguntar uma coisa sobre domingo? Não é para convencer de nada. Queria entender o que você tá pensando.', porque: 'Começar perguntando, e não afirmando, é o primeiro passo da conversa que muda opinião.' });
    if (g === 'mobilizar') abrir.push({ fala: 'Domingo é o segundo turno e a eleição tá apertada. Você já sabe onde vai votar e a que horas?', porque: 'Vá direto para o plano. Quem já concorda não precisa ouvir discurso.' });
    else abrir.push({ fala: 'Eu vou votar no Lula por um motivo bem da minha vida: [conte o seu caso, em uma ou duas frases].', porque: 'Conte um motivo seu, real, antes de qualquer número. Troca de histórias é o que fez as conversas durarem nos estudos de deep canvassing.' });
    out.abrir = abrir;
    out.abrirSub = 'Leia em voz alta antes para soar como você. Troque as palavras que não são suas.';
    out.base.push(B.deep);

    /* Ouvir */
    var ouvir = [];
    if (g === 'mobilizar') {
      ouvir.push({ fala: 'Tem alguma coisa que pode atrapalhar você de ir no domingo? Trabalho, criança, distância?', porque: 'Descubra o obstáculo agora e resolva junto. É o obstáculo que faz a pessoa faltar.' });
      ouvir.push({ fala: 'Quem mais da família vai votar com você?', porque: 'Votar em grupo aumenta a chance de todo mundo ir.' });
    } else {
      ouvir.push({ fala: 'O que mais pesa para você na hora de escolher, nessa eleição?', porque: 'Deixe falar até o fim. Repita com suas palavras o que ouviu antes de responder.' });
      ouvir.push({ fala: 'O que mudou na sua vida nos últimos anos, para melhor ou para pior?', porque: 'Puxa a conversa para a vida real, longe do bate-boca de rede social.' });
      if (g === 'duvida' || g === 'persuadir' || g === 'ouvir') ouvir.push({ fala: 'De 0 a 10, quanto você tem certeza do seu voto? E por que não é 10?', porque: 'A resposta ao "por que não é 10" é a dúvida da própria pessoa. É por ela que você entra.' });
      if (v === 'flavio' || f.indexOf('flavio') === 0) ouvir.push({ fala: 'E como você acha que essa proposta dele funcionaria na prática, no dia a dia?', porque: 'Pedir para explicar o funcionamento, sem contestar, costuma diminuir certezas extremas.' });
      if (vida.indexOf('filhos') > -1) ouvir.push({ fala: 'Pensando nos seus filhos, o que você queria que o próximo presidente resolvesse primeiro?', porque: 'O futuro dos filhos é um valor que vocês dividem.' });
      if (vida.indexOf('aposentado') > -1) ouvir.push({ fala: 'E remédio, consulta, como tá para você hoje?', porque: 'Abre espaço para Farmácia Popular e fila de especialista.' });
      out.base.push(B.mi);
      if (v === 'flavio' || f.indexOf('flavio') === 0) out.base.push(B.explicar);
    }
    out.ouvir = ouvir;

    /* Temas */
    var ids = [];
    temas.forEach(function (t) { if (ids.indexOf(t) < 0) ids.push(t); });
    vida.forEach(function (x) { var t = vidaTema[x]; if (t && ids.indexOf(t) < 0) ids.push(t); });
    if (!ids.length) ids = val === 'ordem' ? ['seguranca', 'familia'] : ['custo', 'trabalho'];
    if (g === 'mobilizar' && ids.length > 2) ids = ids.slice(0, 2);
    out.temas = ids.slice(0, 2).map(function (id) {
      var t = T[id];
      var fala = t.fala[val] || t.fala.padrao;
      return { titulo: t.titulo, fala: fala, porque: t.porque, lula: t.lula, flavio: t.flavio, fontes: t.fontes };
    });
    if (val !== 'coletivo') out.base.push(B.reframe);
    out.base.push(B.fatos);

    /* Objeções */
    var ob = [];
    function add(k) { if (ob.indexOf(k) < 0) ob.push(k); }
    if (g === 'mobilizar' || g === 'ir') add('adianta');
    if (g === 'ir' || v === 'branco' || f === 'nulo') add('anular');
    if (val === 'antipolitica' || temas.indexOf('corrupcao') > -1) add('ladrao');
    if (temas.indexOf('custo') > -1 || vida.indexOf('aposentado') > -1 || g !== 'mobilizar') add('comida');
    if (temas.indexOf('trabalho') > -1 || vida.indexOf('clt') > -1) add('seisx1');
    if (temas.indexOf('seguranca') > -1 || val === 'ordem') add('bandido');
    if (r.fe === 'evangelico' || r.fe === 'catolico' || temas.indexOf('familia') > -1) add('costumes');
    if (v === 'flavio' || f.indexOf('flavio') === 0) { add('bolsa'); add('venezuela'); }
    if (v === 'terceira' || f === 'duvida') add('pai');
    if (val === 'antipolitica' || g === 'ir') add('tantofaz');
    add('idade');
    out.objecoes = ob.slice(0, 6).map(function (k) { return O[k]; });
    out.base.push(B.afirmar);

    /* O que não dizer */
    var ev = [
      'Gado, burro, fascista ou qualquer rótulo. Quem se sente humilhado defende o voto com mais força.',
      'Sermão com dez números. Escolha um fato e pare.',
      'Boato sobre o Flávio, ou qualquer coisa que você não consegue mostrar a fonte. Uma informação errada derruba tudo o que você disse de certo.'
    ];
    if (v === 'flavio' || f.indexOf('flavio') === 0) ev.push('Ataque ao Jair logo de cara. Para quem gosta dele, isso soa como ataque à pessoa e encerra a conversa.');
    if (r.fe === 'evangelico') ev.push('Crítica a igreja, pastor ou "voto de crente". É a forma mais rápida de perder a conversa.');
    if (g === 'ir') ev.push('Que votar nulo é burrice. O cansaço com a política é legítimo.');
    if (vida.indexOf('empresario') > -1) ev.push('Que empresário é explorador. Fale do cliente e do funcionário dele.');
    if (reac === 'raiva') ev.push('"Mas você não entende." Troque por "me explica melhor".');
    ev.push('Pedido de voto no domingo. A lei proíbe abordar eleitor no dia.');
    out.evitar = ev;

    /* Fechar */
    var fe = [];
    if (g === 'ouvir') {
      fe.push('Agradeça a conversa: <q>Obrigado por me explicar. Eu penso diferente, mas gostei de ouvir.</q>');
      fe.push('Deixe uma pergunta no ar: <q>Só pensa numa coisa até domingo: o que muda na sua vida se a 6x1 voltar ou se o IR voltar a ser cobrado de quem ganha até 5 mil?</q> Ajuste para o tema de ' + N + '.');
      fe.push('Mantenha o carinho no dia seguinte. A próxima eleição também começa com a relação inteira.');
    } else {
      if (g !== 'mobilizar') fe.push('Pergunte sem pressionar: <q>Você toparia pensar no 13 até domingo?</q> Se a resposta for não, agradeça e pare.');
      fe.push('Pergunte o horário: <q>A que horas você pensa em ir?</q> A votação vai das 8h às 17h no horário de Brasília. No horário local, é das 7h às 16h onde o relógio está uma hora atrás e das 6h às 15h no Acre.');
      fe.push('Confirme o local: <q>Você sabe onde vota?</q> Ajude a conferir no app e-Título, em "Onde votar", ou no ' + a(F.ondeVotar) + '.');
      fe.push('Combine como chegar: <q>Você vai como?</q> A resolução do TSE manda oferecer transporte público gratuito no dia. Confirme o horário na sua cidade (' + a(F.res23751) + ').');
      fe.push('Lembre o documento com foto: RG, CNH, passaporte, carteira de trabalho física ou o e-Título com foto. Certidão de nascimento não serve.');
      fe.push('Peça um retorno: <q>Me manda um oi quando votar?</q> Combinar avisar aumenta a chance de ir.');
      if (g === 'mobilizar') fe.push('Fale de quem vai: <q>No 1º turno quase 8 em cada 10 eleitores foram votar. Eu vou e quero ir com você.</q>');
      out.base.push(B.plano);
      if (g === 'mobilizar' || g === 'ir') out.base.push(B.norma);
    }
    out.fechar = fe;

    /* Mensagem */
    var oi = 'Oi' + (nm ? ', ' + nm : '') + '! ';
    var msg;
    var gancho = { custo: 'do preço do mercado', trabalho: 'da escala 6x1', saude: 'da fila da saúde', seguranca: 'da segurança', educacao: 'da escola das crianças', corrupcao: 'do caso do INSS', aposentadoria: 'da aposentadoria', impostos: 'do Imposto de Renda', familia: 'da família', ambiente: 'do calor e das enchentes', autonomo: 'de quem trabalha por conta', rural: 'do campo' };
    var t0 = gancho[ids[0]] || '';
    if (g === 'mobilizar') msg = oi + 'Domingo é o segundo turno e tá muito apertado. Você já sabe a que horas vai votar? Eu vou de manhã. É das 8h às 17h (horário de Brasília) e precisa de documento com foto. Se quiser, a gente vai junto. Me avisa quando votar?';
    else if (g === 'ir') msg = oi + 'Sei que tá todo mundo cansado de política. Eu também. Mas domingo a eleição vai ser decidida por pouco, e eu queria muito que você fosse votar. Posso te contar por que eu vou de Lula? Sem briga, prometo.';
    else if (g === 'ouvir') msg = oi + 'Sei que a gente vota diferente, e tá tudo bem. Só queria te dizer que gosto muito de você, independente de domingo. Se um dia quiser me contar o que pesa no seu voto, eu quero ouvir.';
    else msg = oi + 'Posso te contar por que eu vou votar no Lula domingo? Sem briga, prometo. ' + (t0 ? 'Lembrei de você por causa ' + t0 + '. ' : '') + 'Se quiser, te mando o link do plano dele no TSE pra você ver com seus olhos. E queria ouvir o que você tá pensando também.';
    out.mensagem = msg;
    out.mensagemSub = canal === 'whatsapp' ? 'Adapte com o seu jeito de escrever antes de mandar. Se ' + N + ' responder, volte para as perguntas de ouvir.' : 'Para mandar depois da conversa, ou antes, para marcar o papo.';

    /* Se não mudar */
    out.seNao = [
      'Respeite o "não" na primeira vez. Insistir no mesmo dia fortalece o voto contrário.',
      'Diga que gosta de ' + N + ' e que a amizade continua. Isso deixa a porta aberta.',
      g === 'ouvir' ? 'Procure outra pessoa da sua lista que esteja em dúvida ou possa faltar. É lá que sua conversa rende.' : 'Se ' + N + ' estiver em dúvida, mande o link do plano no TSE à noite, sem comentário longo.'
    ];

    out.base.push(B.mensageiro);
    if (r.fe === 'evangelico' || v === 'flavio' || f.indexOf('flavio') === 0) out.base.push(B.inocular);
    out.base = out.base.filter(function (x, i, arr) { return arr.indexOf(x) === i; });
    return out;
  }

  /* ---------- Página de método ---------- */
  function li(x) { return '<li>' + x + '</li>'; }
  var metodo = '<h1>Como o roteiro é montado</h1>' +
    '<p class="lede">As suas respostas viram três coisas: um objetivo realista, os temas que tocam a vida da pessoa e as palavras certas para cada valor. Tudo acontece no seu aparelho. Nada é enviado.</p>' +
    '<h2>O objetivo muda conforme o eleitor</h2>' +
    '<p>Estudos com dezenas de experimentos mostram que, em eleição geral, conversa de campanha quase não muda voto de quem já decidiu. Muda mais quem está em dúvida e, principalmente, quem pode faltar. Por isso o roteiro troca de objetivo: com quem já concorda, combinar o dia; com quem pensa em anular, ouvir o cansaço; com quem está em dúvida, comparar propostas; com quem está fechado com o outro lado, manter a relação e deixar uma pergunta.</p>' +
    '<h2>As técnicas e de onde vêm</h2><ul class="cite">' +
    [B.deep, B.minimo, B.reframe, B.plano, B.norma, B.mensageiro, B.fatos, B.inocular, B.afirmar, B.explicar, B.mi].map(li).join('') + '</ul>' +
    '<h2>Os fatos</h2>' +
    '<p>As propostas vêm dos planos de governo registrados no Tribunal Superior Eleitoral: ' + a(F.planoLula) + ' e ' + a(F.planoFlavio) + '. As páginas citadas são as do próprio documento. Números de governo vêm de IBGE, leis publicadas e imprensa com data. Declarações de campanha aparecem com data e link.</p>' +
    '<p>Sobre o Flávio, o roteiro só usa o que está no plano dele ou em declaração publicada. Pontos fracos do Lula, como a fraude do INSS, a alta da comida e a idade, aparecem com resposta, porque a pessoa vai trazer esses assuntos.</p>' +
    '<h2>Regras do dia</h2><ul class="plain">' +
    ['<span>Votação das 8h às 17h no horário de Brasília, em todo o país ao mesmo tempo. No horário local, é das 7h às 16h onde o relógio está uma hora atrás e das 6h às 15h no Acre. Quem está na fila às 17h vota.</span>',
     '<span>Leve documento oficial com foto. O e-Título só vale se tiver foto.</span>',
     '<span>Quem faltou no 1º turno pode votar no 2º normalmente.</span>',
     '<span>Quem estiver fora da cidade pode justificar pelo e-Título no dia ou depois. Veja os prazos no ' + a(F.justificar) + '.</span>',
     '<span>No domingo é proibido pedir voto e fazer boca de urna. Por isso este site fecha o roteiro no dia da eleição.</span>'].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' +
    '<h2>Privacidade</h2><p>Sem cadastro, sem cookie, sem contador de visitas. As respostas ficam guardadas só no navegador do seu aparelho, para você não perder o roteiro. Para apagar, toque em "Montar roteiro para outra pessoa".</p>' +
    '<h2>Quem fez</h2><p>Site independente de apoio a Lula (13), feito por Arthur Attili, eleitor, sem ligação com partido ou campanha e sem dinheiro de ninguém. Os textos foram escritos com ajuda de inteligência artificial e conferidos contra as fontes citadas. Encontrou um erro? <a href="https://github.com/arthurAttili/viravotos/issues" target="_blank" rel="noopener noreferrer">Avise aqui</a>.</p>' +
    '<p><button type="button" class="btn" data-start>Montar meu roteiro</button></p>';

  window.VV = { perguntas: perguntas, montar: montar, avisos: avisos, metodo: metodo };
})();
