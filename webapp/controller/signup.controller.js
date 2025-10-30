
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent"

],(Controller,JSONModel,MessageToast,UIComponent) => {
    "use strict";

    return Controller.extend("app01.controller.signup",{
        onInit(){
            var oNewUserModel = new JSONModel(
                {
                    username: "",
                    name: "",
                    password: "",
                    confirmPassword: ""
                }
            );

            this.getView().setModel(oNewUserModel,"newUserModel");
        },
        onRegister() {
            var oModel = this.getView().getModel("newUserModel");   
            var oData = oModel.getData();

            if (!oData.name||
                !oData.username ||
                !oData.password ||
                !oData.confirmPassword) {
                MessageToast.show("Please fill the required fields");
                return;
            }
            if(oData.password !== oData.confirmPassword){
                MessageToast.show("Passwords do not match");
                return;
            }

            

            localStorage.setItem(oData.username,JSON.stringify(oData));
            MessageToast.show("User registered successfully!");
            oModel.setData(null);
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("Routehome_view");
        },
        goBackToLogin(){
            // Go Back To Login.
            UIComponent.getRouterFor(this).navTo("Routehome_view");
        }

    })
})