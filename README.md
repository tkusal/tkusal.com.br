# TKusal.com.br

<p align="center">
  <strong>Personal portfolio with a terminal-inspired interface.</strong><br>
  Cloud, Infrastructure, DevOps, Cybersecurity and Public Source Code.
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

The interface is inspired by a terminal while remaining accessible to visitors who are not familiar with command-line environments. The website is fully static, bilingual, and deployed on Cloudflare Pages.

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

The project does not require a framework, package manager, or build step to run.

Runtime assets and third-party components required by the website are stored directly in the repository, allowing the site to be deployed as a static application.

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

Opening the HTML files directly through the `file://` protocol may not accurately reproduce the behavior of a hosted website.

## Project Structure

```text
.
├── .github/
│   ├── FUNDING.yml          # Sponsorship configuration
│   └── workflows/           # GitHub Actions automation
├── .well-known/
│   └── security.txt         # Vulnerability reporting channel
├── assets/
│   ├── css/                 # Stylesheets
│   ├── data/                # Static article data
│   ├── fonts/               # Local fonts and their licenses
│   ├── img/                 # Photos and images
│   ├── js/                  # Website scripts
│   └── vendor/              # Third-party assets
├── en/                      # English version
├── scripts/                 # Generation and update scripts
├── 404.html                 # Custom error page
├── _headers                 # Cloudflare Pages security headers
├── index.html               # Portuguese home page
├── LICENSE                  # Code reuse terms
├── robots.txt
└── sitemap.xml
```

## Deployment

The repository is designed to be deployed as a static website using Cloudflare Pages.

There is no build step. The repository root directly contains the files published to production.

When the Cloudflare Pages production integration is configured, changes pushed to the production branch can automatically trigger a new deployment.

The RookieOps article synchronization workflow can also explicitly trigger a Cloudflare Pages Deploy Hook after content changes.

## RookieOps Integration

Articles displayed in the portfolio are automatically synchronized with [RookieOps](https://rookieops.dev).

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

1. fetching the Portuguese and English RookieOps RSS feeds;
2. normalizing the six latest articles from each feed;
3. updating `assets/data/posts.json`;
4. updating article cards on both Portuguese and English pages;
5. updating the sitemap `lastmod` value when content changes;
6. failing explicitly when a feed is unavailable or does not contain valid posts.

When changes are detected, the workflow creates a commit and pushes the updated generated files to the repository.

The automation can also:

* trigger a Cloudflare Pages Deploy Hook;
* create or update an issue when synchronization fails;
* automatically close the failure alert after normal operation is restored.

The workflow uses scoped GitHub Actions permissions and the following repository secret:

```text
CLOUDFLARE_PAGES_DEPLOY_HOOK
```

## Security

The website includes security-related HTTP headers configured for Cloudflare Pages, including Content Security Policy, HSTS, anti-framing protections, content-type protections, referrer controls, and restrictive browser permissions.

Responsible vulnerability reporting instructions are available at:

```text
.well-known/security.txt
```

The file defines the security contact channel, accepted languages, canonical URL, and policy expiration date.

## Personal Content and Identity

The source code in this repository may be reused according to the terms defined in [LICENSE](LICENSE).

Personal information, branding, and visual identity contained in the website are not licensed for reuse.

Before publicly distributing or deploying a derivative version of this project, remove or replace:

* name, photograph, biography, and professional history;
* certifications, education, skills, achievements, and other personal information;
* contact information and social profiles;
* TKusal and RookieOps names, logos, branding, artwork, and visual materials;
* content that could imply authorship, affiliation, sponsorship, endorsement, or approval by Thiago Kusal.

The attribution required by the license must be preserved.

The personal photograph and the following file:

```text
assets/img/og-banner-1200x630.png
```

are part of the personal identity and branding and are not licensed for reuse.

## Third-Party Components

Third-party libraries, fonts, icons, images, and other materials remain subject to the licenses and rights of their respective authors or owners.

Examples currently included in the repository include:

* Boxicons: `assets/vendor/boxicons/LICENSE`
* Noto Sans: `assets/fonts/OFL.txt`
* IBM Plex Mono: `assets/fonts/IBM-PLEX-MONO-OFL.txt`
* Vanilla Tilt: third-party JavaScript component included with the website

The TKusal Code Reuse License does not replace or override third-party licenses.

## License

Original code authored by Thiago Kusal and included in this repository is available under the **TKusal Code Reuse License 1.1**.

The license permits commercial and non-commercial use, modification, adaptation, distribution, sublicensing, and incorporation of the Code into other works, subject to its conditions.

In particular:

* attribution to Thiago Kusal must be preserved;
* a complete copy of the license must accompany substantial distributions of the Code;
* Personal Content is not licensed for public reuse;
* TKusal and RookieOps Branding is not licensed for reuse;
* no endorsement, sponsorship, maintenance, affiliation, or approval may be implied;
* Third-Party Materials remain subject to their own licenses and rights.

See [LICENSE](LICENSE) for the complete terms.

---

<a id="portugues-pt-br"></a>

# Português (PT-BR)

Código-fonte do meu site pessoal, [tkusal.com.br](https://tkusal.com.br).

O projeto funciona como meu portfólio profissional e reúne experiência, áreas de atuação, certificações, tecnologias, projetos e conteúdos técnicos publicados no [RookieOps](https://rookieops.dev).

A interface foi inspirada em um terminal, mas desenvolvida para permanecer acessível mesmo para visitantes que não estejam familiarizados com ambientes de linha de comando. O site é totalmente estático, bilíngue e publicado no Cloudflare Pages.

## Destaques

* Interface inspirada em terminal e adaptada para desktop, tablet e dispositivos móveis.
* Navegação por comandos, atalhos, teclado ou elementos convencionais da interface.
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
* Canal para reporte de vulnerabilidades por `security.txt`.
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

O projeto não exige framework, gerenciador de pacotes ou etapa de compilação para execução.

Os assets de runtime e componentes de terceiros necessários ao site são armazenados diretamente no repositório, permitindo sua publicação como uma aplicação estática.

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

Abrir os arquivos HTML diretamente pelo protocolo `file://` pode não reproduzir com fidelidade o comportamento de uma hospedagem web.

## Estrutura do projeto

```text
.
├── .github/
│   ├── FUNDING.yml          # Configuração de patrocínio
│   └── workflows/           # Automações do GitHub Actions
├── .well-known/
│   └── security.txt         # Canal para reporte de vulnerabilidades
├── assets/
│   ├── css/                 # Folhas de estilo
│   ├── data/                # Dados estáticos dos artigos
│   ├── fonts/               # Fontes locais e respectivas licenças
│   ├── img/                 # Fotografias e imagens
│   ├── js/                  # Scripts do site
│   └── vendor/              # Assets de terceiros
├── en/                      # Versão em inglês
├── scripts/                 # Scripts de geração e atualização
├── 404.html                 # Página de erro personalizada
├── _headers                 # Cabeçalhos de segurança do Cloudflare Pages
├── index.html               # Página principal em português
├── LICENSE                  # Termos de reutilização do código
├── robots.txt
└── sitemap.xml
```

## Deploy

O repositório foi desenvolvido para publicação como um site estático no Cloudflare Pages.

Não existe etapa de build. O diretório raiz contém diretamente os arquivos publicados em produção.

Quando a integração de produção do Cloudflare Pages está configurada, alterações enviadas para a branch de produção podem gerar automaticamente um novo deploy.

A automação responsável pela sincronização dos artigos do RookieOps também pode acionar explicitamente um Cloudflare Pages Deploy Hook depois de alterações no conteúdo.

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

1. consultar os feeds RSS em português e inglês do RookieOps;
2. normalizar os seis artigos mais recentes de cada feed;
3. atualizar `assets/data/posts.json`;
4. atualizar os cards das páginas em português e inglês;
5. atualizar o `lastmod` do sitemap quando o conteúdo muda;
6. encerrar com erro quando um feed está indisponível ou não contém artigos válidos.

Quando existem alterações, o workflow cria um commit e envia os arquivos gerados atualizados para o repositório.

A automação também pode:

* acionar um Cloudflare Pages Deploy Hook;
* criar ou atualizar uma issue quando a sincronização falha;
* encerrar automaticamente o alerta quando o funcionamento é restabelecido.

O workflow utiliza permissões específicas do GitHub Actions e o seguinte secret do repositório:

```text
CLOUDFLARE_PAGES_DEPLOY_HOOK
```

## Segurança

O site utiliza cabeçalhos HTTP de segurança configurados para o Cloudflare Pages, incluindo Content Security Policy, HSTS, proteção contra framing, proteção de content type, controle de referrer e restrições de permissões do navegador.

As instruções para reporte responsável de vulnerabilidades estão disponíveis em:

```text
.well-known/security.txt
```

O arquivo define o canal de contato de segurança, idiomas aceitos, URL canônica e período de validade da política.

## Conteúdo pessoal e identidade

O código-fonte deste projeto pode ser reutilizado de acordo com os termos definidos em [LICENSE](LICENSE).

Informações pessoais, branding e identidade visual presentes no site não estão licenciados para reutilização.

Antes de distribuir ou publicar publicamente uma versão derivada deste projeto, remova ou substitua:

* nome, fotografia, biografia e histórico profissional;
* certificações, formação, competências, conquistas e demais informações pessoais;
* informações de contato e perfis sociais;
* nomes, logotipos, branding, arte e materiais visuais de TKusal e RookieOps;
* conteúdos que possam sugerir autoria, vínculo, patrocínio, endosso ou aprovação por Thiago Kusal.

O crédito exigido pela licença deve ser preservado.

A fotografia pessoal e o seguinte arquivo:

```text
assets/img/og-banner-1200x630.png
```

fazem parte da identidade pessoal e do branding e não estão licenciados para reutilização.

## Componentes de terceiros

Bibliotecas, fontes, ícones, imagens e outros materiais de terceiros continuam sujeitos às licenças e direitos de seus respectivos autores ou proprietários.

Alguns dos componentes atualmente presentes no repositório incluem:

* Boxicons: `assets/vendor/boxicons/LICENSE`
* Noto Sans: `assets/fonts/OFL.txt`
* IBM Plex Mono: `assets/fonts/IBM-PLEX-MONO-OFL.txt`
* Vanilla Tilt: componente JavaScript de terceiros incluído no site

A TKusal Code Reuse License não substitui nem prevalece sobre as licenças aplicáveis aos componentes de terceiros.

## Licença

O código original de autoria de Thiago Kusal incluído neste repositório é disponibilizado sob a **TKusal Code Reuse License 1.1**.

A licença permite uso comercial e não comercial, modificação, adaptação, distribuição, sublicenciamento e incorporação do código em outros trabalhos, respeitadas suas condições.

Em especial:

* o crédito a Thiago Kusal deve ser preservado;
* uma cópia completa da licença deve acompanhar distribuições substanciais do código;
* Personal Content não está licenciado para reutilização pública;
* o Branding de TKusal e RookieOps não está licenciado para reutilização;
* não pode ser sugerido endosso, patrocínio, manutenção, vínculo ou aprovação;
* materiais de terceiros continuam sujeitos às próprias licenças e direitos.

Consulte [LICENSE](LICENSE) para os termos completos.
