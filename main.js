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

var IDpromocion = "KSADHAS788893";
var  ListCodigos = ["APAKNPOEF56Q"];
//AcumulacionPuntos("-KNieHFLFtM-CWKetTz7",ListCodigos)
function AcumulacionPuntos(Idcustomers,ListCodigos,crosspromAP,awardJson,newPostKey) {
  var DicAcumulacionPuntos = {};
  DicAcumulacionPuntos["CodigoVerificacion"] = ListCodigos;
  DicAcumulacionPuntos["DescripcionPromocion"] = crosspromAP.promotionDescription;
  DicAcumulacionPuntos["FechaPublicacion"] = crosspromAP.publicationDate;
  DicAcumulacionPuntos["FechaVencimiento"] = crosspromAP.endDate;
  DicAcumulacionPuntos["PoliticasCanjeo"] = crosspromAP.exchangePolicy;
  DicAcumulacionPuntos["PuntosMaximos"] = crosspromAP.maxPoints;
  DicAcumulacionPuntos["Status"] = crosspromAP.status;
  DicAcumulacionPuntos["TerminosLegales"] = crosspromAP.termsAndConditions;

  firebase.database().ref('CrossPromotion/AcumulacionPuntos/'+Idcustomers+"/"+newPostKey).set(DicAcumulacionPuntos);
}

function Images(image,file,awardJson,Idcustomers,newPostKey) {

        var storageRef = FrenzyApp.storage().ref();
        var uploadTask = storageRef.child('imageCrossPromotion/' + image).put(file);
        uploadTask.on('state_changed', function(snapshot){

          // if (snapshot.a != null) {
          //   if(snapshot['a']['name'] === file.name){
          //     var premio = {};
          //     premio["DescripcionPremio"]=awardJson[x].descriptionAward;
          //     premio["Nombre"]=awardJson[x].awardName;
          //     premio["Puntos"]=awardJson[x].awardPoints;
          //     premio["Photo"]= snapshot.a.downloadURLs[0];
          //     firebase.database().ref('CrossPromotion/AcumulacionPuntos/'+Idcustomers+"/"+newPostKey+"/Premio").push(premio);
          //   }
          // }

        }, function(error) {}, function() {

          var premio = {};

          downloadURL = uploadTask.snapshot.downloadURL;

          premio["DescripcionPremio"]=awardJson[x].descriptionAward;
          premio["Nombre"]=awardJson[x].awardName;
          premio["Puntos"]=awardJson[x].awardPoints;
          premio["Photo"]= downloadURL;

          firebase.database().ref('CrossPromotion/AcumulacionPuntos/'+Idcustomers+"/"+newPostKey+"/Premio").push(premio);

        })
}

function AcumulacionPuntosPremios(Idcustomers,newPostKey,awardJson) {

  var file; /* Image type File of Award */
  var image; /* Name of Image Award */
  var downloadURL; /* URL of the Award Image from firebase Storage */

  // awardJson object contain the Promotion with her award
  for (x in awardJson) {

    if(awardJson[x].awardPhoto == undefined || awardJson[x].awardPhoto == null || awardJson[x].awardPhoto == ''){

        var premioSinImagen = {};

        premioSinImagen["DescripcionPremio"]=awardJson[x].descriptionAward;
        premioSinImagen["Nombre"]=awardJson[x].awardName;
        premioSinImagen["Puntos"]=awardJson[x].awardPoints;
        premioSinImagen["Photo"]= "";

        firebase.database().ref('CrossPromotion/AcumulacionPuntos/'+Idcustomers+"/"+newPostKey+"/Premio").push(premioSinImagen);

    } else {

      file = awardJson[x].awardPhoto;
      image = awardJson[x]['awardPhoto']['name'];

      var downloadURL = Images(image,file,awardJson,Idcustomers,newPostKey)
      // var storageRef = FrenzyApp.storage().ref();
      // var uploadTask = storageRef.child('imageCrossPromotion/' + image).put(file);
      // uploadTask.on('state_changed', function(snapshot){}, function(error) {
      // }, function() {
      //   //console.clear();
      //   downloadURL = uploadTask.snapshot.downloadURL;
      //   // premio["DescripcionPremio"]=awardJson[x].descriptionAward;
      //   // premio["Nombre"]=awardJson[x].awardName;
      //   // premio["Puntos"]=awardJson[x].awardPoints;
      //   // premio["Photo"]= downloadURL;
      //   // firebase.database().ref('CrossPromotion/AcumulacionPuntos/'+Idcustomers+"/"+newPostKey+"/Premio").push(premio);
      //
      // })

    }
  }




  // Upload Image to Firebase and to Get Link Image
  // function UploadImage () {
  //
  //   var storageRef = FrenzyApp.storage().ref();
  //
  //   var uploadTask = storageRef.child('imageCrossPromotion/' + image).put(file);
  //   uploadTask.on('state_changed', function(snapshot){}, function(error) {
  //   }, function() {
  //     downloadURL = uploadTask.snapshot.downloadURL;
  //     uploadDataWithImage();
  //   })
  // }

  // firebase.database().ref('CrossPromotion/AcumulacionPuntos/'+Idcustomers+"/"+newPostKey).once('value', function(snapshot) {
  // });
  // for (a in awardJson) {
  //   var premio = {};
  //   premio["DescripcionPremio"]=awardJson[a].descriptionAward;
  //   premio["Nombre"]=awardJson[a].awardName;
  //   premio["Puntos"]=awardJson[a].awardPoints;
  //   firebase.database().ref('CrossPromotion/AcumulacionPuntos/'+Idcustomers+"/"+newPostKey+"/Premio").push(premio);
  // };
}

var idCodigo = "ASDAS6635";
//codigos(Idcustomers,idCodigo,idpromocion)
function codigos(Idcustomers,idCodigo,idpromocion) {
  firebase.database().ref('CrossPromotion/Codigos/AcumulacionPuntos/'+Idcustomers+'/'+idpromocion+'/'+idCodigo).push({
    FechaHoraCanjeo:"",
    Status:true,
    ValorCodigo:"",
    IdUsuario:""
  });
};

function UserPremios(idUsuario) {
  firebase.database().ref('CrossPromotion/UserPremios/'+idUsuario+'/Premios').push({
    CodigoCanjeoRedimido:{},
    cupon:"",
    FechaHoraCanjeo:"",
    FechaVencimiento:"",
    Status:true,

   });
};

/////////////////////////////////////////////////////////////////////////////
UploadFrenzy.controller('crossPromotionAcumCtrl',function($scope) {

  // Global Variables for the Pictures Promotions and Awards
  var file;
  var image;

  $('#AwardPhotoUpdate').bind("change", function(e) {
    var fileUploadControl = $("#AwardPhotoUpdate")[0];
    file = fileUploadControl.files[0];
    var name = file.name; //This does *NOT* need to be a unique name
    image = name
 });

  $scope.rand_code = function(quantity,lengthCode,Idcustomers,ListCodigos,crosspromAP,awardJson){
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var codeList = [];
    for (var i = 0; codeList.length < quantity; i++) {
      var codeChar = ""
      for (x=0; x < lengthCode; x++){
        rand = Math.floor(Math.random()*chars.length);
        codeChar += chars.substr(rand, 1);
      }

      if (!(codeChar in codeList)) {
          codeList.push(codeChar);
      }
    }

    var JsonFile = {};
    JsonFile["Codes"] = codeList;
    firebase.database().ref('CrossPromotion/AcumulacionPuntos/'+Idcustomers).once('value', function(snapshot) {
     if (snapshot.val() == null || snapshot.val() == undefined || snapshot.val() == '') {
      AcumulacionPuntos(Idcustomers,ListCodigos,crosspromAP,awardJson,codeList[0])
    }else {
      for (a in snapshot.val()) {
       if (a == codeList[0]) {
         $scope.rand_code(1,2,"-KNieIpSy3qcKcKao-S2")
       }else {
         AcumulacionPuntos(Idcustomers,ListCodigos,crosspromAP,awardJson,codeList[0])
         return codeList[0]
       }
      }
    }



  }).then(function() {
    AcumulacionPuntosPremios(Idcustomers,codeList[0],awardJson)
  });

    // var data = JSON.stringify(JsonFile) /* Your data in JSON format - see below */;
    // var blob = new Blob([data], {type: "application/json"});
    // var saveAs = window.saveAs;

    // saveAs(blob, "my_outfile.json");
   }
   //var newPostKey = $scope.rand_code(1,2,"-KNieIpSy3qcKcKao-S2")

   /////////////////////////////////////////////////////////////////////////////////////////////////////
  //  var mil = 0;
  //  var NewCustomer;
  //  $scope.rand_codeCustomer = function(quantity,lengthCode){
  //    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  //    var codeList = [];
  //    for (var i = 0; codeList.length < quantity; i++) {
  //      var codeChar = ""
  //      for (x=0; x < lengthCode; x++){
  //        rand = Math.floor(Math.random()*chars.length);
  //        codeChar += chars.substr(rand, 1);
  //      }
  //
  //      if (!(codeChar in codeList)) {
  //          codeList.push(codeChar);
  //      }
  //    }
  //
  //    var JsonFile = {};
  //    JsonFile["Codes"] = codeList;
  //    return codeList;
  //
  //
  //   }
  //   var idCust = [];
  //   var NewCustomerList = {}
  //
  // FrenzyDashboard.database().ref("Customer").once('value', function(snapshot) {
  //
  //      for (a in snapshot.val()) {
  //       idCust[mil] = a
  //       mil++;
  //      }
  //      var newKey =  $scope.rand_codeCustomer(mil,2)
  //      for (i in newKey) {
  //        NewCustomerList[newKey[i]] = snapshot.val()[idCust[i]]
  //       //  for (a in snapshot.val()) {
  //       //    NewCustomerList[newKey[i]] = snapshot.val()[a]
  //       //  }
  //      }
  //
  // }).then(function() {
  //   FrenzyDashboard.database().ref('Customer/').set(NewCustomerList);
  // });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var Customers = [];

  $scope.SavecrosspromAP = function(crosspromAP) {


    //alert("asdas")
    var IdCus;

    for (c in Customers) {
      if (crosspromAP.customer ==Customers[c].Customer) {
        var newPostKey = $scope.rand_code(1,2,Customers[c].ID,ListCodigos,crosspromAP,$scope.awardJson);
        //AcumulacionPuntos(Customers[c].ID,ListCodigos,crosspromAP,$scope.awardJson,newPostKey)
        IdCus = Customers[c].ID;
      }
    };
  //  AcumulacionPuntosPremios(IdCus,newPostKey,$scope.awardJson)
  };

  FrenzyDashboard.database().ref('Customer').once('value', function(customerData) {
    var dictionary = [];
    var counter = 0;
    Customers = {};
    for (var i in customerData.val()) {
      dictionary[counter]=customerData.val()[i]["Name"];
      Customers[counter] = {"ID":i,"Customer": customerData.val()[i]["Name"]}

      counter++;
    };

    $scope.CustomerArray = dictionary;
    $scope.CustomerArray.sort();
  }).then(function() {
    var CostumerSelect = document.getElementById("NameCustomer");
    for (var i in $scope.CustomerArray) {
      var option = document.createElement("option");
      option.text = $scope.CustomerArray[i];
      CostumerSelect.add(option);
    };
  });

  // Json to save all Awards of promotion.
  $scope.awardJson = [];
 // This scope save the row id to can edit the information of award.
  $scope.rowIdEdit = 0;

  // Delete upload in preview image and select correct format to upload image to firebase
  $('#awardPhoto').bind('fileloaded', function(event, file, previewId, index, reader) {

    $('.kv-file-upload').remove();
    $scope.image = file;

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

  //######### Cupon Table #########
  /* Its necesary assign value 0 because the table need calculate values,
  the values above is to ng-model assign to coupon table*/
  $scope.quantityCoupon = {}
  $scope.quantityCoupon['five'] = 0;
  $scope.quantityCoupon['ten'] = 0;
  $scope.quantityCoupon['twentyFive'] = 0;
  $scope.quantityCoupon['fifty'] = 0;
  $scope.quantityCoupon['oneHundred'] = 0;
  $scope.crosspromAP = {}
  $scope.crosspromAP['maxPoints'] = 0;

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
  };
});
