<?php 
   include("conectar.php"); 
	$link=Conectarse(); 
	
	$sql = "
		SELECT 
			IdPregunta,
			Pregunta
		FROM  
			Inspeccion_Preguntas
		";


	$result=mysql_query($sql, $link); 

	class Pregunta
	{
		public $NPregunta;
		public $Pregunta;
	}

	$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Preguntas[$Index] = new Pregunta();
		
		$Preguntas[$Index]->NPregunta = $row['IdPregunta'];
		$Preguntas[$Index]->Pregunta= utf8_encode($row['Pregunta']);
	
		$Index++;	
		
	} 
	
	echo json_encode($Preguntas);
  mysql_free_result($result); 
  mysql_close($link); 
?> 