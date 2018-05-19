
var MyTagsInputs = $.import('/v4/plugins/MyTagsInputs.js');
var MyAutocompleteSon = $.import("/v4/plugins/MyAutocompleteSon.js");

$.component('.MyTagsInputsSon', [MyTagsInputs, MyAutocompleteSon], {
   init: ($self) => {
       $.super(MyAutocompleteSon, $self).init();
       $.super(MyTagsInputs, $self).init();
   },

    assign:($self, value) => {
        $self.$.tagsinput('add', value);
    }
});