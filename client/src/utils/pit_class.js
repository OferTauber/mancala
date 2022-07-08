function PitClass(bins, delay) {
  this.bins = bins;
  this.delay = delay;
}

PitClass.prototype.getBins = function () {
  return this.bins;
};

PitClass.prototype.setBins = function (bins) {
  this.bins = bins;
};

PitClass.prototype.incrementBins = function () {
  this.bins++;
};

PitClass.prototype.getDelay = function () {
  return this.delay;
};

PitClass.prototype.setDelay = function (delay) {
  this.delay = delay;
};

export default PitClass;
