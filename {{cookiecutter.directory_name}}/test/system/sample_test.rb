require "application_system_test_case"

class SampleTest < ApplicationSystemTestCase
  test "visiting the index" do
    visit "/"

    assert_selector "h1", text: "Welcome to this lovely sample page!"
  end
end
