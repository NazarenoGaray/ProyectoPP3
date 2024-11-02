<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\BeforeValidException;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Illuminate\Support\Facades\DB;

class RenovarTokenController extends Controller
{
    public function renovarToken(Request $request)
    {
        $token = $request->input('token'); 
        $key = '54fhd546fdg654fdg';
        $algoritmo = 'HS256';

        // Verifica si el token actual es válido
        try {
            //$decodedToken = JWT::decode($token, $clave_secreta, array('HS256'));
            $decodedToken = JWT::decode($token, new Key($key, $algoritmo));
            //var_dump($decodedToken);
            //var_dump($token);
            // echo "ID de Usuario: " . $decodedToken->data->idUsuario . "<br>";
            // echo "Nombre de Usuario: " . $decodedToken->data->usuario . "<br>";
            //echo "rol: " . $decodedToken->data->rol . "<br>";

            $usuario = $decodedToken->data; 
            $newToken = $this->generarToken($usuario->usuario, $usuario->idUsuario, $usuario->rol);
            DB::table('usuarios')
                    ->where('idUsuario', $usuario->idUsuario)
                    ->update(['token' => $token]);

            return response()->json(['token' => $newToken], 200);
        } catch (SignatureInvalidException $e) {
            // Manejar error de firma no válida
            return response()->json(['error' => 'Firma no válida'], 401);
        } catch (BeforeValidException $e) {
            // Manejar error antes de la fecha válida
            return response()->json(['error' => 'Token no válido antes de la fecha válida'], 401);
        } catch (ExpiredException $e) {
            // Manejar token expirado
            return response()->json(['error' => 'Token expirado'], 401);
        } catch (\Exception $e) {
            // Manejar otros errores
            return response()->json(['error' => 'Token no válido'], 401);
        }
    }

    private function generarToken($usuario, $idUsuario, $rol)
    {
        $time = time();
        $clave_secreta = '54fhd546fdg654fdg';

        $token = [
            'iat' => $time,
            'exp' => $time + (60*30), // 30 minutos de duración
            'data' => [
                'idUsuario' => $idUsuario,
                'usuario' => $usuario,
                'rol' => $rol,
            ],
        ];
        $jwt = JWT::encode($token, $clave_secreta, 'HS256');
        return $jwt;
    }
}
