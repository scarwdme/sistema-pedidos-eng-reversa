# Análise Reversa e Modelagem de Sistema de Pedidos

Este repositório contém a documentação técnica e os artefatos de modelagem para o projeto de engenharia reversa de um sistema de gestão e entrega de pedidos (delivery). O trabalho simula uma entrega profissional de software, aplicando boas práticas de engenharia de software, mapeamento de regras de negócio, modelagem baseada em padrões de projeto e propostas de evolução arquitetural.

---

### Identificação do Aluno
- **Nome:** Letícia Renely
- **Curso:** Análise e Desenvolvimento de Sistemas
- **Disciplina:** Arquitetura de Sistemas
- **Contexto:** Projeto de Engenharia Reversa e Análise de Arquitetura

---

### Estrutura de Arquivos da Pasta `analise-sistema`

Com base no mapeamento do projeto, os arquivos estão organizados de forma modular e clara dentro do diretório `analise-sistema`:

#### 1. `analise.md`
Contém a visão geral do sistema estudado a partir do processo de engenharia reversa. Mapeia os fluxos do usuário, as principais interfaces identificadas no site real e o levantamento de requisitos de alto nível da aplicação.

#### 2. `arquitetura.md` (Parte 6 – Modelagem do Sistema)
Documento focado no mapeamento estático das entidades centrais da aplicação em formato simples, direto e técnico. Inclui:
- **Classes do Núcleo:** Detalhamento de papéis e responsabilidades para `Plataforma`, `Administrador`, `Cliente`, `Pedidos` e `API`.
- **Abstrações do Catálogo:** Uso de superclasse abstrata (`ItensEspecificos`) para padronizar e herdar propriedades comuns dos produtos do cardápio.
- **Mapeamento de Relacionamentos:** Definição formal de Associações Simples, Agregações de ciclo de vida (Todo/Parte) e estruturas de Herança.
- **Regras de Multiplicidade:** Validação de limites na memória e na base de dados (`1..*` e `0..*`).

#### 3. `comparacao.md`
Texto comparativo ou relatório técnico que confronta as decisões arquiteturais da engenharia reversa com possíveis abordagens alternativas do mercado, discutindo acertos de design e pontos de atrito no sistema legado.

#### 4. `diagrama_de_classes.png`
Diagrama visual em notação UML (Unified Modeling Language) que representa graficamente todas as classes documentadas em `arquitetura.md`, evidenciando os modificadores de acesso, atributos, métodos e os conectores corretos de associação, agregação e generalização.

#### 5. `melhorias.md` (Plano de Evolução Arquitetural)
Proposta de melhorias técnicas refinadas e detalhadas para sanar as fragilidades identificadas no modelo atual:
- **Composição sobre Herança:** Substituição de subclasses estáticas por um modelo de catálogo flexível usando `Produto` e `Categoria`.
- **Snapshot de Preços:** Introdução da classe associativa `ItemPedido` para travar valores históricos e garantir integridade financeira e fiscal.
- **Desacoplamento por Mensageria:** Uso de filas assíncronas para o envio de alertas via WhatsApp através da API, mitigando riscos de quedas de terceiros.
- **Padrão State:** Modelagem robusta para transições do status de entrega.

---

### Tecnologias e Conceitos Aplicados
- **Documentação Técnica:** Markdown Estruturado
- **Modelagem:** Draw.io (Diagrama de Classes)
- **Princípios de Design:** SOLID (*Open/Closed Principle*, Segregação de Contextos)

```