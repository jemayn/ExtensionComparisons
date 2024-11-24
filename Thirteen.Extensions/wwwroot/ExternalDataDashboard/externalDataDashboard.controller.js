(function () {
    "use strict";

    function Controller($http) {

        var vm = this;
        vm.message = "";

        $http.get("backoffice/api/SecureApi/GetMessage").then(function (response) {
            vm.message = response.data;
        });
    }

    angular.module("umbraco").controller("ExternalDataDashboard.Controller", Controller);

})();