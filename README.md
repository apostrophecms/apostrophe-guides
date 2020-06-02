# apostrophe-module-boilerplate

A starting point for open source modules and bundles.

## Get Started
```sh
# Clone this repo:
$ git clone --depth=1 https://github.com/apostrophecms/apostrophe-boilerplate-module.git MYMODULE

#  Then remove git refs:
$ rm -rf !$/.git

# Then init and commit:
$ cd MYMODULE
$ git init
$ git add -A
$ git commit -m "Initial commit generated from module boilerplate"
$ git remote add origin https://github.com/apostrophecms/REPO-NAME.git
$ git push -u origin master
```

Be sure to update name, etc in `package.json`