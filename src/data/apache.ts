import {
    VhostConfig,
} from "@app/Types";

const html: VhostConfig = {
    engine: "none",
    type: "html",
    name: "Basic HTML",
    description: "No PHP support, for a simple HTML application",
    readOnly: true,
    data: `<VirtualHost *:8080>
    ServerName default.localhost
    ServerAlias *

    DocumentRoot /var/www

    <Directory "/var/www">
        Options Indexes FollowSymlinks MultiViews
        AllowOverride All
        Require all granted
        DirectoryIndex index.html
    </Directory>

    ErrorLog "/dev/stderr"
    CustomLog "/dev/stdout" combined
    LogLevel warn
    ServerSignature Off
    SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
</VirtualHost>`,
};

const fpm: VhostConfig = {
    engine: "php",
    type: "fpm",
    name: "Basic PHP-FPM",
    description: "Simple, basic PHP application",
    readOnly: true,
    data: `<VirtualHost *:8080>
    ServerName default.localhost
    ServerAlias *

    DocumentRoot /var/www

    <FilesMatch "\.php$">
        <If "%{HTTP_COOKIE} =~ /XDEBUG_SESSION/">
            SetHandler proxy:fcgi://127.0.0.1:\${PHPFPM_XDEBUG_PORT}
        </If>
        <Else>
            SetHandler proxy:fcgi://127.0.0.1:9000
        </Else>
    </FilesMatch>

    <Directory "/var/www">
        Options Indexes FollowSymlinks MultiViews
        AllowOverride All
        Require all granted
        DirectoryIndex index.html index.php
    </Directory>

    ErrorLog "/dev/stderr"
    CustomLog "/dev/stdout" combined
    LogLevel warn
    ServerSignature Off
    SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
</VirtualHost>`,
};

const drupal: VhostConfig = {
    engine: "php",
    type: "drupal",
    name: "Drupal",
    description: "Drupal",
    readOnly: true,
    data: `<VirtualHost *:8080>
    ServerName default.localhost
    ServerAlias *

    <FilesMatch "\.php$">
        <If "%{HTTP_COOKIE} =~ /XDEBUG_SESSION/">
            SetHandler proxy:fcgi://127.0.0.1:\${PHPFPM_XDEBUG_PORT}
        </If>
        <Else>
            SetHandler proxy:fcgi://127.0.0.1:9000
        </Else>
    </FilesMatch>

    DocumentRoot /var/www
    <Directory /var/www>
        # enable the .htaccess rewrites
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog "/dev/stderr"
    CustomLog "/dev/stdout" combined
    LogLevel warn
    ServerSignature Off
    SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
</VirtualHost>`,
};

const laravel: VhostConfig = {
    engine: "php",
    type: "laravel",
    name: "Laravel",
    description: "Laravel",
    readOnly: true,
    data: `<VirtualHost *:8080>
    ServerName default.localhost
    ServerAlias *

    <FilesMatch "\.php$">
        <If "%{HTTP_COOKIE} =~ /XDEBUG_SESSION/">
            SetHandler proxy:fcgi://127.0.0.1:\${PHPFPM_XDEBUG_PORT}
        </If>
        <Else>
            SetHandler proxy:fcgi://127.0.0.1:9000
        </Else>
    </FilesMatch>

    DocumentRoot /var/www/public
    <Directory /var/www/public>
        # enable the .htaccess rewrites
        AllowOverride All
        Require all granted
    </Directory>

    <Directory /var/www>
        Options FollowSymlinks
    </Directory>

    ErrorLog "/dev/stderr"
    CustomLog "/dev/stdout" combined
    LogLevel warn
    ServerSignature Off
    SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
</VirtualHost>`,
};

const symfony2: VhostConfig = {
    engine: "php",
    type: "symfony2",
    name: "Symfony 2",
    description: "Symfony 2",
    readOnly: true,
    data: `<VirtualHost *:8080>
    ServerName default.localhost
    ServerAlias *

    <FilesMatch "\.php$">
        <If "%{HTTP_COOKIE} =~ /XDEBUG_SESSION/">
            SetHandler proxy:fcgi://127.0.0.1:\${PHPFPM_XDEBUG_PORT}
        </If>
        <Else>
            SetHandler proxy:fcgi://127.0.0.1:9000
        </Else>
    </FilesMatch>

    DocumentRoot /var/www/web
    <Directory /var/www/web>
        # enable the .htaccess rewrites
        AllowOverride All
        Require all granted
    </Directory>

    <Directory /var/www>
        Options FollowSymlinks
    </Directory>

    ErrorLog "/dev/stderr"
    CustomLog "/dev/stdout" combined
    LogLevel warn
    ServerSignature Off
    SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
</VirtualHost>`,
};

const symfony3: VhostConfig = {
    engine: "php",
    type: "symfony3",
    name: "Symfony 3",
    description: "Symfony 3",
    readOnly: true,
    data: `<VirtualHost *:8080>
    ServerName default.localhost
    ServerAlias *

    <FilesMatch "\.php$">
        <If "%{HTTP_COOKIE} =~ /XDEBUG_SESSION/">
            SetHandler proxy:fcgi://127.0.0.1:\${PHPFPM_XDEBUG_PORT}
        </If>
        <Else>
            SetHandler proxy:fcgi://127.0.0.1:9000
        </Else>
    </FilesMatch>

    DocumentRoot /var/www/web
    <Directory /var/www/web>
        # enable the .htaccess rewrites
        AllowOverride All
        Require all granted
    </Directory>

    <Directory /var/www>
        Options FollowSymlinks
    </Directory>

    ErrorLog "/dev/stderr"
    CustomLog "/dev/stdout" combined
    LogLevel warn
    ServerSignature Off
    SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
</VirtualHost>`,
};

const symfony4: VhostConfig = {
    engine: "php",
    type: "symfony4",
    name: "Symfony 4",
    description: "Symfony 4",
    readOnly: true,
    data: `<VirtualHost *:8080>
    ServerName default.localhost
    ServerAlias *

    <FilesMatch "\.php$">
        <If "%{HTTP_COOKIE} =~ /XDEBUG_SESSION/">
            SetHandler proxy:fcgi://127.0.0.1:\${PHPFPM_XDEBUG_PORT}
        </If>
        <Else>
            SetHandler proxy:fcgi://127.0.0.1:9000
        </Else>
    </FilesMatch>

    DocumentRoot /var/www/public
    <Directory /var/www/public>
        # enable the .htaccess rewrites
        AllowOverride All
        Require all granted
    </Directory>

    <Directory /var/www>
        Options FollowSymlinks
    </Directory>

    ErrorLog "/dev/stderr"
    CustomLog "/dev/stdout" combined
    LogLevel warn
    ServerSignature Off
    SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
</VirtualHost>`,
};

const wordpress: VhostConfig = {
    engine: "php",
    type: "wordpress",
    name: "Wordpress",
    description: "Wordpress",
    readOnly: true,
    data: `<VirtualHost *:8080>
    ServerName default.localhost
    ServerAlias *

    <FilesMatch "\.php$">
        <If "%{HTTP_COOKIE} =~ /XDEBUG_SESSION/">
            SetHandler proxy:fcgi://127.0.0.1:\${PHPFPM_XDEBUG_PORT}
        </If>
        <Else>
            SetHandler proxy:fcgi://127.0.0.1:9000
        </Else>
    </FilesMatch>

    DocumentRoot /var/www
    <Directory /var/www>
        # enable the .htaccess rewrites
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog "/dev/stderr"
    CustomLog "/dev/stdout" combined
    LogLevel warn
    ServerSignature Off
    SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
</VirtualHost>`,
};

const custom: VhostConfig = {
    engine: "none",
    type: "custom",
    name: "Custom",
    description: "Create your own customized virtual host configuration",
    readOnly: false,
    data: `# Enter your custom vhost config here`,
};

const vhosts: VhostConfig[] = [
    fpm,
    html,
    drupal,
    laravel,
    symfony2,
    symfony3,
    symfony4,
    wordpress,
    custom,
];

export default vhosts;
