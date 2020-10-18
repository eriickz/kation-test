<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    private $messages = [
        'email.unique' => 'El email ya esta en uso.',
        'email.required' => 'El email es requerido.',
        'password.required' => 'Debes ingresar una contraseña.',
        'name.required' => 'Debes ingresar un nombre.',
        'lastname.required' => 'Debes ingresar un apellido.',
    ];

    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'checkEmail', 'changePassword']]);
    }

    protected function createNewToken($token) {
        return response()->json([
            'token' => $token,
            'expires_in' => Auth::factory()->getTTL() * 60,
            'user' => Auth::user(),
        ]);
    }

    private function checkToken() {
        try {
            $token = JWTAuth::getToken();
            $payload = JWTAuth::getPayload($token);

            return true;

        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json('La sesión ha expirado, por favor ingrese al sistema nuevamente.', 500);
        }
        catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json('Por favor, ingrese al sistema.', 500);
        }
    }

    public function register(Request $request) {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'lastname' => 'required|string',
                'email' => 'required|string|email|unique:users',
                'password' => 'required|string|min:4'
            ],
            $this->messages
        );

        if ( $validator->fails() ) {
            return response()->json($validator->errors()->first(), 400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));

        return response()->json([
            'message' => 'Se ha registrado el usuario correctamente.',
            'user' => $user
        ], 201);
    }

    public function login(Request $request) {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|string',
                'password' => 'required|string|min:4'
            ],
            $this->messages
        );

        if ( $validator->fails() ) {
            return response()->json($validator->errors()->first(), 400);
        }

        $token = Auth::attempt($validator->validated());

        if ( !$token ) {
            return response()->json('El usuario o la contraseña son incorrectos.', 401);
        }

        return $this->createNewToken($token);
    }

    public function getUsers(Request $request) {
        if ( $this->checkToken() ) {
            $users = User::all()
                        ->sortByDesc('id');

            if ( count($users) === 0 ) {
                return response()->json('Los usuarios no fueron encontrados.', 400);
            }

            return response()->json(['users' => $users], 200);
        }
    }

    public function getUser(Request $request, $userId) {
        if ( $this->checkToken() ) {
            $user = User::where('id', $userId)
                        ->get();

            if ( count($user) === 0 ) {
                return response()->json('El usuario no fue encontrado.', 400);
            }

            return response()->json(['user' => $user], 200);
        }
    }

    public function updateUser(Request $request, $userId) {
        if ( $this->checkToken() ) {
            $data = $request->get('data');

            if ( $data['password'] != '' && strlen($data['password']) < 4 ) {
                return response()->json('La contraseña debe tener 4 digitos como mínimo.', 400);
            }

            $emailFound = DB::table('users')->where('email', $data['email'])->first();

            if ( count((array)$emailFound) !== 0 && $emailFound->id != $userId ) {
                return response()->json('El email esta en uso.', 400);
            }

            $user = User::find($userId);

            $user->name = $data['name'];
            $user->lastname = $data['lastname'];
            $user->email = $data['email'];

            if ( $data['password'] != '' ) {
                $user->password = bcrypt($data['password']);
            }

            $user->save();

            return response()->json('El usuario fue actualizado correctamente.', 200);
        }
    }

    public function checkEmail(Request $request) {
        $userFound = DB::table('users')->where('email', '=', $request->get('email'));

        if ( count((array)$userFound) === 0) {
            return response()->json('El email es incorrecto.', 400);
        }

        return response()->json('Por favor, ingrese una nueva contraseña.', 200);
    }

    public function changePassword(Request $request) {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|string|email',
                'password' => 'required|string|min:4'
            ],
            $this->messages
        );

        if ( $validator->fails() ) {
            return response()->json($validator->errors()->first(), 400);
        }

        $userByEmail = DB::table('users')->where('email', '=', $request->get('email'))->first();

        $user = User::find($userByEmail->id);

        $user->password = bcrypt($request->get('password'));

        $user->save();

        return response()->json('La contraseña ha sido cambiada con éxito.', 200);
    }

    public function deleteUser(Request $request, $userId) {
        if ( $this->checkToken() ) {
            $user = User::find($userId);

            $user->delete();

            return response()->json('El usuario ha sido eliminado con éxito.', 200);
        }
    }

    public function logout(Request $request) {
        if ( $this->checkToken() ) {
            Auth::logout();

            return response()->json('El usuario ha sido desconectado con éxito.');
        }
    }
}
