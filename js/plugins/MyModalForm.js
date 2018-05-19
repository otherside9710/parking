
var MyModal = $.import('/v4/plugins/MyModal.js');
var MyListener = $.import('/v4/plugins/MyListener.js');
var MyForm = $.import('/v4/plugins/MyForm.js');
var GLOVAL = 0;
$.component('.MyModalForm', [MyModal, MyListener, MyForm], {
    MODAL_SAVE : "modal-save",
    MODAL_CANCEL : "modal-cancel",
    ACTION : "action",
    FORM_CLASS : "form-class",

    init: ($self) => {
        $self.$idform = "form" + (GLOVAL++);
        $self.$action = $self.$.attr($self.ACTION);
        $self.$form_class = $self.$.attr($self.FORM_CLASS);
        $.super(MyModal, $self).init();
        $.super(MyForm, $self).init();
        $.super(MyListener, $self).init();
        $self.$.attr("method", "post");
    },

    getForm: ($self) => {
        return $self.$modal?$self.$modal.find('form'): $([]);
    },

    confModal: ($self) => {
        $.super(MyModal, $self).confModal();
        $self.$.hide();
        $self.$modal_save = $self.$.attr($self.MODAL_SAVE);
        $self.$modal_cancel = $self.$.attr($self.MODAL_CANCEL);

        $self.$footer = $self.modalButtons();

    },

    eventModal: ($self) => {
        $self.submitForm();
        $self.$modal.find(".submit").on('click', function () {
            $self.getForm().trigger('submit');
            return false;
        });
        $self.$.on('on-success', function () {
            $self.$modal.modal('hide');
        });
    },

    show: $.anottate($.Export, ($self) => {

        $self.$body = $self.modalForm();
        var modal = $.super(MyModal, $self).show();
        $self.eventModal();
        return modal;
    }),

    modalForm: ($self) => {
        var body = $self.$.html();
        var form = "<form id='" + $self.$idform + "' action=" + $self.$action + " class='" + $self.$form_class + "' method='post'>"
                        + body +
                    "</form>";
       return form;
    },

    modalButtons: ($self) => {
      var save = "<button type=\"button\" class=\"btn btn-primary submit MyEnable\" disable-if=\"!$('#" + $self.$idform + "').validate().checkForm()\" >" + $self.$modal_save+ "</button>";
      var cancel = "<button type=\"button\" class=\"btn btn-white\" data-dismiss=\"modal\">" + $self.$modal_cancel  + "</button>";
      return ($self.$modal_cancel?cancel:"") + ($self.$modal_save?save: "");
    },

    listen: ($self) => {
        $self.show();
    }

});