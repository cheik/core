PrimeFaces.Extensions.widget.Droppable = function(id, cfg) {
    this.id = id;
    this.cfg = cfg;
	
    this.setupDropHandler();
	
    jQuery(PrimeFaces.escapeClientId(this.cfg.target)).droppable(this.cfg);
}

PrimeFaces.Extensions.widget.Droppable.prototype.setupDropHandler = function() {
    this.cfg.formId = $(PrimeFaces.escapeClientId(this.id)).parents('form:first').attr('id');

    var _self = this;
    
    this.cfg.drop = function(event, ui) {
        if(_self.cfg.onDrop) {
            _self.cfg.onDrop.call(this, event, ui);
        }

        var options = {
            source: _self.id,
            process: _self.id,
            formId: _self.cfg.formId
        };

        if(_self.cfg.onDropUpdate) {
            options.update = _self.cfg.onDropUpdate;
        }

		if (_self.cfg.oncomplete) {
			options.oncomplete = _self.cfg.oncomplete;
		}

        var params = {};
        params[_self.id + "_dragId"] = ui.draggable.attr('id');
        params[_self.id + "_dropId"] = _self.cfg.target;

        options.params = params;

        PrimeFaces.ajax.AjaxRequest(options);
    };
}