
$.component('.MyModal', [], {
    HTML: "<div class=\"modal inmodal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n" +
    "     <div class=\"modal-dialog\">\n" +
    "         <div class=\"modal-content animated bounceInRight\">\n" +
    "             <div class=\"modal-header\">\n" +
    "                 <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">×</span><span class=\"sr-only\">Close</span></button>\n" +
    "                 <h4 class=\"modal-title\">{{title}}</h4>\n" +
    "                 <small class=\"font-bold\">{{subtitle}}</small>\n" +
    "            </div>\n" +
    "            <div class=\"modal-body\">{{body}}</div>\n" +
    "            <div class=\"modal-footer\">{{footer}}</div>\n" +
    "         </div>\n" +
    "     </div>\n" +
    " </div>",

    TITLE: "title",
    SUBTITLE: "subtitle",
    BODY: "body",
    FOOTER: "footer",

    init: ($self) => {
        $self.confModal();

    },

    getModal: ($self) => {
        if ($self.$modal){
            $self.$modal.remove();
        }
        $(".inmodal").remove();
        $self.$modal = $($self.parseHTML());
        return $self.$modal;//.appendTo(document.body);
    },

    confModal: ($self) => {
        $self.$title = $self.$.attr($self.TITLE);
        $self.$subtitle = $self.$.attr($self.SUBTITLE);
        $self.$body = $self.$.attr($self.BODY);
        $self.$footer = $self.$.attr($self.FOOTER);
    },

    parseHTML: ($self) => {
        var html = $self.HTML;

        html = html.replace(/{{title}}/g, $self.$title);
        html = html.replace(/{{subtitle}}/g, $self.$subtitle);
        html = html.replace(/{{body}}/g, $self.$body);
        html = html.replace(/{{footer}}/g, $self.$footer);

        return html;
    },

    show: $.anottate($.Export, ($self) => {
        $self.getModal().modal('show');
    })

});



