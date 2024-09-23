// Copyright Sebastian Wiesner <sebastian@swsnr.de>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//
// Alternatively, the contents of this file may be used under the terms
// of the GNU General Public License Version 2 or later, as described below:
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

import GObject from "gi://GObject";
import Gtk from "gi://Gtk";
import Adw from "gi://Adw";

import type { ExtensionMetadata } from "@girs/gnome-shell/extensions/extension";

import { getTemplate } from "./template.js";

const LICENSE = `Copyright Sebastian Wiesner <sebastian@swsnr.de>

This programm is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Alternatively, this program may be used under the terms
of the GNU General Public License Version 2 or later, as described below:

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.`;

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface TypescriptTemplateAboutPage {
  _extensionName: Gtk.Label;
  _extensionDescription: Gtk.Label;
  _linkGithub: Gtk.LinkButton;
  _linkIssues: Gtk.LinkButton;
  _extensionLicense: Gtk.TextView;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class TypescriptTemplateAboutPage extends Adw.PreferencesPage {
  constructor(metadata: ExtensionMetadata) {
    super();
    this._extensionName.set_text(metadata.name);
    this._extensionDescription.set_text(metadata.description);
    if (metadata.url) {
      this._linkGithub.set_uri(metadata.url);
      this._linkIssues.set_uri(`${metadata.url}/issues`);
    } else {
      this._linkGithub.visible = false;
      this._linkIssues.visible = false;
    }
    this._extensionLicense.buffer.set_text(LICENSE, -1);
  }
}

export default GObject.registerClass(
  {
    GTypeName: "TypescriptTemplateAboutPage",
    Template: getTemplate("AboutPage"),
    InternalChildren: [
      "extensionName",
      "extensionDescription",
      "linkGithub",
      "linkIssues",
      "extensionLicense",
    ],
  },
  TypescriptTemplateAboutPage,
);
