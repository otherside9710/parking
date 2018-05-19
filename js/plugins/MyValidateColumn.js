$.component("[index-column]",[],{
    INDEX_COLUMN:"index-column",
    init: ($self) => {
        $self.$index_column = $self.$.attr($self.INDEX_COLUMN);
        $self.$.on('change', function () {
            $self.refresh();
        });
    },

    refresh: $.anottate($.Export, ($self) => {
        $self.$.parents('table').find("tbody tr").each(function (index, tr) {
            let val_td = $(tr).find("td:eq("+$self.$index_column+")").text();
            if (val_td == $self.$.val()){
                $self.$.val('');
                return false;
            }
        });
    })

});