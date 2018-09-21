#!/bin/bash

# ----------------------
# Docker Build &  Deployment Script
# ----------------------

# Helpers
# -------

DOCKER_IMAGE=""
DOCKER_NAME=""
DOCKER_TAG="v1"
DOCKER_REPOSITORY="serviceo.azurecr.io"
APP_NAME=""
APP_MODE=""
PROD_DEPLOY_URL="https://sfappstoragegp.blob.core.windows.net/webapp-msp-dev/"

exitWithMessageOnError () {
  if [ ! $? -eq 0 ]; then
    echo "ERROR! An error has occurred during docker build & deployment."
    echo $1
    exit 1
  fi
}

message () {
    echo ">>> ${1}"
}

errorMessage () {
    echo "ERROR! ${1}"
}

# Prerequisites
# -------------

# Check if the docker directory exists
if [[ ! -d "deployment/${1}" ]]; then
    errorMessage "Docker configuration directory doesn't exist"
    exit 1
else
    DOCKER_IMAGE=${1}
fi

# Check if docker configuration file exists
if [[ ! -f "deployment/${1}/Dockerfile" ]]; then
    errorMessage "Docker configuration file doesn't exist"
    exit 1
fi

# Build process
if [[ -n ${2} ]]; then
    DOCKER_NAME=${2}
    message "Docker image name set to '${DOCKER_NAME}'"
else
    errorMessage "Provide docker image name as second argument"
    exit 1
fi

# Build process
if [[ -n ${3} ]]; then
    DOCKER_TAG=${3}
    message "Docker image tag set to '${DOCKER_TAG}'"
else
    errorMessage "Provide docker image name as second argument"
    exit 1
fi

if [[ -n ${4} ]]; then
    APP_MODE=${4}
    message "Building for '${4}' environment"
else
    errorMessage "Provide environment name to build for. Options are: development, staging or production"
    exit 1
fi

if [[ -n ${5} ]]; then
    APP_NAME=${5}
    message "Building '${5}' app"
else
    errorMessage "Provide app name to build for. Options are: msp, community or admin"
    exit 1
fi

# Remove dist directory if it exists
if [[ -d "dist-${APP_NAME}" ]]; then
    message "Removed existing application build files..."
    rm -rf dist-${APP_NAME} 
    rm -rf deployment/${DOCKER_IMAGE}/dist
fi

# Update version number and build number
APP_VERSION=`grep version package.json | cut -d':' -f2 | cut -d'"' -f2`
BUILD_DATE=`date -u '+%Y%m%d-%H%M'`
echo "export const APP_VERSION = '${APP_VERSION}';" > src/${APP_NAME}/version.ts
echo "export const BUILD_DATE = '${BUILD_DATE}';" >> src/${APP_NAME}/version.ts
echo '' >> src/${APP_NAME}/version.ts

# Run angular build
message "Building angular app..."
if [ ${APP_MODE} == 'production' ]; then
#    CMD="./node_modules/.bin/ng build --deploy-url 'https://sfappstoragegp.blob.core.windows.net/webapp-${APP_MODE}/' --environment=${APP_MODE} --app=${APP_NAME}"
    CMD="./node_modules/.bin/ng build --environment=${APP_MODE} --app=${APP_NAME}"
else 
    CMD="./node_modules/.bin/ng build --environment=${APP_MODE} --app=${APP_NAME}"
fi
echo ${CMD}
${CMD}
exitWithMessageOnError "Angular app build failed."

# # Copy build to docker image configuration directory
# message "Copying angular app build to '${DOCKER_IMAGE}'..."
# mkdir deployment/${DOCKER_IMAGE}/dist
# cp -r dist-${APP_NAME}/* deployment/${DOCKER_IMAGE}/dist/
# exitWithMessageOnError "Failed to copy angular build files to docker image directory."

# cd deployment/${DOCKER_IMAGE}
# message "Building docker image..."
# docker build -t ${DOCKER_NAME} .
# exitWithMessageOnError "Failed to build docker image"

# message "Tagging docker image..."
# docker tag ${DOCKER_NAME} ${DOCKER_REPOSITORY}/${DOCKER_NAME}:${DOCKER_TAG}
# exitWithMessageOnError "Failed to tag docker image"

# message "Uploading docker image to ACR..."
# docker push ${DOCKER_REPOSITORY}/${DOCKER_NAME}:${DOCKER_TAG}
# exitWithMessageOnError "Failed to push the document to Azure Container Registry (ACR)"

# az storage blob upload-batch -d webapp-msp-dev -s dist-msp --content-cache-control "no-cache, no-store, must-revalidate" --account-key $AZURE_STORAGE_ACCESS_KEY --account-name $AZURE_STORAGE_ACCOUNT

echo "Finished successfully."
