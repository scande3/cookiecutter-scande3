// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
// require jquery3
//= require jquery
// require popper
// require bootstrap
// Required by Blacklight
//= require blacklight/blacklight
//= require blacklight_gallery/default
//= require openseadragon/openseadragon
//= require openseadragon/rails
//= require blacklight_range_limit
//= require blacklight_advanced_search
//= require 'bootstrap/tooltip'
//= require 'bootstrap/popover'
//= require 'bootstrap/button'
//= require 'bootstrap/collapse'
//= require 'bootstrap/tab'
//= require onmount
//= require font_awesome5
//= require ace-rails-ap
//= require ace/mode-json
//= require ace/mode-yaml
//= require ace/mode-text
//= require_tree .

$(document).on('ready turbolinks:load', function () { $.onmount() })
$(document).on('turbolinks:before-cache', function () { $.onmount.teardown() })
