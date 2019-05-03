class Settings
  def self.default_config
    @default_config ||= YAML.load_file(File.join(Rails.root, "config", "{{cookiecutter.directory_name}}.yml"))[Rails.env.to_s]
    raise "{{cookiecutter.directory_name}} configuration yml file seems to not exist" if @default_config.nil?
    @default_config
  end

  def self.development_user
    @development_user ||= Settings.default_config["development_user"]
    @development_user
  end
end
