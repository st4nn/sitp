<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	
	$BusId = $_POST['BusId'];

	$sql = "
		SELECT 
			Bus_Id,
			Marca,
			Modelo, 
			Chasis,
			Motor,
			FechaVinculacion,
			BE_Nombre,
			BNE_Nombre,
			BV_Nombre,
			BTV_Nombre,
			BS_Nombre
		FROM  
			BusesDatos AS A,
			Bus_Estado AS B,
			Bus_NivelDeEmision AS C,
			Bus_Vinculacion AS D,
			Bus_TipoVehiculo as E,
			BusesServicio As F
		WHERE 
				A.Bus_Id = $BusId
			AND A.Bus_Estado_BE_Id = B.BE_Id
			AND A.Bus_NivelDeEmision_BNE_Id = C.BNE_Id
			AND A.Bus_Vinculacion_BV_Id = D.BV_Id
			AND A.Bus_TipoVehiculo_BTV_Id = E.BTV_Id
			AND A.BusesServicio_BS_IdTipoServicio = F.BS_IdTipoServicio";


	$result=mysql_query($sql, $link); 

	class Bus
	{
		public $BusId;
		public $Marca;
		public $Modelo;
		public $Chasis;
		public $Motor;
		public $FechaVinculacion;
		public $Estado;
		public $NivelDeEmision;
		public $Vinculacion;
		public $TipoVehiculo;
		public $Servicio;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Buses[$Index] = new Bus();
		
		$Buses[$Index]->Marca = $row['Marca'];
		$Buses[$Index]->Modelo= $row['Modelo'];
		$Buses[$Index]->Chasis = $row['Chasis'];
		$Buses[$Index]->Motor = $row['Motor'];
		$Buses[$Index]->FechaVinculacion = $row['FechaVinculacion'];
		$Buses[$Index]->Estado = $row['BE_Nombre'];
		$Buses[$Index]->NivelDeEmision = $row['BNE_Nombre'];
		$Buses[$Index]->Vinculacion = $row['BV_Nombre'];
		$Buses[$Index]->TipoVehiculo = $row['BTV_Nombre'];
		$Buses[$Index]->Servicio = $row['BS_Nombre'];
	
		$Index++;	
		
	} 
	
	echo json_encode($Buses);
  mysql_free_result($result); 
  mysql_close($link); 
?> 