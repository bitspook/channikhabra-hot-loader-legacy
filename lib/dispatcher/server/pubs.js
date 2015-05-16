Meteor.publish('hotloader', function() {
  return HotLoaderColl.find({updatedAt: {$gt: new Date()-(1000*2)}}); //only send 2s old docs
});
