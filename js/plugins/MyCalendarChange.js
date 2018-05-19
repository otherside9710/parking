/**
 * dev: Brayan parra
 *
 * Componente hija que toma valor dinamico de una componente year
 * para asignarcelo asi mismo.
 */
$.component(".MyCalendarChange", [], {
    DYNAMIC_VALUE:"dynamic-value",

    init: ($self) => {
       $self.$.attr("readonly","");
       $self.$dynamic_value = $self.$.attr($self.DYNAMIC_VALUE);
        $("input, select, textarea").change(function () {
            $self.refresh();
        });
        $self.refresh();
    },

    refresh: $.anottate($.Export, ($self) => {
        $self.setData();
    }),

    setData: ($self) => {
       var data = eval($self.$dynamic_value);
       $self.$.val("");
       if (data.includes("/")){
           var a = data.split("/");
           $self.$.val(a[a.length -1]);
       }
       else {
           $self.$.val(data);
       }
    }
});