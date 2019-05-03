Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "sample#index"

  require 'sidekiq/web'
  require 'tilt/erb' # Required for sidekiq-statistic to work
  require 'sidekiq-statistic'
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end
  Sidekiq::Web.set :session_secret, Rails.application.secrets[:secret_key_base]

  #################################
  # Routes Required By Blacklight #
  #################################

  #####################################################################
  # The are defined by Blacklight but were giving errors with new nav #
  #####################################################################
  get "search_history",             :to => "search_history#index",   :as => "search_history"
  delete "search_history/clear",       :to => "search_history#clear",   :as => "clear_search_history"
  delete "saved_searches/clear",       :to => "saved_searches#clear",   :as => "clear_saved_searches"
  get "saved_searches",       :to => "saved_searches#index",   :as => "saved_searches"
  put "saved_searches/save/:id",    :to => "saved_searches#save",    :as => "save_search"
  delete "saved_searches/forget/:id",  :to => "saved_searches#forget",  :as => "forget_search"
  post "saved_searches/forget/:id",  :to => "saved_searches#forget"
  # Defined by Blacklight advanced search
  get 'advanced' => 'advanced#index', as: 'advanced_search'
  #####################################################################
  # End                                                               #
  #####################################################################

  # Required by Blacklight
  concern :range_searchable, BlacklightRangeLimit::Routes::RangeSearchable.new
  concern :searchable, Blacklight::Routes::Searchable.new

  resource :catalog, only: [:index], as: 'catalog', path: '/catalog', controller: 'catalog' do
    concerns :searchable
    concerns :range_searchable
  end

  concern :exportable, Blacklight::Routes::Exportable.new

  resources :solr_documents, only: [:show], path: '/document', controller: 'catalog' do
    concerns :exportable
  end

  resources :bookmarks do
    concerns :exportable

    collection do
      delete 'clear'
    end
  end
  # End required by Blacklight

  # user authentication
  devise_for :users
end
