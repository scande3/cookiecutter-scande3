require 'test_helper'

class VcrTest < ActiveSupport::TestCase
  setup do
    self.setup_VCR(File.join(self.class.name, self.name))
  end

  test "content from akamai" do
    response = RestClient::Request.execute(method: 'GET', url: 'https://www.akamai.com')
    assert(response.body.include? 'Akamai')
  end

  teardown do
    self.teardown_VCR
  end
end
