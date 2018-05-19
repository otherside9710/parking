var MyCalendar = $.import("/v4/plugins/MyCalendar.js");
$.component(".MyCalendarPeriod",[MyCalendar],{
    PERIOD:"period",
    init: ($self) => {
        $self.$period = $self.$.attr($self.PERIOD);
        $.super(MyCalendar, $self).init();

    },

    loadDate: ($self) => {
        //$.super(MyCalendar, $self).loadDate();
        switch ($self.$period) {
            case 'year':
                var val = $self.getData(0);
                $self.$.datepicker('setDate', val.join("/"));
            break;

            case 'month':
                var val = $self.getData(1);
                $self.$.datepicker('setDate', val.join("/"));
            break;
        }
    },

    getData: ($self, index) => {
        let date = new Date();
        let val = [];

        val.push(date.getFullYear());
        val.push(date.getMonth()+1);
        val.push(date.getDate());

        for (let i in val){
            if (i == index){
                val[i] = val[i] -1;
            }
            else {
                val[i] = i > 0 ? "01" : val[i];
            }
        }
        return val;
    }
});