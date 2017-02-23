/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Server
 * Copyright (C) 2012, 2014, 2016 Synacor, Inc.
 *
 * The contents of this file are subject to the Common Public Attribution License Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at: https://www.zimbra.com/license
 * The License is based on the Mozilla Public License Version 1.1 but Sections 14 and 15
 * have been added to cover use of software over a computer network and provide for limited attribution
 * for the Original Developer. In addition, Exhibit A has been modified to be consistent with Exhibit B.
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * See the License for the specific language governing rights and limitations under the License.
 * The Original Code is Zimbra Open Source Web Client.
 * The Initial Developer of the Original Code is Zimbra, Inc.  All rights to the Original Code were
 * transferred by Zimbra, Inc. to Synacor, Inc. on September 14, 2015.
 *
 * All portions of the code are Copyright (C) 2012, 2014, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */
if(appNewUI && ZaSettings && ZaSettings.EnabledZimlet["com_zimbra_clientuploader"]){
    if(window.console && window.console.log) console.log("Start loading com_zimbra_clientuploader.js");
    function ZaClientUploader() {
        ZaItem.call(this,"ZaClientUpload");
        this._init();
        this.type = "ZaClientUploader";
    };
    ZaClientUploader.prototype = new ZaItem;
    ZaClientUploader.prototype.constructor = ZaClientUploader;

    ZaItem.loadMethods["ZaClientUploader"] = new Array();
    ZaItem.modifyMethods["ZaClientUploader"] = new Array();
    ZaItem.initMethods["ZaClientUploader"] = new Array();

    ZaOperation.CLIENT_UPLOADER = ++ZA_OP_INDEX;

    //constants
    ZaClientUploader.A2_isFileSelected = "isFileSelected";
    ZaClientUploader.A2_uploadReponseMsg = "uploadReponseMsg";
    ZaClientUploader.A2_uploadStatus = "uploadStatus";

    ZaClientUploader.STATUS_NOT_STARTED = 0;
    ZaClientUploader.STATUS_PROGRESS = 1;
    ZaClientUploader.STATUS_SUCCEEDED = 2;
    ZaClientUploader.STATUS_FAILED = 3;

    if(ZaSettings) {
        ZaSettings.Client_UPLOAD_VIEW = "zimbraClientUploadView";
        ZaSettings.ALL_UI_COMPONENTS.push({ value: ZaSettings.Client_UPLOAD_VIEW, label: com_zimbra_clientuploader.UI_Comp_clientUpload });
        ZaSettings.OVERVIEW_TOOLS_ITEMS.push(ZaSettings.Client_UPLOAD_VIEW);
        ZaSettings.VIEW_RIGHTS [ZaSettings.Client_UPLOAD_VIEW] = "adminConsoleClientUploadRights";
    }

    ZaClientUploader.myXModel = {
        items: [
            {id:ZaClientUploader.A2_isFileSelected, ref:ZaClientUploader.A2_isFileSelected, type:_ENUM_, choices:ZaModel.BOOLEAN_CHOICES1},
            {id:ZaClientUploader.A2_uploadReponseMsg, ref:ZaClientUploader.A2_uploadReponseMsg, type:_STRING_},
            {id:ZaClientUploader.A2_uploadStatus, ref:ZaClientUploader.A2_uploadStatus, type:_NUMBER_}
        ]
    };

    ZaClientUploader.initMethod = function () {
        this[ZaClientUploader.A2_isFileSelected] = false;
        this[ZaClientUploader.A2_uploadReponseMsg] = undefined;
        this[ZaClientUploader.A2_uploadStatus] = ZaClientUploader.STATUS_NOT_STARTED;
    }
    ZaItem.initMethods["ZaClientUploader"].push(ZaClientUploader.initMethod);


    ZaZimbraAdmin._CLIENT_UPLOADER_VIEW = ZaZimbraAdmin.VIEW_INDEX++;

    ZaApp.prototype.getClientUploadViewController =
        function() {
            if (this._controllers[ZaZimbraAdmin._CLIENT_UPLOADER_VIEW] == null)
                this._controllers[ZaZimbraAdmin._CLIENT_UPLOADER_VIEW] = new ZaClientUploadController(this._appCtxt, this._container);
            return this._controllers[ZaZimbraAdmin._CLIENT_UPLOADER_VIEW];
        }

    ZaClientUploader.versionCheckTreeListener = function (ev) {
        var clientUploader = new ZaClientUploader();

        if(ZaApp.getInstance().getCurrentController()) {
            ZaApp.getInstance().getCurrentController().switchToNextView(ZaApp.getInstance().getClientUploadViewController(),ZaClientUploadController.prototype.show, [clientUploader]);
        } else {
            ZaApp.getInstance().getClientUploadViewController().show(clientUploader);
        }
    }

    ZaClientUploader.versionCheckTreeModifier = function (tree) {
        var overviewPanelController = this ;
        if (!overviewPanelController) throw new Exception("ZaClientUploader.versionCheckTreeModifier: Overview Panel Controller is not set.");
        if(ZaSettings.ENABLED_UI_COMPONENTS[ZaSettings.Client_UPLOAD_VIEW] || ZaSettings.ENABLED_UI_COMPONENTS[ZaSettings.CARTE_BLANCHE_UI]) {
            var parentPath = ZaTree.getPathByArray([ZaMsg.OVP_home, ZaMsg.OVP_toolMig]);

            var ti = new ZaTreeItemData({
                parent:parentPath,
                id:ZaId.getTreeItemId(ZaId.PANEL_APP,"magHV",null, "ClientUploadHV"),
                text: com_zimbra_clientuploader.OVP_clientUpload,
                mappingId: ZaZimbraAdmin._CLIENT_UPLOADER_VIEW});
            tree.addTreeItemData(ti);

            if(ZaOverviewPanelController.overviewTreeListeners) {
                ZaOverviewPanelController.overviewTreeListeners[ZaZimbraAdmin._CLIENT_UPLOADER_VIEW] = ZaClientUploader.versionCheckTreeListener;
            }
        }
    }

    if(ZaOverviewPanelController.treeModifiers)
        ZaOverviewPanelController.treeModifiers.push(ZaClientUploader.versionCheckTreeModifier);

}

