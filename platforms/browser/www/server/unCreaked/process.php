<?php
	//ConexionBD
	$bd = new MySQLi("localhost", "root", "", "uncracked");
	if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); exit(); }
	//Funciones
	function prepare($theValue, $theType,$bd) 
	{
	  if (PHP_VERSION < 6) {
		$theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
	  }
	
	  $theValue = $bd->real_escape_string($theValue);
	
	  switch ($theType) {
		case "text":
		  $theValue = ($theValue != "") ? "'" . $theValue . "'" : "''";
		  break;    
		case "long":
		case "int":
		  $theValue = ($theValue != "") ? intval($theValue) : "0";
		  break;
		case "double":
		  $theValue = ($theValue != "") ? doubleval($theValue) : "0";
		  break;
		case "date":
		  $theValue = ($theValue != "") ? "'" . $theValue . "'" : " ";
		  break;
	  }
	  return $theValue;
	}
	function Fecha($date,$l='-')
	{
		$d=explode('-',$date);
		switch($d[1])
		{
			case'01':
			$m='Ene';
			break;
			case'02':
			$m='Feb';
			break;
			case'03':
			$m='Mar';
			break;
			case'04':
			$m='Abr';
			break;
			case'05':
			$m='May';
			break;
			case'06':
			$m='Jun';
			break;
			case'07':
			$m='Jul';
			break;
			case'08':
			$m='Ago';
			break;
			case'09':
			$m='Sep';
			break;
			case'10':
			$m='Oct';
			break;
			case'11':
			$m='Nov';
			break;
			case'12':
			$m='Dic';
			break;
		}
		$D=$d[2].$l.$m;
		return $D;
	}
?>
<?php
	if(isset($_GET['jsoncallback']) && !empty($_GET['jsoncallback']))
	{
		$array=array();
		if(isset($_GET['user']) && isset($_GET['pass']))
		{
			$user=prepare($_GET['user'],'text',$bd);
			$Pass=sha1($_GET['pass']);
			$pass=prepare($Pass,'text',$bd);
			$res=$bd->query("SELECT * FROM `usuarios` WHERE `user`=$user AND `pass`=$pass");
			if($res->num_rows>0)
			{
				$Row_Usuarios=$res->fetch_array();
				$Row_Usuarios["tipo_cod"];
				$res_tabla=$bd->query("SELECT tipo AS Tabla FROM `tipo_user` WHERE `cod`=".$Row_Usuarios["tipo_cod"]);
				$RowTabla=$res_tabla->fetch_assoc();
				$res_userdata=$bd->query("SELECT * FROM ".$RowTabla['Tabla']." WHERE `user`=$user");
				if($res_userdata->num_rows>0)
				{
					$UserData=$res_userdata->fetch_array();
					$array["id"]=$UserData['id'];	
					$array["nombre"]=$UserData['nombre'];	
					$array["ident"]=$UserData['cc'];
				}
				else
				{
					$array["Rta"]='ErrSrchUser';
				}
			}
			else
			{
				$array["Rta"]='ErrLogin';
			}
		}
		echo $_GET['jsoncallback'].'('.json_encode($array).')';
	}
?>