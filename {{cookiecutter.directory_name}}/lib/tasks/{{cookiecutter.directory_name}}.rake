task sync_users: :environment do
  UserSyncWorker.perform_async
end
