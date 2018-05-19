var MyDinamicObject = $.import("/v4/plugins/MyDinamicObject.js");

$.component(".MyDinamicTable",[MyDinamicObject],{
    AJAX:"header-ajax",
    FILTER_DATA:"filter-data",
    init:($self) => {
        $.super(MyDinamicObject, $self).init();
        $self.$ajax = $self.$.attr($self.AJAX);
        $self.$filter_data = $self.$.attr($self.FILTER_DATA);
        $self.events();
    },

    events:($self) => {
        //$.super(MyDinamicObject, $self).events();
        $self.callFunction();
        //...,
    },

    callFunction: ($self) => {
        $.super(MyDinamicObject, $self).findData($self.$ajax);
    },

    createTable:($self, response) => {
        //get header of table
        var thead = $self.getHeaderTable(response);

        //get table with header replace
        var $table = $self.getTableContent(thead, "");

        //set object to html
        $.super(MyDinamicObject, $self).setObjectToHtml($table);
    },

    getTableStr:($self) => {
        var table_str = "<table id='{{id}}' class='{{class}}' {{attr}}>" +
            "<thead>{{thead}}</thead>"+
            "<tbody>{{tbody}}</tbody>"+
            "</table>";
        return table_str;
    },

    getTableContent:($self, thead, tbody) => {
        var table  = $self.getTableStr();
        table = table.replace("{{thead}}", thead);
        table = table.replace("{{tbody}}", tbody);
        table = $.super(MyDinamicObject, $self).config(table);
        return table;
    },

    getHeaderTable:($self, data) => {
        if (data.length > 0){
            if ($self.$filter_data) {
                var $th;
                var value;
                var str ="<tr>";
                for (var i in data) {
                    value = data[i][$self.$filter_data];
                    $th = "<th data='" + value + "'>" +
                                value +
                            "</th>";
                    str += $th;
                }
                str +="</tr>";
                return str;
            }
        }
        return false;
    },

    callFunctionResponse: ($self, response) => {
        $self.createTable(response);
    }
});