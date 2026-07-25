# TKusal.com.br

Código-fonte do site pessoal de Thiago Kusal, publicado em
[tkusal.com.br](https://tkusal.com.br).

O projeto apresenta experiência profissional, áreas de atuação,
certificações, tecnologias e os conteúdos publicados no
[RookieOps](https://rookieops.dev). O site possui versões em português e
inglês e foi desenvolvido para funcionar como uma aplicação totalmente
estática no Cloudflare Pages.

## Principais recursos

- Layout responsivo para desktop, tablet e celular.
- Conteúdo em português (`pt-BR`) e inglês.
- Open Graph, Twitter Cards e dados estruturados JSON-LD.
- Imagens WebP responsivas com fallback em PNG.
- Navegação acessível por teclado.
- Suporte a `prefers-reduced-motion`.
- Ícones do Boxicons armazenados localmente.
- Página 404 personalizada.
- Cabeçalhos de segurança e cache para Cloudflare Pages.
- Atualização estática dos artigos do RookieOps por GitHub Actions.

## Tecnologias

- HTML5
- CSS3
- JavaScript sem framework
- GitHub Actions
- Cloudflare Pages
- Vanilla Tilt
- tsParticles
- Boxicons

Não há etapa de compilação nem dependências obrigatórias para executar o
site. Os arquivos podem ser publicados diretamente por qualquer serviço de
hospedagem estática.

## Estrutura

```text
.
├── .github/workflows/       # Automação de atualização do blog
├── assets/
│   ├── css/                 # Estilos
│   ├── data/                # Dados estáticos dos posts
│   ├── img/                 # Logos, fotografias e imagens responsivas
│   ├── js/                  # Scripts do site
│   └── vendor/boxicons/     # Ícones de terceiros armazenados localmente
├── en/                      # Versão em inglês
├── scripts/                 # Gerador estático dos posts
├── 404.html                 # Página de erro
├── _headers                 # Segurança e cache no Cloudflare Pages
├── index.html               # Página principal em português
├── robots.txt
└── sitemap.xml
```

## Publicação

O repositório foi preparado para ser conectado ao Cloudflare Pages sem
framework e sem etapa de build. O diretório raiz do repositório contém os
arquivos que devem ser publicados.

Alterações enviadas para a branch configurada como produção no Cloudflare
Pages geram um novo deploy.

## Atualização do RookieOps

O workflow `.github/workflows/update-posts.yml` é executado diariamente e
também pode ser iniciado manualmente no GitHub.

O script `scripts/update-posts.mjs`:

1. consulta o feed `https://rookieops.dev/rss.xml`;
2. normaliza os artigos mais recentes;
3. atualiza `assets/data/posts.json`;
4. atualiza os cards nas páginas em português e inglês;
5. só gera um commit quando o conteúdo muda.

O workflow precisa de permissão de escrita no conteúdo do repositório para
publicar a atualização automática.

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

A fotografia, o logotipo e o banner `assets/img/og-banner-1200x630.png`
fazem parte da identidade pessoal de Thiago Kusal e não estão licenciados
para reutilização.

## Componentes de terceiros

Bibliotecas, fontes e ícones de terceiros continuam sujeitos às licenças de
seus respectivos autores. A licença do Boxicons incluído localmente está em
`assets/vendor/boxicons/LICENSE`.

## Licença

O código original deste repositório está disponível sob a
**TKusal Code Reuse License 1.0**. Ela permite usar, modificar e distribuir o
código desde que:

- Thiago Kusal seja creditado;
- esta licença seja preservada;
- nenhuma informação pessoal ou identidade visual seja reutilizada;
- as licenças dos componentes de terceiros sejam respeitadas.

Consulte o arquivo [LICENSE](LICENSE) para os termos completos.
