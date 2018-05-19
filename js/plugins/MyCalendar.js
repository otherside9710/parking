$.component("[date]",[],{
    DATE:"date",
    MINDATE: "min-date",
    MAXDATE:"max-date",
    TODAY : "today",
    init:($self)=>{
        $self.$date = $self.$.attr($self.DATE);
        $self.$minDate = $self.$.attr($self.MINDATE);
        $self.$maxDate = $self.$.attr($self.MAXDATE);
        $self.loadDate();
        $self.events();
    },

    loadDate:($self)=>{
        var options = $self.defaultOptions();
        switch($self.$date){
            case $self.TODAY:
                $self.$.datepicker(options);
                $self.now();
                break;
            case "first-date":
                $self.$.datepicker(options);
                $self.first();
                break;
            default:
                $self.$.datepicker(options);
                break;
        }
    },

    events:($self)=>{
        $self.$.trigger('change');
    },

    now:($self)=>{
        var date = new Date();
        var day  = date.getDate();
        var month= date.getMonth() + 1;
        var year = date.getFullYear();
        $self.$.datepicker("setDate",year+"/"+month+"/"+day);
    },


    first:($self) =>{
        var date = new Date();
        var month= date.getMonth() + 1;
        var year = date.getFullYear();
        $self.$.datepicker("setDate",year+"/"+month+"/"+"01");
    },

    defaultDate: ($self) => {
        if ($self.$date) {
            $self.$.datepicker("setDate", $self.$date);
        }
    },

    defaultOptions:($self) => {
        let dict = {
            todayBtn: "linked",
            format: 'yyyy/mm/dd',
            keyboardNavigation: false,
            forceParse: true,
            calendarWeeks: true,
            autoclose: true,
            language:"ES",
        };

        if ($self.$maxDate === $self.TODAY) {
            dict['endDate'] =new Date();
        }
        else {
            dict['endDate'] = $self.$maxDate;
        }

        if ($self.$minDate === $self.TODAY) {
            dict['startDate'] = new Date();
        }
        else {
            dict['startDate'] = $self.$minDate;
        }
        return dict;
    }
});