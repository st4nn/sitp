<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	
	$IdEmpresa = $_POST['IdEmpresa'];
	
	
	$Parametro = $_POST['Parametro'];
	/*
	$Valor = $_POST['Valor'];
	*/
	$result=mysql_query("SELECT Bus_Id, Bus_Placa, Bus_Codigo FROM  Buses WHERE Empresas_Em_idEmpresa = $IdEmpresa",$link); 
	
	

	class Bus
	{
		public $IdBus;
		public $Placa;
		public $NInterno;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Buses[$Index] = new Bus();
		
		$Buses[$Index]->label = $row[$Parametro];

		$Buses[$Index]->IdBus = $row['Bus_Id'];
		$Buses[$Index]->Placa = $row['Bus_Placa'];
		$Buses[$Index]->NInterno = $row['Bus_Codigo'];
	
		$Index++;	
		
	} 
	
	echo json_encode($Buses);
  mysql_free_result($result); 
  mysql_close($link); 
?> 