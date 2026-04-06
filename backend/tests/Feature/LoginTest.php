<?php

use App\Models\User;

test('obtencion de csrf-cookie', function () {
    $cookieResponse = $this->actingAsGuest()
        ->withHeaders(['Accept' => 'application/json'])
        ->get('sanctum/csrf-cookie');

    $cookieResponse->assertStatus(204)
        ->assertHeader('Set-Cookie');

    $cookies = $cookieResponse->headers->all('Set-Cookie');

    $xsrfToken = null;
    foreach ($cookies as $cookie) {
        if (str_starts_with($cookie, 'XSRF-TOKEN=')) {
            $xsrfToken = urldecode(explode(';', explode('=', $cookie, 2)[1])[0]);
            break;
        }
    }
    expect($xsrfToken)->not->toBeNull();
});

test('login mediante end-point', function () {
    $cookieResponse = $this->actingAsGuest()
        ->withHeaders(['Accept' => 'application/json'])
        ->get('sanctum/csrf-cookie');

    $cookieResponse->assertStatus(204)
        ->assertHeader('Set-Cookie');

    $cookies = $cookieResponse->headers->all('Set-Cookie');

    $xsrfToken = null;
    foreach ($cookies as $cookie) {
        if (str_starts_with($cookie, 'XSRF-TOKEN=')) {
            $xsrfToken = urldecode(explode(';', explode('=', $cookie, 2)[1])[0]);
            break;
        }
    }
    expect($xsrfToken)->not->toBeNull();

    $password = fake()->password(8);
    $user = User::factory(['password' => $password])->create();

    $loginResponse = $this->withHeaders(['X-XSRF-TOKEN' => $xsrfToken])
        ->postJson('login', ['email' => $user->email, 'password' => $password]);

    $loginResponse->assertStatus(200)
        ->assertJsonStructure(['data' => ['id', 'email', 'name']]);
});
