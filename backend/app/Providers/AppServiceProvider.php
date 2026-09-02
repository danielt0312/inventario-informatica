<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\{
    Blade,
    DB,
    View
};
use Illuminate\Support\Pluralizer;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\Relation;
use App\Models\{
    Oficio,
    Dictamen,
    Factura,
    Resguardo,
};

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Pluralizer::useLanguage('spanish');
        Carbon::setLocale('es');

        Relation::enforceMorphMap([
            'oficio'    => Oficio::class,
            'dictamen'  => Dictamen::class,
            'factura'   => Factura::class,
            'resguardo' => Resguardo::class,
        ]);

        Blade::anonymousComponentPath(resource_path('pdfs/components'), 'pdf');
        Blade::anonymousComponentPath(resource_path('pdfs/layouts'), 'pdf-layout');

        View::addNamespace('pdf-view', resource_path('pdfs/views'));

        if (app()->environment('local') && !!env('ENABLE_QUERY_LISTENER_LOGGER', 0)) {
            DB::enableQueryLog();

            DB::listen(function ($query) {
                logger()->info("SQL: {$query->sql} [" . implode(', ', $query->bindings) . "] - Time: {$query->time}ms");
            });
        }
    }
}
