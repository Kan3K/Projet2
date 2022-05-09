// Projet1.js
// Par Ronald Jean-Julien et VotreNom
// Date de remise: 
// Librairie pour projet1.htm

/*
|----------------------------------------------------------------------------------|
| (GLOBAL; AJAX) Déclaration des variables de travail globales
|----------------------------------------------------------------------------------|
*/
/* Détection automatique du dossier où est entreposé l'application serveur */
var strNomApplication = 'http://424w.cgodin.qc.ca/rjean-julien/Kit_Ajax_projet/gestion-bd-projet1.php';
var succQty=0;

/*
|--------------------------------------------------------------------------------------------------------------|
| initialiseInterface
|--------------------------------------------------------------------------------------------------------------|
*/
function initialiseInterface(binIdentificationPresente, binOperationsSuccursalesPresente, divSuccursalesPresente) {
   masqueB('divIdentification', !binIdentificationPresente);
   masqueB('divOperationsSuccursales', !binOperationsSuccursalesPresente);
   masqueB('divSuccursales', !divSuccursalesPresente);
}

/*
|--------------------------------------------------------------------------------------------------------------|
| initialiseIdentifiant
|--------------------------------------------------------------------------------------------------------------|
*/
function initialiseIdentifiant() {
  let userID = recupereCookie("UserCookie");
  let paswdID = recupereCookie("PaswCookie");
  if (userID != null) {b('tbMatricule', userID);
  document.getElementById('tbMotDePasse').type = 'password';
  b('tbMotDePasse', paswdID);
  masqueB('btnSouvenir', 'hidden');
}
  else {
    masqueB('btnNonSouvenir', 'hidden');
  }

  // A programmer
}


/*
|--------------------------------------------------------------------------------------------------------------|
| enregistreIdentifiant
|--------------------------------------------------------------------------------------------------------------|
*/
function enregistreIdentifiant() {
    enregistreCookie("UserCookie", b('tbMatricule'), 1)
    enregistreCookie("PaswCookie", b('tbMotDePasse'), 1)
    // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| detruitIdentifiant
|--------------------------------------------------------------------------------------------------------------|
*/
function detruitIdentifiant() {
//destruction des cookies par durée négative  
enregistreCookie("UserCookie", " ", -1)
enregistreCookie("PaswCookie", " ", -1)
    // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| deconnexion
|--------------------------------------------------------------------------------------------------------------|
*/
function deconnexion() {
  //recharge la page
  window.location.reload(true);
    // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| effacerAjoutModification
|--------------------------------------------------------------------------------------------------------------|
*/
function effacerAjoutModification() {
  b('tbBudgetAjout', '');
  b('tbVilleAjout', '');
  b('lblMessageAjout', '');
    // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| effacerRetrait
|--------------------------------------------------------------------------------------------------------------|
*/
function effacerRetrait() {
  b('tbVilleRetrait', '');
  b('lblMessageRetrait', '');
    // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| effacerBudgetVisualisation
|--------------------------------------------------------------------------------------------------------------|
*/
function effacerBudgetVisualisation() {
  b('tbVilleBudgetVisualisation','');
  b('lblMessageBudgetVisualisation','');
  b('lblBudgetVisualisation', '');
    // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_compteSuccursales
|--------------------------------------------------------------------------------------------------------------|
*/
function ajax_compteSuccursales() {
    /*
    |-----------------------------------------------------------------------------------------------------------|
    | recupereReponseServeur
    |-----------------------------------------------------------------------------------------------------------|
    */
    function recupereReponseServeur(strVerdict) {
      var tabReponseServeur = strVerdict.split(';')
      let x=tabReponseServeur[0];
      succQty=x;
      b('lblSuccursales', "Nombre de succursale(s) :"+x)
      if (x<1){
      masqueB('btnReinitialiser', true);
      masqueB('tabRetrait', true);
      masqueB('tabVisualisation', true);
              }
      else {
        masqueB('btnReinitialiser', false);
        masqueB('tabRetrait', false);
        masqueB('tabVisualisation', false);
      }
      
        // A programmer
    }

    /*
    |-----------------------------------------------------------------------------------------------------------|
    | Module directeur (ajax_compteSuccursales)
    |-----------------------------------------------------------------------------------------------------------|
    */
    strDossierServeur = 'http://424w.cgodin.qc.ca/m-airouche/Kit_Ajax_projet/';
    strNomApplication = strDossierServeur + 'gestion-bd-projet1.php'
    strDonneesTransmises = 'Action=Succursale-Compte&Aut=' + b('tbMatricule')+b('tbMotDePasse').substr(b('tbMotDePasse').length-5)
    //strDonneesTransmises = 'Action=Succursale-Compte&Aut=' + b('tbMatricule')+b('tbMotDePasse')

    
    /* Pour la trace */
    b('lblRequete', strNomApplication + '?' + strDonneesTransmises)

    /* Envoi de la requête */
    requeteServeur(strNomApplication, strDonneesTransmises, recupereReponseServeur, true)
    /* Aucune instruction ne devrait apparaître ici !!! */
    // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_afficheListeSuccursales
|--------------------------------------------------------------------------------------------------------------|
*/
function ajax_afficheListeSuccursales() {
  //alert("Succursale on")
    /*
    |-----------------------------------------------------------------------------------------------------------|
    | recupereReponseServeur
    |-----------------------------------------------------------------------------------------------------------|
    */
    function recupereReponseServeur(strVerdict) {
      //1er séparatoin par point-virgule
      var tabReponseServeur = strVerdict.split(';')
      if (tabReponseServeur[0] == "AUCUNE"){

        b('lblSuccursales', "Aucune succursale enregistrée...")
      }
      else {
        let itera=0;

        let enTete=document.createElement('table');
        enTete.setAttribute('class','sTabelausuccursales');
        enTete.innerHTML = `        
        <tr class="sEnteteTableauSuccursales">
            <th class="sCelNoSuccursale">No</th>
            <th class="sCelVille">Ville</th>
            <th class="sCelBudget">Budget</th>
        </tr>
        `;
        document.getElementById("lblSuccursales").appendChild(enTete);

        const arr = tabReponseServeur;
        //2ieme séparations par virgules
        let y1=arr[0].split(",");       
        for (let i=0;i<succQty;i++){
          let x1=tabReponseServeur[i].split(",");
          let infoTab=document.createElement("tr");
          infoTab.setAttribute('class','sCorpsTableauSuccursales');
          infoTab.innerHTML=`
          <td class="sCelNoSuccursale">${i+1}</td>
          <td class="sCelVille">${x1[0]}</td>
          <td class="sCelBudget">${x1[1]} $</td>
          `;
          enTete.appendChild(infoTab);
        }

      }      

        // A programmer
    }
    
    /*
    |-----------------------------------------------------------------------------------------------------------|
    | Module directeur (ajax_afficheListeSuccursales)
    |-----------------------------------------------------------------------------------------------------------|
    */
    strDossierServeur = 'http://424w.cgodin.qc.ca/m-airouche/Kit_Ajax_projet/';
    strNomApplication = strDossierServeur + 'gestion-bd-projet1.php'
    strDonneesTransmises = 'Action=Succursale-Liste&Aut=' + b('tbMatricule')+b('tbMotDePasse').substr(b('tbMotDePasse').length-5)

        /* Pour la trace */
    b('lblRequete', strNomApplication + '?' + strDonneesTransmises)

    /* Envoi de la requête */
    requeteServeur(strNomApplication, strDonneesTransmises, recupereReponseServeur, true)
    /* Aucune instruction ne devrait apparaître ici !!! */


    // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_tenteConnexion
|--------------------------------------------------------------------------------------------------------------|
*/
function ajax_tenteConnexion() {
    let user=estDansUnFormatValide(b('tbMatricule'),'#######');
    let pasw=estDansUnFormatValideb(b('tbMotDePasse'),'@#####');
    if (user ==false && pasw==false){b('lblMessageConnexion', 'Identifiant et mot de passse invalides !');return false;}
    else if (pasw==false){b('lblMessageConnexion', 'Mot de passse invalides !');return false;}
    else if (user ==false){b('lblMessageConnexion', 'Identifiant invalides !');return false;}

     /*
    |-----------------------------------------------------------------------------------------------------------|
    | recupereReponseServeur
    |-----------------------------------------------------------------------------------------------------------|
    */
    function recupereReponseServeur(strVerdict) {
       /* Pour la trace */
       b('lblReponse', strVerdict)

       /* Extraction des données reçues */
       var tabReponseServeur = strVerdict.split(';')

              /* Affichage du verdict */
              switch (tabReponseServeur[0]) {
                case 'OK':
                    initialiseInterface(false,true,true,)
                    masqueB('divIdentification', 'hidden');
                    b('lblNomComplet', tabReponseServeur[1]+" "+tabReponseServeur[2]);
                    ajax_compteSuccursales();                  

                   break;
                case 'PASOK' :
                   b('lblMessageConnexion', 'Utilisateur inconnu !')
                   break;
             }

        // A programmer
    }

    /*
    |-----------------------------------------------------------------------------------------------------------|
    | Module directeur (ajax_tenteConnexion)
    |-----------------------------------------------------------------------------------------------------------|
    */
    strDossierServeur = 'http://424w.cgodin.qc.ca/m-airouche/Kit_Ajax_projet/';
    //alert (strDossierServeur);
    strNomApplication = strDossierServeur + 'gestion-bd-projet1.php'
    strDonneesTransmises = 'Action=Connexion&Mat=' + b('tbMatricule')+"&MDP="+b('tbMotDePasse')
    
    /* Pour la trace */
    b('lblRequete', strNomApplication + '?' + strDonneesTransmises)

    /* Envoi de la requête */
    requeteServeur(strNomApplication, strDonneesTransmises, recupereReponseServeur, true)
    /* Aucune instruction ne devrait apparaître ici !!! */

    // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_tenteAjoutModificationSuccursale
|--------------------------------------------------------------------------------------------------------------|
*/

 function ajax_tenteAjoutModificationSuccursale() {
  let villeChk=estVillchk(b('tbVilleAjout'));
  let budgetChk=estBudget37(b('tbBudgetAjout'));
  if (villeChk ==false && budgetChk==false){b('lblMessageAjout', 'Ville et budget invalides !');return false;}
  else if (villeChk==false){b('lblMessageAjout', 'Ville invalide !');return false;}
  else if (budgetChk ==false){b('lblMessageAjout', 'Budget invalide !');return false;}

   /*
   |-----------------------------------------------------------------------------------------------------------|
   | recupereReponseServeur
   |-----------------------------------------------------------------------------------------------------------|
   */
   function recupereReponseServeur(strVerdict) {
    var tabReponseServeur = strVerdict.split(';');
    switch (tabReponseServeur[0]){
        case "PASOK":
          b('lblMessageAjout', 'Succursale existante !');
          break;

        case "OKM":
          b('lblMessageAjout', 'Succursale modifiée !');
          break;

        case "OKI":
          b('lblMessageAjout', 'Succursale ajoutée !');
          ajax_compteSuccursales();
          break;

    }
       // A programmer
    }
   /*
   |-----------------------------------------------------------------------------------------------------------|
   | Module directeur (ajax_tenteAjoutModificationSuccursale)
   |-----------------------------------------------------------------------------------------------------------|
   */
   strDossierServeur = 'http://424w.cgodin.qc.ca/m-airouche/Kit_Ajax_projet/';
   //alert (strDossierServeur);
   strNomApplication = strDossierServeur + 'gestion-bd-projet1.php'
   strDonneesTransmises = 'Action=Succursale-Ajout&Aut=' + b('tbMatricule')+b('tbMotDePasse').substr(b('tbMotDePasse').length-5)+"&Ville="+b('tbVilleAjout')+"&Budget="+b('tbBudgetAjout')
   //alert( strDonneesTransmises);
   /* Pour la trace */
   b('lblRequete', strNomApplication + '?' + strDonneesTransmises)

   /* Envoi de la requête */
   requeteServeur(strNomApplication, strDonneesTransmises, recupereReponseServeur, true)
   /* Aucune instruction ne devrait apparaître ici !!! */
     // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_tenteRetraitSuccursale
|--------------------------------------------------------------------------------------------------------------|
*/
function ajax_tenteRetraitSuccursale() {
  let villeChk=estVillchk(b('tbVilleRetrait'));
  if (villeChk==false){b('lblMessageRetrait', 'Ville invalide !');return false;}


   /*
   |-----------------------------------------------------------------------------------------------------------|
   | recupereReponseServeur
   |-----------------------------------------------------------------------------------------------------------|
   */
    function recupereReponseServeur(strVerdict) {
      var tabReponseServeur = strVerdict.split(';');
      switch (tabReponseServeur[0]){
        case "PASOK":
          b('lblMessageRetrait', 'Succursale inconnue !');
          break;

        case "OK":
          b('lblMessageRetrait', 'Succursale retirée !');
          ajax_compteSuccursales();
          break;

        default:
          alert("Erreur");
          break;
      }
        // A programmer   
    }
   /*
   |-----------------------------------------------------------------------------------------------------------|
   | Module directeur (ajax_tenteRetraitSuccursale)
   |-----------------------------------------------------------------------------------------------------------|
   */
   strDossierServeur = 'http://424w.cgodin.qc.ca/m-airouche/Kit_Ajax_projet/';
   //alert (strDossierServeur);
   strNomApplication = strDossierServeur + 'gestion-bd-projet1.php'
   strDonneesTransmises = 'Action=Succursale-Retrait&Aut=' + b('tbMatricule')+b('tbMotDePasse').substr(b('tbMotDePasse').length-5)+"&Ville="+b('tbVilleRetrait')
   //alert( strDonneesTransmises);
   /* Pour la trace */
   b('lblRequete', strNomApplication + '?' + strDonneesTransmises)

   /* Envoi de la requête */
   requeteServeur(strNomApplication, strDonneesTransmises, recupereReponseServeur, true)
   /* Aucune instruction ne devrait apparaître ici !!! */
        // A programmer
  }


/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_tenteVisualisationBudgetSuccursale
|--------------------------------------------------------------------------------------------------------------|
*/

 function ajax_tenteVisualisationBudgetSuccursale() {
  let villeChk=estVillchk(b('tbVilleBudgetVisualisation'));
  if (villeChk==false){b('lblMessageBudgetVisualisation', 'Ville invalide !');return false;}

   /*
   |-----------------------------------------------------------------------------------------------------------|
   | recupereReponseServeur
   |-----------------------------------------------------------------------------------------------------------|
   */
    function recupereReponseServeur(strVerdict) {
      var tabReponseServeur = strVerdict.split(';');
      switch (tabReponseServeur[0]){
          case "PASOK":
            b('lblMessageBudgetVisualisation', 'Succursale inconnue !');
            b('lblBudgetVisualisation', '');
            break;
  
          default:
            b('lblMessageBudgetVisualisation', 'Budget affiché !');
            b('lblBudgetVisualisation', tabReponseServeur[0]);
            break;
      }

        // A programmer 
    }
   /*
   |-----------------------------------------------------------------------------------------------------------|
   | Module directeur (ajax_tenteVisualisationBudgetSuccursale)
   |-----------------------------------------------------------------------------------------------------------|
   */
   strDossierServeur = 'http://424w.cgodin.qc.ca/m-airouche/Kit_Ajax_projet/';
   //alert (strDossierServeur);
   strNomApplication = strDossierServeur + 'gestion-bd-projet1.php'
   strDonneesTransmises = 'Action=Succursale-Budget&Aut=' + b('tbMatricule')+b('tbMotDePasse').substr(b('tbMotDePasse').length-5)+"&Ville="+b('tbVilleBudgetVisualisation')
   //alert( strDonneesTransmises);
   /* Pour la trace */
   b('lblRequete', strNomApplication + '?' + strDonneesTransmises)

   /* Envoi de la requête */
   requeteServeur(strNomApplication, strDonneesTransmises, recupereReponseServeur, true)
   /* Aucune instruction ne devrait apparaître ici !!! */
        // A programmer
}

/*
|--------------------------------------------------------------------------------------------------------------|
| Module ajax_reinitialiseSuccursales
|--------------------------------------------------------------------------------------------------------------|
*/
function ajax_reinitialiseSuccursales() {
  let text;
  if (confirm("Cliquez sur OK pour confirmer la suppression de toutes les succursales enregistrées") == true) {
    /*
    |-----------------------------------------------------------------------------------------------------------|
    | Module directeur (ajax_reinitialiseSuccursales)
    |-----------------------------------------------------------------------------------------------------------|
    */
    strDossierServeur = 'http://424w.cgodin.qc.ca/m-airouche/Kit_Ajax_projet/';
    strNomApplication = strDossierServeur + 'gestion-bd-projet1.php'
    strDonneesTransmises = 'Action=Succursale-Suppression&Aut=' + b('tbMatricule')+b('tbMotDePasse').substr(b('tbMotDePasse').length-5)
    //alert( strDonneesTransmises);
    /* Pour la trace */
    b('lblRequete', strNomApplication + '?' + strDonneesTransmises)
 
    /* Envoi de la requête */
    requeteServeur(strNomApplication, strDonneesTransmises, recupereReponseServeur, true)
    /* Aucune instruction ne devrait apparaître ici !!! */
    // A programmer

    //text = "You pressed OK!";

        /*
    |-----------------------------------------------------------------------------------------------------------|
    | recupereReponseServeur
    |-----------------------------------------------------------------------------------------------------------|
    */
    function recupereReponseServeur(strVerdict) {
      var tabReponseServeur = strVerdict.split(';');
      switch (tabReponseServeur[0]){
          case "OK":
            //alert("Réponse server ok.. effacement en cours!")
            ajax_compteSuccursales();
            break;
  
          default:
            alert ("Erreur");
            break;

        // A programmer
    }
}    
  } else {
    alert("Reinitialisation Annulée");
  }

}