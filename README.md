# Dragonbox 2026 — Media Streaming Desktop App

Media player desktop standalone em Python/PyQt6, inspirado em skins Kodi (Arctic Horizon 2), com navegação visual, reprodução MPV, EPG, DNS bypass e licenciamento por assinatura.

---

## Arquitetura

```
main.py              → Entry point (carrega tema, fontes, dns_bypatch, LicenseManager)
config.json           → Config centralizada
menus.json            → Estrutura de menus (sidebar + categorias)
core/                 → Lógica principal (resolvers, APIs, DB, player, menu art)
├── player.py         → MPV subprocess (stall watchdog, PIP, queue)
├── addon_resolver.py → Core URL resolver
├── menu_art.py       → MenuArtRegistry (JSON art centralizado)
├── item_utils.py     → Normalização de itens (type, thumb, metadata)
├── dns_bypass.py     → DNS over HTTPS bypass (ISP block)
├── license_manager.py→ Validação de assinatura (Supabase REST)
├── tmdb_api.py       → TMDB metadata (posters, ratings, search)
├── epg_parser.py     → EPG global
├── addon_updater.py  → Sincronização de addons/rotas
├── config_manager.py → Gerenciamento de configurações
├── db_manager.py     → SQLite (favoritos, histórico, resume)
├── path_manager.py   → Paths (dev vs bundle)
└── api/              → UnifiedAPIClient (cache, retry, fallback)
plugins/              → Provedores (BrazucaPlay, DaddyLive, OnePlay)
ui/                   → PyQt6 (screens, widgets, sidebar, topbar)
├── app.py            → Janela principal + navegação
├── screens/          → Home, Content, Player, Settings, License
└── widgets/          → ContentCard, HorizontalRow, dialogs, OSD
tools/                → Scripts de diagnóstico
└── scan_menus.py     → Scanner de thumbnails de menus
assets/               → default_menu_art.json, ícones, QSS
bot/                  → Bot Discord (geração de licenças, pagamento)
```

---

## Setup para Desenvolvimento

### Pré-requisitos
- Python 3.11+
- Windows 10/11
- MPV (incluído em `bin/mpv/`)

### Instalação

```powershell
git clone <repo>
cd dragonbox
python -m venv venv
.\venv\Scripts\Activate
pip install -r requirements.txt
```

### Executar em modo Dev

```powershell
python main.py
```

Para logs detalhados de resolução:
```powershell
$env:DEBUG_RESOLVE="1"; python main.py
```

---

## Build

### Executável (PyInstaller)

```powershell
python -m PyInstaller Dragonbox.spec
```

O .exe é gerado em `dist/Dragonbox/`.

### Instalador (Inno Setup)

Compilar `dragonbox_setup.iss` no Inno Setup. O instalador:
- Copia o conteúdo de `dist/Dragonbox/`
- Cria atalhos
- Aplica regra de firewall opcional
- Dados mutáveis em `%APPDATA%/Dragonbox/` (fora de Program Files)

---

## Módulos Principais

### Menu Art Registry (`core/menu_art.py`)

Arte de menus centralizada em JSON. Override via `userdata/menu_art.json` persiste entre builds.

```python
from core.menu_art import MenuArtRegistry
art = MenuArtRegistry.get_instance()
thumb_url = art.get_thumb("FILMES")
art.set_custom_thumb("MEU_MENU", "https://exemplo/thumb.png")
```

Prioridade: userdata override > assets default > fallback tipo.

### Item Normalization (`core/item_utils.py`)

Padroniza itens de plugins inconsistentes. Usado em todo fluxo de navegação.

```python
from core.item_utils import normalize_item
item = normalize_item(plugin_item, parent=parent_item)
```

Transformações: type (dir/video/episode/season), thumb (plugin > registry > parent > fallback), fanart, rating, metadata extraction (year, tags), folder/playable inference.

### DNS Bypass (`core/dns_bypass.py`)

Ativado no startup (`main.py`). Patcheia `socket.getaddrinfo` para usar DoH em domínios de streaming bloqueados.

```python
from core.dns_bypass import apply_dns_patch
apply_dns_patch()  # chamado em main.py
```

### Licenciamento (`core/license_manager.py`)

Sistema de assinatura com validação Supabase REST. Bot Discord em `bot/` para geração automática de chaves.

---

## Ferramentas de Diagnóstico

```powershell
python tools/scan_menus.py
```

Escaneia `menus.json` e reporta:
- [UNIQUE] thumbnails exclusivas
- [GENERIC] placeholders genéricos
- [MISSING] sem thumbnail
- Lista de candidatos para arte customizada

---

## Documentação

| Arquivo | Descrição |
|---------|-----------|
| `ARCHITECTURE.md` | Arquitetura detalhada, rotas, APIs, fluxos |
| `ROUTES_DOCUMENTATION.md` | Catálogo completo de rotas, gists, endpoints |
| `RESILIENCE_GUIDE.md` | Histórico de bugs, causas e soluções |
| `PROJECT INSTRUCTIONS.md` | Convenções de código e workflow |
| `PRODUCT_MARKETING.md` | Texto comercial e argumentos de venda |
| `DRAGONBOX_SALES.md` | Pitch de vendas e funcionalidades premium |
| `DRAGONBOX_COMPLETE.md` | Manual completo do produto |

---

## Licenciamento

Este projeto é distribuído comercialmente via assinatura. Consulte `core/license_manager.py` e `bot/` para detalhes do sistema de chaves.

---

*Dragonbox v1.8.4 — © 2026 PyNEXUS*
