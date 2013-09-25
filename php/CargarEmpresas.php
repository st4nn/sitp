<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	$result=mysql_query("SELECT Em_IdEmpresa, Em_Nombre FROM  Empresas ORDER BY Em_IdEmpresa",$link); 

	class Empresa
	{
		public $IdEmpresa;
		public $Nombre;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Empresas[$Index] = new Empresa();
		
		$Empresas[$Index]->IdEmpresa = $row['Em_IdEmpresa'];
		$Empresas[$Index]->Nombre = $row['Em_Nombre'];
	
		$Index++;	
		
	} 
	
	echo json_encode($Empresas);
  mysql_free_result($result); 
  mysql_close($link); 
?> 