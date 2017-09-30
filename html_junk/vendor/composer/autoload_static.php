<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitacb15c16c7ce8a1e817caafdd702470f
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitacb15c16c7ce8a1e817caafdd702470f::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitacb15c16c7ce8a1e817caafdd702470f::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
