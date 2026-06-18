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


---

## Licenciamento

Este projeto é distribuído comercialmente via assinatura. Consulte `core/license_manager.py` e `bot/` para detalhes do sistema de chaves.

---

*Dragonbox v1.8.4 — © 2026 PyNEXUS*
