(function () {
    "use strict";

    function Controller($http, $scope, listViewHelper) {

        var vm = this;

        vm.items = [
            {
                "id": 1,
                "icon": "icon-document",
                "name": "My node 1",
                "published": true,
                "description": "A short description of my node",
                "author": "Author 1"
            },
            {
                "id": 2,
                "icon": "icon-document",
                "name": "Ny node 2",
                "published": true,
                "description": "A short description of my node",
                "author": "Author 2"
            }
        ];
        
        vm.selection = [];

        vm.options = {
            filter: '',
            orderBy: "author",
            orderDirection: "asc",
            includeProperties: [
                { alias: "description", header: "Description" },
                { alias: "author", header: "Author" }
            ],
            bulkActionsAllowed: true
        };

        vm.selectItem = selectItem;
        vm.clickItem = clickItem;
        vm.isSortDirection = isSortDirection;
        vm.sort = sort;

        function clickItem(item) {
            listViewHelper.editItem(item, vm);
        }

        function selectItem(item, $index, $event) {
            listViewHelper.selectHandler(item, $index, vm.items, vm.selection, $event);
        }

        function isSortDirection(col, direction) {
            return listViewHelper.setSortingDirection(col, direction, vm.options);
        }
        function sort(field, allow) {
            listViewHelper.setSorting(field, allow, vm.options);
        }
    }

    angular.module("umbraco").controller("ListviewDashboard.Controller", Controller);

})();