class User < ApplicationRecord
  devise :remote_user_authenticatable, :trackable
  alias_attribute :email_address, :email

  def thumbnail_url

  end

  def first_name
    self.display_name.split(" ").first
  end

  def to_s
    username
  end

  # Added to make Warden's login_as happy in rspec
  def authenticatable_salt
  end

  def admin?
    admin
  end

  def url

  end

end
