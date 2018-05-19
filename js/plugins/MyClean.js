$.component("#MyClean",[],{
    CLEAN:"clean",
    init:($self)=>{
        var html =[
            "INPUT","SELECT","TEXTAREA"
        ];

        $self.$.on("click", function () {
            $("[clean]").each(function (index, ui) {
                var tag = $(ui).prop("tagName");
                if (tag === "CHECKBOX"){
                    $(ui).prop("checked",false);
                }
                else if(tag in html){
                    $(ui).val("");
                }
                else {
                    $(ui).text("");
                }
            });
        });
    }
});