/*
 * @author: Julio Peña
 */
var MyMessage = $.import("/v4/plugins/MyMessage.js");

$.component(".MyResponse", [MyMessage], {

    RESPONSE_404_TITLE : "404",
    RESPONSE_404_CONTENT : "Elemento no encontrado",

    init: ($self) => {
        $.super(MyMessage, $self).init();
    },

    listen: ($self, event, status) => {
        if(status == 400){
            $self.$message_type = "info";
            $self.$message_title = $self.RESPONSE_404_TITLE;
            $self.$message_content = $self.RESPONSE_404_CONTENT;
            $self.showMessage();
        }
    }

});