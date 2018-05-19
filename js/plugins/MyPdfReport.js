/**
 *
 */
var MyAjax = $.import("/v4/plugins/MyAjax.js");
$.component(".MyPdfReport", [], {
    PARENT:"parent",
    AJAX:"ajax",
    DEFAULT_EVENT:"operationComplete",
    MODAL_ID:"pdf-print-modal",
    LISTEN_TO:"listen-to",
    EVENT:"event",
    EMPTY_REPORT:"empty-report",
    init:($self) => {
        $self.$event = $self.$.attr($self.EVENT);
        $self.$listen_to = $self.$.attr($self.LISTEN_TO);
        $self.createDialog();
        $self.events();
    },

    events:($self) => {
        $($self.$listen_to).on($self.$event ? $self.$event : $self.DEFAULT_EVENT, function(){
            var value = $self.$.val();
            if (value) {
                //parent form with data to send
                var $parent = $self.getParent();
                var ajax = $self.$.attr($self.AJAX);
                if (!$parent) {
                    console.error("parent not exist");
                }
                else {
                    //data to send controller
                    var data = $self.getSerializedData($parent);
                    if (!data) {
                        console.error("parent not serialized");
                    }
                    else {
                        var $modalContent = $self.findDataContainer($("#pdf-print-modal"), ".modal-body");
                        if (!$modalContent) {
                            console.error("class '.modal-body', not exist")
                        }
                        else {
                            if (!ajax){
                                console.error("attr ajax is not defined .!");
                            }
                            else {
                                var iframe = $self.iframeCreate("MyPdfIframe","");
                                $modalContent.html("");
                                var MyIframe = $(iframe).appendTo($modalContent);

                                $("#MyPdfIframe").on("load", function () {
                                    if (window["MyLoading"]) {
                                        MyLoading.removeLoad();
                                    }
                                    iframe = $(this).contents().get(0);
                                    var contentType = iframe.contentType || iframe.mimeType;
                                    if (contentType === "application/pdf") {
                                        $("#pdf-print-modal").modal('show');
                                    } else {
                                        //TODO: realizar la componente de MyToast para mensajes
                                        //alert("No se encontró ningún dato para generar el reporte.");
                                        $self.$.trigger($self.EMPTY_REPORT);
                                    }
                                });
                                $(MyIframe).attr("src", ajax + "?" + data);
                            }
                        }
                    }
                }
            }
            return false;
        });
    },

    /**
     * @param $self
     * @param id
     * @param className
     * @returns {string}
     */
    iframeCreate:($self, id, className) => {
        return "<iframe id='"+ id +"' class='"+ className +"' width='100%' style='height: 100%;'> </iframe>";
    },

    /**
     * @param $self
     * @returns {*|jQuery|HTMLElement}
     */
    getParent:($self) => {
        return $( $self.$.attr($self.PARENT) );
    },

    /**
     * Metodo para serializar los datos desde un padre previamente especificado
     * @param $self
     * @param $parent
     * @returns {*}
     */
    getSerializedData:($self, $parent) => {
        return $.serialize($parent);
    },

    /**
     * Metodo para obtener el objeto html contenedor, para mostrar el reporte.
     * @param $self
     * @param $container
     * @param html_to_find
     */
    findDataContainer:($self, $container, html_to_find) =>{
        return $container.find(html_to_find);
    },

    /**
     *
     * @param $self
     */
    createDialog:($self) => {
        var modal = "<div class=\"modal inmodal\" id=" + $self.MODAL_ID +" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n" +
            "<div class=\"modal-dialog\" style=\"width: calc(100% - 15px); height: calc(100% - 40px);margin: 10px;\">\n" +
            "<div class=\"modal-content animated bounceInRight\" style=\"width: 100%\">\n" +
            "        <div class=\"modal-header\" style=\"padding: 0px; height: 75px;\">\n" +
            "            <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\" style=\"font-size: 35px;margin: 7px;\">&times;</span><span class=\"sr-only\">Close</span></button>\n" +
            "<div class='row'>\n"+
            "    <div class='col-md-4'></div>\n"+
            "<div class='col-md-8'>" +
            "<div class='col-md-offset-6 col-md-6 text-center'>\n"+
            "<img alt='image' src='/v2/img/logo_ma.png' style='padding: 3px;height: 55px; display: inline'>\n"+
            "<h2 style='display: inline'>Vista Preliminar</h2>\n"+
            "</div>\n"+
            "</div>\n"+
            "</div>\n"+
            "        <div class=\"modal-body\" style='height: calc(600px - 40px); overflow: hidden;'>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "</div>\n";
        $self.$.parent().append(modal);
    }
});