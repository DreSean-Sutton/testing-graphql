#!/bin/sh

set -e

# shellcheck source=/dev/null
test -f .env && . .env

psql -f database/schema.sql -f database/data.sql
