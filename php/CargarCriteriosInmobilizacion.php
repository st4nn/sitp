<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	
	$result=mysql_query("SELECT IdCriterioInmo, Criterio, Causa FROM  CriteriosInmovilizacion ORDER BY idCriterioInmo",$link); 

	class Criterio
	{
		public $Id;
		public $Codigo;
		public $Descripcion;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Criterios[$Index] = new Criterio();
		
		$Criterios[$Index]->label = $row['Criterio'];

		$Criterios[$Index]->Id = $row['IdCriterioInmo'];
		$Criterios[$Index]->Codigo = $row['Criterio'];
		$Criterios[$Index]->Descripcion = $row['Causa'];
	
		$Index++;	
	} 
	
	echo json_encode(array_map(utf8_encode,$Criterios));
  mysql_free_result($result); 
  mysql_close($link); 
?> 