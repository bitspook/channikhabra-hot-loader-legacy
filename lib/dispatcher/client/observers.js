var dispatchToLiveUpdate = function(doc) {
  var filepath = doc.filepath,
      filetype = doc.filetype,
      content = doc.content,
      oldContent = doc.oldContent,
      dontEval = doc.dontEval,
      prePush = doc.prePush;

  if (!filetype || !content) {
    throw new Meteor.Error('Invalid doc for Dispatching to LiveUpdate' + doc);
  }

  if (dontEval) {
    if (prePush) {
      return;
    }

    console.warn("First time pushing file, has to reload. It'll be hot-pushed for any further changes");
    LiveUpdate.forceRefreshPage();
    return;
  }

  console.warn("Hot pushing ", filepath);
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
