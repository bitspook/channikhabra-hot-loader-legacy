var dispatchToLiveUpdate = function(doc) {
  console.log("GOT NEW DOC", doc);

  var filepath = doc.filepath,
      filetype = doc.filetype,
      content = doc.content,
      oldContent = doc.oldContent;

  if (!filetype || !content) {
    throw new Meteor.Error('Invalid doc for Dispatching to LiveUpdate' + doc);
  }

  LiveUpdate.refreshFile({
    fileType: filetype,
    newContent: content,
    oldContent: oldContent
  });
};

HotLoaderColl.find({}).observe({
  added: function(doc) {
    dispatchToLiveUpdate(doc);
  },
  changed: function(newDoc, oldDoc) {
    dispatchToLiveUpdate(newDoc);
  }
});
