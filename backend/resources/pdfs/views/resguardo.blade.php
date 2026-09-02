{{--
/**
 * @var \App\Models\Resguardo $resguardo
 * @var string $title
 * @var string $subtitle
 * @var string $fileTitle
 */
--}}
@props([
    'resguardo',
    'title',
    'fileTitle'
])

<x-pdf-layout::master title="{{ $fileTitle }}">
    <x-slot:header class="table w-full">
        <div class="table-cell align-middle text-left">
            <x-pdf::logo />
        </div>
        <div class="text-center">
            <h1>{{ $title }}</h1>
        </div>
    </x-slot:header>

    <div class="text-right">
        Fecha de Actualización: <span class="uppercase">{{ $resguardo->fecha_actualizacion->translatedFormat('d \d\e F \d\e Y') }}</span>
    </div>
</x-pdf-layout::master>
