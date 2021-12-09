#!/bin/bash
echo ;
if [ -z "$EXTENSION_NAME" ] ; then
    echo "WARN: EXTENSION_NAME variable is not set. Set this as the name of the extension for more specific package naming.";
    export EXTENSION_NAME=ext
fi
if [ $# == 0 ] ; then
    echo "ERROR: What is the version number? Enter it as the first arg1, like 0.4.3";
    echo ;
    echo "Usage: "
    echo "make.sh VERSION_NUMBER"
    echo ;
    exit;
fi
#export CURDIR=`pwd`
mkdir -p dist
zip -r dist/$EXTENSION_NAME.zip . -x '*.git*' \*.sh '*dist*' \README.md '*test*' 'package*.json' 'node_modules*' '.DS_Store' '.vscode*'
#echo Changing back to directory $CURDIR 
#cd $CURDIR

