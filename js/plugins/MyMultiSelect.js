var MySelect = $.import("/v4/plugins/MySelect.js");

$.component(".MyMultiSelect",[MySelect],{
    MULTIPLE:"multiple",
    init:($self) => {
        $self.$.attr($self.MULTIPLE,"");
        $self.widget();
        $.super(MySelect, $self).init();
    },

    widget: ($self) => {
        $self.$.chosen();
    },

    content:($self, response, fields, filter) => {
        $.super(MySelect, $self).content(response, fields, filter);
        $self.$.trigger("chosen:updated");
    },

    getValue: $.anottate($.Export, ($self) => {
        var selected = [];
        $self.$.find("option").each(function (index, ui) {
            var value = $(ui).attr("value");
            if ($(ui).prop("selected")){
                selected.push(value);
            }
        });
        return selected;
    }),

    setValue: $.anottate($.Export, ($self, selectd) => {
        if (!selectd){
            selectd = "[]";
        }

        console.log("ddd");
        selectd = $.parseJSON(selectd);
        $self.$.find("option").each(function (index, ui) {
            var value = $(ui).attr("value");
            $(ui).prop("selected", selectd.indexOf(value) >= 0);
        });
        $self.$.trigger("chosen:updated");
        return selectd;
    }),

    defaultValue:($self) => {
        var selectd = $self.$.attr($self.SELECTVALUE);
        if (selectd && selectd !== ""){
            $self.$.setValue(selectd);
        }
    },
});