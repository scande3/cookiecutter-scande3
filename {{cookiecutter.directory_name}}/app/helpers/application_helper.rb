module ApplicationHelper
  # Render a bootstrap navbar drop down item link
  def nav_dropdown_item_link(text, path, link_args={})
    content_tag(:li, link_to(*link_args), class: "nav-item")

    link_args[:class] = "dropdown-item #{link_args[:class] || ''}"

    content_tag(:li, link_to(text, path, link_args), class: "nav-item")
  end

  # Render a bootsrap navbar top-level link, including the "active" class if current page.
  def nav_link(text, path, link_args={})
    if path.kind_of? Array
      current = path.any? do |p|
        current_page?(p)
      end
      path = path[0]
    else
      current = current_page?(path)
    end

    link_args[:class] = "#{current ? 'active' : ''} nav-link #{link_args[:class] || ''}"

    content_tag(:li, link_to(text, path, link_args), class: "nav-item")
  end

  def image_dropdown(source, image_options:{}, link_html_options:{}, &block)
    render layout: "partials/image_dropdown", locals: {link_html_options: link_html_options, source: source, image_options: image_options}, &block
  end

  def icon_dropdown(icon, count=nil, counter_html_options:{}, link_html_options:{}, &block)
    render layout: "partials/icon_dropdown", locals: {counter_html_options: counter_html_options, link_html_options: link_html_options, icon: icon, count: count}, &block
  end
end
