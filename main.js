// Configuration of file input
$("#awardPhoto").fileinput({
  'uploadUrl': "/file-upload-batch/2",
  'allowedFileExtensions': ["jpg", "png"],
  'showUpload':false,
  'showRemove':false,
  'previewFileType':'any',
  'maxImageWidth': 400,
  'maxImageHeight': 250,
  'maxFileCount': 1,
  'autoReplace': true,
});

var UploadFrenzy = angular.module('UploadFrenzy',[]);

UploadFrenzy.controller('basicsCtrl',function($scope) {

  // Json to save all Awards of promotion.
  $scope.awardJson = [];
 // This scope save the row id to can edit the information of award.
  $scope.rowIdEdit = 0;


  // Delete upload in preview image and select correct format to upload image to firebase
  $('#awardPhoto').on('fileloaded', function(event, file, previewId, index, reader) {
    $('.kv-file-upload').remove();
    $scope.image = new Image();
    $scope.image.name = file.name;
    $scope.image.src = reader.result;
  });

  $('#awardPhoto').on('fileerror', function(event, data, msg) {
     console.log(data.id);
     console.log(data.index);
     // get message
     alert(msg);
  });

  // Detect success submit for prodcut form whitout erros.
  $('#productForm').submit(function() {
    if ($('#saveAwardButton').css("display") === 'inline-block') {
      // create a temporal dictionary and save awardata inside.
      var productData = {}
      productData['awardName'] = $("#awardName").val();
      productData['descriptionAward'] = $("#descriptionAward").val();
      productData['awardPoints'] = $("#awardPoints").val();
      productData['awardPhoto'] = $scope.image;

      // push data to awardJson to save with the others  awards.
      $scope.awardJson.push(productData);

      // This scope save the row index to can edit the information
      $scope.image = '';

      //Clear form and file input to save other award we neet reset two time
      //to can reset input file.
      $('#productForm').trigger('reset');

      //Clear form.
      $scope.resetAwardForm();

    } else if ($('#editAwardButton').css("display") === 'inline-block') {
      $scope.awardJson[$scope.rowIdEdit]['awardName'] = $("#awardName").val();
      $scope.awardJson[$scope.rowIdEdit]['descriptionAward'] = $("#descriptionAward").val();
      $scope.awardJson[$scope.rowIdEdit]['awardPoints'] = $("#awardPoints").val();
      $scope.awardJson[$scope.rowIdEdit]['awardPhoto'] = $scope.image;

      // This scope save the row index to can edit the information
      $scope.image = '';

      //Clear form.
      $scope.resetAwardForm();
    }

  });

  //remove to the real data holder.
  $scope.removeAwardItem = function(row) {
      var index = $scope.awardJson.indexOf(row);
      if (index !== -1) {
          $scope.awardJson.splice(index, 1);
      }
  }

  //If i click on restored form i need to show again the save button and hidden the edit button.
  $scope.resetAwardForm = function() {
    $('#saveAwardButton').css('display','');
    $('#editAwardButton').css('display','none');


    $('#productForm').trigger('reset');

    //This line its necesary to delete image from file input if i click on edit row.
    $('#awardPhoto').fileinput('refresh', {'initialPreview': '','initialPreviewConfig': ''});
  }

  //editAwardItem to the real data holder
  $scope.editAwardItem = function(row) {
    $scope.rowIdEdit = $scope.awardJson.indexOf(row);

    //Clear form and file input to save other award we neet reset two time
    //to can reset input file.
    $('#productForm').trigger('reset');

    //This line its necesary to delete image from file input if i click on edit row.
    $('#awardPhoto').fileinput('refresh', {'initialPreview': '','initialPreviewConfig': ''});

    //If i click on edit row i need to show again the edit button and hidden the save button.
    $('#saveAwardButton').css('display','none');
    $('#editAwardButton').css('display','');

    // Send information to inputs form.
    $("#awardName").val(row.awardName);
    $("#descriptionAward").val(row.descriptionAward);
    $("#awardPoints").val(row.awardPoints);
    $('#awardPhoto').fileinput('refresh', {
      'initialPreview': [
        "<img style='height:160px' src='" + row.awardPhoto.src + "'>"
      ],
      'initialPreviewConfig': [
        {caption: row.awardPhoto.name, url: row.awardPhoto.src, key: 1}
      ]
    });

    $scope.image = new Image();
    $scope.image.name = row.awardPhoto.name;
    $scope.image.src = row.awardPhoto.src;
  }
});
