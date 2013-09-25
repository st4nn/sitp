<?php 
function Conectarse() 
{ 
   if (!($link=mysql_connect("localhost","root","holamundo"))) 
   { 
      echo "Error conectando a la base de datos."; 
      exit(); 
   } 
   if (!mysql_select_db("sitp",$link)) 
   { 
      echo "Error seleccionando la base de datos."; 
      exit(); 
   } 
   return $link; 
} 
?>
