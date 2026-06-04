FROM php:8.4-fpm-alpine

COPY --from=composer:2.9.5 /usr/bin/composer /usr/bin/composer

RUN apk add --no-cache \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev

RUN apk add mariadb-client

RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install pdo pdo_mysql gd

WORKDIR /var/www/html
COPY . .
RUN composer install

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
