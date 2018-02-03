#!/bin/sh

# This Shell file will and run the couscous generator using PHP

# Get couscous if it does not exist.
[ -e couscous.phar ] && echo "Couscous found\r\n" || curl -O http://couscous.io/couscous.phar | php;

# Run the generator
php couscous.phar generate --target=./docs/couscous;
