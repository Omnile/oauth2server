#!/bin/sh
bin/ci.sh

echo ""
echo "Generating Documentation\r\n";


# Run the nodedoc and coverage generator
npm run document;

# Run the couscous static site generator
npm run couscous

# clone the project and climb into the directory and switch to the gh-pages branch
git clone https://www.github.com/omnile/oauth2server;

cd oauth2server;

git checkout gh-pages;

# Remove all files from the github pages folder
shopt -s extglob;
shopt -s dotglob nullglob;
rm -rf !(*.git);

# Make a directory for the generated doc and test coverage
mkdir -p ./api;
mkdir -p ./coverage;
touch .nojekyll;

# copy all files from the couscous generated folder into the empty github-pages branch folder
mv  -v ../docs/couscous/* ./;

# copy all files from the nodedoc generated folder into the api folder
mv  -v ../docs/typedoc/* ./api/;

# copy all files from the coverage generated folder into the coverage folder
mv  -v ../docs/coverage/* ./coverage/;

# Add all and commit to github if deploy was enabled
git add --all . && git add **/.* && git commit -m 'Gighub Pages Documentation Updated' && git push origin gh-pages;

rm -rf ./**;
