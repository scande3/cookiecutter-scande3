class DeviseCreateUsers < ActiveRecord::Migration[4.2]
  def change
    unless ActiveRecord::Base.connection.table_exists?("users")
      create_table("users") do |t|
        # From Devise
        t.integer  :sign_in_count, default: 0, null: false
        t.datetime :current_sign_in_at
        t.datetime :last_sign_in_at
        t.string   :current_sign_in_ip
        t.string   :last_sign_in_ip

        # From Contacts
        t.string  "username", limit: 20, null: false, index: true
        t.string  "name", limit: 64, null: false, index: true
        t.string  "display_name", limit: 64, null: false
        t.string  "email", limit: 64, null: true # Was false...

        # Default from rails
        t.timestamps null: false

        # Add basic admin field
        t.boolean "admin", default: false, null: false
      end

    end
  end
end
