#!/bin/bash
echo "*** Configuring zimbra-zimlet-admin-clientuploader ***"
echo "*** Checking if zimbra-zimlet-admin-clientuploader zimlet is installed. ***"
su - zimbra -c "zmmailboxdctl status"
if [ $? -ne 0 ]; then
   echo "*** Mailbox is not running... ***"
   echo "*** Follow the steps below as zimbra user ignore if installing through install.sh .. ***"
   echo "*** Install the zimbra-zimlet-admin-clientuploader. ***"
   echo "*** mv /opt/zimbra/lib/clientuploader/com_zimbra_clientuploader.zip /opt/zimbra/zimlets/com_zimbra_clientuploader.zip ***"
   echo "*** rm -rf /opt/zimbra/lib/clientuploader ***"
   echo "*** chown -R zimbra:zimbra /opt/zimbra/zimlets/com_zimbra_clientuploader.zip ***"
   echo "*** zmzimletctl -l deploy /opt/zimbra/zimlets/com_zimbra_clientuploader.zip ***"
   echo "*** zmprov fc zimlet ***"
else
   echo "*** Deploying zimbra-zimlet-admin-clientuploader ***"
   mv /opt/zimbra/lib/clientuploader/com_zimbra_clientuploader.zip /opt/zimbra/zimlets/com_zimbra_clientuploader.zip
   rm -rf /opt/zimbra/lib/clientuploader
   chown -R zimbra:zimbra /opt/zimbra/zimlets/com_zimbra_clientuploader.zip
   su - zimbra -c  "zmzimletctl -l deploy /opt/zimbra/zimlets/com_zimbra_clientuploader.zip"
   su - zimbra -c  "zmprov fc zimlet"
fi
echo "*** zimbra-zimlet-admin-clientuploader Installation Completed. ***"
echo "*** Restart the mailbox service as zimbra user. Run ***"
echo "*** su - zimbra ***"
echo "*** zmmailboxdctl restart ***"
