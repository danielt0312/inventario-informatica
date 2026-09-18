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
use App\Enums\DocumentoTipoEnum;

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

        Relation::enforceMorphMap(
            collect(DocumentoTipoEnum::cases())
                ->mapWithKeys(fn ($case) => [
                    $case->morphAlias() => $case->modelClass()
                ])
                ->toArray()
        );

        Blade::anonymousComponentPath(resource_path('pdfs/components'), 'pdf');
        Blade::anonymousComponentPath(resource_path('pdfs/layouts'), 'pdf-layout');

        View::addNamespace('pdf-view', resource_path('pdfs/views'));

        if (app()->environment('local') && !!env('ALLOW_QUERY_LOG', false)) {
            DB::enableQueryLog();

            if (!!env('ALLOW_QUERY_LISTENER_LOG', false)) {
                DB::listen(fn ($query) =>
                    logger()->info("SQL: {$query->sql} [" . implode(', ', $query->bindings) . "] - Time: {$query->time}ms")
                );
            }
        }
    }
}
