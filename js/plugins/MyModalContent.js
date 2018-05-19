
var MyModal = $.import('/v4/plugins/MyModal.js');
$.component('.MyModalContent', [MyModal], {
    confModal: ($self) => {
        $.super(MyModal, $self).confModal();
        var html = $self.$.html();
        html = html.replace(/lt;/g, '<');
        html = html.replace(/gt;/g, '>');
        html = html.replace(/&amp;/g, '');
        $self.$body = html;
    },
});