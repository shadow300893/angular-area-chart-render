var app = angular.module('dataVisualizationWebApp');

app.controller('HomeController', function ($scope, $http) {
 
    var filesUrl = "server/files.php";

    //Get all uploaded files
    $http.get(filesUrl)
        .success(function(data) {
            $scope.files = data;
        })
        .error(function(data) {
            // log error
        });
});

app.controller('UploadController', function ($scope, $http) {
 
    //Method to upload file
    $scope.uploadFile = function () {
        var file = $scope.myFile;
        var uploadUrl = "server/api.php"; //Url of webservice/api/server
        var fileFormData = new FormData();
            fileFormData.append('file', file, file.name);

            $http.post(uploadUrl, fileFormData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
 
            }).success(function (response) {
                $scope.serverResponse = response;
                setTimeout(function(){
                    window.location.reload(1);  //reload page after 1 second
                }, 1000);
 
            }).error(function (response) {
                $scope.serverResponse = response;
                setTimeout(function(){
                    window.location.reload(1);
                }, 1000);
            });
    };
});

app.controller('ChartController', function($scope, $routeParams) {
    
    fileName = $routeParams.name;   //param from url
    fileUrl  = "server/datapoints.php?file="+fileName;

    var datapoints = [];
    var name;

    $scope.chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
    title:{
        text: "Area plot for all samples in group 1"
    },
    axisY :{
        title: "Intensity",
        valueFormatString: "#.#e+0",
    },
    axisX: {
        title: "Retention Time (in minutes)",
    },
    toolTip: {
        shared: true
    },
    data: [
    {        
        type: "stackedArea",
        showInLegend: true,
        color: 'red',
        fillOpacity: 0.3,
        toolTipContent: "<span style=\"color:red\"><strong>{name}: </strong></span> {y}",
        name: name,
        markerType: "circle",
        fillOpacity: 0,
        dataPoints: datapoints
    },
    {        
        type: "stackedArea",
        showInLegend: true,
        color: 'green',
        fillOpacity: 0.3,
        toolTipContent: "<span style=\"color:green\"><strong>{name}: </strong></span> {y}",
        name: name,
        markerType: "circle",
        fillOpacity: 0,
        dataPoints: datapoints
    },
    {        
        type: "stackedArea",
        showInLegend: true,
        color: 'blue',
        fillOpacity: 0.3,
        toolTipContent: "<span style=\"color:blue\"><strong>{name}: </strong></span> {y}",
        name: name,
        markerType: "circle",
        fillOpacity: 0,
        dataPoints: datapoints
    }
    ]
    });

    //Request to fetch data from api
    $.getJSON(fileUrl, function(data) {
        var i = 0;
        $.each(data, function(key, value){
            datapoints = [];
            $.each(value['data'], function(key1, value1){   //iterate through data
                datapoints.push({x: value1[0], y: parseInt(value1[1])});
            });
            $scope.chart.options.data[i].dataPoints = datapoints;   //assign data as required by chart
            $scope.chart.options.data[i].name = value['name'];      //assign sample name
            i++;
        });

        $scope.chart.render(); //render the chart for the first time
    });
});