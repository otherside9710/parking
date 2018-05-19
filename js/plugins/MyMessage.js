/*Dev by Julio Peña*/
var MyListener = $.import("/v4/plugins/MyListener.js");

$.component(".MyMessage", [MyListener], {
    AUTOSTART: "autostart",
    MESSAGE_TITLE: "message-title",
    MESSAGE_CONTENT: "message-content",
    MESSAGE_TYPE: "message-type",
    MESSAGE_POSITION : "message-position",

    init: ($self) => {
        $.super(MyListener, $self).init();
        $self.$autostart = $self.$.attr($self.AUTOSTART);
        $self.$message_title = $self.$.attr($self.MESSAGE_TITLE);
        $self.$message_content = $self.$.attr($self.MESSAGE_CONTENT);
        $self.$message_type = $self.$.attr($self.MESSAGE_TYPE);
        $self.$message_position = $self.$.attr($self.MESSAGE_POSITION);

        if ($self.$autostart) {
            $self.showMessage();
        }
        $self.buttonClick();
    },

    showMessage: $.anottate($.Export, ($self, message) => {
        var configuration = $self.conf(message);
        switch ($self.$message_type) {
            case 'warning':{
                iziToast.warning(configuration);
                break;
            }
            case 'success':{
                iziToast.success(configuration);
                break;
            }
            case 'error':{
                iziToast.error(configuration);
                break;
            }
            case 'info':{
                iziToast.info(configuration);
                break;
            }

        }

    }),

    buttonClick: ($self) => {
        $self.$.on("click", function (event) {
            $self.showMessage($self);
            event.stopPropagation();
        });
    },

    conf: ($self, message) =>{
        var config = {
            close: true,
            timeout: 3000,
            position: $self.$message_position ? $self.$message_position : 'center',
            title: $self.$message_title ? $self.$message_title : false,
            message: message ? message : $self.$message_content
        };
        return config
    },

    listen: ($self, event, message) => {
        $self.showMessage(message);
    }

});