angular
    .module("app")
    .directive("projectConsoleLogViewer", function () {
        return {
            restrict: 'E',
            scope: {
                logModel: '='
            },
            templateUrl: 'directives/project/projectConsoleLogViewer.html',
            controller: function ($scope) {

                var socket;

                $scope.logIsPicked = logIsPicked;
                $scope.$watch('logModel.pickedLog', function () {
                    pickLog();
                });

                function init() {
                    pickLog();
                }

                function pickLog() {
                    if (logIsPicked()) {
                        clearConsole();
                        listenToSocket();
                    }
                }

                function logIsPicked() {
                    return $scope.logModel.pickedLog !== undefined &&
                        $scope.logModel.pickedLog !== null
                }

                function clearConsole() {
                    var logNode = document.getElementById("log");

                    while (logNode.firstChild)
                        logNode.removeChild(logNode.firstChild);
                }

                function listenToSocket() {
                    tryToCloseSocket(socket);
                    socket = connectToSocket();

                    var img = document.createElement('div');

                    socket.onopen = function open() {
                        socket.send($scope.logModel.pickedLog.logFile)

                        var log = document.getElementById("log");
                        img.innerHTML = "<img src='img/loading.gif' width='20' height='20'>";
                        log.appendChild(img);
                    };

                    socket.onmessage = function (event) {
                        var node = document.createElement('div');
                        node.innerHTML = event.data;
                        log.insertBefore(node, img);
                        scrollToBottom("log");
                    };
                }

                function tryToCloseSocket(socket) {
                    if (socket !== undefined && socket !== null)
                        socket.close();
                }

                function connectToSocket() {
                    return new WebSocket("ws://localhost:10000/myHandler");
                }

                function scrollToBottom(id) {
                    var div = document.getElementById(id);
                    div.scrollTop = div.scrollHeight;
                }

                init();
            }
        };
    });