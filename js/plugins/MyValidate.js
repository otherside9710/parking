$.component("[operation]",[], {
    OPERATION:"operation",
    ACTION_TRUE:"action-true",
    ACTION_FALSE:"action-false",
    init:($self)=>{
        $self.$operation = $self.$.attr($self.OPERATION);
        $self.$action_true = $self.$.attr($self.ACTION_TRUE);
        $self.$action_false = $self.$.attr($self.ACTION_FALSE);
        $self.$.on("change", function () {
            $self.refresh();
        });
    },

    refresh:$.anottate($.Export,($self) =>{
        try {
            var evaluated = eval($self.$operation);
            if (evaluated){
                eval($self.$action_true);
            }
            else {
                eval($self.$action_false);
            }
        }catch(e){
            console.error("error evaluado la expresion ",$self.$operation);
            console.error("Exception: ",e);
        }

    })
});