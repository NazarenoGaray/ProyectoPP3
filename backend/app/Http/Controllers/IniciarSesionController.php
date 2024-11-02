<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;


class IniciarSesionController extends Controller
{
    public function iniciarSesion(Request $request)
    {
        
        try{
            
            $usuario = $request->input('usuario');
            $contraseña = $request->input('contraseña');
            $usuarioEncontrado = Usuario::where('usuario', $usuario)->first();
            //echo "Usuario: " . $usuario . "<br>";
            //echo "Contraseña: " . $contraseña . "<br>";
            //echo "usuarioEncontrado: " . $usuarioEncontrado . "<br>";

            if (!$usuarioEncontrado) {
                // El usuario no existe en la base de datos
                return response()->json('Usuario no encontrado', 404);
            }

            // Verifica si la contraseña coincide
            if (password_verify($contraseña, $usuarioEncontrado->contraseña)) {
                
                //Las credenciales son válidas, el usuario ha iniciado sesión
                $idUsuario = $usuarioEncontrado->idUsuario;
                $rol = $usuarioEncontrado->rol;

                // Generar el token JWT
                $token = $this->generarToken($usuario, $idUsuario, $rol);
                //lo cguardamos en base de datos
                DB::table('usuarios')
                    ->where('idUsuario', $usuarioEncontrado->idUsuario)
                    ->update(['token' => $token]);

                return response()->json(['token' => $token], 200);
            } else {
                // Las credenciales son incorrectas, el usuario no ha iniciado sesión
                return response()->json('Credenciales incorrectas', 401);
            }

        }catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
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
