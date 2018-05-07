"use strict";
var IdMentor, IdGroup, NameMentor, uID, IdAsist=1, TotalAsist, i, PosSegConv;
/*BORRAR OJO ->  IdGroup=100;*/
/*BORRAR OJO ->  NameMentor='Boris Miranda';*/
var archivoValidacion = "http://localhost/unCracked/process.php?jsoncallback=?";
function onBodyLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady(){
	uID = device.uuid;
}
//Inicio de Sesion
$(document).on("click","#btnLogin",function(){
	if($("#txtUserName").val()=='' || $("#txtUserPass").val()=='')
	{
		$(".msgPopUp1").text("Error, Todos los datos son necesarios");
		$("#popupLoginMsg").popup( "open" );
	}
	else
	{
		$.mobile.loading( "show", {
			text: "Cargando...",
			textVisible: true
		});
		var user=$("#txtUserName").val();
		var pass=$("#txtUserPass").val();
		var LoginPrc='set';
		$.getJSON( archivoValidacion, { LoginPrc:LoginPrc,user:user,pass:pass})
		.done(function(D) {
			$.mobile.loading( "hide" );
			if(D.Rta=='ErrLogin')
			{
				$(".msgPopUp1").text("Error, Usuario o Contraseña Errados");
				$("#popupLoginMsg").popup( "open" );
			}
			if(D.Rta=='ErrSrchUser')
			{
				$(".msgPopUp1").text("Error al buscar Usuario en Tabla, Comuniquese con un Administrador");
				$("#popupLoginMsg").popup( "open" );
			}
			if(D.Rta=='ErrSrchUser')
			{
				$(".msgPopUp1").text("Error al buscar Usuario en Tabla, Comuniquese con un Administrador");
				$("#popupLoginMsg").popup( "open" );
			}
			if(D.Rta=='loginOK')
			{
				if(D.type==2)
				{
					var url="consol.html?"+D.id;
				}
				window.location = url;
			}
		});
	}
});

//Creacion de Convertido Consolidacion
$(document).on("click","#btnAddConvertidoConsol",function(){
	var nombre=$("#txtNombreCnv").val();
	var telefono=$("#txtTelCnv").val();
	var direccion=$("#txtDirCnv").val();
	var barrio=$("#txtBarrioCnv").val();
	var cumple=$("#txtNacCnv").val();
	if(nombre=="" || direccion=="" || barrio=="" || cumple=="" || telefono=="")
	{
		$("#popupConsoMsg1 .msg-urgene").text( "Todos los Datos son Necesarios" );
		$("#popupConsoMsg1 .msg-info").html("");
		$("#popupConsoMsg1").popup( "open" );
	}
	else
	{
		var CrearConvetido='OK';
		$.getJSON( archivoValidacion, { CrearConvetido:CrearConvetido,nombre:nombre,direccion:direccion,barrio:barrio,telefono:telefono,cumple:cumple})
		.done(function(D) {
			if(D.Rta=='SI')
			{
				$("#popupConsoMsg1 .msg-info").html("");
				$("#popupConsoMsg1 .msg-urgene").text("");
				$("#popupConsoMsg1 .msg-info").html(D.Det);
				$("#popupConsoMsg1").popup( "open" );
				$("#txtNombreCnv").val('');
				$("#txtTelCnv").val('');
				$("#txtDirCnv").val('');
				$("#txtBarrioCnv").val('');
				$("#txtNacCnv").val('');
			}
			else
			{
				$("#popupConsoMsg1 .msg-urgene").text("Error al Procesar Datos");
				$("#popupConsoMsg1 .msg-info").html("");
				$("#popupConsoMsg1").popup( "open" );
			}
		});	
	}
});

//Cargar los Seguimientos de Convertidos 
$(document).on("click","#menuseguimientoConsol",function(){
	$.mobile.loading( "show", {
		text: "Cargando...",
		textVisible: true
	});
	var ChargeListSeguimiento='OK';
	$.getJSON( archivoValidacion, { ChargeListSeguimiento:ChargeListSeguimiento })
	.done(function(D) {
		$("#tblListadoSeguimientos tbody").html('');
		$("#tblListadoSeguimientos tbody").append(D.tbody);
	});
	$.mobile.loading( "hide" );
	$.mobile.changePage("#seguimiento-consol");
});

//Cargar los datos de un Convertido Para Seguimiento
$(document).on("click",".ItemListadoSeg",function(){
	$.mobile.loading( "show", {
		text: "Cargando...",
		textVisible: true
	});
	PosSegConv=$(this).attr('data-id');
	var Dt=$("#Data-"+PosSegConv).val().split("|");

	$("#NameAsist").val(Dt[6]);
	var CallTel="tel:"+Dt[1];
	$(".AccessToCall").attr("href", CallTel);
	$("#TelAsist").val(Dt[1]);
	$("#DirAsist").val(Dt[2]);
	$("#BarrioAsist").val(Dt[3]);
	$("#AgeAsist").val(Dt[5]);
	$("#NacAsist").val(Dt[4]);
	$("#txtIdCnv").attr('data-id',PosSegConv);
	$("#txtIdCnv").attr('data-id-bd',Dt[0]);

	$.mobile.loading( "hide" );
	$.mobile.changePage("#dlgDatosAsistente");
});

//Carga del convertido anterior
$(document).on("click","#at-cnv",function(){
	if(PosSegConv>1)
	{
		PosSegConv--;
		var Dt=$("#Data-"+PosSegConv).val().split("|");

		$("#NameAsist").val(Dt[6]);
		var CallTel="tel:"+Dt[1];
		$(".AccessToCall").attr("href", CallTel);
		$("#TelAsist").val(Dt[1]);
		$("#DirAsist").val(Dt[2]);
		$("#BarrioAsist").val(Dt[3]);
		$("#AgeAsist").val(Dt[5]);
		$("#NacAsist").val(Dt[4]);
		$("#txtIdCnv").attr('data-id',PosSegConv);
		$("#txtIdCnv").attr('data-id-bd',Dt[0]);
	}
});

//Carga del convertido siguiente
$(document).on("click","#ad-cnv",function(){
	var CntMax=$(".ItemListadoSeg").length;
	if(PosSegConv<CntMax)
	{
		PosSegConv++;
		var Dt=$("#Data-"+PosSegConv).val().split("|");

		$("#NameAsist").val(Dt[6]);
		var CallTel="tel:"+Dt[1];
		$(".AccessToCall").attr("href", CallTel);
		$("#TelAsist").val(Dt[1]);
		$("#DirAsist").val(Dt[2]);
		$("#BarrioAsist").val(Dt[3]);
		$("#AgeAsist").val(Dt[5]);
		$("#NacAsist").val(Dt[4]);
		$("#txtIdCnv").attr('data-id',PosSegConv);
		$("#txtIdCnv").attr('data-id-bd',Dt[0]);
	}
});

//Agregar el detalle del seguimiento
$(document).on("click","#btnAddSegConsol",function(){
	var idBd=$("#txtIdCnv").attr('data-id-bd');
	var id=$("#txtIdCnv").attr('data-id');
	var txtDetalleSeg=$("#txtDetalleSeg").val();
	alert($("#SegAlert").val());
});