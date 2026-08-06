# TKusal.com.br

Código-fonte do site pessoal de Thiago Kusal, publicado em
[tkusal.com.br](https://tkusal.com.br).

O projeto apresenta experiência profissional, áreas de atuação,
certificações, tecnologias e os conteúdos publicados no
[RookieOps](https://rookieops.dev). O site possui versões em português e
inglês e foi desenvolvido para funcionar como uma aplicação totalmente
estática no Cloudflare Pages.

## Principais recursos

- Interface de terminal em uma única janela, adaptada para desktop, tablet e celular.
- Navegação entre início, sobre, competências e blog por comandos, atalhos ou teclado.
- Prompt interativo com histórico, sugestões e autocompletar comandos usando `Tab`.
- Transições progressivas entre os painéis, com fallback e respeito a `prefers-reduced-motion`.
- Rolagem interna no desktop e carrossel com encaixe dos cards em dispositivos de toque.
- Conteúdo em português (`pt-BR`) e inglês.
- Open Graph, Twitter Cards e dados estruturados JSON-LD.
- Imagens AVIF e WebP responsivas com fallback em PNG otimizado.
- Fontes Noto Sans e IBM Plex Mono armazenadas localmente.
- Navegação acessível por teclado.
- Suporte a `prefers-reduced-motion`.
- Ícones do Boxicons armazenados localmente.
- Página 404 personalizada.
- Cabeçalhos de segurança para Cloudflare Pages.
- Canal de reporte de vulnerabilidades publicado em `security.txt`.
- Atualização estática dos artigos do RookieOps por GitHub Actions.

## Tecnologias

- HTML5
- CSS3
- JavaScript sem framework
- GitHub Actions
- Cloudflare Pages
- Vanilla Tilt
- Boxicons

Não há etapa de compilação nem dependências obrigatórias para executar o
site. Os arquivos podem ser publicados diretamente por qualquer serviço de
hospedagem estática.

## Execução local

Sirva o diretório raiz com um servidor HTTP estático. Um exemplo usando
Python é:

```shell
python -m http.server 4173
```

Depois, acesse `http://localhost:4173`. Abrir os arquivos diretamente pelo
navegador não reproduz com fidelidade o comportamento de uma hospedagem web.

## Estrutura

```text
.
├── .github/workflows/       # Automação de atualização do blog
├── .well-known/security.txt # Canal para reporte de vulnerabilidades
├── assets/
│   ├── css/                 # Estilos
│   ├── data/                # Dados estáticos dos posts
│   ├── fonts/               # Fontes locais e respectivas licenças
│   ├── img/                 # Fotografias e imagens do site
│   ├── js/                  # Scripts do site
│   └── vendor/boxicons/     # Ícones de terceiros armazenados localmente
├── en/                      # Versão em inglês
├── scripts/                 # Gerador estático dos posts
├── 404.html                 # Página de erro
├── _headers                 # Segurança no Cloudflare Pages
├── index.html               # Página principal em português
├── LICENSE                  # Termos de reutilização do código
├── robots.txt
└── sitemap.xml
```

## Publicação

O repositório foi preparado para ser conectado ao Cloudflare Pages sem
framework e sem etapa de build. O diretório raiz do repositório contém os
arquivos que devem ser publicados.

Quando a integração de produção do Cloudflare Pages está configurada,
alterações enviadas para a branch de produção geram um novo deploy. A
automação dos artigos também aciona explicitamente um Deploy Hook depois de
publicar mudanças, evitando que a atualização dependa apenas da integração com
a branch.

## Reporte de vulnerabilidades

As instruções para comunicar uma vulnerabilidade estão publicadas em
`.well-known/security.txt`. Esse arquivo informa o contato de segurança, os
idiomas aceitos, sua URL canônica e a data de expiração da política.

## Atualização do RookieOps

O workflow `.github/workflows/update-posts.yml` é executado diariamente e
também pode ser iniciado manualmente no GitHub. Na execução manual, a opção
`force_deploy` permite publicar novamente o conteúdo atual mesmo quando o feed
não mudou.

O script `scripts/update-posts.mjs`:

1. consulta o feed `https://rookieops.dev/rss.xml`;
2. normaliza os seis artigos mais recentes;
3. atualiza `assets/data/posts.json`;
4. atualiza os cards nas páginas em português e inglês;
5. atualiza o `lastmod` do sitemap quando o conteúdo muda;
6. encerra com erro se o feed estiver indisponível ou for bloqueado.

Depois da execução do script, o workflow:

1. cria um commit e faz `push` somente quando os arquivos gerados mudam;
2. aciona o Deploy Hook da Cloudflare quando há mudanças ou quando
   `force_deploy` é solicitado;
3. cria ou atualiza uma issue se a automação falhar;
4. comenta e encerra a issue de alerta quando o workflow volta a funcionar.

Para isso, o job de atualização precisa de permissão `contents: write`, o job de
notificação precisa de `issues: write` e o repositório deve possuir o secret
`CLOUDFLARE_PAGES_DEPLOY_HOOK` com a URL do Deploy Hook.

## Conteúdo pessoal e identidade

O código pode ser reutilizado de acordo com o arquivo [LICENSE](LICENSE), mas
as informações pessoais e a identidade de Thiago Kusal não fazem parte dessa
permissão.

Antes de reutilizar este projeto, remova ou substitua:

- nome, fotografia, biografia e histórico profissional;
- certificações, formação e demais dados pessoais;
- links de contato e perfis sociais;
- logotipos, marcas e materiais visuais de TKusal e RookieOps;
- textos que possam sugerir autoria, vínculo ou endosso de Thiago Kusal.

O crédito exigido pela licença deve permanecer. A menção ao nome de Thiago
Kusal usada exclusivamente para fornecer esse crédito é permitida.

A fotografia e o banner `assets/img/og-banner-1200x630.png` fazem parte da
identidade pessoal de Thiago Kusal e não estão licenciados para reutilização.

## Componentes de terceiros

Bibliotecas, fontes e ícones de terceiros continuam sujeitos às licenças de
seus respectivos autores. A licença do Boxicons incluído localmente está em
`assets/vendor/boxicons/LICENSE`. As licenças da Noto Sans e da IBM Plex Mono
estão em `assets/fonts/OFL.txt` e `assets/fonts/IBM-PLEX-MONO-OFL.txt`.

## Licença

O código original deste repositório está disponível sob a
**TKusal Code Reuse License 1.0**. Ela permite usar, modificar e distribuir o
código desde que:

- Thiago Kusal seja creditado;
- esta licença seja preservada;
- nenhuma informação pessoal ou identidade visual seja reutilizada;
- as licenças dos componentes de terceiros sejam respeitadas.

Consulte o arquivo [LICENSE](LICENSE) para os termos completos.
