/****FIREBASE***/
var app = {
  apiKey: "AIzaSyCCkqPKuZh8QtKM_tU2nFDAcjjzufcVX6c",
  authDomain: "frenzyapplication.firebaseapp.com",
  databaseURL: "https://frenzyapplication.firebaseio.com",
  storageBucket: "frenzyapplication.appspot.com",
};

var dashboard = {
  apiKey: "AIzaSyDIbQh6IA6D9HHhfogQUZP63omtjwzAiBA",
    authDomain: "frenzydashboard.firebaseapp.com",
    databaseURL: "https://frenzydashboard.firebaseio.com",
    storageBucket: "frenzydashboard.appspot.com",
};
var FrenzyApp =  firebase.initializeApp(app);
var FrenzyDashboard = firebase.initializeApp(dashboard, "Secondary");

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
var CustomerList = [];
var count = 0;
// UploadFrenzy.controller('CustomerCtrl',function($scope) {
//
//
//
//   // secondaryApp.database().ref('Customer').once('value', function(snapshot) {
//   //      for (x in snapshot.val()) {
//   //        CustomerList[count] = snapshot.val()[x]
//   //        CustomerList[count]["ID"] = x;
//   //        count++
//   //      }
//   //        count = 0
//   //       // console.log(CustomerList);
//   // }).then(function() {
//   //   $scope.CustomerList = CustomerList;
//   //   console.log($scope.CustomerList);
//   // })
//
// })
/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////
var IDpromocion = "KSADHAS788893"
var  ListCodigos = ["APAKNPOEF56Q"];
//AcumulacionPuntos("-KNieHFLFtM-CWKetTz7",ListCodigos)
function AcumulacionPuntos(Idcustomers,ListCodigos,crosspromAP,awardJson,newPostKey) {
  var DicAcumulacionPuntos = {};
  DicAcumulacionPuntos[newPostKey] = {
    CodigoVerificacion:ListCodigos,
    DescripcionPromocion:awardJson[0].descriptionAward,
    FechaPublicacion:crosspromAP.publicationDate,
    FechaVencimiento:crosspromAP.endDate,
    PoliticasCanjeo:crosspromAP.exchangePolicy,
    PuntosMaximos:crosspromAP.maxPoints,
    Status:crosspromAP.status,
    TerminosLegales:crosspromAP.termsAndConditions,
  }
  firebase.database().ref('CrossPromotion/AcumulacionPuntos/'+Idcustomers).set(DicAcumulacionPuntos);
}



//////////////////////////////////////////////////////////////////////////////////////
function AcumulacionPuntosPremios(Idcustomers,newPostKey,awardJson) {
  firebase.database().ref('CrossPromotion/AcumulacionPuntos/'+Idcustomers+"/"+newPostKey).once('value', function(snapshot) {
   console.log(snapshot.val());
  });
  for (a in awardJson) {
    var premio = {};
    premio["DescripcionPremio"]=awardJson[a].descriptionAward;
    premio["Nombre"]=awardJson[a].awardName;
    premio["Puntos"]=awardJson[a].awardPoints;
    console.log(premio);
    firebase.database().ref('CrossPromotion/AcumulacionPuntos/'+Idcustomers+"/"+newPostKey+"/Premio").push(premio);
  }
  // firebase.database().ref('CrossPromotion/AcumulacionPuntos/'+Idcustomers+"/"+newPostKey).set({
  //   CodigoVerificacion:ListCodigos,
  //   DescripcionPromocion:awardJson[0].descriptionAward,
  //   FechaPublicacion:crosspromAP.publicationDate,
  //   FechaVencimiento:crosspromAP.endDate,
  //   PoliticasCanjeo:crosspromAP.exchangePolicy,
  //   PuntosMaximos:crosspromAP.maxPoints,
  //   Status:crosspromAP.status,
  //   TerminosLegales:crosspromAP.termsAndConditions,
  //  });
}
var idCodigo = "ASDAS6635"
//codigos(Idcustomers,idCodigo,idpromocion)
function codigos(Idcustomers,idCodigo,idpromocion) {
  firebase.database().ref('CrossPromotion/Codigos/AcumulacionPuntos/'+Idcustomers+'/'+idpromocion+'/'+idCodigo).push({
    FechaHoraCanjeo:"",
    Status:true,
    ValorCodigo:"",
    IdUsuario:""
   });

}
function UserPremios(idUsuario) {
  firebase.database().ref('CrossPromotion/UserPremios/'+idUsuario+'/Premios').push({
    CodigoCanjeoRedimido:{},
    cupon:"",
    FechaHoraCanjeo:"",
    FechaVencimiento:"",
    Status:true,

   });
}

/////////////////////////////////////////////////////////////////////////////
UploadFrenzy.controller('awardTableCtrl',function($scope) {
  var Customers = [];

  $scope.SavecrosspromAP = function(crosspromAP) {
    var newPostKey = "HO";
    //alert("asdas")
    var IdCus;
    console.log(crosspromAP);
console.log(Customers);

      for (c in Customers) {
        //console.log(Customers[c].Customer);
        if (crosspromAP.customer ==Customers[c].Customer) {
          console.log("se encontro");
          console.log(crosspromAP.customer);
          console.log(Customers[c].Customer);
          AcumulacionPuntos(Customers[c].ID,ListCodigos,crosspromAP,$scope.awardJson,newPostKey)
          IdCus = Customers[c].ID;
        }
      }
      AcumulacionPuntosPremios(IdCus,newPostKey,$scope.awardJson)

    console.log($scope.awardJson);

  }

  ////
  FrenzyDashboard.database().ref('Customer').once('value', function(customerData) {
    var dictionary = [];
    var counter = 0;
    Customers = {};
    for (var i in customerData.val()) {
      dictionary[counter]=customerData.val()[i]["Name"];
      Customers[counter] = {"ID":i,"Customer": customerData.val()[i]["Name"]}

      counter++;
    }

    $scope.CustomerArray = dictionary;
    $scope.CustomerArray.sort();
  }).then(function() {

    var CostumerSelect = document.getElementById("NameCustomer");
    for (var i in $scope.CustomerArray) {
      var option = document.createElement("option");
      option.text = $scope.CustomerArray[i];
      CostumerSelect.add(option);
    }
  })

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
  $('#awardForm').submit(function() {
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
      $('#awardForm').trigger('reset');

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


    $('#awardForm').trigger('reset');

    //This line its necesary to delete image from file input if i click on edit row.
    $('#awardPhoto').fileinput('refresh', {'initialPreview': '','initialPreviewConfig': ''});
  }

  //editAwardItem to the real data holder
  $scope.editAwardItem = function(row) {
    $scope.rowIdEdit = $scope.awardJson.indexOf(row);

    //Clear form and file input to save other award we neet reset two time
    //to can reset input file.
    $('#awardForm').trigger('reset');

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
})

UploadFrenzy.controller('couponTableCtrl',function($scope) {
  /* Its necesary assign value 0 because the table need calculate values,
  the values above is to ng-model assign to coupon table*/
  $scope.quantityCoupon = {}
  $scope.quantityCoupon['five'] = 0;
  $scope.quantityCoupon['ten'] = 0;
  $scope.quantityCoupon['twentyFive'] = 0;
  $scope.quantityCoupon['fifty'] = 0;
  $scope.quantityCoupon['oneHundred'] = 0;

  /* ###### Eliminarlo al unirlo con el form completo de cross promotion */
  $scope.crosspromAP = {}
  $scope.crosspromAP['maxPoints'] = 10000;

  // Count the total of codes used for the customer.
  $scope.getTotalCoupon = function(){
    var total = 0;
    for(var i in $scope.quantityCoupon){
        total += $scope.quantityCoupon[i];
    }

    // Verify  total of used coupons.
    if (total <   $scope.crosspromAP.maxPoints || total >   $scope.crosspromAP.maxPoints) {
      $('#panelCoupon').addClass('panel-danger').removeClass('panel-success');
    } else {
      $('#panelCoupon').addClass('panel-success').removeClass('panel-danger');
    }

    return total;
  }
})
