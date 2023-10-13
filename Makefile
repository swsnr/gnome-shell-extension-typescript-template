PREFIX = /usr/local
DESTDIR =

DIST-EXTRA-SRC = README.md LICENSE-GPL2 LICENSE-MPL2
UUID = typescript-template@swsnr.de
HOME-DESTDIR = $(HOME)/.local/share/gnome-shell/extensions/$(UUID)

.PHONY: generate
generate:
	npm run generate:gir-types

.PHONY: format
format:
	npm run format -- --write

.PHONY: lint
lint:
	npm run lint

.PHONY: check
check: lint
	npm run format -- --check

.PHONY: fix
fix: format
	npm run lint -- --fix

.PHONY: compile
compile:
	npm run compile

.PHONY: dist
dist: compile
	mkdir -p ./dist/
	gnome-extensions pack --force --out-dir dist \
		$(addprefix --extra-source=,$(DIST-EXTRA-SRC))

# Install to local home directory; this simply unpacks the zip file as GNOME would do
.PHONY: install-home
install-home: dist
	mkdir -p $(HOME-DESTDIR)
	bsdtar -xf dist/$(UUID).shell-extension.zip -C $(HOME-DESTDIR)

.PHONY: uninstall-home
uninstall-home:
	rm -rf $(HOME-DESTDIR)
