/**
 * Componente para cargar un tabla desde un [Container Object HTML], mediante un evento predefinido
 * Esta componente exige como atributos adicionales [parent-data] que sera el objeto container a serializar.
 */
var MyEdittableFormSon = $.import("/v4/plugins/MyEdittableFormSon.js");
$.component(".MyLoadTableStatic",[MyEdittableFormSon], {
    PARENT_DATA:"parent-data",
    init: ($self) =>{
        $.super(MyEdittableFormSon,$self).init();
    },

    loadTable: ($self) => {
        var $parent = $self.getParentData();
        var data = $.serializeObject($parent);
        if (!$.isArray(data)){
            $self.$table.clear().draw();
            $self.$table.row.add(data).draw(false);
        }

    },

    getParentData: ($self) => {
        var $parent = $self.$.attr($self.PARENT_DATA);
        return $($parent);
    },
});