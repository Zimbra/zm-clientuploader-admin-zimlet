########################################################################################################

SHELL=bash
PACKAGE_XML = ./js/com_zimbra_clientuploader.xml
NAME = zimbra-zimlet-admin-clientuploader
DESC = Zimlet for administrators to upload client software to server
VERSION = $(shell grep 'version="[^"]*"' $(PACKAGE_XML) | cut -d'"' -f4)

.PHONY: clean all

########################################################################################################

all: zimbra-zimlet-pkg

########################################################################################################

create-zip:
	ant package-zimlet

stage-zimlet-zip:
	install -T -D build/zimlet/com_zimbra_clientuploader.zip build/stage/$(NAME)/opt/zimbra/lib/clientuploader/com_zimbra_clientuploader.zip

zimbra-zimlet-pkg: create-zip stage-zimlet-zip
	../zm-pkg-tool/pkg-build.pl \
		--out-type=binary \
		--pkg-version=$(VERSION) \
		--pkg-release=1 \
		--pkg-name=$(NAME) \
		--pkg-summary='$(DESC)' \
		--pkg-depends='zimbra-store (>= 8.8.15)' \
		--pkg-post-install-script='scripts/postinst.sh'\
		--pkg-installs='/opt/zimbra/lib/clientuploader/com_zimbra_clientuploader.zip'

########################################################################################################

clean:
	rm -rf build
	rm -rf downloads

########################################################################################################
