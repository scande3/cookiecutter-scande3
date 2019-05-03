class SampleWorker
  include Sidekiq::Worker
  sidekiq_options unique: :until_and_while_executing

  def perform
    # Stuff here
  end

end
