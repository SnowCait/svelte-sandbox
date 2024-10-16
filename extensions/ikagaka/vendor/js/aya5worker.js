  var AYA5WorkerClient, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  AYA5WorkerClient = (function(superClass) {
    extend(AYA5WorkerClient, superClass);

    function AYA5WorkerClient() {
      return AYA5WorkerClient.__super__.constructor.apply(this, arguments);
    }

    AYA5WorkerClient.url = URL.createObjectURL(new Blob([worker_code], {
      type: "text/javascript"
    }));

    AYA5WorkerClient.prototype.worker = function() {
      return this._worker;
    };

    AYA5WorkerClient.prototype.load = function(dirpath) {
      this._worker = new URLWorkerClient(AYA5WorkerClient.url, false);
      return AYA5WorkerClient.__super__.load.call(this, dirpath);
    };

    return AYA5WorkerClient;

  })(NativeShioriWorkerClient);

  if (((ref = this.ShioriLoader) != null ? ref.shiories : void 0) != null) {
    this.ShioriLoader.shiories.aya5 = AYA5WorkerClient;
  } else {
    throw "load ShioriLoader first";
  }

}).call(this);
