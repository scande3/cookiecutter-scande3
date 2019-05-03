// initialize the bootstrap popovers
$.onmount("a[data-toggle=popover]", function () {
    $(this).popover({html: true})
        .click(function () {
            return false;
        });
});

function duplicate_field_click(event) {
    // Get the top root element than find the correct child element within that
    original_element = $(event.target).closest(".field-wrapper").find('.duplicateable');
    is_autocomplete_select2 = $(original_element).is("[endpoint]");

    if(is_autocomplete_select2) {
        cloned_element = $(event.target).parent().parent().parent().clone();
        cloned_element.find("span.select2-selection").remove();
    } else {
        cloned_element = $(event.target).parent().parent().parent().clone(true, true);
    }

    cloned_element.find("input").val("");
    cloned_element.find("textarea").val("");
    cloned_element.find("select").val("");

    // Remove any initial values
    if(is_autocomplete_select2) {
        $(cloned_element).find('.duplicateable').removeAttr('data-initial_value');
        $(cloned_element).find('.duplicateable').removeAttr('data-initial');
    }

    //Insert after the root element
    $(event.target).closest(".field-wrapper").after(cloned_element);

    // Cloned elements with the select2 code need to have the duplicate buttons re-initialized
    if(is_autocomplete_select2) {
        $.onmount(); // Re-initialize the onclick handlers
    }
}

function delete_field_click(event) {
    original_element = $(event.target).closest(".field-wrapper").find('.duplicateable');
    is_autocomplete_select2 = $(original_element).is("[endpoint]");

    local_field_name = $(original_element).attr('name');

    if ($('input[name*="' + local_field_name + '"]').length == 1) {
        $(original_element).val("");
    } else if($('select[name*="' + local_field_name + '"]').length == 1) {
        if(is_autocomplete_select2 === true) {
            $(original_element).val(null).trigger('change');
        } else {
            $(original_element).val("");
        }
    } else {
        // There is more than one of these so allow the removal
        $(event.target).closest(".field-wrapper").remove();
    }
}

$.onmount("[data-js-duplicate-audits-field]", function () {
    $(this).click(duplicate_field_click);
});

$.onmount("[data-js-delete-audits-field]", function () {
    $(this).click(delete_field_click);
});

$.onmount("[data-js-select-all-fields]", function () {
    var checkbox = $(this);

    $(checkbox).click(function() {
        var checked = $(this).prop('checked');
        $("input[name='" + $(this).attr('data-field-name') + "']").each(function() {
            $(this).prop('checked', checked);
        })
    });
});

$.onmount("[data-js-toggle-disable-form-field]", function () {
    var checkbox = $(this);

    // Set Default State
    if($(this).prop('checked')) {
        $("textarea[name='" + $(this).attr('data-field-name') + "']").each(function() {
            $(this).prop('disabled', true);
        });

        // Check all other input field types
        $("input[name='" + $(this).attr('data-field-name') + "']").each(function() {
            $(this).prop('disabled', true);
        })
    }

    $(checkbox).click(function() {
        var checked = $(this).prop('checked');

        // Handle textarea fields
        $("textarea[name='" + $(this).attr('data-field-name') + "']").each(function() {
            $(this).prop('disabled', checked);
        });

        // Check all other input field types
        $("input[name='" + $(this).attr('data-field-name') + "']").each(function() {
            $(this).prop('disabled', checked);
        })
    });
});

$.onmount("[data-js-toggle-visibility-area]", function () {
    var checkbox = $(this);

    // Initialize shown or not shown
    if($(this).prop('checked')) {
        $($(this).attr('data-js-toggle-visibility-area')).hide();
    } else {
        $($(this).attr('data-js-toggle-visibility-area')).show();
    }

    // Set the onlick listener
    $(checkbox).click(function() {
        var checked = $(this).prop('checked');
        if(checked) {
            $($(this).attr('data-js-toggle-visibility-area')).hide();
        } else {
            $($(this).attr('data-js-toggle-visibility-area')).show();
        }
    });
});

/* Doesn't seem to work? */
$.onmount("[data-js-switch-tab-if-errors]", function () {
    var submit_btn = $(this);

    $(submit_btn).click(function() {
        $('input:invalid').each(function () {
            // Find the tab-pane that this element is inside, and get the id
            var $closest = $(this).closest('.tab-pane');
            var id = $closest.attr('id');

            // Find the link that corresponds to the pane and have it show
            $('.nav a[href="#' + id + '"]').tab('show');

            // Only want to do it once
            return false;
        });
    });
});

