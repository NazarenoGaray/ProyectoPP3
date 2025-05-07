<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

class IniciarSesionController extends Controller
{
    public function iniciarSesion(Request $request)
    {
        try {
            Log::info('Intento de inicio de sesión', ['usuario' => $request->input('usuario')]);
            
            $request->validate([
                'usuario' => 'required|string',
                'contraseña' => 'required|string'
            ]);

            $usuario = $request->input('usuario');
            $contraseña = $request->input('contraseña');
            
            $usuarioEncontrado = Usuario::where('usuario', $usuario)->first();

            if (!$usuarioEncontrado) {
                Log::warning('Usuario no encontrado', ['usuario' => $usuario]);
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }

            if (!Hash::check($contraseña, $usuarioEncontrado->contraseña)) {
                Log::warning('Credenciales incorrectas', ['usuario' => $usuario]);
                return response()->json(['error' => 'Credenciales incorrectas'], 401);
            }

            $token = $this->generarToken(
                $usuarioEncontrado->usuario,
                $usuarioEncontrado->idUsuario,
                $usuarioEncontrado->rol
            );

            DB::table('usuarios')
                ->where('idUsuario', $usuarioEncontrado->idUsuario)
                ->update(['token' => $token]);

            return response()->json([
                'token' => $token,
                'idEstadoUsuario' => $usuarioEncontrado->idEstadoUsuario,
                'idUsuario' => $usuarioEncontrado->idUsuario,
                'rol' => $usuarioEncontrado->rol
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error en inicio de sesión', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    private function generarToken($usuario, $idUsuario, $rol)
    {
        $time = time();
        $clave_secreta = '54fhd546fdg654fdg';

        $token = [
            'iat' => $time,
            'exp' => $time + (60*90), // 30 minutos de duración
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
