---
name: Pixel-match the Tailwind Plus reference first
description: While building wise-ui, example screens must match the Tailwind Plus reference exactly — English copy, USD formatting, reference asset set. Localization happens as a later pass.
type: feedback
originSessionId: e8bd7202-48b7-4402-8f9e-e1167b54b6af
---
User directive (2026-04-23, during first DS visual review): "deixe o copy idêntico ao original. Quero tudo idêntico, tal qual."

This overrides the usual pt-BR + BRL conventions **for the example screens** while the DS is being calibrated against the reference. The pt-BR convention still applies in production consumers; it just doesn't belong in the reference screens right now.

**Why:** pixel-matching against the canonical reference makes DS gaps visible. Localizing early mixes two axes of variation (layout + locale), which hid chrome/primitive issues during the first review.

**How to apply:**
- Reference screens (`examples/cashflow/*.vue`, `examples/planetaria/*.vue`) use English copy, USD (`$405,091.00`, with cents, comma thousands, dot decimals), English month dates ("December 13, 2022"), and the reference asset set (brand logos, avatars).
- DS primitives remain locale-neutral (no hardcoded strings in `src/`).
- Do not re-introduce pt-BR into reference screens without explicit go-ahead. If the user asks for a localization pass, that's a separate deliberate cycle.
