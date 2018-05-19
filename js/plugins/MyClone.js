/*<form action="/file-upload" class="dropzone">
  <div class="fallback">
    <input name="file" type="file" multiple />
  </div>
</form>
 * @author: Luis Morales
 */

$.component(".MyClone", [], {
    PARENT: "parent",

    init: ($self) =>{
        $self.$parent = $($self.$.attr($self.PARENT));
        $self.clone();
    },

    clone: ($self) => {
        $self.$.html($self.$parent.get(0).outerHTML);
    }
});