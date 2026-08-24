# TKusal.com.br

<p align="center">
  <strong>Personal portfolio with a terminal-inspired interface.</strong><br>
  Cloud, Infrastructure, DevOps, Cybersecurity and Open Source.
</p>

<p align="center">
  <a href="https://tkusal.com.br">Live Website</a>
  ·
  <a href="#portugues-pt-br">Português (PT-BR)</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-static_site-informational?logo=html5" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-responsive-informational?logo=css3" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-vanilla-informational?logo=javascript" alt="JavaScript">
  <img src="https://img.shields.io/badge/Cloudflare-Pages-informational?logo=cloudflarepages" alt="Cloudflare Pages">
  <img src="https://img.shields.io/badge/GitHub-Actions-informational?logo=githubactions" alt="GitHub Actions">
</p>

---

# English

Source code for my personal website, [tkusal.com.br](https://tkusal.com.br).

The project serves as my professional portfolio, bringing together my experience, areas of expertise, certifications, technologies, projects, and technical content published on [RookieOps](https://rookieops.dev).

The interface is inspired by a terminal while remaining easy to navigate for visitors who are not familiar with command-line environments. The website is fully static, bilingual, and deployed on Cloudflare Pages.

## Highlights

* Terminal-inspired interface optimized for desktop, tablet, and mobile devices.
* Navigation through commands, shortcuts, keyboard controls, or regular interface elements.
* Interactive prompt with command history, suggestions, and `Tab` autocompletion.
* Content available in English and Portuguese (`pt-BR`).
* Responsive layout with dedicated desktop and touch-device behaviors.
* Progressive transitions with fallbacks and `prefers-reduced-motion` support.
* Keyboard-accessible navigation.
* Open Graph, Twitter Cards, and JSON-LD structured data.
* Responsive AVIF and WebP images with optimized PNG fallbacks.
* Locally hosted fonts and icons.
* Custom 404 page.
* Security headers for Cloudflare Pages.
* Vulnerability reporting through `security.txt`.
* Automatic synchronization of the latest RookieOps articles using GitHub Actions.

## Tech Stack

| Technology       | Purpose                                   |
| ---------------- | ----------------------------------------- |
| HTML5            | Structure and content                     |
| CSS3             | Interface, responsiveness, and animations |
| JavaScript       | Interactivity and navigation              |
| GitHub Actions   | Blog content automation                   |
| Cloudflare Pages | Hosting and deployment                    |
| Vanilla Tilt     | Interaction effects                       |
| Boxicons         | Icons                                     |

The project does not require a framework, build process, or mandatory runtime dependencies.

Its files can be deployed directly to any static hosting provider.

## Running Locally

Clone the repository:

```shell
git clone https://github.com/tkusal/tkusal.com.br.git
cd tkusal.com.br
```

Start a local static HTTP server. For example, using Python:

```shell
python -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

Opening the HTML files directly in a browser may not accurately reproduce the behavior of a hosted website.

## Project Structure

```text
.
├── .github/
│   └── workflows/           # GitHub Actions automation
├── .well-known/
│   └── security.txt         # Vulnerability reporting channel
├── assets/
│   ├── css/                 # Stylesheets
│   ├── data/                # Static article data
│   ├── fonts/               # Local fonts and licenses
│   ├── img/                 # Photos and images
│   ├── js/                  # Website scripts
│   └── vendor/
│       └── boxicons/        # Third-party icons
├── en/                      # English version
├── scripts/                 # Generation and update scripts
├── 404.html                 # Custom error page
├── _headers                 # Cloudflare Pages headers
├── index.html               # Portuguese home page
├── LICENSE                  # Code reuse terms
├── robots.txt
└── sitemap.xml
```

## Deployment

The repository was designed to be deployed as a static website using Cloudflare Pages.

There is no build step. The repository root directly contains the files published to production.

When the Cloudflare Pages integration is configured, changes pushed to the production branch can automatically trigger a new deployment.

The RookieOps article automation can also explicitly trigger a Cloudflare Pages Deploy Hook whenever content is updated.

## RookieOps Integration

Articles displayed on the portfolio are automatically synchronized with [RookieOps](https://rookieops.dev).

The workflow:

```text
.github/workflows/update-posts.yml
```

runs daily and can also be triggered manually.

The script:

```text
scripts/update-posts.mjs
```

is responsible for:

1. fetching the RookieOps RSS feed;
2. normalizing the six latest articles;
3. updating `assets/data/posts.json`;
4. updating article cards on both Portuguese and English pages;
5. updating the sitemap `lastmod` value when necessary;
6. detecting feed availability or blocking failures.

When changes are detected, the workflow creates a commit and pushes the updated content to the repository.

The automation can also:

* trigger a Cloudflare Pages Deploy Hook;
* create or update an issue when synchronization fails;
* automatically close the alert after normal operation is restored.

The workflow uses specific GitHub Actions permissions and the following repository secret:

```text
CLOUDFLARE_PAGES_DEPLOY_HOOK
```

## Security

Responsible vulnerability reporting instructions are available at:

```text
.well-known/security.txt
```

The file contains the security contact channel, accepted languages, canonical URL, and policy expiration date.

## Personal Content and Identity

The source code in this repository may be reused according to the terms defined in [LICENSE](LICENSE).

Personal information and visual identity contained in the website are not included in that permission.

Before reusing the project, remove or replace:

* name, photograph, biography, and professional history;
* certifications, education, and other personal information;
* contact links and social profiles;
* TKusal and RookieOps logos, branding, and visual materials;
* text that could imply authorship, affiliation, or endorsement by Thiago Kusal.

The attribution required by the license must be preserved.

The personal photograph and the following file:

```text
assets/img/og-banner-1200x630.png
```

are part of the personal visual identity and are not licensed for reuse.

## Third-Party Components

Third-party libraries, fonts, and icons remain subject to their respective authors' licenses.

These include:

* Boxicons: `assets/vendor/boxicons/LICENSE`
* Noto Sans: `assets/fonts/OFL.txt`
* IBM Plex Mono: `assets/fonts/IBM-PLEX-MONO-OFL.txt`

## License

Original code in this repository is available under the **TKusal Code Reuse License 1.0**.

It permits the use, modification, and distribution of the code provided that:

* Thiago Kusal receives attribution;
* the license is preserved;
* personal information and visual identity are not reused;
* third-party component licenses are respected.

See [LICENSE](LICENSE) for the complete terms.

---

<a id="portugues-pt-br"></a>

# Português (PT-BR)

Código-fonte do meu site pessoal, [tkusal.com.br](https://tkusal.com.br).

O projeto funciona como meu portfólio profissional e reúne experiência, áreas de atuação, certificações, tecnologias, projetos e conteúdos técnicos publicados no [RookieOps](https://rookieops.dev).

A interface foi inspirada em um terminal, mas desenvolvida para continuar simples de navegar mesmo para quem não está acostumado com linha de comando. O site é totalmente estático, bilíngue e publicado no Cloudflare Pages.

## Destaques

* Interface inspirada em terminal e adaptada para desktop, tablet e dispositivos móveis.
* Navegação por comandos, atalhos, teclado ou elementos da própria interface.
* Prompt interativo com histórico, sugestões e autocompletar usando `Tab`.
* Conteúdo disponível em português (`pt-BR`) e inglês.
* Layout responsivo com comportamentos específicos para desktop e dispositivos de toque.
* Transições progressivas com fallback e suporte a `prefers-reduced-motion`.
* Navegação acessível por teclado.
* Open Graph, Twitter Cards e dados estruturados JSON-LD.
* Imagens responsivas em AVIF e WebP, com fallback otimizado em PNG.
* Fontes e ícones armazenados localmente.
* Página 404 personalizada.
* Cabeçalhos de segurança para Cloudflare Pages.
* Canal de reporte de vulnerabilidades por `security.txt`.
* Sincronização automática dos artigos mais recentes do RookieOps usando GitHub Actions.

## Tecnologias

| Tecnologia       | Uso                                   |
| ---------------- | ------------------------------------- |
| HTML5            | Estrutura e conteúdo                  |
| CSS3             | Interface, responsividade e animações |
| JavaScript       | Interatividade e navegação            |
| GitHub Actions   | Automação dos conteúdos do blog       |
| Cloudflare Pages | Hospedagem e deploy                   |
| Vanilla Tilt     | Efeitos de interação                  |
| Boxicons         | Ícones                                |

O projeto não utiliza framework, processo de compilação ou dependências obrigatórias para execução.

Os arquivos podem ser publicados diretamente em qualquer serviço de hospedagem estática.

## Executando localmente

Clone o repositório:

```shell
git clone https://github.com/tkusal/tkusal.com.br.git
cd tkusal.com.br
```

Inicie um servidor HTTP estático. Por exemplo, usando Python:

```shell
python -m http.server 4173
```

Depois acesse:

```text
http://localhost:4173
```

Abrir os arquivos HTML diretamente pelo navegador pode não reproduzir com fidelidade o comportamento de uma hospedagem web.

## Estrutura do projeto

```text
.
├── .github/
│   └── workflows/           # Automações do GitHub Actions
├── .well-known/
│   └── security.txt         # Canal para reporte de vulnerabilidades
├── assets/
│   ├── css/                 # Folhas de estilo
│   ├── data/                # Dados estáticos dos artigos
│   ├── fonts/               # Fontes locais e respectivas licenças
│   ├── img/                 # Fotografias e imagens
│   ├── js/                  # Scripts do site
│   └── vendor/
│       └── boxicons/        # Ícones de terceiros
├── en/                      # Versão em inglês
├── scripts/                 # Scripts de geração e atualização
├── 404.html                 # Página de erro personalizada
├── _headers                 # Cabeçalhos para Cloudflare Pages
├── index.html               # Página principal em português
├── LICENSE                  # Termos de reutilização
├── robots.txt
└── sitemap.xml
```

## Deploy

O repositório foi desenvolvido para publicação como site estático no Cloudflare Pages.

Não existe etapa de build. O diretório raiz contém diretamente os arquivos publicados em produção.

Quando a integração com o Cloudflare Pages está configurada, alterações enviadas para a branch de produção podem gerar automaticamente um novo deploy.

A automação responsável pelos artigos do RookieOps também pode acionar explicitamente um Cloudflare Pages Deploy Hook quando o conteúdo é atualizado.

## Integração com o RookieOps

Os artigos apresentados no portfólio são sincronizados automaticamente com o [RookieOps](https://rookieops.dev).

O workflow:

```text
.github/workflows/update-posts.yml
```

é executado diariamente e também pode ser iniciado manualmente.

O script:

```text
scripts/update-posts.mjs
```

é responsável por:

1. consultar o feed RSS do RookieOps;
2. normalizar os seis artigos mais recentes;
3. atualizar `assets/data/posts.json`;
4. atualizar os cards das páginas em português e inglês;
5. atualizar o `lastmod` do sitemap quando necessário;
6. detectar indisponibilidade ou bloqueio do feed.

Quando existem alterações, o workflow cria um commit e envia as mudanças para o repositório.

A automação também pode:

* acionar um Deploy Hook do Cloudflare Pages;
* criar ou atualizar uma issue quando a sincronização falha;
* encerrar automaticamente o alerta quando o funcionamento é restabelecido.

Para isso, o repositório utiliza permissões específicas do GitHub Actions e o secret:

```text
CLOUDFLARE_PAGES_DEPLOY_HOOK
```

## Segurança

As instruções para reporte responsável de vulnerabilidades estão disponíveis em:

```text
.well-known/security.txt
```

O arquivo contém o canal de contato de segurança, idiomas aceitos, URL canônica e período de validade da política.

## Conteúdo pessoal e identidade

O código deste projeto pode ser reutilizado de acordo com os termos definidos em [LICENSE](LICENSE).

As informações pessoais e a identidade visual presentes no site, entretanto, não fazem parte dessa autorização.

Antes de reutilizar o projeto, remova ou substitua:

* nome, fotografia, biografia e histórico profissional;
* certificações, formação e demais informações pessoais;
* links de contato e perfis sociais;
* logotipos, marcas e materiais visuais de TKusal e RookieOps;
* textos que possam sugerir autoria, vínculo ou endosso de Thiago Kusal.

O crédito exigido pela licença deve ser preservado.

A fotografia pessoal e o arquivo:

```text
assets/img/og-banner-1200x630.png
```

fazem parte da identidade visual pessoal e não estão licenciados para reutilização.

## Componentes de terceiros

Bibliotecas, fontes e ícones de terceiros continuam sujeitos às licenças de seus respectivos autores.

Entre elas:

* Boxicons: `assets/vendor/boxicons/LICENSE`
* Noto Sans: `assets/fonts/OFL.txt`
* IBM Plex Mono: `assets/fonts/IBM-PLEX-MONO-OFL.txt`

## Licença

O código original deste repositório é disponibilizado sob a **TKusal Code Reuse License 1.0**.

Ela permite usar, modificar e distribuir o código desde que:

* Thiago Kusal seja creditado;
* a licença seja preservada;
* informações pessoais e identidade visual não sejam reutilizadas;
* as licenças dos componentes de terceiros sejam respeitadas.

Consulte [LICENSE](LICENSE) para os termos completos.
