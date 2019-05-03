//= require select2-full
$.onmount("[data-js-select-picker]", function () {
    var picker = $(this);

    var per_page = 50;
    picker.select2({
        ajax: {
            url: $(this).attr('data-endpoint'),
            delay: 250,
            dataType: "json",
            data: function (params) {
                return {
                    q: params.term,
                    page: params.page,
                    per_page: per_page,
                    param1: $(this).attr('data-param1'),
                    param2: $(this).attr('data-param2')
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;

                return {
                    results: data.items,
                    pagination: {
                        more: (params.page * per_page) < data.total_count
                    }
                };
            },
            cache: true
        },
        theme: "bootstrap",
        minimumInputLength: 1,
        allowClear: !$(this).attr("data-no-clear"),
        placeholder: $(this).attr("data-placeholder"),
        //dropdownParent: $("#doc-review-page-modal"),
        dropdownParent: $($(this).attr("data-parent")),
        width: "100%",
        templateResult: eval($(this).attr("data-rtemplate")),
        templateSelection: eval($(this).attr("data-stemplate"))
    });

    picker.parents("form").on("reset", function () {
        picker.val('').trigger('change');
    });

    if ($(this).attr('data-initial'))
    {
        picker.val($(this).attr('data-initial')).trigger('change');
    }

    var select2Instance = $(picker).data('select2');
    select2Instance.on('results:message', function(params){
        this.dropdown._resizeDropdown();
        this.dropdown._positionDropdown();
    });
});

function defaultSelect2Template (content) {
    return content.text
};

function usersSelect2Template_old (content) {
    if(!content.id) {
        return content.text;
    }
    var baseUrl = "https://contacts.akamai.com/photos/";
    //content.element.value.toLowerCase()
    var $content = $(
        '<span><img src="' + baseUrl + content.username + '.jpg" class="img-circle img-select2-small" /> ' + content.text + '</span>'
    );
    return $content;
};

function documentsSelect2STemplate (content) {
    if(!content.id) {
        return content.text;
    }
    var baseUrl = "https://contacts.akamai.com/photos/";
    //content.element.value.toLowerCase()
    var $content = $(
        '<span><img src="' + content.text.split("||")[1] + '" class="img-select2-small" /> ' + content.text.split("||")[0] + '</span>'
    );
    return $content;
};

function documentsSelect2RTemplate (content) {
    if(!content.id) {
        return content.text;
    }
    var baseUrl = "https://contacts.akamai.com/photos/";
    //content.element.value.toLowerCase()
    build_content = '<div class="img-select2-large">' + '<img src="' + content.text.split("||")[1] + '" class="img-select2-large" /></div>';
    build_content = build_content + '<div class="details-select2-large"><strong>' + content.text.split("||")[0] + '</strong><br />' + content.text.split("||")[2] + '</div><div style="clear:both;"></div>'

    var $content = $(build_content);
    return $content;
};

function usersSelect2Template (content) {
    if(!content.id) {
        return content.text;
    }
    var baseUrl = "https://contacts.akamai.com/photos/";
    if(content.text.split(":")[1] == 'Group') {
        var $content = $(
            '<span><img src="http://www.midhudsonacs.org/uploads/4/5/3/3/4533608/7862976_orig.png" class="img-circle img-select2-small" /> ' + content.text.split(":")[0] + '</span>'
        );
    } else if(content.text.split(":")[1] == 'Department') {
        var $content = $(
            '<span><img src="https://cdn3.iconfinder.com/data/icons/e-commerce-8/91/group-512.png" class="img-circle img-select2-small" /> ' + content.text.split(":")[0] + '</span>'
        );
    } else {
        var $content = $(
            '<span><img src="' + baseUrl + content.text.split(":")[1] + '.jpg" class="img-circle img-select2-small" /> ' + content.text.split(":")[0] + '</span>'
        );
    }
    //content.element.value.toLowerCase()

    return $content;
};
