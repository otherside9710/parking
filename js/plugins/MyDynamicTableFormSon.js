var MyDynamicTableSon = $.import("/v4/plugins/MyDinamicTableSon.js");
$.component(".MyDynamicTableFormSon",[MyDynamicTableSon],{
    init:($self) => {
        $self.$conf_class += " MyDinamicTableSon";
        $.super(MyDynamicTableSon, $self).init();
    }
});