PREFIX = /usr/local
DESTDIR =
HOME-DESTDIR = $(HOME)/.local/share/gnome-shell/extensions/$(UUID)

UUID = typescript-template@swsnr.de

DIST-EXTRA-SRC = LICENSE-GPL2 LICENSE-MPL2
UIDEFS = $(wildcard ui/*.ui)

.PHONY: dist
dist: compile
	mkdir -p ./dist/
	mkdir -p ./build/ui
	cp -t ./build/ui $(UIDEFS)
	pnpm dist:format
	gnome-extensions pack --force --out-dir dist build \
		--extra-source=../metadata.json \
		--extra-source=ui \
		$(addprefix --extra-source=../,$(DIST-EXTRA-SRC)) \
		$(addprefix --schema=../,$(wildcard schemas/*.gschema.xml))

# Make a reproducible dist package
.PHONY: dist-repro
dist-repro: dist
	strip-nondeterminism dist/$(UUID).shell-extension.zip

# Install to local home directory; this simply unpacks the zip file as GNOME would do
.PHONY: install-home
install-home: dist
	mkdir -p $(HOME-DESTDIR)
	gnome-extensions install -f dist/$(UUID).shell-extension.zip

.PHONY: uninstall-home
uninstall-home:
	rm -rf $(HOME-DESTDIR)

# Install as a system-wide installation schema, into a separate directory
# Intended for distribution packaging
.PHONY: install-package
install-package: dist
	install -d \
		$(DESTDIR)/$(PREFIX)/share/gnome-shell/extensions/$(UUID) \
		$(DESTDIR)/$(PREFIX)/share/glib-2.0/
	bsdtar -xf dist/$(UUID).shell-extension.zip \
		-C $(DESTDIR)/$(PREFIX)/share/gnome-shell/extensions/$(UUID) --no-same-owner
	mv -T --no-clobber \
		$(DESTDIR)/$(PREFIX)/share/gnome-shell/extensions/$(UUID)/schemas \
		$(DESTDIR)/$(PREFIX)/share/glib-2.0/schemas
	mv -T --no-clobber \
		$(DESTDIR)/$(PREFIX)/share/gnome-shell/extensions/$(UUID)/locale \
		$(DESTDIR)/$(PREFIX)/share/locale

.PHONY: compile
compile: $(UIDEFS)
	pnpm compile

.PHONY: clean
clean:
	rm -rf ./dist/ ./build/

.PHONY: format
format:
	pnpm format --write

.PHONY: lint
lint:
	pnpm lint

.PHONY: check-types
check-types:
	pnpm check:types

.PHONY: check
check: lint check-types
	pnpm format --check

.PHONY: fix
fix: format
	pnpm lint --fix
