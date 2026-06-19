![Dragonbox Media Streaming](https://raw.githubusercontent.com/caiopolak/dragonboxtv/refs/heads/main/dragonbox_viewer1.png)
# Dragonbox 2026 — Media Streaming Desktop App

Media player desktop standalone em Python/PyQt6, inspirado em skins Kodi (Arctic Horizon 2), com navegação visual, reprodução MPV, EPG, DNS bypass e licenciamento por assinatura.

---

## Arquitetura

```
# Dragonbox Media Player — Experiência Premium de Entretenimento

O **Dragonbox** é a solução definitiva para quem busca uma central de mídia potente, elegante e extremamente fácil de usar.
Inspirado nas skins mais famosas do ecossistema Kodi (como a Arctic Horizon 2), o Dragonbox foi reconstruído do zero em Python/PyQt6 para oferecer performance superior como um aplicativo nativo para Windows.

---

## 💎 Diferenciais que Vendem

### 🚀 Performance "Standalone"
Diferente de addons pesados que dependem do Kodi, o Dragonbox é um executável leve.
Abre instantaneamente e processa listas de milhares de itens sem engasgos.

### 🎨 Interface Ultra-Moderna
Design limpo, minimalista e focado na experiência do usuário.
Navegue por seus filmes, séries e canais favoritos com fluidez visual digna de grandes serviços de streaming (Netflix/Disney+).

### 🎬 O Poder do Brazuc4 Integrado
Acesso direto ao catálogo mais completo do Brasil.
Filmes em 4K, Séries atualizadas diariamente, Animes, Desenhos e Novelas — tudo com resolvers VIP que garantem a melhor fonte disponível.

### 📺 TV Ao Vivo e Esportes (DaddyLive)
Guia de programação (EPG) em tempo real.
Nunca perca um jogo ou seu programa favorito com a integração de canais mundiais e nacionais.

### ⚡ Motor MPV Turbo
Utilizamos o motor de vídeo MPV, o mesmo usado por profissionais, garantindo aceleração de hardware e reprodução suave até em conexões instáveis.

## 🌟 Funcionalidades Principais

### 🖼️ Miniplayer (PIP) e Multitarefa
Player independente que não bloqueia a interface. Assista vídeos em modo Picture-in-Picture enquanto navega pelo app, trabalha ou acessa outros programas. Redimensione e posicione nos cantos da tela via configurações.

### 📋 Fila Inteligente (Queue)
Adicione filmes, episódios e canais a uma fila de reprodução. Acompanhe os próximos itens na Home ou na Mini Player Bar. Reordene ou remova itens. Reprodução automática sequencial sem intervenção do usuário.

### 🎨 Menu Art Registry (Branding Customizado)
Todo revendedor pode personalizar thumbnails e fanart de cada menu/categoria via arquivo JSON — sem modificar código. Sistema com fallback inteligente e suporte a acentos. Inclui ferramenta `tools/scan_menus.py` para diagnosticar thumbnails genéricas ou ausentes.

### 🔓 DNS Bypass Nativo (Sem VPN)
Bypass automático de bloqueio de DNS de operadoras (Claro, Vivo, Oi, etc.). Usa DNS over HTTPS para resolver servidores de streaming bloqueados. Funciona tanto no scraping quanto no player MPV.

### 🔑 Sistema de Licenciamento por Assinatura
Ativação via key única com validação online (Supabase REST), grace period de 7 dias offline, máximo de 2 dispositivos por chave com machine_id. Cache local criptografado. Ideal para revenda e controle de acesso.

*   **Busca Inteligente:** Encontre qualquer título em segundos usando o motor de busca unificado via TMDB.
*   **Favoritos:** Salve seus conteúdos para acessar com um clique.
*   **Histórico de Reprodução:** Saiba exatamente onde parou em cada filme ou episódio.
*   **Multi-Fonte:** Fallback automático — se um servidor cair, o Dragonbox busca outro instantaneamente.
*   **Aceleração de Hardware:** Suporte a HEVC/H.265 para máxima qualidade com mínimo uso de CPU.
```
---
## Licenciamento
Este projeto é distribuído comercialmente via assinatura. 
---
*Dragonbox v1.8.4 — © 2026 PyNEXUS*
