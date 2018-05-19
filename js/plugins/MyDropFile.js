/*
 * @author: Julio Peña
 */

$.component(".MyDropFile", [], {
    ME: "me",
    URLS: "url",

    init: ($self) => {
        $self.$me = $($self.$.attr($self.ME));
        $self.$url = $($self.$.attr($self.URLS));
        $self.drop($self);
    },

    drop: ($self) => {
        $($self.$).dropzone({ url: $self.$url });
    }
});