# cookiecutter-scande3

This a template for starting Rails application for myself. This template includes the following:
* A users table migration.
* [Devise](https://github.com/plataformatec/devise)
* [Bootstrap 3](https://github.com/twbs/bootstrap-rubygem)
* [Sidekiq](https://github.com/mperham/sidekiq)
* [VCR](https://github.com/vcr/vcr) for mocking out test data and testing setup.
* [Hist](https://github.com/scande3/hist) for object history.

## Installation

### Python Prerequisites (if needed)
#### Mac (Install Brew and Python and pip install cookiecutter)
    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    $ brew install python
    $ pip install cookiecutter  (if pip cannot be found, try using `pip3`)
    
### Ubuntu  (Install pip and pip install cookiecutter) 
    $ sudo apt install python-pip
    $ pip install cookiecutter  (if pip cannot be found, try using `pip3`)
    

### Rails Prerequisites (if needed)
#### Mac (Install Rails and Redis)
    $ brew install gnupg
    $ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
      \curl -sSL https://get.rvm.io | bash -s stable --rails
    $ brew install redis 

#### Ubuntu (Install rails and Redis)
    $ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
            \curl -sSL https://get.rvm.io | bash -s stable --rails
    $ sudo apt-get install redis        

## Getting Started
### Generate Project
    $ cookiecutter git@github.com:scande3/cookiecutter-scande3.git

This will create your application with the following sample files that can eventually be removed:
* [SampleController]({{cookiecutter.directory_name}}/app/controllers/sample_controller.rb)
* [Sample Index View]({{cookiecutter.directory_name}}/app/views/sample/index.html.erb)
* [Default Navigation]({{cookiecutter.directory_name}}/app/views/shared/_header_navbar.html.erb)
* [VCR Test]({{cookiecutter.directory_name}}/test/models/vcr_test.rb)
* [Sample Test]({{cookiecutter.directory_name}}/test/system/sample_test.rb)

All documentation on running your project will be generated to your project's README.md with the raw version
viewable at:
* [Project README.md]({{cookiecutter.directory_name}}/README.md)

## Docker

Files for running a docker container are to be added to this template shortly.

