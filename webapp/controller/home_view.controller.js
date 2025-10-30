sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox"
], (Controller,UIComponent,MessageBox) => {
    "use strict";

    return Controller.extend("app01.controller.home_view", {
        onInit() {
            this.getView().byId("Input1").setValue("");
            this.getView().byId("Input2").setValue("");
        },
        onLogin() {
            let userName = this.getView().byId("Input1").getValue();
            let password = this.getView().byId("Input2").getValue();
            var router = UIComponent.getRouterFor(this) // Learn it to get router object
            if(!userName || !password){
                MessageBox.error("Either Username or password is missing.")
            }
           let userData = localStorage.getItem(userName);
           if(userData){
                if(JSON.parse(userData).password === password){
                    router.navTo("dashboard",{
                        name: userName,
                        pass: password
                    })
                    //clear the input fields before going to other page
                    this.getView().byId("Input1").setValue("");
                    this.getView().byId("Input2").setValue("");
                }else{
                    MessageBox.error("Wrong Credentials.." );
                }

           }else{
                MessageBox.error("User doesn't Exist" );
           }
        },
        onSignUp(){
            var router = UIComponent.getRouterFor(this);
            router.navTo("signup")
        }
    });
});