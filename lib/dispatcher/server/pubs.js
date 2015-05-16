Meteor.publish('hotloader', function() {
  return HotLoaderColl.find({updatedAt: {$gt: new Date()-(500)}}); //only send 500ms old docs
});
