/*
 * @author: Julio Peña
 */
$.component(".MyLoading", [], {
    AUTOSTART:  "autostart",
    init: ($self) => {
        $self.$autostart = $self.$.attr($self.AUTOSTART); 
        if ($self.$autostart) {
            $self.cargarGif($self);
        }        
    },

    cargarGif: $.anottate($.Export, ($self) => {
        var load = "<style type=\"text/css\">\n" +
            "\t\t.sk-spinner-circle.sk-spinner {\n" +
            "\t\t    margin: 0 auto;\n" +
            "\t\t    width: 122px;\n" +
            "\t\t    height: 122px;\n" +
            "\t\t    position: relative;\n" +
            "\t\t}\n" +
            "\t\t#over_loading{\n" +
            "\t\t\tposition: fixed;\n" +
            "\t\t\tleft:0px;\n" +
            "\t\t\tright: 0px;\n" +
            "\t\t\tbottom: 0px;\n" +
            "\t\t\ttop: 0px;\n" +
            "\t\t\tbackground-color: rgba(20, 20, 20, .7);\n" +
            "\t\t\tz-index: 10000;\n" +
            "\t\t\tdisplay: flex;\n" +
            "\t\t\talign-items: center;\n" +
            "\t\t}\n" +
            "\t</style>\n" +
            "\t<div id=\"over_loading\">\n" +
            "\t\t<div class=\"sk-spinner sk-spinner-circle\">\n" +
            "\t\t    <div class=\"sk-circle1 sk-circle\"></div>\n" +
            "\t\t    <div class=\"sk-circle2 sk-circle\"></div>\n" +
            "\t\t    <div class=\"sk-circle3 sk-circle\"></div>\n" +
            "\t\t    <div class=\"sk-circle4 sk-circle\"></div>\n" +
            "\t\t    <div class=\"sk-circle5 sk-circle\"></div>\n" +
            "\t\t    <div class=\"sk-circle6 sk-circle\"></div>\n" +
            "\t\t    <div class=\"sk-circle7 sk-circle\"></div>\n" +
            "\t\t    <div class=\"sk-circle8 sk-circle\"></div>\n" +
            "\t\t    <div class=\"sk-circle9 sk-circle\"></div>\n" +
            "\t\t    <div class=\"sk-circle10 sk-circle\"></div>\n" +
            "\t\t    <div class=\"sk-circle11 sk-circle\"></div>\n" +
            "\t\t    <div class=\"sk-circle12 sk-circle\"></div>\n" +
            "\t\t</div>\n" +
            "\t</div>";
        $self.$.html("");
        $self.$.append(load);
    }),

    removeLoad: $.anottate($.Export, ($self) => {
        $("#over_loading").remove();
    })
});