var obj = 1;
var movil = false;
var hallazgo = 1;
var Usuario;
var Fichas;
var Documentos_Path;
var radioSet_IdEmpresa = 1;
$(document).on("ready", arranque);
var Meses = new Array('', 'Enero', 'Frebrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');

function arranque()
{
	$("#obj").on("click", function()
		{

		}
	);

	if(!localStorage.Usuario_SITP)
	{CerrarSesion();}

	CargarUsuario();
	CargarDepartamentos();
	
	
	$("#Inspeccion button").live("click", Inspeccion_Article_Click);
	$('#txtBuscarFicha_FechaIni, #txtBuscarFicha_FechaFin, #txtCrearFicha_FechaIni, #txtCrearFicha_FechaFin, #txtMulta_Fecha').datepicker();
	$('#txtBuscarFicha_FechaIni, #txtBuscarFicha_FechaFin, #txtCrearFicha_FechaIni, #txtCrearFicha_FechaFin, txtMulta_Fecha').on('change', DashBoard_RangeBx_Change);

	$('#lnkLogout').on('click', CerrarSesion);
	$('#SelectedSection').on('click', OcultarMenu);
	$('#lnkInspeccion').on('click', CargarInspecciones);
	$('#lnkMulta').on('click', CargarHallazgos);
	
	//$("#lnkHome").on('click', function(){ Seccion("#DashBoard"); $("#SelectedSection h4").text("Inicio");})
	$(".MainMenu_Item").on('click', 
		function()
		{ 
			var IdSeccion = $(this).attr("id").replace("lnk", "");
			Seccion("#" + IdSeccion); 
			$("#SelectedSection h4").text($("#" + IdSeccion).attr("Texto"));
		});
	
	$("#tableMyUsersRefresh").on("click", CargarUsuariosPropios);
	
	$('#tableMyUsers').dataTable();
	$('.password').pstrength();
	$("#tableMyUsers tr").live('click', CargarInfoUsuario);
	
	$("#txtCreatingUsersCreate_Company").on("change", function(){cboCompanyCreate_Change("CompanyData", "txtCreatingUsersCreate_Company");});
	$("#txtMyUsersEdit_Company").on("change", function(){cboCompanyCreate_Change("CompanyData_Edit", "txtMyUsersEdit_Company");});

	$("#btnMyUsers_KeyChange").on("click", btnMyUsers_KeyChange_Click)

	$("#btnMyAccount_CreatingUsersCreate_Reset").on("click", function(evento){evento.preventDefault();ResetearContenedor("CreatingUsersCreate");})
	
	$("#btnCompanyDataCancel").on("click", btnCompanyDataCancel_click);
	$("#btnCompanyDataCancel_Edit").on("click", btnCompanyDataCancel_click);

	$("#btnCompanyDataCreate").on("click", function(event){btnCompanyDataCreate_click(event, "txtCreatingUsersCreate_CompanyOther", "txtCreatingUsersCreate_Company", "CreatingUsers_Create", "CompanyData", "txtCreatingUsersCreate_Phone");});
	$("#btnCompanyDataCreate_Edit").on("click", function(event){btnCompanyDataCreate_click(event, "txtCreatingUsersEdit_CompanyOther", "txtMyUsersEdit_Company","MyUsersEdit_Message", "CompanyData_Edit", "txtMyUsersEdit_Phone");});
	
	$("#btnMyUsers_Edit").live("click", btnMyUsers_Edit_click);
	$("#btnMyUsersEditConfirmOk").live("click", btnMyUsersEditOk_click);
	$("#btnMyUsers_EditPermissions").live("click", function(){EditarPermisos($(this).attr("idUser"), $(this).attr("UserName"))});
	$("#MyUsersEdit_Permissions_Rol").on('change', CambiarRol);
	
	$("#btnMyUsersEditOk").live("click", btnMyUsersEditOk_click);
	$("#btnMyUsers_LoginAsAUser").live("click", btnMyUsers_LoginAsAUser_click);
	$("#btnMyAccount_Options_Permissions_Delete").live("click", btnMyAccount_Options_Permissions_Delete_click);
	
	$("#lnkCreatingUsers").on('click', function()
		{
			$("#MyAccount_Options_CreatingUsers").dialog(
			{
				autoOpen: false, 				
				minWidth: 620,
				title : 'Crear Usuario'
			});
			$("#MyAccount_Options_CreatingUsers").dialog('open');
			CargarDepartamentos();

			$("#txtCreatingUsersCreate_User").focus();
		});
	$("#CreatingUsersCreate").live("submit", CreatingUsersCreate_submit);

	$("#lnkBuscarFicha").on('click', function(){ Seccion("#BuscarFicha"); $("#SelectedSection h4").text("Buscar Ficha");});
	$("#lnkBuscarContrato").on('click', function(){ Seccion("#BuscarContrato"); $("#SelectedSection h4").text("Buscar Contrato");});
	$("#lnkCrearContrato").on('click', function(){ Seccion("#CrearContrato"); $("#SelectedSection h4").text("Crear Contrato");});
	$("#lnkCrearFicha").on('click', function(){ Seccion("#CrearFicha"); $("#SelectedSection h4").text("Crear Ficha"); CargarContratosCBO("txtCrearFicha_Contrato");});

	
	CargarEmpresas();

	$("#radioset_Empresas input").live("click", radioset_Empresas_Click);
	$("#radioset_Multa_Empresas input").live("click", radioset_Multa_Empresas_Click);

	$("#txtInspeccionVehiculo_NInterno").on("focus", txtDatosDeVehiculo_Change);
	$("#txtInspeccionVehiculo_Placa").on("focus", txtDatosDeVehiculo_Change);

	$("#txtMultaVehiculo_NInterno").on("focus", txtDatosDeVehiculo_Change);
	$("#txtMultaVehiculo_Placa").on("focus", txtDatosDeVehiculo_Change);


	$(".btnIniciarInspeccion").on("click", btnIniciarInspeccion_Click);
	$(".radioButton").buttonset();

	$("#radioset_TipoHallazgo").buttonset();
	$("#btnEvaluarInspeccion").on("click", btnEvaluarInspeccion_Click);

	$("#radioButton_Resultado").button();
	$("#radioset_TipoHallazgo input").on("click", radioset_TipoHallazgo_Click);
	OcultarMenu();
}
function CargarUsuario()
{
	Usuario = JSON.parse(localStorage.Usuario_SITP)[0];
	$("#lblWelcome span").text(Usuario.NickName);
	$("#lblWelcomeRol span").text(Usuario.RolName);
	
	$("#txtMyAccount_Name").val(Usuario.Name);
	$("#txtMyAccount_DisplayName").val(Usuario.NickName);
	$("#txtMyAccount_Email").val(Usuario.Email);
	$("#txtMyAccount_Company").val(Usuario.CompanyName);
		
	$("#tableMyUsers td").remove();
	
	$("#rdsAgrupacion").buttonset();
	CargarPermisos(Usuario.Id);
	CargarUsuariosPropios();
	CargarRoles();

}
function CargarRoles()
{
	$.post('php/CargarRoles.php',
		{Id_Rol : Usuario.IdInitialRol},
		function(data)
		   {
			   $("#MyUsersEdit_Permissions_Rol option").remove();
			   $("#cboCreatingUsersCreate_Rol option").remove();
			   
				$.each(data,function(index,value) 
				{
					if (data[index].RolId)
					{
						var tds = "<option value='" + data[index].RolId + "'>" + data[index].RolName + "</option>";
							  
						$("#MyUsersEdit_Permissions_Rol").append(tds);
						$("#CreatingUsersCreate_Rol").append(tds);
					}
				});
		   }, "json"	
		);
}
function CerrarSesion()
{
	delete localStorage.Usuario_SITP;
	window.location.replace("index.html");
}
function DashBoard_RangeBx_Change()
{
	$(this).val(Date.parse($(this).val()).toString("yyyy-MM-dd"));
}
function DiferenciaDias(FechaInicial, FechaFinal)
{  
    var d1 = FechaInicial.split("-");  
    var dat1 = new Date();  
    dat1.setFullYear(d1[0], parseFloat(d1[1])-1, parseFloat(d1[2]));
   
    var d2 = FechaFinal.split("-");  
    var dat2 = new Date();  
    dat2.setFullYear(d2[0], parseFloat(d2[1])-1, parseFloat(d2[2]));
  
    var fin = dat2.getTime() - dat1.getTime();  
    var dias = Math.floor(fin / (1000 * 60 * 60 * 24))    
    return (dias + 1);  
}  
function sumarDiasFecha(Fecha, NumDias)
{
	obj = Date.parse(Fecha, "yyyy-MM-dd").add(NumDias).days().toString("yyyy-MM-dd");
	return obj;
}
function sumarHorasFecha(Fecha, NumDias)
{
	obj = Date.parse(Fecha, "HH-MM-dd").add(NumDias).hours().toString("HH:mm yyyy-MM-dd");
	return obj;
}
function sumarMesesFecha(Fecha, NumDias)
{
	obj = Date.parse(Fecha, "yyyy-MM-dd").add(NumDias).months().toString("MM");
	return obj;
}


function Seccion(obj)
{
	if (movil)
		{OcultarMenu();}
	$(".Seccion input, .Seccion_SinMenu input").val("");
//	$(".Seccion div, .Seccion_SinMenu div").fadeOut();

	$(".Seccion input").val("");
	$(".Seccion_SinMenu input").val("");
	$(".Seccion").fadeOut();
	$(".Seccion_SinMenu").fadeOut();

	$(obj).fadeIn();
}
function btnCompanyDataCancel_click(evento)
{
	evento.preventDefault();
	$("#CompanyData").slideUp();
	$("#CompanyData_Edit").slideUp();
	$("#txtCreatingUsersCreate_Email").focus();	
	$("#txtCreatingUsersCreate_Company").val(1);
}
function btnCompanyDataCreate_click(evento, NombreCampo, NombreSelect, NombreAlerta, NombreSeccion, NombreCampoSiguiente)
{
	evento.preventDefault();
	$.post("php/CrearDepartamento.php",  
	{
		Name: $("#" + NombreCampo).val(),
		IdOwn: Usuario.Id
	}, 
	function(data)
	{	
		data = parseInt(data);
		if (isNaN(data) || data == 0) 
		{ 
			MostrarAlerta(NombreAlerta, "error", "ui-icon-alert", "Error!", "El Departamento ya existe");
		}
		else
		{ 
			MostrarAlerta(NombreAlerta, "default", "ui-icon-circle-check", "Hey!", "El Departamento fue creado");
			
			$("#" + NombreSelect).append("<option value=" + data + ">" + $("#" + NombreCampo).val() + "</option>");	
				$("#" + NombreSeccion).slideUp();
				$("#" + NombreCampoSiguiente).focus();	
			$("#" + NombreSelect).val(data);
		} 
	});		
}
function btnMyUsers_Edit_click()
{	
	ResetearContenedor("MyUsers_Edit");
	var IdUsuario = $(this).attr("idUser");
	var Nombre = $(this).attr("UserName");
	CargarDepartamentos();
	
	var strObj = "Edit " + $(this).attr('UserName');
		$("#MyUsers_Edit").attr("IdUsuario", IdUsuario);
			$("#txtMyUsersEdit_Name").val(Nombre);
			$("#txtMyUsersEdit_DisplayName").val($(this).attr('DisplayName'));
			$("#txtMyUsersEdit_Email").val($(this).attr('Mail'));
			//$("#txtMyUsersEdit_Company").val($(this).attr('IdCompany'));
			$("#txtMyUsersEdit_State").val($(this).attr("State"));
			$("#txtMyUsersEdit_Phone").val($(this).attr("Phone"));
			
		$("#MyUsers_Edit").dialog({
				autoOpen: false, 				
				title: "Editar " + Nombre,
				minWidth: 600,
				buttons: [
							{
								text: "Actualizar",
								click: function() { btnMyUsersEditOk_click();
												  }
							},
							{
								text: "Cancelar",
								click: function() { $(this).dialog("close"); 
												  }
							}
						  ]
								});
		$("#MyUsers_Edit").dialog('open');
}
function btnMyUsersEditOk_click()
{
	var dialogo = $('<div></div>')
		  .html("¿Está seguro que desea actualizar los datos?")
		  .dialog({
			autoOpen: false,
			buttons: [
						{
							text: "Update",
							click: function() { 
												var IdUsuario = $("#MyUsers_Edit").attr("IdUsuario");
												$.post("php/EditarUsuario.php",
														{
															Id : IdUsuario,
															IdOwn : Usuario.Id,
															Name :  $("#txtMyUsersEdit_Name").val(),
															NickName : $("#txtMyUsersEdit_DisplayName").val(),
															Email : $("#txtMyUsersEdit_Email").val(),
															IdDepartamento: $("#txtMyUsersEdit_Company").val(),
															Phone : $("#txtMyUsersEdit_Phone").val(),
															State : $("#txtMyUsersEdit_State").val()
														},
														function(data)
															{
																if (parseInt(data) >= 0)
																{
																	var IdUsuario = $("#MyUsers_Edit").attr("IdUsuario");
																	dialogo.dialog("close"); 
																	$("#MyUsers_Edit").dialog('close');
																	CargarUsuariosPropios();
																}
															}
													  );
											  }
						},
						{
							text: "Cancel",
							click: function() { $(this).dialog("close"); 
												$("#MyUsers_Edit").dialog('close');
											  }
						}
					  ],
			modal: true, 
			stack: true,
			title: "confirm Update"
		  });
	dialogo.dialog('open');
}
function btnMyUsers_LoginAsAUser_click()
{
	var IdUsuario = $(this).attr("idUser");
	
	localStorage.setItem("UsuarioSimulado", '[' + JSON.stringify(
	{	"Id": IdUsuario,
		"Name": $(this).attr('UserName'),
		"NickName": $(this).attr('DisplayName'),
		"IdCompany": $(this).attr("IdCompany"),
		"CompanyName": 	$(this).attr("IdCompany"),
		"Email": $(this).attr('Mail'),
		"urlFacebook": $(this).attr("urlFacebook"),
		"urlTwitter": $(this).attr("urlTwitter"),
		"IdInitialRol": $(this).attr("IdInitialRol"),
		"RolName": $(this).attr("RolName")
	}
																) + ']');
	
	abrirPopup("UserLogin.html");
}
function CambiarRol()
{
	$("#UserTableFunctions :checkbox").attr('checked', false);

	$.post("php/CargarPermisosRol.php",
			{IdRol : $("#MyUsersEdit_Permissions_Rol").val()},
			function(data)
			{
				$.each(data,function(index,value) 
				{
					$("#chk" + data[index].IdFunction).attr('checked', true);
				});
			}, "json"
		  );
}
function btnMyAccount_Options_Permissions_Delete_click()
{
	var IdPer = $(this).parent("td").attr("name");
	var Fila = document.getElementsByName($(this).parent("td").attr("name"));
	
	var dialogo = $('<div></div>')
		  .html("Are you sure that you wish to delete this Permission?")
		  .dialog({
			autoOpen: false,
			buttons: [
						{
							text: "Delete",
							click: function() { 
												$.post("php/BorrarPermiso.php",
														{	IdPermission : IdPer	},
														function(data)
															{
																if (parseInt(data) > 0)
																{
																	$("#" + $(Fila[2]).text()).slideUp();
																	CargarPermisos(Usuario.Id)
																	dialogo.dialog("close"); 
																}
															}
													  );
											  }
						},
						{
							text: "Cancel",
							click: function() { $(this).dialog("close"); }
						}
					  ],
			modal: true, 
			stack: true,
			title: "Confirm Delete"
		  });
	dialogo.dialog('open');
}
function CargarUsuariosPropios()
{
	$("#tableMyUsers").dataTable().fnClearTable();
		$.post("php/VerUsuariosPropios.php",
		{ Id : Usuario.Id},																																																																																																																					
		function(data)
		{
			$.each(data,function(index,value) 
			{
				if (data[index].IdUser)
				{
					$('#tableMyUsers').dataTable().fnAddData( [
										data[index].UserName + "<information  idUser = '" + data[index].IdUser +  "' State='" + data[index].State + "' IdCompany='" + data[index].IdCompany + "' UserName='" + data[index].Name + "' DisplayName='" + data[index].NickName + "' Mail='" + data[index].Mail + "' Phone='" + data[index].Phone + "' Owner='" + data[index].Owner + "' IdInitialRol='" + data[index].IdInitialRol + "' RolName='" + data[index].RolName + "' CompanyName='" + data[index].Company + "'></information>",
										data[index].Name,
										data[index].State,
										data[index].RolName
										 /*,
										"<button title='Login as User' id='btnMyUsers_LoginAsAUser' class='ui-button-default ui-button ui-widget ui-corner-all'  idUser = '" + data[index].IdUser + "' urlFacebook='" + data[index].urlFacebook + "' urlTwitter='" + data[index].urlTwitter + "' State='" + data[index].State + "' IdCompany='" + data[index].IdCompany + "' UserName='" + data[index].Name + "' DisplayName='" + data[index].NickName + "' Mail='" + data[index].Mail + "' Owner='" + data[index].Owner + "' IdInitialRol='" + data[index].IdInitialRol + "' RolName='" + data[index].RolName + "'><strong><span class='ui-icon ui-icon-play'></span></strong></button>",
										"<button title='Edit' id='btnMyUsers_Edit' class='ui-button-default ui-button ui-widget ui-corner-all' idUser = '" + data[index].IdUser + "' urlFacebook='" + data[index].urlFacebook + "' urlTwitter='" + data[index].urlTwitter + "' State='" + data[index].State + "' IdCompany='" + data[index].IdCompany + "' UserName='" + data[index].Name + "' DisplayName='" + data[index].NickName + "' Mail='" + data[index].Mail + "' Owner='" + data[index].Owner + "' IdInitialRol='" + data[index].IdInitialRol + "'><strong><span class='ui-icon ui-icon-pencil'></span></strong></button>",
										"<button title='Edit Permissions' id='btnMyUsers_EditPermissions' class='ui-button-default ui-button ui-widget ui-corner-all' idUser='" + data[index].IdUser + "'><strong><span class='ui-icon ui-icon-unlocked'></span></strong></button>",
										"<button title='Delete' id='btnMyUsers_Delete' class='ui-button-default ui-button ui-widget ui-corner-all' idUser='" + data[index].IdUser + "'><strong><span class='ui-icon ui-icon-closethick'></span></strong></button>"*/
															  ] 
															);
				}
			});
		}, "json")	;
		
}
function abrirPopup(url)																					
{
	popupWin = window.open(url, 'open_window');
}
function ResetearContenedor(IdContenedor)
{																																										
		  $('#' + IdContenedor).find(':input').each(function() {
			if ($(this).attr('type') != 'submit')
			  {
                $(this).val('');
              }
			});
}
function EditarPermisos(IdUsuario, NombreUsuario)
{
	
$.post("php/VerPermisos.php",
		{ Id : Usuario.Id},
		function(data){
			$("#UserTableFunctions td").remove();
			$.each(data,function(index,value) 
			{
				if (data[index].IdPermission)
				{
					var tds = "<tr id='" + data[index].IdPermission + "'>";
						  tds += "<td name='" + data[index].IdPermission + "'><input name='chkPermissionState' type='checkbox' id='chk" + data[index].IdFunction + "' AssociatedControl='" + data[index].AssociatedControl + "' IdFunction='" + data[index].IdFunction + "'/></td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Name + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Description + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "' IdFunction='" + data[index].IdFunction + "'></td>";
						tds += '</tr>';	
					$("#UserTableFunctions").append(tds);
				}
			});
			$.post("php/VerPermisos.php",
								{ Id : IdUsuario},
								function(data2)
								{
									$.each(data2,function(index2,value2)
									{
										$("#chk" + data2[index2].IdFunction).attr("checked", "checked");
									});
								}, "json");
					},
		"json");
		
		$("#MyUsersEdit_Permissions").dialog({
		autoOpen: false, 
		minWidth: 620,
		title: "Editar Permisos de: " + NombreUsuario,
		buttons: [
			{
				text: "Ok",
				click: function() { 
									var tabla = document.getElementById("UserTableFunctions");
									var numFilas = tabla.rows.length;
									var Controles = "";
									var elementos = tabla.getElementsByTagName("input")
									for (i = 0; i < numFilas; i++)
									{
										if($(elementos[i]).is(':checked'))
										{
											Controles += $(elementos[i]).attr("IdFunction") + "@";
										}
									}
									$.post("php/EditarPermiso.php",
											{Functions: Controles, IdUser: IdUsuario},
											function(data)
											{
													$("#MyUsersEdit_Permissions").dialog("close");
											}
										  );
								  }
			},
			{
				text: "Cancel",
				click: function() { $(this).dialog("close"); 
								  }
			}
				  ]
								});
	$("#MyUsersEdit_Permissions").dialog('open');	
	
}
function CargarPermisos(IdUsuario)
{
	$.post("php/VerPermisos.php",
		{ Id : IdUsuario},
		function(data){
			$("#TableFunctions td").remove();
			$.each(data,function(index,value) 
			{
				if (data[index].IdPermission)
				{
					var tds = "<tr id='" + data[index].IdPermission + "'>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Name + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Description + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].AssociatedControl + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'><button title='Delete' id='btnMyAccount_Options_Permissions_Delete' class='ui-button-default ui-button ui-widget ui-corner-all'><strong><span class='ui-icon ui-icon-closethick'></span></strong></button></td>";
						  tds += "<td name='" + data[index].IdPermission + "' IdFunction='" + data[index].IdFunction + "'></td>";
						tds += '</tr>';	
					$("#TableFunctions").append(tds);
					$("#" + data[index].AssociatedControl).slideDown();
					$("#lnkLogout").slideDown();
				}
			});
					},
		"json");
}
function CreatingUsersCreate_submit(evento)
{
		evento.preventDefault();
		if ($("#txtCreatingUsersCreate_Password").val() == $("#txtCreatingUsersCreate_ReTypePassword").val())
		{
			$.post("php/CrearUsuario.php",  
			{
				Id: Usuario.Id,
				User: $("#txtCreatingUsersCreate_User").val(),
				Password: $("#txtCreatingUsersCreate_Password").val(),
				Name: $("#txtCreatingUsersCreate_Name").val(),
				NickName: $("#txtCreatingUsersCreate_DisplayName").val(),
				Email: $("#txtCreatingUsersCreate_Email").val(),
				Company: $("#txtCreatingUsersCreate_Company").val(),
				Phone: $("#txtCreatingUsersCreate_Phone").val(),
				IdRol: $("#cboCreatingUsersCreate_Rol").val()
			}, 
			function(data)
			{
				var Id = parseInt(data);
				if (isNaN(Id)) //No lo Creó
				{ 
					MostrarAlerta("CreatingUsers_Create", "error", "ui-icon-alert", "Alert!", data);
				}
				else //Si lo Creó
				{ 
					EditarPermisos(Id, $("#txtCreatingUsersCreate_Name").val());
					MostrarAlerta("CreatingUsers_Create", "default", "ui-icon-circle-check", "Hey!", "El Usuario ha sido creado");
					ResetearContenedor("CreatingUsersCreate");
				} 
			});	
		} else
		{
			MostrarAlerta("CreatingUsers_Create", "error", "ui-icon-alert", "Error!", "Las claves deben coincidir");
		}
}
function MostrarAlerta(NombreContenedor, TipoMensaje, Icono, Strong, Mensaje)
{
	/*NombreContenedor : Id del Div que contiene el MessageAlert
	 * TipoMensaje : {highlight, error, default}
	 * Icono : Icono que acompaña el mensaje ver listado en bootstrap
	 * Mensaje del AlertMessage*/
	 
	$("#" + NombreContenedor).removeClass(function() {return $(this).prev().attr('class');});
	$("#" + NombreContenedor + " span").removeClass("*");
	$("#" + NombreContenedor).addClass("ui-state-" + TipoMensaje);
	$("#" + NombreContenedor + " span").addClass(Icono);
	$("#" + NombreContenedor + " strong").text(Strong);
	$("#" + NombreContenedor + " texto").text(Mensaje);
	$("#" + NombreContenedor).fadeIn(300).delay(2600).fadeOut(600);
}
function CargarInfoUsuario()
{
	/*
	* idUser = data[index].IdUser
	* urlFacebook= data[index].urlFacebook
	* urlTwitter= data[index].urlTwitter
	* State= data[index].State
	* IdCompany= data[index].IdCompany
	* UserName= data[index].Name
	* DisplayName= data[index].NickName
	* Mail= data[index].Mail
	* Owner= data[index].Owner
	* IdInitialRol= data[index].IdInitialRol
	* RolName= data[index].RolName
	* CompanyName= data[index].Company
	* */
	$('#MyUsers_Info_NickName span').text($(this).find('information').attr('DisplayName'));
	$('#MyUsers_Info_Mail span').text($(this).find('information').attr('Mail'));
	$('#MyUsers_Info_Owner span').text($(this).find('information').attr('Owner'));
	$('#MyUsers_Info_Company span').text($(this).find('information').attr('CompanyName'));
	$('#MyUsers_Info_Phone span').text($(this).find('information').attr('Phone'));

	$("#btnMyUsers_LoginAsAUser").attr('IdUser', $(this).find('information').attr('IdUser'));
	$("#btnMyUsers_LoginAsAUser").attr('Phone', $(this).find('information').attr('Phone'));
	$("#btnMyUsers_LoginAsAUser").attr('State', $(this).find('information').attr('State'));
	$("#btnMyUsers_LoginAsAUser").attr('IdCompany', $(this).find('information').attr('IdCompany'));
	$("#btnMyUsers_LoginAsAUser").attr('UserName', $(this).find('information').attr('UserName'));
	$("#btnMyUsers_LoginAsAUser").attr('DisplayName', $(this).find('information').attr('DisplayName'));
	$("#btnMyUsers_LoginAsAUser").attr('Mail', $(this).find('information').attr('Mail'));
	$("#btnMyUsers_LoginAsAUser").attr('Owner', $(this).find('information').attr('Owner'));
	$("#btnMyUsers_LoginAsAUser").attr('IdInitialRol', $(this).find('information').attr('IdInitialRol'));
	$("#btnMyUsers_LoginAsAUser").attr('RolName', $(this).find('information').attr('RolName'));

	$("#btnMyUsers_Edit").attr('IdUser', $(this).find('information').attr('IdUser'));
	$("#btnMyUsers_Edit").attr('Phone', $(this).find('information').attr('Phone'));
	$("#btnMyUsers_Edit").attr('State', $(this).find('information').attr('State'));
	$("#btnMyUsers_Edit").attr('IdCompany', $(this).find('information').attr('IdCompany'));
	$("#btnMyUsers_Edit").attr('UserName', $(this).find('information').attr('UserName'));
	$("#btnMyUsers_Edit").attr('DisplayName', $(this).find('information').attr('DisplayName'));
	$("#btnMyUsers_Edit").attr('Mail', $(this).find('information').attr('Mail'));
	$("#btnMyUsers_Edit").attr('Owner', $(this).find('information').attr('Owner'));
	$("#btnMyUsers_Edit").attr('IdInitialRol', $(this).find('information').attr('IdInitialRol'));
	$("#btnMyUsers_Edit").attr('RolName', $(this).find('information').attr('RolName'));

	$("#btnMyUsers_KeyChange").attr('IdUser', $(this).find('information').attr('IdUser'));
	$("#btnMyUsers_KeyChange").attr('UserName', $(this).find('information').attr('UserName'));

	$("#btnMyUsers_EditPermissions").attr('idUser', $(this).find('information').attr('IdUser'));
	$("#btnMyUsers_EditPermissions").attr('Username', $(this).find('information').attr('DisplayName'));

	$("#btnMyUsers_Delete").attr('idUser', $(this).find('information').attr('IdUser'));
}
function cboCompanyCreate_Change(Seccion, Control)
{
	if ($("#" + Control).val() == "otro")
	{
		$("#" + Seccion).slideDown();
	}
	else
	{
		$("#" + Seccion).slideUp();
	}
}
function CargarDepartamentos()
{
	$("#txtCreatingUsersCreate_Company option").remove();
	$("#txtMyUsersEdit_Company option").remove();
	$.post("php/CargarDepartamentos.php",
			function(data)
			{

				$.each(data,function(index,value)
				{
					$("#txtCreatingUsersCreate_Company").append("<option value=" + value.IdDepartamento + ">" + value.Nombre + "</option>");
					$("#txtMyUsersEdit_Company").append("<option value=" + value.IdDepartamento + ">" + value.Nombre + "</option>");
				});
				$("#txtCreatingUsersCreate_Company").append("<option value='otro'>Otro</option>");
				$("#txtMyUsersEdit_Company").append("<option value='otro'>Otro</option>");
			}
		,"json");
}
function btnMyUsers_KeyChange_Click()
{
	var Nombre = $(this).attr("UserName");
	var IdUser = $(this).attr("idUser");
	$("#MyUsers_Edit_Key").dialog({
		autoOpen: false, 				
		title: "Cambiar Clave de " + Nombre,
		minWidth: 600,
		buttons: [
					{
						text: "Cambiar",
						click: function() { 
											if ($("#txtMyUsersEdit_ReTypePassword").val() == $("#txtMyUsersEdit_Password").val())
											{
												if($("#txtMyUsersEdit_Password").val() != "")
												{
													CambiarClave(IdUser, $("#txtMyUsersEdit_Password").val());	
													MostrarAlerta("Users_Message", "highlight", "ui-icon-check", "Hey!", "La Clave se ha Cambiado");
													$(this).dialog("close"); 
												}
												else
												{
													MostrarAlerta("MyUsersEdit_Message_Key", "error", "ui-icon-alert", "Error!", "La Clave no puede estar vacía");
												}
											}
											else
											{
												MostrarAlerta("MyUsersEdit_Message_Key", "error", "ui-icon-alert", "Error!", "las Claves no coinciden");
											}
												
										  }
					},
					{
						text: "Cancelar",
						click: function() { $(this).dialog("close"); 
										  }
					}
				  ]
						});
	$("#MyUsers_Edit_Key").dialog('open');
}
function CambiarClave(IdUser, NuevaClave)
{
	$.post("php/CambiarClave.php",
				{
					IdUsuarioMaestro: Usuario.Id,
					Id: IdUser,
					Clave: NuevaClave
				}
		);
}
function OcultarMenu()
{
	if ($("#MainMenu_Footer").is (':visible'))
	{
		if (movil)
		{
			$(".Seccion").addClass("Seccion_SinMenu");
			$(".Seccion").removeClass("Seccion");
			$("#MainMenu_Footer").fadeOut();

			$("#MainMenu").fadeOut('fast');
		}
	}
	else
	{
		$(".Seccion_SinMenu").addClass("Seccion");
		$(".Seccion_SinMenu").removeClass("Seccion_SinMenu");
		$("#MainMenu_Footer").fadeIn('fast');

		$("#MainMenu").fadeIn();

		movil = true;
	}
}
function CargarInspecciones()
{
	$.post("php/CargarInspecciones.php",
		function(data)
		{
			$("#Inspeccion_Inspecciones button").remove();
			var tds ="";
			$.each(data,function(index,value)
				{
					tds += '<button id="artInspeccion' + value.IdInspeccion + '"class="btnInspeccion">' + value.Nombre + '</button>';
				});
				
				$("#Inspeccion_Inspecciones").append(tds);
		}
		,"json");

	$("#Inspeccion div").fadeOut();
	$("#Inspeccion_Inspecciones").fadeIn();
}
function CargarEmpresas()
{
	$.post("php/CargarEmpresas.php",
		function(data)
		{
			$("#radioset_Empresas input").remove();
			$("#radioset_Multa_Empresas input").remove();

			$.each(data,function(index,value)
						{
							$("#radioset_Empresas").append('<input type="radio" id="rdbEmpresa' + value.IdEmpresa + '" name="radioset_Empresa" idEmpresa="' + value.IdEmpresa + '" /><label for="rdbEmpresa' + value.IdEmpresa + '">'+ value.Nombre +'</label>');
							$("#radioset_Multa_Empresas").append('<input type="radio" id="rdbMulta_Empresa' + value.IdEmpresa + '" name="radioset_Multa_Empresa" idEmpresa="' + value.IdEmpresa + '" /><label for="rdbMulta_Empresa' + value.IdEmpresa + '">'+ value.Nombre +'</label>');
						});
			
			$("#radioset_Empresas").buttonset();
			$("#radioset_Multa_Empresas").buttonset();
		}
		,"json");

	
}
function Inspeccion_Article_Click()
{
	$("#Inspeccion_Inspecciones").slideUp();
	$("#radioset_Empresas").slideDown();
}
function radioset_Empresas_Click()
{
	radioSet_IdEmpresa = $(this).attr("IdEmpresa");
	CargarZonas(radioSet_IdEmpresa);
	$("#radioset_Empresas_Zonas").slideDown();
	$("#DatosVehiculo").slideDown();

}
function radioset_Multa_Empresas_Click()
{
	radioSet_IdEmpresa = $(this).attr("IdEmpresa");
	CargarZonas(radioSet_IdEmpresa);
	$("#Multa div").slideUp();
	$("#radioset_Multa_Zona").slideDown();
	$("#Multa_DatosVehiculo").slideDown();
	
}
function txtDatosDeVehiculo_Change()
{
	var varParametro = $(this).attr("Parametro");
	var varValor = $(this).val();
	var varIdtxt = $(this).attr("id");

	$.post("php/AutocompletarBuses.php", 
			{
				IdEmpresa : radioSet_IdEmpresa,
				Parametro : varParametro,
				Valor : varValor
			},
			function(data)
			{
				$("#" + varIdtxt).autocomplete({source: data, select: function( event, ui ) {txtDatosDeVehiculo_Select(event, ui);}});
			},
		"json");
}
function txtDatosDeVehiculo_Select(event, ui)
{
	
	$("#txtInspeccionVehiculo_Placa").val(ui.item.Placa);
	$("#txtInspeccionVehiculo_NInterno").val(ui.item.NInterno);
	$("#divDatosVehiculo").slideDown();
	
	if ($("#SelectedSection h4").text() == "Inspección")
	{
		$.post("php/CargarDatosBus.php", {BusId:ui.item.IdBus }, 
			function(data)
			{
				$("#tblVehiculo tbody td").remove();
				var tds ="";
				$.each(data, function(i, v)
				{
					tds += "<tr>";
					tds += "	<td>" + v.Marca+"</td>";
					tds += 	"		<td>" + v.Modelo+ "</td>";
					tds += 	"		<td>"+ v.Chasis+ "</td>";
					tds +=	"	<td>"+ v.Motor+"</td>";
					tds +=	"	<td>"+ v.FechaVinculacion+"</td>";
					tds +=	"</tr>";
					
					tds += "<tr>";
					tds += "	<td><strong>Estado</strong></td>";
					tds += "	<td><strong>Nivel de Emisión</strong></td>";
					tds += "	<td><strong>Vinculación</strong></td>";
					tds += "	<td><strong>Tipo de Vehículo</strong></td>";
					tds += "	<td><strong>Servicio</strong></td>";
					tds +=	"</tr>";

					tds += "<tr>";
					tds += "	<td>" + v.Estado+"</td>";
					tds += "	<td>" + v.NivelDeEmision+"</td>";
					tds += "	<td>" + v.Vinculacion+"</td>";
					tds += "	<td>" + v.TipoVehiculo+"</td>";
					tds += "	<td>" + v.Servicio+"</td>";
					tds +=	"</tr>";
					$("#tblVehiculo tbody").append(tds);

					$("#divDatosVehiculo center button").attr("BusId", v.BusId);
				});
			}, "json");
	}
	if ($("#SelectedSection h4").text() == "Hallazgos")
	{
		$("#txtMultaVehiculo_Placa").val(ui.item.Placa);
		$("#txtMultaVehiculo_NInterno").val(ui.item.NInterno);

		$("#cntMulta_Datos").slideDown();
		$("#SubirArchivos").load("subir.html?hallazgo=" + obj);	

		$.post("php/CargarMultas.php",
			function(data)
			{
				$("#txtMulta_Codigo").autocomplete({source: data, select: function( event, ui ) {DescripcionMulta(event, ui);}});
			}
			,"json");

		
	}


}	
function btnIniciarInspeccion_Click()
{
	$("#divDatosVehiculo").slideUp();
	$("#Inspeccion_Inspecciones").slideUp();
	
	$("#Inspeccion_Preguntas").slideDown();

	$.post("php/CargarPreguntas.php",
		function(data)
		{
			$("#tblInspeccion tbody td").remove();
			
			$.each(data, function(i, v)
			{
				var tds ="";
				tds += "<tr NPregunta='"+ v.NPregunta + "'>";
				tds += "	<td>" + v.NPregunta+"</td>";
				tds += 	"	<td>" + v.Pregunta+ "</td>";
				tds += 	'	<td><div class="radioButton">';
				tds += 	'		<input type="radio" id="rdbPregunta' + v.NPregunta + '_1" name="radioset_Pregunta_' + i + '" idPregunta="' + v.NPregunta + '" value="Si" /><label for="rdbPregunta' + v.NPregunta + '_1">Si</label>';
				tds += 	'		<input type="radio" id="rdbPregunta' + v.NPregunta + '_2" name="radioset_Pregunta_' + i + '" idPregunta="' + v.NPregunta + '" value="No"/><label for="rdbPregunta' + v.NPregunta + '_2">No</label>';
				tds += 	'		<input type="radio" id="rdbPregunta' + v.NPregunta + '_3" name="radioset_Pregunta_' + i + '" idPregunta="' + v.NPregunta + '" value="Na" checked="checked"/><label for="rdbPregunta' + v.NPregunta + '_3">NA</label>';
				tds += 	'	</div></td>';
				tds +=	"</tr>";
				
				$("#tblInspeccion tbody").append(tds);
				
			});
			//$(".radioButton").buttonset();
		}, "json");

}
function btnEvaluarInspeccion_Click()
{
	var Si = 0;
	var No = 0;
	var Na = 0;

	var i = 0;
	for (i=0; i <= $("#tblInspeccion tbody tr").size(); i++)
	{
		if($("input[name='radioset_Pregunta_" + i + "']:checked").val() == "Si")
		{
			Si++;
		}
		if($("input[name='radioset_Pregunta_" + i + "']:checked").val() == "No")
		{
			No++;	
		}	
		if($("input[name='radioset_Pregunta_" + i + "']:checked").val() == "Na")
		{
			Na++;
		}		
	}
	$("#Inspeccion_Preguntas").slideUp();
	$("#Inspeccion_Evaluar").slideDown();

	$("#Inspeccion_Evaluar_Si span").text(Si);
	$("#Inspeccion_Evaluar_No span").text(No);
	$("#Inspeccion_Evaluar_Na span").text(Na);
	
}
function CargarZonas(IdEmp)
{
	$.post("php/CargarZonas.php",
		{IdEmpresa : IdEmp},
		function(data)
		{
			$("#radioset_Multa_Zona input").remove();
			$("#radioset_Multa_Zona label").remove();

			$("#radioset_Empresas_Zonas input").remove();
			$("#radioset_Empresas_Zonas label").remove();
			
			var varChecked = 'checked';

			$.each(data,function(index,value)
						{
							$("#radioset_Multa_Zona").append('<input type="radio" id="rdbMulta_Zona' + value.IdZona + '" name="radioset_Multa_Zona" idZona="' + value.IdZona + '" ' + varChecked + ' /><label for="rdbMulta_Zona' + value.IdZona + '">'+ value.Nombre +'</label>');
							$("#radioset_Empresas_Zonas").append('<input type="radio" id="rdbZona' + value.IdZona + '" name="radioset_Multa_Zona" idZona="' + value.IdZona + '" ' + varChecked + ' /><label for="rdbZona' + value.IdZona + '">'+ value.Nombre +'</label>');
							varChecked = "";
						});
			
			$("#radioset_Multa_Zona").buttonset();
			$("#radioset_Empresas_Zonas").buttonset();
		}
		,"json");
}
function CargarHallazgos()
{
	$("#Multa div").fadeOut();
}
function DescripcionMulta(event, ui)
{
	event.preventDefault();
	$("#txtMulta_Descripcion").text(ui.item.Descripcion);
	$("#txtMulta_Codigo").val(ui.item.Codigo);
}
function radioset_TipoHallazgo_Click()
{
	$("#radioset_Multa_Empresas").slideDown();
	var f = new Date();

	geolocalizar();
	
	$("#txtMulta_Fecha").val(f.getFullYear() + "-" + CompletarConCero(f.getMonth(), 2) + "-" + CompletarConCero(f.getDate(), 2));
	$("#txtMulta_Hora").val(CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 	2));

	if ($(this).val() ==3)
	{
		$("#lbl_txtMulta_Ruta").text("Ruta")
	}
	if ($(this).val() ==3)
	{
		$("#lbl_txtMulta_Ruta").text("Ruta")
	}
	if ($(this).val() ==3)
	{
		$("#lbl_txtMulta_Ruta").text("Kilometraje")
	}
}
function CompletarConCero(n, length){
   n = n.toString();
   while(n.length < length) n = "0" + n;
   return n;
}
function geolocalizar()
{
	navigator.geolocation.getCurrentPosition(mostrarMapa, errorMapa);
}
function mostrarMapa(datos)
{
	var lat = datos.coords.latitude;
	var lon = datos.coords.longitude;
	
	$("#status").text("Ajá! Estás en " + lat + "," + lon);
	
	var coordenada = new google.maps.LatLng(lat,lon);
	var opcionesMapa  = {
		center: coordenada,
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var geocoder = new google.maps.Geocoder();
	
	geocoder.geocode({'latLng': coordenada}, 
		function(results, status) 
		{
	      if (status == google.maps.GeocoderStatus.OK) 
	      {
	        if (results[0]) 
	        {
	          //$("#Direccion").text(results[0].address_components[1].long_name);
	          var Direccion = results[0].formatted_address.split(",");
	          $("#txtMulta_Direccion").val(Direccion[0]);
	        }
	      } 
	      else 
	      {
	        $("#txtMulta_Direccion").val("No se ubicó la dirección por " + status);
	      }
	    });
}
function errorMapa()
{
	$("#status").text("Tarde o temprano... ¬¬");
}
