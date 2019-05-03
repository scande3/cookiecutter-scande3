class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  def authenticate_user!
    if request.headers["HTTP_REMOTE_USER"].blank? && (Rails.env.to_s == "development" || Rails.env.to_s == "test")
      sign_in(:user, User.find_by(username: Settings.development_user))
    else
      super
    end
  end

end
