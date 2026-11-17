# Changelog

## 2026-11-17

### Corrigé
- **SIRET** : correction de `47769215600078` → `47769215600086` (l'ancienne valeur seedée était erronée).
  - Nouvelle migration `20261117_120000_siret_update` : `UPDATE` ciblé sur l'ancienne valeur (n'écrase pas une saisie back-office différente), avec `down` symétrique. Propagée en prod au prochain `payload migrate` du build Vercel.
  - Commentaires d'illustration du format mis à jour dans `src/lib/content.ts`.
  - Clé de contrôle Luhn du nouveau numéro vérifiée (valide).
