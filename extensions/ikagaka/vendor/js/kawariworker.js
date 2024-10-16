  var KawariWorkerClient, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  KawariWorkerClient = (function(superClass) {
    extend(KawariWorkerClient, superClass);

    function KawariWorkerClient() {
      return KawariWorkerClient.__super__.constructor.apply(this, arguments);
    }

    KawariWorkerClient.url = URL.createObjectURL(new Blob([worker_code], {
      type: "text/javascript"
    }));

    KawariWorkerClient.prototype.worker = function() {
      return this._worker;
    };

    KawariWorkerClient.prototype.load = function(dirpath) {
      this._worker = new URLWorkerClient(KawariWorkerClient.url, false);
      return KawariWorkerClient.__super__.load.call(this, dirpath);
    };

    return KawariWorkerClient;

  })(NativeShioriWorkerClient);

  if (((ref = this.ShioriLoader) != null ? ref.shiories : void 0) != null) {
    this.ShioriLoader.shiories.kawari = KawariWorkerClient;
  } else {
    throw "load ShioriLoader first";
  }

}).call(this);
