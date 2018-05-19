/*Dev By Julio Peña*/

$.component(".MyYear", [], {
    MIN_YEAR : "min-year",
    MAX_YEAR : "max-year",
    DEFAULT_YEAR: "default-year",
    init: ($self) => {
        $self.$min_year = $self.$.attr($self.MIN_YEAR);
        $self.$max_year = $self.$.attr($self.MAX_YEAR);
        $self.$default_year = $self.$.attr($self.DEFAULT_YEAR);
        if ($self.$default_year){
            if ($self.$default_year === "true" || $self.$default_year === "today") {
                $self.$.val($self.nowYear());
            }
            else {
                var year = eval($self.$default_year);
                $self.$.val(year);
            }

        }
        $self.onlyYear();
    },

    onlyYear: ($self) => {
        var max_year = "";
        try {
            max_year = eval($self.$max_year);
        }catch (e) {
            max_year = $self.$max_year;
        }
        $self.$.datepicker({
            viewMode: "years",
            minViewMode: "years",
            dateFormat: 'yy',
            startDate: $self.$min_year ? $self.$min_year : "01/01/2000",
            endDate: max_year ? max_year : "01/01/"+$self.nowYear()
        }).on('hide', function () {
            var select_value = $self.$.val();
            var date = new Date(select_value);
            var year = date.getFullYear();
            $self.$.val(year);
            if ($self.$.val() === "NaN" || ($self.$.val() === "")){
                $self.$.val($self.nowYear());
            }
        });

    },

    nowYear: ($self) => {
        var year = new Date();
        var yearNow = year.getFullYear();
        return yearNow;
    }
});