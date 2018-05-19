$.component(".MyCleanContainer",[],{
    CLICK : "click",

    init:($self)=>{

        $self.$click = $self.$.attr($self.CLICK);
        var html =[
            "INPUT","TEXTAREA"
        ];

        var items = "INPUT[type!='hidden'],TEXTAREA,CHECKBOX";

        $($self.$click).on("click", function () {
            $self.$.find(items).each(function (index, ui) {
                var tag = $(ui).prop("tagName");
                if (tag === "CHECKBOX"){
                    $(ui).prop("checked",false);
                }
                if(html.indexOf(tag) != -1){
                    $(ui).val("");
                }

            });
        });
    }
});