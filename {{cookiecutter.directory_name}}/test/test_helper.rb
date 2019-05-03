require 'simplecov'
SimpleCov.start

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  VCR.configure do |c|
    c.cassette_library_dir = 'test/vcr_cassettes'
    c.hook_into :webmock
    c.ignore_localhost = true

    c.default_cassette_options = {
        record: :once,
        match_requests_on: %i(method uri body headers),
        re_record_interval: 30.days
    }
  end

  def setup_VCR(name)
    if ENV['VCR_OFF']
      WebMock.allow_net_connect!
      VCR.turn_off!
    else
      VCR.insert_cassette(name)
    end
  end

  def teardown_VCR
    if ENV['VCR_OFF']
      WebMock.disable_net_connect!
      VCR.turn_on!
    else
      VCR.eject_cassette
    end
  end
end
