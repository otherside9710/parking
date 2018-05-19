var MyCrudTable = $.import("/v4/plugins/MyCrudtable.js");

$.component(".MyCrudColumnFormat",[MyCrudTable], {
    MORE:"more",
    getTh: ($self) => {
        let $more = $self.$.attr($self.MORE);
        if ($more){
            let $div = $($more).find(".tooltip-demo");
            if ($div) {
                $div = $div.get(0).outerHTML;
                return '<th width="1%" data="' + $self.$row_tools + '" priority="0">'+ $div +' </th>';
            }
        }
        else {
            return '<th width="1%" data="' + $self.$row_tools + '" priority="0"></th>';
        }

    },

    events: ($self) => {
        $.super(MyCrudTable, $self).events();
        $self.$.find("thead").on("click", ".add", function () {
            var $row = $self.add();
            $row.attr("edit", "edit");
            $row.attr("new", "new");
            $self.draw($row);
        });
    },

    conf: ($self) => {
        let conf = $.super(MyCrudTable, $self).conf();
        return conf.update({
            info:false,
            deferLoading: 0,
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [
                {extend: 'excel', title: 'Myasesor Column for Format'}
            ],
            rowCallback: function( row, data, index ) {
                let buffer = $self.$.attr('buffer');
                if (!buffer){
                    $self.$.attr('buffer',data.fhclColumna);
                }


                if (!data.fhclColumna){
                    $self.$.attr('max-value',buffer);
                }else {
                    $self.$.attr('max-value',data.fhclColumna);
                    $self.$.attr('buffer',data.fhclColumna);
                }

                if (data.fhclEnable === "S") {
                    $(row).attr("forever-active","S");
                }

            }
        });
    }
});