var MyEdittableSon = $.import("/v4/plugins/MyEdittableSon.js");

$.component('.MyEdittableFormSon', [MyEdittableSon], {
    SWC:0,
    loadTable: ($self) => {
        if ($self.valid()) {
            $self.SWC = 0;
            var $parent = $self.getParent();
            var data = $.serialize($parent);
            $self.$table.ajax.url($self.$ajax + "?" + data).load();
            $self.$.attr("value-data", data);
            $self.$.trigger('on-loadtable');
        }
    },

    parentEvents:($self) => {

    },

    valid: ($self) => {
        return true;
    }
});