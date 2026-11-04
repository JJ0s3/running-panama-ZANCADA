# ADR-002 — Persistencia de demo
**Fecha:** 2026-11-03 · **Estado:** Vigente

**Problema:** avanzar rápido sin credenciales, preservando una futura migración.
**Opciones:** JSON fijo, localStorage, SQLite, Supabase.
**Decisión:** usar `localStorage` únicamente para esta demo local por navegador; eventos sintéticos en código. Mantener interfaces de dominio para futura persistencia con Supabase/PostgreSQL.
**Razón:** permite demostrar el recorrido sin infraestructura.
**Consecuencias:** no hay usuarios ni sincronización; debe indicarse. Migrar antes de manejo real de perfiles y datos privados.
