<?php 
function Conectarse() 
{ 
   if (!($link=mysql_connect("localhost","gbjsitp1_sitp","2vviGHApAChm"))) 
   { 
      echo "Error conectando a la base de datos."; 
      exit(); 
   } 
   if (!mysql_select_db("gbjsitp1_sitp",$link)) 
   { 
      echo "Error seleccionando la base de datos."; 
      exit(); 
   } 
   return $link; 
} 
?>
