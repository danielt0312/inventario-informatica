<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Pluralizer;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Pluralizer::useLanguage('spanish');

        if (app()->environment('local')) {
            DB::enableQueryLog();
        }
    }
}
