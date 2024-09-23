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
import Gio from "gi://Gio";
import Adw from "gi://Adw";

import { getTemplate } from "./template.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface TypescriptTemplateGeneralPage {
  _sayHello: Adw.SwitchRow;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class TypescriptTemplateGeneralPage extends Adw.PreferencesPage {
  constructor(settings: Gio.Settings) {
    super();

    settings.bind(
      "say-hello",
      this._sayHello,
      "active",
      Gio.SettingsBindFlags.DEFAULT,
    );
  }
}

export default GObject.registerClass(
  {
    GTypeName: "TypescriptTemplateGeneralPage",
    Template: getTemplate("GeneralPage"),
    InternalChildren: ["sayHello"],
  },
  TypescriptTemplateGeneralPage,
);
