/*
 * @author: Julio Peña
 */
var MyListener = $.import("/v4/plugins/MyListener.js");

$.component(".MyListenerSon", [MyListener], {
    MESSAGE: "message",

    init: ($self) => {
        $self.$message = $self.$.attr($self.MESSAGE);
        $.super(MyListener, $self).init();
        $self.$parent.on("change", function () {
            $(this).next('label.error').remove();
            $(this).removeClass("error");
        });
    },

    listen: ($self, event) => {
        var label = "<label class='error'>" + $self.$message + "</label>";
        $(event.target).addClass("error");
        $(label).insertAfter(event.target);
    }
});