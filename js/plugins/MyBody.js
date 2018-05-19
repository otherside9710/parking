
$.component(".MyBody", [], {
    DATA: "data",
    TR: "tr",
    TH: "th",
    ROLE: "role",
    ROW: "row",
    init : ($self) =>{

    },

    serialize: $.anottate($.Export, ($self) => {
        return $self.serializeTable();
    }),


    /**
     * Metodo para convertir los datos de la tabla en un JsonArray
     * @return JsonArray
     */
    serializeTable: ($self) => {
        var array = [];

        $self.$.find('tr[role="row"]').each(function (index, prow) {
            var $td = $(prow).find("td:eq(0)");
            var $input = $td.find("input[parent='#puc" + index + "']");
            if ($input.val()) {
                //TODO Corregir
                var rrow = $self.rrow($(prow));
                var serialized = $.serializeObject(rrow);
                array.push(serialized);
            }
        });
        console.log("body => ".array);
        return array;
    },
    /**
     * Responsive Row
     * @param {type} $self
     * @param {type} $elm
     * @return {unresolved}
     */
    rrow: ($self, $elm) => {
        var $row = $self.prow($elm);
        var list = [];
        var role;
        do {
            list.push($row.get(0));
            var $row = $row.next($self.TR);
            if ($row.length) {
                role = $row.attr($self.ROLE);
            }
        } while ($row.length && role !== $self.ROW);
        return $(list);
    },
    /**
     * Parent Row
     * @param {type} $self
     * @param {type} $elm
     * @return {unresolved}
     */
    prow: ($self, $elm) => {
        var role = $elm.attr($self.ROLE);
        if (role === $self.ROW) {
            return $elm;
        }
        var prev = $elm.prev();
        if (prev.length) {
            return $self.prow(prev);
        }
    }
});