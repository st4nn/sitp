<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	$IdEmpresa = $_POST['IdEmpresa'];
	
	$sql = "
		SELECT 
			A.Zon_IdZona AS 'IdZona', 
			A.Nombre AS 'Nombre'
		FROM  
			Zonas AS A, 
			Empresas_has_Zonas AS B 
		WHERE
			A.Zon_IdZona = B.Zonas_Zon_IdZona
			AND Empresas_Em_idEmpresa = $IdEmpresa
		ORDER BY 
			A.Zon_IdZona";

	$result=mysql_query($sql,$link); 

	class Zona
	{
		public $IdZona;
		public $Nombre;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Zonas[$Index] = new Zona();
		
		$Zonas[$Index]->IdZona = $row['IdZona'];
		$Zonas[$Index]->Nombre = $row['Nombre'];
	
		$Index++;	
		
	} 
	
	echo json_encode($Zonas);
  mysql_free_result($result); 
  mysql_close($link); 
?> 