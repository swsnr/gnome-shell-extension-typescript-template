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
import Gtk from "gi://Gtk";
import Adw from "gi://Adw";

import {
  ExtensionMetadata,
  ExtensionPreferences,
} from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";

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

interface GeneralPageChildren {
  _sayHello: Adw.SwitchRow;
}

interface AboutPageChildren {
  _extensionName: Gtk.Label;
  _extensionDescription: Gtk.Label;
  _linkGithub: Gtk.LinkButton;
  _linkIssues: Gtk.LinkButton;
  _extensionLicense: Gtk.TextView;
}

export default class HelloWorldPreferences extends ExtensionPreferences {
  private loadPages(templateDirectory: Gio.File) {
    const GeneralPage = GObject.registerClass(
      {
        GTypeName: "GeneralPage",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        Template: templateDirectory.get_child("GeneralPage.ui").get_uri()!,
        InternalChildren: ["sayHello"],
      },
      class GeneralPage extends Adw.PreferencesPage {
        constructor(settings: Gio.Settings) {
          super();

          const children = this as unknown as GeneralPageChildren;
          settings.bind(
            "say-hello",
            children._sayHello,
            "active",
            Gio.SettingsBindFlags.DEFAULT,
          );
        }
      },
    );
    const AboutPage = GObject.registerClass(
      {
        GTypeName: "AboutPage",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        Template: templateDirectory.get_child("AboutPage.ui").get_uri()!,
        InternalChildren: [
          "extensionName",
          "extensionDescription",
          "linkGithub",
          "linkIssues",
          "extensionLicense",
        ],
      },
      class AboutPage extends Adw.PreferencesPage {
        constructor(metadata: ExtensionMetadata) {
          super();

          // TODO: Find a better way to declare that an instance has a set of props
          const children = this as unknown as AboutPageChildren;
          children._extensionName.set_text(metadata.name);
          children._extensionDescription.set_text(metadata.description);
          children._linkGithub.set_uri(metadata.url);
          children._linkIssues.set_uri(`${metadata.url}/issues`);
          children._extensionLicense.buffer.set_text(LICENSE, -1);
        }
      },
    );
    return { GeneralPage, AboutPage };
  }

  override fillPreferencesWindow(
    window: Adw.PreferencesWindow & {
      _settings: Gio.Settings;
    },
  ): void {
    // Create a settings object and bind the row to our key.
    // Attach the settings object to the window to keep it alive while the window is alive.
    window._settings = this.getSettings();

    const uiDir = this.metadata.dir.get_child("ui");
    const Pages = this.loadPages(uiDir);
    window.add(new Pages.GeneralPage(window._settings));
    window.add(new Pages.AboutPage(this.metadata));
  }
}