# {{cookiecutter.camel_case_name}}

{{cookiecutter.project_short_description}}

## Installation

    $ git clone myrepo
    $ cd {{cookiecutter.directory_name}}
    $ cp config/database.yml.sample config/database.yml
    $ cp config/{{cookiecutter.directory_name}}.yml.sample config/{{cookiecutter.directory_name}}.yml
    $ bundle install
    $ rake db:migrate
    $ rake db:seed

## Getting Started

### Setup for development user login
There are two methods to support the local login of users:
1. The application comes with a `{{cookiecutter.directory_name}}.yml` file that is loaded by the `lib/settings.rb` file. This has a
"development_user" entry that one can set to one's username that will work in a development / test environment only.
This should have been populated with your username from this project's setup.

2. You can install the [ModHeader extension[(https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj) for Google Chrome to set a header of `REMOTE_USER` to a value of your username.


## Sidekiq information
Sidekiq does require redis to run and one can install that on the mac with: `brew install redis`

You can start a local sidekiq worker for development testing with: `bundle exec sidekiq`

If running a server with just `rails s`, you can access the sidekiq console if one is an admin at: `http://localhost:3000/sidekiq`.
By default, there is a boolean admin flag on the user account one can set. One can override the admin logic by changing what is in
`def admin?` in `app/models/user.rb`. ***NOTE:*** There is a bug where if one is unauthenticated, it will simply redirect one to the
root path of the application where one will then get a valid application session. One can then access the sidekiq url at this point if
one is an admin.

An example of setting an admin is:
    $ user = User.find_by(username: '{{cookiecutter.username}}')
    $ user.admin = true
    $ user.save!

## Testing Information

### Running System Tests

These tests are located in test/system. You run these from the {{cookiecutter.directory_name}} directory root with:
`rails test:system`

By default, the person who created this, ({{cookiecutter.username}}), had been created in the `test/fixtures/users.yml` file.

### Running Normal Tests

These tests are located in test/system. You run these from the {{cookiecutter.directory_name}} directory root with:
`rake`


### Include Components / Other Testing Info
#### SimpleCov

SimpleCov will generate a coverage report at `coverage/index.html` upon completion of running a test suite. You can
view that HTML file in your browser.

#### VCR Setup

See the `test/models/vcr_test.rb` for an example that will cache any external http requests so tests
can be run locally and quicker.

#### VCR Information

VCR autmatically caches remote requests for you to allow tests to be run offline (see:
https://github.com/vcr/vcr ).

VCR is configured to keep tests for 30 days via its settings in `test_helper.rb` but that value can be adjusted to meet
your projects needs. You can force re-recording of these cassettes by changing `record: :new_episodes,` to
`record: :all,` in `test/test_helper.rb`

To run the test suite without any caching of those external service responses, set an
environment variable of VCR_OFF equalt to true such as the following command:
`VCR_OFF=true rake`