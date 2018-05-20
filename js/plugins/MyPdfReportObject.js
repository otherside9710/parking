$.component(".MyPdfReportObject",[],{
    AJAX:"ajax",
    DEFAULT_EVENT:"operationComplete",
    EVENT:"event",
    MODAL_ID:"pdf-print-modal",
    NODISABLED:"nodisabled",
    MODAL_BODY:"",
    EMPTY_REPORT:"empty-report",
    init: ($self) => {
        $self.$event = $self.$.attr($self.EVENT);
        $self.$ajax  = $self.$.attr($self.AJAX);
        $self.createDialog();
        $self.events();
    },

    events: ($self) => {
        $self.$.on($self.$event ? $self.$event : $self.DEFAULT_EVENT, function(){
            let data = $self.getSerializedData();
            let $modal_body = $self.findDataContainer($("#"+$self.MODAL_ID), ".modal-body");
            let error = $self.$.find(".has-error, error");

            //validate
            if (!$self.$ajax) {
                console.error("Ajax url is not defined .!");
            }
            else {
                if (!$modal_body) {
                    console.error("class '.modal-body', not exist");
                }
                else {
                    if (error.length == 0) {
                        let $iframe = $self.createComponent($modal_body);
                        $($iframe).on("load", function () {
                            if (window["MyLoading"]) {
                                MyLoading.removeLoad();
                            }
                            $iframe = $(this).contents().get(0);
                            let contentType = $iframe.contentType || $iframe.mimeType;
                            if (contentType === "application/pdf" || contentType === "text/html" || contentType === "application/factory") {
                                $("#"+$self.MODAL_ID).modal('show');
                            }
                            else if(contentType === "text/plain") {
                                if ($iframe.activeElement.innerText) {
                                    //alert($iframe.activeElement.innerText);
                                    $self.$.trigger($self.EMPTY_REPORT,$iframe.activeElement.innerText);
                                }
                                else {
                                    $self.$.trigger($self.EMPTY_REPORT);
                                }
                            }
                            else {
                                //alert("No se encontró ningún dato para generar el reporte.");
                                $self.$.trigger($self.EMPTY_REPORT);
                            }
                        });
                        if (window["MyLoading"]) {
                            var form = $self.$;
                            MyLoading.cargarGif(form);
                        }
                        $($iframe).attr("src", $self.$ajax + "?" + data);
                    }
                    else {
                        //alert("No se encontró ningún dato para generar el reporte.");
                        $self.$.trigger($self.EMPTY_REPORT);
                    }
                }
            }
            return false;
        });
    },
    encode: ($self, unencoded) => {
        return encodeURIComponent(unencoded).replace(/'/g,"%27").replace(/"/g,"%22");
    },
    decode: ($self,unencoded) => {
        return decodeURIComponent(encoded.replace(/\+/g,  " "));
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
     * Metodo para serializar los datos desde un objeto previamente especificado
     * @param $self
     * @param $object
     * @returns {*}
     */
    getSerializedData:($self, $object) => {
        var nodisabled = $self.$.attr($self.NODISABLED);
        if ($object)
            return $.serialize($object, nodisabled);
        else
            return $.serialize($self.$, nodisabled);
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
     * @param $modalContent
     * @returns {*|jQuery}
     */
    createComponent: ($self, $modalContent) => {
        var iframe = $self.iframeCreate("MyPdfIframe","");
        $modalContent.html("");
        var MyIframe = $(iframe).appendTo($modalContent);
        return MyIframe;
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
            "<img alt='image' src='images/logo/logo_transparent.png' style='padding: 3px;height: 55px; display: inline'>\n"+
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