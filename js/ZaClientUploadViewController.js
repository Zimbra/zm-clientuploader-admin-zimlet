/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Server
 * Copyright (C) 2012, 2013, 2014, 2016 Synacor, Inc.
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
 * All portions of the code are Copyright (C) 2012, 2013, 2014, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */

ZaClientUploadController = function(appCtxt, container) {
    ZaXFormViewController.call(this, appCtxt, container, "ZaClientUploadController");
    this._UICreated = false;
    this._helpURL = location.pathname + "help/admin/html/tools/uploadanewversionofzco.htm?locid=" + AjxEnv.DEFAULT_LOCALE;
    this.tabConstructor = ZaClientUploadXFormView;
}

ZaClientUploadController.prototype = new ZaXFormViewController();
ZaClientUploadController.prototype.constructor = ZaClientUploadController;

ZaController.setViewMethods["ZaClientUploadController"] = [];

ZaClientUploadController.setViewMethod = function (item) {
    if(!this._UICreated) {
        this._contentView = this._view = new this.tabConstructor(this._container,item);
        var elements = new Object();
        elements[ZaAppViewMgr.C_APP_CONTENT] = this._view;
        ZaApp.getInstance().getAppViewMgr().createView(this.getContentViewId(), elements);
        this._UICreated = true;
        ZaApp.getInstance()._controllers[this.getContentViewId ()] = this ;
    }
    ZaApp.getInstance().pushView(this.getContentViewId());

    //item.load();
    try {
        //item[ZaModel.currentTab] = "1"
        this._view.setDirty(false);
        this._view.setObject(item);
    } catch (ex) {
        this._handleException(ex, "ZaClientUploadController.prototype.show", null, false);
    }
    this._currentObject = item;
}
ZaController.setViewMethods["ZaClientUploadController"].push(ZaClientUploadController.setViewMethod) ;
