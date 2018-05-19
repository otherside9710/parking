$.component("[clean-form-error]",[],{
    CLEAN_FORM_ERROR:"clean-form-error",
    init: ($self) => {
        $("input,textarea"). on("change", function () {
            $self.refresh();
        });
    },

    refresh: $.anottate($.Export, ($self) => {
        if ($self.$.validate().checkForm()) {
            $self.$.find("input.error, label.error").each(function (index, ui) {
                if (ui.tagName === 'LABEL' && (ui.className.includes("error") || $(ui).attr('id').includes("-error"))){
                    $(ui).remove();
                }
                $(ui).removeClass('error');
            })
        }

    })
});