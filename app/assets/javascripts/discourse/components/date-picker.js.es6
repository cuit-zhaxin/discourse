/* global Pikaday:true */
import loadScript from "discourse/lib/load-script";
import { on } from "ember-addons/ember-computed-decorators";

export default Em.Component.extend({
  tagName: "input",
  classNames: ["date-picker"],
  _picker: null,

  @on("didInsertElement")
  _loadDatePicker() {
    const input = this.$()[0];

    loadScript("/javascripts/pikaday.js").then(() => {
      const default_opts = {
        field: input,
        format: "YYYY-MM-DD",
        defaultDate: moment().add(1, "day").toDate(),
        minDate: new Date(),
        onSelect: date => this.set("value", moment(date).format("YYYY-MM-DD"))
      };

      this._picker = new Pikaday(Object.assign(default_opts, this._opts()));
    });
  },

  @on("willDestroyElement")
  _destroy() {
    this._picker = null;
  },

  _opts: function() {
    return null;
  }

});
