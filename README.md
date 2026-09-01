# Softplus Proposal Engine

Vamos criar um novo projeto no Lovable exclusivamente para desenvolver e validar visualmente o novo GERADOR DE PROPOSTAS COMERCIAIS da Softplus.

IMPORTANTE:

Este projeto será inicialmente um ambiente isolado de desenvolvimento e homologação do gerador de propostas.

Depois que o layout, os componentes, a responsividade, a impressão e a geração do PDF estiverem aprovados, esse módulo será levado e integrado ao sistema Softflow que já existe.

Portanto:

NÃO quero criar um novo CRM.

NÃO quero criar uma nova gestão de oportunidades.

NÃO quero duplicar a arquitetura do Softflow.

NÃO quero reconstruir as integrações que já existem.

O projeto novo servirá apenas para desenvolver o motor visual e dinâmico das propostas comerciais.

Posteriormente ele deverá ser preparado para ser incorporado ao Softflow.

REFERÊNCIA VISUAL

Vou anexar a proposta comercial atual da Softplus.

Analise cuidadosamente o PDF anexado.

Quero preservar a identidade visual da Softplus presente nele, principalmente:

- predominância de branco;

- azul marinho;

- azul claro/ciano;

- identidade tecnológica;

- cards;

- cantos arredondados;

- organização visual dos recursos;

- destaque para valores;

- aparência limpa;

- elementos gráficos sutis;

- forte presença da marca Softplus.

Porém NÃO quero simplesmente copiar a proposta atual.

Quero uma evolução significativa.

A nova proposta precisa transmitir uma empresa de tecnologia moderna, sólida e premium.

Pense em uma apresentação comercial SaaS contemporânea, elegante e muito bem diagramada.

Ela precisa impressionar visualmente sem ficar carregada.

OBJETIVO

Construir uma proposta comercial 100% dinâmica em HTML/CSS, preparada para:

1. visualização no navegador;

2. impressão em formato A4;

3. conversão posterior para PDF;

4. conteúdo variável;

5. diferentes quantidades de páginas;

6. inclusão e remoção automática de módulos;

7. integração futura com o Softflow.

A proposta NÃO poderá depender de posições absolutas frágeis ou de imagens contendo os textos comerciais.

Textos, valores, módulos, preços e condições precisam ser elementos HTML dinâmicos.

IMAGENS

Algumas imagens institucionais e imagens dos produtos/módulos poderão ser fornecidas posteriormente.

Prepare os componentes para receber essas imagens.

Exemplos:

- PDV;

- Gestão Web;

- KDS;

- Totem;

- Tablet na Mesa;

- XTAG;

- Checkey;

- Portal de IA;

- aplicativos;

- outros módulos.

Não invente imagens definitivas neste momento.

Quando uma imagem não estiver disponível, utilize placeholder elegante que possa ser substituído posteriormente.

ESTRUTURA DA PROPOSTA

Quero estudar uma estrutura aproximadamente assim:

PÁGINA 1 — CAPA

Página visual e institucional.

Logo Softplus.

Proposta Comercial.

Nome da empresa/cliente.

Data.

Número da proposta.

Uma chamada comercial forte.

Pode utilizar uma imagem principal relacionada a tecnologia para restaurantes, respeitando a identidade da referência enviada.

PÁGINA 2 — SOFTPLUS / ECOSSISTEMA

Apresentação visual curta da solução Softplus.

Não quero excesso de texto.

Mostrar que existe um ecossistema integrado para operação, gestão, vendas, delivery, produção, financeiro e inteligência.

Essa página poderá apresentar algumas soluções visualmente.

PÁGINA 3 — SUA SOLUÇÃO

Esta é uma das principais mudanças em relação à proposta antiga.

Não quero obrigatoriamente apresentar uma tabela comparando todos os planos.

A proposta deverá destacar o PLANO QUE ESTÁ SENDO OFERECIDO especificamente para aquele cliente.

Exemplo:

PLANO MASTER

R$ 459,90/mês

Abaixo deverão aparecer automaticamente os recursos incluídos naquele plano.

Cada recurso deverá ser representado por um componente/card reutilizável.

Exemplo:

PDV / CAIXA

Terminal de Lançamento

XLIVE

Gestão Web

Se outro plano possuir recursos diferentes, os cards devem mudar automaticamente.

PÁGINAS DE RECURSOS

Dependendo da quantidade de módulos contratados, a proposta poderá gerar uma ou mais páginas automaticamente.

Cada módulo deverá possuir:

- nome;

- descrição comercial curta;

- ícone;

- imagem opcional;

- categoria;

- quantidade, quando aplicável;

- indicação se está incluído no plano;

- indicação se é adicional.

Os cards devem se reorganizar automaticamente conforme a quantidade de módulos.

Exemplo:

Cliente A:

Master

+ Gestão Web

+ XLIVE

+ 5 Terminais

+ KDS

Cliente B:

Combo personalizado

+ 5 PDVs

+ Gestão Web

+ Manifesto

+ Portal IA

+ Checkey

O mesmo template precisa funcionar para os dois casos.

MÓDULOS OPCIONAIS

Itens opcionais precisam ficar VISUALMENTE separados dos itens efetivamente contratados.

Exemplo:

POTENCIALIZE SUA OPERAÇÃO

Checkey

Descrição...

+ R$ 190,00/mês

Um módulo marcado como opcional NÃO poderá entrar no total mensal contratado.

CONDIÇÕES COMERCIAIS

Criar uma página/bloco comercial extremamente bem trabalhado.

Ela deverá suportar:

- plano principal;

- adicionais;

- quantidades;

- preço de tabela;

- preço negociado;

- desconto;

- desconto percentual;

- promoções;

- período promocional;

- mensalidade normal;

- mensalidade promocional;

- implantação;

- treinamento;

- condições de pagamento;

- validade;

- observações.

Quando houver preço promocional, quero forte percepção visual de vantagem.

Exemplo:

DE:

R$ 769,70/mês

POR:

R$ 615,76/mês

Primeiros 6 meses

ECONOMIA NO PERÍODO:

R$ 923,64

Quando não houver promoção, esses elementos simplesmente não aparecem.

Não deixar espaços vazios.

IMPLANTAÇÃO

Apresentar separadamente:

Implantação e treinamento

R$ 1.800,00

Condição de pagamento

PIX / Cartão / Parcelamento etc.

Se houver desconto ou bonificação de implantação, mostrar:

Valor normal

Valor negociado

Economia

RESUMO FINAL

A proposta deve terminar com uma composição comercial forte e simples de entender.

O cliente precisa conseguir identificar em poucos segundos:

O QUE ESTÁ CONTRATANDO

+

QUANTO PAGARÁ POR MÊS

+

QUANTO PAGARÁ DE IMPLANTAÇÃO

+

QUAIS SÃO AS CONDIÇÕES.

COMPONENTIZAÇÃO

Quero que a arquitetura seja preparada com componentes reutilizáveis, por exemplo:

ProposalCover

ProposalHeader

ClientInfo

PlanHero

FeatureCard

ModuleCard

OptionalModuleCard

PriceSummary

DiscountHighlight

ImplementationCard

CommercialConditions

ProposalFooter

PageContainer

Os nomes podem ser ajustados de acordo com a arquitetura recomendada.

DADOS DINÂMICOS

Não espalhe informações comerciais diretamente no código dos componentes.

Crie inicialmente dados MOCK estruturados para alimentar a proposta.

Exemplo conceitual:

cliente

plano

recursosIncluidos

adicionais

opcionais

descontos

implantacao

condicoes

totais

Esses mocks serão substituídos futuramente pelos dados reais provenientes do Softflow.

INTEGRAÇÃO FUTURA COM SOFTFLOW

É FUNDAMENTAL considerar desde agora que este projeto será incorporado ao Softflow.

No Softflow já existem CRM e Oportunidades.

Futuramente uma proposta pertencerá a uma Oportunidade existente.

O Softflow será responsável por fornecer:

- cliente;

- empresa;

- oportunidade;

- plano;

- módulos;

- preços;

- quantidades;

- descontos;

- condições;

- implantação;

- observações;

- totais.

O gerador deverá apenas receber esses dados estruturados e renderizar a proposta.

Não acople o template a um banco de dados próprio desnecessariamente.

TELEGRAM + CLAUDE

Futuramente também teremos o seguinte fluxo:

Telegram

→ Claude interpreta a solicitação

→ Softflow consulta CRM/Oportunidade

→ Softflow consulta planos e módulos

→ Softflow calcula os valores

→ apresenta resumo para aprovação

→ usuário aprova

→ dados estruturados são enviados ao gerador

→ HTML é renderizado

→ PDF é gerado

→ PDF é armazenado na oportunidade

→ arquivo é devolvido pelo Telegram.

Claude NÃO será fonte oficial de preços e NÃO deverá definir sozinho os cálculos comerciais.

A fonte oficial será o Softflow.

RESPONSIVIDADE E PDF

Essa parte é crítica.

O layout deve ser pensado simultaneamente para tela e impressão.

Para impressão/PDF:

- formato A4;

- margens consistentes;

- controle de page-break;

- evitar cards cortados entre páginas;

- evitar títulos órfãos;

- manter cabeçalho/rodapé quando necessário;

- preservar imagens;

- preservar tipografia;

- preservar cores;

- garantir consistência entre preview e PDF.

Quero uma proposta que pareça ter sido criada por uma equipe profissional de branding e design, e não uma página web simplesmente impressa.

PRIMEIRA ENTREGA

Nesta primeira versão, crie o FRONT-END funcional da proposta utilizando dados mockados.

Não crie CRM.

Não crie oportunidades.

Não implemente Telegram.

Não implemente Claude.

Não altere Softflow.

Não crie integrações desnecessárias.

Quero conseguir visualizar a proposta no navegador e testar diferentes cenários alterando os dados mockados.

Crie pelo menos 3 cenários de teste:

1. Plano simples com poucos módulos;

2. Plano completo com vários módulos;

3. Plano com desconto, adicionais e módulos opcionais.

Antes de começar a implementação, analise a referência visual anexada e apresente brevemente a direção visual e a arquitetura que pretende utilizar.

Depois implemente a primeira versão.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://softplus-pitch.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1eaa6d56-19af-496c-adbf-ed2fdae71178).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
