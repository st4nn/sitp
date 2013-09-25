<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	
	$result=mysql_query("SELECT Mu_Id, Mu_Codigo, Mu_Descripcion FROM  Multas ORDER BY Mu_Id",$link); 

	class Multa
	{
		public $Id;
		public $Codigo;
		public $Descripcion;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Multas[$Index] = new Multa();
		
		$Multas[$Index]->label = $row['Mu_Codigo'];

		$Multas[$Index]->Id = $row['Mu_Id'];
		$Multas[$Index]->Codigo = $row['Mu_Codigo'];
		$Multas[$Index]->Descripcion = $row['Mu_Descripcion'];
	
		$Index++;	

		$Multas[$Index] = new Multa();
		
		$Multas[$Index]->label = $row['Mu_Descripcion'];

		$Multas[$Index]->Id = $row['Mu_Id'];
		$Multas[$Index]->Codigo = $row['Mu_Codigo'];
		$Multas[$Index]->Descripcion = $row['Mu_Descripcion'];
	
		$Index++;	
		
	} 
	
	echo json_encode($Multas);
  mysql_free_result($result); 
  mysql_close($link); 
?> 