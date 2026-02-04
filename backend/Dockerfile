FROM php:8.4-cli-alpine

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .
RUN composer install

EXPOSE 8000
