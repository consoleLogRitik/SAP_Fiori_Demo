sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
], (Controller,Filter,FilterOperator,JSONModel) => {
    "use strict";

    return Controller.extend("app01.controller.dashboard", {
        onInit() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
            oRouter.getRoute("dashboard").attachPatternMatched(this._onObjectMatched,this)
            //intialize a model to store values...
            var oUserModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oUserModel,"oUserModel");

            var oCurr = new sap.ui.model.json.JSONModel({
                currency: "INR"
            });
            this.getView().setModel(oCurr,"curr")

        },
        onFilterInvoices(oEvent){
            const aFilter = [];
            const sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("Name",FilterOperator.Contains,sQuery));
            }

            //filter binding
            const oList = this.byId("_IDGenList");
            const oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },
        _onObjectMatched(oEvent){
            let name = oEvent.getParameter("arguments").name;
            let pass = oEvent.getParameter("arguments").pass;
            let maskedPass = '*'.repeat(pass.length - 2) + pass.slice(-2);
            var oUserModel = this.getView().getModel("oUserModel")
            console.log(oUserModel);
            
            oUserModel.setProperty("/username",name);
            oUserModel.setProperty("/password",maskedPass);

        },
        onLogout() {
            var router = sap.ui.core.UIComponent.getRouterFor(this) // Learn it to get router object
            router.navTo("Routehome_view")
        },
    });
});