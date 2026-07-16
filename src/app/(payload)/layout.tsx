/**
 * Layout racine du back-office Payload (groupe de routes `(payload)`).
 *
 * ⚠️ Ce fichier est du câblage imposé par Payload : il fournit son propre
 *    <html>/<body> et ne doit PAS hériter du layout du site public
 *    (Header/Footer/polices). C'est la raison d'être des deux groupes de
 *    routes `(frontend)` et `(payload)`.
 */
import type { ServerFunctionClient } from "payload";

import config from "@payload-config";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import React from "react";

import { importMap } from "./admin/importMap";

// Feuille de style PRÉCOMPILÉE du back-office (~300 Ko).
// Indispensable : `RootLayout` importe bien `@payloadcms/ui/scss/app.scss`,
// mais Turbopack (compilateur par défaut de Next 16) ne traite pas ce SCSS
// depuis node_modules — l'admin s'affichait sans aucun style, seuls quelques
// fragments (banner, ReactCrop) étant émis.
import "@payloadcms/next/css";
import "./custom.scss";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

export default function Layout({ children }: Args) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
