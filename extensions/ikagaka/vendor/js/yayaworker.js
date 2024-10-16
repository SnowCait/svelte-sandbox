  var YAYAWorkerClient, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  YAYAWorkerClient = (function(superClass) {
    extend(YAYAWorkerClient, superClass);

    function YAYAWorkerClient() {
      return YAYAWorkerClient.__super__.constructor.apply(this, arguments);
    }

    YAYAWorkerClient.url = URL.createObjectURL(new Blob([worker_code], {
      type: "text/javascript"
    }));

    YAYAWorkerClient.prototype.worker = function() {
      return this._worker;
    };

    YAYAWorkerClient.prototype.load = function(dirpath) {
      this._worker = new URLWorkerClient(YAYAWorkerClient.url, false);
      return YAYAWorkerClient.__super__.load.call(this, dirpath);
    };

    return YAYAWorkerClient;

  })(NativeShioriWorkerClient);

  if (((ref = this.ShioriLoader) != null ? ref.shiories : void 0) != null) {
    this.ShioriLoader.shiories.yaya = YAYAWorkerClient;
  } else {
    throw "load ShioriLoader first";
  }

}).call(this);
